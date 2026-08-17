'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Clock, CheckCircle2, XCircle, Truck, Flame, Check, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface MerchantOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'New' | 'Accepted' | 'Preparing' | 'Ready' | 'Picked Up' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const INITIAL_ORDERS: MerchantOrder[] = [
  {
    id: 'ORD-501',
    customerName: 'Rohan Sharma',
    phone: '+91 98765 11111',
    address: 'Flat 402, Royal Palms, Jubilee Hills',
    items: [
      { name: 'Chicken Dum Biryani', quantity: 2, price: 229 },
      { name: 'Smoked BBQ Wings', quantity: 1, price: 320 }
    ],
    totalAmount: 778,
    status: 'New',
    createdAt: '5 mins ago',
  },
  {
    id: 'ORD-502',
    customerName: 'Priya Patel',
    phone: '+91 98765 22222',
    address: 'Villa 12, Suncity Colony, Gachibowli',
    items: [
      { name: 'Royal Paneer Butter Masala', quantity: 1, price: 350 },
      { name: 'Butter Naan', quantity: 4, price: 40 }
    ],
    totalAmount: 510,
    status: 'Accepted',
    createdAt: '12 mins ago',
  },
  {
    id: 'ORD-503',
    customerName: 'Vikram Mehta',
    phone: '+91 98765 33333',
    address: 'Block B, DLF Cyber City',
    items: [
      { name: 'Mutton Dum Biryani', quantity: 2, price: 299 },
      { name: 'Dutch Dark Chocolate Cake', quantity: 1, price: 600 }
    ],
    totalAmount: 1198,
    status: 'Preparing',
    createdAt: '22 mins ago',
  },
  {
    id: 'ORD-504',
    customerName: 'Anil Kumar',
    phone: '+91 98765 44444',
    address: 'Plot 88, Madhapur Main Road',
    items: [
      { name: 'RK Special Veg Hyderabadi Biryani', quantity: 1, price: 280 },
      { name: 'Paneer Tikka Starter', quantity: 1, price: 240 }
    ],
    totalAmount: 520,
    status: 'Ready',
    createdAt: '30 mins ago',
  },
  {
    id: 'ORD-505',
    customerName: 'Suresh Rayudu',
    phone: '+91 98765 55555',
    address: 'Apt 104, Hitech City Towers',
    items: [
      { name: 'Madhan Spicy Chicken Biryani', quantity: 2, price: 330 },
      { name: 'Ghee Rice', quantity: 1, price: 180 }
    ],
    totalAmount: 840,
    status: 'Picked Up',
    createdAt: '45 mins ago',
  },
  {
    id: 'ORD-506',
    customerName: 'Sneha Reddy',
    phone: '+91 98765 66666',
    address: 'Road No 36, Jubilee Hills',
    items: [
      { name: 'Andhra Special Veg Dum Biryani', quantity: 2, price: 260 },
      { name: 'Andhra Ghee Roast Masala Dosa', quantity: 2, price: 140 }
    ],
    totalAmount: 800,
    status: 'Completed',
    createdAt: '1 hour ago',
  },
  {
    id: 'ORD-507',
    customerName: 'Rahul Varma',
    phone: '+91 98765 77777',
    address: 'Flat 501, Kondapur Enclave',
    items: [
      { name: 'Guntur Kodi Vepudu', quantity: 1, price: 290 }
    ],
    totalAmount: 290,
    status: 'Cancelled',
    createdAt: '2 hours ago',
  }
];

