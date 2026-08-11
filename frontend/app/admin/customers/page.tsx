'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatters';
import { customerApi } from '@/services/restaurantService';
import {
  Users, UserPlus, Search, Crown, Award, Gift, DollarSign,
  Filter, Edit2, Trash2, RefreshCw, Sparkles, Heart, Star, Phone, Mail, Menu, X, CheckCircle2
} from 'lucide-react';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyTier: 'VIP Gold' | 'Silver Member' | 'Bronze Regular' | 'New Diner';
  loyaltyPoints: number;
  totalVisits: number;
  totalSpend: number;
  favoriteDish?: string;
  avatar?: string;
  lastVisit?: string;
}

const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'crm-1',
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    phone: '+1 (555) 234-5678',
    loyaltyTier: 'VIP Gold',
    loyaltyPoints: 1250,
    totalVisits: 28,
    totalSpend: 18450,
    favoriteDish: 'Truffle Mushroom Risotto',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastVisit: '2 days ago',
  },
  {
    id: 'crm-2',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 345-6789',
    loyaltyTier: 'VIP Gold',
    loyaltyPoints: 980,
    totalVisits: 19,
    totalSpend: 14200,
    favoriteDish: 'Smoked Wagyu Beef Burger',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastVisit: '5 days ago',
  },
  {
    id: 'crm-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    loyaltyTier: 'Silver Member',
    loyaltyPoints: 640,
    totalVisits: 12,
    totalSpend: 8900,
    favoriteDish: 'Crispy Pan-Seared Salmon',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastVisit: '1 week ago',
  },
  {
    id: 'crm-4',
    name: 'Alex Morgan',
    email: 'alex.m@example.com',
    phone: '+1 (555) 567-8901',
    loyaltyTier: 'Bronze Regular',
    loyaltyPoints: 320,
    totalVisits: 7,
    totalSpend: 4500,
    favoriteDish: 'Artisanal Margherita Pizza',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastVisit: '2 weeks ago',
  },
  {
    id: 'crm-5',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+1 (555) 678-9012',
    loyaltyTier: 'New Diner',
    loyaltyPoints: 100,
    totalVisits: 2,
    totalSpend: 1850,
    favoriteDish: 'Spicy Thai Green Curry',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastVisit: 'Yesterday',
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CustomerProfile>>({
    name: '',
    email: '',
    phone: '+1 (555) ',
    loyaltyTier: 'Bronze Regular',
    loyaltyPoints: 100,
    totalVisits: 1,
    totalSpend: 500,
    favoriteDish: 'Truffle Mushroom Risotto',
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await customerApi.getCustomers();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setCustomers(res.data);
        localStorage.setItem('giri_crm_customers', JSON.stringify(res.data));
      } else {
        loadStoredCustomers();
      }
    } catch (err) {
      loadStoredCustomers();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredCustomers = () => {
    const saved = localStorage.getItem('giri_crm_customers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomers(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setCustomers(INITIAL_CUSTOMERS);
    localStorage.setItem('giri_crm_customers', JSON.stringify(INITIAL_CUSTOMERS));
  };

  useEffect(() => {
    // 1. Instant 0ms load from localStorage
    loadStoredCustomers();
    // 2. Silent background sync
    customerApi.getCustomers().then((res) => {
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setCustomers(res.data);
        localStorage.setItem('giri_crm_customers', JSON.stringify(res.data));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const saveCustomersState = (newCustomers: CustomerProfile[]) => {
    setCustomers(newCustomers);
    localStorage.setItem('giri_crm_customers', JSON.stringify(newCustomers));
  };

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '+1 (555) 000-0000',
      loyaltyTier: 'Bronze Regular',
      loyaltyPoints: 100,
      totalVisits: 1,
      totalSpend: 500,
      favoriteDish: 'Truffle Mushroom Risotto',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: CustomerProfile) => {
    setEditingCustomer(c);
    setFormData({ ...c });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage({ type: 'error', text: 'Please fill in Name and Email address.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: CustomerProfile[] = [];

    try {
      if (editingCustomer) {
        const id = editingCustomer.id || (editingCustomer as any)._id;
        try {
          await customerApi.updateCustomer(id, formData);
        } catch (err) {
          console.log('Updated locally');
        }
        updatedList = customers.map((c) =>
          (c.id || (c as any)._id) === id ? ({ ...c, ...formData } as CustomerProfile) : c
        );
        setMessage({ type: 'success', text: `Diner profile "${formData.name}" updated!` });
      } else {
        try {
          const res = await customerApi.createCustomer(formData);
          if (res && res.data) {
            updatedList = [res.data, ...customers];
          }
        } catch (err) {
          const newCust: CustomerProfile = {
            id: `crm-${Date.now()}`,
            name: formData.name!,
            email: formData.email!,
            phone: formData.phone || '+1 (555) 000-0000',
            loyaltyTier: formData.loyaltyTier || 'New Diner',
            loyaltyPoints: Number(formData.loyaltyPoints) || 100,
            totalVisits: Number(formData.totalVisits) || 1,
            totalSpend: Number(formData.totalSpend) || 500,
            favoriteDish: formData.favoriteDish || 'Chef Special Dish',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            lastVisit: 'Just now',
          };
          updatedList = [newCust, ...customers];
        }
        setMessage({ type: 'success', text: `New customer "${formData.name}" created!` });
      }

      saveCustomersState(updatedList);
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async (c: CustomerProfile) => {
    if (!confirm(`Are you sure you want to delete profile for "${c.name}"?`)) return;

    const id = c.id || (c as any)._id;
    const updated = customers.filter((item) => (item.id || (item as any)._id) !== id && item.name !== c.name);
    saveCustomersState(updated);

    try {
      await customerApi.deleteCustomer(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Customer profile "${c.name}" deleted!` });
  };

  const handleAwardPoints = (c: CustomerProfile, bonus: number) => {
    const id = c.id || (c as any)._id;
    const updated = customers.map((item) =>
      ((item.id || (item as any)._id) === id || item.name === c.name)
        ? { ...item, loyaltyPoints: item.loyaltyPoints + bonus }
        : item
    );
    saveCustomersState(updated);
    setMessage({ type: 'success', text: `Awarded +${bonus} Bonus Loyalty Points to ${c.name}! 🎉` });
  };

  // Metrics
  const totalPoints = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);
  const vipCount = customers.filter((c) => c.loyaltyTier === 'VIP Gold').length;
  const avgSpend = customers.length > 0
    ? Math.round(customers.reduce((sum, c) => sum + c.totalSpend, 0) / customers.length)
    : 0;

  // Filtered List
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesTier = selectedTier === 'all' || c.loyaltyTier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'VIP Gold':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Silver Member':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Bronze Regular':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      default:
        return 'bg-purple-50 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <Users className="w-4 h-4" /> Guest Relationship & Rewards
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Customer CRM & Loyalty
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Manage guest profiles, visit history, loyalty tier perks, and reward points.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs"
            title="Refresh Customers"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add New Customer
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'bg-red-50 border border-red-300 text-red-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          {message.text}
        </div>
      )}

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Diners</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{customers.length}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-amber-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">VIP Gold Members</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{vipCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Reward Points</div>
            <div className="text-xl font-extrabold text-[#1a1008]">{totalPoints.toLocaleString()} pts</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Avg Lifetime Spend</div>
            <div className="text-xl font-extrabold text-[#1a1008]">{formatCurrency(avgSpend)}</div>
          </div>
        </div>
      </div>

      {/* Search Bar with 3-Lines Loyalty Tier Filter Dropdown */}
      <div className="relative w-full z-30">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email, or phone..."
            className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
          />

          {/* Right Action Icons: Clear & Three-Lines Filter Menu */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Frameless 3-Lines Icon Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                showFilterMenu ? 'text-[#8B0000] bg-[#8B0000]/15' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
              }`}
              title="Toggle Loyalty Tier Filters"
              aria-label="Toggle Loyalty Tier Filters"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

          {/* Floating Dropdown Menu */}
          {showFilterMenu && (
            <>
              {/* Backdrop Listener */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowFilterMenu(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[#8B0000]/20 shadow-2xl z-50 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider border-b border-[#8B0000]/10 flex items-center justify-between">
                    <span>Loyalty Tier Filter</span>
                    {selectedTier !== 'all' && (
                      <span
                        onClick={() => setSelectedTier('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',            label: 'All Diners',        icon: '👥' },
                      { id: 'VIP Gold',       label: 'VIP Gold Members',  icon: '👑' },
                      { id: 'Silver Member',  label: 'Silver Members',    icon: '🥈' },
                      { id: 'Bronze Regular', label: 'Bronze Regulars',   icon: '🥉' },
                      { id: 'New Diner',      label: 'New Diners',        icon: '🌟' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTier(t.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedTier === t.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{t.icon}</span>
                          <span>{t.label}</span>
                        </span>
                        {selectedTier === t.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      {/* Customer CRM Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Diner Name</th>
                <th className="px-4 py-3.5 min-w-[200px] whitespace-nowrap">Contact Details</th>
                <th className="px-4 py-3.5 min-w-[140px] whitespace-nowrap">Loyalty Tier</th>
                <th className="px-4 py-3.5 min-w-[120px] whitespace-nowrap">Reward Points</th>
                <th className="px-4 py-3.5 min-w-[100px] whitespace-nowrap">Total Visits</th>
                <th className="px-4 py-3.5 min-w-[130px] whitespace-nowrap">Lifetime Spend</th>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Favorite Dish</th>
                <th className="px-4 py-3.5 min-w-[150px] text-center whitespace-nowrap">Bonus Reward</th>
                <th className="px-4 py-3.5 min-w-[100px] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {filteredCustomers.map((c) => (
                <tr key={c.id || (c as any)._id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#C8A055]/40 shrink-0">
                        {c.avatar ? (
                          <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#8B0000] text-white font-bold flex items-center justify-center text-xs">
                            {c.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-extrabold text-sm text-[#1a1008] whitespace-nowrap truncate max-w-[140px]" title={c.name}>{c.name}</div>
                        <span className="text-[10px] text-[#a09070] whitespace-nowrap block">Last visit: {c.lastVisit || 'Recently'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[#6b5840] font-semibold flex items-center gap-1 text-xs truncate max-w-[190px]">
                      <Mail className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> <span className="truncate">{c.email}</span>
                    </div>
                    <div className="text-[11px] text-[#a09070] flex items-center gap-1 mt-1 whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {c.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border whitespace-nowrap ${getTierBadgeStyle(c.loyaltyTier)}`}>
                      {c.loyaltyTier}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="font-extrabold text-sm text-[#8B0000] flex items-center gap-1 whitespace-nowrap">
                      <Award className="w-4 h-4 text-[#C8A055] shrink-0" /> {c.loyaltyPoints} pts
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle font-extrabold text-[#1a1008] whitespace-nowrap">
                    {c.totalVisits} visits
                  </td>
                  <td className="px-4 py-3.5 align-middle font-extrabold text-emerald-800 whitespace-nowrap">
                    {formatCurrency(c.totalSpend)}
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-xs font-semibold text-[#4a3820] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1 truncate max-w-[160px]" title={c.favoriteDish || 'Signature Dish'}>{c.favoriteDish || 'Signature Dish'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleAwardPoints(c, 50)}
                        className="px-2.5 py-1 bg-amber-50 border border-amber-300 text-amber-900 font-extrabold text-[10px] rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                        title="Award +50 Bonus Points"
                      >
                        +50 Pts
                      </button>
                      <button
                        onClick={() => handleAwardPoints(c, 100)}
                        className="px-2.5 py-1 bg-purple-50 border border-purple-300 text-purple-900 font-extrabold text-[10px] rounded-lg hover:bg-purple-600 hover:text-white transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                        title="Award +100 Bonus Points"
                      >
                        +100 Pts
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(c)}
                        className="p-2 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all"
                        title="Edit Customer Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(c)}
                        className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center text-xs text-[#6b5840]">
            <Users className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
            No customer profiles found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8B0000]" />
                {editingCustomer ? 'Edit Diner Profile' : 'Add New Customer Profile'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveCustomer} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sophia Williams"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Loyalty Tier *</label>
                    <select
                      value={formData.loyaltyTier || 'Bronze Regular'}
                      onChange={(e) => setFormData({ ...formData, loyaltyTier: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="VIP Gold">👑 VIP Gold</option>
                      <option value="Silver Member">🥈 Silver Member</option>
                      <option value="Bronze Regular">🥉 Bronze Regular</option>
                      <option value="New Diner">👤 New Diner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Loyalty Points</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.loyaltyPoints !== undefined ? formData.loyaltyPoints : 100}
                      onChange={(e) => setFormData({ ...formData, loyaltyPoints: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Total Visits</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.totalVisits || 1}
                      onChange={(e) => setFormData({ ...formData, totalVisits: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Total Lifetime Spend (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalSpend || 500}
                      onChange={(e) => setFormData({ ...formData, totalSpend: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Favorite Dish</label>
                  <input
                    type="text"
                    value={formData.favoriteDish || ''}
                    onChange={(e) => setFormData({ ...formData, favoriteDish: e.target.value })}
                    placeholder="e.g. Truffle Mushroom Risotto"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="pt-4 mt-auto border-t border-[#8B0000]/10 bg-white sticky bottom-0 z-10 flex gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#8B0000]/20 text-[#6b5840] font-bold hover:bg-[#F8F5F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-crimson py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Customer Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
