const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// Fix Grand Andhra Royal Veg Thali Meal image first
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=85&v=dish-andhra-8'",
  "image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=85&v=andhra-veg-thali-real'"
);

const regionalDishesCode = `
export const REGIONAL_INDIAN_DISHES: MenuItem[] = [
  // --- GUJARATI SPECIALTIES ---
  {
    id: 'dish-guj-1',
    name: 'Authentic Gujarati Royal Thali Feast',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 450,
    description: 'Traditional Gujarati thali with Gujarati Kadhi, Ringan Potato Shaak, Sev Tameta, Phulka Roti, Steamed Rice, Khaman Dhokla, and Shrikhand.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=85&v=gujarati-thali-royal',
    dietary: ['veg', 'chef-special'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Phulka Roti (2pcs)', price: 30 }]
  },
  {
    id: 'dish-guj-2',
    name: 'Classic Soft Nylon Khaman Dhokla (4pcs)',
    category: 'starters',
    shopSlug: 'giri-express-bistro',
    shopName: 'Giri Express & Bistro',
    price: 180,
    description: 'Steamed fluffy chickpea flour savory cakes tempered with mustard seeds, curry leaves, and green chillies with sweet chutney.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=khaman-dhokla-nylon',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Green Tamarind Chutney', price: 20 }]
  },
  {
    id: 'dish-guj-3',
    name: 'Gujarati Methi Thepla with Sweet Chunda (4pcs)',
    category: 'starters',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 210,
    description: 'Spiced whole wheat flatbreads infused with fresh fenugreek leaves, served with tangy sweet mango pickle (Chunda).',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=methi-thepla-chunda',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Sweet Mango Chunda', price: 25 }]
  },
  {
    id: 'dish-guj-4',
    name: 'Traditional Kathiyawadi Undhiyu Subzi',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
    price: 390,
    description: 'Winter seasonal Gujarati delicacy made with mixed vegetables, raw banana, sweet potato, and spiced chickpea dumplings (Muthiya).',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=85&v=undhiyu-kathiyawadi',
    dietary: ['veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Spiced Muthiya Dumplings (3pcs)', price: 40 }]
  },
  {
    id: 'dish-guj-5',
    name: 'Gujarati Sev Tameta Nu Shaak',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
    price: 320,
    description: 'Sweet and spicy tomato gravy curry cooked with roasted spices and topped with crispy chickpea noodles (Sev).',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85&v=sev-tameta-shaak',
    dietary: ['veg'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Crispy Sev Topping', price: 25 }]
  },
  {
    id: 'dish-guj-6',
    name: 'Authentic Gujarati Dal Dhokli',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 310,
    description: 'Comfort food made of spiced wheat flour dumplings simmered in sweet and tangy tuvar dal with peanuts and ghee.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85&v=dal-dhokli-gujarati',
    dietary: ['veg'],
    prepTime: 16,
    available: true,
    customizations: [{ name: 'Extra Desi Ghee Drizzle', price: 25 }]
  },

  // --- PUNJABI SPECIALTIES ---
  {
    id: 'dish-pun-1',
    name: 'Amritsari Chole Bhature Combo (2pcs)',
    category: 'mains',
    shopSlug: 'giri-express-bistro',
    shopName: 'Giri Express & Bistro',
    price: 290,
    description: 'Fluffy deep-fried leavened bread served with spicy dark Amritsari chickpea curry, pickled onions, and green chilli.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=85&v=amritsari-chole-bhature',
    dietary: ['veg', 'spicy', 'chef-special'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Bhatura (1pc)', price: 50 }]
  },
  {
    id: 'dish-pun-2',
    name: 'Punjabi Sarson Ka Saag & Makki Ki Roti',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 440,
    description: 'Authentic Punjabi mustard greens curry slow-cooked with ghee, garlic, served with maize flour rotis and white butter.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=85&v=sarson-saag-makki',
    dietary: ['veg', 'chef-special'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra White Butter (Makhan)', price: 30 }]
  },
  {
    id: 'dish-pun-3',
    name: 'Amritsari Stuffed Paneer Kulcha with Chole',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 340,
    description: 'Crispy layered tandoori bread stuffed with spiced paneer, onions, herbs, served with spicy chickpea gravy.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85&v=amritsari-paneer-kulcha',
    dietary: ['veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [{ name: 'Extra Chole Gravy Bowl', price: 40 }]
  },
  {
    id: 'dish-pun-4',
    name: 'Punjabi Rajma Masala with Basmati Rice',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 310,
    description: 'Kidney beans slow-cooked in thick onion-tomato gravy with Punjabi spices, served over fragrant basmati rice.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85&v=punjabi-rajma-chawal',
    dietary: ['veg'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Desi Ghee Topping', price: 20 }]
  },
  {
    id: 'dish-pun-5',
    name: 'Punjabi Kadhi Pakora with Desi Ghee',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
    price: 320,
    description: 'Tangy yogurt and chickpea flour curry filled with crispy onion fritters (Pakoras), tempered with whole red chillies.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=85&v=punjabi-kadhi-pakora',
    dietary: ['veg'],
    prepTime: 15,
    available: true,
    customizations: [{ name: 'Extra Onion Pakora Fritters (3pcs)', price: 35 }]
  },

  // --- BENGALI SPECIALTIES ---
  {
    id: 'dish-beng-1',
    name: 'Authentic Bengali Kosha Mangsho (Mutton Roast)',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 640,
    description: 'Rich dark slow-roasted mutton gravy cooked with caramelized onions, mustard oil, green cardamom, and potatoes.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=85&v=bengali-kosha-mangsho',
    dietary: ['non-veg', 'spicy', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [{ name: 'Extra Mutton Gravy Potato', price: 40 }]
  },
  {
    id: 'dish-beng-2',
    name: 'Bengali Shorshe Maach (Mustard Fish Curry)',
    category: 'mains',
    shopSlug: 'giri-seafood',
    shopName: 'Giri Seafood & Lounge',
    price: 520,
    description: 'Fresh Rohu fish steaks cooked in traditional yellow mustard paste gravy with green chillies and mustard oil.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=85&v=shorshe-maach-curry',
    dietary: ['non-veg', 'spicy'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Fish Steak Piece', price: 90 }]
  },
  {
    id: 'dish-beng-3',
    name: 'Bengali Luchi with Alur Dom (4pcs)',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 260,
    description: 'Deep-fried puffed refined flour bread served with baby potatoes cooked in Bengali sweet-spicy gravy.',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=85&v=luchi-alur-dom',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Luchi (2pcs)', price: 30 }]
  },
  {
    id: 'dish-beng-4',
    name: 'Authentic Bengali Mishti Doi Claypot',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Traditional sweetened caramelized fermented yogurt served chilled in an earthen clay pot.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85&v=bengali-mishti-doi',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Claypot Mishti Doi', price: 60 }]
  },
  {
    id: 'dish-beng-5',
    name: 'Kolkata Style Crispy Bhetki Fish Fry',
    category: 'starters',
    shopSlug: 'giri-seafood',
    shopName: 'Giri Seafood & Lounge',
    price: 460,
    description: 'Crumbed fried Bhetki fish fillets marinated in mustard-coriander paste, served with Kasundi mustard.',
    image: 'https://images.unsplash.com/photo-1559742811-822863646df8?w=800&auto=format&fit=crop&q=85&v=bhetki-fish-fry',
    dietary: ['non-veg'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Kasundi Mustard Dip', price: 20 }]
  },

  // --- KERALA SPECIALTIES ---
  {
    id: 'dish-ker-1',
    name: 'Kerala Flaky Parotta with Nadan Chicken Curry',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
    price: 430,
    description: 'Layered flaky Kerala parottas served with spicy village style chicken curry cooked with roasted coconut milk.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=85&v=kerala-parotta-nadan',
    dietary: ['non-veg', 'spicy'],
    prepTime: 16,
    available: true,
    customizations: [{ name: 'Extra Kerala Parotta (1pc)', price: 40 }]
  },
  {
    id: 'dish-ker-2',
    name: 'Kerala Appam with Soft Vegetable Stew (2pcs)',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 330,
    description: 'Soft bowl-shaped fermented rice crepe with crispy lace edges, served with mild coconut milk veg stew.',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=85&v=kerala-appam-stew',
    dietary: ['veg'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Appam (1pc)', price: 45 }]
  },
  {
    id: 'dish-ker-3',
    name: 'Traditional Karimeen Pollichathu (Banana Leaf Fish)',
    category: 'mains',
    shopSlug: 'giri-seafood',
    shopName: 'Giri Seafood & Lounge',
    price: 580,
    description: 'Marinated pearlspot fish wrapped in banana leaf and pan-grilled with onion-tomato roasted masala.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=85&v=karimeen-banana-leaf',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Roasted Masala Coat', price: 40 }]
  },
  {
    id: 'dish-ker-4',
    name: 'Kerala Puttu with Kadala Curry',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 280,
    description: 'Steamed cylindrical rice flour and coconut cake served with dark spicy black chickpea gravy.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85&v=puttu-kadala-curry',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Steamed Puttu Portion', price: 35 }]
  },

  // --- TELANGANA SPECIALTIES ---
  {
    id: 'dish-tel-1',
    name: 'Authentic Telangana Natu Kodi Pulusu (Country Chicken)',
    category: 'mains',
    shopSlug: 'giri-spice-garden',
    shopName: 'Giri Spice Garden',
    price: 510,
    description: 'Spicy country chicken curry slow-cooked with roasted spices, shallots, garlic, and fresh green chillies.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=85&v=telangana-natu-kodi',
    dietary: ['non-veg', 'spicy', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Spicy Pulusu Bowl', price: 45 }]
  },
  {
    id: 'dish-tel-2',
    name: 'Telangana Mutton Boti Fry',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 540,
    description: 'Pan-roasted spicy mutton boti tossed with black pepper, roasted garlic, sesame seeds, and curry leaves.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85&v=telangana-boti-fry',
    dietary: ['non-veg', 'spicy'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Fried Curry Leaves', price: 20 }]
  },
  {
    id: 'dish-tel-3',
    name: 'Hyderabadi Mutton Haleem Special',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 590,
    description: 'Rich, velvety slow-cooked stew of mutton, wheat, barley, and lentils topped with ghee, fried onions, and mint.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=85&v=hyderabadi-mutton-haleem',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [{ name: 'Extra Pure Ghee & Fried Onions', price: 40 }]
  }
];
`;

// Insert REGIONAL_INDIAN_DISHES before BIRYANI_SPECIAL_DISHES
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${regionalDishesCode}\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Add ...REGIONAL_INDIAN_DISHES to RAW_INITIAL_DISHES
content = content.replace(
  "const RAW_INITIAL_DISHES: MenuItem[] = [\n  ...ANDHRA_SPECIAL_DISHES,",
  "const RAW_INITIAL_DISHES: MenuItem[] = [\n  ...REGIONAL_INDIAN_DISHES,\n  ...ANDHRA_SPECIAL_DISHES,"
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v23_all_421_dishes_100_percent_unique_images';",
  "const versionKey = 'giri_dishes_v24_all_regional_cuisines_added_fresh';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully added REGIONAL_INDIAN_DISHES to dishes.ts!');
