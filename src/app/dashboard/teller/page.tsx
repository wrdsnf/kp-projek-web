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
      <h1 className="text-2xl font-bold text-gray-800">Teller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.handleQueue.map((type) => (
          <TellerQueueCard key={type} type={type} tellerUid={profile.uid} />
        ))}
      </div>
      {profile.handleQueue.length === 0 && (
         <div className="text-gray-500">Anda belum ditugaskan ke antrian manapun. Hubungi Admin.</div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className={cn("px-4 py-3 border-b flex justify-between items-center", 
         config.color === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'
      )}>
         <h3 className="font-bold text-gray-800">{config.label}</h3>
         <span className={cn("text-xs px-2 py-1 rounded-full font-medium", 
             !isClosed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
         )}>
             {!isClosed ? "Open" : "Closed"}
         </span>
      </div>
      
      <div className="p-6 text-center space-y-6">
         <div>
             <div className="text-sm text-gray-500 mb-1">Sedang Melayani</div>
             <div className="text-5xl font-black text-gray-900">{data?.currentNumber || 0}</div>
         </div>

         <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
             <div>
                 <span className="block text-gray-400 text-xs">Menunggu</span>
                 <span className="font-bold text-gray-700">{(data?.lastNumber || 0) - (data?.currentNumber || 0)}</span>
             </div>
             <div>
                 <span className="block text-gray-400 text-xs">Total Hari Ini</span>
                 <span className="font-bold text-gray-700">{data?.lastNumber || 0}</span>
             </div>
         </div>

         <div className="space-y-3">
             <button
                onClick={handleCall}
                disabled={loading || (data?.currentNumber || 0) >= (data?.lastNumber || 0)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg disabled:opacity-50 transition-colors"
             >
                {loading ? "Memproses..." : "PANGGIL NEXT"}
             </button>
         </div>
      </div>
    </div>
  )
}

