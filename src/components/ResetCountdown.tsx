"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { getMsUntilNext0600Wib } from "@/lib/wib-schedule-service";

interface ResetCountdownProps {
  variant?: "compact" | "full";
  className?: string;
}

/**
 * Countdown to next 06:00 WIB reset
 * Uses live calculation instead of Firestore Timestamp
 */
export default function ResetCountdown({ 
  variant = "compact",
  className = "" 
}: ResetCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const msLeft = getMsUntilNext0600Wib();
      
      if (msLeft <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(msLeft / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
        <RefreshCw className="w-3 h-3 text-emerald-500" />
        <span className="font-mono text-emerald-600">
          Reset 06:00: {timeLeft || "--:--:--"}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg ${className}`}>
      <Clock className="w-4 h-4 text-emerald-600" />
      <div className="flex flex-col">
        <span className="text-xs text-emerald-600">Reset harian 06:00 WIB dalam</span>
        <span className="font-mono font-bold text-emerald-700">
          {timeLeft || "--:--:--"}
        </span>
      </div>
    </div>
  );
}
