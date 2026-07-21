/* ==========================================================================
   GIRI RESTAURANT - ROOT CONTROLLER & PUBLIC ROUTER (app.js)
   ========================================================================== */

import { store } from './src/services/store.js';
import { renderNavbar } from './src/components/Navbar.js';
import { renderFooter } from './src/components/Footer.js';

import { renderHomePage } from './src/pages/HomePage.js';
import { renderMenuPage } from './src/pages/MenuPage.js';
import { renderReservationPage } from './src/pages/ReservationPage.js';
import { renderAboutPage } from './src/pages/AboutPage.js';
import { renderContactPage } from './src/pages/ContactPage.js';
import { renderTrackPage } from './src/pages/TrackPage.js';
import { renderOffersPage } from './src/pages/OffersPage.js';
import { renderReviewsPage } from './src/pages/ReviewsPage.js';

import { renderDishModal } from './src/components/DishModal.js';
import { renderCartDrawer } from './src/components/CartDrawer.js';

class App {
  constructor() {
    this.navbarContainer = document.getElementById('navbar-container');
    this.viewContainer = document.getElementById('view-container');
    this.footerContainer = document.getElementById('footer-container');
    this.modalsContainer = document.getElementById('modals-container');

    this.init();
  }

  init() {
    // Hash change routing
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.replace('#', '');
      if (route) store.setRoute(route);
    });

    // Subscribe to store updates
    store.subscribe(state => this.render(state));

    // Expose store globally for inline event handlers
    window.store = store;

    // Initial render
    this.render(store.state);
  }

  render(state) {
    // 1. Render Public Navbar
    if (this.navbarContainer) {
      this.navbarContainer.innerHTML = renderNavbar(state);
    }

    // 2. Render Active Public View Page
    if (this.viewContainer) {
      switch (state.currentRoute) {
        case 'home':
          this.viewContainer.innerHTML = renderHomePage(state);
          break;
        case 'menu':
          this.viewContainer.innerHTML = renderMenuPage(state);
          break;
        case 'reserve':
          this.viewContainer.innerHTML = renderReservationPage(state);
          break;
        case 'about':
          this.viewContainer.innerHTML = renderAboutPage(state);
          break;
        case 'contact':
          this.viewContainer.innerHTML = renderContactPage(state);
          break;
        case 'track':
          this.viewContainer.innerHTML = renderTrackPage(state);
          break;
        case 'offers':
          this.viewContainer.innerHTML = renderOffersPage(state);
          break;
        case 'reviews':
          this.viewContainer.innerHTML = renderReviewsPage(state);
          break;
        default:
          this.viewContainer.innerHTML = renderHomePage(state);
      }
    }

    // 3. Render Public Footer
    if (this.footerContainer) {
      this.footerContainer.innerHTML = renderFooter();
    }

    // 4. Render Modals & Drawers
    if (this.modalsContainer) {
      this.modalsContainer.innerHTML = `
        ${renderDishModal(state)}
        ${renderCartDrawer(state)}
      `;
    }

    // Refresh Feather Icons
    if (window.feather) window.feather.replace();
  }
}

new App();
