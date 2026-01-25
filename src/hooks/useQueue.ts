"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QueueData, QueueType } from "@/lib/types";

export function useQueue(type: QueueType) {
  const [data, setData] = useState<QueueData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "queues", type), (doc) => {
      if (doc.exists()) {
        setData(doc.data() as QueueData);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [type]);

  return { data, loading };
}
