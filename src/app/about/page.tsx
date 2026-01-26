import Link from "next/link";
import { ArrowLeft, Gem, Briefcase, Coins, CreditCard, Clock, MapPin, Phone, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-green-700" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tentang Pegadaian CP Sentul</h1>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Pegadaian CP Sentul berkomitmen memberikan pelayanan terbaik bagi nasabah di wilayah Sentul dan sekitarnya. 
            Kami hadir dengan solusi keuangan yang cepat, mudah, dan aman.
          </p>
        </div>

        {/* Layanan Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Layanan Kami</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={Gem}
              title="Gadai Emas & Elektronik" 
              desc="Solusi dana cepat dengan agunan barang berharga Anda."
              color="bg-amber-50 text-amber-600"
            />
            <FeatureCard 
              icon={Briefcase}
              title="Pembiayaan Usaha" 
              desc="Modal usaha untuk mengembangkan bisnis UMKM."
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard 
              icon={Coins}
              title="Tabungan Emas" 
              desc="Investasi emas aman dan terjangkau mulai dari 0.01 gram."
              color="bg-yellow-50 text-yellow-600"
            />
            <FeatureCard 
              icon={CreditCard}
              title="Pembayaran & Top Up" 
              desc="Bayar tagihan listrik, air, BPJS, dan pulsa."
              color="bg-green-50 text-green-600"
            />
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Jam Operasional</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl">
              <p className="font-bold text-gray-700 mb-1">Senin - Jumat</p>
              <p className="text-green-600 font-medium">08:00 - 15:00 WIB</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="font-bold text-gray-700 mb-1">Sabtu</p>
              <p className="text-green-600 font-medium">08:00 - 12:00 WIB</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="font-bold text-red-500 mb-1">Minggu & Libur Nasional</p>
              <p className="text-gray-600">Tutup</p>
            </div>
          </div>
        </div>

        {/* Kontak Section */}
        <div className="bg-gray-50 p-8 rounded-2xl space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Hubungi Kami</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Alamat</p>
                <p className="text-gray-600">
                  Jl. Surokarsan No.56, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Telepon</p>
                <a href="tel:0274375806" className="text-green-700 font-medium hover:underline">
                  (0274) 375-806
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/queue"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors"
          >
            Ambil Antrian Online
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-950 py-8 mt-12">
        <div className="text-center text-green-400 text-sm">
          &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  desc, 
  color 
}: { 
  icon: typeof Gem; 
  title: string; 
  desc: string;
  color: string;
}) {
  return (
    <div className="flex gap-4 items-start bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
