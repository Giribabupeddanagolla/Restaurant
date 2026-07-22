'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, LogIn, UserPlus, ShoppingBag } from 'lucide-react';
import { useState, memo } from 'react';
import { useCart } from '@/context/CartContext';

function NavbarComponent() {
  const pathname     = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const navLinks = [
    { name: 'Home',           href: '/' },
    { name: 'Menu',           href: '/menu' },
    { name: 'Blog',           href: '/blog' },
    { name: 'Offers & Deals', href: '/offers' },
    { name: 'About Us',       href: '/about' },
    { name: 'Contact',        href: '/contact' },
  ];

  return (
    /* On mobile: shows logo + brand + cart only. Nav links handled by BottomBar. */
    <header className="flex fixed top-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-md border-b border-[#8B0000]/10 z-50 items-center px-4 md:px-8 shadow-sm">
      <div className="w-full mx-auto flex items-center justify-between gap-2">

        {/* Brand — always visible */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/giri-logo.svg"
            alt="Giri Restaurant"
            width={44}
            height={44}
            className="rounded-full bg-white shadow ring-2 ring-[#C8A055]/30 shrink-0"
            priority
          />
          <div>
            <div className="font-extrabold text-base text-[#1a1008] leading-tight whitespace-nowrap">
              Giri Restaurant
            </div>
            <div className="text-[9px] text-[#C8A055] font-bold tracking-widest uppercase">
              Good Food, Great Experience
            </div>
          </div>
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
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

        {/* CTAs */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Cart — always visible */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 border border-[#8B0000]/20 text-[#8B0000] rounded-lg text-xs font-bold hover:bg-[#8B0000] hover:text-white transition-all"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8B0000] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Login / Register — md+ only */}
          <Link
            href="/login"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 border border-[#8B0000]/30 text-[#8B0000] rounded-lg text-xs font-bold hover:bg-[#8B0000] hover:text-white transition-all whitespace-nowrap"
          >
            <LogIn className="w-3.5 h-3.5" /> Login
          </Link>
          <Link
            href="/register"
            className="hidden md:flex items-center gap-1 btn-crimson px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" /> Register
          </Link>

          {/* Hamburger — lg nav hidden, show only on md–lg range */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden md:flex lg:hidden text-[#8B0000] p-1.5 ml-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 right-0 bg-white border-b border-[#8B0000]/10 px-4 py-5 flex flex-col gap-4 shadow-xl z-50 max-h-[calc(100vh-64px)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-base font-semibold py-1 transition-colors border-b border-[#8B0000]/5 last:border-0 ${
                pathname === link.href ? 'text-[#8B0000]' : 'text-[#4a3820]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center border border-[#8B0000]/30 text-[#8B0000] py-2.5 rounded-xl text-sm font-bold"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center btn-crimson py-2.5 rounded-xl text-sm font-bold"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(NavbarComponent);
