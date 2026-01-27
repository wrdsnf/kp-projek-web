import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Landmark, ArrowLeft, Home, Car, Briefcase, GraduationCap, Phone, Ticket, ArrowRight, CheckCircle, Building } from "lucide-react";

export const metadata = {
  title: "Pembiayaan - Pegadaian CP Sentul",
  description: "Layanan pembiayaan KREASI, KRASIDA, Amanah, dan Rahn Syariah di Pegadaian CP Sentul Yogyakarta.",
};

export default function PembiayaanPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
          
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl items-center justify-center shadow-lg flex-shrink-0">
                <Landmark className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Pembiayaan
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Butuh pinjaman untuk usaha, pendidikan, atau kebutuhan lainnya? Pegadaian punya berbagai 
                  produk pembiayaan dengan proses mudah dan bunga kompetitif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Text */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Pilihan Produk Pembiayaan
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-10">
            Kami menyediakan berbagai jenis pembiayaan yang bisa disesuaikan dengan kebutuhan kamu. 
            Mau untuk modal usaha, beli kendaraan, atau keperluan lain — ada solusinya.
          </p>

          {/* Product List */}
          <div className="space-y-8">
            {/* KREASI */}
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">KREASI</h3>
              </div>
              <p className="text-gray-600 mb-3">
                <strong>Kredit Angsuran Sistem Gadai</strong> — Pinjaman dengan jaminan BPKB kendaraan bermotor. 
                Cicilan ringan hingga 36 bulan, kendaraan tetap bisa dipakai.
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                <li className="bg-green-50 text-green-700 px-3 py-1 rounded-full">Jaminan BPKB</li>
                <li className="bg-green-50 text-green-700 px-3 py-1 rounded-full">Tenor s.d 36 bulan</li>
                <li className="bg-green-50 text-green-700 px-3 py-1 rounded-full">Kendaraan tetap dipakai</li>
              </ul>
            </div>

            {/* KRASIDA */}
            <div className="border-l-4 border-amber-500 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Home className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">KRASIDA</h3>
              </div>
              <p className="text-gray-600 mb-3">
                <strong>Kredit Angsuran Sistem Gadai</strong> — Pinjaman dengan jaminan emas yang dicicil. 
                Cocok untuk kebutuhan dana besar dengan cicilan ringan.
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Jaminan Emas</li>
                <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Angsuran bulanan</li>
                <li className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Plafon hingga 500 juta</li>
              </ul>
            </div>

            {/* Amanah */}
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Car className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">AMANAH</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Pembiayaan kendaraan bermotor secara syariah. Beli motor atau mobil baru dengan 
                skema cicilan yang sesuai prinsip syariah.
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Prinsip Syariah</li>
                <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Motor atau Mobil</li>
                <li className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">DP ringan</li>
              </ul>
            </div>

            {/* Rahn */}
            <div className="border-l-4 border-emerald-500 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900">Rahn (Gadai Syariah)</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Pembiayaan dengan prinsip syariah. Jaminan emas atau barang berharga lainnya. 
                Tanpa bunga, yang ada hanya biaya pemeliharaan (mu'nah).
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                <li className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">Tanpa Bunga</li>
                <li className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">Sesuai Syariah</li>
                <li className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">Biaya mu'nah rendah</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Syarat Umum */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Syarat Umum Pengajuan
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  "KTP asli yang masih berlaku",
                  "Kartu Keluarga (KK)",
                  "Dokumen jaminan (BPKB/Emas)",
                  "Slip gaji atau bukti penghasilan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  "Usia minimal 21 tahun atau sudah menikah",
                  "Memiliki penghasilan tetap",
                  "Mengisi formulir pengajuan",
                  "Syarat tambahan sesuai jenis produk",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tertarik dengan Produk Pembiayaan?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Konsultasikan kebutuhan kamu dengan petugas kami di outlet. Kami bantu carikan solusi terbaik.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              <Ticket className="w-5 h-5" />
              Ambil Antrian
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
