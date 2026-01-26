"use client";

import { useQueue } from "@/hooks/useQueue";
import { updateQueueStatus, resetQueue } from "@/lib/queue-service";
import { QueueType, QUEUE_TYPES } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RotateCcw, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Monitoring dan Kontrol Antrian</p>
        </div>
        <Link 
          href="/dashboard/admin/history"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          Laporan Harian
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {QUEUE_TYPES.map((q) => (
          <AdminQueueControl key={q.id} type={q.id} label={q.label} color={q.color} />
        ))}
      </div>
    </div>
  );
}

function AdminQueueControl({ type, label, color }: { type: QueueType; label: string; color: string }) {
  const { data } = useQueue(type);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const toggleStatus = async () => {
      if (!data) return;
      const newStatus = data.status === 'open' ? 'closed' : 'open';
      if (!confirm(`Ubah status ${label} menjadi ${newStatus}?`)) return;
      
      setLoading(true);
      try {
          await updateQueueStatus(type, newStatus);
      } catch (e) {
          alert((e as Error).message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold text-gray-900">{label}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className={cn("w-2 h-2 rounded-full", data?.status === 'open' ? "bg-green-500" : "bg-red-500")}/>
                    <span className="text-sm font-medium text-gray-600 capitalize">{data?.status || "Loading..."}</span>
                </div>
            </div>
            <button
               onClick={toggleStatus}
               disabled={loading || !data}
               className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-colors", 
                   data?.status === 'open' 
                   ? "bg-red-100 text-red-700 hover:bg-red-200" 
                   : "bg-green-100 text-green-700 hover:bg-green-200"
               )}
            >
               {data?.status === 'open' ? "TUTUP ANTRIAN" : "BUKA ANTRIAN"}
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6">
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{data?.currentNumber || 0}</div>
                <div className="text-xs text-gray-500 uppercase">Current</div>
            </div>
            <div className="text-center border-l border-r border-gray-100">
                <div className="text-3xl font-bold text-gray-900">{data?.lastNumber || 0}</div>
                <div className="text-xs text-gray-500 uppercase">Total</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 text-blue-600">
                   {(data?.lastNumber || 0) - (data?.currentNumber || 0)}
                </div>
                <div className="text-xs text-gray-500 uppercase">Waiting</div>
            </div>
        </div>
        
        {/* Manual Reset Button */}
        <div className="flex justify-end">
           <button 
             className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
             disabled={resetting}
             onClick={async () => {
               if (!confirm(`RESET antrian ${label}? Semua nomor akan kembali ke 0.`)) return;
               setResetting(true);
               try {
                 await resetQueue(type);
                 alert(`Antrian ${label} berhasil di-reset!`);
               } catch (e) {
                 alert((e as Error).message);
               } finally {
                 setResetting(false);
               }
             }}
           >
             <RotateCcw className="w-4 h-4" />
             {resetting ? "Mereset..." : "Reset Manual"}
           </button>
        </div>
    </div>
  );
}
