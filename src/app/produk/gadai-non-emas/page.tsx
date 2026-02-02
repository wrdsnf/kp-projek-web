import Link from "next/link";
import ProductNav from "@/components/ProductNav";
import { Laptop, ArrowLeft, CheckCircle, Clock, Shield, Smartphone, Watch, Camera, Phone, Ticket, ArrowRight, Bike } from "lucide-react";
import GlobalFooter from "@/components/layout/GlobalFooter";
import { GlobalNavbar } from "@/components/layout";

export const metadata = {
  title: "Gadai Non-Emas - Pegadaian CP Sentul",
  description: "Layanan gadai elektronik, kendaraan, dan barang berharga lainnya di Pegadaian CP Sentul Yogyakarta.",
};

export default function GadaiNonEmasPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNavbar />

      <main>
        {/* Hero / Intro Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30" />
          
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-amber-600 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl items-center justify-center shadow-lg flex-shrink-0">
                <Laptop className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4 leading-tight">
                  Gadai Non-Emas
                </h1>
                <p className="text-lg md:text-xl text-emerald-700 leading-relaxed max-w-2xl">
                  Punya laptop, HP, atau kendaraan yang bisa dijadikan jaminan? Gadai Non-Emas memungkinkan kamu 
                  mendapat pinjaman dengan barang elektronik atau kendaraan sebagai jaminan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Apa Itu Gadai Non-Emas? */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6">
            Apa Itu Gadai Non-Emas?
          </h2>
          
          <div className="space-y-4 text-emerald-700 leading-relaxed">
            <p>
              Gadai Non-Emas adalah layanan pinjaman dengan jaminan barang selain emas — bisa berupa elektronik seperti laptop, 
              smartphone, kamera, atau bahkan kendaraan bermotor (BPKB).
            </p>
            <p>
              Sama seperti gadai emas, barang kamu akan aman tersimpan di Pegadaian dan bisa ditebus kapan saja. 
              Cocok buat kamu yang butuh dana cepat tapi tidak punya emas untuk dijaminkan.
            </p>
          </div>

          {/* Barang yang Bisa Digadaikan */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Smartphone, label: "Smartphone" },
              { icon: Laptop, label: "Laptop" },
              { icon: Camera, label: "Kamera" },
              { icon: Watch, label: "Jam Tangan" },
            ].map((item, i) => (
              <div key={i} className="text-center py-6 px-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-emerald-800 font-medium text-sm">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-emerald-600 text-sm mt-4">
            Dan masih banyak lagi — termasuk BPKB kendaraan
          </p>
        </section>

        {/* Keuntungan */}
        <section className="bg-emerald-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-8 text-center">
              Keuntungan Gadai Non-Emas
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  icon: Clock,
                  title: "Proses Cepat & Mudah",
                  desc: "Tidak butuh dokumen rumit. Cukup bawa barang dan KTP, proses selesai dalam hitungan menit."
                },
                {
                  icon: Shield,
                  title: "Barang Aman Tersimpan",
                  desc: "Barang elektronik dan berharga kamu disimpan di tempat khusus dengan keamanan tinggi."
                },
                {
                  icon: CheckCircle,
                  title: "Fleksibel & Transparan",
                  desc: "Jangka waktu pinjaman bisa disesuaikan. Semua biaya dijelaskan di awal, tidak ada biaya tersembunyi."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-1">{item.title}</h3>
                    <p className="text-emerald-700 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cocok Untuk Siapa? */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6">
            Cocok Untuk Siapa?
          </h2>

          <div className="space-y-4">
            {[
              { icon: Smartphone, text: "Punya gadget atau laptop yang jarang dipakai? Bisa jadi sumber dana darurat." },
              { icon: Bike, text: "Butuh modal usaha? BPKB motor bisa jadi jaminan tanpa harus menjual kendaraan." },
              { icon: Camera, text: "Fotografer atau content creator yang butuh dana untuk upgrade alat." },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-5 bg-gradient-to-r from-emerald-50 to-transparent border-l-4 border-emerald-500 rounded-r-lg">
                <item.icon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alur Singkat */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Cara Mengajukan
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { num: "1", title: "Bawa Barang", desc: "& KTP asli" },
                { num: "2", title: "Ambil Antrian", desc: "Non-Gadai" },
                { num: "3", title: "Taksiran", desc: "Oleh petugas" },
                { num: "4", title: "Dana Cair", desc: "Langsung!" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-amber-500 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                    {item.num}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-emerald-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-emerald-100">
                <strong className="text-white">Syarat:</strong> KTP asli + barang jaminan dalam kondisi berfungsi baik
              </p>
            </div>
          </div>
        </section>

        {/* Product Navigation */}
        <ProductNav />

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">
            Butuh Dana Cepat?
          </h2>
          <p className="text-emerald-700 mb-8 max-w-lg mx-auto">
            Gadaikan barang elektronik atau kendaraanmu di Pegadaian CP Sentul. Prosesnya cepat dan aman.
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

      <GlobalFooter />
    </div>
  );
}
