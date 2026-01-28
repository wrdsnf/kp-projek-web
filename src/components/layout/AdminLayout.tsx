"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import GlobalNavbar from "./GlobalNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          Memuat dashboard...
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar with hamburger for mobile */}
      <GlobalNavbar 
        variant="light" 
        showMenuButton={true}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar - controlled by state */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-60px)] w-full">
          {/* Content area with proper mobile padding */}
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 mt-8">
            <div className="text-center text-gray-400 text-sm px-4">
              Pegadaian CP Sentul Yogyakarta - Dashboard Internal
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
