import Navbar from "@/components/Navbar";
import { Hero, Services, QueueShortcut, ServiceFlow, Reviews, GoldCTA } from "@/components/home";
import { MapPin, Clock, Phone, Building2, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Layanan Utama */}
      <Services />

      {/* Shortcut Antrian Online */}
      <QueueShortcut />

      {/* Alur Layanan */}
      <ServiceFlow />

      {/* Informasi Outlet - Mobile Version */}
      <BranchInfoSection />

      {/* Ulasan Nasabah */}
      <Reviews />

      {/* CTA Nabung Emas */}
      <GoldCTA />

      {/* Aplikasi Tring Section */}
      <TringAppSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function BranchInfoSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:hidden">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
            Informasi Outlet
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            CP Sentul Yogyakarta
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">Alamat</p>
                <p className="text-gray-600">Jl. Surokarsan No.56, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">Jam Operasional</p>
                <div className="space-y-1 text-gray-600 text-sm">
                  <div className="flex justify-between gap-8">
                    <span>Senin - Jumat</span>
                    <span className="text-green-600 font-medium">08:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sabtu</span>
                    <span className="text-green-600 font-medium">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Minggu</span>
                    <span className="text-red-500 font-medium">Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">Telepon</p>
                <a href="tel:0274375806" className="text-green-600 font-medium hover:underline">
                  (0274) 375806
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TringAppSection() {
  return (
    <section id="aplikasi-mobile" className="bg-gradient-to-br from-green-800 to-green-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-green-900 text-sm font-bold rounded-full">
              <Smartphone className="w-4 h-4" />
              APLIKASI MOBILE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pegadaian Digital - <span className="text-amber-400">Tring!</span>
            </h2>
            <p className="text-green-100 text-lg">
              Gunakan aplikasi Pegadaian Digital (Tring) untuk transaksi lebih mudah, aman, dan cepat.
            </p>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Gadai online tanpa antri
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Tabungan emas mulai Rp10.000
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Pembayaran tagihan & top up
              </li>
            </ul>
            
            {/* Referral Code */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-green-200 text-sm mb-2">Kode Referral</p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-3xl font-black text-amber-400 tracking-wider">13554</span>
                <span className="text-green-300 text-sm">(Gunakan saat daftar)</span>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <a 
                href="https://apps.apple.com/id/app/pegadaian-digital/id1070502017" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-5 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download di</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.finnet.mobileFinnet" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-5 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download di</div>
                  <div className="text-sm font-bold">Play Store</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Phone Mockup */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-64 h-[500px] bg-gradient-to-b from-green-600 to-green-700 rounded-[3rem] border-4 border-green-500 shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Smartphone className="w-10 h-10 text-green-900" />
                  </div>
                  <div className="text-3xl font-black text-amber-400">Tring!</div>
                  <div className="text-sm text-green-200 mt-1">Pegadaian Digital</div>
                  <div className="mt-4 px-6">
                    <div className="bg-white/20 rounded-lg py-2 text-xs text-green-100">
                      Transaksi Mudah & Aman
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-green-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-amber-400" />
              <span className="font-bold text-white text-lg">Pegadaian <span className="text-amber-400">Sentul</span></span>
            </div>
            <p className="text-green-400 text-sm">
              Cabang Pembantu Sentul Yogyakarta. Melayani kebutuhan finansial masyarakat dengan pelayanan prima dan profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-green-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
              </li>
              <li>
                <Link href="/queue" className="hover:text-white transition-colors">Antrian Online</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-green-400 text-sm">
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

        <div className="border-t border-green-800 pt-8 text-center">
          <p className="text-green-400 text-sm">
            &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.
          </p>
          <p className="mt-2 text-green-600 text-xs">
            Bagian dari PT Pegadaian (Persero)
          </p>
        </div>
      </div>
    </footer>
  );
}
