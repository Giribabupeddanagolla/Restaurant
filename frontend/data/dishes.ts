import { MenuItem } from '../types';

export const RESTAURANT_OUTLETS = [
  { slug: 'giri-fine-dining',  name: 'Giri Fine Dining',        icon: '🍷' },
  { slug: 'giri-kitchen',      name: 'Giri Kitchen',            icon: '🍲' },
  { slug: 'giri-bakery',       name: 'Giri Bakery',             icon: '🥐' },
  { slug: 'giri-grill',        name: 'Giri Grill',              icon: '🔥' },
  { slug: 'giri-spice-garden', name: 'Giri Spice Garden',       icon: '🍛' },
  { slug: 'giri-cafe',         name: 'Giri Café',               icon: '☕' },
  { slug: 'giri-seafood',      name: 'Giri Seafood & Lounge',   icon: '🍤' },
];

export const INITIAL_DISHES: MenuItem[] = [
  // GIRI FINE DINING (CHEF SPECIALS & FINE DINING)
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Risotto',
    category: 'specials',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
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
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
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
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
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
  {
    id: 'dish-spec-4',
    name: 'Pan-Seared Wagyu Ribeye Steak',
    category: 'specials',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 1150,
    description: 'Prime Australian Wagyu beef steak served with rosemary jus, truffle mashed potatoes, and roasted garlic.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 25,
    available: true,
    customizations: [
      { name: 'Extra Rosemary Gravy', price: 60 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Artisanal Burrata Caprese',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
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

  // GIRI KITCHEN (COMFORT FOOD & MAINS)
  {
    id: 'dish-start-2',
    name: 'Crispy Loaded Nachos Supreme',
    category: 'starters',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
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
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
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
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
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
  {
    id: 'dish-main-5',
    name: 'Creamy Penne Alfredo Chicken',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 520,
    description: 'Italian penne pasta tossed in rich parmesan garlic cream sauce with grilled chicken breast and broccoli.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg'],
    prepTime: 16,
    available: true,
    customizations: [
      { name: 'Add Mushrooms', price: 60 }
    ]
  },

  // GIRI SEAFOOD & LOUNGE
  {
    id: 'dish-4',
    name: 'Crispy Pan-Seared Salmon',
    category: 'mains',
    shopSlug: 'giri-seafood',
    shopName: 'Giri Seafood & Lounge',
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
    id: 'dish-start-5',
    name: 'Avocado & Salmon Tartare',
    category: 'starters',
    shopSlug: 'giri-seafood',
    shopName: 'Giri Seafood & Lounge',
    price: 540,
    description: 'Fresh Norwegian salmon diced with creamy avocado, ponzu soy dressing, sesame seeds, and wonton crisps.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Extra Wonton Chips', price: 40 }
    ]
  },

  // GIRI SPICE GARDEN
  {
    id: 'dish-5',
    name: 'Spicy Thai Green Curry',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
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
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
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

  // GIRI GRILL
  {
    id: 'dish-main-4',
    name: 'Slow-Braised Lamb Shank',
    category: 'mains',
    shopSlug: 'giri-grill',
    shopName: 'Giri Grill',
    price: 890,
    description: 'Tender lamb shank braised for 8 hours in rosemary red wine jus, served over velvety potato puree.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [
      { name: 'Extra Mashed Potato', price: 90 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Smoked Wagyu Beef Burger',
    category: 'pizzas',
    shopSlug: 'giri-grill',
    shopName: 'Giri Grill',
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
    shopSlug: 'giri-grill',
    shopName: 'Giri Grill',
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
  {
    id: 'dish-pizza-3',
    name: 'Spicy Pepperoni & Hot Honey Pizza',
    category: 'pizzas',
    shopSlug: 'giri-grill',
    shopName: 'Giri Grill',
    price: 640,
    description: 'Crispy pepperoni slices, mozzarella, marinara base drizzled with artisanal hot habanero honey.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['non-veg', 'spicy'],
    prepTime: 14,
    available: true,
    customizations: [
      { name: 'Extra Hot Honey Drizzle', price: 40 }
    ]
  },

  // GIRI BAKERY
  {
    id: 'dish-6',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
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
    id: 'dish-des-2',
    name: 'Classic Italian Tiramisu',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
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
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
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
  {
    id: 'dish-des-4',
    name: 'Pistachio Baklava with Gelato',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 380,
    description: 'Golden flaky phyllo pastry filled with crushed pistachios, honey syrup, served with vanilla gelato.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&h=600&auto=format&fit=crop&q=85',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [
      { name: 'Extra Honey Drizzle', price: 30 }
    ]
  },

  // GIRI CAFÉ
  {
    id: 'dish-7',
    name: 'Mango Passion Fruit Fizz',
    category: 'drinks',
    shopSlug: 'giri-cafe',
    shopName: 'Giri Café',
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
    shopSlug: 'giri-cafe',
    shopName: 'Giri Café',
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
    shopSlug: 'giri-cafe',
    shopName: 'Giri Café',
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

// Helper to deduplicate array of dishes by unique name or ID
const deduplicateDishes = (list: MenuItem[]): MenuItem[] => {
  const seen = new Set<string>();
  return list.filter((item) => {
    const key = (item.name || '').trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const getStoredDishes = (): MenuItem[] => {
  if (typeof window === 'undefined') return INITIAL_DISHES;
  try {
    const saved = localStorage.getItem('giri_dishes');
    if (saved) {
      const parsed: MenuItem[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const unique = deduplicateDishes(parsed);
        if (unique.length < 5) {
          saveStoredDishes(INITIAL_DISHES);
          return INITIAL_DISHES;
        }
        const updated = unique.map((item) => {
          const matching = INITIAL_DISHES.find((d) => d.id === item.id || d.name === item.name);
          let img = item.image;
          if (!img || img.includes('photo-1621996346565') || item.name.toLowerCase().includes('alfredo')) {
            img = 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=600&auto=format&fit=crop&q=85';
          }
          return {
            ...item,
            image: img || matching?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&auto=format&fit=crop&q=85',
            category: (item.category && !item.category.startsWith('giri-') && item.category !== 'fine-dining') ? item.category : (matching?.category || 'mains'),
            shopSlug: item.shopSlug || matching?.shopSlug || 'giri-fine-dining',
            shopName: item.shopName || matching?.shopName || 'Giri Fine Dining',
          };
        });
        saveStoredDishes(updated);
        return updated;
      }
    }
  } catch (e) {
    console.error('Error reading stored dishes:', e);
  }
  saveStoredDishes(INITIAL_DISHES);
  return INITIAL_DISHES;
};

export const saveStoredDishes = (dishes: MenuItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    const unique = deduplicateDishes(dishes);
    localStorage.setItem('giri_dishes', JSON.stringify(unique));
  } catch (e) {
    console.error('Error saving stored dishes:', e);
  }
};
