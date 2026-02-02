"use client";

import { useAuth } from "@/hooks/useAuth";
import { useQueue } from "@/hooks/useQueue";
import { callNextQueue } from "@/lib/queue-service";
import { QueueType, QUEUE_TYPES } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TellerDashboard() {
  const { profile } = useAuth();
  
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Teller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.handleQueue.map((type) => (
          <TellerQueueCard key={type} type={type} tellerUid={profile.uid} />
        ))}
      </div>
      {profile.handleQueue.length === 0 && (
         <div className="text-emerald-600">Anda belum ditugaskan ke antrian manapun. Hubungi Admin.</div>
      )}
    </div>
  );
}

function TellerQueueCard({ type, tellerUid }: { type: QueueType; tellerUid: string }) {
  const { data } = useQueue(type);
  const [loading, setLoading] = useState(false);
  const config = QUEUE_TYPES.find(q => q.id === type)!;

  const handleCall = async () => {
      if(!confirm("Panggil antrian selanjutnya?")) return;
      setLoading(true);
      try {
          await callNextQueue(type, tellerUid);
      } catch (e) {
          alert((e as Error).message);
      } finally {
          setLoading(false);
      }
  };

  const isClosed = data?.status === 'closed';

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className={cn("px-5 py-4 border-b border-emerald-100 flex justify-between items-center", 
         config.color === 'emerald' ? 'bg-emerald-50/80' : 'bg-amber-50/80'
      )}>
         <h3 className="font-bold text-emerald-700">{config.label}</h3>
         <span className={cn(
           "text-xs px-3 py-1 rounded-full font-bold uppercase", 
           !isClosed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
         )}>
           {!isClosed ? "Open" : "Closed"}
         </span>
      </div>
      
      {/* Body */}
      <div className="p-6 text-center space-y-6">
         <div>
             <div className="text-sm text-emerald-600 mb-1 font-medium">Sedang Melayani</div>
             <div className="text-5xl font-black text-emerald-900">{data?.currentNumber || 0}</div>
         </div>

         <div className="grid grid-cols-2 gap-4 text-sm bg-emerald-50/50 p-4 rounded-xl">
             <div>
                 <span className="block text-emerald-500 text-xs font-medium uppercase">Menunggu</span>
                 <span className="font-bold text-lg text-amber-600">{(data?.lastNumber || 0) - (data?.currentNumber || 0)}</span>
             </div>
             <div>
                 <span className="block text-emerald-500 text-xs font-medium uppercase">Total Hari Ini</span>
                 <span className="font-bold text-lg text-emerald-800">{data?.lastNumber || 0}</span>
             </div>
         </div>

         <button
            onClick={handleCall}
            disabled={loading || (data?.currentNumber || 0) >= (data?.lastNumber || 0)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
         >
            {loading ? "Memproses..." : "PANGGIL NEXT"}
         </button>
      </div>
    </div>
  )
}

