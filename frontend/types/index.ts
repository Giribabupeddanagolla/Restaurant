export interface CustomizationOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  discount?: number;
  finalPrice?: number;
  description: string;
  image: string;
  dietary: string[];
  prepTime: number;
  rating?: number;
  reviewsCount?: number;
  preparationTime?: string;
  calories?: string;
  available?: boolean;
  shopId?: string;
  shopSlug?: string;
  shopName?: string;
  merchantId?: string;
  city?: string;
  address?: string;
  customizations?: CustomizationOption[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  description: string;
  expiry: string;
  badge: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  qty?: number;
  unitPrice?: number;
  customizations?: CustomizationOption[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  date: string;
  readTime: number;
  tags: string[];
}

export type UserRole = 'Admin' | 'Manager' | 'Merchant' | 'Cashier' | 'Waiter' | 'Chef' | 'Delivery' | 'Delivery Boy' | 'Customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  merchantId?: string;
  shopName?: string;
  status?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  tableNumber: string;
  shopId?: string;
  merchantId?: string;
  shopName?: string;
  address?: string;
  orderType?: 'Dine-In' | 'Takeaway' | 'Delivery';
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Served' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt: string;
}

export interface Reservation {
  id: string;
  resId: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  tableId: string;
  tableNumber?: string;
  shopId?: string;
  merchantId?: string;
  restaurantName?: string;
  address?: string;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled' | 'REJECTED';
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Shop {
  _id?: string;
  id?: string;
  name: string;
  tagline?: string;
  tag?: string;
  image: string;
  rating: number;
  deliveryTime?: string;
  time?: string;
  address?: string;
  city?: string;
  phone?: string;
  openingHours?: string;
  isOpen?: boolean;
  isFeatured?: boolean;
  mapUrl?: string;
  avgPrice?: string;
  diningImages?: string[];
  kitchenImages?: string[];
}

