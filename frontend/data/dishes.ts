import { MenuItem } from '../types';

export const INITIAL_DISHES: MenuItem[] = [
  // CHEF SPECIALS
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Risotto',
    category: 'specials',
    price: 650,
    description: 'Arborio rice cooked with wild forest mushrooms, black truffle oil, and aged parmesan crisp.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [
      { name: 'Add Extra Truffle Oil', price: 90 },
      { name: 'Extra Parmesan Cheese', price: 60 }
    ]
  },
  {
    id: 'dish-spec-2',
    name: 'Saffron Grilled Jumbo Prawns',
    category: 'specials',
    price: 920,
    description: 'Tiger prawns marinated in saffron, garlic butter, and smoked paprika, served with lemon aioli.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [
      { name: 'Extra Lemon Aioli Dip', price: 40 }
    ]
  },
  {
    id: 'dish-spec-3',
    name: '24K Gold Dark Chocolate Marquis',
    category: 'specials',
    price: 750,
    description: 'Luxurious French dark chocolate ganache topped with edible gold leaf and berry coulis.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'chef-special'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Vanilla Bean Ice Cream', price: 80 }
    ]
  },

  // STARTERS
  {
    id: 'dish-8',
    name: 'Artisanal Burrata Caprese',
    category: 'starters',
    price: 490,
    description: 'Creamy Italian Burrata cheese, heirloom cherry tomatoes, aged balsamic reduction, wild arugula.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Pesto Sauce Drizzle', price: 60 }
    ]
  },
  {
    id: 'dish-start-2',
    name: 'Crispy Loaded Nachos Supreme',
    category: 'starters',
    price: 420,
    description: 'Corn tortilla chips smothered in melted jack cheese, jalapeños, guacamole, salsa, and sour cream.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'spicy'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Extra Guacamole Scoop', price: 70 },
      { name: 'Add Grilled Chicken', price: 90 }
    ]
  },
  {
    id: 'dish-start-3',
    name: 'Truffle Garlic Butter Bread',
    category: 'starters',
    price: 340,
    description: 'Toasted sourdough batard infused with roasted garlic, truffle oil, and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Mozzarella Cheese', price: 50 }
    ]
  },
  {
    id: 'dish-start-4',
    name: 'Dynamite Spicy Chicken Bites',
    category: 'starters',
    price: 460,
    description: 'Crispy fried chicken tossed in sweet & spicy sriracha dynamite glaze, sprinkled with sesame.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Extra Ranch Dip', price: 40 }
    ]
  },

  // MAIN COURSE
  {
    id: 'dish-4',
    name: 'Crispy Pan-Seared Salmon',
    category: 'mains',
    price: 850,
    description: 'Atlantic salmon fillet, asparagus spears, saffron lemon butter sauce, baby potatoes.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg'],
    prepTime: 18,
    available: true,
    customizations: [
      { name: 'Side Garlic Herb Butter', price: 40 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Spicy Thai Green Curry',
    category: 'mains',
    price: 590,
    description: 'Authentic coconut curry with bamboo shoots, Thai basil, and fragrant jasmine rice.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Extra Spicy Level 🔥', price: 0 }
    ]
  },
  {
    id: 'dish-main-3',
    name: 'Classic Butter Chicken & Garlic Naan',
    category: 'mains',
    price: 620,
    description: 'Tender chicken cooked in rich creamy makhani gravy, served with piping hot garlic butter naan.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg'],
    prepTime: 18,
    available: true,
    customizations: [
      { name: 'Extra Garlic Naan (2 pcs)', price: 80 }
    ]
  },

  // PIZZAS & BURGERS
  {
    id: 'dish-2',
    name: 'Smoked Wagyu Beef Burger',
    category: 'pizzas',
    price: 780,
    description: 'Double Wagyu patty, smoked cheddar, caramelized onions, brioche bun, served with truffle fries.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Double Bacon Slice', price: 120 },
      { name: 'Gluten-Free Bun', price: 50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Artisanal Margherita Pizza',
    category: 'pizzas',
    price: 550,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, organic basil, extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Burrata Cheese Topping', price: 150 }
    ]
  },

  // DESSERTS
  {
    id: 'dish-6',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 350,
    description: 'Warm Belgian dark chocolate cake with melting chocolate center & vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Scoop Ice Cream', price: 80 }
    ]
  },
  {
    id: 'dish-[#des-2]',
    name: 'Classic Italian Tiramisu',
    category: 'desserts',
    price: 390,
    description: 'Espresso-soaked ladyfingers layered with light whipped mascarpone cream and dusted cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [
      { name: 'Extra Cocoa Dusting', price: 0 }
    ]
  },
  {
    id: 'dish-des-3',
    name: 'New York Cheesecake & Berry Compote',
    category: 'desserts',
    price: 420,
    description: 'Rich & creamy baked cheesecake with buttery graham cracker crust and fresh wild berry coulis.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [
      { name: 'Extra Berry Compote', price: 50 }
    ]
  },

  // BEVERAGES & BAR
  {
    id: 'dish-7',
    name: 'Mango Passion Fruit Fizz',
    category: 'drinks',
    price: 280,
    description: 'Fresh Alphonso mango puree, passion fruit syrup, sparkling soda water, and mint sprigs.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [
      { name: 'Extra Crushed Ice', price: 0 }
    ]
  },
  {
    id: 'dish-dr-2',
    name: 'Iced Salted Caramel Cold Brew',
    category: 'drinks',
    price: 260,
    description: 'Slow-steeped Arabica coffee blended with salted caramel drizzle and velvety cold oat foam.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [
      { name: 'Extra Caramel Drizzle', price: 30 }
    ]
  },
  {
    id: 'dish-dr-3',
    name: 'Signature Berry Mojito Cocktail',
    category: 'drinks',
    price: 320,
    description: 'Muddled fresh blackberries, mint leaves, fresh lime juice, white cane sugar, and sparkling soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 6,
    available: true,
    customizations: [
      { name: 'Make it Mocktail (Alcohol-Free)', price: 0 }
    ]
  }
];

export const getStoredDishes = (): MenuItem[] => {
  if (typeof window === 'undefined') return INITIAL_DISHES;
  try {
    const saved = localStorage.getItem('giri_dishes');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length >= INITIAL_DISHES.length) return parsed;
    }
  } catch (e) {
    console.error('Error reading stored dishes:', e);
  }
  // Store updated INITIAL_DISHES if localStorage was outdated
  saveStoredDishes(INITIAL_DISHES);
  return INITIAL_DISHES;
};

export const saveStoredDishes = (dishes: MenuItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('giri_dishes', JSON.stringify(dishes));
  } catch (e) {
    console.error('Error saving stored dishes:', e);
  }
};
