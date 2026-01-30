"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

interface GlobalFooterProps {
  variant?: "light" | "dark";
}

export default function GlobalFooter({ 
  variant = "light",
}: GlobalFooterProps) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLight = variant === "light";

  // Glassmorphism styles
  const footBg = isLight 
    ? "bg-white/70 backdrop-blur-md border-b border-white/30 shadow-lg shadow-emerald-900/5" 
    : "bg-emerald-900/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20";
  
  const textColor = isLight ? "text-emerald-900" : "text-white";
  const textHover = isLight ? "hover:text-emerald-600" : "hover:text-emerald-200";
  const menuIconColor = isLight ? "text-emerald-800" : "text-white";

  return (
    <footer className={`${footBg} py-12`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center">
            <div className="px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
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
            <p className="text-emerald-900 text-sm">
              Cabang Pembantu Sentul Yogyakarta. Melayani kebutuhan finansial masyarakat dengan pelayanan prima dan profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-emerald-900 mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-emerald-900 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-600 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-sm hover:border hover:border-white/50 transition-colors">Beranda</Link>
              </li>
              <li>
                <a href="#layanan" className="hover:text-emerald-600 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-sm hover:border hover:border-white/50 transition-colors">Layanan</a>
              </li>
              <li>
                <Link href="/queue" className="hover:text-emerald-600 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-sm hover:border hover:border-white/50 transition-colors">Antrian Online</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-600 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-sm hover:border hover:border-white/50 transition-colors">Tentang Kami</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-emerald-900 mb-4">Kontak</h4>
            <ul className="space-y-2 text-emerald-900 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Jl. Surokarsan No.56, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (0274) 375-806
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-8 text-center">
          <p className="text-emerald-900 text-sm">
            &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.
          </p>
          <p className="mt-2 text-emerald-900 text-xs">
            Bagian dari PT Pegadaian (Persero)
          </p>
        </div>
      </div>
    </footer>
  );
}
