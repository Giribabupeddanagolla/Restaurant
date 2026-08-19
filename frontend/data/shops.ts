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
    image: '/bistro-express.jpg',
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
      '/bistro-express.jpg',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80'
    ],
    kitchenImages: [
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=800&auto=format&fit=crop&q=80'
    ],
  },
];

const DISTINCT_SHOP_IMAGES = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=85', // Fine Dining
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=85', // Biryani / Andhra
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=85', // Kitchen
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=85', // Bakery
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=85', // Grill
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&auto=format&fit=crop&q=85', // Spice Garden
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85', // Cafe
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85', // Dining Lounge
];

export const getStoredShops = (): Shop[] => {
  if (typeof window === 'undefined') return INITIAL_SHOPS;
  try {
    const saved = localStorage.getItem('royal_shops') || localStorage.getItem('giri_shops');
    let customShops: Shop[] = [];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        customShops = parsed;
      }
    }

    const customMap = new Map<string, Shop>();
    customShops.forEach((s, idx) => {
      if (s && s.id !== 'shop-9' && !(s.name || '').toLowerCase().includes('ice cream')) {
        customMap.set(s.id || s.name, s);
      }
    });

    try {
      const allMerchants = JSON.parse(localStorage.getItem('giri_all_merchants') || '[]');
      if (Array.isArray(allMerchants)) {
        allMerchants.forEach((m: any) => {
          const shopName = m.name || m.shopName || m.companyName;
          if (shopName) {
            const mId = m.id || m._id || `merchant-${shopName.toLowerCase().replace(/\s+/g, '-')}`;
            if (!customMap.has(mId) && !customMap.has(shopName)) {
              customMap.set(mId, {
                id: mId,
                name: shopName,
                tagline: m.category || m.tagline || 'Merchant Outlet',
                image: m.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
                rating: 4.8,
                deliveryTime: '25-35 mins',
                address: m.city || 'Hyderabad',
                city: m.city || 'Hyderabad',
                phone: m.phone || '',
                openingHours: '10:00 AM - 11:00 PM',
                isOpen: true,
                isFeatured: true,
              });
            }
          }
        });
      }
    } catch (e) {}

    const initialMap = new Map<string, Shop>();
    INITIAL_SHOPS.forEach((s) => {
      if (s && s.id !== 'shop-9' && !(s.name || '').toLowerCase().includes('ice cream')) {
        initialMap.set(s.id || s.name, s);
      }
    });

    // Newly added / custom merchant shops come FIRST
    const customList = Array.from(customMap.values());
    const initialList = Array.from(initialMap.values()).filter((s) => !customMap.has(s.id || s.name));
    const combined = [...customList, ...initialList];

    // Ensure distinct images across shop cards
    const uniqueMap = new Map<string, string>();
    const sanitized = combined.map((s, idx) => {
      let img = s.image;
      if (!img || uniqueMap.has(img)) {
        img = DISTINCT_SHOP_IMAGES[idx % DISTINCT_SHOP_IMAGES.length];
      }
      uniqueMap.set(img, s.name);
      return { ...s, image: img };
    });

    return sanitized;
  } catch (e) {
    console.error('Error reading stored shops:', e);
  }
  return INITIAL_SHOPS;
};

export const saveStoredShops = (shops: Shop[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('royal_shops', JSON.stringify(shops));
    localStorage.setItem('giri_shops', JSON.stringify(shops));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('merchant_shops_updated'));
  } catch (e) {
    console.error('Error saving stored shops:', e);
  }
};

