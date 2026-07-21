/* ==========================================================================
   GIRI RESTAURANT - PUBLIC CONTACT PAGE (src/pages/ContactPage.js)
   ========================================================================== */

export function renderContactPage() {
  return `
    <div class="container" style="padding-top:30px;max-width:960px;">
      <div style="text-align:center;margin-bottom:30px;">
        <span class="badge badge-primary">GET IN TOUCH</span>
        <h1 class="section-title" style="margin-top:8px;">Contact Us & Location</h1>
        <p class="section-subtitle">Have questions or catering inquiries? Send us a message or visit our restaurant.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;">
        <!-- Contact Form -->
        <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:28px;">
          <h3 style="font-size:20px;font-weight:800;margin-bottom:16px;">Send Message</h3>
          <form onsubmit="event.preventDefault(); alert('Message sent successfully! We will get back to you shortly.');">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-input" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" placeholder="name@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Subject</label>
              <input type="text" class="form-input" placeholder="General inquiry, Catering, Private Event...">
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-textarea" rows="4" placeholder="How can we assist you today?" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">
              ✉️ Send Message
            </button>
          </form>
        </div>

        <!-- Location & Details -->
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:24px;">
            <h3 style="font-size:18px;font-weight:800;margin-bottom:12px;">📍 Restaurant Location</h3>
            <p style="color:var(--text-muted);font-size:14px;margin-bottom:12px;">
              742 Culinary Boulevard, Suite 100, Metropolitan City
            </p>
            <div style="background:var(--bg-dark);height:140px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--text-dim);border:1px solid var(--border-glass);">
              🗺️ Interactive Google Map Container
            </div>
          </div>

          <div style="background:var(--bg-surface);border:1px solid var(--border-glass);border-radius:var(--radius-lg);padding:24px;">
            <h3 style="font-size:18px;font-weight:800;margin-bottom:12px;">📞 Phone & Direct Contacts</h3>
            <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--text-muted);">
              <div>• Front Desk: +1 (555) 987-6543</div>
              <div>• Catering Line: +1 (555) 987-6544</div>
              <div>• Direct Email: hello@girirestaurant.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
