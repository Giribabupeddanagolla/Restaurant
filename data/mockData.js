/* ==========================================================================
   GIRI RESTAURANT MANAGEMENT SYSTEM - MOCK SEED DATASET
   ========================================================================== */

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'specials', name: 'Chef Specials', icon: '⭐' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Main Course', icon: '🍲' },
  { id: 'pizzas', name: 'Pizzas & Burgers', icon: '🍕' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Beverages & Bar', icon: '🍹' }
];

export const INITIAL_DISHES = [
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Risotto',
    category: 'specials',
    price: 18.50,
    description: 'Arborio rice cooked with wild forest mushrooms, black truffle oil, and aged parmesan crisp.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop',
    dietary: ['veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [
      { name: 'Add Extra Truffle Oil', price: 2.50 },
      { name: 'Extra Parmesan Cheese', price: 1.50 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Smoked Wagyu Beef Burger',
    category: 'pizzas',
    price: 21.00,
    description: 'Double Wagyu patty, smoked cheddar, caramelized onions, brioche bun, served with truffle fries.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Double Bacon Slice', price: 3.00 },
      { name: 'Gluten-Free Bun', price: 1.50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Artisanal Margherita Pizza',
    category: 'pizzas',
    price: 15.00,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, organic basil, extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Burrata Cheese Topping', price: 4.00 },
      { name: 'Chili Flakes Extra', price: 0.50 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Crispy Pan-Seared Salmon',
    category: 'mains',
    price: 24.50,
    description: 'Atlantic salmon fillet, asparagus spears, saffron lemon butter sauce, baby potatoes.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop',
    dietary: ['non-veg'],
    prepTime: 18,
    available: true,
    customizations: [
      { name: 'Side Garlic Herb Butter', price: 1.00 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Spicy Thai Green Curry',
    category: 'mains',
    price: 16.50,
    description: 'Authentic coconut curry with bamboo shoots, Thai basil, and fragrant jasmine rice.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop',
    dietary: ['veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Extra Spicy Level 🔥🔥🔥', price: 0.00 },
      { name: 'Add Grilled Tofu', price: 2.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Classic Caesar Salad',
    category: 'starters',
    price: 12.00,
    description: 'Crisp romaine lettuce, garlic croutons, shaved parmesan, house-made Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [
      { name: 'Add Grilled Chicken Breast', price: 4.50 },
      { name: 'Add Grilled Shrimp', price: 5.50 }
    ]
  },
  {
    id: 'dish-7',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 9.50,
    description: 'Warm Belgian dark chocolate cake with a melting chocolate center, served with vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Scoop Ice Cream', price: 2.00 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Signature Passionfruit Mocktail',
    category: 'drinks',
    price: 7.50,
    description: 'Fresh passionfruit puree, lime juice, mint leaves, sparkle soda, and crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [
      { name: 'Add Chia Seeds', price: 0.75 }
    ]
  }
];

export const INITIAL_TABLES = [
  { id: 'T01', number: '01', capacity: 2, status: 'available', qrCode: 'QR_T01' },
  { id: 'T02', number: '02', capacity: 4, status: 'occupied', qrCode: 'QR_T02' },
  { id: 'T03', number: '03', capacity: 2, status: 'available', qrCode: 'QR_T03' },
  { id: 'T04', number: '04', capacity: 6, status: 'occupied', qrCode: 'QR_T04' },
  { id: 'T05', number: '05', capacity: 4, status: 'reserved', qrCode: 'QR_T05' },
  { id: 'T06', number: '06', capacity: 8, status: 'available', qrCode: 'QR_T06' }
];

export const INITIAL_STAFF = [
  { id: 'ST-01', name: 'Chef Gordon R.', role: 'Chef', shift: 'Morning', status: 'active', phone: '+1 555-0192' },
  { id: 'ST-02', name: 'Elena Rostova', role: 'Manager', shift: 'Full Day', status: 'active', phone: '+1 555-0144' },
  { id: 'ST-03', name: 'Marco Silva', role: 'Waiter', shift: 'Evening', status: 'active', phone: '+1 555-0188' },
  { id: 'ST-04', name: 'Sarah Jenkins', role: 'Cashier', shift: 'Morning', status: 'active', phone: '+1 555-0123' }
];

export const INITIAL_INVENTORY = [
  { id: 'INV-01', item: 'Truffle Oil (500ml)', category: 'Oils & Sauces', stock: 8, unit: 'Bottles', threshold: 3, status: 'normal' },
  { id: 'INV-02', item: 'Arborio Rice', category: 'Grains', stock: 25, unit: 'Kg', threshold: 10, status: 'normal' },
  { id: 'INV-03', item: 'Wagyu Beef Patties', category: 'Meat', stock: 4, unit: 'Packs', threshold: 5, status: 'low' },
  { id: 'INV-04', item: 'Buffalo Mozzarella', category: 'Dairy', stock: 12, unit: 'Kg', threshold: 4, status: 'normal' },
  { id: 'INV-05', item: 'Fresh Passionfruit', category: 'Produce', stock: 2, unit: 'Kg', threshold: 3, status: 'critical' }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-101',
    tableNumber: '04',
    status: 'cooking',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    items: [
      { name: 'Smoked Wagyu Beef Burger', quantity: 2, price: 21.00, notes: 'Medium rare' },
      { name: 'Signature Passionfruit Mocktail', quantity: 2, price: 7.50, notes: 'Less ice' }
    ],
    subtotal: 57.00,
    tax: 5.13,
    tip: 5.70,
    total: 67.83
  },
  {
    id: 'ORD-102',
    tableNumber: '02',
    status: 'preparing',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    items: [
      { name: 'Truffle Mushroom Risotto', quantity: 1, price: 18.50, notes: 'Extra cheese' },
      { name: 'Classic Caesar Salad', quantity: 1, price: 12.00, notes: '' }
    ],
    subtotal: 30.50,
    tax: 2.74,
    tip: 3.05,
    total: 36.29
  }
];
