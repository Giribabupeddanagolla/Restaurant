const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  CASHIER: 'Cashier',
  CHEF: 'Chef',
  WAITER: 'Waiter',
  CUSTOMER: 'Customer',
  DELIVERY_BOY: 'Delivery Boy',
};

const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  READY: 'Ready',
  SERVED: 'Served',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

const PAYMENT_STATUS = {
  PENDING: 'Pending',
  PAID: 'Paid',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

module.exports = {
  ROLES,
  ORDER_STATUS,
  PAYMENT_STATUS,
};
