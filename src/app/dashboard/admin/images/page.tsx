"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useHomepageImages } from "@/hooks/useHomepageImages";
import { 
  uploadHomepageImage, 
  HOMEPAGE_IMAGE_TYPES, 
  HomepageImageType 
} from "@/lib/homepage-service";
import {
  validateImageFile,
  createLocalPreview,
  revokeLocalPreview,
  formatBytes,
} from "@/lib/image-compression";
import { Upload, Image as ImageIcon, Check, Loader2, ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  status: UploadStatus;
  progress: number;
  error: string | null;
  localPreview: string | null;
  fileSize: number | null;
}

const initialUploadState: UploadState = {
  status: 'idle',
  progress: 0,
  error: null,
  localPreview: null,
  fileSize: null,
};

export default function AdminImagesPage() {
  const { profile } = useAuth();
  const { images, loading } = useHomepageImages();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link 
              href="/dashboard/admin" 
              className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-700" />
            </Link>
            <h1 className="text-2xl font-bold text-emerald-900">Update Gambar Homepage</h1>
          </div>
          <p className="text-emerald-600 ml-11">
            Upload dan kelola gambar yang tampil di halaman utama website
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HOMEPAGE_IMAGE_TYPES.map((imageType) => (
          <ImageUploadCard
            key={imageType.id}
            type={imageType.id}
            label={imageType.label}
            description={imageType.description}
            currentUrl={images[imageType.id]?.url}
            updatedAt={images[imageType.id]?.updatedAt?.toDate()}
            userId={profile?.uid || ""}
          />
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Tips:</strong>
        <ul className="mt-2 space-y-1 ml-4 list-disc">
          <li>Format yang didukung: JPG, PNG, WEBP</li>
          <li>Ukuran maksimal: 5MB</li>
          <li>Gambar akan dioptimasi otomatis untuk loading cepat</li>
          <li>Gambar akan langsung tampil di homepage setelah diupload</li>
        </ul>
      </div>
    </div>
  );
}

function ImageUploadCard({
  type,
  label,
  description,
  currentUrl,
  updatedAt,
  userId,
}: {
  type: HomepageImageType;
  label: string;
  description: string;
  currentUrl?: string;
  updatedAt?: Date;
  userId: string;
}) {
  const [uploadState, setUploadState] = useState<UploadState>(initialUploadState);
  const [optimisticUrl, setOptimisticUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Display URL priority: local preview > optimistic URL > current URL
  const displayUrl = uploadState.localPreview || optimisticUrl || currentUrl;

  const resetState = useCallback(() => {
    if (uploadState.localPreview) {
      revokeLocalPreview(uploadState.localPreview);
    }
    setUploadState(initialUploadState);
    setOptimisticUrl(null);
  }, [uploadState.localPreview]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous state
    if (uploadState.localPreview) {
      revokeLocalPreview(uploadState.localPreview);
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadState({
        ...initialUploadState,
        status: 'error',
        error: validation.error || 'File tidak valid',
      });
      return;
    }

    // Create instant local preview
    const localPreviewUrl = createLocalPreview(file);
    setUploadState({
      status: 'uploading',
      progress: 0,
      error: null,
      localPreview: localPreviewUrl,
      fileSize: file.size,
    });

    try {
      // Upload via Cloudinary API with progress tracking
      const url = await uploadHomepageImage(
        type,
        file,
        userId,
        (progress) => {
          setUploadState(prev => ({
            ...prev,
            progress,
          }));
        }
      );

      // Optimistic update - show the uploaded URL immediately
      setOptimisticUrl(url);
      
      // Success state
      setUploadState(prev => ({
        ...prev,
        status: 'success',
        progress: 100,
      }));

      // Clean up local preview after success display
      setTimeout(() => {
        if (uploadState.localPreview) {
          revokeLocalPreview(uploadState.localPreview);
        }
        setUploadState(prev => ({
          ...prev,
          localPreview: null,
          status: 'idle',
        }));
      }, 2000);

    } catch (err) {
      setUploadState(prev => ({
        ...prev,
        status: 'error',
        error: (err as Error).message,
      }));
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRetry = () => {
    resetState();
    fileInputRef.current?.click();
  };

  const isUploading = uploadState.status === 'uploading';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
      {/* Image Preview */}
      <div className="relative aspect-video bg-emerald-100 flex items-center justify-center">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-emerald-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Belum ada gambar</p>
          </div>
        )}
        
        {/* Uploading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="text-sm font-medium">Mengupload gambar...</span>
            <div className="w-32 h-2 bg-white/30 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
            <span className="text-xs mt-1">{uploadState.progress}%</span>
          </div>
        )}

        {/* Success overlay */}
        {uploadState.status === 'success' && (
          <div className="absolute inset-0 bg-emerald-500/80 flex flex-col items-center justify-center text-white">
            <Check className="w-12 h-12 mb-2" />
            <span className="font-medium">Berhasil diupload!</span>
          </div>
        )}
        
        {/* Upload overlay on hover */}
        {!isUploading && uploadState.status !== 'success' && (
          <label className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors cursor-pointer flex items-center justify-center group">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">
                {currentUrl ? 'Ganti Gambar' : 'Upload Gambar'}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-emerald-900">{label}</h3>
        <p className="text-sm text-emerald-600 mt-1">{description}</p>
        
        {/* Status & Info */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            {/* Error state */}
            {uploadState.status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{uploadState.error}</span>
              </div>
            )}
            
            {/* File size info during upload */}
            {uploadState.fileSize && isUploading && (
              <div className="text-xs text-emerald-600">
                Ukuran: {formatBytes(uploadState.fileSize)}
              </div>
            )}
            
            {/* Last updated info */}
            {uploadState.status === 'idle' && updatedAt && (
              <div className="text-xs text-emerald-500">
                Diupdate: {updatedAt.toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
          
          {/* Action Button */}
          {uploadState.status === 'error' ? (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Coba Lagi
            </button>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Proses...' : 'Upload'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
