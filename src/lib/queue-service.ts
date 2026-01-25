import { db } from "./firebase";
import { 
  collection, 
  doc, 
  runTransaction, 
  getDocs, 
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import { QueueType } from "./types";

const getTodayDate = () => new Date().toISOString().split('T')[0];

export const takeQueue = async (type: QueueType) => {
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
        date: today, // Ensure date is today
        updatedAt: serverTimestamp()
      });

      // Create log entry
      // Use auto-id for log
      const newLogRef = doc(logsRef);
      transaction.set(newLogRef, {
        type,
        number: nextNumber,
        date: today,
        time: serverTimestamp(),
        status: 'waiting'
      });

      return nextNumber;
    });

    return newNumber;
  } catch (error) {
    console.error("Error taking queue:", error);
    throw error;
  }
};

export const callNextQueue = async (type: QueueType) => {
  const queueRef = doc(db, "queues", type);
  
  try {
    await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      if (!queueDoc.exists()) throw new Error("Queue not found");
      
      const data = queueDoc.data();
      const nextNumber = data.currentNumber + 1;

      if (nextNumber > data.lastNumber) {
        throw new Error("Tidak ada antrian menunggu");
      }

      // Update current number
      transaction.update(queueRef, {
        currentNumber: nextNumber,
        updatedAt: serverTimestamp()
      });

      // Find the log for this number and update status to 'called'
      // Note: This requires a query. Transactions can't do query easily unless we know the ID.
      // Strategy: We query FIRST, then transaction? Or just update queue and let client side find the log?
      // Better: Update the log status so we can track history. 
      // To find the log securely inside transaction is hard. 
      // Alternative: Just update the queue 'currentNumber'. The log status update can be a separate write or we query first.
      // Optimization: We can just update 'currentNumber' in queue doc. 
      // If we want log status, we need to query based on type, date, number.
    });

  } catch (error) {
    console.error("Error calling next:", error);
    throw error;
  }
};

export const updateQueueStatus = async (type: QueueType, status: 'open' | 'closed') => {
  const queueRef = doc(db, "queues", type);
  await runTransaction(db, async (transaction) => {
     transaction.update(queueRef, { status, updatedAt: serverTimestamp() });
  });
};

export const resetQueue = async (type: QueueType) => {
  const today = getTodayDate();
  const queueRef = doc(db, "queues", type);
  
  await runTransaction(db, async (transaction) => {
    transaction.update(queueRef, {
      currentNumber: 0,
      lastNumber: 0,
      date: today,
      updatedAt: serverTimestamp()
    });
  });
};

// Helper to get state non-realtime
const getQueueState = async (type: QueueType) => {
    const q = query(collection(db, "queues"), where("__name__", "==", type));
    const snap = await getDocs(q);
    return snap.docs[0]?.data();
}
