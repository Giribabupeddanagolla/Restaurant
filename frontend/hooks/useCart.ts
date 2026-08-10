import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart, updateQuantity, clearCart, toggleCartDrawer } from '@/store/slices/cartSlice';
import { MenuItem } from '@/types';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return {
    items: cart.items,
    isOpen: cart.isOpen,
    totalCount,
    subtotal,
    addItem: (dish: MenuItem, quantity?: number) => dispatch(addToCart({ dish, quantity })),
    removeItem: (id: string) => dispatch(removeFromCart(id)),
    updateQty: (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    emptyCart: () => dispatch(clearCart()),
    toggleDrawer: () => dispatch(toggleCartDrawer()),
  };
}
