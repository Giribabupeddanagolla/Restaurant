'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  IndianRupee,
  Utensils,
  Store,
  ExternalLink,
  Edit,
  SlidersHorizontal,
  X,
  Clock
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface Merchant {
  id: string;
  name: string;
  code: string;
  category: string;
  outletsCount: number;
  dishesCount: number;
  monthlySales: number;
  commissionRate: number;
  status: 'Active' | 'Under Review' | 'Suspended';
  contactPerson: string;
  email: string;
  phone: string;
  joinedDate: string;
}

const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'mer-1',
    name: 'Giri Bakery & Artisan Confectionery',
    code: 'GB-BAKERY',
    category: 'Bakery & Desserts',
    outletsCount: 4,
    dishesCount: 134,
    monthlySales: 245000,
    commissionRate: 12.5,
    status: 'Active',
    contactPerson: 'Ananya Sharma',
    email: 'bakery@girirestaurant.com',
    phone: '+91 98765 43210',
    joinedDate: '2024-01-15',
  },
  {
    id: 'mer-2',
    name: 'Giri Grill & Wood-Fired Smokehouse',
    code: 'GG-GRILL',
    category: 'Grill & BBQ',
    outletsCount: 3,
    dishesCount: 136,
    monthlySales: 380000,
    commissionRate: 15.0,
    status: 'Active',
    contactPerson: 'Vikram Singh',
    email: 'grill@girirestaurant.com',
    phone: '+91 98765 43211',
    joinedDate: '2024-02-01',
  },
  {
    id: 'mer-3',
    name: 'Giri Coastal Seafood Shack',
    code: 'GS-SEAFOOD',
    category: 'Coastal Seafood',
    outletsCount: 5,
    dishesCount: 218,
    monthlySales: 412000,
    commissionRate: 18.0,
    status: 'Active',
    contactPerson: 'Rajesh Nair',
    email: 'seafood@girirestaurant.com',
    phone: '+91 98765 43212',
    joinedDate: '2024-02-20',
  },
  {
    id: 'mer-4',
    name: 'Giri Artisanal Café & Espresso Bar',
    code: 'GC-CAFE',
    category: 'Café & Beverages',
    outletsCount: 6,
    dishesCount: 232,
    monthlySales: 195000,
    commissionRate: 14.0,
    status: 'Active',
    contactPerson: 'Meera Deshmukh',
    email: 'cafe@girirestaurant.com',
    phone: '+91 98765 43213',
    joinedDate: '2024-03-05',
  },
  {
    id: 'mer-5',
    name: 'Giri Express Bistro & Quick Bites',
    code: 'GE-BISTRO',
    category: 'Fast Casual',
    outletsCount: 4,
    dishesCount: 106,
    monthlySales: 178000,
    commissionRate: 12.0,
    status: 'Active',
    contactPerson: 'Siddharth Rao',
    email: 'bistro@girirestaurant.com',
    phone: '+91 98765 43214',
    joinedDate: '2024-03-18',
  },
  {
    id: 'mer-6',
    name: 'Giri Spice Garden South Delights',
    code: 'GSG-SPICE',
    category: 'Authentic Indian',
    outletsCount: 3,
    dishesCount: 172,
    monthlySales: 290000,
    commissionRate: 16.0,
    status: 'Active',
    contactPerson: 'Karthik Reddy',
    email: 'spicegarden@girirestaurant.com',
    phone: '+91 98765 43215',
    joinedDate: '2024-04-02',
  },
  {
    id: 'mer-7',
    name: 'Giri Royal Fine Dining Lounge',
    code: 'GFD-[#FINE]',
    category: 'Luxury Fine Dining',
    outletsCount: 2,
    dishesCount: 100,
    monthlySales: 540000,
    commissionRate: 20.0,
    status: 'Active',
    contactPerson: 'Chef Marco Rossi',
    email: 'finedining@girirestaurant.com',
    phone: '+91 98765 43216',
    joinedDate: '2024-04-10',
  },
  {
    id: 'mer-8',
    name: 'Giri Homestyle Kitchen Thalis',
    code: 'GK-KITCHEN',
    category: 'Comfort Meals & Thalis',
    outletsCount: 1,
    dishesCount: 30,
    monthlySales: 120000,
    commissionRate: 15.0,
    status: 'Active',
    contactPerson: 'Sunita Giri',
    email: 'kitchen@girirestaurant.com',
    phone: '+91 98765 43217',
    joinedDate: '2024-05-01',
  },
  {
    id: 'mer-9',
    name: 'Giri Royal Sweets & Chaat House',
    code: 'GR-SWEETS',
    category: 'Bakery & Desserts',
    outletsCount: 2,
    dishesCount: 0,
    monthlySales: 0,
    commissionRate: 15.0,
    status: 'Under Review',
    contactPerson: 'Ramesh Giri',
    email: 'sweets@girirestaurant.com',
    phone: '+91 98765 43218',
    joinedDate: '2026-08-14',
  },
  {
    id: 'mer-10',
    name: 'Giri Artisanal Ice Cream & Gelato',
    code: 'GA-GELATO',
    category: 'Café & Beverages',
    outletsCount: 1,
    dishesCount: 0,
    monthlySales: 0,
    commissionRate: 14.0,
    status: 'Under Review',
    contactPerson: 'Anita Roy',
    email: 'gelato@girirestaurant.com',
    phone: '+91 98765 43219',
    joinedDate: '2026-08-14',
  },
];

