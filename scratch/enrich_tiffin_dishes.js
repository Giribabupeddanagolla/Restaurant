const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// 1. Fix Crispy Masala Butter Dosa salad bowl image
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=85&v=dish-more-5'",
  "image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=dish-more-5-masala-dosa'"
);

// 2. Add gourmet Tiffin dishes for Fine Dining and other outlets
const tiffinDishesCode = `
  // --- GOURMET TIFFIN & BREAKFAST CREATIONS ---
  {
    id: 'dish-tiffin-fd-1',
    name: 'Ghee Roast Masala Dosa with Sambar & Chutneys',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 260,
    description: 'Golden thin crispy crepe roasted in pure A2 desi ghee, stuffed with spiced potato masala, served with sambar and 3 artisan chutneys.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=ghee-roast-dosa',
    dietary: ['veg', 'chef-special'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Gunpowder Podi & Ghee', price: 30 }]
  },
  {
    id: 'dish-tiffin-fd-2',
    name: 'Andhra Cheese Chili Garlic Dosa',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 290,
    description: 'Crispy dosa layered with melted mozzarella cheese, minced green chillies, garlic butter, and red chili spread.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=cheese-chili-dosa',
    dietary: ['veg', 'spicy'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Melted Mozzarella Cheese', price: 40 }]
  },
  {
    id: 'dish-tiffin-fd-3',
    name: 'Paneer Butter Masala Stuffed Dosa',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 310,
    description: 'Crispy golden dosa stuffed with rich tandoori paneer tikka cubes in velvety butter tomato gravy.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=paneer-stuffed-dosa',
    dietary: ['veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [{ name: 'Extra Paneer Gravy Stuffing', price: 45 }]
  },
  {
    id: 'dish-tiffin-fd-4',
    name: 'Ghee Podi Button Idly (12pcs Mini Bowl)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 220,
    description: '12 bite-sized steamed rice cakes tossed in hot spiced roasted lentil powder (Gunpowder Podi) and warm A2 ghee.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85&v=ghee-podi-idly',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Ghee Drizzle Cup', price: 25 }]
  },
  {
    id: 'dish-tiffin-fd-5',
    name: 'Classic Soft Steamed Rice Idli with Sambar (4pcs)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 180,
    description: 'Soft pillow-fluffy steamed rice & lentil cakes served with steaming drumstick sambar, coconut chutney, and tomato chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85&v=classic-steamed-idli',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [{ name: 'Extra Sambar Bowl', price: 20 }]
  },
  {
    id: 'dish-tiffin-fd-6',
    name: 'Ghee Medu Vada Crisp (4pcs)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 210,
    description: 'Golden crispy fried urad dal savory donuts seasoned with whole black pepper, ginger, and curry leaves.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=ghee-medu-vada',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Coconut Chutney Cup', price: 20 }]
  },
  {
    id: 'dish-tiffin-fd-7',
    name: 'Sambar Dip Medu Vada Bowl',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 230,
    description: 'Freshly fried medu vadas submerged in hot flavorful vegetable sambar garnished with fresh coriander and ghee.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=sambar-dip-vada',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Desi Ghee Topping', price: 25 }]
  },
  {
    id: 'dish-tiffin-fd-8',
    name: 'Royal Chole Poori Combo Feast (3pcs)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 270,
    description: 'Deep-fried puffed whole wheat pooris served with authentic spicy Punjabi chickpea gravy and pickled onions.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=chole-poori-combo',
    dietary: ['veg', 'spicy'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Poori (1pc)', price: 35 }]
  },
  {
    id: 'dish-tiffin-fd-9',
    name: 'Ghee Cashew Rava Upma with Allam Chutney',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 190,
    description: 'Roasted semolina cooked with ghee, crunchy cashews, mustard seeds, curry leaves, and ginger served with spicy ginger chutney.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=85&v=ghee-rava-upma',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Roasted Cashews Topping', price: 30 }]
  },
  {
    id: 'dish-tiffin-fd-10',
    name: 'Ghee Ven Pongal with Coconut Chutney',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 210,
    description: 'Comforting porridge of rice and moong dal tempered with A2 ghee, crushed black pepper, cumin, ginger, and cashews.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85&v=ghee-ven-pongal',
    dietary: ['veg', 'chef-special'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Ghee & Black Pepper Dip', price: 25 }]
  },
  {
    id: 'dish-tiffin-fd-11',
    name: 'MLA Pesarattu Upma Special with Ginger Chutney',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 250,
    description: 'Whole green gram crepe stuffed with hot semolina rava upma, chopped onions, and chilies, served with Allam ginger chutney.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=85&v=mla-pesarattu-upma',
    dietary: ['veg', 'chef-special'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Ginger (Allam) Chutney', price: 20 }]
  }
`;

// Insert tiffinDishesCode inside REGIONAL_INDIAN_DISHES before its end `];`
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${tiffinDishesCode}\n];\n\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v26_all_kebabs_and_starters_images_fixed';",
  "const versionKey = 'giri_dishes_v27_fine_dining_tiffins_full_selection';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully added fine dining Tiffins and fixed Dosa salad image!');
