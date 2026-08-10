import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ dish: MenuItem; quantity?: number }>) => {
      const existing = state.items.find((i) => i.dish.id === action.payload.dish.id);
      const qty = action.payload.quantity || 1;
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items.push({ dish: action.payload.dish, quantity: qty });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.dish.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.dish.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.dish.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCartDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCartDrawer } = cartSlice.actions;
export default cartSlice.reducer;
