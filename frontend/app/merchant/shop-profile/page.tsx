'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Store, Phone, Mail, MapPin, Clock, IndianRupee, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

import { getStoredShops, saveStoredShops } from '@/data/mockData';
import { Shop } from '@/types';
import API from '@/services/api';

export default function ShopProfilePage() {
  const [formData, setFormData] = useState({
    shopName: 'Giri Spice Garden',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=85',
    banner: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
    description: 'Authentic South & North Indian multi-cuisine fine dining restaurant.',
    phone: '+91 98765 99999',
    email: 'andhra.restaurant@gmail.com',
    address: 'Plot 42, Jubilee Hills Road No 36',
    area: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    openingTime: '11:00 AM',
    closingTime: '11:00 PM',
    deliveryTime: '30-40 mins',
    minimumOrderAmount: 150,
    restaurantStatus: 'Open' as 'Open' | 'Closed' | 'Temporarily Closed',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
      if (cur.name || cur.shopProfile?.shopName) {
        setFormData((prev) => ({
          ...prev,
          ...(cur.shopProfile || {}),
          shopName: cur.name || cur.shopProfile?.shopName || prev.shopName,
          email: cur.email || prev.email,
          phone: cur.phone || prev.phone,
        }));
      }
    } catch (e) {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
    const updatedMerchant = {
      ...cur,
      name: formData.shopName,
      email: formData.email,
      phone: formData.phone,
      shopProfile: formData
    };
    localStorage.setItem('giri_current_merchant', JSON.stringify(updatedMerchant));

    // Register/Update in Public Shops Store so it renders on Home Page & Shops Page
    const newShopObj: Shop = {
      id: cur.id || cur._id || `merchant-shop-${Date.now()}`,
      name: formData.shopName,
      tagline: formData.description,
      image: formData.banner || formData.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      deliveryTime: formData.deliveryTime,
      address: `${formData.address}, ${formData.area}`,
      city: formData.city,
      phone: formData.phone,
      openingHours: `${formData.openingTime} - ${formData.closingTime}`,
      isOpen: formData.restaurantStatus !== 'Closed',
      isFeatured: true,
    };

    const existingShops = getStoredShops();
    const updatedShops = [newShopObj, ...existingShops.filter((s) => s.id !== newShopObj.id && s.name !== newShopObj.name)];
    saveStoredShops(updatedShops);

    // Also update in giri_all_merchants
    try {
      const allM = JSON.parse(localStorage.getItem('giri_all_merchants') || '[]');
      const mIndex = allM.findIndex((m: any) => m.email === cur.email || m.name === cur.name || m.shopName === cur.name);
      if (mIndex >= 0) {
        allM[mIndex] = { ...allM[mIndex], shopName: formData.shopName, name: formData.shopName };
        localStorage.setItem('giri_all_merchants', JSON.stringify(allM));
      }
    } catch (e) {}

    // Synchronize to Backend MongoDB Database
    try {
      const token = localStorage.getItem('royal_auth_token');
      if (token) {
        API.put('/merchant/profile', {
          shopName: formData.shopName,
          description: formData.description,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          logo: formData.logo,
          banner: formData.banner,
          openingTime: formData.openingTime,
          closingTime: formData.closingTime,
          deliveryTime: formData.deliveryTime,
          minimumOrderAmount: formData.minimumOrderAmount,
          restaurantStatus: formData.restaurantStatus,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => {});

        API.post('/shops', newShopObj).catch(() => {});
      }
    } catch (e) {}

    setSavedSuccess(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {savedSuccess && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">Shop Profile updated successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/merchant/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Shop Profile Management</h1>
            <p className="text-xs text-[#6b5840]">Configure public restaurant details, operating hours, delivery radius & status</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 bg-white border border-[#8B0000]/15 shadow-sm space-y-5 text-xs">
        {/* Shop Name & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Shop Name *</label>
            <input
              type="text"
              required
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2.5 outline-none font-bold text-[#1a1008]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Restaurant Operational Status</label>
            <select
              value={formData.restaurantStatus}
              onChange={(e) => setFormData({ ...formData, restaurantStatus: e.target.value as any })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2.5 outline-none font-bold text-[#1a1008]"
            >
              <option value="Open">🟢 Open for Ordering</option>
              <option value="Closed">🔴 Closed</option>
              <option value="Temporarily Closed">🟡 Temporarily Closed</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold text-[#1a1008] mb-1">Shop Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-3 outline-none"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Phone Number *</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Business Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2.5 outline-none"
            />
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Area / Landmark</label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
            />
          </div>
        </div>

        {/* Operating Hours & Order Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Opening Time</label>
            <input
              type="text"
              value={formData.openingTime}
              onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Closing Time</label>
            <input
              type="text"
              value={formData.closingTime}
              onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-[#1a1008] mb-1">Min Order Amount (₹)</label>
            <input
              type="number"
              value={formData.minimumOrderAmount}
              onChange={(e) => setFormData({ ...formData, minimumOrderAmount: Number(e.target.value) })}
              className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold text-[#8B0000]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#8B0000]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {savedSuccess ? (
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>🎉 Shop Profile & Outlet Changes Saved Successfully!</span>
            </div>
          ) : (
            <span className="text-[11px] text-[#6b5840] font-medium">Click Save Changes to update public shop details across the ERP & customer app.</span>
          )}

          <button
            type="submit"
            className="btn-crimson py-3.5 px-8 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
