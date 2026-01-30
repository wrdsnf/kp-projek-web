import { GlobalNavbar } from "@/components/layout";
import { Hero, QueueShortcut, ServiceFlow, Reviews, GoldCTA, TringAppSection, HomepageImages } from "@/components/home";
import { ProductsServicesSection } from "@/components/ProductNav";
import { MapPin, Clock, Phone, Building2 } from "lucide-react";
import Link from "next/link";
import GlobalFooter from "@/components/layout/GlobalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <GlobalNavbar />

      {/* Hero Section */}
      <Hero />

      {/* Produk & Layanan Pegadaian - Unified Section */}
      <ProductsServicesSection />

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

      {/* Info Harga Emas - Dynamic Images */}
      <HomepageImages />

      {/* Aplikasi Tring Section */}
      <TringAppSection />

      {/* Footer */}
      <GlobalFooter />
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