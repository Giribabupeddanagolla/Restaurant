/* ==========================================================================
   GIRI RESTAURANT - PUBLIC REVIEWS PAGE (src/pages/ReviewsPage.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderReviewsPage(state) {
  return `
    <div class="container" style="padding-top:30px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">TESTIMONIALS</span>
        <h1 class="section-title" style="margin-top:8px;">Customer Reviews & Feedback</h1>
        <p class="section-subtitle">Read what our verified dine-in guests say about our food and sub-second ordering.</p>
      </div>

      <!-- Reviews Summary Counter -->
      <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:24px;display:flex;align-items:center;justify-content:space-around;margin-bottom:32px;flex-wrap:wrap;gap:20px;">
        <div style="text-align:center;">
          <div style="font-size:48px;font-weight:800;color:var(--accent-primary);">4.9</div>
          <div class="stars-row">★★★★★</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Average Guest Rating</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:48px;font-weight:800;color:var(--text-main);">450+</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Verified Reviews</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:48px;font-weight:800;color:var(--color-success);">99%</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Recommendation Rate</div>
        </div>
      </div>

      <!-- Add Review Form & Cards Grid -->
      <div style="display:grid;grid-template-columns:320px 1fr;gap:24px;">
        <!-- Form -->
        <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:24px;height:max-content;">
          <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;">Leave a Review</h3>
          <form onsubmit="
            event.preventDefault();
            const name = document.getElementById('rev-name').value;
            const comment = document.getElementById('rev-comment').value;
            store.addReview({ name, role: 'Verified Guest', rating: 5, comment });
            document.getElementById('rev-comment').value = '';
            alert('Thank you! Your review has been published.');
          ">
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" class="form-input" id="rev-name" placeholder="Full name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Your Experience</label>
              <textarea class="form-textarea" id="rev-comment" rows="4" placeholder="Share your dining experience..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">
              ⭐ Submit Review
            </button>
          </form>
        </div>

        <!-- Reviews Grid -->
        <div class="reviews-grid" style="margin-top:0;">
          ${state.reviews.map(rev => `
            <div class="review-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <img src="${rev.avatar}" style="width:44px;height:44px;border-radius:999px;object-fit:cover;">
                <div>
                  <div style="font-weight:700;font-size:15px;">${rev.name}</div>
                  <div style="font-size:12px;color:var(--text-muted);">${rev.role} • ${rev.date}</div>
                </div>
              </div>
              <div class="stars-row">${'★'.repeat(rev.rating)}</div>
              <p style="font-size:14px;color:var(--text-muted);">${rev.comment}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
