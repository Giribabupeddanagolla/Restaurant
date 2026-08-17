'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Truck, MapPin, Store, Phone, CheckCircle2, ArrowLeft, Clock, ShieldCheck, Navigation } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const TRACKING_STEPS = [
  { id: 1, title: 'Order Placed', time: '12:30 PM', done: true },
  { id: 2, title: 'Restaurant Accepted', time: '12:32 PM', done: true },
  { id: 3, title: 'Food Preparing', time: '12:35 PM', done: true },
  { id: 4, title: 'Food Ready', time: '12:48 PM', done: true },
  { id: 5, title: 'Delivery Partner Assigned', time: '12:50 PM', done: true },
  { id: 6, title: 'Picked Up', time: '12:52 PM', done: true },
  { id: 7, title: 'Out for Delivery', time: '12:55 PM (Current Status)', done: true, active: true },
  { id: 8, title: 'Delivered', time: 'Est 01:10 PM', done: false },
];

export default function UserOrderTrackingPage() {
  const params = useParams();
  const orderId = params?.orderId || 'ORD-2054';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/user/orders"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Live Order Tracking — #{orderId}</h1>
            <p className="text-xs text-[#6b5840]">Real-time delivery progress timeline and location tracking</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
          🚚 OUT FOR DELIVERY
        </span>
      </div>

      {/* SECTION 21: MAP LOCATION OVERVIEW CARD */}
      <div className="glass-card rounded-3xl bg-gradient-to-br from-[#1a1008] to-[#2d1b0d] p-6 text-white border border-[#C8A055]/30 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-bold shadow-md">
              <Navigation className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Live Location Map Route</h2>
              <p className="text-xs text-[#E0B96A]">Restaurant → Delivery Partner → Customer Address</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
            ETA: 15 mins
          </span>
        </div>

        {/* Visual Map Route Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
            <span className="text-[10px] font-extrabold text-red-400 uppercase block">1. Restaurant Location</span>
            <div className="font-extrabold text-white">Giri Spice Garden</div>
            <p className="text-[11px] text-gray-300 line-clamp-1">Jubilee Hills Road 36</p>
          </div>

          <div className="bg-emerald-500/20 p-3.5 rounded-2xl border border-emerald-500/40 space-y-1">
            <span className="text-[10px] font-extrabold text-emerald-300 uppercase block">2. Delivery Partner Current Position</span>
            <div className="font-extrabold text-white">Ravi Kumar (Hero Splendor TS09)</div>
            <p className="text-[11px] text-emerald-200 font-mono">+91 98765 00000</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
            <span className="text-[10px] font-extrabold text-amber-300 uppercase block">3. Customer Delivery Address</span>
            <div className="font-extrabold text-white">Ravi Kumar</div>
            <p className="text-[11px] text-gray-300 line-clamp-1">Flat 402, Royal Palms, Jubilee Hills</p>
          </div>
        </div>
      </div>

      {/* SECTION 19: STEP-BY-STEP TRACKING TIMELINE */}
      <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#1a1008] border-b border-[#8B0000]/10 pb-3">Order Status Progression</h3>

        <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#8B0000]/20 pl-8">
          {TRACKING_STEPS.map((step) => (
            <div key={step.id} className="relative flex items-center justify-between text-xs">
              <div
                className={`absolute -left-8 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                  step.active
                    ? 'bg-[#8B0000] text-white ring-4 ring-[#8B0000]/20 animate-bounce'
                    : step.done
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.done ? '✓' : step.id}
              </div>

              <div>
                <span className={`font-extrabold ${step.active ? 'text-[#8B0000] text-sm' : 'text-[#1a1008]'}`}>
                  {step.title}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 font-mono font-bold">{step.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
