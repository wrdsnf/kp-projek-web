import { db } from "./firebase";
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { QueueType } from "./types";

const COOLDOWN_MINUTES = 10;
const DEVICE_ID_KEY = "queue_device_id";

/**
 * Get or generate device ID for cooldown tracking
 */
export const getDeviceId = (): string => {
  if (typeof window === 'undefined') return 'server';
  
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};

/**
 * Check if user can take queue (cooldown expired)
 */
export const canTakeQueue = async (type: QueueType): Promise<{
  allowed: boolean;
  remainingMs?: number;
  remainingSeconds?: number;
}> => {
  const deviceId = getDeviceId();
  const cooldownId = `${deviceId}_${type}`;
  
  try {
    const cooldownRef = doc(db, "cooldowns", cooldownId);
    const cooldownDoc = await getDoc(cooldownRef);
    
    if (!cooldownDoc.exists()) {
      return { allowed: true };
    }
    
    const data = cooldownDoc.data();
    const lastTakeTime = data.lastTakeTime as Timestamp;
    const lastTakeMs = lastTakeTime.toMillis();
    const now = Date.now();
    const cooldownMs = COOLDOWN_MINUTES * 60 * 1000;
    const elapsed = now - lastTakeMs;
    
    if (elapsed >= cooldownMs) {
      return { allowed: true };
    }
    
    const remainingMs = cooldownMs - elapsed;
    return { 
      allowed: false, 
      remainingMs,
      remainingSeconds: Math.ceil(remainingMs / 1000)
    };
  } catch (error) {
    console.error("Error checking cooldown:", error);
    // If error, allow (fail open for UX, server will validate)
    return { allowed: true };
  }
};

/**
 * Record queue take to start cooldown
 */
export const recordCooldown = async (type: QueueType): Promise<void> => {
  const deviceId = getDeviceId();
  const cooldownId = `${deviceId}_${type}`;
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const cooldownRef = doc(db, "cooldowns", cooldownId);
    await setDoc(cooldownRef, {
      deviceId,
      type,
      lastTakeTime: serverTimestamp(),
      date: today
    });
  } catch (error) {
    console.error("Error recording cooldown:", error);
    // Don't throw - queue was already taken successfully
  }
};

/**
 * Check cooldown from localStorage (faster, for UI)
 */
export const getLocalCooldown = (type: QueueType): {
  active: boolean;
  remainingMs?: number;
  expiresAt?: number;
} => {
  if (typeof window === 'undefined') return { active: false };
  
  const key = `cooldown_${type}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return { active: false };
  
  const expiresAt = parseInt(stored, 10);
  const now = Date.now();
  
  if (now >= expiresAt) {
    localStorage.removeItem(key);
    return { active: false };
  }
  
  return {
    active: true,
    remainingMs: expiresAt - now,
    expiresAt
  };
};

/**
 * Set local cooldown (call after successful queue take)
 */
export const setLocalCooldown = (type: QueueType): void => {
  if (typeof window === 'undefined') return;
  
  const key = `cooldown_${type}`;
  const expiresAt = Date.now() + (COOLDOWN_MINUTES * 60 * 1000);
  localStorage.setItem(key, expiresAt.toString());
};

/**
 * Format remaining seconds to MM:SS
 */
export const formatCooldown = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};
