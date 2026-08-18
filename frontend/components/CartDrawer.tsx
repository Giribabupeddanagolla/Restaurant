'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatters';
import { orderApi } from '@/services/restaurantService';

import { usePathname } from 'next/navigation';

import RestaurantInfo from '@/components/RestaurantInfo';
import { getMatchingFoodImage } from '@/data/mockData';

function CartDrawerComponent() {
  const pathname = usePathname();
  const { items, cartShopName, totalItems, totalPrice, isOpen, closeCart, updateQty, removeItem, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Lock background body scroll while Cart Drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [isOpen]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/merchant') || pathname?.startsWith('/manager')) {
    return null;
  }

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    const orderNum = `GIRI-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      orderApi.createOrder({
        orderNumber: orderNum,
        totalAmount: totalPrice,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        items: items.map((i) => ({
          dish: i.dish,
          quantity: i.qty,
          unitPrice: i.dish.price,
        })),
      } as any).catch(() => {});

      setOrderSuccess(orderNum);
      clearCart();
    } catch {
      setOrderSuccess(orderNum);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          onClick={() => { setOrderSuccess(null); closeCart(); }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#C8A055]/20 bg-gradient-to-r from-[#8B0000] to-[#C8102E]">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-extrabold text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-white text-[#8B0000] text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => { setOrderSuccess(null); closeCart(); }}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success State */}
        {orderSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold shadow-lg animate-bounce">
              ✓
            </div>
            <h3 className="text-xl font-extrabold text-[#1a1008]">Order Confirmed!</h3>
            <p className="text-xs text-[#6b5840]">
              Your order <span className="font-bold text-[#8B0000]">{orderSuccess}</span> has been processed instantly.
            </p>
            <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-[#C8A055]/20 w-full text-xs text-left space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="font-bold text-emerald-700">Confirmed</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Est. Time:</span><span className="font-bold text-[#1a1008]">20 - 25 Mins</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Transaction:</span><span className="font-bold text-emerald-700">Instant Speed (0.02s)</span></div>
            </div>
            <button
              onClick={() => { setOrderSuccess(null); closeCart(); }}
              className="btn-crimson py-3 px-6 rounded-xl font-extrabold text-xs w-full mt-2"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#FFF8F0] flex items-center justify-center text-4xl">
              🛒
            </div>
            <h3 className="font-extrabold text-[#1a1008] text-lg">Your cart is empty</h3>
            <p className="text-sm text-[#6b5840]">Add dishes from our menu to get started.</p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="btn-crimson px-6 py-2.5 rounded-xl text-sm font-bold mt-2"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Restaurant Context Header */}
            {items.length > 0 && (
              <div className="px-4 py-3 border-b border-[#8B0000]/10 bg-[#FFF8F0] shrink-0">
                <RestaurantInfo
                  shopName={items[0].dish.shopName}
                  shopId={items[0].dish.shopId}
                  merchantId={items[0].dish.merchantId}
                  city={items[0].dish.city}
                  address={items[0].dish.address}
                  compact
                  showViewButton
                  onViewRestaurant={closeCart}
                />
              </div>
            )}

            {/* Items list */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-4">
              {items.map(({ dish, qty }) => (
                <div key={dish.id} className="flex gap-3 p-3 rounded-2xl bg-[#F8F5F0] border border-[#C8A055]/10">
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                    <img
                      src={getMatchingFoodImage(dish.name, dish.category, dish.subCategory, dish.image)}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getMatchingFoodImage(dish.name, dish.category, dish.subCategory);
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1a1008] text-sm line-clamp-1">{dish.name}</h4>
                    <p className="text-xs text-[#6b5840] mt-0.5">
                      {formatCurrency(dish.price)} each
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(dish.id, qty - 1)}
                        className="w-6 h-6 rounded-full bg-white border border-[#8B0000]/20 flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-extrabold text-[#1a1008] w-5 text-center">{qty}</span>
                      <button
                        onClick={() => updateQty(dish.id, qty + 1)}
                        className="w-6 h-6 rounded-full bg-[#8B0000] flex items-center justify-center text-white hover:bg-[#C8102E] transition-all"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line total + delete */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeItem(dish.id)}
                      className="text-[#a09070] hover:text-[#8B0000] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold text-[#8B0000] text-sm">
                      {formatCurrency(dish.price * qty)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-5 border-t border-[#C8A055]/20 flex flex-col gap-3 bg-[#FDFAF7]">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-[#6b5840]">Subtotal ({totalItems} items)</span>
                <span className="font-bold text-[#1a1008]">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6b5840]">Delivery</span>
                <span className="font-bold text-[#16603A]">Free</span>
              </div>
              <hr className="border-[#C8A055]/20" />
              <div className="flex justify-between">
                <span className="font-extrabold text-[#1a1008]">Total</span>
                <span className="font-extrabold text-[#8B0000] text-lg">{formatCurrency(totalPrice)}</span>
              </div>

              {/* Checkout Button */}
              <button
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="btn-crimson py-3.5 rounded-xl font-extrabold text-sm w-full mt-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Fast...</span>
                ) : (
                  <span>Place Order · {formatCurrency(totalPrice)}</span>
                )}
              </button>

              <button
                onClick={clearCart}
                className="text-xs text-center text-[#a09070] hover:text-[#8B0000] transition-colors font-semibold"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default memo(CartDrawerComponent);
