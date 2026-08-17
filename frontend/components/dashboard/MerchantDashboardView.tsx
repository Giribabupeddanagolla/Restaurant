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
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
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
];

export default function MerchantDashboardView() {
  const { user } = useAuth();
  const [currentMerchant, setCurrentMerchant] = useState<any>(null);
  const [shopOpen, setShopOpen] = useState(true);
  const [showApprovalBanner, setShowApprovalBanner] = useState(true);

  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(1);

  const [editingDish, setEditingDish] = useState<DishItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
    const mShopSlug = mShopName.toLowerCase().replace(/\s+/g, '-');
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
        dietary: [(d as any).foodType ? (d as any).foodType.toLowerCase() : 'veg'],
      }));
      const mergedGlobal = [...formattedMerchantItems, ...existingGlobal.filter((g: any) => g.merchantId !== mId && g.shopName !== mShopName)];
      localStorage.setItem('royal_restaurant_dishes_v2026_fine_dining_fix', JSON.stringify(mergedGlobal));
    } catch (err) {}
    setShowEditModal(false);
    setEditingDish(null);
  };

  const handleDeleteDish = (id: string) => {
    if (confirm('Are you sure you want to delete this dish item?')) {
      const updatedList = dishes.filter((d) => d.id !== id);
      setDishes(updatedList);
      try {
        localStorage.setItem('giri_merchant_dishes', JSON.stringify(updatedList));

        const mShopName = currentMerchant?.shopName || currentMerchant?.name || currentMerchant?.shopProfile?.shopName || user?.shopName || user?.name || 'RK Restaurant';
        const mShopSlug = mShopName.toLowerCase().replace(/\s+/g, '-');
        const mId = currentMerchant?.id || currentMerchant?._id || `merchant-${mShopSlug}`;
        const existingGlobal = JSON.parse(localStorage.getItem('royal_restaurant_dishes_v2026_fine_dining_fix') || '[]');
        const updatedGlobal = existingGlobal.filter((g: any) => g.id !== id);
        localStorage.setItem('royal_restaurant_dishes_v2026_fine_dining_fix', JSON.stringify(updatedGlobal));
      } catch (err) {}
    }
  };

  const merchantStatus = (currentMerchant?.status || 'approved').toLowerCase();
  const isApproved = merchantStatus === 'approved' || currentMerchant?.isApproved === true || currentMerchant?.status === 'Active';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* SECTION 4: ACCESS CONTROL GUARD FOR PENDING MERCHANTS */}
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

      {/* SECTION 3: FIRST-LOGIN APPROVAL SUCCESS BANNER */}
      {isApproved && showApprovalBanner && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                🎉 Your merchant account has been approved.
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5 max-w-xl">
                Your merchant registration has been approved by Admin. You can now access your full Merchant Dashboard to add shop details, categories, dishes, prices, images, and availability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/merchant/shop-profile"
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-extrabold shadow-md flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" /> Go to Shop Setup →
            </Link>
            <button
              onClick={() => setShowApprovalBanner(false)}
              className="p-2 text-emerald-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: TOP HEADER & BRAND BAR */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1a1008] via-[#2d1b0d] to-[#1a1008] p-6 sm:p-8 text-white shadow-xl border border-[#C8A055]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#8B0000]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#C8A055] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shrink-0 border border-white/20">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1 ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" /> Status: {isApproved ? 'Approved & Active' : 'Under Review'}
                </span>

                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase cursor-pointer flex items-center gap-1 border transition-all ${
                    shopOpen
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                      : 'bg-red-950 text-red-300 border-red-500/50'
                  }`}
                >
                  <Power className="w-3 h-3" /> Shop Status: {shopOpen ? 'OPEN' : 'CLOSED'}
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                {currentMerchant?.shopName || currentMerchant?.name || user?.shopName || currentMerchant?.shopProfile?.shopName || 'Andhra Ruchulu'}
              </h1>
              <p className="text-xs text-[#E0B96A] mt-1 font-bold">
                Welcome back, <strong>{user?.name || 'Merchant Owner'}</strong> • Multi-Vendor Swiggy Merchant Console • Commission: <span className="font-mono text-white font-bold">15.0%</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/merchant/notifications"
              className="relative p-3 rounded-2xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all"
            >
              <Bell className="w-5 h-5 text-[#E0B96A]" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center ring-2 ring-black">
                  {unreadNotifsCount}
                </span>
              )}
            </Link>

            <Link
              href="/merchant/shop-profile"
              className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Store className="w-4 h-4" /> Shop Profile
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 5 SIDEBAR NAV MODULE LINKS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { href: '/merchant/shop-profile', label: 'Shop Profile', icon: Store, color: 'bg-blue-600 text-white' },
          { href: '/merchant/categories', label: 'Food Categories', icon: Layers, color: 'bg-rose-700 text-white' },
          { href: '/merchant/subcategories', label: 'Sub Categories', icon: SlidersHorizontal, color: 'bg-purple-700 text-white' },
          { href: '/merchant/dishes', label: 'Dishes / Menu', icon: Utensils, color: 'bg-emerald-700 text-white' },
          { href: '/merchant/orders', label: 'Store Orders', icon: ShoppingBag, color: 'bg-amber-600 text-white' },
          { href: '/merchant/notifications', label: 'Notifications', icon: Bell, color: 'bg-yellow-600 text-white' },
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
              className={`glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 flex flex-col items-center gap-2 text-center hover:shadow-md transition-all group ${
                !isApproved ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl ${mod.color} flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#1a1008] group-hover:text-[#8B0000] transition-colors">
                {mod.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* SECTION 6: DASHBOARD HOME KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Today's Orders</span>
          <h3 className="text-lg font-extrabold text-[#1a1008]">248</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Today's Sales</span>
          <h3 className="text-lg font-extrabold text-[#8B0000]">₹24,850</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Categories</span>
          <h3 className="text-lg font-extrabold text-purple-700">8</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Total Dishes</span>
          <h3 className="text-lg font-extrabold text-blue-700">64</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Pending Orders</span>
          <h3 className="text-lg font-extrabold text-amber-700">12</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Completed</span>
          <h3 className="text-lg font-extrabold text-emerald-700">210</h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Rating</span>
          <h3 className="text-lg font-extrabold text-[#C8A055] flex items-center justify-center gap-0.5">
            4.5 <Star className="w-3.5 h-3.5 fill-[#C8A055]" />
          </h3>
        </div>

        <div className="glass-card p-3.5 rounded-2xl bg-white border border-[#8B0000]/10 text-center space-y-1">
          <span className="text-[10px] text-[#6b5840] font-bold uppercase block">Shop Status</span>
          <h3 className={`text-xs font-extrabold uppercase py-0.5 rounded ${shopOpen ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
            {shopOpen ? 'OPEN' : 'CLOSED'}
          </h3>
        </div>
      </div>

      {/* SECTION 10 & 11: DISHES & PRICES PREVIEW TABLE */}
      <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/10 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-lg font-extrabold text-[#1a1008]">Dishes, Sub Categories & Price Catalog</h2>
            </div>
            <p className="text-xs text-[#6b5840] mt-0.5">Manage merchant dish items, discounts, final prices (₹), and availability</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/merchant/dishes"
              className="btn-crimson py-2 px-3.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Dish
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F5F0] border-b border-[#8B0000]/10 text-[#6b5840] font-extrabold uppercase tracking-wider text-[10px]">
                <th className="p-3">Dish Name & Image</th>
                <th className="p-3">Category</th>
                <th className="p-3">Sub Category</th>
                <th className="p-3 text-right">Orig. Price</th>
                <th className="p-3 text-right">Discount</th>
                <th className="p-3 text-right">Final Price</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Availability</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8B0000]/10 font-medium text-[#1a1008]">
              {dishes.map((dish) => (
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
                  <td className="p-3 text-gray-600 font-bold">{dish.subCategory || 'N/A'}</td>
                  <td className="p-3 text-right line-through text-gray-400 font-bold">₹{dish.price}</td>
                  <td className="p-3 text-right text-emerald-700 font-bold">-₹{dish.discount}</td>
                  <td className="p-3 text-right font-extrabold text-[#8B0000] text-sm">₹{dish.finalPrice}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dish.foodType === 'Veg' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dish.foodType}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      dish.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dish.inStock ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
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
              ))}
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
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-6 py-2 rounded-xl font-extrabold shadow-md flex items-center gap-1.5"
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
