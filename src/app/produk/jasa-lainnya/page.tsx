import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MoreHorizontal, ArrowLeft, CheckCircle, Phone, Ticket, Zap, Smartphone, CreditCard, Banknote, Send } from "lucide-react";

export const metadata = {
  title: "Jasa Lainnya - Pegadaian CP Sentul",
  description: "Layanan transfer uang, pembayaran tagihan, top up dan jasa keuangan lainnya di Pegadaian CP Sentul Yogyakarta.",
};

export default function JasaLainnyaPage() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 rounded-2xl mb-6">
            <MoreHorizontal className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jasa Lainnya</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Selain gadai dan tabungan emas, Pegadaian juga menyediakan berbagai layanan 
            keuangan untuk mempermudah kebutuhan sehari-hari Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Transfer Uang */}
          <div className="bg-blue-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Send className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Transfer Uang</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kirim uang ke seluruh Indonesia dengan mudah dan aman. Tersedia berbagai 
              pilihan pengiriman instan dan reguler.
            </p>
          </div>

          {/* Pembayaran Tagihan */}
          <div className="bg-green-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Pembayaran Tagihan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bayar tagihan listrik (PLN), air (PDAM), BPJS, TV kabel, internet, 
              dan berbagai tagihan lainnya.
            </p>
          </div>

          {/* Top Up */}
          <div className="bg-purple-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Top Up & Pulsa</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Isi ulang pulsa, paket data, token listrik, e-wallet (OVO, GoPay, DANA, dll) 
              dengan mudah.
            </p>
          </div>

          {/* Multi Payment */}
          <div className="bg-amber-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Token Listrik</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Beli token listrik prabayar dengan berbagai nominal. 
              Proses cepat dan langsung masuk.
            </p>
          </div>

          {/* Remittance */}
          <div className="bg-rose-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
              <Banknote className="w-7 h-7 text-rose-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Remittance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Layanan pengiriman dan penerimaan uang dari luar negeri 
              dengan kurs kompetitif.
            </p>
          </div>

          {/* Cicilan */}
          <div className="bg-cyan-50 rounded-2xl p-6 space-y-3 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-cyan-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Pembayaran Cicilan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bayar cicilan kendaraan, multifinance, dan pinjaman lainnya 
              dengan mudah di outlet kami.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Mengapa Transaksi di Pegadaian?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, text: "Aman & Terpercaya" },
              { icon: Zap, text: "Proses Cepat" },
              { icon: CreditCard, text: "Biaya Kompetitif" },
              { icon: Smartphone, text: "Bisa via Aplikasi" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Promo */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-8 h-8 text-green-900" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Lebih Mudah dengan Aplikasi Tring!</h3>
              <p className="text-green-100">
                Lakukan pembayaran tagihan dan top up langsung dari smartphone Anda. 
                Download aplikasi Pegadaian Digital sekarang.
              </p>
            </div>
            <Link 
              href="/#aplikasi-mobile"
              className="bg-white hover:bg-amber-50 text-green-800 font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap"
            >
              Lihat Aplikasi
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Butuh Bantuan?</h3>
          <p className="text-teal-100 mb-6">Kunjungi outlet kami untuk layanan langsung dari petugas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-teal-900 font-bold py-3 px-6 rounded-xl transition-colors"
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
