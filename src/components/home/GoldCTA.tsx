"use client";

import { useState, useEffect } from "react";
import { Coins, MessageCircle, Phone, Sparkles, BadgeCheck, Banknote } from "lucide-react";
import { subscribeToTringSettings, TringAppSettings } from "@/lib/tring-service";

// Fallback values (same as hardcoded before)
const FALLBACK_WA_PRIMARY_LINK = "https://wa.me/62895413310250?text=Halo,%20saya%20ingin%20bertanya%20tentang%20";
const FALLBACK_WA_SECONDARY_LINK = "https://wa.me/6287717657945?text=Halo,%20saya%20ingin%20bertanya%20tentang%20";
const FALLBACK_WA_PRIMARY_NAME = "Yunita";
const FALLBACK_WA_SECONDARY_NAME = "Tohir";

export default function GoldCTA() {
  const [settings, setSettings] = useState<TringAppSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTringSettings((data) => {
      setSettings(data);
    });
    return () => unsubscribe();
  }, []);

  // Use settings or fallback
  const whatsappLink = settings?.whatsappLinkPrimary || FALLBACK_WA_PRIMARY_LINK;
  const whatsappLink2 = settings?.whatsappLinkSecondary || FALLBACK_WA_SECONDARY_LINK;
  const primaryName = settings?.whatsappNamePrimary || FALLBACK_WA_PRIMARY_NAME;
  const secondaryName = settings?.whatsappNameSecondary || FALLBACK_WA_SECONDARY_NAME;

  return (
    <section id="investasi-emas" className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-500 to-yellow-500 py-16 md:py-24">
      {/* Gold Photo Background - Subtle overlay (matches Hero approach) */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("/emas.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Warm overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 via-amber-400/30 to-yellow-500/40" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <Coins className="w-5 h-5 text-amber-900" />
              <span className="text-amber-900 text-sm font-semibold">Investasi Emas</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-amber-900 mb-4">
              Nabung & Beli Emas di Pegadaian
            </h2>
            <p className="text-amber-800 text-lg mb-6 max-w-lg mx-auto lg:mx-0">
              Wujudkan impian investasi emas Anda mulai dari <strong>Rp10.000</strong>. 
              Aman, terjamin, dan bisa dicairkan kapan saja. Emas fisik tersedia untuk dicetak atau dijual kembali.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <span className="px-4 py-2 bg-white/30 rounded-full text-amber-900 text-sm font-medium flex items-center gap-2">
                <Banknote className="w-4 h-4" /> Buyback Tinggi
              </span>
              <span className="px-4 py-2 bg-white/30 rounded-full text-amber-900 text-sm font-medium flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" /> Emas 24 Karat
              </span>
              <span className="px-4 py-2 bg-white/30 rounded-full text-amber-900 text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Cetak Fisik Emas
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={`${whatsappLink}Tabungan%20Emas`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi {primaryName}
              </a>
              <a
                href={`${whatsappLink2}Beli%20Emas`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-800 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi {secondaryName}
              </a>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Gold Image Illustration */}
              <div className="w-80 h-80 relative">
                {/* Outer gold border frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-2xl transform rotate-6 shadow-2xl" />
                {/* Inner gold highlight */}
                <div className="absolute inset-[3px] bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 rounded-2xl transform rotate-6" />
                {/* Image container */}
                <div className="absolute inset-2 rounded-xl transform rotate-6 overflow-hidden shadow-inner">
                  <img 
                    src="/emas.jpeg" 
                    alt="Emas Pegadaian"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle inner glow overlay */}
                  <div className="absolute inset-0 ring-2 ring-inset ring-amber-400/30 rounded-xl" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/30 rounded-full flex items-center justify-center animate-bounce">
                <Banknote className="w-8 h-8 text-amber-800" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-6 h-6 text-amber-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

