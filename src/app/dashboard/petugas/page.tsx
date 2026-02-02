"use client";

import { useAuth } from "@/hooks/useAuth";
import { useQueue } from "@/hooks/useQueue";
import { takeQueueManual } from "@/lib/queue-service";
import { QUEUE_TYPES, QueueType, getQueueCode } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Gem, FileText, Ticket, Loader2, CheckCircle, Users, AlertCircle } from "lucide-react";

export default function PetugasDashboard() {
  const { profile } = useAuth();
  const [lastTaken, setLastTaken] = useState<{ type: QueueType; number: number } | null>(null);
  
  if (!profile) return null;
  
  if (profile.role !== 'petugas_antrian' && profile.role !== 'admin') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-red-700 mb-2">Akses Ditolak</h2>
        <p className="text-red-600">Anda tidak memiliki akses ke halaman ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-emerald-900">Petugas Antrian</h1>
        <p className="text-emerald-600">Ambil antrian manual untuk nasabah</p>
      </header>

      {/* Success Alert */}
      {lastTaken && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
          <div>
            <p className="text-emerald-700 font-medium">Antrian Berhasil Diambil!</p>
            <p className="text-emerald-600 text-2xl font-bold">{getQueueCode(lastTaken.type, lastTaken.number)}</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Users className="w-5 h-5 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-700">
          <p className="font-medium">Mode Manual Input</p>
          <p>Gunakan fitur ini untuk mengambilkan nomor antrian bagi nasabah lansia, nasabah tanpa HP, atau kondisi darurat lainnya. Semua antrian manual tercatat di log.</p>
        </div>
      </div>

      {/* Queue Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {QUEUE_TYPES.map((q) => (
          <PetugasQueueCard 
            key={q.id} 
            type={q.id} 
            label={q.label} 
            color={q.color}
            petugasUid={profile.uid}
            onSuccess={(number) => setLastTaken({ type: q.id, number })}
          />
        ))}
      </div>
    </div>
  );
}

function PetugasQueueCard({ 
  type, 
  label, 
  color,
  petugasUid,
  onSuccess
}: { 
  type: QueueType; 
  label: string; 
  color: string;
  petugasUid: string;
  onSuccess: (number: number) => void;
}) {
  const { data } = useQueue(type);
  const [loading, setLoading] = useState(false);

  const isGadai = color === 'emerald';
  const Icon = isGadai ? Gem : FileText;
  
  const handleTake = async () => {
    if (!petugasUid) {
      alert("Error: UID tidak tersedia. Silakan login ulang.");
      return;
    }
    if (!confirm(`Ambil antrian ${label} untuk nasabah?`)) return;
    
    setLoading(true);
    try {
      const number = await takeQueueManual(type, petugasUid);
      onSuccess(number);
    } catch (error) {
      alert((error as Error).message || "Gagal mengambil antrian");
    } finally {
      setLoading(false);
    }
  };

  const isClosed = data?.status === 'closed';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b flex items-center gap-3",
        isGadai ? "bg-emerald-50" : "bg-amber-50"
      )}>
        <Icon className={cn("w-6 h-6", isGadai ? "text-emerald-600" : "text-amber-600")} />
        <div className="flex-1">
          <h3 className="font-bold text-emerald-900">{label}</h3>
          <p className="text-xs text-emerald-600">
            {isGadai ? "Gadai baru, perpanjangan" : "Pelunasan, cicilan, pembayaran"}
          </p>
        </div>
        <span className={cn(
          "text-xs px-2 py-1 rounded-full font-medium",
          !isClosed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        )}>
          {!isClosed ? "Open" : "Closed"}
        </span>
      </div>
      
      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-emerald-50 rounded-lg p-3">
            <div className="text-3xl font-bold text-emerald-900">{data?.currentNumber || 0}</div>
            <div className="text-xs text-emerald-600 uppercase">Sedang Dilayani</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3">
            <div className="text-3xl font-bold text-emerald-900">{data?.lastNumber || 0}</div>
            <div className="text-xs text-emerald-600 uppercase">Total Hari Ini</div>
          </div>
        </div>
        
        {/* Take Button */}
        <button
          onClick={handleTake}
          disabled={loading || isClosed}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            isGadai 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
              : "bg-amber-500 hover:bg-amber-400 text-white"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Ticket className="w-6 h-6" />
              AMBIL ANTRIAN MANUAL
            </>
          )}
        </button>
      </div>
    </div>
  );
}
