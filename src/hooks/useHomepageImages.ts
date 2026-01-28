"use client";

import { useEffect, useState } from "react";
import { HomepageImages, subscribeToHomepageImages, getHomepageImages } from "@/lib/homepage-service";

export function useHomepageImages() {
  const [images, setImages] = useState<HomepageImages>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Try to get images once first (handles permission errors gracefully)
    getHomepageImages()
      .then((data) => {
        setImages(data);
        setLoading(false);
        
        // Only subscribe for real-time updates if initial fetch succeeded
        const unsubscribe = subscribeToHomepageImages((updatedData) => {
          setImages(updatedData);
        });
        
        return unsubscribe;
      })
      .catch((err) => {
        // Handle permission errors gracefully - just show nothing
        console.warn("Could not load homepage images:", err.message);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { images, loading, error };
}

