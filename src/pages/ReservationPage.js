/* ==========================================================================
   GIRI RESTAURANT - PUBLIC RESERVATION PAGE (src/pages/ReservationPage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderReservationPage(state) {
  return `
    <div class="container" style="padding-top:30px;max-width:760px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">TABLE RESERVATION</span>
        <h1 class="section-title" style="margin-top:8px;">Reserve Your Table</h1>
        <p class="section-subtitle">Book your dining experience online in advance. Instant email & SMS confirmation.</p>
      </div>

      <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:32px;">
        <form onsubmit="event.preventDefault(); alert('🎉 Reservation Confirmed! We have reserved your table.'); store.setRoute('home');">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" placeholder="e.g. Alexander Wright" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
            <div class="form-group">
              <label class="form-label">Party Size</label>
              <select class="form-select">
                <option value="1">1 Person (Single)</option>
                <option value="2" selected>2 Persons (Couple)</option>
                <option value="4">4 Persons (Family)</option>
                <option value="6">6 Persons (Group)</option>
                <option value="8">8+ Guests (Party)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Preferred Time</label>
              <select class="form-select">
                <option>6:00 PM</option>
                <option selected>7:00 PM</option>
                <option>8:00 PM</option>
                <option>9:00 PM</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Special Request / Occasion (Optional)</label>
            <textarea class="form-textarea" rows="3" placeholder="e.g. Birthday Celebration, Quiet booth requested..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;padding:14px;font-size:16px;">
            📅 Confirm Table Reservation
          </button>
        </form>
      </div>
    </div>
  `;
}
