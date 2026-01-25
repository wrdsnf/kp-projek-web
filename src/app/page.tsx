import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30">
              <span className="text-amber-400 text-sm font-medium">🏆 Melayani Sejak 1901</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Pegadaian<br/>
              <span className="text-amber-400">Sentul Yogyakarta</span>
            </h1>
            <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
              Mengatasi Masalah Tanpa Masalah. Solusi keuangan terpercaya untuk masyarakat Indonesia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link 
                href="/queue" 
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
              >
                <span className="text-2xl">🎫</span>
                AMBIL NOMOR ANTRIAN
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-xl transition-all border border-white/20"
              >
                Login Pegawai
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Pegadaian Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Tentang Pegadaian</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              PT Pegadaian adalah BUMN yang bergerak di bidang jasa keuangan non-bank dengan fokus pada gadai dan pembiayaan mikro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🏛️"
              title="Sejarah Panjang"
              description="Berdiri sejak tahun 1901 di Sukabumi, Pegadaian telah melayani masyarakat Indonesia selama lebih dari 120 tahun."
            />
            <FeatureCard 
              icon="🤝"
              title="Terpercaya"
              description="Sebagai BUMN, Pegadaian menjamin keamanan dan transparansi dalam setiap transaksi keuangan nasabah."
            />
            <FeatureCard 
              icon="🌍"
              title="Jangkauan Luas"
              description="Dengan ribuan outlet di seluruh Indonesia, kami hadir dekat dengan masyarakat yang membutuhkan."
            />
          </div>
        </div>
      </section>

      {/* Aplikasi Tring Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-700 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-amber-500 text-green-900 text-sm font-bold rounded-full">
                APLIKASI MOBILE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pegadaian Digital - <span className="text-amber-400">Tring!</span>
              </h2>
              <p className="text-green-100 text-lg">
                Nikmati kemudahan layanan Pegadaian langsung dari smartphone Anda. 
                Gadai online, tabungan emas, pembayaran tagihan, dan masih banyak lagi!
              </p>
              <ul className="space-y-3 text-green-100">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm">✓</span>
                  Gadai online tanpa antri
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm">✓</span>
                  Tabungan emas mulai Rp10.000
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm">✓</span>
                  Pembayaran tagihan & top up
                </li>
              </ul>
              <a 
                href="https://www.pegadaian.co.id/produk/pegadaian-digital" 
                target="_blank"
                className="inline-block bg-white text-green-800 font-bold py-3 px-6 rounded-lg hover:bg-amber-100 transition-colors"
              >
                Download Aplikasi →
              </a>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-64 h-[500px] bg-gradient-to-b from-green-600 to-green-700 rounded-[3rem] border-4 border-green-500 shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold text-amber-400">Tring!</div>
                  <div className="text-sm text-green-200">Pegadaian Digital</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CP Sentul Yogyakarta Section */}
      <section className="bg-amber-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
                <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Informasi Outlet
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <span className="font-medium text-gray-800">Alamat:</span><br/>
                    Jl. Sentul Raya No. 123, Sentul, Yogyakarta
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Telepon:</span><br/>
                    (0274) 123-4567
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Jam Operasional:</span><br/>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>Senin - Jumat</div><div className="text-green-700 font-medium">08:00 - 15:00</div>
                      <div>Sabtu</div><div className="text-green-700 font-medium">08:00 - 12:00</div>
                      <div>Minggu</div><div className="text-red-500 font-medium">Tutup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                CP Sentul <span className="text-amber-600">Yogyakarta</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Pegadaian Cabang Pembantu Sentul Yogyakarta hadir untuk melayani kebutuhan finansial 
                masyarakat di wilayah Sentul dan sekitarnya dengan pelayanan prima dan profesional.
              </p>
              <div className="space-y-3">
                <ServiceItem icon="💰" text="Gadai Emas & Elektronik" />
                <ServiceItem icon="📈" text="Tabungan Emas" />
                <ServiceItem icon="💳" text="Pembiayaan UMKM" />
                <ServiceItem icon="🧾" text="Pembayaran Tagihan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Bertransaksi?
          </h2>
          <p className="text-green-200 text-lg mb-8">
            Ambil nomor antrian online sekarang dan hindari antri panjang di outlet!
          </p>
          <Link 
            href="/queue" 
            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-5 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            <span className="text-3xl">🎫</span>
            AMBIL ANTRIAN SEKARANG
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-green-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pegadaian CP Sentul Yogyakarta. All rights reserved.</p>
          <p className="mt-2 text-green-600">Bagian dari PT Pegadaian (Persero)</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ServiceItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-amber-200">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
}
