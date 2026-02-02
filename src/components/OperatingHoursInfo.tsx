"use client";

import { Clock, CalendarDays, AlertCircle, CheckCircle } from "lucide-react";
import { getTodaySchedule, isWithinOperatingHours, formatTodaySchedule } from "@/lib/wib-schedule-service";

interface OperatingHoursInfoProps {
  manualClosed?: boolean;
  variant?: "compact" | "full";
  className?: string;
}

export default function OperatingHoursInfo({ 
  manualClosed = false, 
  variant = "compact",
  className = ""
}: OperatingHoursInfoProps) {
  const { dayName, schedule } = getTodaySchedule();
  const { isOpen, reason, nextChange } = isWithinOperatingHours();

  // If manualClosed, override display
  const effectiveOpen = manualClosed ? false : isOpen;
  const statusReason = manualClosed ? "Ditutup manual oleh admin" : reason;

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <CalendarDays className="w-3 h-3 text-emerald-600" />
        <span className="text-emerald-600">{formatTodaySchedule()}</span>
        {manualClosed && (
          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-medium">
            Manual
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${effectiveOpen ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${effectiveOpen ? "bg-emerald-100" : "bg-amber-100"}`}>
          {effectiveOpen ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-bold ${effectiveOpen ? "text-emerald-700" : "text-amber-700"}`}>
              {effectiveOpen ? "BUKA" : "TUTUP"}
            </span>
            {manualClosed && (
              <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded text-xs font-medium">
                Override Manual
              </span>
            )}
          </div>
          <p className={`text-sm ${effectiveOpen ? "text-emerald-600" : "text-amber-600"}`}>
            {statusReason}
          </p>
          {nextChange && !manualClosed && (
            <p className="text-xs text-gray-500 mt-1">{nextChange}</p>
          )}
          
          {/* Schedule */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{dayName}:</span>
              {schedule.closed ? (
                <span>Tutup</span>
              ) : (
                <span>
                  {schedule.slots.map((slot, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      {String(slot.openHour).padStart(2, '0')}:{String(slot.openMinute).padStart(2, '0')} - 
                      {String(slot.closeHour).padStart(2, '0')}:{String(slot.closeMinute).padStart(2, '0')}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
