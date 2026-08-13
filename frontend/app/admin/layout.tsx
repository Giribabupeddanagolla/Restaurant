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
        <header className="h-12 bg-[#1a1008] border-b border-[#C8A055]/20 px-4 md:px-6 flex items-center justify-between shadow-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile screens (<768px) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-lg bg-white/10 border border-[#C8A055]/30 text-white hover:bg-[#8B0000] transition-all cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <h1 className="font-extrabold text-xs text-[#E0B96A] uppercase tracking-wider truncate">
              Giri ERP Management Console
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">System</span> Online
            </span>
          </div>
        </header>

        <main className="flex-1 p-3 md:p-5 overflow-y-auto no-scrollbar w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
