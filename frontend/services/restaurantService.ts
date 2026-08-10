import API from './api';
import { MenuItem, Category, Order, Reservation, Shop } from '@/types';

// Auth API calls
export const authApi = {
  login: async (credentials: { email: string; password?: string; role?: any }) => {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  },
  register: async (userData: any) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },
  getMe: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },
};

// Menu Catalog API calls
export const menuApi = {
  getDishes: async (params?: { category?: string; search?: string; diet?: string }) => {
    const res = await API.get('/menu', { params });
    return res.data;
  },
  getDishById: async (id: string) => {
    const res = await API.get(`/menu/${id}`);
    return res.data;
  },
  createDish: async (dishData: Partial<MenuItem>) => {
    const res = await API.post('/menu', dishData);
    return res.data;
  },
  updateDish: async (id: string, dishData: Partial<MenuItem>) => {
    const res = await API.put(`/menu/${id}`, dishData);
    return res.data;
  },
  deleteDish: async (id: string) => {
    const res = await API.delete(`/menu/${id}`);
    return res.data;
  },
};

// Shops & Locations API calls
export const shopApi = {
  getShops: async (params?: { featured?: boolean; search?: string }) => {
    const res = await API.get('/shops', { params });
    return res.data;
  },
  getShopById: async (id: string) => {
    const res = await API.get(`/shops/${id}`);
    return res.data;
  },
  createShop: async (shopData: Partial<Shop>) => {
    const res = await API.post('/shops', shopData);
    return res.data;
  },
  updateShop: async (id: string, shopData: Partial<Shop>) => {
    const res = await API.put(`/shops/${id}`, shopData);
    return res.data;
  },
  deleteShop: async (id: string) => {
    const res = await API.delete(`/shops/${id}`);
    return res.data;
  },
};

// Categories API calls
export const categoryApi = {
  getCategories: async () => {
    const res = await API.get('/categories');
    return res.data;
  },
};

// Orders API calls
export const orderApi = {
  getOrders: async () => {
    const res = await API.get('/orders');
    return res.data;
  },
  createOrder: async (orderData: Partial<Order>) => {
    const res = await API.post('/orders', orderData);
    return res.data;
  },
  updateOrderStatus: async (id: string, status: string) => {
    const res = await API.put(`/orders/${id}/status`, { status });
    return res.data;
  },
  deleteOrder: async (id: string) => {
    const res = await API.delete(`/orders/${id}`);
    return res.data;
  },
};

// Reservations API calls
export const reservationApi = {
  getReservations: async () => {
    const res = await API.get('/reservations');
    return res.data;
  },
  createReservation: async (resData: Partial<Reservation>) => {
    const res = await API.post('/reservations', resData);
    return res.data;
  },
  updateReservationStatus: async (id: string, status: string, tableId?: string) => {
    const res = await API.put(`/reservations/${id}`, { status, tableId });
    return res.data;
  },
  deleteReservation: async (id: string) => {
    const res = await API.delete(`/reservations/${id}`);
    return res.data;
  },
};

// Dashboard ERP Stats API call
export const dashboardApi = {
  getStats: async () => {
    const res = await API.get('/dashboard/stats');
    return res.data;
  },
};

// Inventory & Stock API calls
export const inventoryApi = {
  getItems: async () => {
    const res = await API.get('/inventory');
    return res.data;
  },
  createItem: async (itemData: any) => {
    const res = await API.post('/inventory', itemData);
    return res.data;
  },
  updateItem: async (id: string, itemData: any) => {
    const res = await API.put(`/inventory/${id}`, itemData);
    return res.data;
  },
  deleteItem: async (id: string) => {
    const res = await API.delete(`/inventory/${id}`);
    return res.data;
  },
};

// Customer CRM & Loyalty API calls
export const customerApi = {
  getCustomers: async () => {
    const res = await API.get('/customers');
    return res.data;
  },
  createCustomer: async (customerData: any) => {
    const res = await API.post('/customers', customerData);
    return res.data;
  },
  updateCustomer: async (id: string, customerData: any) => {
    const res = await API.put(`/customers/${id}`, customerData);
    return res.data;
  },
  deleteCustomer: async (id: string) => {
    const res = await API.delete(`/customers/${id}`);
    return res.data;
  },
};

// Staff Directory & Employees API calls
export const employeeApi = {
  getEmployees: async () => {
    const res = await API.get('/employees');
    return res.data;
  },
  createEmployee: async (empData: any) => {
    const res = await API.post('/employees', empData);
    return res.data;
  },
  updateEmployee: async (id: string, empData: any) => {
    const res = await API.put(`/employees/${id}`, empData);
    return res.data;
  },
  deleteEmployee: async (id: string) => {
    const res = await API.delete(`/employees/${id}`);
    return res.data;
  },
};

// Tables & Floor Layout API calls
export const tableApi = {
  getTables: async () => {
    const res = await API.get('/tables');
    return res.data;
  },
  createTable: async (tableData: any) => {
    const res = await API.post('/tables', tableData);
    return res.data;
  },
  updateTableStatus: async (id: string, status: string, assignedGuest?: string) => {
    const res = await API.put(`/tables/${id}/status`, { status, assignedGuest });
    return res.data;
  },
  deleteTable: async (id: string) => {
    const res = await API.delete(`/tables/${id}`);
    return res.data;
  },
};

