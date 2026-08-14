'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { LogIn, UserPlus, Info, ChevronRight, Star, Leaf, Award, Clock, LayoutDashboard, LogOut, ShieldCheck, ShoppingBag, Heart } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, switchRole } = useAuth();

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-28 md:pb-8 flex flex-col gap-6">

      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-white shadow-lg ring-4 ring-[#C8A055]/30 flex items-center justify-center mx-auto mb-3 relative overflow-hidden">
          {user?.avatar ? (
            <Image src={user.avatar} alt={user.name} fill className="object-cover rounded-full" />
          ) : (
            <Image src="/royal-logo.svg" alt="Royal Restaurant" width={72} height={72} className="rounded-full" />
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-[#1a1008]">
          {user ? user.name : 'Customer Account & Profile'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5840] mt-1">
          {user ? `${user.email} • ${user.role} Dashboard` : 'Sign in to order, save favourites & manage your account.'}
        </p>
      </div>

      {/* Logged In User Dashboard Controls */}
      {user ? (
        <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a09070] block font-mono">
                Active Session
              </span>
              <span className="text-sm font-extrabold text-[#8B0000]">{user.role} Account</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>

          {/* ERP Console Navigation for Admin / Manager */}
          {(user.role === 'Admin' || user.role === 'Manager') && (
            <Link
              href="/admin/dashboard"
              className="w-full py-3 px-4 btn-crimson rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <LayoutDashboard className="w-4 h-4" /> Open {user.role} ERP Console
            </Link>
          )}

          {/* Quick Role Switcher for Testing */}
          <div className="pt-2">
            <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B0000]" /> Switch Active Dashboard Role:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { r: 'Admin' as UserRole, icon: '👑', label: 'Admin ERP' },
                { r: 'Manager' as UserRole, icon: '👔', label: 'Manager ERP' },
                { r: 'Customer' as UserRole, icon: '👤', label: 'Customer' }
              ].map((item) => (
                <button
                  key={item.r}
                  onClick={() => switchRole(item.r)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                    user.role === item.r
                      ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                      : 'bg-[#F8F5F0] text-[#4a3820] border-[#8B0000]/20 hover:bg-[#FFF0EB]'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[10px] whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Guest Auth Action Buttons */
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="btn-crimson w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" /> Sign In to Your Account
          </Link>
          <Link
            href="/register"
            className="w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <UserPlus className="w-5 h-5" /> Create New Account
          </Link>
        </div>
      )}

      <hr className="border-[#C8A055]/20" />

      {/* Quick links */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-[#a09070] uppercase tracking-widest mb-1">Explore & Dashboards</p>

        {[
          { icon: '👑', label: 'Admin & Manager ERP Console', sub: 'Analytics, menu, orders & inventory', href: '/admin/dashboard' },
          { icon: '👤', label: 'Customer Menu & Orders',       sub: 'Browse 1,000+ authentic outlet dishes', href: '/menu' },
          { icon: '🎁', label: 'Offers & Discounts',           sub: 'Promo codes & special coupons',     href: '/offers' },
          { icon: '📝', label: 'Blog & Chef Stories',          sub: 'Recipes, tips & restaurant news',   href: '/blog' },
          { icon: '📞', label: 'Contact Us',                   sub: 'Get in touch with our team',        href: '/contact'},
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FFF8F0] flex items-center justify-center text-xl shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1a1008] text-sm group-hover:text-[#8B0000] transition-colors">{item.label}</p>
              <p className="text-xs text-[#a09070]">{item.sub}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a09070] shrink-0" />
          </Link>
        ))}
      </div>

      <hr className="border-[#C8A055]/20" />

      {/* About Us snapshot */}
      <div>
        <p className="text-xs font-bold text-[#a09070] uppercase tracking-widest mb-3 flex items-center gap-1 font-mono">
          <Info className="w-3.5 h-3.5" /> Royal Restaurant & Outlets
        </p>

        <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-36 bg-[#F8F5F0]">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
              alt="Royal Restaurant"
              fill className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-4 text-white font-extrabold text-lg leading-tight">
              Good Food,<br />Great Experience
            </p>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <p className="text-sm text-[#4a3820] leading-relaxed">
              Royal Restaurant brings authentic cuisine to your table — built on the belief that great food and genuine warmth belong together across 8 specialized food outlets.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: <Star  className="w-4 h-4 text-[#C8A055]" />, val: '4.9',    lbl: 'Rating' },
                { icon: <Leaf  className="w-4 h-4 text-[#16603A]" />, val: '100%',   lbl: 'Organic' },
                { icon: <Award className="w-4 h-4 text-[#8B0000]" />, val: '1026+',  lbl: 'Dishes' },
                { icon: <Clock className="w-4 h-4 text-[#C8A055]" />, val: '10 Yrs', lbl: 'Legacy' },
              ].map((s) => (
                <div key={s.lbl} className="flex flex-col items-center gap-1 bg-[#F8F5F0] rounded-xl py-2.5 px-1">
                  {s.icon}
                  <span className="text-xs font-extrabold text-[#1a1008]">{s.val}</span>
                  <span className="text-[9px] text-[#a09070] font-semibold">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
