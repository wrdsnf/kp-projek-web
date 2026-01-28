import Link from "next/link";
import { Ticket, Gem, FileText, Clock } from "lucide-react";

export default function QueueShortcut() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-16 md:py-20">
      {/* Real Photo Background - Subtle overlay (matches Hero) */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("/bg.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark overlay to ensure text readability (matches Hero) */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-green-900/60" />
      
      {/* Pattern Background (matches Hero) */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30 mb-6">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Antrian Online</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ambil Antrian Online
          </h2>
          <p className="text-green-200 max-w-xl mx-auto">
            Tidak perlu datang pagi-pagi. Ambil nomor antrian secara online dan 
            pantau giliran Anda langsung dari smartphone.
          </p>
        </div>

        {/* Queue Buttons */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link 
            href="/queue"
            className="group relative bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gem className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Antrian Gadai</h3>
              <p className="text-amber-100 text-sm">
                Gadai emas, perhiasan, dan barang berharga
              </p>
            </div>
          </Link>

          <Link 
            href="/queue"
            className="group relative bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-2xl p-6 transition-all transform hover:scale-105 shadow-lg shadow-green-500/30 border border-green-500/30"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Antrian Non-Gadai</h3>
              <p className="text-green-100 text-sm">
                Pelunasan, cicilan, dan pembayaran
              </p>
            </div>
          </Link>
        </div>

        {/* Info */}
        <div className="mt-10 flex items-center justify-center gap-2 text-green-300 text-sm">
          <Clock className="w-4 h-4" />
          <span>Nomor antrian tersimpan otomatis di browser Anda</span>
        </div>
      </div>
    </section>
  );
}
