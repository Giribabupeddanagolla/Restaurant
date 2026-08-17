'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Plus, Edit, Trash2, CheckCircle2, XCircle, ArrowLeft, Search, X } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  description: string;
  status: 'Active' | 'Inactive';
  dishesCount: number;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80', description: 'Royal Hyderabadi dum biryani & pulao', status: 'Active', dishesCount: 12 },
  { id: 'cat-2', name: 'Starters', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&auto=format&fit=crop&q=80', description: 'Tandoori & smoked sizzlers', status: 'Active', dishesCount: 18 },
  { id: 'cat-3', name: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80', description: 'Rich North & South Indian gravies', status: 'Active', dishesCount: 22 },
  { id: 'cat-4', name: 'Chinese', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=80', description: 'Wok tossed noodles & fried rice', status: 'Active', dishesCount: 14 },
  { id: 'cat-5', name: 'Breads', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=300&auto=format&fit=crop&q=80', description: 'Tandoori naan, roti & kulchas', status: 'Active', dishesCount: 10 },
  { id: 'cat-6', name: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80', description: 'Artisanal cakes, pastries & Indian sweets', status: 'Active', dishesCount: 15 },
  { id: 'cat-7', name: 'Beverages', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80', description: 'Cold brews, coolers & lassis', status: 'Active', dishesCount: 8 },
];

export default function MerchantCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('giri_merchant_categories') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setCategories(stored);
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (list: CategoryItem[]) => {
    setCategories(list);
    localStorage.setItem('giri_merchant_categories', JSON.stringify(list));
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingId) {
      const updated = categories.map(c => c.id === editingId ? {
        ...c,
        name: formName,
        image: formImage || c.image,
        description: formDesc,
        status: formStatus
      } : c);
      saveToStorage(updated);
    } else {
      const created: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formName,
        image: formImage || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=80',
        description: formDesc,
        status: formStatus,
        dishesCount: 0
      };
      saveToStorage([created, ...categories]);
    }

    setShowModal(false);
    setFormName('');
    setFormImage('');
    setFormDesc('');
    setEditingId(null);
  };

  const toggleStatus = (id: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, status: (c.status === 'Active' ? 'Inactive' : 'Active') as any } : c);
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this food category?')) {
      const updated = categories.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/merchant/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Food Categories Management</h1>
            <p className="text-xs text-[#6b5840]">Manage categories owned by your restaurant shop</p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setFormName('');
            setFormImage('');
            setFormDesc('');
            setShowModal(true);
          }}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add Category
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
        </div>

        <span className="text-xs font-extrabold text-[#8B0000]">Total {filtered.length} Categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((cat) => (
          <div key={cat.id} className="glass-card rounded-2xl bg-white border border-[#8B0000]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-32 w-full bg-[#F8F5F0]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  cat.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {cat.status}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-extrabold text-base text-[#1a1008]">{cat.name}</h3>
                <p className="text-xs text-[#6b5840] line-clamp-2">{cat.description}</p>
                <div className="text-[10px] text-[#a09070] font-bold mt-2 font-mono">
                  {cat.dishesCount} Dishes in Category
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F8F5F0] border-t border-[#8B0000]/10 flex items-center justify-between text-xs font-bold">
              <button
                onClick={() => toggleStatus(cat.id)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border cursor-pointer ${
                  cat.status === 'Active' ? 'border-amber-300 text-amber-800 hover:bg-amber-50' : 'border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {cat.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(cat.id);
                    setFormName(cat.name);
                    setFormImage(cat.image);
                    setFormDesc(cat.description);
                    setFormStatus(cat.status);
                    setShowModal(true);
                  }}
                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">{editingId ? 'Edit Category' : 'Add Food Category'}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Biryani"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Category Image URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Category description..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
