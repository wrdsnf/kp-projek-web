"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface GlobalNavbarProps {
  variant?: "light" | "dark";
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function GlobalNavbar({ 
  variant = "light",
  onMenuClick,
  showMenuButton = false,
}: GlobalNavbarProps) {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLight = variant === "light";

  // Glassmorphism styles
  const navBg = isLight 
    ? "bg-white/70 backdrop-blur-md border-b border-white/30 shadow-lg shadow-emerald-900/5" 
    : "bg-emerald-900/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20";
  
  const textColor = isLight ? "text-emerald-900" : "text-white";
  const textHover = isLight ? "hover:text-emerald-600" : "hover:text-emerald-200";
  const menuIconColor = isLight ? "text-emerald-800" : "text-white";

  return (
    <nav className={`${navBg} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left section: Menu button (dashboard) + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger for dashboard mobile */}
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className={`lg:hidden p-2.5 rounded-xl ${isLight ? 'bg-white/50 hover:bg-white/80' : 'bg-white/10 hover:bg-white/20'} ${menuIconColor} transition-colors`}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo with glass container for contrast */}
          <Link href="/" className="flex items-center">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
              <Image 
                src="/logo.svg" 
                alt="Pegadaian CP Sentul" 
                width={120} 
                height={32}
                className="h-7 w-auto"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {!isDashboard && (
            <>
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/20`}
              >
                Beranda
              </Link>
              <a 
                href="/#layanan" 
                className={`px-4 py-2 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/20`}
              >
                Layanan
              </a>
              <Link 
                href="/queue" 
                className={`px-4 py-2 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/20`}
              >
                Antrian
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/20`}
              >
                Tentang
              </Link>
            </>
          )}
          <div className="ml-2">
            {loading ? (
              <span className="text-emerald-400 text-sm px-4">...</span>
            ) : user ? (
              <Link 
                href="/dashboard" 
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-900 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/30"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30"
              >
                Login Pegawai
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (non-dashboard pages only) */}
        {!isDashboard && (
          <button 
            className={`md:hidden p-2.5 rounded-xl ${isLight ? 'bg-white/50 hover:bg-white/80' : 'bg-white/10 hover:bg-white/20'} ${menuIconColor} transition-colors`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Menu (non-dashboard pages) - Glass dropdown */}
      {mobileMenuOpen && !isDashboard && (
        <div className="md:hidden">
          <div className={`mx-4 mb-4 p-4 rounded-2xl space-y-2 ${isLight ? 'bg-white/80' : 'bg-emerald-800/80'} backdrop-blur-md border ${isLight ? 'border-white/50' : 'border-white/10'} shadow-xl`}>
            <Link 
              href="/" 
              className={`block px-4 py-3 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/30`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <a 
              href="/#layanan" 
              className={`block px-4 py-3 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/30`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Layanan
            </a>
            <Link 
              href="/queue" 
              className={`block px-4 py-3 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/30`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Antrian Online
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-3 rounded-xl ${textColor} ${textHover} text-sm font-medium transition-all hover:bg-white/30`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <div className="pt-2 border-t border-white/20">
              {loading ? (
                <span className="text-emerald-400 text-sm px-4">...</span>
              ) : user ? (
                <Link 
                  href="/dashboard" 
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-900 font-bold text-sm rounded-xl transition-all shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
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
