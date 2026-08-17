'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, ArrowLeft, CheckCircle2, CreditCard, User, Table, Phone, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface MenuSelection {
  name: string;
  price: number;
  qty: number;
}

const MENU_PRESETS = [
  { name: 'Chicken Dum Biryani', price: 229 },
  { name: 'Mutton Dum Biryani', price: 299 },
  { name: 'Royal Paneer Butter Masala', price: 350 },
  { name: 'Smoked BBQ Wings', price: 320 },
  { name: 'Butter Naan', price: 40 },
  { name: 'Dutch Dark Chocolate Cake', price: 600 },
  { name: 'Coke 500ml', price: 40 },
];

export default function MerchantOfflineOrdersPage() {
  const [customerName, setCustomerName] = useState('Ravi Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [orderType, setOrderType] = useState<'DINE_IN' | 'PICKUP' | 'DELIVERY'>('DINE_IN');
  const [tableNumber, setTableNumber] = useState('Table 08');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI' | 'CARD'>('CASH');
  const [discount, setDiscount] = useState(0);

  const [selectedItems, setSelectedItems] = useState<MenuSelection[]>([
    { name: 'Chicken Dum Biryani', price: 229, qty: 2 },
    { name: 'Smoked BBQ Wings', price: 320, qty: 1 },
  ]);

  const [createdSuccess, setCreatedSuccess] = useState(false);

  const addItemToOrder = (preset: { name: string; price: number }) => {
    const existing = selectedItems.find((i) => i.name === preset.name);
    if (existing) {
      setSelectedItems(selectedItems.map((i) => (i.name === preset.name ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setSelectedItems([...selectedItems, { name: preset.name, price: preset.price, qty: 1 }]);
    }
  };

  const updateItemQty = (name: string, delta: number) => {
    setSelectedItems(
      selectedItems
        .map((i) => (i.name === name ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = Math.max(0, subtotal + tax - discount);

  const handleCreateOfflineOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setSelectedItems([]);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {createdSuccess && (
        <div className="bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm">🎉 Offline Order #ORD-OFF{Math.floor(100 + Math.random() * 900)} Created!</h3>
            <p className="text-xs text-emerald-200">Order saved with source = OFFLINE and routed to kitchen for preparation.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/merchant/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">+ Create Offline Order</h1>
            <p className="text-xs text-[#6b5840]">POS counter billing for walk-in dine-in tables, takeaway & manual orders</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleCreateOfflineOrder} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Customer & Order Options */}
        <div className="md:col-span-2 space-y-5">
          <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-extrabold text-[#1a1008] border-b border-[#8B0000]/10 pb-2">Customer & Order Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as any)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                >
                  <option value="DINE_IN">DINE_IN</option>
                  <option value="PICKUP">PICKUP</option>
                  <option value="DELIVERY">DELIVERY</option>
                </select>
              </div>

              {orderType === 'DINE_IN' && (
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Table Number</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Table 08"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold text-[#8B0000]"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                >
                  <option value="CASH">CASH</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">CARD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preset Menu Items Selector */}
          <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-3 text-xs">
            <h2 className="text-sm font-extrabold text-[#1a1008]">Quick Select Dishes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MENU_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => addItemToOrder(preset)}
                  className="p-3 bg-[#F8F5F0] hover:bg-[#FFF8F0] border border-[#8B0000]/15 rounded-2xl text-left transition-all cursor-pointer space-y-1"
                >
                  <span className="font-extrabold text-[#1a1008] block truncate">{preset.name}</span>
                  <span className="font-bold text-[#8B0000]">₹{preset.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Bill */}
        <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-4 text-xs h-fit">
          <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2">
            <h2 className="text-sm font-extrabold text-[#1a1008]">Order Cart Summary</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#8B0000] text-white">
              OFFLINE
            </span>
          </div>

          {selectedItems.length === 0 ? (
            <div className="text-center p-6 text-gray-400 font-bold">No items added to order yet.</div>
          ) : (
            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div key={item.name} className="flex justify-between items-center bg-[#F8F5F0] p-2.5 rounded-xl border border-[#8B0000]/10">
                  <div>
                    <span className="font-bold text-[#1a1008] block">{item.name}</span>
                    <span className="text-[10px] text-gray-500">₹{item.price} x {item.qty}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateItemQty(item.name, -1)}
                      className="p-1 rounded bg-white text-[#8B0000] border"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold w-4 text-center">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateItemQty(item.name, 1)}
                      className="p-1 rounded bg-[#8B0000] text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-[#8B0000]/10 space-y-1.5 text-xs font-bold text-[#6b5840]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-[#1a1008]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Tax (5%):</span>
              <span className="text-[#1a1008]">₹{tax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount (₹):</span>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-16 bg-[#F8F5F0] border rounded px-1 text-right text-xs font-bold text-emerald-700 outline-none"
              />
            </div>
            <div className="pt-2 border-t border-[#8B0000]/10 flex justify-between items-center font-black text-[#8B0000] text-base">
              <span>Total Bill:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={selectedItems.length === 0}
            className="btn-crimson w-full py-3.5 rounded-xl font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Save & Generate Offline Order
          </button>
        </div>
      </form>
    </div>
  );
}
