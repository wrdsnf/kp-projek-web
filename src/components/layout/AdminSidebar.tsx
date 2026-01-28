"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Ticket,
  BarChart3,
  ImageIcon,
  Settings,
  LogOut,
  Home,
  X,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["admin"],
  },
  {
    label: "Teller",
    href: "/dashboard/teller",
    icon: <Ticket className="w-5 h-5" />,
    roles: ["admin", "teller"],
  },
  {
    label: "Petugas Antrian",
    href: "/dashboard/petugas",
    icon: <Users className="w-5 h-5" />,
    roles: ["admin", "petugas_antrian"],
  },
  {
    label: "Laporan Harian",
    href: "/dashboard/admin/history",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["admin"],
  },
  {
    label: "Update Gambar",
    href: "/dashboard/admin/images",
    icon: <ImageIcon className="w-5 h-5" />,
    roles: ["admin"],
  },
  {
    label: "Pengaturan",
    href: "/dashboard/admin/settings",
    icon: <Settings className="w-5 h-5" />,
    roles: ["admin"],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { profile } = useAuth();

  // Filter items based on user role
  const visibleItems = sidebarItems.filter(
    (item) => !item.roles || item.roles.includes(profile?.role || "")
  );

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      auth.signOut();
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay - Blurred dark */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Glassmorphism */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 lg:top-[60px] left-0 h-screen lg:h-[calc(100vh-60px)] z-40 transition-transform duration-300 flex flex-col w-72",
          // Glassmorphism background
          "bg-white/70 backdrop-blur-md border-r border-white/30 shadow-xl shadow-emerald-900/5",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header - Mobile close button */}
        <div className="lg:hidden p-4 border-b border-emerald-100/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/30">
              {profile?.name?.[0] || "U"}
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-emerald-900 truncate">{profile?.name}</div>
              <div className="text-xs text-emerald-600 capitalize">{profile?.role}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/50 hover:bg-white/80 text-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info - Desktop */}
        <div className="hidden lg:block p-4 border-b border-emerald-100/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-500/30">
              {profile?.name?.[0] || "U"}
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-emerald-900 truncate">{profile?.name}</div>
              <div className="text-xs text-emerald-600 truncate">{profile?.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-700 border border-emerald-200/50 shadow-sm"
                    : "text-emerald-800 hover:bg-white/50 hover:text-emerald-900"
                )}
              >
                <span className={isActive ? "text-emerald-600" : "text-emerald-500"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-emerald-100/50 space-y-1.5">
          {/* Back to Homepage */}
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all text-emerald-600 hover:bg-white/50 hover:text-emerald-800"
          >
            <Home className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all text-red-500 hover:bg-red-50/80 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
