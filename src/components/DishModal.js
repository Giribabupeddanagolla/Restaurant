/* ==========================================================================
   GIRI RESTAURANT - DISH MODAL COMPONENT (src/components/DishModal.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderDishModal(state) {
  if (state.activeModal !== 'dish-detail' || !state.selectedDish) return '';

  const dish = state.selectedDish;

  return `
    <div class="drawer-overlay active" onclick="store.closeModal()"></div>
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:720px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px solid var(--border-glass);overflow:hidden;z-index:1100;box-shadow:var(--shadow-lg);display:flex;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;height:280px;position:relative;background:#f8f5f0;">
        <img src="${dish.image}" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div style="flex:1;min-width:280px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;position:relative;">
        <button class="icon-btn" onclick="store.closeModal()" style="position:absolute;top:16px;right:16px;z-index:10;"><i data-feather="x"></i></button>
        <div>
          <h3 style="font-size:20px;font-weight:800;margin-bottom:8px;padding-right:32px;">${dish.name}</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">${dish.description}</p>
          ${dish.customizations && dish.customizations.length ? `
            <div style="font-size:13px;font-weight:700;margin-bottom:8px;">Customizations</div>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
              ${dish.customizations.map((c, i) => `
                <label style="display:flex;justify-content:space-between;background:var(--bg-card);padding:10px 14px;border-radius:var(--radius-md);cursor:pointer;font-size:13px;">
                  <span><input type="checkbox" id="modal-cust-${i}"> ${c.name}</span>
                  <span style="color:var(--accent-primary);font-weight:700;">+$${c.price.toFixed(2)}</span>
                </label>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div style="display:flex;gap:12px;margin-top:16px;">
          <button class="btn btn-secondary" style="flex:1;" onclick="store.closeModal()">Cancel</button>
          <button class="btn btn-primary" style="flex:1;" onclick="
            const custs = [];
            ${dish.customizations ? dish.customizations.map((c, i) => `
              if (document.getElementById('modal-cust-${i}') && document.getElementById('modal-cust-${i}').checked) custs.push(store.state.selectedDish.customizations[${i}]);
            `).join('') : ''}
            store.addToCart(store.state.selectedDish, custs);
            store.closeModal();
          ">
            Add to Cart ($${dish.price.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  `;
}
