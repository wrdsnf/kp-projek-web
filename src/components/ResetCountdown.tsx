"use client";

import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Clock, RefreshCw } from "lucide-react";

interface ResetCountdownProps {
  nextResetAt: Timestamp | null | undefined;
  variant?: "compact" | "full";
  className?: string;
}

export default function ResetCountdown({ 
  nextResetAt, 
  variant = "compact",
  className = "" 
}: ResetCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!nextResetAt) {
      setTimeLeft("--:--:--");
      return;
    }

    const targetTime = nextResetAt.toMillis();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setIsExpired(true);
        return;
      }

      setIsExpired(false);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextResetAt]);

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
        <RefreshCw className={`w-3 h-3 ${isExpired ? "animate-spin text-amber-500" : "text-emerald-500"}`} />
        <span className={`font-mono ${isExpired ? "text-amber-600" : "text-emerald-600"}`}>
          {isExpired ? "Resetting..." : timeLeft}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg ${className}`}>
      <Clock className={`w-4 h-4 ${isExpired ? "text-amber-500" : "text-emerald-600"}`} />
      <div className="flex flex-col">
        <span className="text-xs text-emerald-600">Reset otomatis dalam</span>
        <span className={`font-mono font-bold ${isExpired ? "text-amber-600" : "text-emerald-700"}`}>
          {isExpired ? "Sedang reset..." : timeLeft}
        </span>
      </div>
    </div>
  );
}
