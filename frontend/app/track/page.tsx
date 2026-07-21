'use client';

import { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';

const STEPS = ['Order Placed', 'Kitchen Prep', 'Chef Cooking', 'Ready to Serve'];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('ORD-101');

  const activeOrder = {
    id:          'ORD-101',
    tableNumber: '04',
    statusIndex:  2,
    items: [
      { name: 'Smoked Wagyu Beef Burger',        qty: 2, price: 21.00 },
      { name: 'Signature Passionfruit Mocktail', qty: 2, price: 7.50  },
    ],
    total: 57.00,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <span className="section-label">Live Kitchen Dispatch</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Track Your Order</h1>
        <p className="text-sm text-[#6b5840] mt-2">Real-time status updates synced with kitchen tablets.</p>
        <hr className="divider-gold mt-6" />
      </div>

      {/* Search */}
      <div className="glass-card p-4 rounded-xl mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4" />
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. ORD-101)..."
            className="input-light pl-10"
          />
        </div>
      </div>

      {/* Order Card */}
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">

        {/* Meta */}
        <div className="flex justify-between items-center pb-4 border-b border-[#C8A055]/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold border border-[#8B0000]/15">
              COOKING IN PROGRESS
            </span>
            <h2 className="text-xl font-extrabold text-[#1a1008] mt-2">Order #{activeOrder.id}</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#a09070] block">Table Number</span>
            <span className="text-xl font-extrabold text-[#8B0000]">Table #{activeOrder.tableNumber}</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex justify-between relative py-2">
          <div className="absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-[#F8F5F0] z-0" />
          <div
            className="absolute top-[22px] left-[10%] h-0.5 bg-gradient-to-r from-[#8B0000] to-[#C8A055] z-0 transition-all"
            style={{ width: `${(activeOrder.statusIndex / (STEPS.length - 1)) * 80}%` }}
          />
          {STEPS.map((step, idx) => {
            const done   = idx <= activeOrder.statusIndex;
            const active = idx === activeOrder.statusIndex;
            return (
              <div key={step} className="flex flex-col items-center flex-1 gap-2 z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  active ? 'bg-[#8B0000] border-[#C8A055] text-white shadow-md'
                         : done  ? 'bg-[#C8A055] border-[#C8A055] text-white'
                                 : 'bg-white border-[#e0d8cc] text-[#a09070]'
                }`}>
                  {done && !active ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[10px] font-bold text-center leading-tight ${done ? 'text-[#1a1008]' : 'text-[#a09070]'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Ticket summary */}
        <div className="bg-[#F8F5F0] p-4 rounded-xl flex flex-col gap-2">
          <h4 className="text-xs font-bold text-[#6b5840] mb-1 uppercase tracking-wider">Ticket Summary</h4>
          {activeOrder.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span className="text-[#4a3820]">{item.qty}× {item.name}</span>
              <span className="font-bold text-[#8B0000]">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr className="border-[#C8A055]/20 my-1" />
          <div className="flex justify-between text-sm font-extrabold">
            <span className="text-[#1a1008]">Total Paid</span>
            <span className="text-[#8B0000]">${activeOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
