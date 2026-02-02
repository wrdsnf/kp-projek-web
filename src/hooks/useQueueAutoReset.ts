"use client";

import { useEffect, useRef } from "react";
import { QueueType, QUEUE_TYPES } from "@/lib/types";
import { checkAllQueuesSchedule, checkQueueSchedule } from "@/lib/wib-schedule-service";

/**
 * FALLBACK ONLY - Primary scheduling is done by Firebase Cloud Functions
 * 
 * This hook provides client-side fallback for queue schedule checks.
 * The actual scheduling (reset at 06:00 WIB, auto open/close) is handled
 * server-side by Cloud Functions in /functions folder.
 * 
 * This hook only runs when user visits the page, which is NOT reliable
 * for time-critical operations like 06:00 reset.
 */
export function useQueueAutoResetCheck() {
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Fallback check - Cloud Functions are the primary scheduler
    checkAllQueuesSchedule().catch(err => {
      console.error("[Fallback] Schedule check failed:", err);
    });
  }, []);
}

/**
 * FALLBACK ONLY - Hook to check schedule for a specific queue type
 */
export function useQueueAutoResetCheckSingle(type: QueueType) {
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    checkQueueSchedule(type).catch(err => {
      console.error(`[Fallback] Schedule check failed for ${type}:`, err);
    });
  }, [type]);
}
