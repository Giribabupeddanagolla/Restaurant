'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

function CartDrawerComponent() {
  const { items, totalItems, totalPrice, isOpen, closeCart, updateQty, removeItem, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer - Floating Panel Style */}
      <div
        className={`fixed bottom-0 sm:top-0 sm:right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'
        }`}
      >
        {/* Header - Floating Style */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#C8A055]/20">
          <button
            onClick={closeCart}
            className="text-[#8B0000] hover:text-[#C8102E] transition-colors p-1 ml-auto"
            aria-label="Close cart"
            title="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
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
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
              {items.map(({ dish, qty }) => (
                <div key={dish.id} className="flex gap-3 p-3 rounded-2xl bg-[#F8F5F0] border border-[#C8A055]/10">
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1a1008] text-sm line-clamp-1">{dish.name}</h4>
                    <p className="text-xs text-[#6b5840] mt-0.5">
                      ${dish.price.toFixed(2)} each
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
                      ${(dish.price * qty).toFixed(2)}
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
                <span className="font-bold text-[#1a1008]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6b5840]">Delivery</span>
                <span className="font-bold text-[#16603A]">Free</span>
              </div>
              <hr className="border-[#C8A055]/20" />
              <div className="flex justify-between">
                <span className="font-extrabold text-[#1a1008]">Total</span>
                <span className="font-extrabold text-[#8B0000] text-lg">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => { clearCart(); closeCart(); alert('Order placed! Thank you for dining with Giri Restaurant.'); }}
                className="btn-crimson py-3.5 rounded-xl font-extrabold text-sm w-full mt-1"
              >
                Place Order · ${totalPrice.toFixed(2)}
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
