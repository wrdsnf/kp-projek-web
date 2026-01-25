"use client";

import { useState, useEffect } from "react";
import { useQueue } from "@/hooks/useQueue";
import { takeQueue } from "@/lib/queue-service";
import { QUEUE_TYPES, QueueType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

export default function QueuePage() {
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

  // Clear number if queue was reset (user's number > lastNumber)
  const clearIfReset = (type: QueueType, lastNumber: number) => {
    if (myNumbers[type] && lastNumber < myNumbers[type]!) {
      // Queue was reset, clear local storage for this type
      const newNumbers = { ...myNumbers, [type]: null };
      setMyNumbers(newNumbers);
      localStorage.setItem("myQueueNumbers", JSON.stringify(newNumbers));
      
      // Also clear the daily log
      const stored = JSON.parse(localStorage.getItem("queueLog") || "{}");
      delete stored[type];
      localStorage.setItem("queueLog", JSON.stringify(stored));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30 mb-4">
          <span className="text-amber-400 text-sm font-medium">🎫 Antrian Online</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Ambil Nomor Antrian</h1>
        <p className="text-green-200">Pilih jenis layanan dan ambil nomor antrian Anda</p>
      </header>

      {/* Queue Cards */}
      <div className="max-w-xl mx-auto px-4 pb-16 space-y-6">
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
        
        {/* Info Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span>ℹ️</span> Informasi
          </h3>
          <ul className="text-green-200 text-sm space-y-2">
            <li>• Nomor antrian tersimpan otomatis di browser Anda</li>
            <li>• Satu device hanya bisa ambil 1 nomor per jenis per hari</li>
            <li>• Pantau nomor yang sedang dilayani secara realtime</li>
            <li>• Pastikan Anda hadir saat nomor dipanggil</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-950 py-6 border-t border-green-800">
        <div className="text-center text-green-400 text-sm">
          &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta
        </div>
      </footer>
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

  // Check if queue was reset
  useEffect(() => {
    if (data && myNumber) {
      onCheckReset(type, data.lastNumber);
    }
  }, [data?.lastNumber]);

  const isGadai = color === 'green';
  const bgGradient = isGadai 
    ? "from-green-600 to-green-700" 
    : "from-blue-600 to-blue-700";
  const accentColor = isGadai ? "bg-green-500" : "bg-blue-500";
  const btnColor = isGadai 
    ? "bg-amber-500 hover:bg-amber-400 text-green-900" 
    : "bg-amber-500 hover:bg-amber-400 text-blue-900";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className={cn("bg-gradient-to-r p-4 flex justify-between items-center", bgGradient)}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{isGadai ? "💰" : "📋"}</span>
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
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Sedang Dilayani</p>
          <div className="text-6xl font-black text-gray-800 tabular-nums">
            {String(data?.currentNumber || 0).padStart(3, '0')}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Total antrian hari ini: <span className="font-bold text-gray-600">{data?.lastNumber || 0}</span>
          </p>
        </div>

        {/* My Number or Take Button */}
        {myNumber ? (
          <div className={cn("rounded-xl p-5 text-center border-2 border-dashed", 
            isGadai ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
          )}>
            <p className="text-gray-500 text-sm mb-1">Nomor Antrian Anda</p>
            <div className={cn("text-5xl font-black", isGadai ? "text-green-600" : "text-blue-600")}>
              {String(myNumber).padStart(3, '0')}
            </div>
            <div className="mt-3">
              {data && data.currentNumber < myNumber ? (
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  ⏳ Menunggu {myNumber - data.currentNumber} antrian lagi
                </span>
              ) : data && data.currentNumber === myNumber ? (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium animate-pulse">
                  🔔 GILIRAN ANDA!
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                  ✓ Sudah dipanggil
                </span>
              )}
            </div>
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
                <span className="animate-spin">⏳</span>
                Memproses...
              </>
            ) : data?.status === 'open' ? (
              <>
                <span className="text-2xl">🎫</span>
                AMBIL ANTRIAN
              </>
            ) : (
              "ANTRIAN DITUTUP"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
