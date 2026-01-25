import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-green-700 transition-colors">
          &larr; <span className="ml-2">Kembali ke Beranda</span>
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Tentang Pegadaian CP Sentul</h1>
          <p className="text-gray-600 leading-relaxed">
            Pegadaian CP Sentul berkomitmen memberikan pelayanan terbaik bagi nasabah di wilayah Sentul City dan sekitarnya. 
            Kami hadir dengan solusi keuangan yang cepat, mudah, dan aman.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Layanan Kami</h2>
          <ul className="space-y-3">
            <Feature title="Gadai Emas & Elektronik" desc="Solusi dana cepat dengan agunan barang berharga Anda." />
            <Feature title="Pembiayaan Usaha" desc="Modal usaha untuk mengembangkan bisnis UMKM." />
            <Feature title="Tabungan Emas" desc="Investasi emas aman dan terjangkau mulai dari 0.01 gram." />
            <Feature title="Pembayaran & Top Up" desc="Bayar tagihan listrik, air, BPJS, dan pulsa." />
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Jam Operasional</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
             <div>
                <p className="font-bold text-gray-700">Senin - Jumat</p>
                <p className="text-gray-600">08:00 - 15:00 WIB</p>
             </div>
             <div>
                <p className="font-bold text-gray-700">Sabtu</p>
                <p className="text-gray-600">08:00 - 12:00 WIB</p>
             </div>
             <div className="col-span-2">
                <p className="font-bold text-red-500">Minggu & Libur Nasional</p>
                <p className="text-gray-600">Tutup</p>
             </div>
          </div>
        </div>

        <div className="space-y-2">
           <h2 className="text-xl font-bold text-gray-800">Hubungi Kami</h2>
           <p className="text-gray-600">
             Jl. MH. Thamrin, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810
           </p>
           <p className="text-green-700 font-medium">Telp: (021) 8795xxxx</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex gap-4 items-start">
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
         <div className="w-2 h-2 rounded-full bg-green-600" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </li>
  );
}
