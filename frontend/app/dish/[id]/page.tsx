'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Star, Leaf, Sparkles, Check, ShoppingBag, Plus, Minus, Building2, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { MenuItem, Shop } from '@/types';
import { getStoredDishes, getMatchingFoodImage, INITIAL_SHOPS } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import RestaurantInfo from '@/components/RestaurantInfo';

export default function StandaloneDishDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dishId = params?.id as string;

  const { addItem, items } = useCart();
  const [dish, setDish] = useState<MenuItem | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dishId) return;
    try {
      const allDishes = getStoredDishes();
      const decodedId = decodeURIComponent(dishId);
      const found = allDishes.find((d) => (d.id || (d as any)._id || d.name).toLowerCase() === decodedId.toLowerCase());
      if (found) {
        setDish(found);
      } else {
        // Fallback search by name or slug
        const partial = allDishes.find((d) => d.name.toLowerCase().includes(decodedId.toLowerCase()) || d.id.includes(decodedId));
        setDish(partial || null);
      }
    } catch {
      setDish(null);
    } finally {
      setLoading(false);
    }
  }, [dishId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <Building2 className="w-10 h-10 text-[#8B0000] mx-auto animate-pulse" />
        <p className="text-xs font-bold text-[#6b5840]">Loading dish details...</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center bg-white rounded-3xl border border-dashed border-[#8B0000]/20 space-y-4 my-10">
        <AlertCircle className="w-12 h-12 text-[#8B0000] mx-auto" />
        <h2 className="text-xl font-extrabold text-[#1a1008]">Dish Not Found</h2>
        <p className="text-xs text-[#6b5840]">The dish you are looking for might have been moved or removed.</p>
        <Link href="/menu" className="btn-crimson py-2.5 px-5 rounded-xl text-xs font-extrabold inline-block">
          Browse Full Restaurant Menu
        </Link>
      </div>
    );
  }

  const dietary = Array.isArray(dish.dietary) ? dish.dietary : [];
  const shopName = dish.shopName || 'Giri Spice Garden';
  const shopId = dish.shopId || dish.merchantId || encodeURIComponent(shopName);
  const shopHref = `/menu?shop=${encodeURIComponent(shopName)}&shopId=${encodeURIComponent(shopId)}`;

  const inCart = items.find((i) => (i.dish.id || (i.dish as any)._id || i.dish.name) === dish.id);
  const isAvailable = dish.available !== false && (dish as any).isAvailable !== false && (dish as any).inStock !== false;
  const dishImg = (dish.image && typeof dish.image === 'string' && dish.image.trim() !== '') ? dish.image.trim() : getMatchingFoodImage(dish.name, dish.category, dish.subCategory, dish.image);

  const handleAdd = () => {
    addItem(dish, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#6b5840] flex-wrap bg-white p-3 rounded-2xl border border-[#8B0000]/10 shadow-xs">
        <Link href="/" className="hover:text-[#8B0000]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/menu" className="hover:text-[#8B0000]">Menu</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={shopHref} className="hover:text-[#8B0000] font-extrabold text-[#8B0000]">
          🏪 {shopName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="capitalize">{dish.category || 'Dishes'}</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#1a1008] font-extrabold truncate max-w-[150px]">{dish.name}</span>
      </div>

      {/* RESTAURANT INFO BANNER */}
      <RestaurantInfo
        shopName={shopName}
        shopId={dish.shopId}
        merchantId={dish.merchantId}
        address={dish.address}
        city={dish.city}
        showViewButton
      />

      {/* MAIN DISH CARD CONTAINER */}
      <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch">
        {/* Left Side: Image */}
        <div className="relative md:w-1/2 w-full min-h-[320px] bg-[#F8F5F0] overflow-hidden">
          <img
            src={dishImg}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getMatchingFoodImage(dish.name, dish.category, dish.subCategory);
            }}
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md ${
                dietary.includes('veg')
                  ? 'bg-white text-[#16603A] border border-[#16603A]/20'
                  : 'bg-white text-[#8B0000] border border-[#8B0000]/20'
              }`}
            >
              {dietary.includes('veg') ? '🌱 Vegetarian' : '🥩 Non-Veg'}
            </span>
          </div>
        </div>

        {/* Right Side: Details & Add to Cart */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <Link
              href={shopHref}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#8B0000] hover:underline bg-[#FFF8F0] px-3 py-1.5 rounded-xl border border-[#8B0000]/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> ← Back to {shopName} Menu
            </Link>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1a1008]">{dish.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs font-extrabold text-[#C8A055] bg-[#FFF8F0] px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-[#C8A055]" /> {dish.rating || 4.8}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#6b5840] bg-[#F8F5F0] px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-[#8B0000]" /> {dish.prepTime || '15-20'} mins
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4a3820] leading-relaxed">{dish.description}</p>

            {dish.customizations && dish.customizations.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider mb-2">
                  Customizations
                </h4>
                <div className="space-y-2">
                  {dish.customizations.map((c) => (
                    <div key={c.name} className="flex justify-between text-xs p-2.5 rounded-xl bg-[#F8F5F0]">
                      <span className="font-semibold text-[#4a3820]">{c.name}</span>
                      <span className="font-extrabold text-[#8B0000]">+{formatCurrency(c.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#8B0000]/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Price</span>
                <span className="text-3xl font-black text-[#8B0000]">{formatCurrency(dish.price * qty)}</span>
              </div>

              <div className="flex items-center gap-3 bg-[#F8F5F0] rounded-xl px-3 py-1.5 border border-[#8B0000]/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-[#8B0000] font-bold cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-extrabold text-[#1a1008] w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!isAvailable}
              className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                added
                  ? 'bg-[#16603A] text-white'
                  : !isAvailable
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'btn-crimson'
              }`}
            >
              {added ? (
                <><Check className="w-5 h-5" /> Added to Cart!</>
              ) : (
                <><ShoppingBag className="w-5 h-5" /> Add to Cart · {formatCurrency(dish.price * qty)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
