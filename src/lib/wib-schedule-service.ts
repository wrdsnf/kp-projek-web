"use client";

import { db } from "./firebase";
import { doc, runTransaction, serverTimestamp, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { QueueType, QUEUE_TYPES } from "./types";

// ==========================================
// WIB TIMEZONE HELPERS
// ==========================================

const WIB_OFFSET_HOURS = 7; // UTC+7

/**
 * Get current Date object adjusted to WIB timezone
 */
export function getWibDate(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + WIB_OFFSET_HOURS * 3600000);
}

/**
 * Get WIB time components
 */
export function getWibTime(): { hours: number; minutes: number; day: number } {
  const wib = getWibDate();
  return {
    hours: wib.getHours(),
    minutes: wib.getMinutes(),
    day: wib.getDay() // 0 = Sunday, 1 = Monday, etc.
  };
}

/**
 * Get today's date in YYYY-MM-DD format (WIB timezone)
 */
export function getTodayWib(): string {
  const wib = getWibDate();
  const year = wib.getFullYear();
  const month = String(wib.getMonth() + 1).padStart(2, '0');
  const date = String(wib.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

/**
 * Calculate milliseconds until next 06:00 WIB (for countdown display)
 */
export function getMsUntilNext0600Wib(): number {
  const wib = getWibDate();
  const wibHours = wib.getHours();
  
  // Target: 06:00 WIB
  const target = new Date(wib);
  target.setHours(6, 0, 0, 0);
  
  // If already past 06:00 WIB today, move to tomorrow
  if (wibHours >= 6) {
    target.setDate(target.getDate() + 1);
  }
  
  return target.getTime() - wib.getTime();
}

// ==========================================
// OPERATING HOURS SCHEDULE
// ==========================================

interface TimeSlot {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
}

interface DaySchedule {
  closed: boolean;
  slots: TimeSlot[];
}

// Operating hours per day (0 = Sunday, 6 = Saturday)
const SCHEDULE: Record<number, DaySchedule> = {
  0: { closed: true, slots: [] }, // Sunday - CLOSED
  1: { closed: false, slots: [ // Monday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 30 },
    { openHour: 13, openMinute: 0, closeHour: 14, closeMinute: 30 }
  ]},
  2: { closed: false, slots: [ // Tuesday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 30 },
    { openHour: 13, openMinute: 0, closeHour: 14, closeMinute: 30 }
  ]},
  3: { closed: false, slots: [ // Wednesday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 30 },
    { openHour: 13, openMinute: 0, closeHour: 14, closeMinute: 30 }
  ]},
  4: { closed: false, slots: [ // Thursday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 30 },
    { openHour: 13, openMinute: 0, closeHour: 14, closeMinute: 30 }
  ]},
  5: { closed: false, slots: [ // Friday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 0 },
    { openHour: 13, openMinute: 0, closeHour: 14, closeMinute: 30 }
  ]},
  6: { closed: false, slots: [ // Saturday
    { openHour: 7, openMinute: 0, closeHour: 11, closeMinute: 30 }
  ]}
};

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * Get today's schedule in WIB
 */
export function getTodaySchedule(): { dayName: string; schedule: DaySchedule } {
  const { day } = getWibTime();
  return {
    dayName: DAY_NAMES[day],
    schedule: SCHEDULE[day]
  };
}

/**
 * Check if current WIB time is within operating hours
 */
export function isWithinOperatingHours(): { isOpen: boolean; reason: string; nextChange?: string } {
  const { hours, minutes, day } = getWibTime();
  const currentMinutes = hours * 60 + minutes;
  const daySchedule = SCHEDULE[day];
  
  if (daySchedule.closed) {
    return { isOpen: false, reason: "Hari Minggu - Tutup" };
  }
  
  for (const slot of daySchedule.slots) {
    const openMinutes = slot.openHour * 60 + slot.openMinute;
    const closeMinutes = slot.closeHour * 60 + slot.closeMinute;
    
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const closeTime = `${String(slot.closeHour).padStart(2, '0')}:${String(slot.closeMinute).padStart(2, '0')}`;
      return { 
        isOpen: true, 
        reason: `Jam operasional`,
        nextChange: `Tutup ${closeTime} WIB`
      };
    }
  }
  
  // Find next opening time
  for (const slot of daySchedule.slots) {
    const openMinutes = slot.openHour * 60 + slot.openMinute;
    if (currentMinutes < openMinutes) {
      const openTime = `${String(slot.openHour).padStart(2, '0')}:${String(slot.openMinute).padStart(2, '0')}`;
      return { 
        isOpen: false, 
        reason: `Belum buka`,
        nextChange: `Buka ${openTime} WIB`
      };
    }
  }
  
  return { isOpen: false, reason: "Sudah tutup hari ini" };
}

/**
 * Format schedule for display
 */
export function formatTodaySchedule(): string {
  const { dayName, schedule } = getTodaySchedule();
  
  if (schedule.closed) {
    return `${dayName}: Tutup`;
  }
  
  const times = schedule.slots.map(slot => 
    `${String(slot.openHour).padStart(2, '0')}:${String(slot.openMinute).padStart(2, '0')} - ${String(slot.closeHour).padStart(2, '0')}:${String(slot.closeMinute).padStart(2, '0')}`
  ).join(', ');
  
  return `${dayName}: ${times}`;
}

// ==========================================
// DATE-BASED AUTO-RESET LOGIC
// ==========================================

/**
 * Check and perform date-based auto-reset
 * 
 * LOGIC:
 * 1. Get todayWib (YYYY-MM-DD in WIB timezone)
 * 2. Get current WIB time
 * 3. Reset ONLY IF:
 *    - todayWib !== resetDate (new day)
 *    - AND current WIB time >= 06:00
 * 4. On reset:
 *    - currentNumber = 0
 *    - lastNumber = 0
 *    - resetDate = todayWib
 *    - manualClosed = false
 * 
 * This is IDEMPOTENT - safe to call multiple times per day.
 * Reset is considered to happen at 06:00 WIB, regardless of actual visit time.
 */
export async function checkAndAutoResetByDate(type: QueueType): Promise<boolean> {
  const queueRef = doc(db, "queues", type);
  
  try {
    const didReset = await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      if (!queueDoc.exists()) return false;
      
      const data = queueDoc.data();
      const todayWib = getTodayWib();
      const { hours } = getWibTime();
      
      // Get stored resetDate (defaults to empty string if not set)
      const storedResetDate = data.resetDate || "";
      
      // CONDITIONS FOR RESET:
      // 1. It's a new day (todayWib !== storedResetDate)
      // 2. AND it's past 06:00 WIB
      const isNewDay = todayWib !== storedResetDate;
      const isPast0600 = hours >= 6;
      
      if (isNewDay && isPast0600) {
        // Perform reset
        transaction.update(queueRef, {
          currentNumber: 0,
          lastNumber: 0,
          date: todayWib,
          resetDate: todayWib, // Mark today as reset
          manualClosed: false, // Clear manual override
          updatedAt: serverTimestamp()
        });
        return true;
      }
      
      // No reset needed - either same day or before 06:00
      return false;
    });
    
    // Clear cooldowns on reset
    if (didReset) {
      try {
        const cooldownsQuery = query(collection(db, "cooldowns"), where("type", "==", type));
        const cooldownSnap = await getDocs(cooldownsQuery);
        await Promise.all(cooldownSnap.docs.map(d => deleteDoc(d.ref)));
      } catch (err) {
        console.error("Error clearing cooldowns:", err);
      }
    }
    
    return didReset;
  } catch (error) {
    console.error("Error in checkAndAutoResetByDate:", error);
    return false;
  }
}

