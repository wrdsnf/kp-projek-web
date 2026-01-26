import { Gem, FileText, Coins, MoreHorizontal } from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "Gadai",
    description: "Gadai emas, perhiasan, elektronik, dan barang berharga lainnya dengan proses cepat dan aman.",
    color: "bg-amber-500",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    href: "#alur-layanan",
  },
  {
    icon: FileText,
    title: "Non-Gadai",
    description: "Layanan pelunasan, perpanjangan, cicilan, dan pembayaran tagihan dengan mudah.",
    color: "bg-green-600",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    href: "#alur-layanan",
  },
  {
    icon: Coins,
    title: "Tabungan Emas",
    description: "Nabung emas mulai dari Rp10.000. Investasi aman untuk masa depan Anda.",
    color: "bg-yellow-500",
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    href: "#investasi-emas",
  },
  {
    icon: MoreHorizontal,
    title: "Layanan Lainnya",
    description: "Pembiayaan UMKM, transfer uang, pembayaran tagihan, top up, dan layanan keuangan lainnya.",
    color: "bg-blue-500",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "#aplikasi-mobile",
  },
];

export default function Services() {
  return (
    <section id="layanan" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layanan Utama Pegadaian
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
    <a 
      href={href}
      className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
    >
      <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </a>
  );
}

