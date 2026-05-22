"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ImagePlus,
  Settings,
  MessageSquare,
  LogOut,
  Palette,
  ChevronLeft,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import ArtworkManager from "./ArtworkManager";
import TestimonialManager from "./TestimonialManager";
import SettingsPanel from "./SettingsPanel";
import DashboardOverview from "./DashboardOverview";

type Tab = "overview" | "artworks" | "testimonials" | "settings";

export default function AdminDashboard() {
  const { adminLogout } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "overview" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "artworks" as Tab, label: "Artworks", icon: ImagePlus },
    { id: "testimonials" as Tab, label: "Testimonials", icon: MessageSquare },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 admin-sidebar sweet-admin flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sidebar-pink rounded-full flex items-center justify-center">
              <Palette size={20} className="text-white" />
            </div>
            <div>
              <span
                className="text-lg text-ivory tracking-wider"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Diksha
              </span>
              <span className="block text-[0.55rem] text-ivory/40 tracking-widest uppercase -mt-0.5">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all rounded ${
                  activeTab === tab.id
                    ? "bg-rose/20 text-rose-light font-medium"
                    : "text-ivory/60 hover:text-ivory hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ivory/50 hover:text-ivory hover:bg-white/5 transition-all rounded"
          >
            <ChevronLeft size={18} />
            Back to Site
          </Link>
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error/70 hover:text-error hover:bg-error/5 transition-all rounded"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen admin-content">
        {/* Top Bar */}
        <header className="h-16 border-b border-subtle flex items-center justify-between px-4 sm:px-6 surface-primary sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-muted hover:text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2
              className="text-lg sm:text-xl text-primary capitalize"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeTab === "overview" ? "Dashboard" : activeTab}
            </h2>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {activeTab === "overview" && <DashboardOverview onNavigate={setActiveTab} />}
          {activeTab === "artworks" && <ArtworkManager />}
          {activeTab === "testimonials" && <TestimonialManager />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}
