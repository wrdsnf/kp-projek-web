"use client";

import { useState, useEffect } from "react";
import { getStatsHistory, generateDailyStats, saveDailyStats } from "@/lib/stats-service";
import { DailyStats } from "@/lib/types";
import { Calendar, Download, RefreshCw, BarChart3, Users, Gem, FileText, Clock } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: getDateDaysAgo(7),
    end: getTodayDate()
  });

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getStatsHistory(dateRange.start, dateRange.end);
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [dateRange]);

  const handleGenerateToday = async () => {
    setGenerating(true);
    try {
      const today = getTodayDate();
      const todayStats = await generateDailyStats(today);
      await saveDailyStats(todayStats);
      await loadStats();
      alert("Statistik hari ini berhasil dibuat!");
    } catch (error) {
      alert("Gagal membuat statistik: " + (error as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Tanggal", "Total", "Gadai", "Non-Gadai", "Manual", "Jam Sibuk"];
    const rows = stats.map(s => [
      s.date,
      s.totalCustomers,
      s.gadaiCount,
      s.nonGadaiCount,
      s.manualInputCount,
      s.peakHour || "-"
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `statistik-antrian-${dateRange.start}-${dateRange.end}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Harian</h1>
          <p className="text-gray-500">Statistik antrian per hari</p>
        </div>
        <Link 
          href="/dashboard/admin"
          className="text-emerald-600 hover:underline text-sm"
        >
          ← Kembali ke Admin
        </Link>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleGenerateToday}
          disabled={generating}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          {generating ? "Generating..." : "Generate Hari Ini"}
        </button>
        <button
          onClick={exportCSV}
          disabled={stats.length === 0}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            icon={Users}
            label="Total Nasabah"
            value={stats.reduce((sum, s) => sum + s.totalCustomers, 0)}
            color="blue"
          />
          <SummaryCard
            icon={Gem}
            label="Total Gadai"
            value={stats.reduce((sum, s) => sum + s.gadaiCount, 0)}
            color="emerald"
          />
          <SummaryCard
            icon={FileText}
            label="Total Non-Gadai"
            value={stats.reduce((sum, s) => sum + s.nonGadaiCount, 0)}
            color="purple"
          />
          <SummaryCard
            icon={Clock}
            label="Manual Input"
            value={stats.reduce((sum, s) => sum + s.manualInputCount, 0)}
            color="amber"
          />
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-gray-800">Data Harian</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : stats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>Tidak ada data untuk periode ini</p>
            <p className="text-sm mt-1">Klik "Generate Hari Ini" untuk membuat statistik</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Tanggal</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Gadai</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Non-Gadai</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Manual</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Jam Sibuk</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.date} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{formatDate(stat.date)}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-900">{stat.totalCustomers}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {stat.gadaiCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {stat.nonGadaiCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        {stat.manualInputCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {stat.peakHour || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: typeof Users; 
  label: string; 
  value: number;
  color: 'blue' | 'emerald' | 'purple' | 'amber';
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600"
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getDateDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}
