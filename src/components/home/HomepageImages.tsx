"use client";

import { useState } from "react";
import { useHomepageImages } from "@/hooks/useHomepageImages";
import { HOMEPAGE_IMAGE_TYPES, HomepageImageType } from "@/lib/homepage-service";
import { Coins, Expand, ChevronLeft, ChevronRight } from "lucide-react";
import ImageViewerModal from "@/components/ImageViewerModal";

export default function HomepageImages() {
  const { images, loading, error } = useHomepageImages();
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    url: string;
    label: string;
  }>({
    isOpen: false,
    url: "",
    label: "",
  });

  // Check if there are any images uploaded
  const hasImages = Object.keys(images).length > 0;

  // Don't show section if loading, error, or no images
  if (loading || error || !hasImages) {
    return null;
  }

  const openViewer = (url: string, label: string) => {
    setViewerState({ isOpen: true, url, label });
  };

  const closeViewer = () => {
    setViewerState({ isOpen: false, url: "", label: "" });
  };

  // Filter to only show images that exist
  const availableImages = HOMEPAGE_IMAGE_TYPES.filter(
    (imageType) => images[imageType.id]?.url
  );

  return (
    <>
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 text-sm font-medium">Info Harga Emas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Informasi Harga Emas Terkini
            </h2>
            <p className="text-emerald-700 max-w-2xl mx-auto">
              Update harga emas harian dari Pegadaian untuk membantu Anda merencanakan investasi emas
            </p>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {availableImages.map((imageType) => {
              const imageData = images[imageType.id];
              if (!imageData?.url) return null;
              
              return (
                <ImageCard
                  key={imageType.id}
                  type={imageType.id}
                  label={imageType.label}
                  url={imageData.url}
                  onViewFullscreen={() => openViewer(imageData.url, imageType.label)}
                />
              );
            })}
          </div>

          {/* Mobile Horizontal Slider (hidden on desktop) */}
          <div className="md:hidden relative">
            {/* Swipe hint */}
            <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs mb-3">
              <ChevronLeft className="w-4 h-4" />
              <span>Geser untuk melihat semua</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            
            {/* Horizontal scroll container */}
            <div 
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Left padding spacer */}
              <div className="flex-shrink-0 w-2" />
              
              {availableImages.map((imageType) => {
                const imageData = images[imageType.id];
                if (!imageData?.url) return null;
                
                return (
                  <div 
                    key={imageType.id}
                    className="flex-shrink-0 w-[75vw] max-w-[300px] snap-center"
                  >
                    <ImageCard
                      type={imageType.id}
                      label={imageType.label}
                      url={imageData.url}
                      onViewFullscreen={() => openViewer(imageData.url, imageType.label)}
                      isMobile
                    />
                  </div>
                );
              })}
              
              {/* Right padding spacer */}
              <div className="flex-shrink-0 w-2" />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {availableImages.map((_, index) => (
                <div 
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Click hint */}
          <p className="text-center text-emerald-500 text-sm mt-6">
            Klik gambar untuk memperbesar
          </p>
        </div>
      </section>

      {/* Hide scrollbar globally for this component */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Fullscreen Image Viewer Modal */}
      <ImageViewerModal
        isOpen={viewerState.isOpen}
        imageUrl={viewerState.url}
        imageAlt={viewerState.label}
        onClose={closeViewer}
      />
    </>
  );
}

function ImageCard({
  type,
  label,
  url,
  onViewFullscreen,
  isMobile = false,
}: {
  type: HomepageImageType;
  label: string;
  url: string;
  onViewFullscreen: () => void;
  isMobile?: boolean;
}) {
  return (
    <div 
      className={`
        group relative bg-white rounded-2xl shadow-md hover:shadow-xl 
        transition-all overflow-hidden border border-emerald-100 cursor-pointer
        ${isMobile ? 'active:scale-[0.98]' : ''}
      `}
      onClick={onViewFullscreen}
    >
      {/* Image - 16:9 on mobile, 4:5 on desktop */}
      <div className={`overflow-hidden ${isMobile ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
        <img
          src={url}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Expand icon on hover/tap */}
      <div className={`
        absolute top-3 right-3 transition-opacity
        ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
      `}>
        <div className="p-2 rounded-full bg-black/50 text-white">
          <Expand className="w-4 h-4" />
        </div>
      </div>
      
      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
        <h3 className="text-white font-semibold text-sm">{label}</h3>
      </div>
    </div>
  );
}
