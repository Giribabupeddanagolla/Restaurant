'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Clock, Star, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';

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
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — full screen on mobile, card on larger */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-52 sm:h-60 w-full bg-[#F8F5F0] shrink-0">
            <Image src={dish.image} alt={dish.name} fill className="object-cover" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1a1008] shadow"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badges */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow ${
                dish.dietary.includes('veg')
                  ? 'bg-white text-[#16603A] border border-[#16603A]/20'
                  : 'bg-white text-[#8B0000] border border-[#8B0000]/20'
              }`}>
                {dish.dietary.includes('veg') ? '🌱 Vegetarian' : '🥩 Non-Veg'}
              </span>
              {dish.dietary.includes('chef-special') && (
                <span className="bg-[#8B0000] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">⭐ Chef Special</span>
              )}
              {dish.dietary.includes('spicy') && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">🔥 Spicy</span>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-5 py-5 flex flex-col gap-4">

            {/* Title + meta */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1008] leading-tight">{dish.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-[#6b5840]">
                  <Clock className="w-3.5 h-3.5 text-[#C8A055]" /> {dish.prepTime} min prep
                </span>
                <span className="flex items-center gap-1 text-xs text-[#6b5840]">
                  <Star className="w-3.5 h-3.5 text-[#C8A055] fill-[#C8A055]" /> 4.8
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  dish.available ? 'bg-[#F0FAF4] text-[#16603A]' : 'bg-red-50 text-red-500'
                }`}>
                  {dish.available ? '✓ Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4a3820] leading-relaxed">{dish.description}</p>

            {/* Customizations */}
            {dish.customizations && dish.customizations.length > 0 && (
              <div>
                <h4 className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span className="w-1 h-3.5 bg-[#8B0000] rounded-full inline-block" />
                  Add-ons & Customizations
                </h4>
                <div className="flex flex-col gap-2">
                  {dish.customizations.map((opt) => (
                    <div key={opt.name} className="flex justify-between items-center bg-[#F8F5F0] rounded-xl px-4 py-2.5 border border-[#C8A055]/10">
                      <span className="text-sm text-[#4a3820] font-medium">{opt.name}</span>
                      <span className="text-sm font-bold text-[#8B0000] shrink-0 ml-2">
                        {opt.price === 0 ? 'Free' : `+$${opt.price.toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary tags */}
            <div className="flex flex-wrap gap-2">
              {dish.dietary.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-full text-xs font-semibold text-[#6b5840] capitalize">
                  {tag === 'veg' ? '🌱 Vegetarian' : tag === 'spicy' ? '🔥 Spicy' : tag === 'chef-special' ? '⭐ Chef Special' : tag}
                </span>
              ))}
            </div>

            {inCart && (
              <p className="text-xs text-[#16603A] font-semibold bg-[#F0FAF4] px-3 py-2 rounded-xl">
                ✓ You already have {inCart.qty} of this in your cart
              </p>
            )}
          </div>

          {/* Sticky footer — price, qty, add */}
          <div className="shrink-0 px-5 py-4 border-t border-[#C8A055]/20 bg-white flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
              {/* Qty */}
              <div className="flex items-center gap-3 bg-[#F8F5F0] rounded-xl px-3 py-2 border border-[#C8A055]/15">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full bg-white border border-[#8B0000]/20 flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base font-extrabold text-[#1a1008] w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 rounded-full bg-[#8B0000] flex items-center justify-center text-white hover:bg-[#C8102E] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!dish.available}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-extrabold transition-all ${
                added
                  ? 'bg-[#16603A] text-white'
                  : !dish.available
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'btn-crimson'
              }`}
            >
              {added ? (
                <><Check className="w-4 h-4" /> Added to Cart!</>
              ) : (
                <><ShoppingBag className="w-4 h-4" /> Add {qty > 1 ? `${qty} ` : ''}· ${(dish.price * qty).toFixed(2)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
