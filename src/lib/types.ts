import { Timestamp } from "firebase/firestore";

export type UserRole = 'admin' | 'teller';

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string;
  role: UserRole;
  handleQueue: QueueType[];
}

export type QueueType = 'gadai' | 'non_gadai';

export const QUEUE_TYPES: { id: QueueType; label: string; color: string }[] = [
  { id: 'gadai', label: 'Gadai', color: 'green' },
  { id: 'non_gadai', label: 'Non-Gadai', color: 'blue' },
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
}
