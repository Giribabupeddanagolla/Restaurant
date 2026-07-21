/* ==========================================================================
   GIRI RESTAURANT - DISH MODAL COMPONENT (src/components/DishModal.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderDishModal(state) {
  if (state.activeModal !== 'dish-detail' || !state.selectedDish) return '';

  const dish = state.selectedDish;

  return `
    <div class="drawer-overlay active" onclick="store.closeModal()"></div>
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:440px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px solid var(--border-glass);padding:24px;z-index:1100;box-shadow:var(--shadow-lg);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3 style="font-size:20px;font-weight:800;">${dish.name}</h3>
        <button class="icon-btn" onclick="store.closeModal()"><i data-feather="x"></i></button>
      </div>

      <img src="${dish.image}" style="width:100%;height:180px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:14px;">

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

      <div style="display:flex;gap:12px;">
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
  `;
}
