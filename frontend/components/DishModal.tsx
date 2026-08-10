'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Clock, Star, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';

interface Props {
  dish: MenuItem | null;
  onClose: () => void;
}

export default function DishModal({ dish, onClose }: Props) {
  const { addItem, items } = useCart();
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const inCart = items.find((i) => i.dish.id === dish.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(dish);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — side-by-side layout (left side image, right side details) */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        <div
          className="bg-white w-full sm:max-w-5xl sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col sm:flex-row items-stretch max-h-[95vh] sm:max-h-[90vh] sm:h-[620px] overflow-hidden relative transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1a1008] shadow-md hover:bg-white hover:scale-105 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Image Container (50% width of large card) */}
          <div className="relative h-64 sm:h-full sm:w-1/2 w-full bg-[#F8F5F0] shrink-0 overflow-hidden self-stretch min-h-[260px]">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />

            {/* Badges on image bottom left */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 pr-4">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md ${
                dish.dietary.includes('veg')
                  ? 'bg-white text-[#16603A] border border-[#16603A]/20'
                  : 'bg-white text-[#8B0000] border border-[#8B0000]/20'
              }`}>
                {dish.dietary.includes('veg') ? '🌱 Vegetarian' : '🥩 Non-Veg'}
              </span>
              {dish.dietary.includes('chef-special') && (
                <span className="bg-[#8B0000] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  ⭐ Chef Special
                </span>
              )}
              {dish.dietary.includes('spicy') && (
                <span className="bg-amber-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  🔥 Spicy
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Details & Actions (50% width of large card) */}
          <div className="sm:w-1/2 w-full flex flex-col justify-between max-h-[60vh] sm:max-h-full bg-white overflow-hidden self-stretch">
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 px-8 py-8 flex flex-col gap-5">
              
              {/* Title & Meta info */}
              <div className="pr-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1008] leading-tight">{dish.name}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6b5840] bg-[#F8F5F0] px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-[#C8A055]" /> {dish.prepTime} min prep
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6b5840] bg-[#F8F5F0] px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 text-[#C8A055] fill-[#C8A055]" /> 4.8
                  </span>
                  <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg ${
                    dish.available ? 'bg-[#F0FAF4] text-[#16603A]' : 'bg-red-50 text-red-500'
                  }`}>
                    {dish.available ? '✓ Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#4a3820] leading-relaxed">{dish.description}</p>

              {/* Customizations / Add-ons */}
              {dish.customizations && dish.customizations.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#1a1008] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#8B0000] rounded-full inline-block" />
                    Add-ons & Customizations
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {dish.customizations.map((opt) => (
                      <div key={opt.name} className="flex justify-between items-center bg-[#F8F5F0] rounded-xl px-5 py-3 border border-[#C8A055]/15">
                        <span className="text-sm sm:text-base text-[#4a3820] font-medium">{opt.name}</span>
                        <span className="text-sm sm:text-base font-extrabold text-[#8B0000] shrink-0 ml-2">
                          {opt.price === 0 ? 'Free' : `+${formatCurrency(opt.price)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {dish.dietary.map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-full text-xs sm:text-sm font-semibold text-[#6b5840] capitalize">
                    {tag === 'veg' ? '🌱 Vegetarian' : tag === 'spicy' ? '🔥 Spicy' : tag === 'chef-special' ? '⭐ Chef Special' : tag}
                  </span>
                ))}
              </div>

              {inCart && (
                <p className="text-xs sm:text-sm text-[#16603A] font-semibold bg-[#F0FAF4] px-4 py-3 rounded-xl border border-[#16603A]/10">
                  ✓ You already have {inCart.qty} of this in your cart
                </p>
              )}
            </div>

            {/* Bottom Actions Footer (Price, Qty, Add button) */}
            <div className="shrink-0 px-8 py-5 border-t border-[#C8A055]/20 bg-white flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6b5840] block font-bold uppercase tracking-wider">Price</span>
                  <span className="text-3xl font-black text-[#8B0000]">{formatCurrency(dish.price * qty)}</span>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-4 bg-[#F8F5F0] rounded-xl px-4 py-2 border border-[#C8A055]/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white border border-[#8B0000]/20 flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all shadow-sm"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-extrabold text-[#1a1008] w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center text-white hover:bg-[#C8102E] transition-all shadow-sm"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAdd}
                disabled={!dish.available}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-extrabold transition-all shadow-md ${
                  added
                    ? 'bg-[#16603A] text-white'
                    : !dish.available
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-crimson'
                }`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Add {qty > 1 ? `${qty} ` : ''}· {formatCurrency(dish.price * qty)}</>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
