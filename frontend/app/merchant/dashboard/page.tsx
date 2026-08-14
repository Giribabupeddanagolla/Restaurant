'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Store,
  Utensils,
  ShoppingBag,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  Clock,
  Edit,
  Plus,
  ArrowRight,
  SlidersHorizontal,
  Boxes,
  Percent,
  Search,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/formatters';

interface DishItem {
  id: string;
  name: string;
  category: string;
  price: number;
  prepTime: string;
  inStock: boolean;
  image: string;
}

const INITIAL_DISHES: DishItem[] = [
  {
    id: 'd-1',
    name: 'Signature Dutch Dark Chocolate Cake',
    category: 'Artisan Cakes & Gateaux',
    price: 650,
    prepTime: '20 mins',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-2',
    name: 'Red Velvet Cream Cheese Layer Cake',
    category: 'Artisan Cakes & Gateaux',
    price: 580,
    prepTime: '15 mins',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-3',
    name: 'Belgian Chocolate Hazelnut Pastry',
    category: 'French Pastries & Tarts',
    price: 240,
    prepTime: '10 mins',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-4',
    name: 'Fresh Strawberry Tartlet',
    category: 'French Pastries & Tarts',
    price: 280,
    prepTime: '10 mins',
    inStock: false,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=300&auto=format&fit=crop&q=80',
  },
];

