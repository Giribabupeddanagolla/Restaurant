import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F5F0] border-t border-[#C8A055]/30 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <hr className="border-none h-px bg-gradient-to-r from-transparent via-[#C8A055]/50 to-transparent mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/giri-logo.svg" alt="Giri Restaurant" width={40} height={40} className="rounded-full bg-white p-0.5 shadow ring-1 ring-[#C8A055]/30 shrink-0" />
              <span className="font-extrabold text-lg text-[#1a1008]">Giri Restaurant</span>
            </div>
            <p className="text-sm text-[#6b5840] leading-relaxed mb-4">
              Good Food, Great Experience — artisanal dining with farm-fresh ingredients.
            </p>
            <div className="flex gap-4 text-[#8B0000]">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#C8A055] transition-colors" />
              <Facebook  className="w-5 h-5 cursor-pointer hover:text-[#C8A055] transition-colors" />
              <Twitter   className="w-5 h-5 cursor-pointer hover:text-[#C8A055] transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-[#1a1008] text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#8B0000] rounded-full inline-block" /> Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#6b5840]">
              {[
                { label: 'Our Menu',     href: '/menu' },
                { label: 'Blog',         href: '/blog' },
                { label: 'Promo Offers', href: '/offers' },
                { label: 'About Us',     href: '/about' },
                { label: 'Contact',      href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#8B0000] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-extrabold text-[#1a1008] text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#8B0000] rounded-full inline-block" /> Opening Hours
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#6b5840]">
              <li><span className="font-medium text-[#1a1008]">Mon – Thu</span><br />11:30 AM – 10:30 PM</li>
              <li><span className="font-medium text-[#1a1008]">Fri – Sat</span><br />11:30 AM – 11:30 PM</li>
              <li><span className="font-medium text-[#1a1008]">Sunday</span><br />12:00 PM – 10:00 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-extrabold text-[#1a1008] text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#8B0000] rounded-full inline-block" /> Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[#6b5840]">
              <p>📍 742 Culinary Blvd, Suite 100</p>
              <p>📞 +1 (555) 987-6543</p>
              <p>✉️ info@girirestaurant.com</p>
            </div>
            <Link href="/contact" className="mt-3 inline-block btn-primary text-xs px-4 py-2 rounded-lg font-bold">
              Send a Message
            </Link>
          </div>
        </div>

        <hr className="border-none h-px bg-gradient-to-r from-transparent via-[#C8A055]/30 to-transparent mb-5" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#a09070] gap-3">
          <p>© {new Date().getFullYear()} Giri Restaurant. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/terms"   className="hover:text-[#8B0000] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#8B0000] transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
