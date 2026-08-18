'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Store,
  Utensils,
  ShoppingBag,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  SlidersHorizontal,
  Boxes,
  Percent,
  Search,
  ExternalLink,
  Bell,
  Star,
  ShieldCheck,
  AlertTriangle,
  User,
  Power,
  ChevronDown,
  Layers,
  Tag,
  Check,
  X,
  Eye,
  Filter
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getMatchingFoodImage } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';

interface DishItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  discount: number;
  finalPrice: number;
  prepTime: string;
  inStock: boolean;
  image: string;
  foodType: 'Veg' | 'Non-Veg' | 'Egg';
}

const INITIAL_DISHES: DishItem[] = [
  {
    id: 'd-1',
    name: 'Chicken Dum Biryani',
    category: 'Biryani',
    subCategory: 'Chicken Biryani',
    price: 249,
    discount: 20,
    finalPrice: 229,
    prepTime: '25 mins',
    inStock: true,
    foodType: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-2',
    name: 'Mutton Dum Biryani',
    category: 'Biryani',
    subCategory: 'Mutton Biryani',
    price: 320,
    discount: 21,
    finalPrice: 299,
    prepTime: '30 mins',
    inStock: true,
    foodType: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-3',
    name: 'Royal Veg Hyderabadi Biryani',
    category: 'Biryani',
    subCategory: 'Veg Biryani',
    price: 210,
    discount: 11,
    finalPrice: 199,
    prepTime: '20 mins',
    inStock: true,
    foodType: 'Veg',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-4',
    name: 'Signature Dutch Dark Chocolate Cake',
    category: 'Desserts',
    subCategory: 'Cakes',
    price: 650,
    discount: 50,
    finalPrice: 600,
    prepTime: '15 mins',
    inStock: true,
    foodType: 'Veg',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'd-5',
    name: 'Paneer Tikka Masala',
    category: 'North Indian',
    subCategory: 'Curries',
    price: 260,
    discount: 30,
    finalPrice: 230,
    prepTime: '20 mins',
    inStock: true,
    foodType: 'Veg',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&auto=format&fit=crop&q=80',
  },
];

