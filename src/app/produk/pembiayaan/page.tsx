import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Briefcase, ArrowLeft, CheckCircle, FileText, ListOrdered, Phone, Ticket, Building } from "lucide-react";

export const metadata = {
  title: "Pembiayaan - Pegadaian CP Sentul",
  description: "Layanan pembiayaan UMKM dan modal usaha di Pegadaian CP Sentul Yogyakarta. Kreasi, Krasida, dan pembiayaan syariah.",
};

export default function PembiayaanPage() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-2xl mb-6">
            <Briefcase className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pembiayaan Usaha</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Modal usaha untuk mengembangkan bisnis Anda. Tersedia berbagai produk pembiayaan 
            dengan bunga kompetitif dan proses mudah.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* KREASI */}
          <div className="bg-indigo-50 rounded-2xl p-6 space-y-3 border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">KREASI</h3>
                <p className="text-sm text-gray-500">Kredit Angsuran Fidusia</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pembiayaan dengan jaminan BPKB kendaraan bermotor. Angsuran tetap per bulan 
              dengan tenor hingga 36 bulan.
            </p>
          </div>

          {/* KRASIDA */}
          <div className="bg-green-50 rounded-2xl p-6 space-y-3 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">KRASIDA</h3>
                <p className="text-sm text-gray-500">Kredit Angsuran Emas</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pembiayaan dengan jaminan emas. Angsuran tetap per bulan dengan tenor 
              hingga 36 bulan dan bunga kompetitif.
            </p>
          </div>

          {/* Pembiayaan Syariah */}
          <div className="bg-emerald-50 rounded-2xl p-6 space-y-3 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-lg">☪</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">RAHN (Syariah)</h3>
                <p className="text-sm text-gray-500">Gadai & Pembiayaan Syariah</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pembiayaan berbasis prinsip syariah dengan akad yang jelas dan transparan. 
              Bebas riba.
            </p>
          </div>

          {/* Amanah */}
          <div className="bg-amber-50 rounded-2xl p-6 space-y-3 border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">AMANAH</h3>
                <p className="text-sm text-gray-500">Pembiayaan Kendaraan Syariah</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pembiayaan kepemilikan kendaraan bermotor dengan prinsip syariah untuk 
              karyawan dan pengusaha mikro.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Manfaat */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Keunggulan Pembiayaan</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Proses pengajuan mudah dan cepat",
                "Bunga/margin kompetitif",
                "Angsuran tetap setiap bulan",
                "Tenor fleksibel hingga 36 bulan",
                "Dapat digunakan untuk modal usaha",
                "Tersedia opsi konvensional & syariah",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Syarat Umum */}
          <div className="bg-amber-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Persyaratan Umum</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                KTP dan KK asli
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                BPKB kendaraan (untuk KREASI)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Emas/perhiasan (untuk KRASIDA)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Slip gaji/bukti penghasilan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Surat keterangan usaha (jika ada)
              </li>
            </ul>
          </div>
        </div>

        {/* Alur */}
        <div className="bg-indigo-50 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <ListOrdered className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Proses Pengajuan</h2>
          </div>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              "Konsultasi & pilih produk",
              "Lengkapi dokumen",
              "Survei (jika diperlukan)",
              "Persetujuan kredit",
              "Pencairan dana",
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Butuh Modal Usaha?</h3>
          <p className="text-indigo-100 mb-6">Konsultasikan kebutuhan pembiayaan Anda dengan tim kami.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-indigo-900 font-bold py-3 px-6 rounded-xl transition-colors"
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
