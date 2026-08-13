const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// 1. Fix Japanese Ramen image for Bengali Kosha Mangsho
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=85&v=dish-beng-1'",
  "image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=85&v=dish-beng-1-kosha'"
);

// 2. Additional gourmet dishes for Giri Fine Dining and other outlets across regional categories
const extraDishesCode = `
  // --- ADDITIONAL BENGALI GOURMET DISHES ---
  {
    id: 'dish-beng-6',
    name: 'Bengali Chingri Malai Curry (Prawn Coconut Curry)',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 680,
    description: 'Jumbo prawns simmered in a rich coconut milk gravy infused with green cardamom, cinnamon, and ghee.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=85&v=dish-beng-6',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Coconut Gravy Bowl', price: 50 }]
  },
  {
    id: 'dish-beng-7',
    name: 'Bengali Cholar Dal with Fried Coconut',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 320,
    description: 'Aromatic Bengal gram lentil curry cooked with ghee, fried coconut bites, raisins, and whole bay leaves.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85&v=dish-beng-7',
    dietary: ['veg'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Fried Coconut Chips', price: 25 }]
  },
  {
    id: 'dish-beng-8',
    name: 'Bengali Royal Mutton Biryani with Egg & Potato',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 720,
    description: 'Fragrant Kolkata style mutton biryani layered with saffron basmati rice, boiled egg, and golden spiced potato.',
    image: 'https://images.unsplash.com/photo-1630851840633-f96999247032?w=800&auto=format&fit=crop&q=85&v=dish-beng-8',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 24,
    available: true,
    customizations: [{ name: 'Extra Boiled Egg & Potato', price: 40 }]
  },
  {
    id: 'dish-beng-9',
    name: 'Kolkata Chicken Dum Biryani',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 580,
    description: 'Light aromatic chicken biryani with tender chicken drumstick, boiled egg, and buttered potato.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=85&v=dish-beng-9',
    dietary: ['non-veg'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Chicken Drumstick', price: 80 }]
  },
  {
    id: 'dish-beng-10',
    name: 'Bengali Soft Rasgulla Syrup Sweets (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 220,
    description: 'Spongy chhena cottage cheese balls soaked in hot cardamom sugar syrup.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85&v=dish-beng-10',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Rasgulla Portion (2pcs)', price: 60 }]
  },

  // --- ADDITIONAL GUJARATI GOURMET DISHES ---
  {
    id: 'dish-guj-7',
    name: 'Gujarati Methi Muthiya Curry',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 360,
    description: 'Steamed fenugreek & gram flour dumplings simmered in tangy spiced tomato yogurt gravy.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=dish-guj-7',
    dietary: ['veg'],
    prepTime: 16,
    available: true,
    customizations: [{ name: 'Extra Muthiya Dumplings (3pcs)', price: 35 }]
  },
  {
    id: 'dish-guj-8',
    name: 'Kathiyawadi Stuffed Capsicum Masala',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 350,
    description: 'Whole green bell peppers stuffed with roasted peanut, sesame seed, and spiced Sev masala.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=85&v=dish-guj-8',
    dietary: ['veg', 'spicy'],
    prepTime: 16,
    available: true,
    customizations: [{ name: 'Extra Peanut Spice Gravy', price: 30 }]
  },
  {
    id: 'dish-guj-9',
    name: 'Gujarati Sweet Shrikhand Saffron Dessert',
    category: 'desserts',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 240,
    description: 'Creamy strained yogurt infused with saffron, cardamom, and crushed pistachio nuts.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85&v=dish-guj-9',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Pistachio & Almond Topping', price: 30 }]
  },

  // --- ADDITIONAL PUNJABI GOURMET DISHES ---
  {
    id: 'dish-pun-6',
    name: 'Punjabi Royal Butter Chicken (Murgh Makhani)',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 590,
    description: 'Charcoal grilled tandoori chicken in rich velvety butter tomato cream gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=85&v=dish-pun-6',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Butter Cream Drizzle', price: 40 }]
  },
  {
    id: 'dish-pun-7',
    name: 'Punjabi Dal Makhani Desi Ghee',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 420,
    description: 'Overnight slow-cooked black lentils enriched with butter, cream, and Kasuri methi.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85&v=dish-pun-7',
    dietary: ['veg', 'chef-special'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Desi Ghee Drizzle', price: 30 }]
  },
  {
    id: 'dish-pun-8',
    name: 'Punjabi Tandoori Paneer Tikka Masala',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 490,
    description: 'Tandoori paneer tikka cubes cooked in spiced thick onion tomato gravy with capsicum.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=85&v=dish-pun-8',
    dietary: ['veg', 'spicy'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Paneer Tikka Cubes', price: 60 }]
  },

  // --- ADDITIONAL KERALA GOURMET DISHES ---
  {
    id: 'dish-ker-5',
    name: 'Kerala Seafood Meen Curry',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 540,
    description: 'Coastal fish curry simmered with Kokum tamarind, coconut milk, and curry leaves.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=85&v=dish-ker-5',
    dietary: ['non-veg', 'spicy'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Fish Steak Piece', price: 90 }]
  },
  {
    id: 'dish-ker-6',
    name: 'Kerala Malabar Mutton Roast',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 660,
    description: 'Tender mutton chunks tossed in roasted coconut slices, black pepper, and fennel spices.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85&v=dish-ker-6',
    dietary: ['non-veg', 'spicy', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [{ name: 'Extra Roasted Coconut Slice', price: 30 }]
  },

  // --- ADDITIONAL TELANGANA GOURMET DISHES ---
  {
    id: 'dish-tel-4',
    name: 'Telangana Chepala Pulusu (Tangy Fish Curry)',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 520,
    description: 'River fish simmered in tangy tamarind green chilli gravy with fenugreek seeds.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=85&v=dish-tel-4',
    dietary: ['non-veg', 'spicy'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Tangy Pulusu Gravy', price: 40 }]
  },
  {
    id: 'dish-tel-5',
    name: 'Telangana Spicy Mutton Keema Balls Curry',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 620,
    description: 'Fried spiced mutton meatballs tossed in thick onion ginger garlic spicy gravy.',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&auto=format&fit=crop&q=85&v=dish-tel-5',
    dietary: ['non-veg', 'spicy'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Mutton Meatballs (3pcs)', price: 80 }]
  }
];
`;

// Insert extraDishesCode before BIRYANI_SPECIAL_DISHES
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${extraDishesCode}\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v24_all_regional_cuisines_added_fresh';",
  "const versionKey = 'giri_dishes_v25_fine_dining_regional_full_selection';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully enriched Giri Fine Dining regional dishes and replaced Japanese Ramen image!');
