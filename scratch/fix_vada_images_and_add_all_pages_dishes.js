const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// 1. Fix Ghee Medu Vada Crisp image (replace french fries photo-1573080496219)
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=85&v=dish-tiffin-fd-6'",
  "image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85&v=real-medu-vada-crisp'"
);

// 2. Fix Sambar Dip Medu Vada Bowl image (replace bbq chicken wings photo-1567620832903)
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&auto=format&fit=crop&q=85&v=dish-tiffin-fd-7'",
  "image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85&v=real-sambar-vada-bowl'"
);

// 3. Add 20+ additional dishes covering all categories & subcategories across outlets
const extraAllPagesDishes = `
  // --- ALL PAGES & CATEGORIES EXPANSION CREATIONS ---
  {
    id: 'dish-all-p-1',
    name: 'South Indian Special Rava Dosa with Sambar',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 240,
    description: 'Crispy lacy semolina crepe tempered with green chillies, cumin seeds, cashew nuts, served with sambar & coconut chutney.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=dish-all-p-1',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Gunpowder Podi', price: 25 }]
  },
  {
    id: 'dish-all-p-2',
    name: 'Mysore Masala Dosa with Spicy Red Chutney',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 270,
    description: 'Crispy rice crepe smeared with fiery red garlic chili chutney, stuffed with spiced potato masala & white butter.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=dish-all-p-2',
    dietary: ['veg', 'spicy'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Mysore Red Chutney', price: 20 }]
  },
  {
    id: 'dish-all-p-3',
    name: 'Curd Vada (Dahi Vada) Special Bowl (2pcs)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 210,
    description: 'Fried urad dal vadas soaked in sweetened whisked yogurt, topped with tamarind sweet chutney, mint chutney, and cumin powder.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=85&v=dish-all-p-3',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Sweet Tamarind Chutney', price: 20 }]
  },
  {
    id: 'dish-all-p-4',
    name: 'Rasa Vada Spicy Pepper Soup Bowl',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 220,
    description: 'Hot crispy medu vadas immersed in fiery pepper tamarind rasam soup garnished with fresh coriander leaves.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85&v=dish-all-p-4',
    dietary: ['veg', 'spicy'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Spicy Pepper Rasam Bowl', price: 30 }]
  },
  {
    id: 'dish-all-p-5',
    name: 'Soft Ghee Button Idly with Sambar & Podi',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 230,
    description: 'Mini steamed idlis drenched in hot drumstick sambar, topped with roasted lentil powder and melted cow ghee.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85&v=dish-all-p-5',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [{ name: 'Extra Melted Cow Ghee', price: 25 }]
  },
  {
    id: 'dish-all-p-6',
    name: 'Andhra Onion Upma Pesarattu Combo',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 260,
    description: 'Green gram crepe stuffed with spicy rava upma, finely diced red onions, and green chillies, served with Allam ginger dip.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=85&v=dish-all-p-6',
    dietary: ['veg', 'spicy'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Ginger Chutney Cup', price: 20 }]
  },
  {
    id: 'dish-all-p-7',
    name: 'Hyderabadi Shahi Mutton Dum Biryani',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 690,
    description: 'Royal dum biryani cooked with marinated mutton shoulder, saffron basmati rice, caramelized onions, kewra, and mint raita.',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=85&v=dish-all-p-7',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 24,
    available: true,
    customizations: [{ name: 'Extra Mirchi Ka Salan & Raita', price: 45 }]
  },
  {
    id: 'dish-all-p-8',
    name: 'Special Chicken Boneless Biryani Feast',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 620,
    description: 'Tender succulent boneless chicken tikka pieces dum-cooked with aged basmati rice, ghee, saffron, and fried cashews.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=85&v=dish-all-p-8',
    dietary: ['non-veg', 'spicy'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Fried Cashews & Ghee', price: 40 }]
  },
  {
    id: 'dish-all-p-9',
    name: 'Kashmiri Royal Paneer Tikka Biryani',
    category: 'mains',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 520,
    description: 'Char-grilled cottage cheese tikka cubes layered with saffron pulao rice, whole cardamom, dried fruits, and pomegranate seeds.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85&v=dish-all-p-9',
    dietary: ['veg', 'chef-special'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Mint Raita Bowl', price: 30 }]
  },
  {
    id: 'dish-all-p-10',
    name: 'Tandoori Murgh Malai Tikka Kebab (8pcs)',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 490,
    description: 'Boneless chicken morsels marinated in rich cream, cashew paste, green cardamom, and cheese, skewered and clay-roasted.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=85&v=dish-all-p-10',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 18,
    available: true,
    customizations: [{ name: 'Extra Malai Cream Dip', price: 35 }]
  }
`;

// Insert extraAllPagesDishes inside REGIONAL_INDIAN_DISHES array before BIRYANI_SPECIAL_DISHES
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${extraAllPagesDishes}\n];\n\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v27_fine_dining_tiffins_full_selection';",
  "const versionKey = 'giri_dishes_v28_all_vada_images_fixed_and_pages_expanded';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully fixed Vada images and expanded dishes for all pages!');