const ORDER_STATUS_FLOW: MerchantOrder['status'][] = [
  'New', 'Accepted', 'Preparing', 'Ready', 'Picked Up', 'Completed', 'Cancelled'
];

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<MerchantOrder[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Load from persistent localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('giri_merchant_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      }
      localStorage.setItem('giri_merchant_orders', JSON.stringify(INITIAL_ORDERS));
    } catch {}
  }, []);

  const saveAndSetOrders = (updated: MerchantOrder[]) => {
    setOrders(updated);
    try {
      localStorage.setItem('giri_merchant_orders', JSON.stringify(updated));
    } catch {}
  };

  const updateOrderStatus = (orderId: string, nextStatus: MerchantOrder['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o);
    saveAndSetOrders(updated);
  };

  const filteredOrders = orders.filter(o => statusFilter === 'All' || o.status === statusFilter);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/merchant/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Merchant Order Fulfillment</h1>
            <p className="text-xs text-[#6b5840]">Live Swiggy Workflow: New → Accepted → Preparing → Ready → Picked Up → Completed</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.setItem('giri_merchant_orders', JSON.stringify(INITIAL_ORDERS));
            setOrders(INITIAL_ORDERS);
          }}
          className="text-xs font-bold text-[#8B0000] border border-[#8B0000]/20 px-3 py-1.5 rounded-xl hover:bg-rose-50 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Orders Demo
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#8B0000]/10">
        {['All', ...ORDER_STATUS_FLOW].map((st) => {
          const count = st === 'All' ? orders.length : orders.filter(o => o.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                statusFilter === st ? 'bg-[#8B0000] text-white shadow-xs' : 'bg-white text-[#4a3820] border border-[#8B0000]/15 hover:bg-[#FFF8F0]'
              }`}
            >
              <span>{st}</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                statusFilter === st ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="glass-card rounded-2xl bg-white border border-[#8B0000]/15 p-12 text-center space-y-3">
          <ShoppingBag className="w-10 h-10 text-[#8B0000] mx-auto opacity-30" />
          <h3 className="text-base font-extrabold text-[#1a1008]">No Orders in "{statusFilter}" Status</h3>
          <p className="text-xs text-[#6b5840]">There are currently no customer orders under this fulfillment status.</p>
          <button
            onClick={() => setStatusFilter('All')}
            className="btn-crimson py-2 px-4 rounded-xl text-xs font-extrabold cursor-pointer inline-block"
          >
            View All Orders
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="glass-card rounded-2xl bg-white border border-[#8B0000]/15 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
                <div>
                  <span className="font-extrabold text-sm text-[#1a1008]">{order.id}</span>
                  <div className="text-[10px] text-[#a09070] font-mono">{order.createdAt}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  order.status === 'New' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                  order.status === 'Accepted' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                  order.status === 'Preparing' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                  order.status === 'Ready' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' :
                  order.status === 'Picked Up' ? 'bg-teal-100 text-teal-900 border border-teal-300' :
                  order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="font-extrabold text-[#1a1008]">{order.customerName} ({order.phone})</div>
                <div className="text-[11px] text-[#6b5840] line-clamp-1">{order.address}</div>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-[#8B0000] uppercase block">Order Items</span>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center font-medium">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-bold font-mono">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#8B0000]/10 flex justify-between items-center font-extrabold text-[#8B0000]">
                  <span>Total Amount:</span>
                  <span className="text-sm">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>

              {/* Status Transition Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#8B0000]/10">
                {order.status === 'New' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Accepted')} className="btn-crimson py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer">
                    Accept Order
                  </button>
                )}
                {order.status === 'Accepted' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="bg-purple-700 hover:bg-purple-800 text-white py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer">
                    Mark Preparing
                  </button>
                )}
                {order.status === 'Preparing' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Ready')} className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer">
                    Mark Ready
                  </button>
                )}
                {order.status === 'Ready' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Picked Up')} className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer">
                    Delivery Pickup
                  </button>
                )}
                {order.status === 'Picked Up' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Completed')} className="bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer">
                    Complete Order
                  </button>
                )}
                {order.status === 'Completed' && (
                  <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1 py-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Order Delivered
                  </span>
                )}
                {order.status === 'Cancelled' && (
                  <span className="text-xs font-extrabold text-red-700 flex items-center gap-1 py-1">
                    <XCircle className="w-4 h-4 text-red-600" /> Order Cancelled
                  </span>
                )}

                {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} className="text-red-700 hover:underline text-xs font-bold px-2 py-1 cursor-pointer">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
