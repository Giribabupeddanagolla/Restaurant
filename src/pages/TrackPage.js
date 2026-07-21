/* ==========================================================================
   GIRI RESTAURANT - PUBLIC ORDER TRACKING PAGE (src/pages/TrackPage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderTrackPage(state) {
  const activeOrder = state.trackedOrder || (state.orders.length > 0 ? state.orders[0] : null);

  return `
    <div class="container" style="padding-top:30px;max-width:640px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">LIVE STATUS</span>
        <h1 class="section-title" style="margin-top:8px;">Track Your Mobile Order</h1>
        <p class="section-subtitle">Real-time status updates directly synced with our Kitchen Display System.</p>
      </div>

      <!-- Search Order Form -->
      <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:20px;margin-bottom:24px;">
        <div class="search-wrapper">
          <i data-feather="search" class="search-icon"></i>
          <input type="text" class="form-input" id="order-lookup-input" placeholder="Enter Order ID (e.g. ORD-101) or Table Number..." 
            value="${activeOrder ? activeOrder.id : ''}">
        </div>
      </div>

      ${activeOrder ? `
        <!-- Live Order Card -->
        <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:24px;display:flex;flex-direction:column;gap:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span class="badge badge-primary">${activeOrder.status.toUpperCase()}</span>
              <h2 style="font-size:22px;font-weight:800;margin-top:6px;">Order #${activeOrder.id}</h2>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px;color:var(--text-muted);">Table Number</div>
              <div style="font-size:22px;font-weight:800;color:var(--accent-primary);">Table #${activeOrder.tableNumber}</div>
            </div>
          </div>

          <!-- Progress Stepper -->
          <div style="display:flex;justify-content:space-between;margin:16px 0;position:relative;">
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
              <div style="width:36px;height:36px;border-radius:999px;background:var(--accent-primary);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;">1</div>
              <span style="font-size:11px;font-weight:700;margin-top:4px;">Placed</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
              <div style="width:36px;height:36px;border-radius:999px;background:var(--accent-primary);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;">2</div>
              <span style="font-size:11px;font-weight:700;margin-top:4px;">Kitchen Prep</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
              <div style="width:36px;height:36px;border-radius:999px;background:var(--accent-primary);color:#FFF;display:flex;align-items:center;justify-content:center;font-weight:800;">3</div>
              <span style="font-size:11px;font-weight:700;margin-top:4px;">Chef Cooking</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
              <div style="width:36px;height:36px;border-radius:999px;background:var(--bg-card);color:var(--text-dim);display:flex;align-items:center;justify-content:center;font-weight:800;">4</div>
              <span style="font-size:11px;font-weight:700;margin-top:4px;">Ready</span>
            </div>
          </div>

          <!-- Items Summary -->
          <div style="background:var(--bg-card);padding:14px;border-radius:var(--radius-md);">
            <div style="font-weight:700;margin-bottom:10px;">Ordered Dishes:</div>
            ${activeOrder.items.map(item => `
              <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px;">
                <span>${item.quantity}x ${item.dish ? item.dish.name : item.name}</span>
                <span style="font-weight:700;color:var(--accent-primary);">$${((item.unitPrice || item.price) * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
            <div style="border-top:1px solid var(--border-glass);margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;font-weight:800;font-size:16px;">
              <span>Total Paid</span>
              <span style="color:var(--accent-primary);">$${activeOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ` : `
        <div style="text-align:center;padding:50px;color:var(--text-muted);background:var(--bg-surface);border-radius:var(--radius-lg);border:1px solid var(--border-glass);">
          <h3>No active order found</h3>
          <p style="margin-top:8px;">Place an order from our digital menu to track preparation live!</p>
          <button class="btn btn-primary" style="margin-top:16px;" onclick="store.setRoute('menu')">Browse Digital Menu</button>
        </div>
      `}
    </div>
  `;
}
