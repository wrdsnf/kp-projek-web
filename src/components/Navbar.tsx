"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="bg-green-950/50 backdrop-blur-sm border-b border-green-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="font-bold text-white">Pegadaian <span className="text-amber-400">Sentul</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-green-200 hover:text-white text-sm transition-colors hidden sm:block">
            Beranda
          </Link>
          <Link href="/queue" className="text-green-200 hover:text-white text-sm transition-colors">
            Antrian
          </Link>
          {loading ? (
            <span className="text-green-400 text-sm">...</span>
          ) : user ? (
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold text-sm rounded-lg transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/20"
            >
              Login Pegawai
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
