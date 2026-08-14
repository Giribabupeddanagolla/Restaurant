'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { INITIAL_CATEGORIES, INITIAL_DISHES, getStoredDishes, saveStoredDishes, RESTAURANT_OUTLETS } from '@/data/mockData';
import { Search, Plus, Edit2, Trash2, CheckCircle, XCircle, Utensils, RefreshCw, Clock, Leaf, Filter, Store, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { MenuItem } from '@/types';
import { menuApi } from '@/services/restaurantService';
import { formatCurrency } from '@/utils/formatters';

const PRESET_DISH_IMAGES = [
  { label: '🍕 Pizza',    url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍔 Burger',   url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍲 Risotto',  url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🐟 Salmon',   url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍛 Curry',    url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍰 Dessert',  url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍹 Drink',    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🥗 Caprese',  url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&auto=format&fit=crop&q=85' },
  { label: '🍝 Pasta',    url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=600&auto=format&fit=crop&q=85' },
];

export default function AdminMenuPage() {
  const [dishes, setDishes] = useState<MenuItem[]>(INITIAL_DISHES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 450,
    description: '',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&auto=format&fit=crop&q=85',
    prepTime: 15,
    available: true,
    dietary: ['veg'],
  });

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const res = await menuApi.getDishes();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setDishes(res.data);
        saveStoredDishes(res.data);
      } else {
        const stored = getStoredDishes();
        if (stored && stored.length > 0) setDishes(stored);
      }
    } catch (err) {
      const stored = getStoredDishes();
      if (stored && stored.length > 0) setDishes(stored);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = getStoredDishes();
    if (stored && stored.length > 0) setDishes(stored);
    fetchDishes();
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

  const handleOpenAddModal = () => {
    setEditingDish(null);
    setFormData({
      name: '',
      category: 'mains',
      shopSlug: selectedRestaurant !== 'all' ? selectedRestaurant : 'giri-fine-dining',
      shopName: selectedRestaurant !== 'all' ? (RESTAURANT_OUTLETS.find((r) => r.slug === selectedRestaurant)?.name || 'Giri Fine Dining') : 'Giri Fine Dining',
      price: 450,
      description: '',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&auto=format&fit=crop&q=85',
      prepTime: 15,
      available: true,
      dietary: ['veg'],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dish: MenuItem) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      category: dish.category,
      shopSlug: dish.shopSlug || 'giri-fine-dining',
      shopName: dish.shopName || 'Giri Fine Dining',
      price: dish.price,
      description: dish.description,
      image: dish.image,
      prepTime: dish.prepTime || 15,
      available: dish.available !== false,
      dietary: dish.dietary || [],
    });
    setIsModalOpen(true);
  };

  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill in all required fields (Name, Price, Image, Description)' });
      return;
    }

    setSaving(true);
    setMessage(null);

    let updatedList: MenuItem[] = [];

    try {
      if (editingDish && (editingDish.id || (editingDish as any)._id)) {
        const id = editingDish.id || (editingDish as any)._id;
        await menuApi.updateDish(id, formData);
        setMessage({ type: 'success', text: `Dish "${formData.name}" updated successfully!` });
      } else {
        const res = await menuApi.createDish(formData);
        if (res && res.data) {
          updatedList = [res.data, ...dishes];
        }
        setMessage({ type: 'success', text: `New dish "${formData.name}" created successfully!` });
      }

      // Update local state and localStorage
      const newDishObj: MenuItem = {
        id: editingDish?.id || `dish-${Date.now()}`,
        name: formData.name || '',
        category: formData.category || 'mains',
        shopSlug: formData.shopSlug || 'giri-fine-dining',
        shopName: formData.shopName || 'Giri Fine Dining',
        price: Number(formData.price) || 0,
        description: formData.description || '',
        image: formData.image || '',
        prepTime: Number(formData.prepTime) || 15,
        available: formData.available !== false,
        dietary: formData.dietary || ['veg'],
      };

      if (editingDish) {
        updatedList = dishes.map((d) =>
          d.id === editingDish.id || (d as any)._id === (editingDish as any)._id ? newDishObj : d
        );
      } else if (updatedList.length === 0) {
        updatedList = [newDishObj, ...dishes];
      }

      setDishes(updatedList);
      saveStoredDishes(updatedList);
      setIsModalOpen(false);
    } catch (err) {
      console.log('API save failed, fallback to localStorage update');
      const newDishObj: MenuItem = {
        id: editingDish?.id || `dish-${Date.now()}`,
        name: formData.name || '',
        category: formData.category || 'mains',
        shopSlug: formData.shopSlug || 'giri-fine-dining',
        shopName: formData.shopName || 'Giri Fine Dining',
        price: Number(formData.price) || 0,
        description: formData.description || '',
        image: formData.image || '',
        prepTime: Number(formData.prepTime) || 15,
        available: formData.available !== false,
        dietary: formData.dietary || ['veg'],
      };

      if (editingDish) {
        updatedList = dishes.map((d) =>
          d.id === editingDish.id || (d as any)._id === (editingDish as any)._id ? newDishObj : d
        );
      } else {
        updatedList = [newDishObj, ...dishes];
      }

      setDishes(updatedList);
      saveStoredDishes(updatedList);
      setMessage({ type: 'success', text: `Dish "${formData.name}" saved locally!` });
      setIsModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDish = async (dish: MenuItem) => {
    if (!confirm(`Are you sure you want to delete "${dish.name}"?`)) return;

    try {
      const id = dish.id || (dish as any)._id;
      if (id) await menuApi.deleteDish(id);
    } catch (err) {
      console.log('Local delete fallback');
    }

    const updated = dishes.filter((d) => d.id !== dish.id && (d as any)._id !== (dish as any)._id);
    setDishes(updated);
    saveStoredDishes(updated);
    setMessage({ type: 'success', text: `Dish "${dish.name}" deleted successfully!` });
  };

  const handleToggleAvailability = async (dish: MenuItem) => {
    const newStatus = dish.available === false;
    const updated = dishes.map((d) =>
      d.id === dish.id || (d as any)._id === (dish as any)._id ? { ...d, available: newStatus } : d
    );
    setDishes(updated);
    saveStoredDishes(updated);

    try {
      const id = dish.id || (dish as any)._id;
      if (id) {
        await menuApi.updateDish(id, { available: newStatus });
      }
    } catch (err) {
      console.log('Status updated locally');
    }
  };

  const filteredDishes = useMemo(() => {
    const searchLower = search.toLowerCase();
    return dishes.filter((dish) => {
      const matchesSearch =
        search === '' ||
        dish.name.toLowerCase().includes(searchLower) ||
        dish.description.toLowerCase().includes(searchLower);

      const matchesRestaurant = selectedRestaurant === 'all' || dish.shopSlug === selectedRestaurant;

      const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;

      let matchesDietary = true;
      if (dietaryFilter === 'veg') {
        matchesDietary = dish.dietary?.includes('veg') || false;
      } else if (dietaryFilter === 'non-veg') {
        matchesDietary = !dish.dietary?.includes('veg');
      } else if (dietaryFilter === 'special') {
        matchesDietary = dish.dietary?.includes('chef-special') || false;
      } else if (dietaryFilter === 'available') {
        matchesDietary = dish.available !== false;
      } else if (dietaryFilter === 'out-of-stock') {
        matchesDietary = dish.available === false;
      }

      return matchesSearch && matchesRestaurant && matchesCategory && matchesDietary;
    });
  }, [dishes, search, selectedRestaurant, selectedCategory, dietaryFilter]);

  const handleResetMenu = () => {
    if (!confirm('Reset menu catalog to full default gourmet items?')) return;
    setDishes(INITIAL_DISHES);
    saveStoredDishes(INITIAL_DISHES);
    setMessage({ type: 'success', text: 'Menu catalog reset to full gourmet dish selection!' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            <Utensils className="w-4 h-4" /> ERP Catalog Management
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] mt-1">
            Menu Item Catalog
          </h1>
          <p className="text-xs text-[#6b5840] mt-1">
            Manage prices, descriptions, restaurant assignments, dietary tags, and stock availability for all dishes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={fetchDishes}
            className="p-2.5 rounded-xl bg-white border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000]/10 transition-all cursor-pointer shadow-xs"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn-crimson px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Dish
          </button>
        </div>
      </div>

      {/* Alert Banner */}
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

      {/* Search & Outlets / Filter Bar */}
      <div className="relative w-full mb-6 z-20">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4 pointer-events-none" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={selectedRestaurant !== 'all' 
              ? `Search within ${RESTAURANT_OUTLETS.find((r) => r.slug === selectedRestaurant)?.name}...` 
              : "Search dish by name, description, or outlet..."}
            className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
          />

          {/* Right Action Icons: Clear Search & Frameless 3-Lines Menu Icon */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Frameless Filter Toggle Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1.5 text-[#8B0000] hover:text-[#a00000] hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
              title="Toggle Outlets & Categories Filter"
              aria-label="Toggle Outlets & Categories Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Outlet Pill Indicator */}
        {selectedRestaurant !== 'all' && (
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={() => setSelectedRestaurant('all')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#8B0000]/40 text-[#1a1008] text-xs font-extrabold shadow-xs hover:bg-[#FFF0EB] hover:border-[#8B0000] transition-all cursor-pointer group"
              title="Click to reset outlet filter"
            >
              <Store className="w-3.5 h-3.5 text-[#8B0000]" />
              <span className="flex items-center gap-1">
                <span>{RESTAURANT_OUTLETS.find((r) => r.slug === selectedRestaurant)?.icon || '🍷'}</span>
                <span>{RESTAURANT_OUTLETS.find((r) => r.slug === selectedRestaurant)?.name}</span>
              </span>
              <X className="w-3.5 h-3.5 text-[#a09070] group-hover:text-[#8B0000] ml-1" />
            </button>
          </div>
        )}

        {/* Floating Filter & Outlet Menu Dropdown */}
        {showFilterMenu && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowFilterMenu(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#8B0000]/15 rounded-2xl p-4 shadow-xl z-50 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2 mb-3">
                <span className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider">Filter Outlets & Menu</span>
                <button onClick={() => setShowFilterMenu(false)} className="text-gray-400 hover:text-[#8B0000]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Restaurant Outlets Section */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block">Restaurant Outlets</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedRestaurant('all');
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center justify-between border transition-all cursor-pointer ${
                      selectedRestaurant === 'all'
                        ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                        : 'bg-white text-[#4a3820] border-[#8B0000]/30 hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Store className="w-3.5 h-3.5 text-[#8B0000]" />
                      <span>All Outlets</span>
                    </span>
                    {selectedRestaurant === 'all' && <span>✓</span>}
                  </button>
                  {RESTAURANT_OUTLETS.map((outlet) => {
                    const isActive = selectedRestaurant === outlet.slug;
                    return (
                      <button
                        key={outlet.slug}
                        onClick={() => {
                          setSelectedRestaurant(outlet.slug);
                          setSelectedCategory('all');
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center justify-between border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                            : 'bg-white text-[#1a1008] border-[#8B0000]/30 hover:bg-[#FFF0EB] hover:border-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Store className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8B0000]'}`} />
                          <span className="flex items-center gap-1">
                            <span>{outlet.icon}</span>
                            <span>{outlet.name}</span>
                          </span>
                        </span>
                        {isActive && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categories Section */}
              <div className="space-y-1.5 mb-4 border-t border-[#8B0000]/10 pt-3">
                <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block">Dish Category</span>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {INITIAL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                          : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      {selectedCategory === cat.id && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary & Stock Filters */}
              <div className="space-y-1 pt-3 border-t border-[#8B0000]/10">
                <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block">Dietary & Availability</span>
                <div className="space-y-0.5 pt-1">
                  {[
                    { id: 'all',          label: 'All Items',         icon: '🔍' },
                    { id: 'veg',          label: 'Veg Only',          icon: '🌱' },
                    { id: 'non-veg',      label: 'Non-Veg Only',      icon: '🥩' },
                    { id: 'special',      label: 'Chef Specials',     icon: '⭐' },
                    { id: 'available',    label: 'In Stock',          icon: '✅' },
                    { id: 'out-of-stock', label: 'Out of Stock',      icon: '⚠️' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setDietaryFilter(f.id);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        dietaryFilter === f.id
                          ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                          : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{f.icon}</span>
                        <span>{f.label}</span>
                      </span>
                      {dietaryFilter === f.id && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredDishes.map((dish, idx) => {
          const outletInfo = RESTAURANT_OUTLETS.find((r) => r.slug === dish.shopSlug) || { name: dish.shopName || 'Giri Fine Dining', icon: '🏪' };
          return (
            <div
              key={dish.id || (dish as any)._id || idx}
              className="glass-card bg-white border border-[#8B0000]/15 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              {/* Dish Image */}
              <div className="relative h-44 w-full bg-[#F8F5F0]">
                <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="300px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
                <button
                  onClick={() => handleToggleAvailability(dish)}
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-md transition-all cursor-pointer ${
                    dish.available !== false
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {dish.available !== false ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {dish.available !== false ? 'IN STOCK' : 'SOLD OUT'}
                </button>

                {/* Restaurant Outlet Badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-extrabold text-[10px] flex items-center gap-1 border border-white/20">
                  <span>{outletInfo.icon}</span>
                  <span className="truncate max-w-[110px]">{outletInfo.name}</span>
                </div>

                {/* Dietary Tags */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1">
                  {dish.dietary?.includes('chef-special') && (
                    <span className="bg-[#C8A055] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                      ★ Chef Special
                    </span>
                  )}
                  {dish.dietary?.includes('veg') && (
                    <span className="bg-emerald-700 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                      <Leaf className="w-2.5 h-2.5" /> Veg
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-[#1a1008] text-sm line-clamp-1">{dish.name}</h3>
                  <span className="text-sm font-extrabold text-[#8B0000] shrink-0">{formatCurrency(dish.price)}</span>
                </div>

                <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed">{dish.description}</p>

                <div className="text-[11px] text-[#a09070] font-semibold flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8B0000]" /> Prep: {dish.prepTime || 15} mins
                  </span>
                  <span className="text-[10px] font-bold text-[#8B0000] uppercase bg-[#FFF0EB] px-2 py-0.5 rounded-md">
                    {dish.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-[#8B0000]/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEditModal(dish)}
                    className="flex-1 py-2 px-3 bg-[#F8F5F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Dish
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish)}
                    className="p-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                    title="Delete Dish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDishes.length === 0 && (
        <div className="text-center py-16 glass-card bg-white rounded-2xl border border-[#8B0000]/10 flex flex-col items-center justify-center">
          <Utensils className="w-10 h-10 text-[#8B0000] mx-auto mb-2 opacity-50" />
          <h3 className="text-base font-bold text-[#1a1008]">No dishes found</h3>
          <p className="text-xs text-[#6b5840] mt-1 mb-4">Try adjusting your search criteria, restaurant selection, or category filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedRestaurant('all');
              setSelectedCategory('all');
              setDietaryFilter('all');
            }}
            className="btn-crimson px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset All Filters (Show All Items)
          </button>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white border border-[#8B0000]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#8B0000]/10 pb-4 shrink-0">
              <h2 className="text-lg font-extrabold text-[#1a1008] flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#8B0000]" />
                {editingDish ? 'Edit Dish Details' : 'Add New Dish to Menu'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a09070] hover:text-[#8B0000] font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveDish} className="flex-1 overflow-y-auto pr-1 text-xs flex flex-col pt-4">
              <div className="space-y-4 pb-4">
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sizzling Garlic Butter Prawns"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                {/* Restaurant Outlet & Category Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Restaurant / Outlet *</label>
                    <select
                      value={formData.shopSlug || 'giri-fine-dining'}
                      onChange={(e) => {
                        const selectedOutlet = RESTAURANT_OUTLETS.find((r) => r.slug === e.target.value);
                        setFormData({
                          ...formData,
                          shopSlug: e.target.value,
                          shopName: selectedOutlet?.name || 'Giri Fine Dining',
                        });
                      }}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      {RESTAURANT_OUTLETS.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.icon} {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Food Category *</label>
                    <select
                      value={formData.category || 'mains'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-bold outline-none focus:ring-2 focus:ring-[#8B0000]"
                    >
                      {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="e.g. 590"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1008] font-bold mb-1">Prep Time (mins)</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.prepTime || 15}
                      onChange={(e) => setFormData({ ...formData, prepTime: Number(e.target.value) })}
                      placeholder="15"
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
                  {/* Photo Presets */}
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {PRESET_DISH_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className="px-2 py-1 bg-[#F8F5F0] hover:bg-[#FFF0EB] border border-[#8B0000]/15 rounded-lg text-[10px] font-bold text-[#8B0000] cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a1008] font-bold mb-1">Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe ingredients, cooking style, and key highlights..."
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>

                {/* Dietary Tags */}
                <div>
                  <label className="block text-[#1a1008] font-bold mb-1.5">Dietary & Special Tags</label>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { id: 'veg',          label: '🌱 Veg' },
                      { id: 'non-veg',      label: '🍖 Non-Veg' },
                      { id: 'spicy',        label: '🔥 Spicy' },
                      { id: 'chef-special', label: '⭐ Chef Special' },
                    ].map((tag) => {
                      const isSelected = formData.dietary?.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => {
                            const current = formData.dietary || [];
                            const next = isSelected
                              ? current.filter((t) => t !== tag.id)
                              : [...current, tag.id];
                            setFormData({ ...formData, dietary: next });
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                            isSelected
                              ? 'bg-[#8B0000] text-white shadow-xs'
                              : 'bg-[#F8F5F0] text-[#6b5840] border border-[#8B0000]/10 hover:border-[#8B0000]/30'
                          }`}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* In Stock Toggle */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available !== false}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 accent-[#8B0000] rounded cursor-pointer"
                  />
                  <label htmlFor="available" className="text-[#1a1008] font-bold cursor-pointer">
                    Available / In Stock for Ordering
                  </label>
                </div>
              </div>

              {/* Form Footer */}
              <div className="pt-4 border-t border-[#8B0000]/10 flex gap-3 shrink-0 mt-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-[#F8F5F0] text-[#6b5840] hover:bg-[#EFE8DD] rounded-xl font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 btn-crimson text-white rounded-xl font-bold shadow-md hover:bg-[#A00000] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> {editingDish ? 'Update Dish' : 'Save Dish to Menu'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
