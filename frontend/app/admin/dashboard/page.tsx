'use client';

import { ShoppingBag, IndianRupee, Calendar, Users, Flame } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1a1008]">Executive ERP Overview</h1>
        <p className="text-xs text-[#6b5840]">Real-time operational metrics for Giri Restaurant</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-[#8B0000]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6b5840] font-semibold">Today's Revenue</p>
            <h3 className="text-xl font-extrabold text-[#1a1008]">₹45,890</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#8B0000]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#8B0000] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6b5840] font-semibold">Total Orders</p>
            <h3 className="text-xl font-extrabold text-[#1a1008]">124</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#8B0000]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6b5840] font-semibold">Bookings</p>
            <h3 className="text-xl font-extrabold text-[#1a1008]">8 Tables</h3>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#8B0000]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#6b5840] font-semibold">Customers</p>
            <h3 className="text-xl font-extrabold text-[#1a1008]">340</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
