'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Utensils,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Tag,
  IndianRupee,
  Search,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  X,
  Sparkles,
  Store,
  Save,
  Check
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface DishItem {
  id: string;
  name: string;
  category: string;
  price: number;
  prepTime: string;
  image: string;
  available: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  dishesCount?: number;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Artisan Cakes & Gateaux' },
  { id: 'cat-2', name: 'French Pastries & Tarts' },
  { id: 'cat-3', name: 'Gourmet Cookies & Breads' },
  { id: 'cat-4', name: 'Espresso & Cold Brews' },
];

const DEFAULT_DISHES: DishItem[] = [
  {
    id: 'd-1',
    name: 'Signature Dutch Dark Chocolate Cake',
    category: 'Artisan Cakes & Gateaux',
    price: 650,
    prepTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    id: 'd-2',
    name: 'Red Velvet Cream Cheese Layer Cake',
    category: 'Artisan Cakes & Gateaux',
    price: 580,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    id: 'd-3',
    name: 'Belgian Chocolate Hazelnut Pastry',
    category: 'French Pastries & Tarts',
    price: 240,
    prepTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    id: 'd-4',
    name: 'Fresh Strawberry Tartlet',
    category: 'French Pastries & Tarts',
    price: 280,
    prepTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400&h=300&auto=format&fit=crop&q=80',
    available: false,
  },
];

