'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  ShoppingBag,
  Heart,
  Award,
  Truck,
  Calendar,
  Tag,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Plus,
  CheckCircle2,
  RefreshCw,
  Utensils
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface CustomerOrder {
  id: string;
  outlet: string;
  itemsCount: number;
  itemsSummary: string;
  totalAmount: number;
  status: 'In Transit' | 'Preparing' | 'Delivered' | 'Cancelled';
  date: string;
  eta?: string;
}

export default function CustomerDashboardPage() {
  const { user, logout, switchRole } = useAuth();

  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([
    {
      id: 'ORD-8821',
      outlet: 'Giri Grill & Smokehouse',
      itemsCount: 3,
      itemsSummary: '1x Smoked Wagyu Burger, 2x BBQ Wings',
      totalAmount: 1450,
      status: 'In Transit',
      date: 'Today, 12:20 PM',
      eta: '12 mins',
    },
    {
      id: 'ORD-8790',
      outlet: 'Giri Bakery & Confectionery',
      itemsCount: 2,
      itemsSummary: '1x Dutch Dark Chocolate Cake, 1x Berry Tart',
      totalAmount: 890,
      status: 'Delivered',
      date: 'Yesterday, 4:15 PM',
    },
    {
      id: 'ORD-8642',
      outlet: 'Giri Coastal Seafood',
      itemsCount: 4,
      itemsSummary: '1x Norwegian Salmon Steak, 2x Garlic Butter Rice',
      totalAmount: 2150,
      status: 'Delivered',
      date: '12 Aug 2026',
    },
  ]);

  const favorites = [
    { id: 'fav-1', name: 'Signature Dutch Dark Chocolate Cake', outlet: 'Giri Bakery', price: 650, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&auto=format&fit=crop&q=80' },
    { id: 'fav-2', name: 'Smoked Wagyu Beef Burger', outlet: 'Giri Grill', price: 580, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&auto=format&fit=crop&q=80' },
    { id: 'fav-3', name: 'Norwegian Salmon Steak', outlet: 'Giri Seafood', price: 890, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-8 pb-24 text-[#1a1008]">

      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-6 bg-white border border-[#8B0000]/15 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="relative w-20 h-20 rounded-full bg-white shadow-md ring-4 ring-[#C8A055]/30 overflow-hidden shrink-0">
            {user?.avatar ? (
              <Image src={user.avatar} alt={user.name || 'Customer'} fill className="object-cover" />
            ) : (
              <Image src="/giri-logo.svg" alt="Giri Restaurant" width={80} height={80} className="rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-[#1a1008]">{user?.name || 'Valued Guest Diner'}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C8A055]/15 border border-[#C8A055]/40 text-[#8B0000] text-[10px] font-extrabold uppercase">
                <Sparkles className="w-3 h-3 text-[#C8A055]" /> Giri Gold Diner
              </span>
            </div>
            <p className="text-xs text-[#6b5840] mt-1 font-medium">
              {user?.email || 'customer@girirestaurant.com'} • {user?.phone || '+91 98765 43210'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/menu"
            className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs hover:shadow-md"
          >
            <Utensils className="w-4 h-4" /> Order Food Now
          </Link>
          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Active Order</span>
            <h3 className="text-xl font-extrabold text-[#8B0000]">1 In Delivery</h3>
            <Link href="/track" className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 mt-0.5">
              <Truck className="w-3 h-3" /> Live Track (ETA 12m)
            </Link>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Loyalty Wallet</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">540 Points</h3>
            <span className="text-[10px] font-bold text-emerald-600">₹540.00 Redeemable</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Total Orders</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">18 Orders</h3>
            <span className="text-[10px] font-bold text-purple-600">Lifetime Orders</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Saved Favorites</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">12 Dishes</h3>
            <span className="text-[10px] font-bold text-rose-600">Quick 1-Click Reorder</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Role Switcher Test Bar */}
      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-2">
        <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block font-mono flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" /> Switch Active Account Role:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { r: 'Admin' as UserRole, icon: '👑', label: 'Admin ERP Console' },
            { r: 'Manager' as UserRole, icon: '👔', label: 'Manager Console' },
            { r: 'Customer' as UserRole, icon: '👤', label: 'Customer Dashboard' }
          ].map((item) => (
            <button
              key={item.r}
              onClick={() => switchRole(item.r)}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                user?.role === item.r
                  ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                  : 'bg-[#F8F5F0] text-[#4a3820] border-[#8B0000]/20 hover:bg-[#FFF0EB]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Orders & Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Customer Orders List (2 cols) */}
        <div className="lg:col-span-2 glass-card p-5 rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">Recent Orders & Track</h2>
            </div>
            <Link href="/menu" className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1">
              Browse Full Menu <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {customerOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-xs transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#8B0000] font-mono">{ord.id}</span>
                    <span className="text-xs font-extrabold text-[#1a1008]">• {ord.outlet}</span>
                  </div>
                  <p className="text-xs text-[#4a3820] font-medium">{ord.itemsSummary}</p>
                  <p className="text-[10px] text-[#a09070] font-semibold">{ord.date}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#8B0000]/10">
                  <div className="text-right">
                    <div className="font-extrabold text-sm text-[#1a1008]">{formatCurrency(ord.totalAmount)}</div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      ord.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {ord.status} {ord.eta ? `(${ord.eta})` : ''}
                    </span>
                  </div>

                  {ord.status === 'In Transit' ? (
                    <Link
                      href="/track"
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1 shrink-0"
                    >
                      <Truck className="w-3.5 h-3.5" /> Track
                    </Link>
                  ) : (
                    <Link
                      href="/menu"
                      className="px-3 py-1.5 rounded-xl border border-[#8B0000]/30 text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-extrabold text-xs transition-all shrink-0 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reorder
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Dishes & Quick Actions (1 col) */}
        <div className="glass-card p-5 rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">Favorite Dishes</h2>
              </div>
              <Link href="/menu" className="text-xs font-bold text-[#8B0000] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {favorites.map((fav) => (
                <div key={fav.id} className="p-2.5 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-2xl flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#8B0000]/10">
                    <Image src={fav.image} alt={fav.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs text-[#1a1008] truncate">{fav.name}</h4>
                    <p className="text-[10px] text-[#a09070] font-semibold">{fav.outlet}</p>
                    <p className="text-xs font-extrabold text-[#8B0000]">{formatCurrency(fav.price)}</p>
                  </div>
                  <Link
                    href="/menu"
                    className="p-2 rounded-xl btn-crimson text-white text-xs font-bold shrink-0 cursor-pointer shadow-xs"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="p-4 bg-gradient-to-br from-[#FFF8F0] to-[#FFF0EB] border border-[#8B0000]/15 rounded-2xl space-y-2 mt-4">
            <span className="text-xs font-extrabold text-[#8B0000] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C8A055]" /> Need Table Booking?
            </span>
            <p className="text-[11px] text-[#6b5840]">Reserve a table at Giri Fine Dining or Lounge for special celebrations.</p>
            <Link
              href="/reserve"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[#8B0000] hover:underline pt-1"
            >
              Book Table Now <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
