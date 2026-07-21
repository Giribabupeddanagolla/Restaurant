/* ==========================================================================
   GIRI RESTAURANT - PUBLIC ABOUT US PAGE (src/pages/AboutPage.js)
   ========================================================================== */

import { CHEFS_SHOWCASE, GALLERY_IMAGES } from '../data/mockData.js';

export function renderAboutPage() {
  return `
    <div class="container" style="padding-top:30px;">
      <div style="text-align:center;margin-bottom:40px;">
        <span class="badge badge-primary">OUR HERITAGE</span>
        <h1 class="section-title" style="margin-top:8px;">About Giri Restaurant</h1>
        <p class="section-subtitle">Where traditional culinary perfection meets modern digital technology.</p>
      </div>

      <!-- Story Section -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin-bottom:60px;">
        <div>
          <h2 style="font-size:28px;font-weight:800;margin-bottom:16px;">A Legacy of Flavor & Innovation</h2>
          <p style="color:var(--text-muted);margin-bottom:16px;">
            Founded with a passion for European fusion and artisanal dining, Giri Restaurant combines timeless recipes with sub-second digital ordering technology.
          </p>
          <p style="color:var(--text-muted);">
            We source 100% organic, non-GMO produce and grass-fed meats directly from certified local farms to ensure that every single dish delivered to your table is fresh and nutritious.
          </p>
        </div>
        <div style="height:300px;border-radius:var(--radius-lg);overflow:hidden;">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover;">
        </div>
      </section>

      <!-- Chefs Showcase -->
      <section style="margin-bottom:60px;">
        <h2 class="section-title" style="text-align:center;margin-bottom:30px;">👨‍🍳 Meet Our Culinary Masters</h2>
        <div class="grid-cards">
          ${CHEFS_SHOWCASE.map(chef => `
            <div class="dish-card" style="padding:20px;text-align:center;">
              <div style="width:120px;height:120px;border-radius:var(--radius-full);overflow:hidden;margin:0 auto 16px auto;border:3px solid var(--accent-primary);">
                <img src="${chef.image}" style="width:100%;height:100%;object-fit:cover;">
              </div>
              <h3 style="font-size:18px;font-weight:800;">${chef.name}</h3>
              <div style="color:var(--accent-primary);font-size:13px;font-weight:700;margin-bottom:6px;">${chef.title}</div>
              <div style="font-size:12px;color:var(--text-dim);margin-bottom:12px;">${chef.experience}</div>
              <p style="font-size:13px;color:var(--text-muted);">${chef.bio}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Ambience Gallery -->
      <section>
        <h2 class="section-title" style="text-align:center;margin-bottom:20px;">🖼️ Ambience & Interior Gallery</h2>
        <div class="gallery-grid">
          ${GALLERY_IMAGES.map(imgUrl => `
            <div class="gallery-item">
              <img src="${imgUrl}" loading="lazy">
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}
