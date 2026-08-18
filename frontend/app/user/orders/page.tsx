'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MapPin, Phone, Clock, ArrowRight, Truck, Store, ArrowLeft, Building2, Utensils } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import RestaurantInfo from '@/components/RestaurantInfo';

interface CustomerOrder {
  id: string;
  orderNumber: string;
  restaurantName: string;
  shopId?: string;
  merchantId?: string;
  restaurantAddress: string;
  restaurantPhone: string;
  tableNumber?: string;
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
    orderNumber: '#ORD2054',
    restaurantName: 'Giri Spice Garden',
    shopId: 'shop-giri-spice',
    merchantId: 'merchant-giri-spice',
    restaurantAddress: 'Plot 42, Jubilee Hills Road No 36, Hyderabad',
    restaurantPhone: '+91 98765 99999',
    tableNumber: 'Table 06',
    items: [
      { name: 'Chicken Dum Biryani', quantity: 2, price: 249 },
      { name: 'Paneer Tikka', quantity: 1, price: 220 },
    ],
    totalAmount: 718,
    orderType: 'DINE_IN',
    status: 'PREPARING',
    createdAt: '15 mins ago',
    deliveryAddress: 'Dine-In Table 06, Giri Spice Garden',
  },
  {
    id: 'ORD-1980',
    orderNumber: '#ORD1980',
    restaurantName: 'RK Restaurant',
    shopId: 'rk-restaurant',
    merchantId: 'merchant-rk-restaurant',
    restaurantAddress: 'Downtown Metro Station Plaza, Hyderabad',
    restaurantPhone: '+91 98765 88888',
    tableNumber: 'Delivery',
    items: [
      { name: 'RK Special Veg Biryani', quantity: 1, price: 280 },
      { name: 'RK Guntur Kodi Vepudu', quantity: 1, price: 290 },
    ],
    totalAmount: 570,
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
            <p className="text-xs text-[#6b5840]">View order history, item breakdowns and live order status</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div>
                <span className="font-black text-base text-[#8B0000] font-mono">{order.orderNumber || order.id}</span>
                <span className="ml-2 font-extrabold text-xs text-[#1a1008]">({order.orderType})</span>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  order.status === 'PREPARING'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                    : order.status === 'DELIVERED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}
              >
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* RESTAURANT INFO HEADER */}
            <RestaurantInfo
              shopName={order.restaurantName}
              shopId={order.shopId}
              merchantId={order.merchantId}
              address={order.restaurantAddress}
              compact
              showViewButton
            />

            {/* Dine-In / Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F8F5F0] p-3.5 rounded-2xl border border-[#8B0000]/10">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#8B0000] block">Order Type & Table:</span>
                <div className="font-extrabold text-[#1a1008] mt-0.5">
                  {order.orderType === 'DINE_IN' ? `🪑 ${order.tableNumber || 'Table 06'} (Dine-In)` : '🚚 Home Delivery'}
                </div>
                <div className="text-[11px] text-[#6b5840] leading-tight">{order.restaurantAddress}</div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 block">Customer Destination:</span>
                <div className="font-extrabold text-[#1a1008] mt-0.5">Customer Order</div>
                <div className="text-[11px] text-[#6b5840] leading-tight">{order.deliveryAddress || 'Saved Address'}</div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase text-[#a09070] block">Items Ordered:</span>
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between font-medium">
                  <span>
                    {it.quantity}x {it.name}
                  </span>
                  <span className="font-bold font-mono">{formatCurrency(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#8B0000]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-black text-lg text-[#8B0000]">Total Paid: {formatCurrency(order.totalAmount)}</span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/menu?shop=${encodeURIComponent(order.restaurantName)}`}
                  className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Building2 className="w-4 h-4" /> View Restaurant
                </Link>
                <Link
                  href={`/user/orders/${order.id}/track`}
                  className="py-2.5 px-4 rounded-xl text-xs font-extrabold border border-[#8B0000]/20 text-[#4a3820] hover:bg-gray-50 flex items-center justify-center gap-1"
                >
                  <Truck className="w-4 h-4" /> Track Order →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
