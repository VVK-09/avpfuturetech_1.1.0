"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Camera, 
  Layers, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import AdminLogin from "./AdminLogin";
import HomeOverviewTab from "./HomeOverviewTab";
import HomeInquiriesDesk from "./HomeInquiriesDesk";
import HomeGalleryManager from "./HomeGalleryManager";

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "gallery">("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error"; isVisible: boolean }>({
    message: "",
    type: "info",
    isVisible: false
  });

  // Check saved session
  useEffect(() => {
    try {
      const session = localStorage.getItem("avp_home_admin_session");
      if (session) {
        setAdminUser(JSON.parse(session));
      }
    } catch {}
  }, []);

  const showToast = (message: string, type: "success" | "info" | "error" = "info") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3500);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("avp_home_admin_session");
    } catch {}
    setAdminUser(null);
  };

  // If not logged in, render dedicated Admin Login
  if (!adminUser) {
    return <AdminLogin onLoginSuccess={(session) => setAdminUser(session)} />;
  }

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "inquiries", label: "Inquiries & Leads Desk", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "gallery", label: "Photo Gallery Manager", icon: <Camera className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#1E63D6] selection:text-white">
      {/* Toast Notification */}
      {toast.isVisible && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold border ${
              toast.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : toast.type === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-blue-50 text-blue-800 border-blue-200"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#0B1E3D] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-36 sm:w-44">
              <Image
                src={SITE_CONFIG.logos.white}
                alt="AVP FutureTech Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/20 text-xs">
            <span className="font-bold text-white tracking-wide">Operations Console</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#38BDF8] text-[#0B1E3D]">
              Home Site
            </span>
          </div>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-white block">{adminUser.name}</span>
            <span className="text-[11px] text-[#93C5FD] block">{adminUser.email}</span>
          </div>

          <Link
            href="/internship"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Internship Portal</span>
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-semibold text-white transition-all inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
            title="Log out from console"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout with Sidebar */}
      <div className="flex-1 flex min-h-[calc(100vh-65px)]">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E2E8F0] p-5 flex flex-col justify-between transform transition-transform duration-200 md:static md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0 top-[57px]" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Main Site Console
              </span>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#DCEBFF] text-[#1E63D6] shadow-xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1E3D]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#1E63D6]" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Switch to Internship Admin Section */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Other Modules
              </span>
              <Link
                href="/internship"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-[#0B1E3D] transition-all"
              >
                <GraduationCap className="w-4 h-4 text-[#1E63D6]" />
                <span>Internship Exam Desk</span>
              </Link>
            </div>
          </div>

          {/* Admin Profile Footer in Sidebar */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-white flex items-center justify-center font-extrabold text-sm">
              {adminUser.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#0B1E3D] block truncate">
                {adminUser.name}
              </span>
              <span className="text-[11px] text-slate-500 block truncate">
                {adminUser.role}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-5 sm:p-8 max-w-7xl mx-auto w-full">
          {activeTab === "overview" && (
            <HomeOverviewTab
              adminUser={adminUser}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
            />
          )}

          {activeTab === "inquiries" && (
            <HomeInquiriesDesk onShowToast={showToast} />
          )}

          {activeTab === "gallery" && (
            <HomeGalleryManager onShowToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}
