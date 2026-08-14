'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard, Utensils, Table, ShoppingBag, Truck, User, SlidersHorizontal } from 'lucide-react';
import { useState, memo } from 'react';
import { useAuth } from '@/context/AuthContext';

function NavbarComponent() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home',     href: '/' },
    { name: 'About',    href: '/about' },
    { name: 'Menu',     href: '/menu' },
    { name: 'Blogs',    href: '/blog' },
    { name: 'Shops',    href: '/shops' },
    { name: 'Contact',  href: '/contact' },
  ];

  const getRoleDashboardLink = () => {
    if (!user) return { href: '/login', label: 'Login', icon: User };
    switch (user.role) {
      case 'Admin':
      case 'Manager':
        return { href: '/admin/dashboard', label: 'ERP Console', icon: LayoutDashboard };
      case 'Chef':
        return { href: '/admin/kitchen', label: 'Kitchen KDS', icon: Utensils };
      case 'Waiter':
        return { href: '/admin/tables', label: 'Tables Console', icon: Table };
      case 'Cashier':
        return { href: '/admin/orders', label: 'Cashier POS', icon: ShoppingBag };
      case 'Delivery Boy':
        return { href: '/track', label: 'Order Tracking', icon: Truck };
      case 'Customer':
        return { href: '/customer/dashboard', label: 'Customer Dashboard', icon: User };
      case 'Merchant':
        return { href: '/merchant/dashboard', label: 'Merchant Dashboard', icon: LayoutDashboard };
      default:
        return { href: '/profile', label: 'My Account', icon: User };
    }
  };

  const dashboardInfo = getRoleDashboardLink();
  const DashboardIcon = dashboardInfo.icon;

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-md border-b border-[#8B0000]/10 z-50 flex items-center px-4 md:px-8 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/royal-logo.svg"
            alt="Royal Restaurant"
            width={40}
            height={40}
            className="rounded-full bg-white shadow ring-2 ring-[#C8A055]/30 shrink-0"
            priority
          />
          <div>
            <div className="font-extrabold text-base text-[#1a1008] leading-tight whitespace-nowrap">
              Royal Restaurant
            </div>
            <div className="text-[9px] text-[#C8A055] font-bold tracking-widest uppercase">
              Good Food, Great Experience
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors pb-0.5 whitespace-nowrap ${
                  isActive
                    ? 'text-[#8B0000] border-b-2 border-[#8B0000]'
                    : 'text-[#4a3820] hover:text-[#8B0000]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              {/* Role Dashboard Link */}
              <Link
                href={dashboardInfo.href}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 btn-crimson rounded-lg text-xs font-extrabold whitespace-nowrap shadow-xs"
              >
                <DashboardIcon className="w-3.5 h-3.5" />
                <span>{dashboardInfo.label}</span>
              </Link>

              {/* User Profile Badge */}
              <div className="flex items-center gap-2 bg-[#F8F5F0] border border-[#8B0000]/15 px-2.5 py-1 rounded-lg">
                {user.avatar ? (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#C8A055]">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>
                ) : (
                  <User className="w-4 h-4 text-[#8B0000]" />
                )}
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-[#1a1008] leading-none line-clamp-1">{user.name}</span>
                  <span className="text-[9px] font-bold text-[#8B0000] leading-tight uppercase mt-0.5">{user.role}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#8B0000]/30 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-[#8B0000]/30 text-[#8B0000] rounded-lg text-xs font-bold hover:bg-[#8B0000] hover:text-white transition-all whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" /> Login
              </Link>
              <Link
                href="/register"
                className="hidden sm:flex items-center gap-1 btn-crimson px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5" /> Register
              </Link>
            </>
          )}

          {/* Frameless Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-[#8B0000] hover:text-[#a00000] hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 right-0 bg-white border-b border-[#8B0000]/10 px-6 py-6 flex flex-col gap-3 shadow-2xl z-50 max-h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top duration-200">
          {user && (
            <div className="p-3 bg-[#F8F5F0] rounded-xl flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-[#1a1008]">{user.name}</div>
                  <div className="text-[10px] text-[#8B0000] font-bold uppercase">{user.role}</div>
                </div>
              </div>
              <button onClick={logout} className="text-xs font-bold text-red-600 underline">Logout</button>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-bold py-2 border-b border-[#8B0000]/5 transition-colors ${
                pathname === link.href ? 'text-[#8B0000]' : 'text-[#4a3820] hover:text-[#8B0000]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="flex gap-3 pt-3 border-t border-[#8B0000]/10">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center border border-[#8B0000]/30 text-[#8B0000] py-2.5 rounded-xl text-xs font-bold"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center btn-crimson py-2.5 rounded-xl text-xs font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default memo(NavbarComponent);
