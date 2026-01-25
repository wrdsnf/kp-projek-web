"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardDirector() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile) {
      if (profile.role === 'admin') {
        router.replace('/dashboard/admin');
      } else if (profile.role === 'teller') {
        router.replace('/dashboard/teller');
      }
    }
  }, [profile, loading, router]);

  return <div className="p-8">Redirecting...</div>;
}
