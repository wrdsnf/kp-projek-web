"use client";

import { useState, useEffect } from "react";
import { useQueue } from "@/hooks/useQueue";
import { takeQueue } from "@/lib/queue-service";
import { QUEUE_TYPES, QueueType, getQueueCode } from "@/lib/types";
import { canTakeQueue, getLocalCooldown, formatCooldown } from "@/lib/cooldown-service";
import { cn } from "@/lib/utils";
import QueueTicket from "@/components/QueueTicket";
import ResetCountdown from "@/components/ResetCountdown";
import { useQueueAutoResetCheck } from "@/hooks/useQueueAutoReset";
import { Ticket, Gem, FileText, Info, Clock, Loader2, Bell, CheckCircle, Share2, Link2, Image } from "lucide-react";
import { GlobalNavbar } from "@/components/layout";
import GlobalFooter from "@/components/layout/GlobalFooter";

export default function QueuePage() {
  // Trigger auto-reset check on mount
  useQueueAutoResetCheck();

  const [myNumbers, setMyNumbers] = useState<Record<QueueType, number | null>>({
    gadai: null,
    non_gadai: null,
  });
  const [loadingAction, setLoadingAction] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("myQueueNumbers");
    if (saved) {
      setMyNumbers(JSON.parse(saved));
    }
  }, []);

  const handleTakeQueue = async (type: QueueType) => {
    // Check cooldown first
    const cooldownCheck = await canTakeQueue(type);
    if (!cooldownCheck.allowed) {
      const remaining = formatCooldown(cooldownCheck.remainingSeconds || 0);
      alert(`Cooldown aktif! Silakan tunggu ${remaining} lagi sebelum mengambil antrian.`);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem("queueLog") || "{}");
    
    if (stored[type] && stored[type].date === today) {
        alert(`Anda sudah mengambil antrian ${type === 'gadai' ? 'Gadai' : 'Non-Gadai'} hari ini: Nomor ${stored[type].number}`);
        setMyNumbers(prev => ({...prev, [type]: stored[type].number}));
        return;
    }

    setLoadingAction(true);
    try {
      const number = await takeQueue(type);
      
      const newNumbers = { ...myNumbers, [type]: number };
      setMyNumbers(newNumbers);
      
      localStorage.setItem("myQueueNumbers", JSON.stringify(newNumbers));
      
      stored[type] = { date: today, number };
      localStorage.setItem("queueLog", JSON.stringify(stored));

    } catch (error) {
      alert((error as Error).message || "Gagal mengambil antrian");
    } finally {
      setLoadingAction(false);
    }
  };

  // Clear number and cooldown if queue was reset (user's number > lastNumber or lastNumber is 0)
  const clearIfReset = (type: QueueType, lastNumber: number) => {
    // If lastNumber is 0, queue was reset - clear cooldown
    if (lastNumber === 0) {
      localStorage.removeItem(`cooldown_${type}`);
    }
    
    if (myNumbers[type] && lastNumber < myNumbers[type]!) {
      // Queue was reset, clear local storage for this type
      const newNumbers = { ...myNumbers, [type]: null };
      setMyNumbers(newNumbers);
      localStorage.setItem("myQueueNumbers", JSON.stringify(newNumbers));
      
      // Also clear the daily log
      const stored = JSON.parse(localStorage.getItem("queueLog") || "{}");
      delete stored[type];
      localStorage.setItem("queueLog", JSON.stringify(stored));
      
      // Clear cooldown
      localStorage.removeItem(`cooldown_${type}`);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <GlobalNavbar />
      {/* Background Layers */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-600" />
      
      {/* Real Photo Background - Subtle overlay */}
      <div 
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `url("/bg.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/60 to-emerald-900/80" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content - relative to appear above backgrounds */}
      <div className="relative z-10">

        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30 mb-4">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Antrian Online</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Ambil Nomor Antrian</h1>
          <p className="text-emerald-200">Pilih jenis layanan dan ambil nomor antrian Anda</p>
        </header>

        {/* Queue Cards - Horizontal on desktop, vertical on mobile */}
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {QUEUE_TYPES.map((q) => (
              <QueueCard 
                key={q.id} 
                type={q.id} 
                label={q.label} 
                color={q.color} 
                myNumber={myNumbers[q.id]}
                onTake={() => handleTakeQueue(q.id)}
                loading={loadingAction}
                onCheckReset={clearIfReset}
              />
            ))}
          </div>
        </div>
        
        {/* Info Card */}
        <div className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              Informasi
            </h3>
            <ul className="text-emerald-200 text-sm space-y-2">
              <li>• Nomor antrian tersimpan otomatis di browser Anda</li>
              <li>• Cooldown 10 menit setelah mengambil antrian</li>
              <li>• Pantau nomor yang sedang dilayani secara realtime</li>
              <li>• Gunakan tombol <strong>Bagikan</strong> untuk menyimpan link antrian</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}

function QueueCard({ 
  type, 
  label, 
  color, 
  myNumber, 
  onTake,
  loading,
  onCheckReset
}: { 
  type: QueueType; 
  label: string; 
  color: string; 
  myNumber: number | null; 
  onTake: () => void;
  loading: boolean;
  onCheckReset: (type: QueueType, lastNumber: number) => void;
}) {
  const { data, loading: queueLoading } = useQueue(type);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);
  const [showTicket, setShowTicket] = useState(false);

  // Check cooldown and update countdown
  useEffect(() => {
    const checkCooldown = () => {
      const local = getLocalCooldown(type);
      if (local.active && local.remainingMs) {
        setCooldownRemaining(Math.ceil(local.remainingMs / 1000));
      } else {
        setCooldownRemaining(null);
      }
    };
    
    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, [type]);

  // Check if queue was reset
  useEffect(() => {
    if (data && myNumber) {
      onCheckReset(type, data.lastNumber);
    }
  }, [data?.lastNumber]);

  const isGadai = color === 'emerald';
  const bgGradient = isGadai 
    ? "from-emerald-600 to-emerald-500" 
    : "from-amber-500 to-amber-600";
  const btnColor = isGadai 
    ? "bg-emerald-500 hover:bg-emerald-400 text-white" 
    : "bg-amber-500 hover:bg-amber-400 text-white";

  const copyLink = () => {
    if (!myNumber) return;
    const code = getQueueCode(type, myNumber);
    const url = `${window.location.origin}/antrian/status?kode=${code}`;
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin!");
  };

  const shareQueue = async () => {
    if (!myNumber) return;
    const code = getQueueCode(type, myNumber);
    const url = `${window.location.origin}/antrian/status?kode=${code}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Nomor Antrian ${code}`,
          text: `Nomor antrian saya di Pegadaian Sentul: ${code}`,
          url
        });
      } catch (err) {
        // User cancelled or error
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  return (
    <>
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-fit self-start">
      {/* Header */}
      <div className={cn("bg-gradient-to-r p-4 flex justify-between items-center", bgGradient)}>
        <div className="flex items-center gap-3">
          {isGadai ? (
            <Gem className="w-8 h-8 text-white" />
          ) : (
            <FileText className="w-8 h-8 text-white" />
          )}
          <div>
            <h2 className="text-xl font-bold text-white">{label}</h2>
            <p className="text-white/70 text-xs">
              {isGadai ? "Gadai Emas & Elektronik" : "Pelunasan, Cicil, Pembayaran"}
            </p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-bold",
          data?.status === 'open' ? "bg-white/20 text-white" : "bg-red-500 text-white"
        )}>
          {data?.status === 'open' ? '● BUKA' : '● TUTUP'}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Current Number Display */}
        <div className="text-center">
          <p className="text-emerald-600 text-sm uppercase tracking-wide mb-1">Sedang Dilayani</p>
          <div className="text-6xl font-black text-emerald-900 tabular-nums">
            {String(data?.currentNumber || 0).padStart(3, '0')}
          </div>
          <p className="text-emerald-500 text-sm mt-2">
            Total antrian hari ini: <span className="font-bold text-emerald-700">{data?.lastNumber || 0}</span>
          </p>
          {/* Countdown to next auto-reset */}
          <div className="mt-2 flex justify-center">
            <ResetCountdown nextResetAt={data?.nextResetAt} variant="compact" />
          </div>
        </div>

        {/* My Number or Take Button */}
        {myNumber ? (
          <div className={cn("rounded-xl p-6 text-center border-2 border-dashed", 
            isGadai ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
          )}>
            {/* Queue Number - Large & Clear */}
            <p className="text-emerald-600 text-xs uppercase tracking-wider mb-2">Nomor Antrian Anda</p>
            <div className={cn("text-5xl md:text-6xl font-black tracking-tight", isGadai ? "text-emerald-600" : "text-amber-600")}>
              {getQueueCode(type, myNumber)}
            </div>
            
            {/* Service Type Label */}
            <div className={cn("mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
              isGadai ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            )}>
              {isGadai ? <Gem className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              Layanan {isGadai ? "Gadai" : "Non-Gadai"}
            </div>

            {/* Status Indicator */}
            <div className="mt-4">
              {data && data.currentNumber < myNumber ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-600/80 text-amber-400 rounded-full border border-amber-500/30 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Menunggu {myNumber - data.currentNumber} antrian lagi
                </span>
              ) : data && data.currentNumber === myNumber ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium animate-pulse">
                  <Bell className="w-4 h-4" />
                  GILIRAN ANDA!
                </span>
              ) : (
                // Giliran sudah lewat - show cooldown or retake button
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Sudah dipanggil
                  </span>
                  
                  {/* Cooldown or Retake Button */}
                  {cooldownRemaining ? (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                      <p className="text-amber-700 text-xs mb-1">Cooldown tersisa</p>
                      <div className="text-xl font-bold text-amber-600 tabular-nums">
                        {formatCooldown(cooldownRemaining)}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        // Clear current number and allow retake
                        const newNumbers = { ...{gadai: null, non_gadai: null}, [type]: null };
                        localStorage.setItem("myQueueNumbers", JSON.stringify(newNumbers));
                        const stored = JSON.parse(localStorage.getItem("queueLog") || "{}");
                        delete stored[type];
                        localStorage.setItem("queueLog", JSON.stringify(stored));
                        window.location.reload();
                      }}
                      disabled={loading || data?.status !== 'open'}
                      className={cn(
                        "w-full mt-2 py-3 rounded-lg font-bold transition-all disabled:opacity-50",
                        btnColor
                      )}
                    >
                      <Ticket className="w-5 h-5 inline mr-2" />
                      AMBIL ANTRIAN LAGI
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Share Section - only show when not passed yet */}
            {data && data.currentNumber <= myNumber && (
              <div className="mt-5 pt-5 border-t border-emerald-200">
                {/* Explanatory Text */}
                <p className="text-emerald-700 text-sm mb-4">
                  Silakan simpan atau bagikan nomor antrian berikut untuk memantau status layanan Anda.
                </p>
                
                {/* Download/Share Ticket Button */}
                <button
                  onClick={() => setShowTicket(true)}
                  className={cn("w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-colors",
                    isGadai ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"
                  )}
                >
                  <Image className="w-5 h-5" />
                  Simpan / Bagikan Tiket Antrian
                </button>
              </div>
            )}

            {/* Ticket Modal - Rendered outside card flow */}
          </div>
        ) : cooldownRemaining ? (
          <div className="rounded-xl p-5 text-center bg-amber-50 border-2 border-dashed border-amber-200">
            <p className="text-amber-700 text-sm mb-2">Cooldown Aktif</p>
            <div className="text-3xl font-black text-amber-600 tabular-nums">
              {formatCooldown(cooldownRemaining)}
            </div>
            <p className="text-amber-600 text-sm mt-2">
              Silakan tunggu sebelum mengambil antrian lagi
            </p>
          </div>
        ) : (
          <button
            onClick={onTake}
            disabled={loading || data?.status !== 'open'}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              btnColor
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : data?.status === 'open' ? (
              <>
                <Ticket className="text-white w-6 h-6" />
                <span className="text-white">AMBIL ANTRIAN</span>
              </>
            ) : (
              <span className="text-white">ANTRIAN DITUTUP</span>
            )}
          </button>
        )}
      </div>
    </div>

    {/* Ticket Modal - Fixed overlay outside card layout */}
    {showTicket && myNumber && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative max-w-md w-full">
          <QueueTicket
            type={type}
            number={myNumber}
            onClose={() => setShowTicket(false)}
          />
        </div>
      </div>
    )}
    </>
  );
}
