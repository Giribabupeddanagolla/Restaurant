'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Utensils, Table, Calendar,
  Flame, Boxes, Users, UserCheck, BarChart3, Settings, ArrowLeft, Store, LogOut, X, Building2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface LinkItem {
  href: string;
  label: string;
  icon: any;
  roles?: UserRole[];
}

const ALL_LINKS: LinkItem[] = [
  { href: '/admin/dashboard',    label: 'Dashboard',      icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Merchant'] },
  { href: '/admin/merchants',    label: 'Merchants',      icon: Building2,       roles: ['Admin', 'Manager', 'Merchant'] },
  { href: '/admin/shops',        label: 'Shops & Outlets',icon: Store,           roles: ['Admin', 'Manager', 'Merchant'] },
  { href: '/admin/orders',       label: 'Orders',         icon: ShoppingBag,     roles: ['Admin', 'Manager', 'Cashier', 'Waiter', 'Chef', 'Merchant'] },
  { href: '/admin/menu',         label: 'Menu Items',     icon: Utensils,        roles: ['Admin', 'Manager', 'Chef', 'Merchant'] },
  { href: '/admin/tables',       label: 'Tables',         icon: Table,           roles: ['Admin', 'Manager', 'Waiter', 'Cashier'] },
  { href: '/admin/reservations', label: 'Reservations',   icon: Calendar,        roles: ['Admin', 'Manager', 'Waiter'] },
  { href: '/admin/kitchen',      label: 'Kitchen KDS',    icon: Flame,           roles: ['Admin', 'Manager', 'Chef'] },
  { href: '/admin/inventory',    label: 'Inventory',      icon: Boxes,           roles: ['Admin', 'Manager', 'Chef', 'Merchant'] },
  { href: '/admin/customers',    label: 'Customers',      icon: Users,           roles: ['Admin', 'Manager'] },
  { href: '/admin/employees',    label: 'Employees',      icon: UserCheck,       roles: ['Admin'] },
  { href: '/admin/reports',      label: 'Reports',        icon: BarChart3,       roles: ['Admin', 'Manager', 'Cashier', 'Merchant'] },
  { href: '/admin/settings',     label: 'Settings',       icon: Settings,        roles: ['Admin'] },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const userRole: UserRole = user?.role || 'Admin';

  const visibleLinks = ALL_LINKS.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1a1008] text-[#e5d5be]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#C8A055]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#C8102E] flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
            R
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white tracking-wide">ROYAL ERP</h2>
            <p className="text-[10px] text-[#C8A055] font-bold uppercase">{userRole} Console</p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-[#c0b090] hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Profile Card */}
      {user && (
        <div className="mx-4 mt-4 p-3 bg-white/5 border border-[#C8A055]/20 rounded-xl flex items-center justify-between">
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-extrabold text-white truncate">{user.name}</span>
            <span className="text-[10px] text-[#C8A055] font-semibold truncate">{user.email}</span>
          </div>
          <button
            onClick={logout}
            className="text-xs text-red-400 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer shrink-0"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-1">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#8B0000] to-[#C8102E] text-white font-bold shadow-md'
                  : 'text-[#c0b090] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Public */}
      <div className="p-4 border-t border-[#C8A055]/20">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2 text-xs font-bold text-[#C8A055] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Public Website
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent on md+) */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-[#C8A055]/20 shrink-0 bg-[#1a1008]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-over overlay on screens < 768px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Slide Drawer Content */}
          <aside className="relative w-72 max-w-[85vw] h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
