"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-3">
          <span className="animate-spin text-2xl">⏳</span>
          Memuat dashboard...
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-green-800 to-green-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <span className="font-bold text-white hidden sm:inline">
                Pegadaian <span className="text-amber-400">Sentul</span>
              </span>
            </Link>

            {/* Center Menu */}
            <div className="flex items-center gap-1">
              {profile.role === 'admin' && (
                <Link 
                  href="/dashboard/admin" 
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  🛠️ Admin
                </Link>
              )}
              {(profile.role === 'teller' || profile.role === 'admin') && (
                <Link 
                  href="/dashboard/teller" 
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  🎫 Teller
                </Link>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-green-900 font-bold text-sm">
                  {profile.name[0]}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white">{profile.name}</div>
                  <div className="text-green-200 text-xs capitalize">{profile.role}</div>
                </div>
              </div>
              <button 
                onClick={() => auth.signOut()}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="text-center text-gray-400 text-sm">
          Pegadaian CP Sentul Yogyakarta - Dashboard Internal
        </div>
      </footer>
    </div>
  );
}
