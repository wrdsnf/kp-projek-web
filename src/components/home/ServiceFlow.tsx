"use client";

import { useState } from "react";
import { Ticket, Search, Banknote, CheckCircle, FileCheck, CreditCard, ChevronDown } from "lucide-react";

const gadaiSteps = [
  {
    icon: Ticket,
    title: "Ambil Antrian",
    description: "Ambil nomor antrian online atau langsung di outlet",
  },
  {
    icon: Search,
    title: "Penaksiran Barang",
    description: "Petugas menaksir nilai barang jaminan Anda",
  },
  {
    icon: Banknote,
    title: "Pencairan Dana",
    description: "Dana cair langsung setelah proses selesai",
  },
  {
    icon: CheckCircle,
    title: "Selesai",
    description: "Simpan bukti gadai dengan baik",
  },
];

const nonGadaiSteps = [
  {
    icon: Ticket,
    title: "Ambil Antrian",
    description: "Ambil nomor antrian online atau langsung di outlet",
  },
  {
    icon: FileCheck,
    title: "Verifikasi Data",
    description: "Petugas memverifikasi data dan dokumen Anda",
  },
  {
    icon: CreditCard,
    title: "Pembayaran",
    description: "Lakukan pembayaran atau pelunasan",
  },
  {
    icon: CheckCircle,
    title: "Selesai",
    description: "Terima bukti transaksi Anda",
  },
];

export default function ServiceFlow() {
  const [activeTab, setActiveTab] = useState<"gadai" | "non_gadai">("gadai");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const steps = activeTab === "gadai" ? gadaiSteps : nonGadaiSteps;

  return (
    <section id="alur-layanan" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
            Panduan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Alur Layanan
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ketahui langkah-langkah mudah untuk menggunakan layanan Pegadaian
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("gadai")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "gadai"
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Banknote className="w-5 h-5" />
            Alur Gadai
          </button>
          <button
            onClick={() => setActiveTab("non_gadai")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "non_gadai"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FileCheck className="w-5 h-5" />
            Alur Non-Gadai
          </button>
        </div>

        {/* Desktop: Horizontal Steps */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-1 bg-gray-200 rounded-full">
              <div 
                className={`h-full rounded-full transition-all ${
                  activeTab === "gadai" ? "bg-amber-500" : "bg-emerald-600"
                }`}
                style={{ width: "100%" }}
              />
            </div>

            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <StepCard
                  key={index}
                  step={step}
                  index={index}
                  isGadai={activeTab === "gadai"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-3">
          {steps.map((step, index) => (
            <AccordionItem
              key={index}
              step={step}
              index={index}
              isOpen={openAccordion === index}
              onToggle={() => setOpenAccordion(openAccordion === index ? null : index)}
              isGadai={activeTab === "gadai"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ 
  step, 
  index, 
  isGadai 
}: { 
  step: typeof gadaiSteps[0]; 
  index: number;
  isGadai: boolean;
}) {
  const Icon = step.icon;
  const accentColor = isGadai ? "bg-amber-500" : "bg-emerald-600";
  const iconBg = isGadai ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Step Number */}
      <div className={`w-8 h-8 ${accentColor} text-white rounded-full flex items-center justify-center font-bold text-sm mb-4 relative z-10`}>
        {index + 1}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 w-full">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-gray-600 text-sm">{step.description}</p>
      </div>
    </div>
  );
}

function AccordionItem({ 
  step, 
  index, 
  isOpen, 
  onToggle,
  isGadai
}: { 
  step: typeof gadaiSteps[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isGadai: boolean;
}) {
  const Icon = step.icon;
  const accentColor = isGadai ? "bg-amber-500" : "bg-emerald-600";
  const iconBg = isGadai ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className={`w-8 h-8 ${accentColor} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
          {index + 1}
        </div>
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-semibold text-gray-900 flex-1">{step.title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pl-[4.5rem]">
          <p className="text-gray-600 text-sm">{step.description}</p>
        </div>
      )}
    </div>
  );
}
