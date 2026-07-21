/* ==========================================================================
   GIRI RESTAURANT MANAGEMENT SYSTEM - CENTRAL REACTIVE STORE
   With BroadcastChannel Cross-Tab Sync & LocalStorage Persistence
   ========================================================================== */

import { INITIAL_CATEGORIES, INITIAL_DISHES, INITIAL_TABLES, INITIAL_STAFF, INITIAL_INVENTORY, INITIAL_ORDERS } from '../data/mockData.js';
import { soundSynth } from './audio.js';

class Store {
  constructor() {
    this.subscribers = [];
    this.broadcastChannel = null;

    // State Objects
    this.state = {
      currentView: 'menu',
      tableNumber: '04',
      activeCategory: 'all',
      searchQuery: '',
      dietaryFilter: 'all', // 'all', 'veg', 'spicy', 'chef-special'
      categories: [...INITIAL_CATEGORIES],
      dishes: [...INITIAL_DISHES],
      cart: [],
      orders: [...INITIAL_ORDERS],
      tables: [...INITIAL_TABLES],
      staff: [...INITIAL_STAFF],
      inventory: [...INITIAL_INVENTORY],
      staffCalls: [],
      currentUser: { name: 'Dine-In Customer', role: 'Customer', email: 'guest@giri.com' },
      activeModal: null, // null, 'dish-detail', 'cart-drawer', 'waiter-call', 'pay-pos'
      selectedDishForModal: null,
      activeOrderForTracker: null
    };

    this.initSync();
  }

  initSync() {
    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('giri_restaurant_sync');
      this.broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data;
        this.handleSyncMessage(type, payload);
      };
    }
  }

  broadcast(type, payload) {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, payload });
    }
  }

  handleSyncMessage(type, payload) {
    if (type === 'ORDER_PLACED') {
      this.state.orders.unshift(payload);
      soundSynth.playKitchenAlert();
      this.notify();
    } else if (type === 'ORDER_STATUS_CHANGED') {
      const order = this.state.orders.find(o => o.id === payload.orderId);
      if (order) {
        order.status = payload.status;
        if (payload.status === 'ready') {
          soundSynth.playOrderReady();
        }
        this.notify();
      }
    } else if (type === 'WAITER_CALLED') {
      this.state.staffCalls.unshift(payload);
      soundSynth.playKitchenAlert();
      this.notify();
    } else if (type === 'MENU_UPDATED') {
      this.state.dishes = payload;
      this.notify();
    }
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

  // State Action Methods
  setView(viewName) {
    this.state.currentView = viewName;
    soundSynth.playClick();
    this.notify();
  }

  setTable(tableNum) {
    this.state.tableNumber = tableNum;
    soundSynth.playClick();
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

  setDietaryFilter(filter) {
    this.state.dietaryFilter = filter;
    soundSynth.playClick();
    this.notify();
  }

  openDishModal(dish) {
    this.state.selectedDishForModal = dish;
    this.state.activeModal = 'dish-detail';
    soundSynth.playClick();
    this.notify();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.selectedDishForModal = null;
    soundSynth.playClick();
    this.notify();
  }

  addToCart(dish, customizations = [], notes = '') {
    const existingIndex = this.state.cart.findIndex(
      item => item.dish.id === dish.id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    const extraPrice = customizations.reduce((acc, c) => acc + c.price, 0);
    const unitPrice = dish.price + extraPrice;

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += 1;
    } else {
      this.state.cart.push({
        dish,
        quantity: 1,
        unitPrice,
        customizations,
        notes
      });
    }

    soundSynth.playAddCart();
    soundSynth.vibrate(25);
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

  clearCart() {
    this.state.cart = [];
    this.notify();
  }

  placeOrder(tipAmount = 0, specialInstructions = '') {
    if (this.state.cart.length === 0) return null;

    const subtotal = this.state.cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const tax = subtotal * 0.09;
    const total = subtotal + tax + tipAmount;

    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      tableNumber: this.state.tableNumber,
      status: 'placed', // 'placed' -> 'preparing' -> 'cooking' -> 'ready' -> 'served'
      createdAt: new Date().toISOString(),
      items: this.state.cart.map(item => ({
        name: item.dish.name,
        quantity: item.quantity,
        price: item.unitPrice,
        notes: item.notes,
        customizations: item.customizations.map(c => c.name)
      })),
      subtotal,
      tax,
      tip: tipAmount,
      total,
      specialInstructions
    };

    this.state.orders.unshift(newOrder);
    this.state.activeOrderForTracker = newOrder;
    this.clearCart();
    this.closeModal();
    this.setView('tracker');

    soundSynth.playOrderReady();
    this.broadcast('ORDER_PLACED', newOrder);
    this.notify();
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'ready') soundSynth.playOrderReady();
      else soundSynth.playClick();

      this.broadcast('ORDER_STATUS_CHANGED', { orderId, status: newStatus });
      this.notify();
    }
  }

  callWaiter(requestType = 'Call Waiter') {
    const newCall = {
      id: `CALL-${Date.now()}`,
      tableNumber: this.state.tableNumber,
      requestType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };

    this.state.staffCalls.unshift(newCall);
    soundSynth.playKitchenAlert();
    this.broadcast('WAITER_CALLED', newCall);
    this.notify();
  }

  // Admin CRUD Actions
  toggleDishStock(dishId) {
    const dish = this.state.dishes.find(d => d.id === dishId);
    if (dish) {
      dish.available = !dish.available;
      this.broadcast('MENU_UPDATED', this.state.dishes);
      this.notify();
    }
  }

  addMenuItem(newDish) {
    this.state.dishes.unshift({
      ...newDish,
      id: `dish-${Date.now()}`,
      available: true,
      customizations: []
    });
    this.broadcast('MENU_UPDATED', this.state.dishes);
    this.notify();
  }

  loginUser(email, role) {
    this.state.currentUser = {
      name: role === 'Chef' ? 'Chef Gordon' : role === 'Manager' ? 'Manager Elena' : role === 'Waiter' ? 'Marco Waiter' : 'Customer',
      role,
      email
    };
    soundSynth.playClick();
    this.notify();
  }
}

export const store = new Store();
