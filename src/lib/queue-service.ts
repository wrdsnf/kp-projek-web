import { db } from "./firebase";
import { 
  collection, 
  doc, 
  runTransaction, 
  getDocs, 
  serverTimestamp,
  query,
  where,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDoc
} from "firebase/firestore";
import { QueueType } from "./types";
import { getDeviceId, recordCooldown, setLocalCooldown } from "./cooldown-service";

const getTodayDate = () => new Date().toISOString().split('T')[0];

/**
 * Take queue (public - with cooldown)
 */
export const takeQueue = async (type: QueueType) => {
  const today = getTodayDate();
  const queueRef = doc(db, "queues", type);
  const logsRef = collection(db, "queue_logs");
  const deviceId = getDeviceId();

  try {
    const newNumber = await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      
      if (!queueDoc.exists()) {
        throw new Error("Queue not found");
      }

      const data = queueDoc.data();
      
      if (data.status === 'closed') {
        throw new Error("Antrian sudah ditutup");
      }

      // Reset if date is different (Auto-reset logic embedded in transaction)
      let currentLastNumber = data.lastNumber;
      if (data.date !== today) {
        currentLastNumber = 0;
        transaction.update(queueRef, {
          currentNumber: 0,
          lastNumber: 0,
          date: today,
          updatedAt: serverTimestamp()
        });
      }

      const nextNumber = currentLastNumber + 1;

      // Update queue last number
      transaction.update(queueRef, {
        lastNumber: nextNumber,
        date: today,
        updatedAt: serverTimestamp()
      });

      // Create log entry with deviceId
      const newLogRef = doc(logsRef);
      transaction.set(newLogRef, {
        type,
        number: nextNumber,
        date: today,
        time: serverTimestamp(),
        status: 'waiting',
        deviceId,
        isManualInput: false
      });

      return nextNumber;
    });

    // Record cooldown after successful take
    await recordCooldown(type);
    setLocalCooldown(type);

    return newNumber;
  } catch (error) {
    console.error("Error taking queue:", error);
    throw error;
  }
};

/**
 * Take queue manually (petugas - no cooldown)
 */
export const takeQueueManual = async (type: QueueType, petugasUid: string) => {
  if (!petugasUid) {
    throw new Error("Petugas UID is required for manual queue");
  }

  const today = getTodayDate();
  const queueRef = doc(db, "queues", type);
  const logsRef = collection(db, "queue_logs");

  try {
    const newNumber = await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      
      if (!queueDoc.exists()) {
        throw new Error("Queue not found");
      }

      const data = queueDoc.data();
      
      if (data.status === 'closed') {
        throw new Error("Antrian sudah ditutup");
      }

      // Reset if date is different
      let currentLastNumber = data.lastNumber;
      if (data.date !== today) {
        currentLastNumber = 0;
        transaction.update(queueRef, {
          currentNumber: 0,
          lastNumber: 0,
          date: today,
          updatedAt: serverTimestamp()
        });
      }

      const nextNumber = currentLastNumber + 1;

      // Update queue last number
      transaction.update(queueRef, {
        lastNumber: nextNumber,
        date: today,
        updatedAt: serverTimestamp()
      });

      // Create log entry marked as manual
      const newLogRef = doc(logsRef);
      transaction.set(newLogRef, {
        type,
        number: nextNumber,
        date: today,
        time: serverTimestamp(),
        status: 'waiting',
        isManualInput: true,
        createdBy: petugasUid
      });

      return nextNumber;
    });

    return newNumber;
  } catch (error) {
    console.error("Error taking queue manual:", error);
    throw error;
  }
};

/**
 * Call next queue number (teller)
 */
export const callNextQueue = async (type: QueueType, tellerUid?: string) => {
  const today = getTodayDate();
  const queueRef = doc(db, "queues", type);
  
  try {
    const nextNumber = await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      if (!queueDoc.exists()) throw new Error("Queue not found");
      
      const data = queueDoc.data();
      
      const next = data.currentNumber + 1;

      if (next > data.lastNumber) {
        throw new Error("Tidak ada antrian menunggu");
      }

      // Update current number
      transaction.update(queueRef, {
        currentNumber: next,
        updatedAt: serverTimestamp()
      });

      return next;
    });

    // Update log status to 'called' with teller info (outside transaction)
    if (tellerUid) {
      const logsQuery = query(
        collection(db, "queue_logs"),
        where("type", "==", type),
        where("date", "==", today),
        where("number", "==", nextNumber)
      );
      const logSnap = await getDocs(logsQuery);
      if (!logSnap.empty) {
        await updateDoc(logSnap.docs[0].ref, {
          status: 'called',
          servedBy: tellerUid,
          servedAt: serverTimestamp()
        });
      }
    }

  } catch (error) {
    console.error("Error calling next:", error);
    throw error;
  }
};

