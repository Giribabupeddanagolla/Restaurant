/* ==========================================================================
   GIRI RESTAURANT - PUBLIC NAVBAR COMPONENT (src/components/Navbar.js)
   ========================================================================== */

import { store } from '../services/store.js';

export function renderNavbar(state) {
  const totalCartItems = state.cart.reduce((acc, i) => acc + i.quantity, 0);

  return `
    <header class="public-navbar">
      <div class="container nav-container">
        <!-- Brand Logo & Title -->
        <a href="#home" class="brand-logo-group" onclick="store.setRoute('home')">
          <div class="brand-icon-box">G</div>
          <div>
            <div class="brand-title-text">Giri Restaurant</div>
            <div style="font-size:11px;color:var(--text-dim);font-weight:600;letter-spacing:0.5px;">LUXURY FINE DINING</div>
          </div>
        </a>

        <!-- Public Navigation Links -->
        <ul class="public-nav-links" id="public-nav-menu">
          <li><a href="#home" class="public-nav-link ${state.currentRoute === 'home' ? 'active' : ''}" onclick="store.setRoute('home')">Home</a></li>
          <li><a href="#menu" class="public-nav-link ${state.currentRoute === 'menu' ? 'active' : ''}" onclick="store.setRoute('menu')">Menu</a></li>
          <li><a href="#reserve" class="public-nav-link ${state.currentRoute === 'reserve' ? 'active' : ''}" onclick="store.setRoute('reserve')">Table Booking</a></li>
          <li><a href="#offers" class="public-nav-link ${state.currentRoute === 'offers' ? 'active' : ''}" onclick="store.setRoute('offers')">Offers & Deals</a></li>
          <li><a href="#track" class="public-nav-link ${state.currentRoute === 'track' ? 'active' : ''}" onclick="store.setRoute('track')">Track Order</a></li>
          <li><a href="#about" class="public-nav-link ${state.currentRoute === 'about' ? 'active' : ''}" onclick="store.setRoute('about')">About Us</a></li>
          <li><a href="#reviews" class="public-nav-link ${state.currentRoute === 'reviews' ? 'active' : ''}" onclick="store.setRoute('reviews')">Reviews</a></li>
          <li><a href="#contact" class="public-nav-link ${state.currentRoute === 'contact' ? 'active' : ''}" onclick="store.setRoute('contact')">Contact</a></li>
        </ul>

        <!-- Action Controls -->
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="btn btn-outline btn-sm" onclick="store.setRoute('reserve')">
            <i data-feather="calendar" style="width:14px;height:14px;"></i> Reserve
          </button>
          
          <button class="btn btn-primary btn-sm" onclick="store.state.activeModal = 'cart-drawer'; store.notify();" style="position:relative;">
            <i data-feather="shopping-bag" style="width:14px;height:14px;"></i> Cart
            ${totalCartItems > 0 ? `<span class="badge-count">${totalCartItems}</span>` : ''}
          </button>

          <button class="mobile-nav-toggle" onclick="document.getElementById('public-nav-menu').classList.toggle('mobile-open')">
            <i data-feather="menu"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}
