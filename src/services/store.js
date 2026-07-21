/* ==========================================================================
   GIRI RESTAURANT - REACTIVE CENTRAL STORE (src/services/store.js)
   ========================================================================== */

import { INITIAL_CATEGORIES, INITIAL_DISHES, PUBLIC_OFFERS, PUBLIC_REVIEWS } from '../data/mockData.js';
import { soundSynth } from './audioService.js';

class Store {
  constructor() {
    this.subscribers = [];
    this.state = {
      currentRoute: 'home', // 'home', 'menu', 'reserve', 'about', 'contact', 'track', 'offers', 'reviews'
      categories: [...INITIAL_CATEGORIES],
      dishes: [...INITIAL_DISHES],
      offers: [...PUBLIC_OFFERS],
      reviews: [...PUBLIC_REVIEWS],
      cart: [],
      orders: [],
      tableNumber: '04',
      activeCategory: 'all',
      searchQuery: '',
      dietaryFilter: 'all',
      activeModal: null, // null, 'dish-detail', 'cart-drawer'
      selectedDish: null,
      trackedOrder: null
    };
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  setRoute(route) {
    this.state.currentRoute = route;
    soundSynth.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  setCategory(catId) {
    this.state.activeCategory = catId;
    soundSynth.playClick();
    this.notify();
  }

  setSearch(query) {
    this.state.searchQuery = query;
    this.notify();
  }

  setDietFilter(filter) {
    this.state.dietaryFilter = filter;
    soundSynth.playClick();
    this.notify();
  }

  openDishModal(dish) {
    this.state.selectedDish = dish;
    this.state.activeModal = 'dish-detail';
    soundSynth.playClick();
    this.notify();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.selectedDish = null;
    soundSynth.playClick();
    this.notify();
  }

  addToCart(dish, customizations = []) {
    const extraPrice = customizations.reduce((acc, c) => acc + c.price, 0);
    const unitPrice = dish.price + extraPrice;
    const existing = this.state.cart.find(i => i.dish.id === dish.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.state.cart.push({ dish, quantity: 1, unitPrice, customizations });
    }

    soundSynth.playAddCart();
    this.notify();
  }

  updateCartQty(index, delta) {
    if (this.state.cart[index]) {
      this.state.cart[index].quantity += delta;
      if (this.state.cart[index].quantity <= 0) {
        this.state.cart.splice(index, 1);
      }
    }
    soundSynth.playClick();
    this.notify();
  }

  placeOrder() {
    if (this.state.cart.length === 0) return;

    const subtotal = this.state.cart.reduce((a, b) => a + (b.unitPrice * b.quantity), 0);
    const total = subtotal * 1.09;

    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      tableNumber: this.state.tableNumber,
      status: 'placed',
      items: [...this.state.cart],
      total,
      createdAt: new Date().toLocaleTimeString()
    };

    this.state.orders.unshift(newOrder);
    this.state.trackedOrder = newOrder;
    this.state.cart = [];
    this.closeModal();
    this.setRoute('track');
    this.notify();
  }

  addReview(newReview) {
    this.state.reviews.unshift({
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop'
    });
    soundSynth.playClick();
    this.notify();
  }
}

export const store = new Store();