/**
 * Update queue status (open/closed)
 * When admin closes, sets manualClosed=true to block auto-open
 * When admin opens, clears manualClosed flag
 */
export const updateQueueStatus = async (type: QueueType, status: 'open' | 'closed') => {
  const queueRef = doc(db, "queues", type);
  await runTransaction(db, async (transaction) => {
     transaction.update(queueRef, { 
       status, 
       manualClosed: status === 'closed' ? true : false,
       updatedAt: serverTimestamp() 
     });
  });
};

/**
 * Reset queue to 0 and clear all cooldowns for this type
 * Also updates reset timestamps for countdown feature
 */
export const resetQueue = async (type: QueueType) => {
  const today = getTodayDate();
  const queueRef = doc(db, "queues", type);
  
  // Reset queue numbers and update reset timestamps
  await runTransaction(db, async (transaction) => {
    const now = Timestamp.now();
    const nextReset = Timestamp.fromMillis(now.toMillis() + 24 * 60 * 60 * 1000); // +24 hours
    
    transaction.update(queueRef, {
      currentNumber: 0,
      lastNumber: 0,
      date: today,
      updatedAt: serverTimestamp(),
      lastResetAt: now,
      nextResetAt: nextReset
    });
  });

  // Clear all cooldowns for this type
  try {
    const cooldownsQuery = query(
      collection(db, "cooldowns"),
      where("type", "==", type)
    );
    const cooldownSnap = await getDocs(cooldownsQuery);
    
    // Delete each cooldown document
    const deletePromises = cooldownSnap.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing cooldowns:", error);
    // Don't throw - queue reset was successful
  }
};

/**
 * Mark queue as completed
 */
export const completeQueue = async (type: QueueType, number: number) => {
  const today = getTodayDate();
  const logsQuery = query(
    collection(db, "queue_logs"),
    where("type", "==", type),
    where("date", "==", today),
    where("number", "==", number)
  );
  const logSnap = await getDocs(logsQuery);
  if (!logSnap.empty) {
    await updateDoc(logSnap.docs[0].ref, {
      status: 'completed'
    });
  }
};

/**
 * Skip queue
 */
export const skipQueue = async (type: QueueType, number: number) => {
  const today = getTodayDate();
  const logsQuery = query(
    collection(db, "queue_logs"),
    where("type", "==", type),
    where("date", "==", today),
    where("number", "==", number)
  );
  const logSnap = await getDocs(logsQuery);
  if (!logSnap.empty) {
    await updateDoc(logSnap.docs[0].ref, {
      status: 'skipped'
    });
  }
};

/**
 * Check if auto-reset is due and execute if needed
 * This is idempotent - safe to call multiple times
 */
export const checkAndAutoReset = async (type: QueueType): Promise<boolean> => {
  const queueRef = doc(db, "queues", type);
  
  try {
    const didReset = await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      if (!queueDoc.exists()) return false;
      
      const data = queueDoc.data();
      const now = Timestamp.now();
      
      // If nextResetAt doesn't exist, initialize it (first-time setup)
      if (!data.nextResetAt) {
        const nextReset = Timestamp.fromMillis(now.toMillis() + 24 * 60 * 60 * 1000);
        transaction.update(queueRef, {
          lastResetAt: now,
          nextResetAt: nextReset,
          updatedAt: serverTimestamp()
        });
        return false; // No reset needed, just initialized
      }
      
      // Check if reset is due
      const nextResetTime = data.nextResetAt.toMillis();
      if (now.toMillis() >= nextResetTime) {
        // Reset is due - perform it
        const today = new Date().toISOString().split('T')[0];
        const newNextReset = Timestamp.fromMillis(now.toMillis() + 24 * 60 * 60 * 1000);
        
        transaction.update(queueRef, {
          currentNumber: 0,
          lastNumber: 0,
          date: today,
          lastResetAt: now,
          nextResetAt: newNextReset,
          updatedAt: serverTimestamp()
        });
        return true; // Reset was performed
      }
      
      return false; // No reset needed
    });
    
    // If reset was performed, clear cooldowns
    if (didReset) {
      try {
        const cooldownsQuery = query(
          collection(db, "cooldowns"),
          where("type", "==", type)
        );
        const cooldownSnap = await getDocs(cooldownsQuery);
        const deletePromises = cooldownSnap.docs.map(d => deleteDoc(d.ref));
        await Promise.all(deletePromises);
      } catch (err) {
        console.error("Error clearing cooldowns after auto-reset:", err);
      }
    }
    
    return didReset;
  } catch (error) {
    console.error("Error in checkAndAutoReset:", error);
    return false;
  }
};
