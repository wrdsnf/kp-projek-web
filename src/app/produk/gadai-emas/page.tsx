import Link from "next/link";
import ProductNav from "@/components/ProductNav";
import { Gem, ArrowLeft, CheckCircle, Clock, Shield, Banknote, Sparkles, Phone, Ticket, ArrowRight, Briefcase, GraduationCap, Heart, Home } from "lucide-react";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";

export const metadata = {
  title: "Gadai Emas - Pegadaian CP Sentul",
  description: "Layanan gadai emas dan perhiasan di Pegadaian CP Sentul Yogyakarta. Proses cepat, aman, dan terpercaya.",
};

export default function GadaiEmasPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNavbar />

      <main>
        {/* Hero / Intro Section - No card, soft background */}
        <section className="relative overflow-hidden">
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50" />
          
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            {/* Back Link */}
            <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-amber-600 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl items-center justify-center shadow-lg flex-shrink-0">
                <Gem className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4 leading-tight">
                  Gadai Emas
                </h1>
                <p className="text-lg md:text-xl text-emerald-700 leading-relaxed max-w-2xl">
                  Butuh dana cepat? Gadai Emas adalah solusi paling praktis. Cukup bawa emas atau perhiasan kamu, 
                  dalam 15 menit dana langsung cair. Barang kamu aman tersimpan di brankas Pegadaian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Apa Itu Gadai Emas? - Normal section, left-aligned */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6">
            Apa Itu Gadai Emas?
          </h2>
          
          <div className="space-y-4 text-emerald-700 leading-relaxed">
            <p>
              Gadai Emas adalah layanan pembiayaan di mana kamu menyerahkan emas atau perhiasan sebagai jaminan. 
              Kamu akan menerima pinjaman sesuai nilai taksiran barang yang dijaminkan — biasanya sekitar 90-95% dari harga pasar.
            </p>
            <p>
              Barang jaminan akan aman tersimpan di brankas Pegadaian selama masa pinjaman. 
              Kamu bisa menebus kapan saja sebelum jatuh tempo dengan membayar pokok pinjaman ditambah biaya sewa modal (bunga).
            </p>
          </div>

          {/* Inline highlight */}
          <div className="mt-8 flex items-center gap-4 py-4 border-l-4 border-amber-400 pl-6 bg-amber-50/50">
            <Clock className="w-8 h-8 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-900">Jangka Waktu Fleksibel</p>
              <p className="text-emerald-700 text-sm">Mulai dari 15 hari hingga 120 hari. Bisa diperpanjang atau dicicil.</p>
            </div>
          </div>
        </section>

        {/* Keuntungan - Split layout with icons */}
        <section className="bg-emerald-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-8 text-center">
              Kenapa Pilih Gadai Emas di Pegadaian?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {
                  icon: Sparkles,
                  title: "Proses Super Cepat",
                  desc: "Dana cair hanya dalam 15 menit. Tidak perlu survei, tidak perlu BI checking."
                },
                {
                  icon: Banknote,
                  title: "Taksiran Tinggi",
                  desc: "Nilai pinjaman hingga 95% dari harga pasar emas. Transparan dan adil."
                },
                {
                  icon: Shield,
                  title: "Aman & Terjamin",
                  desc: "Barang disimpan di brankas dengan standar keamanan tinggi. Diasuransikan."
                },
                {
                  icon: Clock,
                  title: "Bunga Kompetitif",
                  desc: "Mulai dari 0.75% per 15 hari. Lebih murah dari pinjaman konvensional."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-1">{item.title}</h3>
                    <p className="text-emerald-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cocok Untuk Siapa? - Highlight blocks with accent border */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6">
            Cocok Untuk Siapa?
          </h2>
          
          <p className="text-emerald-700 mb-8">
            Gadai Emas bisa jadi solusi keuangan untuk berbagai kebutuhan:
          </p>

          <div className="space-y-4">
            {[
              { icon: Briefcase, text: "Pengusaha yang butuh modal usaha cepat tanpa proses berbelit" },
              { icon: GraduationCap, text: "Orang tua yang perlu dana untuk biaya pendidikan anak" },
              { icon: Heart, text: "Siapa saja yang butuh dana darurat untuk keperluan mendesak" },
              { icon: Home, text: "Pemilik rumah yang perlu renovasi atau perbaikan mendadak" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-5 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-500 rounded-r-lg">
                <item.icon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-emerald-700 italic">
            "Produk ini cocok buat kamu yang butuh dana cepat, tapi tetap pengen aman dan jelas prosesnya."
          </p>
        </section>

        {/* Syarat & Cara - Clean horizontal steps */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Cara Mengajukan Gadai Emas
            </h2>

            {/* Steps */}
            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {[
                { step: "1", title: "Siapkan", desc: "KTP asli & barang emas" },
                { step: "2", title: "Datang", desc: "Ke outlet Pegadaian" },
                { step: "3", title: "Antri", desc: "Ambil nomor antrian" },
                { step: "4", title: "Taksir", desc: "Barang ditaksir petugas" },
                { step: "5", title: "Terima", desc: "Dana langsung cair" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-900 font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-emerald-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Requirements - inline */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                Yang Perlu Dibawa:
              </h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">KTP Asli</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Emas / Perhiasan</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Usia min. 17 tahun</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Navigation */}
        <ProductNav />

        {/* CTA Section - Standalone */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">
            Siap Mengajukan Gadai Emas?
          </h2>
          <p className="text-emerald-700 mb-8 max-w-lg mx-auto">
            Kunjungi outlet Pegadaian CP Sentul atau ambil nomor antrian online supaya tidak perlu menunggu lama.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              <Ticket className="w-5 h-5" />
              Ambil Antrian Online
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="tel:0274375806"
              className="inline-flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold py-4 px-8 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              (0274) 375-806
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}
