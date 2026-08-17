'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, ArrowLeft, Calendar, Search, Filter, IndianRupee, ShoppingBag, CheckCircle2, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface DailyOrderRecord {
  id: string;
  time: string;
  customerName: string;
  source: 'ONLINE' | 'OFFLINE';
  orderType: 'DELIVERY' | 'DINE_IN' | 'PICKUP';
  tableNumber?: string;
  itemsCount: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'UNPAID';
  status: 'COMPLETED' | 'PREPARING' | 'CANCELLED' | 'OUT_FOR_DELIVERY';
}

const INITIAL_REPORT_ORDERS: DailyOrderRecord[] = [
  { id: 'ORD-2055', time: '12:45 PM', customerName: 'Ravi Kumar', source: 'ONLINE', orderType: 'DINE_IN', tableNumber: 'Table 06', itemsCount: 3, amount: 718, paymentMethod: 'UPI', paymentStatus: 'PAID', status: 'COMPLETED' },
  { id: 'ORD-2054', time: '12:30 PM', customerName: 'Anil Mehta', source: 'OFFLINE', orderType: 'DINE_IN', tableNumber: 'Table 02', itemsCount: 2, amount: 538, paymentMethod: 'CASH', paymentStatus: 'PAID', status: 'COMPLETED' },
  { id: 'ORD-2053', time: '12:15 PM', customerName: 'Priya Sharma', source: 'ONLINE', orderType: 'DELIVERY', itemsCount: 4, amount: 980, paymentMethod: 'ONLINE', paymentStatus: 'PAID', status: 'OUT_FOR_DELIVERY' },
  { id: 'ORD-2052', time: '11:50 AM', customerName: 'Suresh Raina', source: 'OFFLINE', orderType: 'PICKUP', itemsCount: 1, amount: 229, paymentMethod: 'CARD', paymentStatus: 'PAID', status: 'COMPLETED' },
  { id: 'ORD-2051', time: '11:20 AM', customerName: 'Kavita Roy', source: 'ONLINE', orderType: 'DELIVERY', itemsCount: 5, amount: 1450, paymentMethod: 'UPI', paymentStatus: 'PAID', status: 'COMPLETED' },
];

export default function MerchantDailyReportsPage() {
  const [dateRange, setDateRange] = useState<'Today' | 'Yesterday' | 'This Week' | 'This Month'>('Today');
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const reportOrders = INITIAL_REPORT_ORDERS.filter((o) => {
    const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesSource = sourceFilter === 'All' || o.source === sourceFilter;
    const matchesType = typeFilter === 'All' || o.orderType === typeFilter;
    return matchesSearch && matchesSource && matchesType;
  });

  const totalOrders = 128;
  const onlineOrders = 85;
  const offlineOrders = 28;
  const dineInOrders = 15;
  const completedOrders = 112;
  const cancelledOrders = 8;

  const grossSales = 45800;
  const discount = 3450;
  const tax = 2290;
  const netSales = grossSales - discount + tax;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/merchant/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Merchant Daily Reports & Sales Analytics</h1>
            <p className="text-xs text-[#6b5840]">Daily order counts, online/offline breakdown, gross/net revenue & payment channels</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#8B0000]/15 shadow-xs">
          {(['Today', 'Yesterday', 'This Week', 'This Month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                dateRange === range ? 'bg-[#8B0000] text-white shadow-xs' : 'text-[#4a3820] hover:bg-[#FFF8F0]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-[#6b5840] font-extrabold uppercase block">Total Orders</span>
          <h3 className="text-xl font-extrabold text-[#1a1008]">{totalOrders}</h3>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-blue-700 font-extrabold uppercase block">Online Orders</span>
          <h3 className="text-xl font-extrabold text-blue-900">{onlineOrders}</h3>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-purple-700 font-extrabold uppercase block">Offline Orders</span>
          <h3 className="text-xl font-extrabold text-purple-900">{offlineOrders}</h3>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-amber-700 font-extrabold uppercase block">Dine-In Orders</span>
          <h3 className="text-xl font-extrabold text-amber-900">{dineInOrders}</h3>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-emerald-700 font-extrabold uppercase block">Completed</span>
          <h3 className="text-xl font-extrabold text-emerald-900">{completedOrders}</h3>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 space-y-1">
          <span className="text-[10px] text-red-700 font-extrabold uppercase block">Cancelled</span>
          <h3 className="text-xl font-extrabold text-red-900">{cancelledOrders}</h3>
        </div>
      </div>

      {/* Financial Sales Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5 bg-white border border-[#8B0000]/15 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-[#1a1008] border-b border-[#8B0000]/10 pb-2">Revenue & Net Sales Breakdown</h2>
          <div className="space-y-2 text-xs font-bold text-[#6b5840]">
            <div className="flex justify-between"><span>Gross Product Sales:</span><span className="text-[#1a1008]">₹{grossSales}</span></div>
            <div className="flex justify-between"><span>Discounts Given:</span><span className="text-emerald-700">-₹{discount}</span></div>
            <div className="flex justify-between"><span>GST Tax Collected:</span><span className="text-[#1a1008]">₹{tax}</span></div>
            <div className="pt-2 border-t border-[#8B0000]/10 flex justify-between font-black text-base text-[#8B0000]">
              <span>Net Restaurant Sales:</span>
              <span>{formatCurrency(netSales)}</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 bg-white border border-[#8B0000]/15 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-[#1a1008] border-b border-[#8B0000]/10 pb-2">Payment Channels Split</h2>
          <div className="space-y-2 text-xs font-bold text-[#6b5840]">
            <div className="flex justify-between"><span>Cash:</span><span className="text-[#1a1008]">₹12,500</span></div>
            <div className="flex justify-between"><span>UPI / GPay / PhonePe:</span><span className="text-[#1a1008]">₹14,800</span></div>
            <div className="flex justify-between"><span>Card POS:</span><span className="text-[#1a1008]">₹9,200</span></div>
            <div className="flex justify-between"><span>Online Payment:</span><span className="text-[#1a1008]">₹8,140</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 18: DAILY ORDER DETAILS LOG */}
      <div className="glass-card rounded-2xl bg-white border border-[#8B0000]/15 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-3">
          <h2 className="text-base font-extrabold text-[#1a1008]">Daily Order Details Log ({reportOrders.length})</h2>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order ID or customer..."
                className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3">Order ID & Time</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Source</th>
                <th className="p-3">Type</th>
                <th className="p-3">Table</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-center">Payment</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {reportOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="p-3">
                    <span className="font-extrabold text-[#8B0000]">{o.id}</span>
                    <span className="text-[10px] text-gray-500 block">{o.time}</span>
                  </td>
                  <td className="p-3 font-bold">{o.customerName}</td>
                  <td className="p-3 font-bold text-blue-800">{o.source}</td>
                  <td className="p-3 font-bold">{o.orderType}</td>
                  <td className="p-3 text-gray-600">{o.tableNumber || '-'}</td>
                  <td className="p-3 text-right font-black text-[#8B0000]">{formatCurrency(o.amount)}</td>
                  <td className="p-3 text-center font-bold text-emerald-700">{o.paymentMethod} ({o.paymentStatus})</td>
                  <td className="p-3 text-center font-extrabold">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
