'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MenuItem } from '@/types';

export interface CartItem {
  dish: MenuItem;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
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

  const getDishId = (dish: MenuItem) => dish.id || (dish as any)._id || dish.name;

  const addItem = useCallback((dish: MenuItem, quantity: number = 1) => {
    const dishId = getDishId(dish);
    const numAdd = Math.max(1, Number(quantity) || 1);
    setItems((prev) => {
      const existing = prev.find((i) => getDishId(i.dish) === dishId);
      if (existing) {
        return prev.map((i) => getDishId(i.dish) === dishId ? { ...i, qty: i.qty + numAdd } : i);
      }
      return [...prev, { dish, qty: numAdd }];
    });
    setIsOpen(true); // open drawer on add
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => getDishId(i.dish) !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => getDishId(i.dish) !== id));
    } else {
      setItems((prev) => prev.map((i) => getDishId(i.dish) === id ? { ...i, qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.dish.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, totalItems, totalPrice,
      addItem, removeItem, updateQty, clearCart,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
