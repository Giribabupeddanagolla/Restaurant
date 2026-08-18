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
  Clock,
  Eye,
  AlertTriangle,
  Check
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export interface MerchantRequest {
  id: string;
  name: string;
  code: string;
  category: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  commissionRate: number;
  outletsCount: number;
  dishesCount: number;
  monthlySales: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  isApproved: boolean;
  isActive: boolean;
  approvedAt?: string;
  approvedBy?: string;
  registrationDate: string;
}

const INITIAL_MERCHANTS: MerchantRequest[] = [
  {
    id: 'mer-1',
    name: 'Giri Bakery & Artisan Confectionery',
    code: 'GB-BAKERY',
    category: 'Bakery & Desserts',
    ownerName: 'Ananya Sharma',
    email: 'bakery@girirestaurant.com',
    phone: '+91 98765 43210',
    city: 'Hyderabad',
    commissionRate: 12.5,
    outletsCount: 4,
    dishesCount: 134,
    monthlySales: 245000,
    status: 'approved',
    isApproved: true,
    isActive: true,
    registrationDate: '2024-01-15',
  },
  {
    id: 'mer-2',
    name: 'Giri Grill & Wood-Fired Smokehouse',
    code: 'GG-GRILL',
    category: 'Grill & BBQ',
    ownerName: 'Vikram Singh',
    email: 'grill@girirestaurant.com',
    phone: '+91 98765 43211',
    city: 'Bengaluru',
    commissionRate: 15.0,
    outletsCount: 3,
    dishesCount: 136,
    monthlySales: 380000,
    status: 'approved',
    isApproved: true,
    isActive: true,
    registrationDate: '2024-02-01',
  },
  {
    id: 'mer-3',
    name: 'Andhra Spice Restaurant',
    code: 'ANDHRA-SPICE',
    category: 'South Indian',
    ownerName: 'Giri Peddanagolla',
    email: 'andhra.restaurant@gmail.com',
    phone: '+91 98765 99999',
    city: 'Vijayawada',
    commissionRate: 15.0,
    outletsCount: 1,
    dishesCount: 0,
    monthlySales: 0,
    status: 'pending',
    isApproved: false,
    isActive: false,
    registrationDate: '2026-08-16',
  },
  {
    id: 'mer-4',
    name: 'Giri Coastal Seafood Shack',
    code: 'GS-SEAFOOD',
    category: 'Coastal Seafood',
    ownerName: 'Rajesh Nair',
    email: 'seafood@girirestaurant.com',
    phone: '+91 98765 43212',
    city: 'Kochi',
    commissionRate: 18.0,
    outletsCount: 5,
    dishesCount: 218,
    monthlySales: 412000,
    status: 'approved',
    isApproved: true,
    isActive: true,
    registrationDate: '2024-02-20',
  },
  {
    id: 'mer-5',
    name: 'Giri Royal Sweets & Chaat House',
    code: 'GR-SWEETS',
    category: 'Bakery & Desserts',
    ownerName: 'Ramesh Giri',
    email: 'sweets@girirestaurant.com',
    phone: '+91 98765 43218',
    city: 'Chennai',
    commissionRate: 15.0,
    outletsCount: 2,
    dishesCount: 0,
    monthlySales: 0,
    status: 'pending',
    isApproved: false,
    isActive: false,
    registrationDate: '2026-08-15',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Merchants' },
  { id: 'pending', label: 'Pending Requests' },
  { id: 'approved', label: 'Approved Merchants' },
  { id: 'rejected', label: 'Rejected Merchants' },
  { id: 'suspended', label: 'Suspended Merchants' },
];

export default function MerchantManagementPage() {
  const [merchants, setMerchants] = useState<MerchantRequest[]>(INITIAL_MERCHANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMerchantData, setNewMerchantData] = useState({
    name: '',
    category: 'South Indian',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    commissionRate: 15.0,
  });

  // Save to state and persistent storage
  const saveAndSetMerchants = (updatedList: MerchantRequest[]) => {
    setMerchants(updatedList);
    try {
      localStorage.setItem('giri_all_merchants', JSON.stringify(updatedList));

      // Synchronize pending list
      const pendingList = updatedList.map((m) => ({
        id: m.id,
        name: m.name,
        code: m.code,
        category: m.category,
        contactPerson: m.ownerName,
        ownerName: m.ownerName,
        email: m.email,
        phone: m.phone,
        city: m.city,
        commissionRate: m.commissionRate,
        status: m.status,
        isApproved: m.isApproved,
        isActive: m.isActive,
        joinedDate: m.registrationDate,
      }));
      localStorage.setItem('giri_pending_merchant_requests', JSON.stringify(pendingList));
    } catch (e) {}
  };

  // Synchronize localStorage merchant requests & stored list on initial load
  useEffect(() => {
    try {
      const storedAll = JSON.parse(localStorage.getItem('giri_all_merchants') || '[]');
      let baseList = INITIAL_MERCHANTS;
      if (Array.isArray(storedAll) && storedAll.length > 0) {
        baseList = storedAll;
      }

      const pending = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
      if (Array.isArray(pending) && pending.length > 0) {
        const existingMap = new Map(baseList.map((m) => [m.id, m]));
        pending.forEach((p: any) => {
          let itemStatus: any = (p.status || 'pending').toLowerCase();
          if (itemStatus === 'under review' || itemStatus === 'under_review') itemStatus = 'pending';
          if (itemStatus === 'active') itemStatus = 'approved';

          // Preserve existing status if already in baseList
          const existing = existingMap.get(p.id);
          const finalStatus = existing ? existing.status : itemStatus;

          existingMap.set(p.id || `mer-${p.name}`, {
            id: p.id || `mer-${Date.now()}`,
            name: p.name || p.shopName || 'Merchant Partner',
            code: p.code || `MER-${(p.name || 'SHOP').slice(0, 3).toUpperCase()}`,
            category: p.category || 'Multi-Cuisine',
            ownerName: p.contactPerson || p.ownerName || 'Merchant Owner',
            email: p.email || 'partner@restaurant.com',
            phone: p.phone || '+91 90000 00000',
            city: p.city || 'Metropolitan City',
            address: p.address || '',
            commissionRate: p.commissionRate || 15.0,
            outletsCount: p.outletsCount || 1,
            dishesCount: p.dishesCount || 0,
            monthlySales: p.monthlySales || 0,
            status: finalStatus,
            isApproved: finalStatus === 'approved',
            isActive: finalStatus === 'approved',
            registrationDate: p.joinedDate || p.createdAt || new Date().toISOString().split('T')[0],
          });
        });
        const combined = Array.from(existingMap.values());
        setMerchants(combined);
        localStorage.setItem('giri_all_merchants', JSON.stringify(combined));
      } else {
        setMerchants(baseList);
      }
    } catch (e) {}
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchantData.name.trim()) return;

    const codeSlug = newMerchantData.name.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 12);
    const newMer: MerchantRequest = {
      id: `mer-${Date.now()}`,
      name: newMerchantData.name,
      code: codeSlug,
      category: newMerchantData.category,
      ownerName: newMerchantData.ownerName || 'Merchant Owner',
      email: newMerchantData.email || `${codeSlug.toLowerCase()}@restaurant.com`,
      phone: newMerchantData.phone || '+91 98765 00000',
      city: newMerchantData.city || 'Hyderabad',
      commissionRate: Number(newMerchantData.commissionRate) || 15.0,
      outletsCount: 1,
      dishesCount: 5,
      monthlySales: 150000,
      status: 'approved',
      isApproved: true,
      isActive: true,
      registrationDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newMer, ...merchants];
    saveAndSetMerchants(updated);
    setShowAddModal(false);
    setNewMerchantData({
      name: '',
      category: 'South Indian',
      ownerName: '',
      email: '',
      phone: '',
      city: '',
      commissionRate: 15.0,
    });
    showToast(`Merchant partner "${newMer.name}" registered & approved!`);
  };

  // ADMIN APPROVAL ACTION
  const handleApproveMerchant = (m: MerchantRequest) => {
    const approvedAt = new Date().toISOString();
    const approvedBy = 'Admin';

    const updated = merchants.map((item) => {
      if (item.id === m.id) {
        return {
          ...item,
          status: 'approved' as const,
          isApproved: true,
          isActive: true,
          approvedAt,
          approvedBy,
        };
      }
      return item;
    });

    saveAndSetMerchants(updated);

    // Save persistent notifications for merchant
    const notifications = JSON.parse(localStorage.getItem('giri_merchant_notifications') || '[]');
    notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: m.id,
      merchantId: m.id,
      title: '🎉 Merchant Approval Successful!',
      message: 'Your merchant registration has been approved by Admin. You can now access your Merchant Dashboard and add your shop details, food categories, dishes, prices, images, and availability.',
      isRead: false,
      createdAt: approvedAt,
    });
    localStorage.setItem('giri_merchant_notifications', JSON.stringify(notifications));

    // Update active merchant session status
    const currentMerchant = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
    localStorage.setItem(
      'giri_current_merchant',
      JSON.stringify({
        ...currentMerchant,
        id: m.id,
        name: m.name,
        email: m.email,
        status: 'approved',
        isApproved: true,
        isActive: true,
        approvedAt,
        showSuccessBanner: true,
      })
    );

    showToast('Merchant approved successfully.');
  };

  // ADMIN REJECT ACTION
  const handleRejectMerchant = (m: MerchantRequest) => {
    const updated = merchants.map((item) =>
      item.id === m.id
        ? { ...item, status: 'rejected' as const, isApproved: false, isActive: false }
        : item
    );
    saveAndSetMerchants(updated);
    showToast(`Merchant application for "${m.name}" rejected.`);
  };

  // ADMIN SUSPEND ACTION
  const handleSuspendMerchant = (m: MerchantRequest) => {
    const nextStatus = m.status === 'suspended' ? ('approved' as const) : ('suspended' as const);
    const updated = merchants.map((item) =>
      item.id === m.id
        ? {
            ...item,
            status: nextStatus,
            isApproved: nextStatus === 'approved',
            isActive: nextStatus === 'approved',
          }
        : item
    );
    saveAndSetMerchants(updated);
    showToast(
      nextStatus === 'suspended'
        ? `Merchant "${m.name}" suspended.`
        : `Merchant "${m.name}" reinstated.`
    );
  };

  const filteredMerchants = merchants.filter((m) => {
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab !== 'all') {
      matchesTab = m.status === activeTab;
    }

    return matchesQuery && matchesTab;
  });

  const pendingCount = merchants.filter((m) => m.status === 'pending').length;
  const approvedCount = merchants.filter((m) => m.status === 'approved').length;
  const totalMonthlySales = merchants.reduce((sum, m) => sum + m.monthlySales, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#8B0000]" />
            <h1 className="text-2xl font-extrabold text-[#1a1008] tracking-tight">Merchant & Vendor Management</h1>
          </div>
          <p className="text-xs text-[#6b5840] mt-0.5">
            Admin Approval Console • Onboard partners, approve pending applications & set commission rates
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <div className="bg-amber-50 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 text-amber-900 text-xs font-extrabold shrink-0">
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>{pendingCount} Pending Approvals Waiting</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Total Merchants</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">{merchants.length} Brands</h3>
            <span className="text-[10px] font-bold text-emerald-600">{approvedCount} Active Approved</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Pending Applications</span>
            <h3 className="text-xl font-extrabold text-amber-700">{pendingCount} Requests</h3>
            <span className="text-[10px] font-bold text-amber-600">Requires Admin Review</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Monthly Gross Volume</span>
            <h3 className="text-xl font-extrabold text-[#8B0000]">{formatCurrency(totalMonthlySales)}</h3>
            <span className="text-[10px] font-bold text-emerald-600">Across Approved Shops</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center font-bold">
            ₹
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Avg Platform Fee</span>
            <h3 className="text-xl font-extrabold text-[#1a1008]">15.0%</h3>
            <span className="text-[10px] font-bold text-blue-600">Automated Settlements</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation for Merchants Status */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#8B0000]/10">
        {FILTER_TABS.map((tab) => {
          let count = merchants.length;
          if (tab.id !== 'all') {
            count = merchants.filter((m) => m.status === tab.id).length;
          }
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#8B0000] text-white shadow-md'
                  : 'bg-white text-[#4a3820] border border-[#8B0000]/15 hover:bg-[#FFF8F0]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search merchant name, code, owner, email or city..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
        </div>

        <div className="text-xs font-bold text-[#6b5840]">
          Showing <span className="text-[#8B0000] font-extrabold">{filteredMerchants.length}</span> merchant records
        </div>
      </div>

      {/* Merchants Table */}
      <div className="glass-card rounded-2xl bg-white border border-[#8B0000]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Shop / Merchant Name</th>
                <th className="p-3.5">Owner Name</th>
                <th className="p-3.5">Contact Email & Phone</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5 text-center">Outlets & Catalog</th>
                <th className="p-3.5 text-right">Monthly Sales</th>
                <th className="p-3.5 text-center">Fee %</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-[#6b5840] space-y-2">
                    <Building2 className="w-8 h-8 text-[#8B0000] mx-auto opacity-40" />
                    <p className="font-extrabold text-sm">No Merchants Found in this Category</p>
                    <p className="text-xs text-gray-500">Try changing the status tab filter or search keyword.</p>
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                          {merchant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-[#1a1008]">{merchant.name}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-[#a09070] font-bold font-mono">{merchant.code}</span>
                            <span className="text-[9px] bg-rose-50 text-[#8B0000] border border-[#8B0000]/20 px-1.5 py-0.2 rounded-md font-bold">{merchant.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-xs text-gray-800">{merchant.ownerName}</td>

                    <td className="p-3.5">
                      <div className="font-bold text-xs text-[#1a1008]">{merchant.email}</div>
                      <div className="text-[10px] text-[#a09070] font-mono">{merchant.phone}</div>
                    </td>

                    <td className="p-3.5 font-bold text-xs text-gray-700">{merchant.city}</td>

                    <td className="p-3.5 text-center">
                      <span className="font-extrabold text-xs text-[#1a1008] block">{merchant.outletsCount || 1} Outlets</span>
                      <span className="text-[10px] text-[#a09070] font-bold">{merchant.dishesCount || 15} Catalog Dishes</span>
                    </td>

                    <td className="p-3.5 text-right font-extrabold text-xs text-emerald-800">
                      {formatCurrency(merchant.monthlySales || 250000)}
                    </td>

                    <td className="p-3.5 text-center font-extrabold text-xs text-[#8B0000]">
                      {merchant.commissionRate}%
                    </td>

                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          merchant.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : merchant.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : merchant.status === 'rejected'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {merchant.status === 'approved' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : merchant.status === 'pending' ? (
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        {merchant.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedMerchant(merchant)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> View Details
                        </button>

                        {merchant.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveMerchant(merchant)}
                              className="px-3 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleRejectMerchant(merchant)}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold border border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {merchant.status !== 'pending' && (
                          <button
                            onClick={() => handleSuspendMerchant(merchant)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all cursor-pointer ${
                              merchant.status === 'suspended'
                                ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                                : 'border-red-300 text-red-700 hover:bg-red-50'
                            }`}
                          >
                            {merchant.status === 'suspended' ? 'Reinstate' : 'Suspend'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Merchant Details Modal */}
      {selectedMerchant && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-extrabold text-base">
                  {selectedMerchant.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#1a1008]">{selectedMerchant.name}</h2>
                  <span className="text-[11px] text-[#a09070] font-mono font-bold">{selectedMerchant.code}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMerchant(null)}
                className="text-[#a09070] hover:text-[#8B0000] p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Owner Name</span>
                <p className="font-extrabold text-[#1a1008]">{selectedMerchant.ownerName}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Business Category</span>
                <p className="font-extrabold text-[#8B0000]">{selectedMerchant.category}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Registration City</span>
                <p className="font-extrabold text-[#1a1008]">{selectedMerchant.city}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Registered Date</span>
                <p className="font-extrabold text-[#1a1008] font-mono">{selectedMerchant.registrationDate}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Email Address</span>
                <p className="font-extrabold text-[#1a1008] truncate">{selectedMerchant.email}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Phone Number</span>
                <p className="font-extrabold text-[#1a1008] font-mono">{selectedMerchant.phone}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Outlets & Catalog</span>
                <p className="font-extrabold text-[#1a1008]">{selectedMerchant.outletsCount || 1} Outlets • {selectedMerchant.dishesCount || 15} Dishes</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Monthly Sales Volume</span>
                <p className="font-extrabold text-emerald-700">{formatCurrency(selectedMerchant.monthlySales || 250000)}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Account Status</span>
                <p className="font-extrabold text-[#8B0000] capitalize">{selectedMerchant.status}</p>
              </div>

              <div className="bg-[#F8F5F0] p-3 rounded-xl space-y-1">
                <span className="text-[10px] text-[#a09070] font-bold uppercase">Commission Rate</span>
                <p className="font-extrabold text-emerald-700">{selectedMerchant.commissionRate}% Platform Fee</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>FSSAI License & Bank KYC Verified</span>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-mono">FSSAI #23624001928</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#8B0000]/10">
              {selectedMerchant.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApproveMerchant(selectedMerchant);
                      setSelectedMerchant(null);
                    }}
                    className="btn-crimson py-2 px-5 rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Merchant Request
                  </button>
                  <button
                    onClick={() => {
                      handleRejectMerchant(selectedMerchant);
                      setSelectedMerchant(null);
                    }}
                    className="py-2 px-4 rounded-xl text-xs font-extrabold border border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                  >
                    Reject Application
                  </button>
                </>
              )}

              <button
                onClick={() => setSelectedMerchant(null)}
                className="py-2 px-4 rounded-xl text-xs font-extrabold border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Merchant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-base font-extrabold text-[#1a1008]">Register New Merchant Partner</h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#a09070] hover:text-[#8B0000] p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Restaurant / Shop Name *</label>
                <input
                  type="text"
                  required
                  value={newMerchantData.name}
                  onChange={(e) => setNewMerchantData({ ...newMerchantData, name: e.target.value })}
                  placeholder="e.g. Giri Grand Tandoori"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Cuisine Category</label>
                  <select
                    value={newMerchantData.category}
                    onChange={(e) => setNewMerchantData({ ...newMerchantData, category: e.target.value })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold"
                  >
                    <option value="South Indian">South Indian</option>
                    <option value="Biryani & Rice">Biryani & Rice</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Bakery & Desserts">Bakery & Desserts</option>
                    <option value="Grill & BBQ">Grill & BBQ</option>
                    <option value="Coastal Seafood">Coastal Seafood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newMerchantData.commissionRate}
                    onChange={(e) => setNewMerchantData({ ...newMerchantData, commissionRate: Number(e.target.value) })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Owner / Contact Name</label>
                <input
                  type="text"
                  value={newMerchantData.ownerName}
                  onChange={(e) => setNewMerchantData({ ...newMerchantData, ownerName: e.target.value })}
                  placeholder="Owner name"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Email</label>
                  <input
                    type="email"
                    value={newMerchantData.email}
                    onChange={(e) => setNewMerchantData({ ...newMerchantData, email: e.target.value })}
                    placeholder="merchant@example.com"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Phone</label>
                  <input
                    type="text"
                    value={newMerchantData.phone}
                    onChange={(e) => setNewMerchantData({ ...newMerchantData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4a3820] mb-1">Operating City</label>
                <input
                  type="text"
                  value={newMerchantData.city}
                  onChange={(e) => setNewMerchantData({ ...newMerchantData, city: e.target.value })}
                  placeholder="e.g. Hyderabad, Vijayawada"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#8B0000]/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2 px-4 rounded-xl font-extrabold border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson py-2 px-5 rounded-xl font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save & Approve Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