/**
 * Check and perform auto open/close based on operating hours
 * Respects manualClosed flag
 */
export async function checkAndAutoOpenClose(type: QueueType): Promise<void> {
  const queueRef = doc(db, "queues", type);
  
  try {
    await runTransaction(db, async (transaction) => {
      const queueDoc = await transaction.get(queueRef);
      if (!queueDoc.exists()) return;
      
      const data = queueDoc.data();
      
      // PRIORITY: If manualClosed is true, do NOT auto-open
      if (data.manualClosed === true) {
        return;
      }
      
      const { isOpen } = isWithinOperatingHours();
      const currentStatus = data.status;
      const newStatus = isOpen ? 'open' : 'closed';
      
      // Only update if status needs to change
      if (currentStatus !== newStatus) {
        transaction.update(queueRef, {
          status: newStatus,
          updatedAt: serverTimestamp()
        });
      }
    });
  } catch (error) {
    console.error("Error in checkAndAutoOpenClose:", error);
  }
}

/**
 * Combined check for both reset and status
 */
export async function checkQueueSchedule(type: QueueType): Promise<void> {
  await checkAndAutoResetByDate(type);
  await checkAndAutoOpenClose(type);
}

/**
 * Check all queue types
 */
export async function checkAllQueuesSchedule(): Promise<void> {
  for (const q of QUEUE_TYPES) {
    await checkQueueSchedule(q.id);
  }
}
