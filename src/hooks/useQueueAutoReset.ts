"use client";

import { useEffect, useRef } from "react";
import { QueueType, QUEUE_TYPES } from "@/lib/types";
import { checkAndAutoReset } from "@/lib/queue-service";

/**
 * Hook to check and trigger auto-reset for all queue types on mount
 * Call this in pages that display queue data (queue page, admin dashboard)
 */
export function useQueueAutoResetCheck() {
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Check all queue types for auto-reset
    const checkAll = async () => {
      for (const q of QUEUE_TYPES) {
        try {
          await checkAndAutoReset(q.id);
        } catch (err) {
          console.error(`Auto-reset check failed for ${q.id}:`, err);
        }
      }
    };

    checkAll();
  }, []);
}

/**
 * Hook to check auto-reset for a specific queue type
 */
export function useQueueAutoResetCheckSingle(type: QueueType) {
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    checkAndAutoReset(type).catch(err => {
      console.error(`Auto-reset check failed for ${type}:`, err);
    });
  }, [type]);
}
