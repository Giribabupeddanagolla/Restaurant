const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

const bakeryDishesCode = `
  // --- ARTISANAL BAKERY & SWEETS CREATIONS ---
  {
    id: 'dish-bakery-1',
    name: 'Artisanal Belgian Dark Chocolate Truffle Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 650,
    description: 'Rich 70% dark Belgian chocolate layered sponge cake topped with smooth chocolate ganache and chocolate curls.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=85&v=dish-bakery-1',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Add Birthday Candle & Board', price: 30 }]
  },
  {
    id: 'dish-bakery-2',
    name: 'Classic Italian Tiramisu Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Espresso-soaked ladyfinger sponge layered with whipped mascarpone cheese cream and Dutch cocoa dusting.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=85&v=dish-bakery-2',
    dietary: ['veg', 'chef-special'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Espresso Shot Drizzle', price: 25 }]
  },
  {
    id: 'dish-bakery-3',
    name: 'Fresh Strawberry Red Velvet Layer Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 220,
    description: 'Moist red velvet sponge layered with cream cheese frosting and fresh strawberry glaze.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=85&v=dish-bakery-3',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Strawberry Coulis', price: 20 }]
  },
  {
    id: 'dish-bakery-4',
    name: 'French Mango Passion Fruit Mousse Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 260,
    description: 'Light airy Alphonso mango mousse with passion fruit mirror glaze over vanilla biscuit crust.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=85&v=dish-bakery-4',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Mango Mirror Glaze', price: 25 }]
  },
  {
    id: 'dish-bakery-5',
    name: 'Flaky French Butter Croissant (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Authentic multi-layered golden brown buttery croissants baked fresh daily with pure Normandy butter.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=85&v=dish-bakery-5',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Side Wild Berry Jam', price: 20 }]
  },
  {
    id: 'dish-bakery-6',
    name: 'Almond Cream Stuffed Toasted Croissant',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 230,
    description: 'Flaky croissant filled with frangipane almond cream, baked crisp and topped with flaked toasted almonds.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=85&v=dish-bakery-6',
    dietary: ['veg', 'chef-special'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Extra Flaked Almonds', price: 25 }]
  },
  {
    id: 'dish-bakery-7',
    name: 'Artisanal Garlic Herb Sourdough Loaf',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Naturally fermented crusty sourdough loaf baked with roasted garlic cloves, rosemary, and olive oil.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=85&v=dish-bakery-7',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Herb Garlic Butter Tub', price: 30 }]
  },
  {
    id: 'dish-bakery-8',
    name: 'Crispy Tandoori Paneer Butter Puff (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 160,
    description: 'Golden flaky puff pastry turnover filled with spicy tandoori cottage cheese masala.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85&v=dish-bakery-8',
    dietary: ['veg', 'spicy'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Extra Mint Ketchup Dip', price: 15 }]
  },
  {
    id: 'dish-bakery-9',
    name: 'Spicy Pepper Chicken Flaky Puff (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 180,
    description: 'Golden layered puff pastry stuffed with minced spicy black pepper chicken and fried onions.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=85&v=dish-bakery-9',
    dietary: ['non-veg', 'spicy'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Extra Hot Garlic Dip', price: 20 }]
  },
  {
    id: 'dish-bakery-10',
    name: 'Double Dark Chocolate Chunk Cookies (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Soft-baked chewy cookies packed with melted Belgian dark chocolate chunks and sea salt flakes.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=85&v=dish-bakery-10',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Warm Cookie Service', price: 10 }]
  },
  {
    id: 'dish-bakery-11',
    name: 'Assorted French Macarons Gift Box (6pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 380,
    description: 'Delicate Parisian almond meringue shells filled with dark chocolate ganache, pistachio, and raspberry jam.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=85&v=dish-bakery-11',
    dietary: ['veg', 'chef-special'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Gift Box Ribbon Wrapping', price: 20 }]
  },
  {
    id: 'dish-bakery-12',
    name: 'Warm Fudgy Walnut Chocolate Brownie',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Dense molten dark chocolate brownie embedded with toasted crunchy walnuts.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-12',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Add Scoop Vanilla Bean Ice Cream', price: 50 }]
  },
  {
    id: 'dish-bakery-13',
    name: 'Glazed Belgian Chocolate Ring Donut (2pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 170,
    description: 'Soft fluffy fried ring donuts dipped in rich dark Belgian chocolate glaze and colorful sprinkles.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=85&v=dish-bakery-13',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Chocolate Glaze Dip', price: 20 }]
  },
  {
    id: 'dish-bakery-14',
    name: 'Royal Kesar Pista Rasmalai Bowl (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Flattened cottage cheese discs soaked in saffron cardamom thickened milk with chopped pistachios & almonds.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85&v=dish-bakery-14',
    dietary: ['veg', 'chef-special'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Pistachio Saffron Milk', price: 30 }]
  },
  {
    id: 'dish-bakery-15',
    name: 'Desi Ghee Hot Gulab Jamun (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Soft golden fried khoya dumplings soaked in warm rose cardamom sugar syrup.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=85&v=dish-bakery-15',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Add Vanilla Ice Cream Scoop', price: 45 }]
  }
`;

// Insert bakeryDishesCode inside REGIONAL_INDIAN_DISHES array before BIRYANI_SPECIAL_DISHES
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${bakeryDishesCode}\n];\n\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v28_all_vada_images_fixed_and_pages_expanded';",
  "const versionKey = 'giri_dishes_v29_bakery_and_sweets_category_added_fresh';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully added Bakery & Sweets dishes!');
