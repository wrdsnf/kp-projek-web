import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Gem, ArrowLeft, CheckCircle, FileText, ListOrdered, Phone, Ticket } from "lucide-react";

export const metadata = {
  title: "Gadai Emas - Pegadaian CP Sentul",
  description: "Layanan gadai emas dan perhiasan di Pegadaian CP Sentul Yogyakarta. Proses cepat, aman, dan terpercaya.",
};

export default function GadaiEmasPage() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-2xl mb-6">
            <Gem className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gadai Emas</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Solusi dana cepat dengan jaminan emas dan perhiasan Anda. 
            Proses mudah, aman, dan transparan dengan bunga kompetitif.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Penjelasan Produk */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tentang Gadai Emas</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Gadai Emas adalah layanan pembiayaan dengan menyerahkan emas atau perhiasan sebagai jaminan. 
              Anda akan menerima pinjaman sesuai nilai taksiran barang yang dijaminkan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Barang jaminan Anda aman tersimpan di brankas Pegadaian dan dapat ditebus kapan saja 
              sebelum jatuh tempo dengan membayar pokok pinjaman dan biaya sewa modal.
            </p>
          </div>

          {/* Manfaat */}
          <div className="bg-green-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Manfaat Utama</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Proses cepat, dana cair dalam 15 menit",
                "Taksiran tinggi dan transparan",
                "Bunga kompetitif mulai 0.75%/15 hari",
                "Jangka waktu fleksibel hingga 120 hari",
                "Barang aman tersimpan di brankas",
                "Dapat ditebus kapan saja",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
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
                Emas atau perhiasan yang akan dijaminkan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                Mengisi formulir permohonan gadai
              </li>
            </ul>
          </div>

          {/* Alur Layanan */}
          <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ListOrdered className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Alur Singkat</h2>
            </div>
            <ol className="space-y-3 text-gray-700">
              {[
                "Datang ke outlet dengan membawa KTP dan barang jaminan",
                "Ambil nomor antrian Gadai",
                "Barang ditaksir oleh petugas",
                "Tandatangani Surat Bukti Kredit (SBK)",
                "Terima uang pinjaman",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Siap Mengajukan Gadai Emas?</h3>
          <p className="text-green-100 mb-6">Kunjungi outlet kami atau ambil nomor antrian online terlebih dahulu.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/queue"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-3 px-6 rounded-xl transition-colors"
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
