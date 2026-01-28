"use client";

import { useHomepageImages } from "@/hooks/useHomepageImages";
import { HOMEPAGE_IMAGE_TYPES, HomepageImageType } from "@/lib/homepage-service";
import { Coins } from "lucide-react";

export default function HomepageImages() {
  const { images, loading, error } = useHomepageImages();

  // Check if there are any images uploaded
  const hasImages = Object.keys(images).length > 0;

  // Don't show section if loading, error, or no images
  if (loading || error || !hasImages) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
            <Coins className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-medium">Info Harga Emas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Informasi Harga Emas Terkini
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Update harga emas harian dari Pegadaian untuk membantu Anda merencanakan investasi emas
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOMEPAGE_IMAGE_TYPES.map((imageType) => {
            const imageData = images[imageType.id];
            if (!imageData?.url) return null;
            
            return (
              <ImageCard
                key={imageType.id}
                type={imageType.id}
                label={imageType.label}
                url={imageData.url}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImageCard({
  type,
  label,
  url,
}: {
  type: HomepageImageType;
  label: string;
  url: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={url}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
        <h3 className="text-white font-semibold text-sm">{label}</h3>
      </div>
    </div>
  );
}
