import { Timestamp } from "firebase/firestore";

export type UserRole = 'admin' | 'teller' | 'petugas_antrian';

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string;
  role: UserRole;
  handleQueue: QueueType[];
}

export type QueueType = 'gadai' | 'non_gadai';

export const QUEUE_TYPES: { id: QueueType; label: string; color: string; prefix: string }[] = [
  { id: 'gadai', label: 'Gadai', color: 'emerald', prefix: 'GD' },
  { id: 'non_gadai', label: 'Non-Gadai', color: 'blue', prefix: 'NG' },
];

export interface QueueData {
  currentNumber: number;
  lastNumber: number;
  status: 'open' | 'closed';
  date: string; // YYYY-MM-DD
  updatedAt: Timestamp; 
}

export type LogStatus = 'waiting' | 'called' | 'skipped' | 'completed';

export interface QueueLog {
  id?: string;
  type: QueueType;
  number: number;
  date: string;
  time: Timestamp;
  status: LogStatus;
  // Extended fields
  isManualInput?: boolean;      // true if created by petugas
  createdBy?: string;           // uid of petugas (if manual)
  servedBy?: string;            // uid of teller who called
  servedAt?: Timestamp;         // when called
  deviceId?: string;            // anonymous device identifier
}

export interface CooldownRecord {
  deviceId: string;
  type: QueueType;
  lastTakeTime: Timestamp;
  date: string;
}

export interface DailyStats {
  date: string;                 // YYYY-MM-DD
  totalCustomers: number;
  gadaiCount: number;
  nonGadaiCount: number;
  manualInputCount: number;
  peakHour?: string;            // e.g., "10:00-11:00"
  closedAt?: Timestamp;
}

// Helper to get queue code from type and number
export const getQueueCode = (type: QueueType, number: number): string => {
  const prefix = QUEUE_TYPES.find(q => q.id === type)?.prefix || 'XX';
  return `${prefix}-${String(number).padStart(3, '0')}`;
};

// Helper to parse queue code
export const parseQueueCode = (code: string): { type: QueueType; number: number } | null => {
  const match = code.match(/^(GD|NG)-(\d{3})$/i);
  if (!match) return null;
  const prefix = match[1].toUpperCase();
  const number = parseInt(match[2], 10);
  const type = prefix === 'GD' ? 'gadai' : 'non_gadai';
  return { type, number };
};

