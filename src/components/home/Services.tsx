import { Gem, FileText, Coins, MoreHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Gem,
    title: "Gadai Emas",
    description: "Gadai emas dan perhiasan dengan proses cepat, aman, dan bunga kompetitif.",
    color: "bg-amber-500",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/produk/gadai-emas",
  },
  {
    icon: FileText,
    title: "Gadai Non-Emas",
    description: "Gadai elektronik, kendaraan, dan barang berharga lainnya dengan mudah.",
    color: "bg-emerald-600",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/produk/gadai-non-emas",
  },
  {
    icon: Coins,
    title: "Tabungan Emas",
    description: "Investasi emas terjangkau mulai Rp10.000. Aman untuk masa depan.",
    color: "bg-amber-500",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "/produk/tabungan-emas",
  },
  {
    icon: MoreHorizontal,
    title: "Jasa Lainnya",
    description: "Transfer uang, pembayaran tagihan, top up, dan layanan keuangan lainnya.",
    color: "bg-emerald-600",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    href: "/produk/jasa-lainnya",
  },
];

export default function Services() {
  return (
    <section id="layanan" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            Layanan Utama Pegadaian
          </h2>
          <p className="text-emerald-700 max-w-2xl mx-auto">
            Pegadaian hadir dengan berbagai layanan keuangan untuk memenuhi kebutuhan Anda. 
            Proses cepat, aman, dan terpercaya.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  iconColor,
  bgColor,
  href,
}: {
  icon: typeof Gem;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  bgColor: string;
  href: string;
}) {
  return (
    <Link 
      href={href}
      className="group bg-white border border-emerald-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
    >
      <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-emerald-900 mb-2">{title}</h3>
      <p className="text-emerald-700 text-sm leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
        Lihat Detail
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}


