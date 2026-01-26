import Link from "next/link";
import { Building2, Clock, MapPin, Phone, Ticket } from "lucide-react";

export default function Hero() {
    const phone = "0274375806";
    const address = "Jl. Surokarsan No.56, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151";
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Cabang Pembantu Resmi</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Pegadaian
              <br />
              <span className="text-amber-400">CP Sentul Yogyakarta</span>
            </h1>

            {/* Subheadline */}
            <p className="text-green-100 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Solusi keuangan terpercaya untuk kebutuhan Anda. Layanan <strong className="text-white">gadai emas</strong>, 
              <strong className="text-white"> pelunasan</strong>, <strong className="text-white">cicilan</strong>, 
              <strong className="text-white"> tabungan emas</strong>, dan berbagai layanan finansial lainnya.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="#layanan" 
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
              >
                Lihat Layanan
              </a>
              <Link 
                href="/queue" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-xl transition-all border border-white/30 backdrop-blur-sm"
              >
                <Ticket className="w-5 h-5" />
                Ambil Antrian Online
              </Link>
            </div>
          </div>

          {/* Right Content - Info Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-amber-400" />
                Informasi Cabang
              </h3>
              
              <div className="space-y-5 text-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm uppercase tracking-wide mb-1">Alamat</p>
                    <p className="text-green-200">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm uppercase tracking-wide mb-1">Jam Operasional</p>
                    <div className="space-y-1 text-green-200 text-sm">
                      <div className="flex justify-between gap-8">
                        <span>Senin - Jumat</span>
                        <span className="text-amber-400 font-medium">08:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sabtu</span>
                        <span className="text-amber-400 font-medium">08:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Minggu</span>
                        <span className="text-red-400 font-medium">Tutup</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  (0274) 375-806
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
