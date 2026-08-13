const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// 1. Fix Guntur Spicy Kodi Vepudu image
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=85&v=dish-andhra-1'",
  "image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=85&v=andhra-kodi-vepudu-real'"
);

// 2. Fix Chicken Seekh Kebab Platter image
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&auto=format&fit=crop&q=85&v=dish-sg-starter-5'",
  "image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=85&v=chicken-seekh-kebab-real'"
);

// 3. Fix Hara Bhara Kebab image
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=85&v=dish-sg-add-13'",
  "image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85&v=hara-bhara-kebab-real'"
);

// 4. Fix Charcoal Roasted Chicken Tangdi Kebab image
content = content.replace(
  "image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=85&v=dish-gg-starter-5'",
  "image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=85&v=chicken-tangdi-kebab-real'"
);

// 5. Append additional gourmet dishes
const extraMoreDishes = `
  // --- ADDITIONAL MORE GOURMET DISHES ---
  {
    id: 'dish-more-1',
    name: 'Authentic Hyderabadi Pathar Ka Gosht',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 590,
    description: 'Thin mutton slices marinated in raw papaya and royal spices, seared over heated granite stone slab.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85&v=dish-more-1',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Extra Mint Lemon Dip', price: 30 }]
  },
  {
    id: 'dish-more-2',
    name: 'Lucknowi Galouti Kebab with Sheermal',
    category: 'starters',
    shopSlug: 'giri-fine-dining',
    shopName: 'Giri Fine Dining',
    price: 610,
    description: 'Melt-in-mouth minced mutton kebabs marinated in 160 spices, served over sweet saffron flatbread (Sheermal).',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=85&v=dish-more-2',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 22,
    available: true,
    customizations: [{ name: 'Extra Sheermal Bread (1pc)', price: 50 }]
  },
  {
    id: 'dish-more-3',
    name: 'Delhi Special Paneer Butter Masala Naan Thali',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 430,
    description: 'Cottage cheese cubes folded in rich creamy butter tomato gravy, served with 2 tandoori garlic butter naans.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=85&v=dish-more-3',
    dietary: ['veg', 'chef-special'],
    prepTime: 16,
    available: true,
    customizations: [{ name: 'Extra Garlic Butter Naan', price: 40 }]
  },
  {
    id: 'dish-more-4',
    name: 'Dhaba Style Egg Curry with Steamed Rice',
    category: 'mains',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 320,
    description: 'Boiled eggs pan-seared and simmered in spicy peppery onion-tomato masala gravy, served with steamed basmati rice.',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=85&v=dish-more-4',
    dietary: ['non-veg', 'spicy'],
    prepTime: 14,
    available: true,
    customizations: [{ name: 'Extra Boiled Egg (2pcs)', price: 35 }]
  },
  {
    id: 'dish-more-5',
    name: 'Crispy Masala Butter Dosa with Sambar & Chutneys',
    category: 'starters',
    shopSlug: 'giri-kitchen',
    shopName: 'Giri Kitchen',
    price: 240,
    description: 'Golden fermented rice crepe smeared with white butter, stuffed with spiced potato masala, served with piping hot sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85&v=dish-more-5',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [{ name: 'Extra Coconut Chutney Cup', price: 20 }]
  }
`;

// Insert extraMoreDishes before BIRYANI_SPECIAL_DISHES
content = content.replace(
  "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
  `${extraMoreDishes}\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
);

// Bump versionKey
content = content.replace(
  "const versionKey = 'giri_dishes_v25_fine_dining_regional_full_selection';",
  "const versionKey = 'giri_dishes_v26_all_kebabs_and_starters_images_fixed';"
);

fs.writeFileSync(dishesPath, content, 'utf8');
console.log('Successfully fixed kebab images and added additional gourmet dishes!');
