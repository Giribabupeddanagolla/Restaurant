const fs = require('fs');

// 1. Update categories.ts with BAKERY_EXCLUSIVE_CATEGORY_GROUPS
const categoriesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/categories.ts';
let catContent = fs.readFileSync(categoriesPath, 'utf8');

const bakeryCategoryGroupsCode = `
export const BAKERY_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'bakery-cakes',
    name: 'Cakes',
    icon: '🎂',
    subcategories: [
      { id: 'birthday-cake', name: 'Birthday Cakes', icon: '🎂' },
      { id: 'wedding-cake', name: 'Wedding Cakes', icon: '💒' },
      { id: 'photo-cake', name: 'Photo Cakes', icon: '🖼️' },
      { id: 'theme-cake', name: 'Theme Cakes', icon: '👑' },
      { id: 'chocolate-cake', name: 'Chocolate Cakes', icon: '🍫' },
      { id: 'red-velvet-cake', name: 'Red Velvet Cakes', icon: '❤️' },
      { id: 'black-forest-cake', name: 'Black Forest Cakes', icon: '🍒' },
      { id: 'fruit-cake', name: 'Fruit Cakes', icon: '🍓' },
      { id: 'cheesecake', name: 'Cheesecakes', icon: '🧀' },
    ]
  },
  {
    id: 'bakery-pastries',
    name: 'Pastries',
    icon: '🍰',
    subcategories: [
      { id: 'chocolate-pastry', name: 'Chocolate Pastry', icon: '🍫' },
      { id: 'pineapple-pastry', name: 'Pineapple Pastry', icon: '🍍' },
      { id: 'red-velvet-pastry', name: 'Red Velvet Pastry', icon: '❤️' },
      { id: 'black-forest-pastry', name: 'Black Forest Pastry', icon: '🍒' },
      { id: 'butterscotch-pastry', name: 'Butterscotch Pastry', icon: '🍯' },
      { id: 'fruit-pastry', name: 'Fruit Pastry', icon: '🍓' },
    ]
  },
  {
    id: 'bakery-breads',
    name: 'Breads',
    icon: '🍞',
    subcategories: [
      { id: 'white-bread', name: 'White Bread', icon: '🍞' },
      { id: 'brown-bread', name: 'Brown Bread', icon: '🍞' },
      { id: 'multigrain-bread', name: 'Multigrain Bread', icon: '🌾' },
      { id: 'milk-bread', name: 'Milk Bread', icon: '🥛' },
      { id: 'garlic-bread', name: 'Garlic Bread', icon: '🧄' },
      { id: 'sandwich-bread', name: 'Sandwich Bread', icon: '🥪' },
      { id: 'french-baguette', name: 'French Baguette', icon: '🥖' },
    ]
  },
  {
    id: 'bakery-cookies',
    name: 'Cookies',
    icon: '🍪',
    subcategories: [
      { id: 'butter-cookies', name: 'Butter Cookies', icon: '🧈' },
      { id: 'chocolate-chip-cookies', name: 'Chocolate Chip Cookies', icon: '🍪' },
      { id: 'coconut-cookies', name: 'Coconut Cookies', icon: '🥥' },
      { id: 'almond-cookies', name: 'Almond Cookies', icon: '🥜' },
      { id: 'cashew-cookies', name: 'Cashew Cookies', icon: '🥜' },
      { id: 'oatmeal-cookies', name: 'Oatmeal Cookies', icon: '🌾' },
      { id: 'jeera-cookies', name: 'Jeera Cookies', icon: '🌿' },
    ]
  },
  {
    id: 'bakery-biscuits',
    name: 'Biscuits',
    icon: '🥯',
    subcategories: [
      { id: 'cream-biscuits', name: 'Cream Biscuits', icon: '🥛' },
      { id: 'salt-biscuits', name: 'Salt Biscuits', icon: '🧂' },
      { id: 'digestive-biscuits', name: 'Digestive Biscuits', icon: '🌾' },
      { id: 'milk-biscuits', name: 'Milk Biscuits', icon: '🥛' },
      { id: 'coconut-biscuits', name: 'Coconut Biscuits', icon: '🥥' },
      { id: 'cashew-biscuits', name: 'Cashew Biscuits', icon: '🥜' },
    ]
  },
  {
    id: 'bakery-muffins',
    name: 'Muffins',
    icon: '🧁',
    subcategories: [
      { id: 'chocolate-muffin', name: 'Chocolate Muffin', icon: '🍫' },
      { id: 'blueberry-muffin', name: 'Blueberry Muffin', icon: '🫐' },
      { id: 'vanilla-muffin', name: 'Vanilla Muffin', icon: '🍦' },
      { id: 'banana-muffin', name: 'Banana Muffin', icon: '🍌' },
      { id: 'red-velvet-muffin', name: 'Red Velvet Muffin', icon: '❤️' },
    ]
  },
  {
    id: 'bakery-donuts',
    name: 'Donuts',
    icon: '🍩',
    subcategories: [
      { id: 'chocolate-donut', name: 'Chocolate Donut', icon: '🍫' },
      { id: 'glazed-donut', name: 'Glazed Donut', icon: '✨' },
      { id: 'strawberry-donut', name: 'Strawberry Donut', icon: '🍓' },
      { id: 'cinnamon-donut', name: 'Cinnamon Donut', icon: '🌿' },
      { id: 'cream-filled-donut', name: 'Cream-Filled Donut', icon: '🥛' },
    ]
  },
  {
    id: 'bakery-brownies',
    name: 'Brownies',
    icon: '🍫',
    subcategories: [
      { id: 'chocolate-brownie', name: 'Chocolate Brownie', icon: '🍫' },
      { id: 'walnut-brownie', name: 'Walnut Brownie', icon: '🌰' },
      { id: 'fudge-brownie', name: 'Fudge Brownie', icon: '🍫' },
      { id: 'nutella-brownie', name: 'Nutella Brownie', icon: '🍯' },
      { id: 'double-chocolate-brownie', name: 'Double Chocolate Brownie', icon: '🍫' },
    ]
  },
  {
    id: 'bakery-puffs',
    name: 'Puffs & Savories',
    icon: '🥧',
    subcategories: [
      { id: 'veg-puff', name: 'Veg Puff', icon: '🥦' },
      { id: 'paneer-puff', name: 'Paneer Puff', icon: '🧀' },
      { id: 'egg-puff', name: 'Egg Puff', icon: '🥚' },
      { id: 'chicken-puff', name: 'Chicken Puff', icon: '🍗' },
      { id: 'mushroom-puff', name: 'Mushroom Puff', icon: '🍄' },
      { id: 'cheese-puff', name: 'Cheese Puff', icon: '🧀' },
      { id: 'potato-puff', name: 'Potato Puff', icon: '🥔' },
    ]
  },
  {
    id: 'bakery-rolls',
    name: 'Rolls & Sandwiches',
    icon: '🥪',
    subcategories: [
      { id: 'veg-roll', name: 'Veg Roll', icon: '🌯' },
      { id: 'paneer-roll', name: 'Paneer Roll', icon: '🧀' },
      { id: 'chicken-roll', name: 'Chicken Roll', icon: '🍗' },
      { id: 'veg-sandwich', name: 'Veg Sandwich', icon: '🥪' },
      { id: 'cheese-sandwich', name: 'Cheese Sandwich', icon: '🧀' },
      { id: 'chicken-sandwich', name: 'Chicken Sandwich', icon: '🥪' },
    ]
  },
  {
    id: 'bakery-desserts',
    name: 'Desserts',
    icon: '🍨',
    subcategories: [
      { id: 'chocolate-tart', name: 'Chocolate Tart', icon: '🥧' },
      { id: 'fruit-tart', name: 'Fruit Tart', icon: '🍓' },
      { id: 'eclair', name: 'Éclair', icon: '🥖' },
      { id: 'macaron', name: 'Macaron', icon: '🍪' },
      { id: 'tiramisu', name: 'Tiramisu', icon: '☕' },
      { id: 'pudding', name: 'Pudding', icon: '🍮' },
      { id: 'mousse', name: 'Mousse', icon: '🍨' },
    ]
  },
  {
    id: 'bakery-sweets',
    name: 'Indian Sweets',
    icon: '🍬',
    subcategories: [
      { id: 'gulab-jamun', name: 'Gulab Jamun', icon: '🍩' },
      { id: 'rasmalai', name: 'Rasmalai', icon: '🥛' },
      { id: 'kaju-katli', name: 'Kaju Katli', icon: '💎' },
      { id: 'motichoor-laddu', name: 'Motichoor Laddu', icon: '🟠' },
      { id: 'mysore-pak', name: 'Mysore Pak', icon: '🧈' },
      { id: 'badusha', name: 'Badusha', icon: '🥞' },
    ]
  },
  {
    id: 'bakery-icecream',
    name: 'Ice Cream & Frozen',
    icon: '🍦',
    subcategories: [
      { id: 'vanilla-ice-cream', name: 'Vanilla Ice Cream', icon: '🍦' },
      { id: 'chocolate-ice-cream', name: 'Chocolate Ice Cream', icon: '🍨' },
      { id: 'strawberry-ice-cream', name: 'Strawberry Ice Cream', icon: '🍓' },
      { id: 'butterscotch-ice-cream', name: 'Butterscotch Ice Cream', icon: '🍯' },
      { id: 'brownie-sundae', name: 'Brownie Sundae', icon: '🍨' },
    ]
  },
  {
    id: 'bakery-beverages',
    name: 'Beverages',
    icon: '☕',
    subcategories: [
      { id: 'cold-coffee', name: 'Cold Coffee', icon: '🧋' },
      { id: 'hot-chocolate', name: 'Hot Chocolate', icon: '☕' },
      { id: 'cappuccino', name: 'Cappuccino', icon: '☕' },
      { id: 'latte', name: 'Latte', icon: '☕' },
      { id: 'espresso', name: 'Espresso', icon: '☕' },
      { id: 'masala-tea', name: 'Masala Tea', icon: '🍵' },
      { id: 'fresh-juice', name: 'Fresh Juice', icon: '🧃' },
      { id: 'milkshake', name: 'Milkshake', icon: '🥤' },
    ]
  }
];
`;

if (!catContent.includes('BAKERY_EXCLUSIVE_CATEGORY_GROUPS')) {
  catContent += `\n${bakeryCategoryGroupsCode}`;
  fs.writeFileSync(categoriesPath, catContent, 'utf8');
  console.log('Successfully added BAKERY_EXCLUSIVE_CATEGORY_GROUPS to categories.ts');
}

// 2. Update mockData.ts re-export if needed
const mockDataPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/mockData.ts';
let mockContent = fs.readFileSync(mockDataPath, 'utf8');
if (!mockContent.includes('BAKERY_EXCLUSIVE_CATEGORY_GROUPS')) {
  mockContent = mockContent.replace(
    "export { INITIAL_CATEGORIES, CATEGORY_GROUPS } from './categories';",
    "export { INITIAL_CATEGORIES, CATEGORY_GROUPS, BAKERY_EXCLUSIVE_CATEGORY_GROUPS } from './categories';"
  );
  fs.writeFileSync(mockDataPath, mockContent, 'utf8');
  console.log('Successfully re-exported BAKERY_EXCLUSIVE_CATEGORY_GROUPS in mockData.ts');
}
