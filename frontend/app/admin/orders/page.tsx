'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatters';
import { orderApi } from '@/services/restaurantService';
import {
  ShoppingBag, Clock, CheckCircle2, Plus, Search, Filter, RefreshCw,
  Sparkles, Eye, Trash2, Flame, Utensils, DollarSign, Mail, Phone,
  Receipt, AlertCircle, Check, X, ShieldAlert, Menu, SlidersHorizontal
} from 'lucide-react';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface LiveOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  tableNumber?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'UPI / Online' | 'Credit/Debit Card' | 'Cash';
  paymentStatus: 'Paid' | 'Pending';
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const INITIAL_ORDERS: LiveOrder[] = [
  {
    id: 'ord-1',
    orderId: '#GIRI-9821',
    customerName: 'Rajesh K.',
    customerPhone: '+1 (555) 234-5678',
    customerEmail: 'rajesh.k@example.com',
    orderType: 'Dine-In',
    tableNumber: 'Table 4 (VIP)',
    items: [
      { name: 'Truffle Mushroom Risotto', price: 650, quantity: 2 },
      { name: 'Fresh Mint Lemonade', price: 150, quantity: 2 },
    ],
    totalAmount: 1600,
    paymentMethod: 'UPI / Online',
    paymentStatus: 'Paid',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: 'ord-2',
    orderId: '#GIRI-9822',
    customerName: 'Sophia Williams',
    customerPhone: '+1 (555) 345-6789',
    customerEmail: 'sophia.w@example.com',
    orderType: 'Dine-In',
    tableNumber: 'Table 2',
    items: [
      { name: 'Smoked Wagyu Beef Burger', price: 780, quantity: 1 },
      { name: 'Truffle Parmesan Fries', price: 280, quantity: 1 },
      { name: 'Molten Chocolate Lava Cake', price: 350, quantity: 1 },
    ],
    totalAmount: 1410,
    paymentMethod: 'Credit/Debit Card',
    paymentStatus: 'Paid',
    status: 'Ready',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 'ord-3',
    orderId: '#GIRI-9823',
    customerName: 'David Chen',
    customerPhone: '+1 (555) 456-7890',
    customerEmail: 'david.c@example.com',
    orderType: 'Takeaway',
    items: [
      { name: 'Artisanal Margherita Pizza', price: 550, quantity: 2 },
      { name: 'Iced Artisan Latte', price: 220, quantity: 2 },
    ],
    totalAmount: 1540,
    paymentMethod: 'UPI / Online',
    paymentStatus: 'Paid',
    status: 'Pending',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'ord-4',
    orderId: '#GIRI-9824',
    customerName: 'Elena Rostova',
    customerPhone: '+1 (555) 567-8901',
    customerEmail: 'elena.r@example.com',
    orderType: 'Delivery',
    items: [
      { name: 'Crispy Pan-Seared Salmon', price: 850, quantity: 1 },
      { name: 'Truffle Mushroom Risotto', price: 650, quantity: 1 },
    ],
    totalAmount: 1500,
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    status: 'Completed',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<LiveOrder[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<LiveOrder | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State for Manual Order
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '+1 (555) ',
    customerEmail: 'guest@example.com',
    orderType: 'Dine-In' as 'Dine-In' | 'Takeaway' | 'Delivery',
    tableNumber: 'Table 1',
    selectedDish: 'Truffle Mushroom Risotto',
    dishQuantity: 2,
    dishPrice: 650,
    paymentMethod: 'UPI / Online' as 'UPI / Online' | 'Credit/Debit Card' | 'Cash',
    status: 'Preparing' as 'Pending' | 'Preparing' | 'Ready' | 'Completed',
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getOrders();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setOrders(res.data);
        localStorage.setItem('giri_live_orders', JSON.stringify(res.data));
      } else {
        loadStoredOrders();
      }
    } catch (err) {
      loadStoredOrders();
    } finally {
      setLoading(false);
    }
  };

  const loadStoredOrders = () => {
    const saved = localStorage.getItem('giri_live_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setOrders(INITIAL_ORDERS);
    localStorage.setItem('giri_live_orders', JSON.stringify(INITIAL_ORDERS));
  };

  useEffect(() => {
    // 1. Instant 0ms load from localStorage
    loadStoredOrders();
    // 2. Silent background sync
    orderApi.getOrders().then((res) => {
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setOrders(res.data);
        localStorage.setItem('giri_live_orders', JSON.stringify(res.data));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || activeReceiptOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, activeReceiptOrder]);

  const saveOrdersState = (newList: LiveOrder[]) => {
    setOrders(newList);
    localStorage.setItem('giri_live_orders', JSON.stringify(newList));
  };

  const handleOpenAddModal = () => {
    setFormData({
      customerName: '',
      customerPhone: '+1 (555) 000-0000',
      customerEmail: 'guest@example.com',
      orderType: 'Dine-In',
      tableNumber: 'Table 1',
      selectedDish: 'Truffle Mushroom Risotto',
      dishQuantity: 2,
      dishPrice: 650,
      paymentMethod: 'UPI / Online',
      status: 'Preparing',
    });
    setIsModalOpen(true);
  };

  const handleSaveOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      setMessage({ type: 'error', text: 'Please fill in Customer Name and Phone Number.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const totalVal = formData.dishPrice * formData.dishQuantity;
    const newOrd: LiveOrder = {
      id: `ord-${Date.now()}`,
      orderId: `#GIRI-${Math.floor(9000 + Math.random() * 999)}`,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      orderType: formData.orderType,
      tableNumber: formData.orderType === 'Dine-In' ? formData.tableNumber : undefined,
      items: [{ name: formData.selectedDish, price: formData.dishPrice, quantity: formData.dishQuantity }],
      totalAmount: totalVal,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'Paid',
      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    try {
      await orderApi.createOrder(newOrd as any);
    } catch (err) {
      console.log('Saved locally');
    }

    const updatedList = [newOrd, ...orders];
    saveOrdersState(updatedList);
    setIsModalOpen(false);
    setSaving(false);
    setMessage({ type: 'success', text: `Manual Order ${newOrd.orderId} created!` });
  };

  const handleUpdateStatus = async (order: LiveOrder, newStatus: LiveOrder['status']) => {
    const id = order.id || (order as any)._id;
    const updated = orders.map((o) =>
      ((o.id || (o as any)._id) === id || o.orderId === order.orderId) ? { ...o, status: newStatus } : o
    );
    saveOrdersState(updated);

    try {
      if (id) await orderApi.updateOrderStatus(id, newStatus);
    } catch (err) {
      console.log('Updated locally');
    }
    setMessage({ type: 'success', text: `Order ${order.orderId} updated to ${newStatus}!` });
  };

  const handleDeleteOrder = async (order: LiveOrder) => {
    if (!confirm(`Are you sure you want to cancel & delete Order ${order.orderId}?`)) return;

    const id = order.id || (order as any)._id;
    const updated = orders.filter((o) => (o.id || (o as any)._id) !== id && o.orderId !== order.orderId);
    saveOrdersState(updated);

    try {
      if (id) await orderApi.deleteOrder(id);
    } catch (err) {
      console.log('Deleted locally');
    }
    setMessage({ type: 'success', text: `Order ${order.orderId} removed.` });
  };

  // Metrics
  const activeOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenueToday = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);

  // Filtered List
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      search === '' ||
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search) ||
      (o.tableNumber && o.tableNumber.toLowerCase().includes(search.toLowerCase())) ||
      o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    const matchesType = selectedType === 'all' || o.orderType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Preparing':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Ready':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Pending':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-900 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" /> Real-Time Kitchen & POS Queue
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Live Order Management
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Monitor incoming dine-in, takeaway, and delivery orders with instant status dispatch controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs cursor-pointer"
            title="Refresh Orders Queue"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Manual Order
          </button>
        </div>
      </div>

      {/* Toast Notification */}
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
          <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Total Orders Today</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{orders.length}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-amber-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-800 uppercase">Active Kitchen Queue</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{activeOrdersCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-emerald-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase">Completed / Served</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{completedOrdersCount}</div>
          </div>
        </div>

        <div className="glass-card bg-white p-5 rounded-2xl border border-[#8B0000]/15 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#a09070] uppercase">Today's Revenue</div>
            <div className="text-xl font-extrabold text-[#1a1008]">{formatCurrency(totalRevenueToday)}</div>
          </div>
        </div>
      </div>

      {/* Search & Outlets Filter Bar */}
      <div className="relative w-full mb-6 z-20">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, or dish item..."
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

            {/* Frameless Filter Toggle Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1.5 text-[#8B0000] hover:text-[#a00000] hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
              title="Toggle Order Filters"
              aria-label="Toggle Order Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
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
                
                {/* Status Filter Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider border-b border-[#8B0000]/10 flex items-center justify-between">
                    <span>Order Status</span>
                    {selectedStatus !== 'all' && (
                      <span
                        onClick={() => setSelectedStatus('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',       label: 'All Orders',   icon: '📋' },
                      { id: 'Pending',   label: 'Pending',      icon: '⏳' },
                      { id: 'Preparing', label: 'Preparing',    icon: '🔥' },
                      { id: 'Ready',     label: 'Ready',        icon: '✅' },
                      { id: 'Completed', label: 'Completed',    icon: '🏁' },
                      { id: 'Cancelled', label: 'Cancelled',    icon: '❌' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedStatus(st.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedStatus === st.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{st.icon}</span>
                          <span>{st.label}</span>
                        </span>
                        {selectedStatus === st.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Type Section */}
                <div className="space-y-1 pt-2 border-t border-[#8B0000]/10">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#8B0000] uppercase tracking-wider flex items-center justify-between">
                    <span>Order Type</span>
                    {selectedType !== 'all' && (
                      <span
                        onClick={() => setSelectedType('all')}
                        className="text-[9px] text-[#8B0000] hover:underline font-bold cursor-pointer"
                      >
                        Reset
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    {[
                      { id: 'all',      label: 'All Types', icon: '🍽️' },
                      { id: 'Dine-In',  label: 'Dine-In',   icon: '🪑' },
                      { id: 'Takeaway', label: 'Takeaway',  icon: '🛍️' },
                      { id: 'Delivery', label: 'Delivery',  icon: '🛵' },
                    ].map((tp) => (
                      <button
                        key={tp.id}
                        onClick={() => {
                          setSelectedType(tp.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedType === tp.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{tp.icon}</span>
                          <span>{tp.label}</span>
                        </span>
                        {selectedType === tp.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

      {/* Orders Table */}
      <div className="glass-card bg-white rounded-2xl border border-[#8B0000]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1a1008] border-collapse">
            <thead className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] uppercase text-[10px] font-extrabold tracking-wider">
              <tr>
                <th className="px-4 py-3.5 min-w-[150px] whitespace-nowrap">Order Ref & Customer</th>
                <th className="px-4 py-3.5 min-w-[180px] whitespace-nowrap">Contact Details</th>
                <th className="px-4 py-3.5 min-w-[160px] whitespace-nowrap">Order Type & Table</th>
                <th className="px-4 py-3.5 min-w-[220px] whitespace-nowrap">Ordered Items</th>
                <th className="px-4 py-3.5 min-w-[150px] whitespace-nowrap">Total & Payment</th>
                <th className="px-4 py-3.5 min-w-[120px] whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 min-w-[170px] text-center whitespace-nowrap">Status Control</th>
                <th className="px-4 py-3.5 min-w-[100px] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium">
              {filteredOrders.map((ord) => (
                <tr key={ord.id || (ord as any)._id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-4 py-3.5 align-middle">
                    <span className="inline-block text-[10px] font-extrabold text-[#8B0000] bg-[#FFF8F0] border border-[#8B0000]/20 px-2 py-0.5 rounded whitespace-nowrap">
                      {ord.orderId}
                    </span>
                    <div className="font-extrabold text-sm text-[#1a1008] mt-1 whitespace-nowrap truncate max-w-[140px]" title={ord.customerName}>{ord.customerName}</div>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-[#6b5840] font-semibold flex items-center gap-1 text-xs truncate max-w-[170px]">
                      <Mail className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> <span className="truncate">{ord.customerEmail}</span>
                    </div>
                    <div className="text-[11px] text-[#a09070] flex items-center gap-1 mt-1 whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {ord.customerPhone}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 bg-[#F8F5F0] border border-[#8B0000]/15 text-[#4a3820] font-extrabold rounded-lg text-xs whitespace-nowrap">
                      {ord.orderType} {ord.tableNumber ? `(${ord.tableNumber})` : ''}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <div className="space-y-0.5 max-w-[210px]">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="text-xs font-semibold text-[#1a1008] truncate">
                          • {item.name} <span className="font-extrabold text-[#8B0000]">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <div className="font-extrabold text-sm text-[#8B0000] whitespace-nowrap">
                      {formatCurrency(ord.totalAmount)}
                    </div>
                    <span className="text-[10px] font-bold text-[#a09070] block mt-0.5 whitespace-nowrap">
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${getStatusBadgeStyle(ord.status)}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                      {ord.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(ord, 'Preparing')}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          Start Preparing
                        </button>
                      )}
                      {ord.status === 'Preparing' && (
                        <button
                          onClick={() => handleUpdateStatus(ord, 'Ready')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          Mark Ready
                        </button>
                      )}
                      {ord.status === 'Ready' && (
                        <button
                          onClick={() => handleUpdateStatus(ord, 'Completed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-lg shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          Complete / Serve
                        </button>
                      )}
                      {ord.status !== 'Completed' && ord.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(ord, 'Cancelled')}
                          className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 font-bold text-[10px] rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        onClick={() => setActiveReceiptOrder(ord)}
                        className="p-2 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl transition-all"
                        title="View Receipt"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(ord)}
                        className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Delete Order"
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

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-xs text-[#6b5840]">
            <ShoppingBag className="w-8 h-8 text-[#8B0000] mx-auto mb-2 opacity-50" />
            No live orders found matching your search.
          </div>
        )}
      </div>

      {/* Add Manual Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8B0000]" />
                Create Manual POS Order
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveOrder} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Order Type *</label>
                    <select
                      value={formData.orderType}
                      onChange={(e) => setFormData({ ...formData, orderType: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Dine-In">🍽️ Dine-In Table</option>
                      <option value="Takeaway">🥡 Takeaway Counter</option>
                      <option value="Delivery">🛵 Home Delivery</option>
                    </select>
                  </div>
                </div>

                {formData.orderType === 'Dine-In' && (
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Assigned Table</label>
                    <select
                      value={formData.tableNumber}
                      onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Table 1">Table 1 (Window 2-Seater)</option>
                      <option value="Table 2">Table 2 (Square 4-Seater)</option>
                      <option value="Table 4 (VIP)">Table 4 (VIP Booth 6-Seater)</option>
                      <option value="Table 7 (Grand)">Table 7 (Grand Lounge 8-Seater)</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[#1a1008] font-bold mb-1">Dish Item</label>
                    <select
                      value={formData.selectedDish}
                      onChange={(e) => {
                        const dish = e.target.value;
                        let price = 650;
                        if (dish.includes('Burger')) price = 780;
                        if (dish.includes('Salmon')) price = 850;
                        if (dish.includes('Pizza')) price = 550;
                        setFormData({ ...formData, selectedDish: dish, dishPrice: price });
                      }}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Truffle Mushroom Risotto">Truffle Mushroom Risotto (₹650)</option>
                      <option value="Smoked Wagyu Beef Burger">Smoked Wagyu Beef Burger (₹780)</option>
                      <option value="Crispy Pan-Seared Salmon">Crispy Pan-Seared Salmon (₹850)</option>
                      <option value="Artisanal Margherita Pizza">Artisanal Margherita Pizza (₹550)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.dishQuantity}
                      onChange={(e) => setFormData({ ...formData, dishQuantity: Number(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="UPI / Online">📱 UPI Instant</option>
                      <option value="Credit/Debit Card">💳 Credit / Debit Card</option>
                      <option value="Cash">💵 Cash</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Order Queue Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Preparing">🔥 Preparing (Send to Kitchen)</option>
                      <option value="Ready">✅ Ready for Pickup</option>
                    </select>
                  </div>
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
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Breakdown Modal */}
      {activeReceiptOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#1a1008] flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#8B0000]" />
                  Receipt Details: {activeReceiptOrder.orderId}
                </h3>
                <span className="text-[10px] text-[#a09070]">{activeReceiptOrder.orderType}</span>
              </div>
              <button onClick={() => setActiveReceiptOrder(null)} className="text-[#a09070] hover:text-[#8B0000] font-bold">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FFF8F0] border border-[#8B0000]/10 space-y-1">
                <div className="font-extrabold text-[#1a1008]">{activeReceiptOrder.customerName}</div>
                <div className="text-[11px] text-[#6b5840]">{activeReceiptOrder.customerPhone} • {activeReceiptOrder.customerEmail}</div>
                {activeReceiptOrder.tableNumber && (
                  <div className="text-[11px] text-[#8B0000] font-bold mt-1">Assigned: {activeReceiptOrder.tableNumber}</div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2 border-t border-b border-[#8B0000]/10 py-3">
                <div className="text-[10px] font-bold text-[#a09070] uppercase">Ordered Items:</div>
                {activeReceiptOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center font-semibold">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-extrabold text-[#1a1008]">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="flex justify-between items-center text-sm font-extrabold pt-1">
                <span>Total Amount Paid:</span>
                <span className="text-[#8B0000] text-base">{formatCurrency(activeReceiptOrder.totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveReceiptOrder(null)}
              className="w-full py-2.5 bg-[#8B0000] text-white font-bold text-xs rounded-xl hover:bg-[#6b0000] transition-colors"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
