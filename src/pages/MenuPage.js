/* ==========================================================================
   GIRI RESTAURANT - PUBLIC DIGITAL MENU PAGE (src/pages/MenuPage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderMenuPage(state) {
  const filteredDishes = state.dishes.filter(dish => {
    const matchCategory = state.activeCategory === 'all' || dish.category === state.activeCategory;
    const matchSearch = !state.searchQuery || dish.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || dish.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchDiet = state.dietaryFilter === 'all' || dish.dietary.includes(state.dietaryFilter);
    return matchCategory && matchSearch && matchDiet;
  });

  return `
    <div class="container" style="padding-top:30px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">DIGITAL MENU</span>
        <h1 class="section-title" style="margin-top:8px;">Artisanal Culinary Menu</h1>
        <p class="section-subtitle">Select dishes to customize and add directly to your live mobile order cart.</p>
      </div>

      <!-- Search & Filters Header -->
      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px;">
        <div class="search-wrapper">
          <i data-feather="search" class="search-icon"></i>
          <input type="text" class="form-input" placeholder="Search dishes, ingredients (e.g. Wagyu, Truffle, Salmon)..." 
            value="${state.searchQuery}" oninput="store.setSearch(this.value)">
        </div>

        <div style="display:flex;gap:8px;align-items:center;overflow-x:auto;">
          <div class="pill-chip ${state.dietaryFilter === 'all' ? 'active' : ''}" onclick="store.setDietFilter('all')">All Diets</div>
          <div class="pill-chip ${state.dietaryFilter === 'veg' ? 'active' : ''}" onclick="store.setDietFilter('veg')">🌱 Vegetarian</div>
          <div class="pill-chip ${state.dietaryFilter === 'spicy' ? 'active' : ''}" onclick="store.setDietFilter('spicy')">🔥 Spicy</div>
          <div class="pill-chip ${state.dietaryFilter === 'chef-special' ? 'active' : ''}" onclick="store.setDietFilter('chef-special')">⭐ Chef Special</div>
        </div>
      </div>

      <!-- Categories Pills -->
      <div class="pill-container" style="margin-bottom:24px;">
        ${state.categories.map(cat => `
          <div class="pill-chip ${state.activeCategory === cat.id ? 'active' : ''}" onclick="store.setCategory('${cat.id}')">
            <span>${cat.icon}</span> ${cat.name}
          </div>
        `).join('')}
      </div>

      <!-- Dishes Grid -->
      <div class="grid-cards">
        ${filteredDishes.length > 0 ? filteredDishes.map(dish => `
          <div class="dish-card">
            <div class="dish-img-wrapper">
              <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
              <div class="diet-tag">
                ${dish.dietary.includes('veg') ? '🌱 Veg' : '🥩 Non-Veg'}
                ${dish.dietary.includes('spicy') ? ' • 🔥 Spicy' : ''}
              </div>
            </div>
            <div class="dish-details">
              <div>
                <h4 class="dish-title">${dish.name}</h4>
                <p class="dish-desc">${dish.description}</p>
              </div>
              <div class="dish-footer">
                <div class="dish-price">$${dish.price.toFixed(2)}</div>
                <button class="btn btn-primary btn-sm" onclick="store.openDishModal(store.state.dishes.find(d => d.id === '${dish.id}'))">
                  + Customize & Add
                </button>
              </div>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column:1/-1;text-align:center;padding:50px;color:var(--text-muted);">
            <h3>No dishes found matching your criteria</h3>
            <p style="margin-top:6px;">Try clearing filters or searching for something else.</p>
          </div>
        `}
      </div>
    </div>
  `;
}
