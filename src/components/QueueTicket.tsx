"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import { QueueType, getQueueCode } from "@/lib/types";
import { Download, Share2, X, Gem, FileText, Building2, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueueTicketProps {
  type: QueueType;
  number: number;
  onClose: () => void;
}

export default function QueueTicket({ type, number, onClose }: QueueTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.3);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  
  const queueCode = getQueueCode(type, number);
  const isGadai = type === "gadai";
  const serviceLabel = isGadai ? "Gadai" : "Non-Gadai";
  const statusUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/antrian/status?kode=${queueCode}`
    : `/antrian/status?kode=${queueCode}`;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { 
    weekday: "long", 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  });
  const timeStr = now.toLocaleTimeString("id-ID", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  const shareText = `Pegadaian CP Sentul

Nomor Antrian: ${queueCode}
Jenis Layanan: ${serviceLabel}

Pantau antrian Anda di:
${statusUrl}`;

  // Calculate preview scale
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPreviewScale(rect.width / 1080);
    }
  }, []);

  // Generate image on mount (after a short delay for rendering)
  useEffect(() => {
    const generateImage = async () => {
      // Wait for ticket to render
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!ticketRef.current) return;
      
      try {
        const dataUrl = await toPng(ticketRef.current, {
          width: 1080,
          height: 1080,
          pixelRatio: 1,
          backgroundColor: "#ffffff",
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
          }
        });
        
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        setImageBlob(blob);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    
    generateImage();
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateScale, 100);
    window.addEventListener("resize", updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScale);
    };
  }, [updateScale]);

  // Download pre-generated image
  const handleDownload = () => {
    if (!imageBlob) return;
    
    const url = URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `antrian-${queueCode}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy TEXT ONLY - no image
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Teks berhasil disalin!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Share with pre-generated IMAGE + text + link
  const handleShare = async () => {
    if (!imageBlob) {
      // Fallback if image not ready
      if (navigator.share) {
        try {
          await navigator.share({
            title: `Nomor Antrian ${queueCode}`,
            text: shareText,
            url: statusUrl,
          });
        } catch (e) {
          if ((e as Error).name !== "AbortError") {
            console.error("Share error:", e);
          }
        }
      }
      return;
    }

    const file = new File([imageBlob], `antrian-${queueCode}.png`, { type: "image/png" });
    
    if (navigator.share) {
      try {
        // Try to share with image
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Nomor Antrian ${queueCode}`,
            text: shareText,
            files: [file],
          });
        } else {
          // Fallback: share text only
          await navigator.share({
            title: `Nomor Antrian ${queueCode}`,
            text: shareText,
            url: statusUrl,
          });
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share error:", error);
        }
      }
    } else {
      // Desktop fallback: download image
      handleDownload();
    }
  };

  const headerBg = isGadai 
    ? "bg-gradient-to-r from-green-700 to-green-800" 
    : "bg-gradient-to-r from-blue-700 to-blue-800";
  
  const footerBg = isGadai ? "bg-green-900" : "bg-blue-900";
  const numberColor = isGadai ? "text-green-600" : "text-blue-600";
  const badgeBg = isGadai ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
  const btnBg = isGadai ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Tiket Antrian</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Preview Container */}
        <div className="p-3">
          <div 
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-lg shadow-lg"
            style={{ aspectRatio: "1/1" }}
          >
            {/* Loading overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            )}
            
            {/* Ticket Canvas - 1080x1080 scaled for preview */}
            <div 
              ref={ticketRef}
              className="absolute top-0 left-0 origin-top-left"
              style={{ 
                width: 1080, 
                height: 1080,
                transform: `scale(${previewScale})`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* HEADER - 20% = 216px */}
              <div 
                className={cn("w-full flex items-center justify-center gap-6", headerBg)}
                style={{ height: 216 }}
              >
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-14 h-14 text-white" />
                </div>
                <div className="text-white text-center">
                  <div className="text-4xl font-black tracking-tight">PEGADAIAN</div>
                  <div className="text-2xl font-semibold text-amber-400">CP SENTUL</div>
                </div>
              </div>

              {/* MAIN CONTENT - 50% = 540px */}
              <div 
                className="w-full flex flex-col items-center justify-center bg-gray-50"
                style={{ height: 540 }}
              >
                <p className="text-3xl text-gray-500 uppercase tracking-widest mb-2">
                  Nomor Antrian Anda
                </p>
                
                {/* Queue Number - VERY LARGE */}
                <div className={cn("text-[200px] font-black leading-none tracking-tight", numberColor)}>
                  {queueCode}
                </div>

                {/* Service Badge */}
                <div className={cn("mt-4 flex items-center gap-3 px-8 py-4 rounded-full text-2xl font-bold", badgeBg)}>
                  {isGadai ? <Gem className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                  Layanan {serviceLabel}
                </div>
              </div>

              {/* INFO SECTION - 15% = 162px */}
              <div 
                className="w-full flex flex-col items-center justify-center bg-white"
                style={{ height: 162 }}
              >
                <p className="text-2xl text-gray-600">{dateStr}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">Pukul {timeStr} WIB</p>
                <p className="mt-3 text-xl text-gray-500">
                  Simpan gambar ini untuk memantau antrian Anda
                </p>
              </div>

              {/* FOOTER - 15% = 162px */}
              <div 
                className={cn("w-full flex items-center justify-center gap-8 px-12", footerBg)}
                style={{ height: 162 }}
              >
                {/* QR Code */}
                <div className="bg-white p-3 rounded-xl">
                  <QRCodeSVG 
                    value={statusUrl}
                    size={100}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                
                {/* Footer Text */}
                <div className="flex-1 text-white">
                  <p className="text-xl font-semibold mb-1">Scan QR Code</p>
                  <p className="text-lg text-white/80 leading-snug">
                    Pantau status antrian di website resmi Pegadaian CP Sentul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-colors disabled:opacity-50",
              btnBg
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menyiapkan...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Gambar
              </>
            )}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              Salin Teks
            </button>
            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors disabled:opacity-50 text-sm"
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
