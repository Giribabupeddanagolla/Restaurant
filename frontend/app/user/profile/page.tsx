'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, ShieldCheck, KeyRound, LogOut, Edit, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function UserProfilePage() {
  const { user, logout } = useAuth();

  const [savedAddresses] = useState([
    { id: 'addr-1', tag: 'Home', address: 'Flat 402, Royal Palms, Jubilee Hills Road No. 36', city: 'Hyderabad', pincode: '500033' },
    { id: 'addr-2', tag: 'Work', address: 'Block B, 7th Floor, DLF Cyber City, Gachibowli', city: 'Hyderabad', pincode: '500032' },
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/user/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">User Account Profile</h1>
            <p className="text-xs text-[#6b5840]">Manage your diner details, saved delivery addresses, and account security</p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 shadow-sm p-6 space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-5 border-b border-[#8B0000]/10 pb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#1a1008]">{user?.name || 'Customer Account'}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                Active Diner
              </span>
            </div>
            <p className="text-xs text-[#6b5840]">{user?.email || 'customer@royalrestaurant.com'}</p>
            <span className="inline-block text-[10px] font-extrabold uppercase bg-[#8B0000]/10 text-[#8B0000] px-2.5 py-0.5 rounded-full mt-1">
              Role: {user?.role || 'Customer'}
            </span>
          </div>
        </div>

        {/* Account Information Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#F8F5F0] p-4 rounded-2xl space-y-1 border border-[#8B0000]/10">
            <span className="text-[10px] font-bold uppercase text-[#a09070] block">Full Name</span>
            <span className="font-extrabold text-[#1a1008]">{user?.name || 'Customer Account'}</span>
          </div>

          <div className="bg-[#F8F5F0] p-4 rounded-2xl space-y-1 border border-[#8B0000]/10">
            <span className="text-[10px] font-bold uppercase text-[#a09070] block">Email Address</span>
            <span className="font-extrabold text-[#1a1008]">{user?.email || 'customer@royalrestaurant.com'}</span>
          </div>

          <div className="bg-[#F8F5F0] p-4 rounded-2xl space-y-1 border border-[#8B0000]/10">
            <span className="text-[10px] font-bold uppercase text-[#a09070] block">Phone Number</span>
            <span className="font-extrabold text-[#1a1008] font-mono">{user?.phone || '+91 98765 43210'}</span>
          </div>

          <div className="bg-[#F8F5F0] p-4 rounded-2xl space-y-1 border border-[#8B0000]/10">
            <span className="text-[10px] font-bold uppercase text-[#a09070] block">Account Status</span>
            <span className="font-extrabold text-emerald-700">Verified & Active</span>
          </div>
        </div>

        {/* Saved Delivery Addresses */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8B0000]" /> Saved Delivery Addresses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="bg-[#F8F5F0] p-4 rounded-2xl border border-[#8B0000]/10 space-y-1 text-xs">
                <span className="px-2 py-0.5 bg-[#8B0000] text-white text-[10px] font-extrabold rounded-full">
                  {addr.tag}
                </span>
                <p className="font-extrabold text-[#1a1008] mt-1">{addr.address}</p>
                <span className="text-[10px] text-[#a09070] font-mono block">{addr.city} • {addr.pincode}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-[#8B0000]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Profile edit mode enabled.')}
              className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Profile
            </button>
            <button
              onClick={() => handleAction('Password reset link sent to email.')}
              className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" /> Change Password
            </button>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
