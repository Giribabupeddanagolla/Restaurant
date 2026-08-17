'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, Plus, Edit, Trash2, ArrowLeft, Search, X } from 'lucide-react';

interface SubCategoryItem {
  id: string;
  name: string;
  parentCategory: string;
  image: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const INITIAL_SUBCATEGORIES: SubCategoryItem[] = [
  { id: 'sub-1', name: 'Chicken Biryani', parentCategory: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80', description: 'Hyderabadi spiced chicken dum biryani', status: 'Active' },
  { id: 'sub-2', name: 'Mutton Biryani', parentCategory: 'Biryani', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80', description: 'Tender tender mutton basmati biryani', status: 'Active' },
  { id: 'sub-3', name: 'Veg Biryani', parentCategory: 'Biryani', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=300&auto=format&fit=crop&q=80', description: 'Saffron veggies & paneer biryani', status: 'Active' },
  { id: 'sub-4', name: 'Chicken Starters', parentCategory: 'Starters', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80', description: 'Smoked BBQ wings & chicken tikka', status: 'Active' },
  { id: 'sub-5', name: 'Mutton Starters', parentCategory: 'Starters', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80', description: 'Charcoal seekh kebabs & lamb chops', status: 'Active' },
  { id: 'sub-6', name: 'Veg Starters', parentCategory: 'Starters', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&auto=format&fit=crop&q=80', description: 'Tandoori malai broccoli & paneer tikka', status: 'Active' },
];

export default function MerchantSubCategoriesPage() {
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>(INITIAL_SUBCATEGORIES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formParent, setFormParent] = useState('Biryani');
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('giri_merchant_subcategories') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setSubCategories(stored);
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (list: SubCategoryItem[]) => {
    setSubCategories(list);
    localStorage.setItem('giri_merchant_subcategories', JSON.stringify(list));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingId) {
      const updated = subCategories.map(s => s.id === editingId ? {
        ...s,
        name: formName,
        parentCategory: formParent,
        image: formImage || s.image,
        description: formDesc,
        status: formStatus
      } : s);
      saveToStorage(updated);
    } else {
      const created: SubCategoryItem = {
        id: `sub-${Date.now()}`,
        name: formName,
        parentCategory: formParent,
        image: formImage || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=80',
        description: formDesc,
        status: formStatus
      };
      saveToStorage([created, ...subCategories]);
    }

    setShowModal(false);
    setFormName('');
    setFormImage('');
    setFormDesc('');
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this sub category?')) {
      const updated = subCategories.filter(s => s.id !== id);
      saveToStorage(updated);
    }
  };

  const filtered = subCategories.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.parentCategory.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/merchant/dashboard" className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Sub Categories Management</h1>
            <p className="text-xs text-[#6b5840]">Organize sub categories under parent categories</p>
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
          <Plus className="w-4 h-4" /> + Add Sub Category
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/10 flex items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sub category or parent category..."
            className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
        </div>

        <span className="text-xs font-extrabold text-[#8B0000]">Total {filtered.length} Sub Categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((sub) => (
          <div key={sub.id} className="glass-card rounded-2xl bg-white border border-[#8B0000]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-28 w-full bg-[#F8F5F0]">
                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-[#8B0000] text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                  {sub.parentCategory}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-extrabold text-sm text-[#1a1008]">{sub.name}</h3>
                <p className="text-xs text-[#6b5840] line-clamp-2">{sub.description}</p>
              </div>
            </div>

            <div className="p-3 bg-[#F8F5F0] border-t border-[#8B0000]/10 flex items-center justify-between text-xs font-bold">
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${sub.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {sub.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(sub.id);
                    setFormName(sub.name);
                    setFormParent(sub.parentCategory);
                    setFormImage(sub.image);
                    setFormDesc(sub.description);
                    setFormStatus(sub.status);
                    setShowModal(true);
                  }}
                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg">
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
              <h2 className="text-base font-extrabold text-[#1a1008]">{editingId ? 'Edit Sub Category' : 'Add Sub Category'}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Sub Category Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Chicken Biryani"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Parent Category *</label>
                <select
                  value={formParent}
                  onChange={(e) => setFormParent(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                >
                  <option value="Biryani">Biryani</option>
                  <option value="Starters">Starters</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Breads">Breads</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Image URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold">Save Sub Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
