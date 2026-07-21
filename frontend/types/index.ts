export interface CustomizationOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  dietary: string[];
  prepTime: number;
  available: boolean;
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
  unitPrice: number;
  customizations: CustomizationOption[];
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
