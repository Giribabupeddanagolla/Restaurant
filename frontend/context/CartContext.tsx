'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MenuItem } from '@/types';
import { Building2, AlertTriangle, Trash2, X } from 'lucide-react';

export interface CartItem {
  dish: MenuItem;
  qty: number;
}

interface PendingConflict {
  dish: MenuItem;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  cartShopId: string | null;
  cartShopName: string | null;
  totalItems: number;
  totalPrice: number;
  addItem: (dish: MenuItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingConflict, setPendingConflict] = useState<PendingConflict | null>(null);

  const getDishId = (dish: MenuItem) => dish.id || (dish as any)._id || dish.name;
  const getDishShopId = (dish: MenuItem) => dish.shopId || (dish as any).shop_id || dish.merchantId || dish.shopName || dish.shopSlug || 'default-restaurant';
  const getDishShopName = (dish: MenuItem) => dish.shopName || dish.shopSlug || 'Royal Restaurant';

  const cartShopId = items.length > 0 ? getDishShopId(items[0].dish) : null;
  const cartShopName = items.length > 0 ? getDishShopName(items[0].dish) : null;

  const addItem = useCallback((dish: MenuItem, quantity: number = 1) => {
    const dishId = getDishId(dish);
    const numAdd = Math.max(1, Number(quantity) || 1);
    const dishShopId = getDishShopId(dish);

    setItems((prev) => {
      if (prev.length > 0) {
        const currentShopId = getDishShopId(prev[0].dish);
        if (currentShopId !== dishShopId) {
          // Trigger conflict modal
          setPendingConflict({ dish, quantity: numAdd });
          return prev; // Do not modify items yet
        }
      }

      const existing = prev.find((i) => getDishId(i.dish) === dishId);
      if (existing) {
        return prev.map((i) => (getDishId(i.dish) === dishId ? { ...i, qty: i.qty + numAdd } : i));
      }
      return [...prev, { dish, qty: numAdd }];
    });

    // Only open drawer if no conflict
    if (items.length === 0 || cartShopId === dishShopId) {
      setIsOpen(true);
    }
  }, [items.length, cartShopId]);

  const handleResolveConflict = () => {
    if (pendingConflict) {
      const { dish, quantity } = pendingConflict;
      setItems([{ dish, qty: quantity }]);
      setPendingConflict(null);
      setIsOpen(true);
    }
  };

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => getDishId(i.dish) !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => getDishId(i.dish) !== id));
    } else {
      setItems((prev) => prev.map((i) => (getDishId(i.dish) === id ? { ...i, qty } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + (i.dish.finalPrice || i.dish.price) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartShopId,
        cartShopName,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}

      {/* SWIGGY-STYLE SINGLE RESTAURANT CART CONFLICT MODAL */}
      {pendingConflict && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div className="flex items-center gap-2 text-[#8B0000]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#1a1008]">Replace Cart Items?</h3>
              </div>
              <button
                onClick={() => setPendingConflict(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#4a3820] leading-relaxed">
              Your cart currently contains items from <span className="font-extrabold text-[#8B0000]">"{cartShopName || 'another restaurant'}"</span>.
              Do you want to clear your current cart and add items from <span className="font-extrabold text-[#8B0000]">"{getDishShopName(pendingConflict.dish)}"</span>?
            </p>

            <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#8B0000]/10 text-xs space-y-1">
              <div className="font-bold text-[#8B0000] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> New Item to Add:
              </div>
              <div className="font-extrabold text-[#1a1008] pl-5">{pendingConflict.dish.name} (×{pendingConflict.quantity})</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setPendingConflict(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold border border-[#8B0000]/20 text-[#4a3820] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Keep Current Cart
              </button>
              <button
                onClick={handleResolveConflict}
                className="flex-1 btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Cart & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
