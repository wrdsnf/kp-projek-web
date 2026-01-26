import { db } from "./firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { DailyStats, QueueType } from "./types";

/**
 * Generate daily stats from queue_logs for a specific date
 */
export const generateDailyStats = async (date: string): Promise<DailyStats> => {
  const logsQuery = query(
    collection(db, "queue_logs"),
    where("date", "==", date)
  );
  
  const snapshot = await getDocs(logsQuery);
  
  let gadaiCount = 0;
  let nonGadaiCount = 0;
  let manualInputCount = 0;
  const hourCounts: Record<string, number> = {};
  
  snapshot.forEach((doc) => {
    const data = doc.data();
    
    // Count by type
    if (data.type === 'gadai') {
      gadaiCount++;
    } else {
      nonGadaiCount++;
    }
    
    // Count manual inputs
    if (data.isManualInput) {
      manualInputCount++;
    }
    
    // Track hour for peak calculation
    if (data.time) {
      const hour = new Date(data.time.toDate()).getHours();
      const hourKey = `${String(hour).padStart(2, '0')}:00-${String(hour + 1).padStart(2, '0')}:00`;
      hourCounts[hourKey] = (hourCounts[hourKey] || 0) + 1;
    }
  });
  
  // Find peak hour
  let peakHour: string | undefined;
  let maxCount = 0;
  for (const [hour, count] of Object.entries(hourCounts)) {
    if (count > maxCount) {
      maxCount = count;
      peakHour = hour;
    }
  }
  
  const stats: DailyStats = {
    date,
    totalCustomers: gadaiCount + nonGadaiCount,
    gadaiCount,
    nonGadaiCount,
    manualInputCount,
    peakHour
  };
  
  return stats;
};

/**
 * Save daily stats to database
 */
export const saveDailyStats = async (stats: DailyStats): Promise<void> => {
  const statsRef = doc(db, "daily_stats", stats.date);
  await setDoc(statsRef, {
    ...stats,
    closedAt: serverTimestamp()
  });
};

/**
 * Get stats for a date range
 */
export const getStatsHistory = async (
  startDate: string, 
  endDate: string
): Promise<DailyStats[]> => {
  const statsQuery = query(
    collection(db, "daily_stats"),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "desc")
  );
  
  const snapshot = await getDocs(statsQuery);
  return snapshot.docs.map(doc => doc.data() as DailyStats);
};

/**
 * Get stats for a specific type within date range
 */
export const getStatsByType = async (
  startDate: string,
  endDate: string,
  type: QueueType
): Promise<{ date: string; count: number }[]> => {
  const logsQuery = query(
    collection(db, "queue_logs"),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    where("type", "==", type),
    orderBy("date", "desc")
  );
  
  const snapshot = await getDocs(logsQuery);
  
  // Group by date
  const dateCounts: Record<string, number> = {};
  snapshot.forEach((doc) => {
    const data = doc.data();
    dateCounts[data.date] = (dateCounts[data.date] || 0) + 1;
  });
  
  return Object.entries(dateCounts).map(([date, count]) => ({ date, count }));
};

/**
 * Generate and save stats for today (call when closing queue)
 */
export const closeAndSaveStats = async (): Promise<DailyStats> => {
  const today = new Date().toISOString().split('T')[0];
  const stats = await generateDailyStats(today);
  await saveDailyStats(stats);
  return stats;
};
