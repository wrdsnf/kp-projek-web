"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDashboardPath } from "@/lib/role-utils";
import { Loader2 } from "lucide-react";

/**
 * Dashboard Director - redirects users to their role-specific dashboard
 */
export default function DashboardDirector() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - redirect to login
        router.replace("/login");
      } else if (profile) {
        // Logged in - redirect based on role
        const targetPath = getDashboardPath(profile.role);
        router.replace(targetPath);
      }
    }
  }, [user, profile, loading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-800 flex items-center justify-center">
      <div className="text-white text-lg flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin" />
        Mengalihkan ke dashboard...
      </div>
    </div>
  );
}
