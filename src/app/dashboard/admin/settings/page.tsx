"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getTringSettings, updateTringSettings, TringAppSettings } from "@/lib/tring-service";
import { ArrowLeft, Save, Loader2, Check, Smartphone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const { profile } = useAuth();
  const [settings, setSettings] = useState<TringAppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state - Tring
  const [referralCode, setReferralCode] = useState("");
  const [appStoreUrl, setAppStoreUrl] = useState("");
  const [playStoreUrl, setPlayStoreUrl] = useState("");
  
  // Form state - WhatsApp
  const [whatsappNumberPrimary, setWhatsappNumberPrimary] = useState("");
  const [whatsappNumberSecondary, setWhatsappNumberSecondary] = useState("");
  const [whatsappLinkPrimary, setWhatsappLinkPrimary] = useState("");
  const [whatsappLinkSecondary, setWhatsappLinkSecondary] = useState("");
  const [whatsappNamePrimary, setWhatsappNamePrimary] = useState("");
  const [whatsappNameSecondary, setWhatsappNameSecondary] = useState("");

  // Load initial settings
  useEffect(() => {
    getTringSettings().then((data) => {
      setSettings(data);
      setReferralCode(data.referralCode);
      setAppStoreUrl(data.appStoreUrl);
      setPlayStoreUrl(data.playStoreUrl);
      setWhatsappNumberPrimary(data.whatsappNumberPrimary);
      setWhatsappNumberSecondary(data.whatsappNumberSecondary);
      setWhatsappLinkPrimary(data.whatsappLinkPrimary);
      setWhatsappLinkSecondary(data.whatsappLinkSecondary);
      setWhatsappNamePrimary(data.whatsappNamePrimary);
      setWhatsappNameSecondary(data.whatsappNameSecondary);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    // Validation
    if (!referralCode.trim()) {
      setError("Kode referral tidak boleh kosong");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateTringSettings(
        {
          referralCode: referralCode.trim(),
          appStoreUrl: appStoreUrl.trim() || settings?.appStoreUrl || "",
          playStoreUrl: playStoreUrl.trim() || settings?.playStoreUrl || "",
          whatsappNumberPrimary: whatsappNumberPrimary.trim() || settings?.whatsappNumberPrimary || "",
          whatsappNumberSecondary: whatsappNumberSecondary.trim() || settings?.whatsappNumberSecondary || "",
          whatsappLinkPrimary: whatsappLinkPrimary.trim() || settings?.whatsappLinkPrimary || "",
          whatsappLinkSecondary: whatsappLinkSecondary.trim() || settings?.whatsappLinkSecondary || "",
          whatsappNamePrimary: whatsappNamePrimary.trim() || settings?.whatsappNamePrimary || "",
          whatsappNameSecondary: whatsappNameSecondary.trim() || settings?.whatsappNameSecondary || "",
        },
        profile?.uid || ""
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Gagal menyimpan pengaturan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Link 
            href="/dashboard/admin" 
            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-700" />
          </Link>
          <h1 className="text-2xl font-bold text-emerald-900">Pengaturan Aplikasi</h1>
        </div>
        <p className="text-emerald-600 ml-11">
          Konfigurasi informasi yang tampil di homepage
        </p>
      </header>

      <div className="max-w-2xl space-y-6">
        {/* Tring Settings Card */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-emerald-100 bg-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-emerald-900">Aplikasi Tring</h2>
                <p className="text-sm text-emerald-600">Kode referral dan link download</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Kode Referral <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Contoh: 13554"
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-mono tracking-wider"
                maxLength={20}
              />
            </div>

            {/* App Store URL */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Link App Store (iOS)
              </label>
              <input
                type="url"
                value={appStoreUrl}
                onChange={(e) => setAppStoreUrl(e.target.value)}
                placeholder="https://apps.apple.com/..."
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Play Store URL */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Link Play Store (Android)
              </label>
              <input
                type="url"
                value={playStoreUrl}
                onChange={(e) => setPlayStoreUrl(e.target.value)}
                placeholder="https://play.google.com/..."
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Settings Card */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-emerald-100 bg-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-emerald-900">Kontak WhatsApp</h2>
                <p className="text-sm text-emerald-600">Nomor dan link WhatsApp di halaman Investasi Emas</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Primary Contact Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-emerald-800 border-b border-emerald-100 pb-2">Kontak Utama</h3>
              
              {/* Primary Name */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Nama Kontak Utama
                </label>
                <input
                  type="text"
                  value={whatsappNamePrimary}
                  onChange={(e) => setWhatsappNamePrimary(e.target.value)}
                  placeholder="Contoh: Yunita"
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              {/* Primary Number */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Nomor WhatsApp Utama
                </label>
                <input
                  type="text"
                  value={whatsappNumberPrimary}
                  onChange={(e) => setWhatsappNumberPrimary(e.target.value.replace(/\D/g, ""))}
                  placeholder="Contoh: 62895413310250"
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono"
                />
                <p className="text-xs text-emerald-500 mt-1">Format: awali dengan 62 (tanpa tanda +)</p>
              </div>

              {/* Primary Link */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Link WhatsApp Utama
                </label>
                <input
                  type="url"
                  value={whatsappLinkPrimary}
                  onChange={(e) => setWhatsappLinkPrimary(e.target.value)}
                  placeholder="https://wa.me/62895413310250?text=..."
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Secondary Contact Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-emerald-800 border-b border-emerald-100 pb-2">Kontak Cadangan</h3>
              
              {/* Secondary Name */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Nama Kontak Cadangan
                </label>
                <input
                  type="text"
                  value={whatsappNameSecondary}
                  onChange={(e) => setWhatsappNameSecondary(e.target.value)}
                  placeholder="Contoh: Tohir"
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              {/* Secondary Number */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Nomor WhatsApp Cadangan
                </label>
                <input
                  type="text"
                  value={whatsappNumberSecondary}
                  onChange={(e) => setWhatsappNumberSecondary(e.target.value.replace(/\D/g, ""))}
                  placeholder="Contoh: 6287717657945"
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono"
                />
              </div>

              {/* Secondary Link */}
              <div>
                <label className="block text-sm font-medium text-emerald-800 mb-2">
                  Link WhatsApp Cadangan
                </label>
                <input
                  type="url"
                  value={whatsappLinkSecondary}
                  onChange={(e) => setWhatsappLinkSecondary(e.target.value)}
                  placeholder="https://wa.me/6287717657945?text=..."
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            Berhasil diperbarui! Perubahan akan langsung tampil di homepage.
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Semua Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

