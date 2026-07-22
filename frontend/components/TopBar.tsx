'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Tag, Home, Phone, UserCircle } from 'lucide-react';

const TABS = [
  { label: 'Menu',    href: '/menu',    icon: UtensilsCrossed },
  { label: 'Offers',  href: '/offers',  icon: Tag             },
  { label: 'Home',    href: '/',         icon: Home            },
  { label: 'Contact', href: '/contact', icon: Phone           },
  { label: 'Profile', href: '/profile', icon: UserCircle      },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    /* Only visible on mobile/tablet (below md), positioned at top */
    <nav className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-[#8B0000]/10 shadow-[0_4px_20px_rgba(139,0,0,0.08)]">
      <div className="flex items-stretch h-16">
        {TABS.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative group"
            >
              {/* Active bottom bar */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#8B0000] rounded-full" />
              )}

              {/* Home tab — special crimson pill */}
              {href === '/' ? (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-[#8B0000] to-[#C8102E] text-white scale-110'
                    : 'bg-[#FFF0F0] text-[#8B0000] group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#8B0000]' : 'text-[#a09070] group-hover:text-[#8B0000]'
                }`} />
              )}

              <span className={`text-[10px] font-bold transition-colors leading-none ${
                isActive ? 'text-[#8B0000]' : 'text-[#a09070] group-hover:text-[#8B0000]'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
