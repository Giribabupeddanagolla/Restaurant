/* ==========================================================================
   GIRI RESTAURANT - PUBLIC FOOTER COMPONENT (src/components/Footer.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderFooter() {
  return `
    <footer class="public-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <div class="brand-icon-box" style="width:34px;height:34px;font-size:18px;">G</div>
              <span style="font-weight:800;font-size:18px;">Giri Restaurant</span>
            </div>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">
              Sub-second mobile QR ordering, artisanal gastronomy, and dark luxury ambiance. Experience culinary perfection.
            </p>
            <div style="display:flex;gap:10px;color:var(--accent-primary);">
              <i data-feather="instagram" style="cursor:pointer;"></i>
              <i data-feather="facebook" style="cursor:pointer;"></i>
              <i data-feather="twitter" style="cursor:pointer;"></i>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div>
            <h4 class="footer-col-title">Quick Pages</h4>
            <ul class="footer-links-list">
              <li><a href="#menu" class="footer-link" onclick="store.setRoute('menu')">Digital Menu</a></li>
              <li><a href="#reserve" class="footer-link" onclick="store.setRoute('reserve')">Table Booking</a></li>
              <li><a href="#offers" class="footer-link" onclick="store.setRoute('offers')">Offers & Promo Deals</a></li>
              <li><a href="#track" class="footer-link" onclick="store.setRoute('track')">Track Active Order</a></li>
            </ul>
          </div>

          <!-- Col 3: Hours & Support -->
          <div>
            <h4 class="footer-col-title">Opening Hours</h4>
            <ul class="footer-links-list" style="font-size:13px;color:var(--text-muted);">
              <li>Monday - Thursday: 11:30 AM - 10:30 PM</li>
              <li>Friday - Saturday: 11:30 AM - 11:30 PM</li>
              <li>Sunday: 12:00 PM - 10:00 PM</li>
            </ul>
          </div>

          <!-- Col 4: Location & Contact -->
          <div>
            <h4 class="footer-col-title">Contact Us</h4>
            <div style="font-size:13px;color:var(--text-muted);display:flex;flex-direction:column;gap:8px;">
              <div>📍 742 Culinary Boulevard, Suite 100</div>
              <div>📞 Reservations: +1 (555) 987-6543</div>
              <div>✉️ info@girirestaurant.com</div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} Giri Restaurant Management System. All rights reserved.</div>
          <div style="display:flex;gap:16px;">
            <a href="#privacy" style="color:var(--text-dim);text-decoration:none;">Privacy Policy</a>
            <a href="#terms" style="color:var(--text-dim);text-decoration:none;">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
