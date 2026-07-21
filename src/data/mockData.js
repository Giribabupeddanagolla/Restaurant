/* ==========================================================================
   GIRI RESTAURANT - SHARED MOCK DATASET (src/data/mockData.js)
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
      { name: 'Burrata Cheese Topping', price: 4.00 }
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
      { name: 'Extra Spicy Level 🔥', price: 0.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 9.50,
    description: 'Warm Belgian dark chocolate cake with melting chocolate center & vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Scoop Ice Cream', price: 2.00 }
    ]
  }
];

export const PUBLIC_OFFERS = [
  {
    id: 'off-1',
    title: '🎉 Welcome 20% Discount',
    code: 'GIRI20',
    description: 'Get 20% off on your first dine-in or takeaway mobile order above $30.',
    expiry: 'Valid till Sunday',
    badge: 'NEW CUSTOMER'
  },
  {
    id: 'off-2',
    title: '🍔 Buy 1 Get 1 Wagyu Burger',
    code: 'WAGYU2FOR1',
    description: 'Order any Wagyu Burger on Tuesday evenings and get the second burger 50% off.',
    expiry: 'Tuesdays Only',
    badge: 'POPULAR'
  },
  {
    id: 'off-3',
    title: '🍹 Happy Hour Cocktails',
    code: 'HAPPYHOUR',
    description: 'Enjoy 30% off all signature mocktails and drinks between 4 PM and 7 PM daily.',
    expiry: 'Daily 4pm - 7pm',
    badge: 'DRINKS'
  }
];

export const PUBLIC_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Sophia Williams',
    role: 'Food Critic & Local Guide',
    rating: 5,
    date: '2 days ago',
    comment: 'The Truffle Mushroom Risotto was absolute perfection! Instant mobile table ordering made our anniversary dinner completely seamless and relaxing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    name: 'David Miller',
    role: 'Regular Diner',
    rating: 5,
    date: '1 week ago',
    comment: 'Best Wagyu Burger in town! The live order tracking on my phone was accurate to the minute. Ultra-fast service!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    name: 'Emily Chen',
    role: 'Dine-in Guest',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Loved the dark luxury aesthetic and high-tech table QR system. Food arrived steaming hot and delicious!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop'
  }
];

export const CHEFS_SHOWCASE = [
  {
    name: 'Chef Gordon R.',
    title: 'Executive Head Chef',
    experience: '18+ Years International Fine Dining',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop',
    bio: 'Specializing in European fusion and modern gastronomy, Chef Gordon brings Michelin-caliber precision to every dish.'
  },
  {
    name: 'Chef Antoine Laurent',
    title: 'Master Pastry & Dessert Chef',
    experience: '12 Years Parisian Patisserie',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop',
    bio: 'Crafting divine artisanal desserts, molten chocolate lava creations, and hand-spun gelato.'
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop'
];
