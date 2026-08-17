'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MapPin, Phone, Clock, ArrowRight, Truck, Store, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface CustomerOrder {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  orderType: 'DELIVERY' | 'DINE_IN' | 'PICKUP';
  status: string;
  createdAt: string;
  deliveryAddress?: string;
}

const INITIAL_USER_ORDERS: CustomerOrder[] = [
  {
    id: 'ORD-2054',
    restaurantName: 'Giri Spice Garden',
    restaurantAddress: 'Plot 42, Jubilee Hills Road No 36, Hyderabad',
    restaurantPhone: '+91 98765 99999',
    items: [
      { name: 'Chicken Dum Biryani', quantity: 2, price: 229 },
      { name: 'Chicken 65', quantity: 1, price: 260 },
    ],
    totalAmount: 718,
    orderType: 'DELIVERY',
    status: 'OUT_FOR_DELIVERY',
    createdAt: '15 mins ago',
    deliveryAddress: 'Flat 402, Royal Palms, Jubilee Hills, Hyderabad',
  },
  {
    id: 'ORD-1980',
    restaurantName: 'Royal Hyderabadi House',
    restaurantAddress: 'Hitec City Main Road, Hyderabad',
    restaurantPhone: '+91 98765 88888',
    items: [
      { name: 'Mutton Dum Biryani', quantity: 1, price: 320 },
      { name: 'Dutch Dark Chocolate Cake', quantity: 1, price: 600 },
    ],
    totalAmount: 920,
    orderType: 'DELIVERY',
    status: 'DELIVERED',
    createdAt: 'Yesterday',
    deliveryAddress: 'Block B, 7th Floor, DLF Cyber City, Gachibowli, Hyderabad',
  },
];

export default function UserOrdersPage() {
  const [orders] = useState<CustomerOrder[]>(INITIAL_USER_ORDERS);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/user/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">My Food Orders</h1>
            <p className="text-xs text-[#6b5840]">View order history, item breakdowns and live order tracking</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div>
                <span className="font-black text-base text-[#1a1008]">{order.id}</span>
                <span className="ml-2 font-bold text-xs text-[#8B0000]">• {order.restaurantName}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                order.status === 'OUT_FOR_DELIVERY' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* FROM -> TO Address Details (SECTION 20) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F8F5F0] p-3.5 rounded-2xl border border-[#8B0000]/10">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#8B0000] block">FROM (Restaurant):</span>
                <div className="font-extrabold text-[#1a1008] mt-0.5">{order.restaurantName}</div>
                <div className="text-[11px] text-[#6b5840] leading-tight">{order.restaurantAddress}</div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 block">TO (Customer Delivery Address):</span>
                <div className="font-extrabold text-[#1a1008] mt-0.5">Ravi Kumar</div>
                <div className="text-[11px] text-[#6b5840] leading-tight">{order.deliveryAddress || 'Saved Address'}</div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase text-[#a09070] block">Items Ordered:</span>
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between font-medium">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-bold font-mono">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#8B0000]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-black text-lg text-[#8B0000]">Total Paid: {formatCurrency(order.totalAmount)}</span>

              <Link
                href={`/user/orders/${order.id}/track`}
                className="btn-crimson py-2.5 px-5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Truck className="w-4 h-4" /> Live Order Tracking →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