export default function MerchantPortalPage() {
  const catalogSectionRef = useRef<HTMLDivElement>(null);

  const [merchantStatus, setMerchantStatus] = useState<'Active' | 'Under Review' | 'Suspended'>('Active');
  const [merchantName, setMerchantName] = useState('Giri Bakery & Artisan Confectionery');
  const [merchantCode, setMerchantCode] = useState('GB-BAKERY');
  const [approvalNotice, setApprovalNotice] = useState<any>(null);

  // Shop Name Edit State
  const [isEditingShopName, setIsEditingShopName] = useState(false);
  const [tempShopName, setTempShopName] = useState('');

  // Categories & Dishes State
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [dishes, setDishes] = useState<DishItem[]>(DEFAULT_DISHES);

  const [newCatName, setNewCatName] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Add Dish Form State
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Artisan Cakes & Gateaux',
    price: 350,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&auto=format&fit=crop&q=80',
  });

  // Edit Price State
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  // Initial Load & Persistence
  useEffect(() => {
    // 1. Sync current merchant
    const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
    if (cur.name) {
      setMerchantName(cur.name);
      setTempShopName(cur.name);
      setMerchantCode(cur.code || `MER-${cur.name.slice(0, 3).toUpperCase()}`);
      if (cur.status) setMerchantStatus(cur.status);
      if (cur.approvalMsg) setApprovalNotice(cur.approvalMsg);
    }

    // 2. Check pending requests
    const pending = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
    if (pending.length > 0) {
      const match = cur.name ? pending.find((p: any) => p.name === cur.name) : pending[0];
      if (match) {
        if (!cur.name) {
          setMerchantName(match.name);
          setTempShopName(match.name);
          setMerchantCode(match.code);
        }
        setMerchantStatus(match.status);
      }
    }

    // 3. Check approved merchant messages feed
    const msgs = JSON.parse(localStorage.getItem('giri_approved_merchant_messages') || '[]');
    if (msgs.length > 0) {
      const lastMsg = msgs[msgs.length - 1];
      setApprovalNotice({
        title: lastMsg.title || 'Merchant Request Approved!',
        message: lastMsg.message,
        timestamp: lastMsg.date || new Date().toLocaleString(),
      });
    }

    // 4. Load persisted categories & dishes
    const savedCats = localStorage.getItem('giri_merchant_categories');
    if (savedCats) {
      try { setCategories(JSON.parse(savedCats)); } catch (e) {}
    }

    const savedDishes = localStorage.getItem('giri_merchant_dishes');
    if (savedDishes) {
      try { setDishes(JSON.parse(savedDishes)); } catch (e) {}
    }
  }, []);

  const handleSaveShopName = () => {
    if (!tempShopName.trim()) return;
    const updatedName = tempShopName.trim();
    setMerchantName(updatedName);
    setIsEditingShopName(false);

    const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
    localStorage.setItem('giri_current_merchant', JSON.stringify({ ...cur, name: updatedName }));

    const pending = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
    const updatedPending = pending.map((p: any) => p.id === cur.id || p.name === cur.name ? { ...p, name: updatedName } : p);
    localStorage.setItem('giri_pending_merchant_requests', JSON.stringify(updatedPending));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catName = newCatName.trim();
    const catObj: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: catName,
    };
    const updated = [...categories, catObj];
    setCategories(updated);
    localStorage.setItem('giri_merchant_categories', JSON.stringify(updated));

    setNewCatName('');
    setShowAddCatModal(false);

    // Auto-select newly added category and scroll to catalog
    setSelectedCategoryFilter(catName);
    setTimeout(() => {
      catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name.trim() || !newDish.price) return;

    const dishObj: DishItem = {
      id: `d-${Date.now()}`,
      name: newDish.name.trim(),
      category: newDish.category,
      price: Number(newDish.price),
      prepTime: newDish.prepTime || '15 mins',
      image: newDish.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&auto=format&fit=crop&q=80',
      available: true,
    };

    const updatedDishes = [dishObj, ...dishes];
    setDishes(updatedDishes);
    localStorage.setItem('giri_merchant_dishes', JSON.stringify(updatedDishes));

    setShowAddDishModal(false);
    setNewDish({
      name: '',
      category: selectedCategoryFilter !== 'All' ? selectedCategoryFilter : (categories[0]?.name || 'Artisan Cakes & Gateaux'),
      price: 350,
      prepTime: '15 mins',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&auto=format&fit=crop&q=80',
    });
  };

  const toggleAvailability = (id: string) => {
    const updated = dishes.map(d => d.id === id ? { ...d, available: !d.available } : d);
    setDishes(updated);
    localStorage.setItem('giri_merchant_dishes', JSON.stringify(updated));
  };

  const handleSavePrice = (id: string) => {
    const updated = dishes.map(d => d.id === id ? { ...d, price: editPriceVal } : d);
    setDishes(updated);
    localStorage.setItem('giri_merchant_dishes', JSON.stringify(updated));
    setEditingDishId(null);
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategoryFilter(catName);
    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAddDishForCategory = (catName?: string) => {
    const targetCat = catName || (selectedCategoryFilter !== 'All' ? selectedCategoryFilter : (categories[0]?.name || 'Artisan Cakes & Gateaux'));
    setNewDish((prev) => ({ ...prev, category: targetCat }));
    setShowAddDishModal(true);
  };

  const filteredDishes = dishes.filter(d => {
    const matchesQuery = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'All' || d.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8 pb-16 text-[#1a1008]">

      {/* Merchant Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Building2 className="w-6 h-6 text-[#8B0000]" />
            {isEditingShopName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempShopName}
                  onChange={(e) => setTempShopName(e.target.value)}
                  className="bg-white border-2 border-[#8B0000] rounded-xl px-3 py-1 text-lg font-extrabold text-[#1a1008] outline-none"
                />
                <button
                  onClick={handleSaveShopName}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={() => { setIsEditingShopName(false); setTempShopName(merchantName); }}
                  className="px-2 py-1.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#1a1008] tracking-tight">{merchantName}</h1>
                {merchantStatus === 'Active' && (
                  <button
                    onClick={() => { setIsEditingShopName(true); setTempShopName(merchantName); }}
                    className="p-1.5 text-[#8B0000] hover:bg-[#8B0000]/10 rounded-lg transition-all cursor-pointer"
                    title="Edit Merchant Shop Name"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-[#6b5840] mt-0.5">
            Merchant Code: <span className="font-mono font-bold text-[#8B0000]">{merchantCode}</span> • Shop Name, Categories & Dish Price Management Console
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs ${
            merchantStatus === 'Active'
              ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
              : 'bg-amber-100 border border-amber-300 text-amber-800'
          }`}>
            {merchantStatus === 'Active' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            )}
            Status: {merchantStatus === 'Active' ? 'Approved & Active' : 'Under Admin Review'}
          </span>

          {merchantStatus !== 'Active' && (
            <button
              onClick={() => {
                setMerchantStatus('Active');
                const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
                const approvalMsg = {
                  id: `msg-${Date.now()}`,
                  merchantName: merchantName,
                  title: 'Merchant Request Approved!',
                  message: `Congratulations! Your Merchant Partner Onboarding Request for "${merchantName}" has been APPROVED by Admin. You can now configure your Shop Name, Categories, and Category Dish Prices.`,
                  timestamp: new Date().toISOString(),
                };
                localStorage.setItem('giri_current_merchant', JSON.stringify({ ...cur, status: 'Active', approvalMsg }));
                setApprovalNotice(approvalMsg);
              }}
              className="py-1.5 px-3 rounded-full bg-[#8B0000] text-white text-xs font-extrabold hover:bg-black transition-all cursor-pointer shadow-xs"
            >
              Instant Approve Demo
            </button>
          )}
        </div>
      </div>

      {/* ADMIN APPROVAL NOTIFICATION MESSAGE BANNER */}
      {merchantStatus === 'Active' && approvalNotice && (
        <div className="glass-card rounded-3xl p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 shadow-md flex items-start gap-4 animate-in fade-in">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm text-emerald-950">{approvalNotice.title || 'Merchant Request Approved!'}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 border border-emerald-400">
                Verified Admin Approval Notice
              </span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              {approvalNotice.message}
            </p>
            <div className="text-[10px] text-emerald-700 font-mono">
              Sent by Giri Restaurant Admin • {approvalNotice.timestamp || new Date().toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* IF PENDING APPROVAL GATE */}
      {merchantStatus !== 'Active' ? (
        <div className="glass-card rounded-3xl p-8 bg-amber-50/70 border-2 border-amber-300 shadow-lg text-center space-y-4 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1a1008]">Merchant Request Pending Admin Approval</h2>
            <p className="text-xs text-[#6b5840] mt-1.5 leading-relaxed">
              Your merchant onboarding application for <strong>{merchantName}</strong> has been submitted to Admin. As per Giri Restaurant protocol, <strong>Category Creation and Dish Price Listing are locked until the Admin accepts your request</strong>.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 text-xs font-mono text-left space-y-1">
            <div><strong>Step 1:</strong> Merchant sends Onboarding Request $\rightarrow$ <span className="text-emerald-700 font-bold">COMPLETED</span></div>
            <div><strong>Step 2:</strong> Admin Approves Merchant Application $\rightarrow$ <span className="text-amber-700 font-bold">PENDING</span></div>
            <div><strong>Step 3:</strong> Add Food Categories & Set Dish Prices $\rightarrow$ <span className="text-gray-400">LOCKED</span></div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/admin/merchants"
              className="btn-crimson py-2.5 px-5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" /> Open Admin Console to Approve Request
            </Link>
            <button
              onClick={() => {
                setMerchantStatus('Active');
                const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
                const approvalMsg = {
                  id: `msg-${Date.now()}`,
                  merchantName: merchantName,
                  title: 'Merchant Request Approved!',
                  message: `Congratulations! Your Merchant Partner Onboarding Request for "${merchantName}" has been APPROVED by Admin. You can now configure your Shop Name, Categories, and Category Dish Prices.`,
                  timestamp: new Date().toISOString(),
                };
                localStorage.setItem('giri_current_merchant', JSON.stringify({ ...cur, status: 'Active', approvalMsg }));
                setApprovalNotice(approvalMsg);
              }}
              className="py-2.5 px-5 rounded-xl border border-amber-400 bg-amber-200 hover:bg-amber-300 text-amber-900 font-extrabold text-xs transition-all cursor-pointer"
            >
              Instant Approve Demo Request
            </button>
          </div>
        </div>
      ) : (
        /* UNLOCKED MERCHANT PORTAL: SHOP NAME, CATEGORIES & DISH PRICE MANAGER */
        <div className="space-y-6">

          {/* Shop Name Configuration Bar */}
          <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center shrink-0 font-bold">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6b5840] uppercase tracking-wider block font-mono">Merchant Shop Name</span>
                <h2 className="text-lg font-extrabold text-[#1a1008]">{merchantName}</h2>
              </div>
            </div>

            <button
              onClick={() => { setIsEditingShopName(true); setTempShopName(merchantName); }}
              className="py-2 px-4 rounded-xl border border-[#8B0000]/30 text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Shop Name
            </button>
          </div>

          {/* Food Categories Management Card */}
          <div className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8B0000]/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#8B0000]" />
                  <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">
                    Food Categories Management ({categories.length} Categories)
                  </h2>
                </div>
                <p className="text-[11px] text-[#6b5840]">
                  Click any category to filter and manage its dishes & prices below
                </p>
              </div>

              <button
                onClick={() => setShowAddCatModal(true)}
                className="btn-crimson py-2 px-3.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Food Category
              </button>
            </div>

            {/* Interactive Category Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              {/* Show All Card */}
              <button
                onClick={() => handleCategoryClick('All')}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border text-left ${
                  selectedCategoryFilter === 'All'
                    ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md ring-2 ring-[#8B0000]/30'
                    : 'bg-[#F8F5F0] text-[#1a1008] border-[#8B0000]/15 hover:border-[#8B0000]'
                }`}
              >
                <div>
                  <span className="font-extrabold text-xs block">All Categories</span>
                  <span className={`text-[10px] font-semibold block mt-0.5 ${selectedCategoryFilter === 'All' ? 'text-white/80' : 'text-[#a09070]'}`}>
                    {dishes.length} Total Dishes
                  </span>
                </div>
                {selectedCategoryFilter === 'All' ? (
                  <Check className="w-4 h-4 text-white shrink-0" />
                ) : (
                  <Tag className="w-4 h-4 text-[#8B0000] opacity-50 shrink-0" />
                )}
              </button>

              {/* Dynamic Category Cards */}
              {categories.map((cat) => {
                const count = dishes.filter(d => d.category.toLowerCase() === cat.name.toLowerCase()).length;
                const isSelected = selectedCategoryFilter.toLowerCase() === cat.name.toLowerCase();

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border text-left group ${
                      isSelected
                        ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md ring-2 ring-[#8B0000]/30'
                        : 'bg-[#F8F5F0] text-[#1a1008] border-[#8B0000]/15 hover:border-[#8B0000]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-xs block truncate">{cat.name}</span>
                      <span className={`text-[10px] font-semibold block mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#a09070]'}`}>
                        {count} {count === 1 ? 'Dish' : 'Dishes'}
                      </span>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-white shrink-0" />
                    ) : (
                      <Tag className="w-4 h-4 text-[#8B0000] opacity-50 group-hover:opacity-100 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dish Catalog & Price Manager Card */}
          <div ref={catalogSectionRef} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8B0000]/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#8B0000]" />
                  <h2 className="text-sm font-extrabold text-[#1a1008] uppercase tracking-wider font-mono">
                    {selectedCategoryFilter === 'All' ? 'All Dish Prices & Inventory Catalog' : `"${selectedCategoryFilter}" Category Dishes & Prices`}
                  </h2>
                </div>
                <p className="text-[11px] text-[#6b5840]">
                  Showing {filteredDishes.length} dishes • Edit selling prices (₹) and daily stock availability
                </p>
              </div>

              <button
                onClick={() => openAddDishForCategory()}
                className="btn-crimson py-2 px-4 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Dish & Set Price
              </button>
            </div>

            {/* Search & Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dish name..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedCategoryFilter('All')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategoryFilter === 'All'
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB]'
                  }`}
                >
                  All ({dishes.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategoryFilter.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-[#8B0000] text-white shadow-xs'
                        : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* EMPTY STATE FOR CATEGORY WITH NO DISHES */}
            {filteredDishes.length === 0 ? (
              <div className="p-8 text-center bg-[#F8F5F0] rounded-2xl border border-dashed border-[#8B0000]/30 space-y-3 my-4">
                <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mx-auto">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1a1008]">
                    No Dishes Listed in "{selectedCategoryFilter}" Category Yet
                  </h3>
                  <p className="text-xs text-[#6b5840] mt-1 max-w-md mx-auto">
                    Add food dishes under <strong>{selectedCategoryFilter}</strong> and configure their selling prices (₹).
                  </p>
                </div>
                <button
                  onClick={() => openAddDishForCategory()}
                  className="btn-crimson py-2.5 px-5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm cursor-pointer mt-1"
                >
                  <Plus className="w-4 h-4" /> Add First Dish to {selectedCategoryFilter}
                </button>
              </div>
            ) : (
              /* Dishes Data Table */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8F5F0] text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="p-3">Dish Name & Image</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-right">Selling Price (₹)</th>
                      <th className="p-3 text-center">Prep Time</th>
                      <th className="p-3 text-center">Availability</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#8B0000]/10 font-medium">
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#8B0000]/10">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                            </div>
                            <span className="font-extrabold text-xs text-[#1a1008]">{dish.name}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-[#4a3820] bg-amber-100/60 px-2 py-0.5 rounded text-[10px]">
                            {dish.category}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {editingDishId === dish.id ? (
                            <div className="flex items-center justify-end gap-1">
                              <input
                                type="number"
                                value={editPriceVal}
                                onChange={(e) => setEditPriceVal(Number(e.target.value))}
                                className="w-20 bg-white border border-[#8B0000] rounded px-1.5 py-1 text-xs font-extrabold outline-none text-right"
                              />
                              <button
                                onClick={() => handleSavePrice(dish.id)}
                                className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="font-extrabold text-sm text-[#8B0000]">
                                {formatCurrency(dish.price)}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingDishId(dish.id);
                                  setEditPriceVal(dish.price);
                                }}
                                className="text-[#a09070] hover:text-[#8B0000] p-1 cursor-pointer"
                                title="Edit Price"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold text-gray-700">{dish.prepTime}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => toggleAvailability(dish.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer ${
                              dish.available
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-red-100 text-red-800 border-red-300'
                            }`}
                          >
                            {dish.available ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setEditingDishId(dish.id);
                              setEditPriceVal(dish.price);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold border border-[#8B0000]/30 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all cursor-pointer"
                          >
                            Change Price
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#8B0000]" />
                <h3 className="text-sm font-extrabold text-[#1a1008]">Add Food Category</h3>
              </div>
              <button onClick={() => setShowAddCatModal(false)} className="text-[#a09070] hover:text-[#8B0000]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Traditional Sweets & Desserts"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-4 py-1.5 rounded-xl text-white font-extrabold cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Dish & Price Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#8B0000]" />
                <h3 className="text-sm font-extrabold text-[#1a1008]">Add Dish & Set Selling Price</h3>
              </div>
              <button onClick={() => setShowAddDishModal(false)} className="text-[#a09070] hover:text-[#8B0000]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  placeholder="e.g. Special Andhra Biryani / Kaju Katli"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Food Category *</label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000] font-bold text-[#8B0000]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Preparation Time</label>
                <input
                  type="text"
                  value={newDish.prepTime}
                  onChange={(e) => setNewDish({ ...newDish, prepTime: e.target.value })}
                  placeholder="e.g. 15 mins"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Image URL</label>
                <input
                  type="url"
                  value={newDish.image}
                  onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-4 py-1.5 rounded-xl text-white font-extrabold cursor-pointer"
                >
                  Save Dish & Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
