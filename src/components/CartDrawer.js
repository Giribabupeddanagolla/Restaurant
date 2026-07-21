/* ==========================================================================
   GIRI RESTAURANT - CART DRAWER COMPONENT (src/components/CartDrawer.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderCartDrawer(state) {
  const isOpen = state.activeModal === 'cart-drawer';
  const subtotal = state.cart.reduce((a, b) => a + (b.unitPrice * b.quantity), 0);
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  return `
    <div class="drawer-overlay ${isOpen ? 'active' : ''}" onclick="store.closeModal()"></div>
    <div class="cart-drawer ${isOpen ? 'active' : ''}">
      <div class="drawer-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <i data-feather="shopping-bag" style="color:var(--accent-primary);"></i>
          <h3 style="font-size:18px;font-weight:800;">Your Cart</h3>
        </div>
        <button class="icon-btn" onclick="store.closeModal()"><i data-feather="x"></i></button>
      </div>

      <div class="cart-items-list">
        ${state.cart.length > 0 ? state.cart.map((item, idx) => `
          <div class="cart-item">
            <div>
              <div style="font-weight:700;font-size:14px;">${item.dish.name}</div>
              <div style="font-size:12px;color:var(--text-muted);">$${item.unitPrice.toFixed(2)} ea</div>
            </div>
            <div class="qty-control">
              <button class="qty-btn" onclick="store.updateCartQty(${idx}, -1)">-</button>
              <span style="font-weight:800;">${item.quantity}</span>
              <button class="qty-btn" onclick="store.updateCartQty(${idx}, 1)">+</button>
            </div>
          </div>
        `).join('') : '<div style="text-align:center;padding:30px;color:var(--text-muted);">Cart is empty</div>'}
      </div>

      <div style="border-top:1px solid var(--border-glass);padding-top:14px;display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;justify-content:space-between;font-size:14px;">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;">
          <span>Total</span>
          <span style="color:var(--accent-primary);">$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" style="width:100%;padding:14px;" ${state.cart.length === 0 ? 'disabled' : ''} onclick="store.placeOrder()">
          🚀 Confirm Order
        </button>
      </div>
    </div>
  `;
}