export default function MerchantDashboardPage() {
  const { user } = useAuth();
  const [merchantStatus, setMerchantStatus] = useState<'Active' | 'Under Review'>('Active');
  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Form State for Adding New Dish
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState('Artisan Cakes & Gateaux');
  const [newDishPrice, setNewDishPrice] = useState(350);

  const toggleStock = (id: string) => {
    setDishes(dishes.map(d => d.id === id ? { ...d, inStock: !d.inStock } : d));
  };

  const savePriceChange = (id: string) => {
    if (tempPrice <= 0) return;
    setDishes(dishes.map(d => d.id === id ? { ...d, price: tempPrice } : d));
    setEditingPriceId(null);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName) return;
    const created: DishItem = {
      id: `dish-${Date.now()}`,
      name: newDishName,
      category: newDishCategory,
      price: Number(newDishPrice) || 290,
      prepTime: '15 mins',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80',
    };
    setDishes([created, ...dishes]);
    setShowAddDishModal(false);
    setNewDishName('');
  };

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Header Profile Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1a1008] via-[#2d1b0d] to-[#1a1008] p-6 sm:p-8 text-white shadow-xl border border-[#C8A055]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#8B0000]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shrink-0 border border-white/20">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Status: Approved & Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Commission: 15%
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {user?.name || 'Giri Bakery & Artisan Confectionery'}
              </h1>
              <p className="text-xs text-[#c0b090] mt-0.5">
                Merchant ID: <strong className="text-white font-mono">GB-BAKERY-902</strong> • Partner Brand Console
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/merchant/portal"
              className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" /> Category & Price Portal
            </Link>
            <Link
              href="/merchant/register"
              className="py-2.5 px-4 rounded-xl text-xs font-extrabold border border-[#C8A055]/40 text-[#C8A055] hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Request New Outlet
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Monthly Gross Volume</span>
            <h3 className="text-2xl font-extrabold text-[#8B0000] mt-1">{formatCurrency(380000)}</h3>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18.5% Growth
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center font-extrabold text-xl">
            ₹
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Listed Dishes</span>
            <h3 className="text-2xl font-extrabold text-[#1a1008] mt-1">{dishes.length} Items</h3>
            <span className="text-[10px] font-bold text-purple-600 mt-0.5 block">Active Catalog</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Utensils className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Net Merchant Payout</span>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">{formatCurrency(323000)}</h3>
            <span className="text-[10px] font-bold text-[#6b5840] mt-0.5 block">Settled after 15% fee</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-[#6b5840] font-bold uppercase tracking-wider block">Pending Orders</span>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">4 Orders</h3>
            <span className="text-[10px] font-bold text-amber-600 mt-0.5 block">Live Kitchen Queue</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/merchant/portal"
          className="glass-card p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF8F0] border border-[#8B0000]/15 hover:border-[#8B0000] hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-[#1a1008] flex items-center justify-between">
            Category & Price Portal <ArrowRight className="w-4 h-4 text-[#8B0000] group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-[#6b5840] mt-1">Create categories, update prices (₹), and manage daily dish stock.</p>
        </Link>

        <Link
          href="/admin/orders"
          className="glass-card p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF8F0] border border-[#8B0000]/15 hover:border-[#8B0000] hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-[#1a1008] flex items-center justify-between">
            Live Store Orders <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-[#6b5840] mt-1">View real-time incoming orders, preparation statuses, and customer notes.</p>
        </Link>

        <Link
          href="/admin/menu"
          className="glass-card p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF8F0] border border-[#8B0000]/15 hover:border-[#8B0000] hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-[#1a1008] flex items-center justify-between">
            Menu Items Catalog <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-[#6b5840] mt-1">Manage global menu descriptions, ingredients, and photos.</p>
        </Link>

        <Link
          href="/admin/inventory"
          className="glass-card p-5 rounded-2xl bg-gradient-to-br from-white to-[#FFF8F0] border border-[#8B0000]/15 hover:border-[#8B0000] hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
            <Boxes className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-sm text-[#1a1008] flex items-center justify-between">
            Inventory & Stock <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-[#6b5840] mt-1">Track raw ingredient stock, supplier orders, and low-stock alerts.</p>
        </Link>
      </div>

      {/* Dish Catalog & Price Quick Manager */}
      <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-lg font-extrabold text-[#1a1008]">Merchant Dish Catalog & Live Prices</h2>
            </div>
            <p className="text-xs text-[#6b5840] mt-0.5">Quickly edit selling prices (₹) and toggle daily stock availability</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish name..."
                className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
            <button
              onClick={() => setShowAddDishModal(true)}
              className="btn-crimson py-2 px-3.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Dish & Set Price
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3">Dish Name & Image</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-right">Selling Price (₹)</th>
                <th className="p-3 text-center">Prep Time</th>
                <th className="p-3 text-center">Stock Availability</th>
                <th className="p-3 text-center">Price Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-10 h-10 rounded-xl object-cover border border-[#8B0000]/15 shrink-0"
                      />
                      <span className="font-extrabold text-xs text-[#1a1008]">{dish.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-[#4a3820] font-bold">{dish.category}</td>
                  <td className="p-3 text-right font-extrabold text-[#8B0000] text-sm">
                    {editingPriceId === dish.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs">₹</span>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(Number(e.target.value))}
                          className="w-20 bg-white border border-[#8B0000] rounded px-2 py-0.5 text-xs text-right font-extrabold outline-none"
                        />
                        <button
                          onClick={() => savePriceChange(dish.id)}
                          className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span>₹{dish.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="p-3 text-center font-mono text-[#6b5840]">{dish.prepTime}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleStock(dish.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer border transition-all ${
                        dish.inStock
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {dish.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setEditingPriceId(dish.id);
                        setTempPrice(dish.price);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all cursor-pointer flex items-center gap-1 mx-auto"
                    >
                      <Edit className="w-3 h-3" /> Change Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#8B0000]" />
                <h2 className="text-base font-extrabold text-[#1a1008]">Add Dish & Set Selling Price</h2>
              </div>
              <button onClick={() => setShowAddDishModal(false)} className="text-[#a09070] hover:text-[#8B0000]">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDish} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="e.g. Pistachio & Saffron Macaron"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Category</label>
                <select
                  value={newDishCategory}
                  onChange={(e) => setNewDishCategory(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold"
                >
                  <option value="Artisan Cakes & Gateaux">Artisan Cakes & Gateaux</option>
                  <option value="French Pastries & Tarts">French Pastries & Tarts</option>
                  <option value="Gourmet Cookies & Breads">Gourmet Cookies & Breads</option>
                  <option value="Espresso & Cold Brews">Espresso & Cold Brews</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="10"
                  value={newDishPrice}
                  onChange={(e) => setNewDishPrice(Number(e.target.value))}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer"
                >
                  Add Dish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
