/* ==========================================================================
   GIRI RESTAURANT - PUBLIC OFFERS & DEALS PAGE (src/pages/OffersPage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderOffersPage(state) {
  return `
    <div class="container" style="padding-top:30px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">SPECIAL DEALS</span>
        <h1 class="section-title" style="margin-top:8px;">Exclusive Offers & Promo Coupons</h1>
        <p class="section-subtitle">Use these promo codes at checkout or show to your waiter to claim discounts.</p>
      </div>

      <div class="offers-grid">
        ${state.offers.map(offer => `
          <div class="offer-card">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="badge badge-primary">${offer.badge}</span>
              <span style="font-size:12px;color:var(--text-muted);">${offer.expiry}</span>
            </div>

            <h3 style="font-size:20px;font-weight:800;margin-top:4px;">${offer.title}</h3>
            <p style="color:var(--text-muted);font-size:14px;">${offer.description}</p>

            <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;">
              <div class="coupon-code" onclick="navigator.clipboard.writeText('${offer.code}'); alert('Copied promo code: ${offer.code}')">
                <span>CODE: ${offer.code}</span>
                <i data-feather="copy" style="width:14px;height:14px;margin-left:8px;"></i>
              </div>
              <button class="btn btn-primary btn-sm" onclick="store.setRoute('menu')">Use Now</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