export default function MerchantDashboardView() {
  const router = useRouter();
  const { user } = useAuth();

  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [currentMerchant, setCurrentMerchant] = useState<any>(null);
  const [showApprovalBanner, setShowApprovalBanner] = useState(true);
  const [shopOpen, setShopOpen] = useState(true);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDish, setEditingDish] = useState<DishItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: 'Biryani',
    subCategory: 'Chicken Biryani',
    price: 0,
    discount: 0,
    foodType: 'Veg' as 'Veg' | 'Non-Veg' | 'Egg',
    image: '',
    inStock: true,
  });

  useEffect(() => {
    try {
      const cur = JSON.parse(localStorage.getItem('giri_current_merchant') || '{}');
      setCurrentMerchant(cur);
      const notifs = JSON.parse(localStorage.getItem('giri_merchant_notifications') || '[]');
      const unread = notifs.filter((n: any) => !n.isRead).length;
      if (unread > 0) setUnreadNotifsCount(unread);

      const stored = JSON.parse(localStorage.getItem('giri_merchant_dishes') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        const sanitized = stored.map((d: any) => ({
          ...d,
          price: Number(d.price) || 0,
          discount: Number(d.discount) || 0,
          finalPrice: typeof d.finalPrice === 'number' ? d.finalPrice : Math.max(0, (Number(d.price) || 0) - (Number(d.discount) || 0)),
          inStock: typeof d.inStock === 'boolean' ? d.inStock : d.available !== false,
        }));
        setDishes(sanitized);
      }
    } catch (e) {}
  }, []);

  const openEditModal = (dish: DishItem) => {
    setEditingDish(dish);
    setEditFormData({
      name: dish.name,
      category: dish.category,
      subCategory: dish.subCategory || '',
      price: dish.price,
      discount: dish.discount,
      foodType: dish.foodType || 'Non-Veg',
      image: dish.image,
      inStock: dish.inStock,
    });
    setShowEditModal(true);
  };

  const handleSaveEditedDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    const numPrice = Number(editFormData.price) || 0;
    const numDiscount = Number(editFormData.discount) || 0;
    const finalPrice = Math.max(0, numPrice - numDiscount);

    const mShopName = currentMerchant?.shopName || currentMerchant?.name || currentMerchant?.shopProfile?.shopName || user?.shopName || user?.name || 'RK Restaurant';
    const mShopSlug = String(mShopName || 'RK Restaurant').toLowerCase().replace(/\s+/g, '-');
    const mId = currentMerchant?.id || currentMerchant?._id || `merchant-${mShopSlug}`;

    const updatedList = dishes.map((d) =>
      d.id === editingDish.id
        ? {
            ...d,
            merchantId: mId,
            shopName: mShopName,
            shopSlug: mShopSlug,
            name: editFormData.name,
            category: editFormData.category,
            subCategory: editFormData.subCategory,
            price: numPrice,
            discount: numDiscount,
            finalPrice,
            foodType: editFormData.foodType,
            image: editFormData.image,
            inStock: editFormData.inStock,
            available: editFormData.inStock,
          }
        : d
    );
    setDishes(updatedList);
    try {
      localStorage.setItem('giri_merchant_dishes', JSON.stringify(updatedList));

      const existingGlobal = JSON.parse(localStorage.getItem('royal_restaurant_dishes_v2026_fine_dining_fix') || '[]');
      const formattedMerchantItems = updatedList.map((d) => ({
        ...d,
        merchantId: mId,
        shopName: mShopName,
        shopSlug: mShopSlug,
        dietary: [(d as any).foodType ? String((d as any).foodType).toLowerCase() : 'veg'],
      }));
      const mergedGlobal = [...formattedMerchantItems, ...existingGlobal.filter((g: any) => g.merchantId !== mId && g.shopName !== mShopName)];
      localStorage.setItem('royal_restaurant_dishes_v2026_fine_dining_fix', JSON.stringify(mergedGlobal));
    } catch (err) {}
    setShowEditModal(false);
    setEditingDish(null);
  };

  const handleToggleStock = (id: string) => {
    const updatedList = dishes.map((d) => (d.id === id ? { ...d, inStock: !d.inStock, available: !d.inStock } : d));
    setDishes(updatedList);
    try {
      localStorage.setItem('giri_merchant_dishes', JSON.stringify(updatedList));
    } catch (e) {}
  };

  const handleDeleteDish = (id: string) => {
    if (confirm('Are you sure you want to delete this dish item?')) {
      const updatedList = dishes.filter((d) => d.id !== id);
      setDishes(updatedList);
      try {
        localStorage.setItem('giri_merchant_dishes', JSON.stringify(updatedList));

        const mShopName = currentMerchant?.shopName || currentMerchant?.name || currentMerchant?.shopProfile?.shopName || user?.shopName || user?.name || 'RK Restaurant';
        const mShopSlug = String(mShopName || 'RK Restaurant').toLowerCase().replace(/\s+/g, '-');
        const mId = currentMerchant?.id || currentMerchant?._id || `merchant-${mShopSlug}`;
        const existingGlobal = JSON.parse(localStorage.getItem('royal_restaurant_dishes_v2026_fine_dining_fix') || '[]');
        const updatedGlobal = existingGlobal.filter((g: any) => g.id !== id);
        localStorage.setItem('royal_restaurant_dishes_v2026_fine_dining_fix', JSON.stringify(updatedGlobal));
      } catch (err) {}
    }
  };

  const merchantStatus = String(currentMerchant?.status || 'approved').toLowerCase();
  const isApproved = merchantStatus === 'approved' || currentMerchant?.isApproved === true || currentMerchant?.status === 'Active';

  const categoriesList = ['All', ...Array.from(new Set(dishes.map((d) => d.category)))];

  const filteredDishes = dishes.filter((dish) => {
    const matchSearch = searchQuery === '' || dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || (dish.subCategory && dish.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const merchantShopName = currentMerchant?.shopName || currentMerchant?.name || user?.shopName || currentMerchant?.shopProfile?.shopName || 'RK Restaurant';

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 pb-16">
      {/* TOP HEADER BAR WITH NOTIFICATION BELL & SHOP PROFILE BUTTON */}
      <div className="sticky top-2 z-40 bg-white/95 backdrop-blur-md border border-[#8B0000]/15 py-2 px-3 sm:px-6 rounded-2xl shadow-sm flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/"
            className="p-2 sm:p-2.5 rounded-xl bg-[#F8F5F0] hover:bg-[#8B0000] text-[#8B0000] hover:text-white border border-[#8B0000]/20 transition-all cursor-pointer shadow-2xs group flex items-center justify-center shrink-0"
            title="Go to Home Page"
            aria-label="Go to Home Page"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#8B0000] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="min-w-0">
            <div className="font-extrabold text-xs sm:text-sm text-[#1a1008] leading-tight flex items-center gap-1.5 truncate">
              <span className="truncate">{merchantShopName}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 shrink-0">
                Active Outlet
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#6b5840] font-bold truncate">
              Merchant Management Console
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/merchant/notifications"
            className="relative p-2 sm:p-2.5 rounded-xl bg-[#F8F5F0] border border-[#8B0000]/15 text-[#1a1008] hover:bg-[#FFF8F0] transition-all flex items-center justify-center"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#C8A055]" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-extrabold text-[9px] flex items-center justify-center ring-2 ring-white">
                {unreadNotifsCount}
              </span>
            )}
          </Link>

          <Link
            href="/merchant/shop-profile"
            className="btn-crimson py-2 px-2.5 sm:px-4 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all shrink-0"
            title="Shop Profile"
          >
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">Shop Profile</span>
          </Link>
        </div>
      </div>
      {/* PENDING APPROVAL GUARD */}
      {!isApproved && (
        <div className="rounded-3xl bg-amber-50 border-2 border-amber-300 p-6 sm:p-8 text-amber-950 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-200 border border-amber-400 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 animate-pulse text-amber-700" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-200 text-amber-900 border border-amber-400">
                Status: Pending Admin Review
              </span>
              <h2 className="text-xl font-extrabold text-amber-950 mt-1">
                Your merchant account is currently under Admin review.
              </h2>
            </div>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
            You cannot add food categories, subcategories, dishes, prices, images, or accept customer orders until Admin approves your application. Once approved, all management modules will unlock automatically.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/admin/merchants"
              className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Go to Admin Merchants Console to Approve
            </Link>
          </div>
        </div>
      )}

      {/* FIRST-LOGIN APPROVAL BANNER */}
      {isApproved && showApprovalBanner && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-950 p-5 text-white border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                🎉 Your merchant account has been approved.
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5 max-w-xl">
                Your merchant registration is live! Access your Merchant Dashboard to configure shop details, categories, dishes, prices, images, and availability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/merchant/shop-profile"
              className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-extrabold shadow-md flex items-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" /> Go to Shop Setup →
            </Link>
            <button
              onClick={() => setShowApprovalBanner(false)}
              className="p-1.5 text-emerald-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CARD 1: DARK BRAND HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1a1008] via-[#2d1b0d] to-[#1a1008] px-5 py-4 sm:px-6 sm:py-5 text-white shadow-lg border border-[#C8A055]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#8B0000]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white flex items-center justify-center font-extrabold shadow-md shrink-0 border border-white/20">
              <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase flex items-center gap-1 ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" /> Status: {isApproved ? 'Approved & Active' : 'Under Review'}
                </span>

                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase cursor-pointer flex items-center gap-1 border transition-all ${
                    shopOpen
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                      : 'bg-red-950 text-red-300 border-red-500/50 hover:bg-red-900'
                  }`}
                >
                  <Power className="w-3 h-3" /> Shop Status: {shopOpen ? 'OPEN' : 'CLOSED'}
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                {merchantShopName}
              </h1>

              <p className="text-[11px] text-[#E0B96A] font-medium tracking-wide">
                Welcome back, <strong>{user?.name || 'Merchant Owner'}</strong> • Multi-Vendor Swiggy Merchant Console • Commission: <span className="font-mono text-white font-bold">15.0%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: QUICK MODULE TABS & ANALYTICS KPI CARDS CONTAINER */}
      <div className="glass-card rounded-2xl sm:rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs p-4 sm:p-5 space-y-4">
        {/* QUICK NAV MODULE TABS (4 MAIN ESSENTIAL MODULES) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { href: '/merchant/categories', label: 'Food Categories', desc: 'Manage 8 Categories', icon: Layers, gradient: 'from-rose-600 to-red-700', badge: '8 Cats' },
            { href: '/merchant/subcategories', label: 'Sub Categories', desc: 'Dish Groupings', icon: SlidersHorizontal, gradient: 'from-purple-600 to-indigo-700', badge: '12 Subs' },
            { href: '/merchant/dishes', label: 'Dishes / Menu', desc: 'Price & Stock Catalog', icon: Utensils, gradient: 'from-emerald-600 to-teal-700', badge: `${dishes.length} Items` },
            { href: '/merchant/orders', label: 'Store Orders', desc: 'Live Order Queue', icon: ShoppingBag, gradient: 'from-amber-500 to-orange-600', badge: '12 Live' },
          ].map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={isApproved ? mod.href : '#'}
                onClick={(e) => {
                  if (!isApproved) {
                    e.preventDefault();
                    alert('Merchant account is under review. Please approve from Admin console first.');
                  }
                }}
                className={`relative bg-[#F8F5F0]/80 p-3.5 rounded-2xl border border-[#8B0000]/10 shadow-2xs hover:shadow-md hover:bg-white transition-all duration-300 group flex flex-col justify-between overflow-hidden text-[#1a1008] ${
                  !isApproved ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${mod.gradient} text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-white text-[#8B0000] border border-[#8B0000]/15 shrink-0">
                    {mod.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#1a1008] group-hover:text-[#8B0000] transition-colors leading-tight">
                    {mod.label}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    {mod.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* KPI METRIC CARDS (4 MAIN ESSENTIAL METRICS) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Today's Orders", val: '248', icon: ShoppingBag, color: 'text-[#1a1008]', bg: 'bg-blue-50/70 border-blue-200', tag: '+14% today' },
            { label: "Today's Sales", val: '₹24,850', icon: IndianRupee, color: 'text-[#8B0000]', bg: 'bg-rose-50/70 border-rose-200', tag: 'High Revenue' },
            { label: 'Pending Orders', val: '12', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50/70 border-amber-200', tag: 'Action Req.' },
            { label: 'Total Dishes', val: `${dishes.length}`, icon: Utensils, color: 'text-blue-700', bg: 'bg-indigo-50/70 border-indigo-200', tag: 'In Catalog' },
          ].map((kpi, idx) => {
            const KIcon = kpi.icon;
            return (
              <div key={idx} className={`p-3 sm:p-3.5 rounded-2xl bg-white border ${kpi.bg} shadow-2xs hover:shadow-md transition-all duration-300 text-center space-y-1 text-[#1a1008]`}>
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-[10px] sm:text-[11px] text-[#6b5840] font-extrabold uppercase tracking-tight truncate block">{kpi.label}</span>
                  <KIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60 shrink-0" />
                </div>
                <h3 className={`text-lg sm:text-xl font-black tracking-tight ${kpi.color}`}>{kpi.val}</h3>
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-gray-200 inline-block">
                  {kpi.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISHES & PRICE CATALOG TABLE SECTION */}
      <div className="glass-card rounded-2xl sm:rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#8B0000]/10 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-base sm:text-lg font-extrabold text-[#1a1008]">Dishes, Sub Categories & Price Catalog</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FFF8F0] text-[#8B0000] border border-[#8B0000]/15">
                {filteredDishes.length} Items
              </span>
            </div>
            <p className="text-[11px] text-[#6b5840] mt-0.5 font-medium">Manage merchant dish items, discounts, final prices (₹), and availability</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[190px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search dish name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#8B0000] outline-none"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>

            <Link
              href="/merchant/dishes"
              className="btn-crimson py-1.5 px-3.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add New Dish
            </Link>
          </div>
        </div>

        {/* CATALOG TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Dish Name & Image</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Sub Category</th>
                <th className="py-2.5 px-3 text-right">Orig. Price</th>
                <th className="py-2.5 px-3 text-right">Discount</th>
                <th className="py-2.5 px-3 text-right">Final Price</th>
                <th className="py-2.5 px-3 text-center">Type</th>
                <th className="py-2.5 px-3 text-center">Stock Availability</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-xs text-gray-500">
                    No dishes found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                    <td className="py-2.5 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={getMatchingFoodImage(dish.name, dish.category, dish.subCategory, dish.image)}
                          alt={dish.name}
                          className="w-9 h-9 rounded-xl object-cover border border-[#8B0000]/15 shrink-0 bg-white"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getMatchingFoodImage(dish.name, dish.category, dish.subCategory);
                          }}
                        />
                        <div>
                          <span className="font-extrabold text-xs text-[#1a1008] block leading-snug">{dish.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono">⏱️ {dish.prepTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[#4a3820] font-bold align-middle">{dish.category}</td>
                    <td className="py-2.5 px-3 text-gray-600 font-bold align-middle">{dish.subCategory || 'N/A'}</td>
                    <td className="py-2.5 px-3 text-right line-through text-gray-400 font-bold align-middle">₹{dish.price}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold align-middle">-₹{dish.discount}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-[#8B0000] text-sm align-middle">₹{dish.finalPrice}</td>
                    <td className="py-2.5 px-3 text-center align-middle">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap inline-flex items-center gap-1 ${
                          dish.foodType === 'Veg'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : dish.foodType === 'Egg'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {dish.foodType === 'Veg' ? '🌱 Veg' : dish.foodType === 'Egg' ? '🥚 Egg' : '🍖 Non-Veg'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center align-middle">
                      <button
                        onClick={() => handleToggleStock(dish.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-all shadow-2xs whitespace-nowrap inline-flex items-center gap-1 ${
                          dish.inStock
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-red-100 text-red-800 border border-red-300 hover:bg-red-200'
                        }`}
                        title="Click to toggle stock availability"
                      >
                        {dish.inStock ? '✓ Available' : '❌ Unavailable'}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-center align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(dish)}
                          className="p-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 transition-all cursor-pointer shadow-2xs"
                          title="Edit Dish & Price"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id)}
                          className="p-1.5 rounded-lg bg-red-50 border border-red-300 text-red-700 hover:bg-red-100 transition-all cursor-pointer shadow-2xs"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT DISH MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#8B0000]/20 space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#8B0000]" />
                <h3 className="text-lg font-extrabold text-[#1a1008]">Edit Dish & Pricing</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedDish} className="space-y-4 text-xs font-medium text-[#1a1008]">
              <div>
                <label className="block font-bold mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Sub Category</label>
                  <input
                    type="text"
                    value={editFormData.subCategory}
                    onChange={(e) => setEditFormData({ ...editFormData, subCategory: e.target.value })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none font-bold text-[#8B0000]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Discount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={editFormData.discount}
                    onChange={(e) => setEditFormData({ ...editFormData, discount: Number(e.target.value) })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Food Type</label>
                  <select
                    value={editFormData.foodType}
                    onChange={(e) => setEditFormData({ ...editFormData, foodType: e.target.value as any })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none font-bold"
                  >
                    <option value="Veg">Veg 🟢</option>
                    <option value="Non-Veg">Non-Veg 🍖</option>
                    <option value="Egg">Egg 🥚</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Stock Availability</label>
                  <select
                    value={editFormData.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditFormData({ ...editFormData, inStock: e.target.value === 'true' })}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none font-bold"
                  >
                    <option value="true">Available ✅</option>
                    <option value="false">Unavailable ❌</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={editFormData.image}
                  onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3.5 py-2 outline-none text-xs"
                />
              </div>

              <div className="pt-3 border-t border-[#8B0000]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-6 py-2 rounded-xl font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
