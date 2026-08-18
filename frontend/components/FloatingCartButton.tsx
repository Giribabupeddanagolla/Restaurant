'use client';

import { ShoppingBag } from 'lucide-react';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';

function FloatingCartButtonComponent() {
  const pathname = usePathname();
  const { totalItems, totalPrice, openCart } = useCart();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/merchant') || pathname?.startsWith('/manager')) {
    return null;
  }

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 h-14 md:h-16 bg-gradient-to-br from-[#8B0000] to-[#C8102E] text-white rounded-full shadow-[0_8px_30px_rgba(139,0,0,0.4)] hover:shadow-[0_12px_35px_rgba(139,0,0,0.5)] hover:scale-105 transition-all duration-300 z-40 active:scale-95 group border border-white/20 backdrop-blur-md"
      aria-label="Open cart"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300" />
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-2.5 bg-white text-[#8B0000] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#8B0000] animate-pulse">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </div>

      {totalItems > 0 ? (
        <span className="font-extrabold text-sm tracking-wide pr-1">
          {formatCurrency(totalPrice)}
        </span>
      ) : (
        <span className="font-bold text-xs md:text-sm tracking-wide pr-1">
          Cart
        </span>
      )}
    </button>
  );
}

export default memo(FloatingCartButtonComponent);

