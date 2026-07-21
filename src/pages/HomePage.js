/* ==========================================================================
   GIRI RESTAURANT - PUBLIC HOME PAGE (src/pages/HomePage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderHomePage(state) {
  const featuredDishes = state.dishes.slice(0, 3);

  return `
    <div style="display:flex;flex-direction:column;gap:60px;">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <span class="badge badge-primary">✨ MODERN LUXURY FINE DINING</span>
          <h1 class="hero-title">Experience Culinary Artistry & Sub-Second Ordering</h1>
          <p class="hero-subtitle">
            Scan your table QR code, browse our chef-curated artisanal menu with zero delay, and enjoy real-time kitchen tracking.
          </p>
          <div class="hero-cta-group">
            <button class="btn btn-primary" onclick="store.setRoute('menu')">
              🍽️ Explore Digital Menu
            </button>
            <button class="btn btn-secondary" onclick="store.setRoute('reserve')">
              📅 Book a Table
            </button>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- Feature Highlights Row -->
        <section class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📲</div>
            <h3 style="font-size:18px;font-weight:700;">Instant QR Table Menu</h3>
            <p style="color:var(--text-muted);font-size:14px;">
              No PDF downloads or slow loading menus. Browse categories and customize dishes in under 50 milliseconds.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👨‍🍳</div>
            <h3 style="font-size:18px;font-weight:700;">Artisanal Gastronomy</h3>
            <p style="color:var(--text-muted);font-size:14px;">
              Handcrafted by Executive Chef Gordon R. using farm-fresh, organic, and ethically sourced ingredients.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 style="font-size:18px;font-weight:700;">Live Kitchen Progress</h3>
            <p style="color:var(--text-muted);font-size:14px;">
              Watch your order progress live on screen from ticket placement to chef preparation and serving.
            </p>
          </div>
        </section>

        <!-- Chef's Featured Specials -->
        <section style="margin:40px 0;">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;">
            <div>
              <h2 class="section-title">⭐ Signature Chef Specials</h2>
              <p class="section-subtitle">Our most celebrated dishes prepared with passion and precision.</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="store.setRoute('menu')">View Full Menu →</button>
          </div>

          <div class="grid-cards">
            ${featuredDishes.map(dish => `
              <div class="dish-card">
                <div class="dish-img-wrapper">
                  <img src="${dish.image}" alt="${dish.name}" class="dish-img">
                  <div class="diet-tag">⭐ Chef Special</div>
                </div>
                <div class="dish-details">
                  <div>
                    <h4 class="dish-title">${dish.name}</h4>
                    <p class="dish-desc">${dish.description}</p>
                  </div>
                  <div class="dish-footer">
                    <span class="dish-price">$${dish.price.toFixed(2)}</span>
                    <button class="btn btn-primary btn-sm" onclick="store.openDishModal(store.state.dishes.find(d => d.id === '${dish.id}'))">
                      + Add to Order
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Dining Ambience Section -->
        <section style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:40px;margin:40px 0;display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center;">
          <div>
            <span class="badge badge-primary">ELEGANT ATMOSPHERE</span>
            <h2 style="font-size:32px;font-weight:800;margin:12px 0 16px 0;">A Feast for All Your Senses</h2>
            <p style="color:var(--text-muted);font-size:15px;margin-bottom:20px;">
              Step into our dark luxury sanctuary designed with moody ambient lighting, cozy velvet booths, and subtle jazz acoustics.
            </p>
            <button class="btn btn-primary" onclick="store.setRoute('reserve')">Reserve Your Spot</button>
          </div>
          <div style="height:260px;border-radius:var(--radius-md);overflow:hidden;">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover;">
          </div>
        </section>
      </div>
    </div>
  `;
}
