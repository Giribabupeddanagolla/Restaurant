'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Clock, Star, ShoppingBag, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { getMatchingFoodImage } from '@/data/mockData';
import RestaurantInfo from '@/components/RestaurantInfo';

import { FALLBACK_SVG } from '@/components/SafeImage';

interface Props {
  dish: MenuItem | null;
  onClose: () => void;
}

export default function DishModal({ dish, onClose }: Props) {
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Lock background body scroll while DishModal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  if (!dish) return null;

  const dishId = dish.id || (dish as any)._id || dish.name;
  const inCart = items.find((i) => (i.dish.id || (i.dish as any)._id || i.dish.name) === dishId);
  const dietary = Array.isArray(dish.dietary) ? dish.dietary : [];

  const shopName = dish.shopName || 'Giri Spice Garden';
  const shopId = dish.shopId || dish.merchantId || encodeURIComponent(shopName);
  const shopHref = `/menu?shop=${encodeURIComponent(shopName)}&shopId=${encodeURIComponent(shopId)}`;

  const modalImg = getMatchingFoodImage(dish.name, dish.category, dish.subCategory, dish.image);
  const isAvailable = dish.available !== false && (dish as any).isAvailable !== false && (dish as any).inStock !== false;

  const handleAdd = () => {
    addItem(dish, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — side-by-side layout */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        <div
          className="bg-white w-full sm:max-w-5xl sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col sm:flex-row items-stretch max-h-[95vh] sm:max-h-[90vh] sm:h-[650px] overflow-hidden relative transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1a1008] shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Image Container */}
          <div className="relative h-64 sm:h-full sm:w-1/2 w-full bg-[#F8F5F0] shrink-0 overflow-hidden self-stretch min-h-[260px]">
            <img
              src={modalImg || FALLBACK_SVG}
              alt={dish.name}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_SVG;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />

            {/* Badges on image bottom left */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 pr-4">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md ${
                  dietary.includes('veg')
                    ? 'bg-white text-[#16603A] border border-[#16603A]/20'
                    : 'bg-white text-[#8B0000] border border-[#8B0000]/20'
                }`}
              >
                {dietary.includes('veg') ? '🌱 Vegetarian' : '🥩 Non-Veg'}
              </span>
              {dietary.includes('chef-special') && (
                <span className="bg-[#8B0000] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  ⭐ Chef Special
                </span>
              )}
              {dietary.includes('spicy') && (
                <span className="bg-amber-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  🔥 Spicy
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="sm:w-1/2 w-full flex flex-col justify-between max-h-[60vh] sm:max-h-full bg-white overflow-hidden self-stretch">
            {/* Scrollable Content */}
            <div className="overflow-y-auto overscroll-contain flex-1 px-6 sm:px-8 py-6 flex flex-col gap-4">
              
              {/* BREADCRUMBS & RESTAURANT BACK LINK */}
              <div className="flex flex-col gap-2 border-b border-[#8B0000]/10 pb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6b5840] flex-wrap">
                  <Link href="/" onClick={onClose} className="hover:text-[#8B0000]">Home</Link>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <Link href={shopHref} onClick={onClose} className="hover:text-[#8B0000] font-extrabold text-[#8B0000] truncate max-w-[120px]">
                    {shopName}
                  </Link>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="capitalize truncate max-w-[100px]">{dish.category || 'Dishes'}</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <span className="text-[#1a1008] font-extrabold truncate max-w-[120px]">{dish.name}</span>
                </div>

                <Link
                  href={shopHref}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#8B0000] hover:underline w-fit"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to {shopName} Menu
                </Link>
              </div>

              {/* RESTAURANT INFO BANNER */}
              <RestaurantInfo
                shopName={shopName}
                shopId={dish.shopId}
                merchantId={dish.merchantId}
                address={dish.address}
                city={dish.city}
                compact
                showViewButton
                onViewRestaurant={onClose}
              />

              {/* Title & Meta info */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1008] leading-tight">{dish.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#6b5840] bg-[#F8F5F0] px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#C8A055]" /> {dish.prepTime || '15-20'} mins
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#6b5840] bg-[#F8F5F0] px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-[#C8A055] fill-[#C8A055]" /> {dish.rating || 4.8}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isAvailable ? 'bg-[#F0FAF4] text-[#16603A]' : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {isAvailable ? '✓ Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4a3820] leading-relaxed">{dish.description}</p>

              {/* Customizations / Add-ons */}
              {dish.customizations && dish.customizations.length > 0 && (
                <div className="pt-1">
                  <h4 className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-[#8B0000] rounded-full inline-block" />
                    Add-ons & Customizations
                  </h4>
                  <div className="flex flex-col gap-2">
                    {dish.customizations.map((opt) => (
                      <div
                        key={opt.name}
                        className="flex justify-between items-center bg-[#F8F5F0] rounded-xl px-4 py-2 border border-[#C8A055]/15 text-xs"
                      >
                        <span className="text-[#4a3820] font-medium">{opt.name}</span>
                        <span className="font-extrabold text-[#8B0000] shrink-0 ml-2">
                          {opt.price === 0 ? 'Free' : `+${formatCurrency(opt.price)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dietary.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-full text-xs font-semibold text-[#6b5840] capitalize"
                  >
                    {tag === 'veg' ? '🌱 Vegetarian' : tag === 'spicy' ? '🔥 Spicy' : tag === 'chef-special' ? '⭐ Chef Special' : tag}
                  </span>
                ))}
              </div>

              {inCart && (
                <p className="text-xs text-[#16603A] font-semibold bg-[#F0FAF4] px-3.5 py-2.5 rounded-xl border border-[#16603A]/10">
                  ✓ You already have {inCart.qty || (inCart as any).quantity || 1} of this in your cart
                </p>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-[#C8A055]/20 bg-white flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#6b5840] block font-bold uppercase tracking-wider">Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#8B0000]">{formatCurrency(dish.price * qty)}</span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-3 bg-[#F8F5F0] rounded-xl px-3 py-1.5 border border-[#C8A055]/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full bg-white border border-[#8B0000]/20 flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-xs cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-extrabold text-[#1a1008] w-5 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-white hover:bg-[#C8102E] transition-all shadow-xs cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAdd}
                disabled={!isAvailable}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all shadow-md cursor-pointer ${
                  added
                    ? 'bg-[#16603A] text-white'
                    : !isAvailable
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-crimson'
                }`}
              >
                {added ? (
                  <><Check className="w-4 h-4" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Add {qty > 1 ? `${qty} ` : ''}· {formatCurrency(dish.price * qty)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
