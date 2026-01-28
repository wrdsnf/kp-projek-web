"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, Timestamp } from "firebase/firestore";

export interface TringAppSettings {
  referralCode: string;
  appStoreUrl: string;
  playStoreUrl: string;
  updatedAt?: Timestamp;
  updatedBy?: string;
}

const DEFAULT_SETTINGS: TringAppSettings = {
  referralCode: "13554",
  appStoreUrl: "https://devpds.onelink.me/v3LG/seo",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.pegadaiandigital&pcampaignid=web_share",
};

const COLLECTION = "settings";
const DOC_ID = "tring_app";

// Get Tring app settings
export async function getTringSettings(): Promise<TringAppSettings> {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() } as TringAppSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.warn("Could not fetch Tring settings:", error);
    return DEFAULT_SETTINGS;
  }
}

// Subscribe to Tring settings (real-time)
export function subscribeToTringSettings(
  callback: (settings: TringAppSettings) => void
): () => void {
  const docRef = doc(db, COLLECTION, DOC_ID);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback({ ...DEFAULT_SETTINGS, ...snap.data() } as TringAppSettings);
      } else {
        callback(DEFAULT_SETTINGS);
      }
    },
    (error) => {
      console.warn("Tring settings subscription error:", error);
      callback(DEFAULT_SETTINGS);
    }
  );
}

// Update Tring settings
export async function updateTringSettings(
  settings: Partial<TringAppSettings>,
  userId: string
): Promise<void> {
  const docRef = doc(db, COLLECTION, DOC_ID);
  const currentSettings = await getTringSettings();
  
  await setDoc(docRef, {
    ...currentSettings,
    ...settings,
    updatedAt: Timestamp.now(),
    updatedBy: userId,
  });
}
