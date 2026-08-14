import { Shop } from '../types';

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: 'Royal Fine Dining',
    tagline: 'Signature Experience',
    tag: 'Signature Experience',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=85',
    rating: 4.9,
    deliveryTime: '30–40 min',
    time: '30–40 min',
    address: '742 Gourmet Ave, Downtown',
    city: 'Metropolitan City',
    phone: '+1 (555) 123-4567',
    openingHours: '12:00 PM – 11:00 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹1,200 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=85'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    id: 'shop-2',
    name: 'Royal Kitchen',
    tagline: 'Home Comfort Food',
    tag: 'Home Comfort Food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=85',
    rating: 4.7,
    deliveryTime: '20–30 min',
    time: '20–30 min',
    address: '108 Comfort Street, West End',
    city: 'Metropolitan City',
    phone: '+1 (555) 234-5678',
    openingHours: '11:00 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹600 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=85'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    id: 'shop-3',
    name: 'Royal Bakery',
    tagline: 'Pastries & Desserts',
    tag: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '15–20 min',
    time: '15–20 min',
    address: '45 Sweetland Boulevard, Uptown',
    city: 'Metropolitan City',
    phone: '+1 (555) 345-6789',
    openingHours: '08:00 AM – 09:00 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹350 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    id: 'shop-4',
    name: 'Royal Grill',
    tagline: 'BBQ & Mains',
    tag: 'BBQ & Mains',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=85',
    rating: 4.6,
    deliveryTime: '25–35 min',
    time: '25–35 min',
    address: '89 Smoky Lane, Eastside',
    city: 'Metropolitan City',
    phone: '+1 (555) 456-7890',
    openingHours: '12:00 PM – 11:30 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹850 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=85'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=85'
    ],
  },
  {
    id: 'shop-5',
    name: 'Royal Spice Garden',
    tagline: 'Indian & Asian',
    tag: 'Indian & Asian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&auto=format&fit=crop&q=85',
    rating: 4.7,
    deliveryTime: '20–30 min',
    time: '20–30 min',
    address: '302 Spice Road, Central Quarter',
    city: 'Metropolitan City',
    phone: '+1 (555) 567-8901',
    openingHours: '11:30 AM – 10:30 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹750 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop&q=85'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=85'
    ],
  },
  {
    id: 'shop-6',
    name: 'Royal Café',
    tagline: 'Coffee & Snacks',
    tag: 'Coffee & Snacks',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85',
    rating: 4.5,
    deliveryTime: '10–15 min',
    time: '10–15 min',
    address: '12 Morning Star Lane, Bay District',
    city: 'Metropolitan City',
    phone: '+1 (555) 678-9012',
    openingHours: '07:00 AM – 08:00 PM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹400 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=85'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    id: 'shop-7',
    name: 'Royal Seafood & Lounge',
    tagline: 'Coastal Delicacies & Cocktails',
    tag: 'Coastal Delicacies & Cocktails',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    deliveryTime: '25–35 min',
    time: '25–35 min',
    address: '505 Ocean Drive, Harbor Front',
    city: 'Metropolitan City',
    phone: '+1 (555) 789-0123',
    openingHours: '12:00 PM – 12:00 AM',
    isOpen: true,
    isFeatured: true,
    avgPrice: '₹1,100 for two',
    diningImages: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80'
    ],
  },
  {
    id: 'shop-8',
    name: 'Royal Express & Bistro',
    tagline: 'Quick Gourmet Eats',
    tag: 'Quick Gourmet Eats',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    deliveryTime: '10–20 min',
    time: '10–20 min',
    address: '122 Metro Station Plaza, Tech Park',
    city: 'Metropolitan City',
    phone: '+1 (555) 890-1234',
    openingHours: '08:00 AM – 10:00 PM',
    isOpen: true,
    isFeatured: true,
    diningImages: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&auto=format&fit=crop&q=80'
    ],
  },
];

export const getStoredShops = (): Shop[] => {
  if (typeof window === 'undefined') return INITIAL_SHOPS;
  try {
    const saved = localStorage.getItem('royal_shops') || localStorage.getItem('giri_shops');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const validParsed = parsed.filter(
          (s: Shop) => s.id !== 'shop-9' && !(s.name || '').toLowerCase().includes('ice cream')
        );
        const map = new Map(validParsed.map((s: Shop) => [s.id || s.name, s]));
        INITIAL_SHOPS.forEach((s) => {
          map.set(s.id || s.name, s);
        });
        const combined = Array.from(map.values()).filter(
          (s: Shop) => s.id !== 'shop-9' && !(s.name || '').toLowerCase().includes('ice cream')
        );
        saveStoredShops(combined);
        return combined;
      }
    }
  } catch (e) {
    console.error('Error reading stored shops:', e);
  }
  saveStoredShops(INITIAL_SHOPS);
  return INITIAL_SHOPS;
};

export const saveStoredShops = (shops: Shop[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('royal_shops', JSON.stringify(shops));
  } catch (e) {
    console.error('Error saving stored shops:', e);
  }
};

