'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  IndianRupee,
  Calendar,
  Users,
  Flame,
  Boxes,
  UserCheck,
  BarChart3,
  Store,
  Utensils,
  TrendingUp,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Send,
  Bell
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orderApi, tableApi, reservationApi, inventoryApi } from '@/services/restaurantService';
import { formatCurrency } from '@/utils/formatters';

export default function ManagerDashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    revenue: 48950,
    activeOrders: 14,
    tableOccupancy: 75,
    activeTables: 15,
    totalTables: 20,
    staffOnShift: 12,
    kitchenActive: 5,
    lowStockCount: 2,
    merchantsCount: 8,
  });

  const [liveOrders, setLiveOrders] = useState<any[]>([
    { id: 'ORD-1092', customer: 'Rohan Sharma', type: 'Dine-In', table: 'T-04', items: 3, total: 1450, status: 'Preparing', prepTime: '8 mins' },
    { id: 'ORD-1091', customer: 'Priya Patel', type: 'Takeaway', table: 'Counter', items: 2, total: 890, status: 'Ready', prepTime: '12 mins' },
    { id: 'ORD-1090', customer: 'Vikram Mehta', type: 'Delivery', table: 'App', items: 4, total: 2150, status: 'Served', prepTime: '20 mins' },
    { id: 'ORD-1089', customer: 'Ananya Roy', type: 'Dine-In', table: 'T-08', items: 5, total: 3200, status: 'Preparing', prepTime: '5 mins' },
  ]);

  const [shiftNotes, setShiftNotes] = useState<string[]>([
    'Ensure Giri Fine Dining table #12 is reserved for VIP guest at 8:00 PM.',
    'Stock refill for Dutch Dark Chocolate Cake mix arriving at 3:00 PM.',
    'Staff briefing scheduled for 4:00 PM shift change.'
  ]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    Promise.allSettled([
      orderApi.getOrders(),
      reservationApi.getReservations(),
      tableApi.getTables(),
      inventoryApi.getItems(),
    ]).then(([ordersRes, resRes, tblRes, invRes]) => {
      let ordersList = ordersRes.status === 'fulfilled' && ordersRes.value?.data ? ordersRes.value.data : [];
      let invList = invRes.status === 'fulfilled' && invRes.value?.data ? invRes.value.data : [];

      if (ordersList.length > 0) {
        const rev = ordersList.reduce((sum: number, o: any) => sum + (o.finalAmount || o.totalAmount || 0), 0);
        setStats((prev) => ({
          ...prev,
          revenue: rev || prev.revenue,
          activeOrders: ordersList.length,
        }));
        setLiveOrders(ordersList.slice(0, 5));
      }
      if (invList.length > 0) {
        const low = invList.filter((i: any) => (i.quantity || 0) <= (i.minThreshold || 5)).length;
        setStats((prev) => ({ ...prev, lowStockCount: low }));
      }
    });
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setShiftNotes([newNote.trim(), ...shiftNotes]);
    setNewNote('');
  };

  const MANAGER_MODULES = [
    { label: 'Live Orders & POS', href: '/admin/orders', icon: ShoppingBag, color: 'bg-red-500/10 text-red-700 border-red-200', desc: 'Active Orders Queue' },
    { label: 'Floor & Table Layout', href: '/admin/tables', icon: Calendar, color: 'bg-blue-500/10 text-blue-700 border-blue-200', desc: '15/20 Tables Seated' },
    { label: 'Kitchen KDS Speed', href: '/admin/kitchen', icon: Flame, color: 'bg-orange-500/10 text-orange-700 border-orange-200', desc: '5 Orders in Prep' },
    { label: 'Stock & Inventory Alerts', href: '/admin/inventory', icon: Boxes, color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200', desc: '2 Low Stock Alerts' },
    { label: 'Merchants & Outlets', href: '/admin/merchants', icon: Building2, color: 'bg-rose-500/10 text-rose-700 border-rose-200', desc: '8 Active Outlets' },
    { label: 'Staff & Shift Roster', href: '/admin/employees', icon: UserCheck, color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200', desc: '12 Active Staff' },
    { label: 'Daily Shift Reports', href: '/admin/reports', icon: BarChart3, color: 'bg-[#C8A055]/15 text-[#8B0000] border-[#C8A055]/30', desc: 'Sales & Shift Analytics' },
    { label: 'Menu & Out-of-Stock', href: '/admin/menu', icon: Utensils, color: 'bg-amber-500/10 text-amber-700 border-amber-200', desc: '1026+ Items Listed' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#8B0000]" />
            <h1 className="text-2xl font-extrabold text-[#1a1008] tracking-tight">Restaurant Operations & Manager Console</h1>
          </div>
          <p className="text-xs text-[#6b5840] mt-0.5">Live floor monitoring, active order fulfillment, shift rosters & stock alerts</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-extrabold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-700" /> Morning Shift (08:00 - 16:00)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Live Sync
          </span>
        </div>
      </div>

      {/* KPI Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-[#8B0000]/10 bg-white flex items-center justify-between shadow-xs hover:shadow-md transition-all">
          <div className="space-y-1">
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider">Shift Store Sales</span>
            <h3 className="text-xl font-extrabold text-[#8B0000]">{formatCurrency(stats.revenue)}</h3>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600">
              <TrendingUp className="w-3 h-3" /> +14.2% vs yesterday
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center font-bold text-lg shrink-0">
            ₹
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-[#8B0000]/10 bg-white flex items-center justify-between shadow-xs hover:shadow-md transition-all">
          <div className="space-y-1">
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider">Live Orders Queue</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{stats.activeOrders} Orders</h3>
            <div className="text-[10px] font-bold text-blue-600">8 Dine-In • 4 Takeaway • 2 Delivery</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-[#8B0000]/10 bg-white flex items-center justify-between shadow-xs hover:shadow-md transition-all">
          <div className="space-y-1">
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider">Floor Occupancy</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{stats.tableOccupancy}% Occupied</h3>
            <div className="text-[10px] font-bold text-emerald-600">{stats.activeTables}/{stats.totalTables} Tables Active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-[#8B0000]/10 bg-white flex items-center justify-between shadow-xs hover:shadow-md transition-all">
          <div className="space-y-1">
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider">Staff On Shift</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{stats.staffOnShift} Staff</h3>
            <div className="text-[10px] font-bold text-purple-600">3 Waiters • 4 Chefs • 2 Cashiers</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-[#8B0000]/10 bg-white flex items-center justify-between shadow-xs hover:shadow-md transition-all">
          <div className="space-y-1">
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider">Stock Alerts</span>
            <h3 className="text-xl font-extrabold text-amber-600">{stats.lowStockCount} Items Low</h3>
            <div className="text-[10px] font-bold text-red-600">Refill Required Today</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Main Grid: Live Orders Tracker & Manager Shift Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Live Orders Tracker (2 cols) */}
        <div className="lg:col-span-2 glass-card p-5 rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">Live Floor Order Tracker</h2>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1">
              View All POS Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F5F0] text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Type / Location</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8B0000]/10 font-medium">
                {liveOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                    <td className="p-3 font-extrabold text-[#8B0000] font-mono">{ord.id}</td>
                    <td className="p-3 font-bold text-[#1a1008]">{ord.customer}</td>
                    <td className="p-3">
                      <span className="font-bold text-[#4a3820]">{ord.type}</span>
                      <span className="text-[10px] text-[#a09070] block font-mono">{ord.table}</span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-[#1a1008]">
                      {formatCurrency(ord.total || 0)}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        ord.status === 'Ready'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : ord.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {ord.status} ({ord.prepTime})
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Link
                        href="/admin/orders"
                        className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold border border-[#8B0000]/30 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manager Shift Notice Board (1 col) */}
        <div className="glass-card p-5 rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">Shift Handover Notes</h2>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                {shiftNotes.length} Notes
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {shiftNotes.map((note, idx) => (
                <div key={idx} className="p-3 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-2xl text-xs font-medium text-[#4a3820] flex items-start gap-2">
                  <span className="text-[#8B0000] font-extrabold">•</span>
                  <span className="flex-1">{note}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddNote} className="pt-3 border-t border-[#8B0000]/10 flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add shift handover note..."
              className="flex-1 bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#8B0000]"
            />
            <button
              type="submit"
              className="btn-crimson p-2 rounded-xl text-white cursor-pointer shrink-0"
              title="Add Note"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
