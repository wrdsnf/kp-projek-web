"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, Timestamp } from "firebase/firestore";

// Homepage image types
export type HomepageImageType = 
  | 'harga_emas_hari_ini' 
  | 'harga_emas_tring' 
  | 'harga_emas_arisan' 
  | 'tabungan_emas';

export const HOMEPAGE_IMAGE_TYPES: { 
  id: HomepageImageType; 
  label: string; 
  description: string 
}[] = [
  { 
    id: 'harga_emas_hari_ini', 
    label: 'Harga Emas Hari Ini', 
    description: 'Gambar harga emas terkini untuk tampilan utama' 
  },
  { 
    id: 'harga_emas_tring', 
    label: 'Harga Emas di Aplikasi Tring', 
    description: 'Gambar harga emas dari aplikasi Tring' 
  },
  { 
    id: 'harga_emas_arisan', 
    label: 'Harga Emas Arisan', 
    description: 'Gambar harga emas untuk program arisan' 
  },
  { 
    id: 'tabungan_emas', 
    label: 'Tabungan Emas', 
    description: 'Gambar informasi tabungan emas' 
  },
];

export interface HomepageImageData {
  url: string;
  updatedAt: Timestamp;
  updatedBy: string;
  fileName: string;
  publicId?: string; // Cloudinary public_id
}

export interface HomepageImages {
  [key: string]: HomepageImageData | undefined;
}

const COLLECTION = "settings";
const DOC_ID = "homepage_images";

// Get all homepage images
export async function getHomepageImages(): Promise<HomepageImages> {
  const docRef = doc(db, COLLECTION, DOC_ID);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as HomepageImages;
  }
  return {};
}

// Subscribe to homepage images (real-time)
export function subscribeToHomepageImages(
  callback: (images: HomepageImages) => void
): () => void {
  const docRef = doc(db, COLLECTION, DOC_ID);
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as HomepageImages);
    } else {
      callback({});
    }
  });
}

// Upload response type from API
interface UploadResponse {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

// Upload a homepage image via Cloudinary API
export async function uploadHomepageImage(
  type: HomepageImageType,
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  // Start fake progress (Cloudinary uploads are fast)
  onProgress?.(10);
  
  // Prepare form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  onProgress?.(30);
  
  // Upload to Cloudinary via API route
  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });
  
  onProgress?.(70);
  
  const data: UploadResponse = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Gagal mengupload gambar. Silakan coba lagi.');
  }
  
  onProgress?.(85);
  
  // Save URL to Firestore
  const docRef = doc(db, COLLECTION, DOC_ID);
  const currentData = await getHomepageImages();
  
  await setDoc(docRef, {
    ...currentData,
    [type]: {
      url: data.url,
      updatedAt: Timestamp.now(),
      updatedBy: userId,
      fileName: file.name,
      publicId: data.publicId,
    }
  });
  
  onProgress?.(100);
  
  return data.url!;
}

// Get single image URL (for display)
export async function getImageUrl(type: HomepageImageType): Promise<string | null> {
  const images = await getHomepageImages();
  return images[type]?.url || null;
}
