'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Menu, ShieldCheck } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar Component handling desktop & mobile drawer */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <header className="h-16 bg-white border-b border-[#8B0000]/10 px-4 md:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile screens (<768px) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="font-extrabold text-xs md:text-sm text-[#1a1008] uppercase tracking-wider truncate">
              Giri ERP Management Console
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">System</span> Online
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
