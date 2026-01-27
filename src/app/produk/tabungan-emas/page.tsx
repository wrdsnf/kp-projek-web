import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Coins, ArrowLeft, CheckCircle, FileText, ListOrdered, Phone, Ticket, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Tabungan Emas - Pegadaian CP Sentul",
  description: "Investasi emas aman dan terjangkau mulai dari Rp10.000 di Pegadaian CP Sentul Yogyakarta.",
};

export default function TabunganEmasPage() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-2xl mb-6">
            <Coins className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tabungan Emas</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Investasi emas paling terjangkau dan aman. Mulai nabung emas mulai dari Rp10.000 
            dan bangun kekayaan untuk masa depan Anda.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-900" />
            <span className="text-yellow-900 font-bold text-lg">Mulai dari Rp10.000</span>
          </div>
          <p className="text-yellow-800">
            Emas Anda tersimpan aman dalam bentuk saldo gram di rekening Pegadaian
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Penjelasan Produk */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tentang Tabungan Emas</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Tabungan Emas adalah layanan menabung emas dalam bentuk pecahan kecil mulai dari 0.01 gram. 
              Anda dapat menabung secara bertahap dan mencairkan kapan saja dalam bentuk emas fisik atau uang tunai.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Emas Anda tersimpan aman dalam bentuk saldo gram dan dapat dipantau melalui 
              aplikasi Pegadaian Digital (Tring).
            </p>
          </div>

          {/* Manfaat */}
          <div className="bg-yellow-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Manfaat Utama</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Mulai nabung dari Rp10.000",
                "Beli emas pecahan 0.01 gram",
                "Aman tersimpan di Pegadaian",
                "Bisa dicetak menjadi emas fisik",
                "Bisa dicairkan kapan saja",
                "Harga transparan sesuai pasar",
                "Tidak ada biaya administrasi bulanan",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
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
              <h2 className="text-xl font-bold text-gray-800">Syarat Pembukaan Rekening</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                KTP asli yang masih berlaku
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Mengisi formulir pembukaan rekening
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Setoran awal minimal Rp10.000
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Biaya admin pembukaan Rp10.000
              </li>
            </ul>
          </div>

          {/* Alur Layanan */}
          <div className="bg-green-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ListOrdered className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Cara Membuka Rekening</h2>
            </div>
            <ol className="space-y-3 text-gray-700">
              {[
                "Datang ke outlet dengan membawa KTP",
                "Ambil nomor antrian Non-Gadai",
                "Isi formulir pembukaan rekening Tabungan Emas",
                "Bayar biaya admin dan setoran awal",
                "Rekening aktif dan siap nabung!",
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
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-yellow-900 mb-3">Mulai Investasi Emas Sekarang!</h3>
          <p className="text-yellow-800 mb-6">Buka rekening Tabungan Emas dan mulai nabung untuk masa depan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Ticket className="w-5 h-5" />
              Ambil Antrian
            </Link>
            <a 
              href="tel:0274375806"
              className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-yellow-900 font-semibold py-3 px-6 rounded-xl transition-colors"
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
