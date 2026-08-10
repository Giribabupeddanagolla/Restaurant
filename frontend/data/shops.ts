import { Shop } from '../types';

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: 'Giri Fine Dining',
    tagline: 'Signature Experience',
    tag: 'Signature Experience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '30–40 min',
    time: '30–40 min',
    address: '742 Gourmet Ave, Downtown',
    city: 'Metropolitan City',
    phone: '+1 (555) 123-4567',
    openingHours: '12:00 PM – 11:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-2',
    name: 'Giri Kitchen',
    tagline: 'Home Comfort Food',
    tag: 'Home Comfort Food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    time: '20–30 min',
    address: '108 Comfort Street, West End',
    city: 'Metropolitan City',
    phone: '+1 (555) 234-5678',
    openingHours: '11:00 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-3',
    name: 'Giri Bakery',
    tagline: 'Pastries & Desserts',
    tag: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '15–20 min',
    time: '15–20 min',
    address: '45 Sweetland Boulevard, Uptown',
    city: 'Metropolitan City',
    phone: '+1 (555) 345-6789',
    openingHours: '08:00 AM – 09:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-4',
    name: 'Giri Grill',
    tagline: 'BBQ & Mains',
    tag: 'BBQ & Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.6,
    deliveryTime: '25–35 min',
    time: '25–35 min',
    address: '89 Smoky Lane, Eastside',
    city: 'Metropolitan City',
    phone: '+1 (555) 456-7890',
    openingHours: '12:00 PM – 11:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-5',
    name: 'Giri Spice Garden',
    tagline: 'Indian & Asian',
    tag: 'Indian & Asian',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.7,
    deliveryTime: '20–30 min',
    time: '20–30 min',
    address: '302 Spice Road, Central Quarter',
    city: 'Metropolitan City',
    phone: '+1 (555) 567-8901',
    openingHours: '11:30 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-6',
    name: 'Giri Café',
    tagline: 'Coffee & Snacks',
    tag: 'Coffee & Snacks',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.5,
    deliveryTime: '10–15 min',
    time: '10–15 min',
    address: '12 Morning Star Lane, Bay District',
    city: 'Metropolitan City',
    phone: '+1 (555) 678-9012',
    openingHours: '07:00 AM – 08:00 PM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-7',
    name: 'Giri Seafood & Lounge',
    tagline: 'Coastal Delicacies & Cocktails',
    tag: 'Coastal Delicacies & Cocktails',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '25–35 min',
    time: '25–35 min',
    address: '505 Ocean Drive, Harbor Front',
    city: 'Metropolitan City',
    phone: '+1 (555) 789-0123',
    openingHours: '12:00 PM – 12:00 AM',
    isOpen: true,
    isFeatured: true,
  },
  {
    id: 'shop-8',
    name: 'Giri Express & Bistro',
    tagline: 'Quick Gourmet Eats',
    tag: 'Quick Gourmet Eats',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=360&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '10–20 min',
    time: '10–20 min',
    address: '122 Metro Station Plaza, Tech Park',
    city: 'Metropolitan City',
    phone: '+1 (555) 890-1234',
    openingHours: '08:00 AM – 10:00 PM',
    isOpen: true,
    isFeatured: true,
  },
];

export const getStoredShops = (): Shop[] => {
  if (typeof window === 'undefined') return INITIAL_SHOPS;
  try {
    const saved = localStorage.getItem('giri_shops');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading stored shops:', e);
  }
  return INITIAL_SHOPS;
};

export const saveStoredShops = (shops: Shop[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('giri_shops', JSON.stringify(shops));
  } catch (e) {
    console.error('Error saving stored shops:', e);
  }
};

