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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/queue"
            className="inline-flex items-center gap-2 text-emerald-600 hover:underline"
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Memuat...</div>
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
    ? "from-emerald-600 to-emerald-700" 
    : "from-blue-600 to-blue-700";
  
  // Calculate status
  const getStatus = () => {
    if (!data) return { label: "Memuat...", color: "gray", icon: Clock };
    
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
        color: "gray",
        icon: CheckCircle,
        waiting: -1
      };
    }
  };
  
  const status = getStatus();
  
  return (
    <div className="min-h-screen bg-gray-100">
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
          <div className="p-8 text-center border-b border-gray-100">
            <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Nomor Antrian Anda</p>
            <div className={cn("text-5xl font-black", isGadai ? "text-emerald-600" : "text-blue-600")}>
              {kode.toUpperCase()}
            </div>
          </div>
          
          {/* Status */}
          <div className={cn(
            "p-6 text-center",
            status.color === 'amber' && "bg-amber-50",
            status.color === 'emerald' && "bg-emerald-50",
            status.color === 'gray' && "bg-gray-50"
          )}>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              status.color === 'amber' && "bg-amber-100 text-amber-700",
              status.color === 'emerald' && "bg-emerald-100 text-emerald-700 animate-pulse",
              status.color === 'gray' && "bg-gray-100 text-gray-600"
            )}>
              <status.icon className="w-5 h-5" />
              {status.label}
            </div>
          </div>
          
          {/* Current Number */}
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <p className="text-gray-400 text-xs uppercase mb-1">Sedang Dilayani</p>
                <div className="text-3xl font-bold text-gray-900">
                  {String(data?.currentNumber || 0).padStart(3, '0')}
                </div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center flex-1">
                <p className="text-gray-400 text-xs uppercase mb-1">Total Antrian</p>
                <div className="text-3xl font-bold text-gray-900">
                  {data?.lastNumber || 0}
                </div>
              </div>
            </div>
          </div>
          
          {/* Queue Status */}
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              data?.status === 'open' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}>
              Loket {data?.status === 'open' ? 'BUKA' : 'TUTUP'}
            </span>
          </div>
        </div>
        
        {/* Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Halaman ini akan update otomatis</p>
          <p className="mt-2">
            <Link href="/queue" className="text-emerald-600 hover:underline">
              Ambil antrian baru →
            </Link>
          </p>
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Memuat...</div>
      </div>
    }>
      <QueueStatusContent />
    </Suspense>
  );
}
