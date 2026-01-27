import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductNav from "@/components/ProductNav";
import { Wallet, ArrowLeft, Receipt, Smartphone, Zap, Droplet, Wifi, CreditCard, Phone, Ticket, ArrowRight, CheckCircle, Send, Globe, Sparkles } from "lucide-react";

export const metadata = {
  title: "Jasa Lainnya - Pegadaian CP Sentul",
  description: "Pembayaran tagihan listrik, PDAM, pulsa, dan layanan keuangan lainnya di Pegadaian CP Sentul Yogyakarta.",
};

export default function JasaLainnyaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-gray-50" />
          
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl items-center justify-center shadow-lg flex-shrink-0">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Jasa Lainnya
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Selain gadai dan pembiayaan, Pegadaian juga menyediakan berbagai layanan pembayaran dan jasa keuangan lainnya.
                  Semua bisa dilakukan di satu tempat!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Layanan Pembayaran */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Layanan Pembayaran
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-8">
            Bayar berbagai tagihan rutin di outlet Pegadaian. Praktis dan cepat, tidak perlu ke tempat terpisah-pisah.
          </p>

          {/* Service Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, label: "Listrik PLN", desc: "Token & Pasca" },
              { icon: Droplet, label: "PDAM", desc: "Air bersih" },
              { icon: Smartphone, label: "Pulsa & Data", desc: "Semua operator" },
              { icon: Wifi, label: "Internet/TV", desc: "Indihome, dll" },
              { icon: Receipt, label: "BPJS", desc: "Kesehatan" },
              { icon: CreditCard, label: "Kartu Kredit", desc: "Cicilan" },
              { icon: Receipt, label: "Pajak", desc: "PBB, dll" },
              { icon: Wallet, label: "Transfer", desc: "Kirim uang" },
            ].map((item, i) => (
              <div key={i} className="text-center py-6 px-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors border border-gray-100">
                <item.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Keuntungan */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Kenapa Bayar di Pegadaian?
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Satu Tempat untuk Semua",
                  desc: "Tidak perlu ke loket berbeda-beda. Bayar listrik, air, pulsa, dan tagihan lainnya di satu tempat."
                },
                {
                  title: "Bisa Bayar Tunai",
                  desc: "Tidak punya m-banking atau e-wallet? Bayar tunai langsung di outlet, praktis untuk semua kalangan."
                },
                {
                  title: "Struk Resmi",
                  desc: "Setiap pembayaran dapat bukti struk resmi. Transaksi tercatat dan aman."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 px-6 bg-gradient-to-r from-green-50 to-transparent border-l-4 border-green-500 rounded-r-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Layanan Lainnya */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Layanan Tambahan
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kirim Uang */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-green-600" />
                Kirim Uang (Remittance)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kirim uang ke keluarga di kota lain dengan cepat dan aman. 
                Penerima bisa mengambil di outlet Pegadaian terdekat.
              </p>
            </div>

            {/* Multipayment */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                Multi-Payment
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bayar cicilan kendaraan, leasing, dan berbagai tagihan lainnya 
                di satu tempat dengan biaya admin minimal.
              </p>
            </div>

            {/* Western Union */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Western Union
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Terima kiriman uang dari luar negeri lewat jaringan Western Union. 
                Pencairan cepat dan aman.
              </p>
            </div>

            {/* Validasi Emas */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                Cek Keaslian Emas
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mau beli emas dari luar? Cek dulu keasliannya di Pegadaian. 
                Kami punya alat uji yang akurat.
              </p>
            </div>
          </div>
        </section>

        {/* Product Navigation */}
        <ProductNav />

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Butuh Bantuan Layanan?
            </h2>
            <p className="text-green-100 mb-8 max-w-lg mx-auto">
              Kunjungi outlet Pegadaian CP Sentul untuk berbagai kebutuhan pembayaran dan layanan keuangan lainnya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/queue"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-green-900 font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
              >
                <Ticket className="w-5 h-5" />
                Ambil Antrian
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:0274375806"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-colors border border-white/30"
              >
                <Phone className="w-5 h-5" />
                (0274) 375-806
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-950 py-8">
        <div className="text-center text-green-400 text-sm">
          &copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
