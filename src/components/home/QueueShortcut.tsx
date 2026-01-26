import Link from "next/link";
import { Ticket, Gem, FileText, Clock } from "lucide-react";

export default function QueueShortcut() {
  return (
    <section className="bg-gradient-to-br from-green-800 to-green-900 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
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
