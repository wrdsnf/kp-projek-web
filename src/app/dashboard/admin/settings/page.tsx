"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getTringSettings, updateTringSettings, TringAppSettings } from "@/lib/tring-service";
import { ArrowLeft, Save, Loader2, Check, Smartphone } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const { profile } = useAuth();
  const [settings, setSettings] = useState<TringAppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [referralCode, setReferralCode] = useState("");
  const [appStoreUrl, setAppStoreUrl] = useState("");
  const [playStoreUrl, setPlayStoreUrl] = useState("");

  // Load initial settings
  useEffect(() => {
    getTringSettings().then((data) => {
      setSettings(data);
      setReferralCode(data.referralCode);
      setAppStoreUrl(data.appStoreUrl);
      setPlayStoreUrl(data.playStoreUrl);
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
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Link 
            href="/dashboard/admin" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan Aplikasi Tring</h1>
        </div>
        <p className="text-gray-500 ml-11">
          Konfigurasi informasi yang tampil di homepage untuk Aplikasi Tring
        </p>
      </header>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Kode Referral Tring</h2>
                <p className="text-sm text-gray-500">Kode ini akan tampil di homepage</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Referral <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Contoh: 13554"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-mono tracking-wider"
                maxLength={20}
              />
              <p className="text-xs text-gray-400 mt-1">
                Kode ini akan ditampilkan kepada pengguna untuk digunakan saat mendaftar
              </p>
            </div>

            {/* App Store URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link App Store (iOS)
              </label>
              <input
                type="url"
                value={appStoreUrl}
                onChange={(e) => setAppStoreUrl(e.target.value)}
                placeholder="https://apps.apple.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
            </div>

            {/* Play Store URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Play Store (Android)
              </label>
              <input
                type="url"
                value={playStoreUrl}
                onChange={(e) => setPlayStoreUrl(e.target.value)}
                placeholder="https://play.google.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                Berhasil diperbarui! Perubahan akan langsung tampil di homepage.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 bg-green-800 rounded-xl">
          <p className="text-green-200 text-sm mb-2">Preview di Homepage:</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-green-200 text-sm mb-2">Kode Referral</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-amber-400 tracking-wider">
                {referralCode || "---"}
              </span>
              <span className="text-green-300 text-sm">(Gunakan saat daftar)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
