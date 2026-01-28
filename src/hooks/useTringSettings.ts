"use client";

import { useEffect, useState } from "react";
import { TringAppSettings, subscribeToTringSettings } from "@/lib/tring-service";

const DEFAULT_SETTINGS: TringAppSettings = {
  referralCode: "13554",
  appStoreUrl: "https://devpds.onelink.me/v3LG/seo",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.pegadaiandigital&pcampaignid=web_share",
};

export function useTringSettings() {
  const [settings, setSettings] = useState<TringAppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToTringSettings((data) => {
      setSettings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { settings, loading };
}
