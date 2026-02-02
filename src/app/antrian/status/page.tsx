"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useQueue } from "@/hooks/useQueue";
import { parseQueueCode, QUEUE_TYPES, QueueType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Ticket, Clock, Bell, CheckCircle, XCircle, Gem, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlobalFooter from "@/components/layout/GlobalFooter";
import { GlobalNavbar } from "@/components/layout";

function QueueStatusContent() {
  const searchParams = useSearchParams();
  const kode = searchParams.get("kode");
  
  const [parsed, setParsed] = useState<{ type: QueueType; number: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!kode) {
      setError("Kode antrian tidak ditemukan");
      return;
    }
    
    const result = parseQueueCode(kode);
    if (!result) {
      setError("Format kode antrian tidak valid");
      return;
    }
    
    setParsed(result);
  }, [kode]);
  
  if (error) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-emerald-900 mb-2">Error</h1>
          <p className="text-emerald-700 mb-6">{error}</p>
          <Link 
            href="/queue"
            className="inline-flex items-center gap-2 text-amber-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Ambil Antrian Baru
          </Link>
        </div>
      </div>
    );
  }
  
  if (!parsed) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-emerald-600">Memuat...</div>
      </div>
    );
  }
  
  return <StatusDisplay type={parsed.type} number={parsed.number} kode={kode!} />;
}

function StatusDisplay({ type, number, kode }: { type: QueueType; number: number; kode: string }) {
  const { data, loading } = useQueue(type);
  
  const config = QUEUE_TYPES.find(q => q.id === type)!;
  const isGadai = type === 'gadai';
  const Icon = isGadai ? Gem : FileText;
  const bgGradient = isGadai 
    ? "from-emerald-500 to-emerald-600" 
    : "from-amber-500 to-amber-600";
  
  // Calculate status
  const getStatus = () => {
    if (!data) return { label: "Memuat...", color: "emerald", icon: Clock };
    
    const current = data.currentNumber;
    const waiting = number - current;
    
    if (waiting > 0) {
      return { 
        label: `Menunggu ${waiting} antrian lagi`, 
        color: "amber",
        icon: Clock,
        waiting
      };
    } else if (waiting === 0) {
      return { 
        label: "GILIRAN ANDA!", 
        color: "emerald",
        icon: Bell,
        waiting: 0
      };
    } else {
      return { 
        label: "Sudah dipanggil", 
        color: "neutral",
        icon: CheckCircle,
        waiting: -1
      };
    }
  };
  
  const status = getStatus();
  
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Navbar */}
      <GlobalNavbar />
      
      {/* Header */}
      <header className={cn("bg-gradient-to-r py-8 px-4", bgGradient)}>
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
            <Ticket className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Status Antrian</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Pegadaian Sentul</h1>
          <p className="text-white/80 text-sm">{config.label}</p>
        </div>
      </header>
      
      {/* Main Card */}
      <div className="max-w-md mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Queue Number */}
          <div className="p-8 text-center border-b border-emerald-100">
            <p className="text-emerald-600 text-sm uppercase tracking-wide mb-2">Nomor Antrian Anda</p>
            <div className={cn("text-5xl font-black", isGadai ? "text-emerald-600" : "text-amber-600")}>
              {kode.toUpperCase()}
            </div>
          </div>
          
          {/* Status */}
          <div className={cn(
            "p-6 text-center",
            status.color === 'amber' && "bg-amber-50",
            status.color === 'emerald' && "bg-emerald-50",
            status.color === 'neutral' && "bg-emerald-50/50"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              status.color === 'amber' && "bg-amber-100 text-amber-700",
              status.color === 'emerald' && "bg-emerald-100 text-emerald-700 animate-pulse",
              status.color === 'neutral' && "bg-emerald-100 text-emerald-600"
            )}>
              <status.icon className="w-5 h-5" />
              {status.label}
            </div>
          </div>
          
          {/* Current Number */}
          <div className="p-6 bg-emerald-50/50">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <p className="text-emerald-500 text-xs uppercase mb-1">Sedang Dilayani</p>
                <div className="text-3xl font-bold text-emerald-900">
                  {String(data?.currentNumber || 0).padStart(3, '0')}
                </div>
              </div>
              <div className="w-px h-12 bg-emerald-200" />
              <div className="text-center flex-1">
                <p className="text-emerald-500 text-xs uppercase mb-1">Total Antrian</p>
                <div className="text-3xl font-bold text-emerald-900">
                  {data?.lastNumber || 0}
                </div>
              </div>
            </div>
          </div>
          
          {/* Queue Status */}
          <div className="p-4 border-t border-emerald-100 flex justify-center">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              data?.status === 'open' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}>
              Loket {data?.status === 'open' ? 'BUKA' : 'TUTUP'}
            </span>
          </div>
        </div>
        
        {/* Info */}
        <div className="mt-6 flex flex-col items-center gap-4 pb-6">
          <p className="text-emerald-600 text-sm italic">
            Halaman ini akan update otomatis
          </p>

          <Link 
            href="/queue" 
            className="inline-flex items-center justify-center px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-semibold rounded-full shadow-md transition-all active:scale-95 group"
          >
            <span>Ambil antrian baru</span>
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}

export default function QueueStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-emerald-600">Memuat...</div>
      </div>
    }>
      <QueueStatusContent />
    </Suspense>
  );
}
