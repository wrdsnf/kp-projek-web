/**
 * Image utility functions for validation and preview
 * Note: Compression is handled by Cloudinary server-side
 */

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Format tidak didukung. Gunakan JPG, PNG, atau WEBP.' 
    };
  }

  // Max 5MB (Cloudinary will optimize)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'Ukuran file terlalu besar. Maksimal 5MB.' 
    };
  }

  return { valid: true };
}

/**
 * Create a local preview URL for instant display
 */
export function createLocalPreview(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke a local preview URL to free memory
 */
export function revokeLocalPreview(url: string): void {
  URL.revokeObjectURL(url);
}