export default function MerchantManagementPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(INITIAL_MERCHANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
    if (pending.length > 0) {
      setMerchants((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const newOnes = pending.filter((p: any) => !existingIds.has(p.id));
        return [...newOnes, ...prev];
      });
    }
  }, []);

  // New Merchant Form State
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    commissionRate: 15.0,
  });

  const handleCreateMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchant.name || !newMerchant.email) return;

    const created: Merchant = {
      id: `mer-${Date.now()}`,
      name: newMerchant.name,
      code: `MER-${newMerchant.name.slice(0, 3).toUpperCase()}`,
      category: 'General Dining',
      outletsCount: 1,
      dishesCount: 25,
      monthlySales: 85000,
      commissionRate: Number(newMerchant.commissionRate) || 15.0,
      status: 'Active',
      contactPerson: newMerchant.contactPerson || 'Store Manager',
      email: newMerchant.email,
      phone: newMerchant.phone || '+91 90000 00000',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setMerchants([created, ...merchants]);
    setShowAddModal(false);
    setNewMerchant({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      commissionRate: 15.0,
    });
  };

  const toggleStatus = (id: string) => {
    setMerchants(merchants.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Suspended' : 'Active';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const filteredMerchants = merchants.filter(m => {
    const matchesQuery = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalMonthlySales = merchants.reduce((sum, m) => sum + m.monthlySales, 0);
  const totalOutlets = merchants.reduce((sum, m) => sum + m.outletsCount, 0);
  const totalDishes = merchants.reduce((sum, m) => sum + m.dishesCount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#8B0000]" />
            <h1 className="text-2xl font-extrabold text-[#1a1008] tracking-tight">Merchant & Vendor Management</h1>
          </div>
          <p className="text-xs text-[#6b5840] mt-0.5">Manage partner brands, multi-outlet merchants, commission rates, and payouts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Onboard New Merchant
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Merchant Partners</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{merchants.length} Brands</h3>
            <span className="text-[10px] font-bold text-emerald-600">100% Operational</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Total Outlets</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{totalOutlets} Outlets</h3>
            <span className="text-[10px] font-bold text-purple-600">{totalDishes} Active Dishes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Monthly Gross Volume</span>
            <h3 className="text-xl font-extrabold text-[#8B0000]">{formatCurrency(totalMonthlySales)}</h3>
            <span className="text-[10px] font-bold text-emerald-600">+18.5% Growth</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center font-bold">
            ₹
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Avg Commission</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">15.2%</h3>
            <span className="text-[10px] font-bold text-blue-600">Automated Settlements</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search merchant name, code, or contact..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#6b5840] whitespace-nowrap">Filter Status:</span>
          {['All', 'Active', 'Under Review', 'Suspended'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB]'
              }`}
            >
              {st} {st === 'Under Review' && '(Pending)'}
            </button>
          ))}
        </div>
      </div>

      {/* Merchants Table */}
      <div className="glass-card rounded-2xl bg-white border border-[#8B0000]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Merchant / Partner Brand</th>
                <th className="p-3.5 text-center">Dishes</th>
                <th className="p-3.5 text-right">Monthly Sales</th>
                <th className="p-3.5 text-center">Commission</th>
                <th className="p-3.5">Contact Person</th>
                <th className="p-3.5 text-center">Approval Status</th>
                <th className="p-3.5 text-center">Admin Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                        {merchant.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-xs text-[#1a1008]">{merchant.name}</div>
                        <div className="text-[10px] text-[#a09070] font-bold font-mono">{merchant.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-center font-bold text-gray-700">{merchant.dishesCount}</td>
                  <td className="p-3.5 text-right font-extrabold text-[#1a1008]">
                    {formatCurrency(merchant.monthlySales)}
                  </td>
                  <td className="p-3.5 text-center font-bold text-emerald-700 bg-emerald-50/50 rounded-lg">
                    {merchant.commissionRate}%
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-xs">{merchant.contactPerson}</div>
                    <div className="text-[10px] text-[#a09070]">{merchant.email}</div>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      merchant.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : merchant.status === 'Under Review'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {merchant.status === 'Active' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : merchant.status === 'Under Review' ? (
                        <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-600" />
                      )}
                      {merchant.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    {merchant.status === 'Under Review' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setMerchants(merchants.map(m => m.id === merchant.id ? { ...m, status: 'Active' } : m));
                            const pending = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
                            const updated = pending.map((p: any) => p.id === merchant.id || p.name === merchant.name ? { ...p, status: 'Active' } : p);
                            localStorage.setItem('giri_pending_merchant_requests', JSON.stringify(updated));
                          }}
                          className="px-3 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Approve Request
                        </button>
                        <button
                          onClick={() => {
                            setMerchants(merchants.map(m => m.id === merchant.id ? { ...m, status: 'Suspended' } : m));
                          }}
                          className="px-2 py-1 rounded-lg text-[10px] font-extrabold border border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleStatus(merchant.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all cursor-pointer ${
                          merchant.status === 'Active'
                            ? 'border-red-200 text-red-700 hover:bg-red-50'
                            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {merchant.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Merchant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-base font-extrabold text-[#1a1008]">Onboard New Merchant</h2>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#a09070] hover:text-[#8B0000]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMerchant} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Merchant Partner Name *</label>
                <input
                  type="text"
                  required
                  value={newMerchant.name}
                  onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
                  placeholder="e.g. Giri Royal Sweets & Snacks"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Contact Person Name</label>
                <input
                  type="text"
                  value={newMerchant.contactPerson}
                  onChange={(e) => setNewMerchant({ ...newMerchant, contactPerson: e.target.value })}
                  placeholder="Owner / Store Manager Name"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newMerchant.email}
                    onChange={(e) => setNewMerchant({ ...newMerchant, email: e.target.value })}
                    placeholder="merchant@girirestaurant.com"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Phone</label>
                  <input
                    type="text"
                    value={newMerchant.phone}
                    onChange={(e) => setNewMerchant({ ...newMerchant, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newMerchant.commissionRate}
                  onChange={(e) => setNewMerchant({ ...newMerchant, commissionRate: Number(e.target.value) })}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer"
                >
                  Save Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
