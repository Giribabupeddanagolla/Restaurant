/* ==========================================================================
   GIRI RESTAURANT FRONTEND - API SERVICE LAYER (frontend/src/services/api.js)
   Connects to Backend REST API at http://localhost:5000/api
   ========================================================================== */

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      console.warn('Backend server offline, using local mode fallback.');
      return null;
    }
  },

  async getDishes(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/dishes?${query}`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      return null;
    }
  },

  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      return null;
    }
  },

  async createReservation(reservationPayload) {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationPayload)
      });
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      return null;
    }
  },

  async submitReview(reviewPayload) {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      });
      const data = await res.json();
      return data.success ? data.data : null;
    } catch (e) {
      return null;
    }
  }
};
