'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { INITIAL_SHOPS, getStoredShops, saveStoredShops } from '@/data/mockData';
import { Shop } from '@/types';
import { shopApi } from '@/services/restaurantService';
import {
  Plus, Search, Edit2, Trash2, MapPin, Phone, Clock, Star,
  CheckCircle, XCircle, RefreshCw, Store, Sparkles, Menu, X
} from 'lucide-react';

export default function AdminShopsPage() {
  const [shops, setShops] = useState<Shop[]>(getStoredShops);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Shop>>({
    name: '',
    tagline: '',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '20-30 min',
    address: '',
    city: 'Metropolitan City',
    phone: '+1 (555) 987-6543',
    openingHours: '11:00 AM - 11:00 PM',
    isOpen: true,
    isFeatured: true,
  });

  const fetchShops = async () => {
    setLoading(true);
    try {
      const res = await shopApi.getShops();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setShops(res.data);
        saveStoredShops(res.data);
      }
    } catch (err) {
      console.log('Error fetching shops from API, using stored shops');
      setShops(getStoredShops());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // Lock body scroll when modal is open to prevent background scrolling
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

  const handleOpenAddModal = () => {
    setEditingShop(null);
    setFormData({
      name: '',
      tagline: '',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80',
      rating: 4.8,
      deliveryTime: '20-30 min',
      address: '',
      city: 'Metropolitan City',
      phone: '+1 (555) 987-6543',
      openingHours: '11:00 AM - 11:00 PM',
      isOpen: true,
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (shop: Shop) => {
    setEditingShop(shop);
    setFormData({
      name: shop.name,
      tagline: shop.tagline || shop.tag || '',
      image: shop.image,
      rating: shop.rating,
      deliveryTime: shop.deliveryTime || shop.time || '20-30 min',
      address: shop.address || '',
      city: shop.city || 'Metropolitan City',
      phone: shop.phone || '+1 (555) 987-6543',
      openingHours: shop.openingHours || '11:00 AM - 11:00 PM',
      isOpen: shop.isOpen !== false,
      isFeatured: shop.isFeatured !== false,
    });
    setIsModalOpen(true);
  };

  const handleSaveShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) {
      setMessage({ type: 'error', text: 'Shop Name and Image URL are required' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: Shop[] = [];

    try {
      if (editingShop && (editingShop._id || editingShop.id)) {
        const id = editingShop._id || editingShop.id!;
        await shopApi.updateShop(id, formData);
        setMessage({ type: 'success', text: 'Shop location updated successfully!' });
      } else {
        const res = await shopApi.createShop(formData);
        if (res && res.data) {
          updatedList = [res.data, ...shops];
        }
        setMessage({ type: 'success', text: 'New shop location created successfully!' });
      }
      setIsModalOpen(false);
      await fetchShops();
    } catch (err: any) {
      if (editingShop) {
        updatedList = shops.map((s) => (s._id === editingShop._id || s.id === editingShop.id ? { ...s, ...formData } as Shop : s));
      } else {
        const newShop: Shop = { ...formData, id: `shop-${Date.now()}` } as Shop;
        updatedList = [newShop, ...shops];
      }
      setShops(updatedList);
      saveStoredShops(updatedList);
      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Shop location saved!' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteShop = async (shop: Shop) => {
    if (!confirm(`Are you sure you want to delete "${shop.name}"?`)) return;

    const id = shop._id || shop.id;
    const updated = shops.filter((s) => (s._id || s.id) !== id && s.name !== shop.name);
    setShops(updated);
    saveStoredShops(updated);

    try {
      if (id) {
        await shopApi.deleteShop(id);
      }
      setMessage({ type: 'success', text: `Shop "${shop.name}" deleted!` });
    } catch (err) {
      setMessage({ type: 'success', text: `Shop "${shop.name}" removed!` });
    }
  };

  const handleToggleOpenStatus = async (shop: Shop) => {
    const newStatus = !(shop.isOpen !== false);
    const id = shop._id || shop.id;
    const updated = shops.map((s) =>
      ((s._id || s.id) === id || s.name === shop.name) ? { ...s, isOpen: newStatus } : s
    );
    setShops(updated);
    saveStoredShops(updated);

    try {
      if (id) {
        await shopApi.updateShop(id, { isOpen: newStatus });
      }
    } catch (err) {
      console.log('Status updated locally');
    }
  };

  const filteredShops = shops.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.address && s.address.toLowerCase().includes(search.toLowerCase())) ||
      (s.tagline && s.tagline.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'open' && s.isOpen !== false) ||
      (selectedStatus === 'closed' && s.isOpen === false) ||
      (selectedStatus === 'featured' && Boolean(s.isFeatured));

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <Store className="w-4 h-4" /> ERP Location Management
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Shops & Restaurant Outlets
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Dynamically manage shop locations, operating hours, delivery times, and open/closed status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchShops}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add New Shop Location
          </button>
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'bg-red-50 border border-red-300 text-red-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {message.text}
        </div>
      )}

      {/* Search Bar with 3-Lines Filter Dropdown */}
      <div className="glass-card p-3 md:p-4 rounded-2xl bg-white border border-[#8B0000]/10 relative z-30 w-full">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070] z-10 pointer-events-none" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by shop name, tagline, or address..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-12 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]"
          />

          {/* Vertical Divider */}
          <div className="absolute right-11 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-[#8B0000]/20 z-10 pointer-events-none" />

          {/* Three Lines Menu / Filter Button */}
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors z-20 flex items-center justify-center cursor-pointer ${
              showFilterMenu ? 'bg-[#8B0000] text-white shadow-sm' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
            }`}
            title="Toggle Shop Filters"
            aria-label="Toggle Shop Filters"
          >
            {showFilterMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

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
                    <span>Outlet Status Filter</span>
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
                      { id: 'all',      label: 'All Outlets',       icon: '🏪' },
                      { id: 'open',     label: 'Open Now',          icon: '🟢' },
                      { id: 'closed',   label: 'Closed Outlets',    icon: '🔴' },
                      { id: 'featured', label: 'Featured Outlets',  icon: '⭐' },
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
                        {selectedStatus === st.id && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grid of Shops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredShops.map((shop, idx) => (
          <div
            key={shop._id || shop.id || idx}
            className="glass-card bg-white border border-[#8B0000]/15 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
          >
            {/* Shop Image */}
            <div className="relative h-40 w-full bg-[#F8F5F0]">
              <Image src={shop.image} alt={shop.name} fill className="object-cover" sizes="350px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Status Toggle Button */}
              <button
                onClick={() => handleToggleOpenStatus(shop)}
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-md transition-all ${
                  shop.isOpen !== false
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {shop.isOpen !== false ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {shop.isOpen !== false ? 'OPEN' : 'CLOSED'}
              </button>

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-lg text-amber-400 font-bold text-xs flex items-center gap-1 border border-white/20">
                <Star className="w-3 h-3 fill-amber-400" /> {shop.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2.5">
              <div>
                <h3 className="font-extrabold text-[#1a1008] text-base">{shop.name}</h3>
                <p className="text-xs text-[#8B0000] font-semibold mt-0.5">
                  {shop.tagline || shop.tag || 'Gourmet Outlet'}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[#6b5840] pt-2 border-t border-[#8B0000]/10">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{shop.address || 'Central Metropolitan'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C8A055] shrink-0" />
                  <span>{shop.phone || '+1 (555) 987-6543'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#16603A] shrink-0" />
                  <span>{shop.deliveryTime || shop.time || '20-30 min'} • {shop.openingHours || '11 AM - 11 PM'}</span>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="mt-auto pt-3 border-t border-[#8B0000]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEditModal(shop)}
                  className="flex-1 py-2 px-3 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Location
                </button>
                <button
                  onClick={() => handleDeleteShop(shop)}
                  className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                  title="Delete Shop"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <Store className="w-5 h-5 text-[#8B0000]" />
                {editingShop ? 'Edit Shop Location' : 'Add New Shop Location'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveShop} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Shop / Outlet Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Giri Fine Dining"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Tagline / Specialty</label>
                    <input
                      type="text"
                      value={formData.tagline || ''}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Signature Experience"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Rating (1.0 - 5.0)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating || 4.8}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    <span className="text-[10px] text-[#6b5840] font-bold self-center">Presets:</span>
                    {[
                      { label: '🍷 Dining', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80' },
                      { label: '🍳 Bistro', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=360&auto=format&fit=crop&q=80' },
                      { label: '🥐 Bakery', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=360&auto=format&fit=crop&q=80' },
                      { label: '🔥 Grill',  url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=360&auto=format&fit=crop&q=80' },
                      { label: '🍤 Seafood',url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&h=360&auto=format&fit=crop&q=80' },
                      { label: '☕ Café',   url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=360&auto=format&fit=crop&q=80' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className="px-2 py-0.5 bg-[#F8F5F0] hover:bg-[#8B0000] hover:text-white border border-[#8B0000]/20 rounded-md text-[10px] font-bold text-[#8B0000] transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="742 Gourmet Ave, Downtown"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Delivery Time</label>
                    <input
                      type="text"
                      value={formData.deliveryTime || ''}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      placeholder="20-30 min"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Opening Hours</label>
                  <input
                    type="text"
                    value={formData.openingHours || ''}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    placeholder="11:00 AM - 11:00 PM"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:border-[#C8A055]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-[#1a1008] font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isOpen !== false}
                      onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                      className="w-4 h-4 accent-[#8B0000] rounded"
                    />
                    <span>Is Open Now</span>
                  </label>

                  <label className="flex items-center gap-2 text-[#1a1008] font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured !== false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#C8A055] rounded"
                    />
                    <span>Featured Outlet</span>
                  </label>
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
                  className="flex-1 btn-crimson py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Shop Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
