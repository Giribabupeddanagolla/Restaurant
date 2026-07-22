'use client';

import { memo, useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types';

interface AddButtonProps {
  dish: MenuItem;
  variant?: 'sm' | 'md';
}

/**
 * AddButton - Reusable add-to-cart button with flash animation
 * Used across homepage and menu pages to add items to cart
 * Memoized to prevent unnecessary re-renders when parent updates
 */
function AddButtonComponent({ dish, variant = 'sm' }: AddButtonProps) {
  const { addItem, items } = useCart();
  const [flashed, setFlashed] = useState(false);
  const inCart = items.find((i) => i.dish.id === dish.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Don't trigger parent click handlers
    addItem(dish);
    setFlashed(true);
    setTimeout(() => setFlashed(false), 1200);
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-1 rounded-lg font-bold transition-all ${sizeClasses[variant]} ${
        flashed ? 'bg-[#16603A] text-white scale-95' : 'btn-primary'
      }`}
    >
      {flashed ? (
        <>
          <Check className={variant === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          Added!
        </>
      ) : (
        <>
          <Plus className={variant === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          {inCart ? `Add (${inCart.qty})` : 'Add'}
        </>
      )}
    </button>
  );
}

export default memo(AddButtonComponent);
