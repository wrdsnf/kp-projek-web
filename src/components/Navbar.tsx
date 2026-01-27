"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/50 backdrop-blur-md border-b border-green-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {/* Logo Container with light background for visibility */}
            <Image 
              src="/logo.svg" 
              alt="Pegadaian CP Sentul" 
              width={140} 
              height={40}
              className="h-8 w-auto"
              priority
            />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-green-900 hover:text-white text-sm transition-colors">
            Beranda
          </Link>
          <a href="#layanan" className="text-green-900 hover:text-white text-sm transition-colors">
            Layanan
          </a>
          <Link href="/queue" className="text-green-900 hover:text-white text-sm transition-colors">
            Antrian
          </Link>
          <Link href="/about" className="text-green-900 hover:text-white text-sm transition-colors">
            Tentang
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-green-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-green-900 hover:text-white text-sm transition-colors py-2">
              Beranda
            </Link>
            <a href="#layanan" className="block text-green-900 hover:text-white text-sm transition-colors py-2">
              Layanan
            </a>
            <Link href="/queue" className="block text-green-900 hover:text-white text-sm transition-colors py-2">
              Antrian Online
            </Link>
            <Link href="/about" className="block text-green-900 hover:text-white text-sm transition-colors py-2">
              Tentang Kami
            </Link>
            <div className="pt-2 border-t border-green-700/50">
              {loading ? (
                <span className="text-green-400 text-sm">...</span>
              ) : user ? (
                <Link 
                  href="/dashboard" 
                  className="block w-full text-center px-4 py-3 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold text-sm rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="block w-full text-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/20"
                >
                  Login Pegawai
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
