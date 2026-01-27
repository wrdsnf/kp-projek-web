import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductNav from "@/components/ProductNav";
import { Coins, ArrowLeft, TrendingUp, Shield, PiggyBank, Target, Smartphone, Phone, Ticket, ArrowRight, GraduationCap, Users, Briefcase, Heart } from "lucide-react";

export const metadata = {
  title: "Tabungan Emas - Pegadaian CP Sentul",
  description: "Menabung emas mulai dari Rp10.000 di Pegadaian CP Sentul Yogyakarta. Aman, mudah, dan menguntungkan.",
};

export default function TabunganEmasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-white" />
          
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-700 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl items-center justify-center shadow-lg flex-shrink-0">
                <Coins className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Tabungan Emas
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Mulai investasi emas dengan modal kecil — cuma Rp10.000! Nggak perlu khawatir penyimpanan,
                  emas kamu aman di Pegadaian. Bisa ditarik fisik atau dijual kapan saja.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Apa Itu Tabungan Emas? */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Apa Itu Tabungan Emas?
          </h2>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Tabungan Emas adalah cara menabung dalam bentuk emas yang praktis dan terjangkau. 
              Kamu tidak perlu membeli emas batangan secara utuh — cukup menabung sesuai kemampuan.
            </p>
            <p>
              Setiap menabung, saldo kamu akan dikonversi ke satuan gram emas. Ketika saldo sudah cukup, 
              kamu bisa mencetak emas fisik atau menjualnya kembali dengan harga pasar saat itu.
            </p>
          </div>

          {/* Highlight numbers */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="py-6">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">Rp10rb</p>
              <p className="text-gray-500 text-sm mt-1">Minimal nabung</p>
            </div>
            <div className="py-6 border-x border-gray-200">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">0.01gr</p>
              <p className="text-gray-500 text-sm mt-1">Satuan terkecil</p>
            </div>
            <div className="py-6">
              <p className="text-3xl md:text-4xl font-bold text-amber-600">24K</p>
              <p className="text-gray-500 text-sm mt-1">Emas murni</p>
            </div>
          </div>
        </section>

        {/* Kenapa Harus Nabung Emas? */}
        <section className="bg-gradient-to-b from-amber-50 to-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Kenapa Harus Nabung Emas?
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Nilai Cenderung Naik",
                  desc: "Harga emas secara historis terus meningkat. Cocok untuk investasi jangka panjang dan proteksi dari inflasi."
                },
                {
                  icon: Shield,
                  title: "Aman & Terjamin",
                  desc: "Emas disimpan di Pegadaian dengan standar keamanan tinggi. Tidak perlu pusing soal penyimpanan di rumah."
                },
                {
                  icon: PiggyBank,
                  title: "Fleksibel & Mudah",
                  desc: "Nabung kapan saja, berapa saja. Bisa lewat aplikasi atau langsung ke outlet. Tarik fisik atau jual kapan pun."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cocok Untuk Siapa */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Cocok Untuk Siapa?
          </h2>

          <div className="space-y-4">
            {[
              { icon: GraduationCap, text: "Mahasiswa yang ingin mulai berinvestasi dengan modal kecil" },
              { icon: Users, text: "Orang tua yang menabung untuk masa depan anak" },
              { icon: Briefcase, text: "Pekerja yang ingin diversifikasi investasi selain reksa dana atau saham" },
              { icon: Heart, text: "Siapa saja yang ingin menyimpan kekayaan dalam bentuk emas" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-5 bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-500 rounded-r-lg">
                <item.icon className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Buka Tabungan */}
        <section className="bg-gradient-to-br from-amber-600 to-yellow-600 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Cara Buka Tabungan Emas
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Via Outlet */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Via Outlet
                </h3>
                <ol className="space-y-3 text-amber-100">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    Datang ke outlet dengan KTP
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    Isi formulir pembukaan rekening
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    Setoran awal mulai Rp10.000
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    Rekening aktif, mulai menabung!
                  </li>
                </ol>
              </div>

              {/* Via Aplikasi */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Via Aplikasi Pegadaian
                </h3>
                <ol className="space-y-3 text-amber-100">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    Download aplikasi Pegadaian Digital
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    Registrasi dengan KTP & selfie
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    Buka menu Tabungan Emas
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    Top up dan mulai nabung!
                  </li>
                </ol>
              </div>
            </div>

            <div className="text-center">
              <p className="text-amber-100 mb-2">Syarat pembukaan:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">KTP Asli</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Usia min. 17 tahun</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Setoran awal Rp10.000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Navigation */}
        <ProductNav />

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Mulai Nabung Emas Sekarang!
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Investasi emas tidak harus mahal. Mulai dari Rp10.000, kamu sudah bisa punya tabungan emas sendiri.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              <Ticket className="w-5 h-5" />
              Kunjungi Outlet
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="tel:0274375806"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              (0274) 375-806
            </a>
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
