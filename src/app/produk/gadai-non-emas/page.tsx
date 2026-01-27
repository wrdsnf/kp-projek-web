import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Laptop, ArrowLeft, CheckCircle, FileText, ListOrdered, Phone, Ticket } from "lucide-react";

export const metadata = {
  title: "Gadai Non-Emas - Pegadaian CP Sentul",
  description: "Layanan gadai elektronik, kendaraan, dan barang berharga lainnya di Pegadaian CP Sentul Yogyakarta.",
};

export default function GadaiNonEmasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
            <Laptop className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gadai Non-Emas</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan dana tunai dengan jaminan barang elektronik, kendaraan bermotor, 
            atau barang berharga lainnya. Proses cepat dan aman.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Penjelasan Produk */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tentang Gadai Non-Emas</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Gadai Non-Emas memungkinkan Anda mendapatkan pinjaman dengan menjaminkan 
              barang selain emas, seperti laptop, handphone, kamera, kendaraan bermotor, dan lainnya.
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-2">Barang yang dapat dijaminkan:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Laptop, tablet, smartphone</li>
                <li>• Kamera dan lensa</li>
                <li>• Sepeda motor (BPKB)</li>
                <li>• Jam tangan branded</li>
                <li>• Peralatan elektronik lainnya</li>
              </ul>
            </div>
          </div>

          {/* Manfaat */}
          <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Manfaat Utama</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Proses cepat dan mudah",
                "Taksiran sesuai kondisi barang",
                "Bunga kompetitif",
                "Jangka waktu fleksibel",
                "Barang diasuransikan",
                "Dapat diperpanjang",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Syarat & Alur */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Syarat Umum */}
          <div className="bg-amber-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Syarat Umum</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                KTP asli yang masih berlaku
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Barang yang akan dijaminkan dalam kondisi baik
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Kelengkapan barang (charger, dus, dll - jika ada)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                BPKB asli (untuk gadai kendaraan)
              </li>
            </ul>
          </div>

          {/* Alur Layanan */}
          <div className="bg-green-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ListOrdered className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Alur Singkat</h2>
            </div>
            <ol className="space-y-3 text-gray-700">
              {[
                "Datang ke outlet dengan membawa KTP dan barang",
                "Ambil nomor antrian Gadai",
                "Petugas memeriksa dan menaksir barang",
                "Setujui nilai pinjaman dan tanda tangan SBK",
                "Terima uang pinjaman",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Butuh Dana Cepat?</h3>
          <p className="text-blue-100 mb-6">Gadaikan barang elektronik atau kendaraan Anda sekarang.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-blue-900 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Ticket className="w-5 h-5" />
              Ambil Antrian
            </Link>
            <a 
              href="tel:0274375806"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-white/30"
            >
              <Phone className="w-5 h-5" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-950 py-8 mt-12">
        <div className="text-center text-green-400 text-sm">
          &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
