"use client";

import { useEffect, useCallback, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

interface ImageViewerModalProps {
  isOpen: boolean;
  imageUrl: string;
  imageAlt: string;
  onClose: () => void;
}

export default function ImageViewerModal({
  isOpen,
  imageUrl,
  imageAlt,
  onClose,
}: ImageViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle download
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${imageAlt.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback: open in new tab
      window.open(imageUrl, "_blank");
    }
  }, [imageUrl, imageAlt]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Modal content */}
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top toolbar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <h3 className="text-white font-medium truncate max-w-[60%]">
            {imageAlt}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image viewer with zoom/pan */}
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.1 }}
          doubleClick={{ mode: "toggle" }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                <button
                  onClick={() => zoomOut()}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => zoomIn()}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-white/30 mx-1" />
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              {/* Image container */}
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => setIsLoading(false)}
                  style={{ opacity: isLoading ? 0 : 1 }}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* Instructions */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-xs text-center pointer-events-none">
          Scroll atau pinch untuk zoom • Drag untuk geser • Double-tap untuk zoom
        </div>
      </div>
    </div>
  );
}
