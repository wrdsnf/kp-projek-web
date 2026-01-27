"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem, Laptop, Coins, Landmark, Wallet, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Complete product list for all usages
const allProducts = [
  {
    id: "gadai-emas",
    name: "Gadai Emas",
    shortName: "Gadai Emas",
    description: "Gadai emas dan perhiasan dengan proses cepat, aman, dan bunga kompetitif.",
    icon: Gem,
    href: "/produk/gadai-emas",
    category: "gadai",
  },
  {
    id: "gadai-non-emas",
    name: "Gadai Non-Emas",
    shortName: "Non-Emas",
    description: "Gadai elektronik, kendaraan, dan barang berharga lainnya dengan mudah.",
    icon: Laptop,
    href: "/produk/gadai-non-emas",
    category: "gadai",
  },
  {
    id: "tabungan-emas",
    name: "Tabungan Emas",
    shortName: "Tabungan",
    description: "Investasi emas terjangkau mulai Rp10.000. Aman untuk masa depan.",
    icon: Coins,
    href: "/produk/tabungan-emas",
    category: "investasi",
  },
  {
    id: "pembiayaan",
    name: "Pembiayaan",
    shortName: "Pembiayaan",
    description: "Pinjaman dengan cicilan ringan: KREASI, KRASIDA, Amanah, dan Rahn Syariah.",
    icon: Landmark,
    href: "/produk/pembiayaan",
    category: "pembiayaan",
  },
  {
    id: "jasa-lainnya",
    name: "Jasa Lainnya",
    shortName: "Jasa Lain",
    description: "Transfer uang, pembayaran tagihan, top up, dan layanan keuangan lainnya.",
    icon: Wallet,
    href: "/produk/jasa-lainnya",
    category: "jasa",
  },
];

export { allProducts };

// Unified Products & Services Section for Homepage
export function ProductsServicesSection() {
  return (
    <section id="produk" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
            Produk Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produk & Layanan Pegadaian
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai solusi keuangan untuk memenuhi kebutuhan Anda. Proses cepat, aman, dan terpercaya.
          </p>
        </div>

        {/* Category Groups */}
        <div className="space-y-10">
          {/* Gadai */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-green-500"></span>
              Gadai
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allProducts.filter(p => p.category === "gadai").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Pembiayaan & Investasi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-green-500"></span>
              Pembiayaan & Investasi
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allProducts.filter(p => p.category === "pembiayaan" || p.category === "investasi").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Jasa Keuangan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-green-500"></span>
              Jasa Keuangan
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {allProducts.filter(p => p.category === "jasa").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof allProducts[0] }) {
  return (
    <Link
      href={product.href}
      className="group flex items-start gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-green-200 rounded-xl hover:shadow-lg transition-all"
    >
      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
        <product.icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 mb-1">{product.name}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Lihat Detail <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}

// Simple Product Nav for product pages
export default function ProductNav() {
  const pathname = usePathname();
  const currentProduct = allProducts.find(p => pathname.includes(p.id));

  return (
    <section className="bg-gray-100 py-8 md:py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
          Produk Lainnya
        </h3>
        
        {/* Desktop: horizontal grid */}
        <div className="hidden md:grid grid-cols-5 gap-3">
          {allProducts.map((product) => {
            const isActive = currentProduct?.id === product.id;
            return (
              <Link
                key={product.id}
                href={product.href}
                className={cn(
                  "flex flex-col items-center py-4 px-3 rounded-xl transition-all text-center",
                  isActive 
                    ? "bg-green-600 text-white shadow-md" 
                    : "bg-white hover:bg-gray-50 text-gray-700 hover:shadow-sm border border-gray-200"
                )}
              >
                <product.icon className={cn("w-6 h-6 mb-2", isActive ? "text-white" : "text-gray-500")} />
                <span className="text-sm font-medium">{product.shortName}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-3 min-w-max">
            {allProducts.map((product) => {
              const isActive = currentProduct?.id === product.id;
              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className={cn(
                    "flex items-center gap-2 py-3 px-4 rounded-full transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-green-600 text-white shadow-md" 
                      : "bg-white text-gray-700 border border-gray-200"
                  )}
                >
                  <product.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-500")} />
                  <span className="text-sm font-medium">{product.shortName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
