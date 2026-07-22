'use client';

import { ShoppingBag } from 'lucide-react';
import { memo } from 'react';
import { useCart } from '@/context/CartContext';

function FloatingCartButtonComponent() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#8B0000] to-[#C8102E] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-40 active:scale-95"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-[#8B0000] text-xs md:text-sm font-extrabold w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-[#8B0000]">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}

export default memo(FloatingCartButtonComponent);
