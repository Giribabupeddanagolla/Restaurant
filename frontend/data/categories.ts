import { Category } from '../types';

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'biryani',
    name: 'Biryani Special',
    icon: '🍲',
    subcategories: [
      { id: 'chicken-biryani', name: 'Chicken Biryani', icon: '🍗' },
      { id: 'mutton-biryani', name: 'Mutton Biryani', icon: '🥩' },
      { id: 'egg-biryani', name: 'Egg Biryani', icon: '🥚' },
      { id: 'veg-biryani', name: 'Veg Biryani', icon: '🥦' },
      { id: 'paneer-biryani', name: 'Paneer Biryani', icon: '🧀' },
      { id: 'special-biryani', name: 'Special Biryani', icon: '⭐' },
    ]
  },
  {
    id: 'indian',
    name: 'Indian Cuisines',
    icon: '🍛',
    subcategories: [
      { id: 'north-indian', name: 'North Indian', icon: '🫓' },
      { id: 'south-indian', name: 'South Indian', icon: '🍌' },
      { id: 'andhra', name: 'Andhra', icon: '🌶️' },
      { id: 'telangana', name: 'Telangana', icon: '🔥' },
      { id: 'punjabi', name: 'Punjabi', icon: '🥘' },
      { id: 'gujarati', name: 'Gujarati', icon: '🍲' },
      { id: 'bengali', name: 'Bengali', icon: '🐟' },
      { id: 'kerala', name: 'Kerala', icon: '🥥' },
    ]
  },
  {
    id: 'starters',
    name: 'Starters',
    icon: '🥗',
    subcategories: [
      { id: 'chicken-starters', name: 'Chicken Starters', icon: '🍗' },
      { id: 'mutton-starters', name: 'Mutton Starters', icon: '🥩' },
      { id: 'fish-starters', name: 'Fish Starters', icon: '🐟' },
      { id: 'paneer-starters', name: 'Paneer Starters', icon: '🧀' },
      { id: 'veg-starters', name: 'Veg Starters', icon: '🥦' },
    ]
  },
  {
    id: 'mains',
    name: 'Main Course',
    icon: '🥘',
    subcategories: [
      { id: 'chicken-main', name: 'Chicken', icon: '🍗' },
      { id: 'mutton-main', name: 'Mutton', icon: '🥩' },
      { id: 'fish-main', name: 'Fish', icon: '🐟' },
      { id: 'paneer-main', name: 'Paneer', icon: '🧀' },
      { id: 'veg-curries', name: 'Veg Curries', icon: '🥦' },
      { id: 'dal', name: 'Dal', icon: '🥣' },
    ]
  },
  {
    id: 'tiffins',
    name: 'Tiffins / Breakfast',
    icon: '🥞',
    subcategories: [
      { id: 'idly', name: 'Idly', icon: '⚪' },
      { id: 'dosa', name: 'Dosa', icon: '🥞' },
      { id: 'vada', name: 'Vada', icon: '🍩' },
      { id: 'poori', name: 'Poori', icon: '🫓' },
      { id: 'upma', name: 'Upma', icon: '🍚' },
      { id: 'pongal', name: 'Pongal', icon: '🥣' },
      { id: 'pesarattu', name: 'Pesarattu', icon: '🥬' },
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese',
    icon: '🥢',
    subcategories: [
      { id: 'noodles', name: 'Noodles', icon: '🍜' },
      { id: 'fried-rice', name: 'Fried Rice', icon: '🍚' },
      { id: 'manchurian', name: 'Manchurian', icon: '🧆' },
      { id: 'chinese-starters', name: 'Chinese Starters', icon: '🥟' },
      { id: 'soups', name: 'Soups', icon: '🥣' },
    ]
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    icon: '🍔',
    subcategories: [
      { id: 'burgers', name: 'Burgers', icon: '🍔' },
      { id: 'pizza', name: 'Pizza', icon: '🍕' },
      { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
      { id: 'french-fries', name: 'French Fries', icon: '🍟' },
      { id: 'wraps', name: 'Wraps', icon: '🌯' },
      { id: 'nuggets', name: 'Nuggets', icon: '🍗' },
    ]
  },
  {
    id: 'rice-meals',
    name: 'Rice & Meals',
    icon: '🍚',
    subcategories: [
      { id: 'veg-meals', name: 'Veg Meals', icon: '🍱' },
      { id: 'non-veg-meals', name: 'Non-Veg Meals', icon: '🍱' },
      { id: 'fried-rice-meals', name: 'Fried Rice', icon: '🍚' },
      { id: 'lemon-rice', name: 'Lemon Rice', icon: '🍋' },
      { id: 'jeera-rice', name: 'Jeera Rice', icon: '🌿' },
      { id: 'curd-rice', name: 'Curd Rice', icon: '🥛' },
    ]
  },
  {
    id: 'italian',
    name: 'Pizza & Italian',
    icon: '🍕',
    subcategories: [
      { id: 'veg-pizza', name: 'Veg Pizza', icon: '🍕' },
      { id: 'chicken-pizza', name: 'Chicken Pizza', icon: '🍕' },
      { id: 'pasta', name: 'Pasta', icon: '🍝' },
      { id: 'garlic-bread', name: 'Garlic Bread', icon: '🥖' },
      { id: 'lasagna', name: 'Lasagna', icon: '🧀' },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    subcategories: [
      { id: 'ice-cream', name: 'Ice Cream', icon: '🍨' },
      { id: 'gulab-jamun', name: 'Gulab Jamun', icon: '🍩' },
      { id: 'brownie', name: 'Brownie', icon: '🍫' },
      { id: 'cake', name: 'Cake', icon: '🎂' },
      { id: 'rasmalai', name: 'Rasmalai', icon: '🥛' },
      { id: 'kheer', name: 'Kheer', icon: '🥣' },
    ]
  },
  {
    id: 'drinks',
    name: 'Beverages',
    icon: '🍹',
    subcategories: [
      { id: 'tea', name: 'Tea', icon: '☕' },
      { id: 'coffee', name: 'Coffee', icon: '☕' },
      { id: 'fresh-juices', name: 'Fresh Juices', icon: '🧃' },
      { id: 'milkshakes', name: 'Milkshakes', icon: '🥤' },
      { id: 'soft-drinks', name: 'Soft Drinks', icon: '🥤' },
      { id: 'lassi', name: 'Lassi', icon: '🥛' },
      { id: 'mocktails', name: 'Mocktails', icon: '🍸' },
    ]
  },
  {
    id: 'bakery',
    name: 'Bakery & Sweets',
    icon: '🥐',
    subcategories: [
      { id: 'cakes-pastries', name: 'Cakes & Pastries', icon: '🎂' },
      { id: 'croissants-breads', name: 'Breads & Croissants', icon: '🥐' },
      { id: 'puffs-savories', name: 'Puffs & Savories', icon: '🥧' },
      { id: 'cookies-biscuits', name: 'Cookies & Biscuits', icon: '🍪' },
      { id: 'brownies-donuts', name: 'Brownies & Donuts', icon: '🍩' },
      { id: 'sweets-mithai', name: 'Indian Sweets & Mithai', icon: '🍨' },
    ]
  },
  {
    id: 'healthy',
    name: 'Healthy Food',
    icon: '🥗',
    subcategories: [
      { id: 'salads', name: 'Salads', icon: '🥗' },
      { id: 'fresh-fruits', name: 'Fresh Fruits', icon: '🍎' },
      { id: 'healthy-soups', name: 'Soups', icon: '🥣' },
      { id: 'diet-meals', name: 'Diet Meals', icon: '🥑' },
    ]
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  ...CATEGORY_GROUPS.map((g) => ({ id: g.id, name: g.name, icon: g.icon }))
];


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

export const GRILL_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'grill-chicken',
    name: 'Grilled Chicken',
    icon: '🍗',
    subcategories: [
      { id: 'grilled-chicken-breast', name: 'Grilled Chicken Breast', icon: '🍗' },
      { id: 'grilled-chicken-leg', name: 'Grilled Chicken Leg', icon: '🍗' },
      { id: 'grilled-chicken-wings', name: 'Grilled Chicken Wings', icon: '🍗' },
      { id: 'chicken-shashlik', name: 'Chicken Shashlik', icon: '🍢' },
      { id: 'chicken-tikka', name: 'Chicken Tikka', icon: '🍢' },
      { id: 'chicken-malai-tikka', name: 'Chicken Malai Tikka', icon: '🍢' },
    ]
  },
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken',
    icon: '🔥',
    subcategories: [
      { id: 'full-tandoori-chicken', name: 'Full Tandoori Chicken', icon: '🍗' },
      { id: 'half-tandoori-chicken', name: 'Half Tandoori Chicken', icon: '🍗' },
      { id: 'tandoori-chicken-legs', name: 'Tandoori Chicken Legs', icon: '🍗' },
      { id: 'tandoori-chicken-wings', name: 'Tandoori Chicken Wings', icon: '🍗' },
    ]
  },
  {
    id: 'chicken-kebabs',
    name: 'Chicken Kebabs',
    icon: '🍢',
    subcategories: [
      { id: 'chicken-seekh-kebab', name: 'Chicken Seekh Kebab', icon: '🍢' },
      { id: 'reshmi-kebab', name: 'Reshmi Kebab', icon: '🍢' },
      { id: 'hariyali-kebab', name: 'Hariyali Kebab', icon: '🌿' },
      { id: 'tangdi-kebab', name: 'Tangdi Kebab', icon: '🍗' },
      { id: 'chicken-boti-kebab', name: 'Chicken Boti Kebab', icon: '🍢' },
    ]
  },
  {
    id: 'mutton-grill',
    name: 'Mutton Grill',
    icon: '🥩',
    subcategories: [
      { id: 'mutton-seekh-kebab', name: 'Mutton Seekh Kebab', icon: '🍢' },
      { id: 'mutton-shashlik', name: 'Mutton Shashlik', icon: '🍢' },
      { id: 'grilled-mutton-chops', name: 'Grilled Mutton Chops', icon: '🥩' },
      { id: 'mutton-boti', name: 'Mutton Boti', icon: '🍢' },
      { id: 'mutton-tikka', name: 'Mutton Tikka', icon: '🍢' },
    ]
  },
  {
    id: 'fish-grill',
    name: 'Fish Grill',
    icon: '🐟',
    subcategories: [
      { id: 'grilled-pomfret', name: 'Grilled Pomfret', icon: '🐟' },
      { id: 'grilled-salmon', name: 'Grilled Salmon', icon: '🐟' },
      { id: 'grilled-seabass', name: 'Grilled Seabass', icon: '🐟' },
      { id: 'fish-tikka', name: 'Fish Tikka', icon: '🍢' },
      { id: 'lemon-herb-fish', name: 'Lemon Herb Fish', icon: '🍋' },
    ]
  },
  {
    id: 'prawns-seafood',
    name: 'Prawns & Seafood',
    icon: '🍤',
    subcategories: [
      { id: 'grilled-prawns', name: 'Grilled Prawns', icon: '🍤' },
      { id: 'garlic-prawns', name: 'Garlic Prawns', icon: '🧄' },
      { id: 'tandoori-prawns', name: 'Tandoori Prawns', icon: '🔥' },
      { id: 'chilli-prawns', name: 'Chilli Prawns', icon: '🌶️' },
      { id: 'prawn-shashlik', name: 'Prawn Shashlik', icon: '🍢' },
    ]
  },
  {
    id: 'veg-grill',
    name: 'Veg Grill',
    icon: '🥦',
    subcategories: [
      { id: 'grilled-paneer', name: 'Grilled Paneer', icon: '🧀' },
      { id: 'paneer-tikka', name: 'Paneer Tikka', icon: '🧀' },
      { id: 'grilled-mushroom', name: 'Grilled Mushroom', icon: '🍄' },
      { id: 'tandoori-mushroom', name: 'Tandoori Mushroom', icon: '🍄' },
      { id: 'grilled-corn', name: 'Grilled Corn', icon: '🌽' },
      { id: 'grilled-vegetables', name: 'Grilled Vegetables', icon: '🥗' },
    ]
  },
  {
    id: 'paneer-tikka-specials',
    name: 'Paneer & Tikka',
    icon: '🧀',
    subcategories: [
      { id: 'achari-paneer-tikka', name: 'Achari Paneer Tikka', icon: '🌶️' },
      { id: 'malai-paneer-tikka', name: 'Malai Paneer Tikka', icon: '🥛' },
      { id: 'hariyali-paneer-tikka', name: 'Hariyali Paneer Tikka', icon: '🌿' },
      { id: 'afghani-paneer-tikka', name: 'Afghani Paneer Tikka', icon: '✨' },
    ]
  },
  {
    id: 'mixed-grill',
    name: 'Mixed Grill',
    icon: '🔥',
    subcategories: [
      { id: 'chicken-mixed-grill', name: 'Chicken Mixed Grill', icon: '🍗' },
      { id: 'mutton-mixed-grill', name: 'Mutton Mixed Grill', icon: '🥩' },
      { id: 'seafood-mixed-grill', name: 'Seafood Mixed Grill', icon: '🍤' },
      { id: 'royal-grill-platter', name: 'Royal Grill Platter', icon: '👑' },
      { id: 'family-grill-platter', name: 'Family Grill Platter', icon: '👨‍👩‍👧‍👦' },
    ]
  },
  {
    id: 'bbq-specials',
    name: 'BBQ',
    icon: '🍖',
    subcategories: [
      { id: 'bbq-chicken', name: 'BBQ Chicken', icon: '🍗' },
      { id: 'bbq-wings', name: 'BBQ Wings', icon: '🍗' },
      { id: 'bbq-ribs', name: 'BBQ Ribs', icon: '🥩' },
      { id: 'bbq-chicken-skewers', name: 'BBQ Chicken Skewers', icon: '🍢' },
      { id: 'bbq-prawns', name: 'BBQ Prawns', icon: '🍤' },
    ]
  },
  {
    id: 'shashlik-skewers',
    name: 'Shashlik & Skewers',
    icon: '🍢',
    subcategories: [
      { id: 'chicken-shashlik-skewer', name: 'Chicken Shashlik', icon: '🍢' },
      { id: 'mutton-shashlik-skewer', name: 'Mutton Shashlik', icon: '🍢' },
      { id: 'vegetable-shashlik', name: 'Vegetable Shashlik', icon: '🍢' },
      { id: 'prawn-skewers', name: 'Prawn Skewers', icon: '🍢' },
      { id: 'mixed-skewers', name: 'Mixed Skewers', icon: '🍢' },
    ]
  },
  {
    id: 'grill-platters',
    name: 'Grill Platters',
    icon: '🍽️',
    subcategories: [
      { id: 'chicken-platter', name: 'Chicken Platter', icon: '🍗' },
      { id: 'mutton-platter', name: 'Mutton Platter', icon: '🥩' },
      { id: 'seafood-platter', name: 'Seafood Platter', icon: '🍤' },
      { id: 'veg-platter', name: 'Veg Platter', icon: '🥦' },
      { id: 'family-platter', name: 'Family Platter', icon: '👑' },
    ]
  },
  {
    id: 'grilled-burgers',
    name: 'Grilled Burgers',
    icon: '🍔',
    subcategories: [
      { id: 'grilled-chicken-burger', name: 'Grilled Chicken Burger', icon: '🍔' },
      { id: 'bbq-chicken-burger', name: 'BBQ Chicken Burger', icon: '🍔' },
      { id: 'grilled-paneer-burger', name: 'Grilled Paneer Burger', icon: '🧀' },
      { id: 'double-chicken-burger', name: 'Double Chicken Burger', icon: '🍔' },
    ]
  },
  {
    id: 'grilled-sandwiches',
    name: 'Grilled Sandwiches',
    icon: '🥪',
    subcategories: [
      { id: 'grilled-chicken-sandwich', name: 'Grilled Chicken Sandwich', icon: '🥪' },
      { id: 'bbq-chicken-sandwich', name: 'BBQ Chicken Sandwich', icon: '🥪' },
      { id: 'grilled-paneer-sandwich', name: 'Grilled Paneer Sandwich', icon: '🥪' },
      { id: 'grilled-vegetable-sandwich', name: 'Grilled Vegetable Sandwich', icon: '🥪' },
    ]
  }
];

export const SPICE_GARDEN_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'south-indian-specials',
    name: 'South Indian Specials',
    icon: '🥞',
    subcategories: [
      { id: 'dosa-special', name: 'Dosa', icon: '🥞' },
      { id: 'idli-special', name: 'Idli', icon: '⚪' },
      { id: 'vada-special', name: 'Vada', icon: '🍩' },
      { id: 'uttapam-special', name: 'Uttapam', icon: '🥞' },
      { id: 'pesarattu-special', name: 'Pesarattu', icon: '🥬' },
      { id: 'pongal-special', name: 'Pongal', icon: '🥣' },
    ]
  },
  {
    id: 'andhra-specials',
    name: 'Andhra Specials',
    icon: '🌶️',
    subcategories: [
      { id: 'andhra-chicken-curry', name: 'Andhra Chicken Curry', icon: '🍗' },
      { id: 'gongura-chicken', name: 'Gongura Chicken', icon: '🍃' },
      { id: 'gongura-mutton', name: 'Gongura Mutton', icon: '🥩' },
      { id: 'natu-kodi-curry', name: 'Natu Kodi Curry', icon: '🐔' },
      { id: 'royyala-iguru', name: 'Royyala Iguru', icon: '🍤' },
    ]
  },
  {
    id: 'hyderabadi-specials',
    name: 'Hyderabadi Specials',
    icon: '👑',
    subcategories: [
      { id: 'hyderabadi-biryani', name: 'Hyderabadi Biryani', icon: '🍲' },
      { id: 'chicken-65-hyd', name: 'Chicken 65', icon: '🍗' },
      { id: 'mirchi-ka-salan', name: 'Mirchi Ka Salan', icon: '🌶️' },
      { id: 'haleem-hyd', name: 'Haleem', icon: '🥣' },
      { id: 'double-ka-meetha-hyd', name: 'Double Ka Meetha', icon: '🍞' },
    ]
  },
  {
    id: 'north-indian-curries',
    name: 'North Indian Curries',
    icon: '🥘',
    subcategories: [
      { id: 'butter-chicken-ni', name: 'Butter Chicken', icon: '🍗' },
      { id: 'kadai-chicken-ni', name: 'Kadai Chicken', icon: '🥘' },
      { id: 'chicken-tikka-masala-ni', name: 'Chicken Tikka Masala', icon: '🍲' },
      { id: 'mutton-rogan-josh-ni', name: 'Mutton Rogan Josh', icon: '🥩' },
      { id: 'dal-makhani-ni', name: 'Dal Makhani', icon: '🥣' },
    ]
  },
  {
    id: 'paneer-specials',
    name: 'Paneer Specials',
    icon: '🧀',
    subcategories: [
      { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', icon: '🧀' },
      { id: 'kadai-paneer-sg', name: 'Kadai Paneer', icon: '🥘' },
      { id: 'paneer-tikka-masala-sg', name: 'Paneer Tikka Masala', icon: '🧀' },
      { id: 'palak-paneer-sg', name: 'Palak Paneer', icon: '🥬' },
      { id: 'shahi-paneer-sg', name: 'Shahi Paneer', icon: '👑' },
    ]
  },
  {
    id: 'veg-curries-specials',
    name: 'Veg Curries',
    icon: '🥦',
    subcategories: [
      { id: 'mix-veg-curry', name: 'Mix Veg Curry', icon: '🥗' },
      { id: 'dal-tadka-sg', name: 'Dal Tadka', icon: '🥣' },
      { id: 'dal-fry-sg', name: 'Dal Fry', icon: '🥣' },
      { id: 'chana-masala-sg', name: 'Chana Masala', icon: '🧆' },
      { id: 'aloo-gobi-sg', name: 'Aloo Gobi', icon: '🥔' },
    ]
  },
  {
    id: 'chicken-specials',
    name: 'Chicken Specials',
    icon: '🍗',
    subcategories: [
      { id: 'chicken-curry-sg', name: 'Chicken Curry', icon: '🍗' },
      { id: 'pepper-chicken-sg', name: 'Pepper Chicken', icon: '🌶️' },
      { id: 'chilli-chicken-sg', name: 'Chilli Chicken', icon: '🔥' },
      { id: 'chicken-chettinad-sg', name: 'Chicken Chettinad', icon: '🍛' },
      { id: 'chicken-korma-sg', name: 'Chicken Korma', icon: '🍲' },
    ]
  },
  {
    id: 'mutton-specials',
    name: 'Mutton Specials',
    icon: '🥩',
    subcategories: [
      { id: 'mutton-curry-sg', name: 'Mutton Curry', icon: '🥩' },
      { id: 'mutton-korma-sg', name: 'Mutton Korma', icon: '🍲' },
      { id: 'mutton-rogan-josh-sg', name: 'Mutton Rogan Josh', icon: '🥩' },
      { id: 'mutton-pepper-fry-sg', name: 'Mutton Pepper Fry', icon: '🌶️' },
      { id: 'mutton-keema-sg', name: 'Mutton Keema', icon: '🥩' },
    ]
  },
  {
    id: 'seafood-specials',
    name: 'Seafood Specials',
    icon: '🐟',
    subcategories: [
      { id: 'fish-curry-sg', name: 'Fish Curry', icon: '🐟' },
      { id: 'fish-fry-sg', name: 'Fish Fry', icon: '🐟' },
      { id: 'andhra-fish-curry-sg', name: 'Andhra Fish Curry', icon: '🌶️' },
      { id: 'prawn-curry-sg', name: 'Prawn Curry', icon: '🍤' },
      { id: 'prawn-pepper-fry-sg', name: 'Prawn Pepper Fry', icon: '🍤' },
    ]
  },
  {
    id: 'rice-pulao',
    name: 'Rice & Pulao',
    icon: '🍚',
    subcategories: [
      { id: 'jeera-rice-sg', name: 'Jeera Rice', icon: '🍚' },
      { id: 'ghee-rice-sg', name: 'Ghee Rice', icon: '🧈' },
      { id: 'veg-pulao-sg', name: 'Veg Pulao', icon: '🥦' },
      { id: 'chicken-pulao-sg', name: 'Chicken Pulao', icon: '🍗' },
      { id: 'mutton-pulao-sg', name: 'Mutton Pulao', icon: '🥩' },
    ]
  },
  {
    id: 'biryani-specials-sg',
    name: 'Biryani Specials',
    icon: '🍲',
    subcategories: [
      { id: 'chicken-dum-biryani-sg', name: 'Chicken Dum Biryani', icon: '🍗' },
      { id: 'mutton-biryani-sg', name: 'Mutton Biryani', icon: '🥩' },
      { id: 'egg-biryani-sg', name: 'Egg Biryani', icon: '🥚' },
      { id: 'paneer-biryani-sg', name: 'Paneer Biryani', icon: '🧀' },
      { id: 'prawn-biryani-sg', name: 'Prawn Biryani', icon: '🍤' },
    ]
  },
  {
    id: 'indian-breads-sg',
    name: 'Indian Breads',
    icon: '🫓',
    subcategories: [
      { id: 'butter-naan-sg', name: 'Butter Naan', icon: '🫓' },
      { id: 'garlic-naan-sg', name: 'Garlic Naan', icon: '🧄' },
      { id: 'tandoori-roti-sg', name: 'Tandoori Roti', icon: '🫓' },
      { id: 'laccha-paratha-sg', name: 'Laccha Paratha', icon: '🫓' },
      { id: 'butter-roti-sg', name: 'Butter Roti', icon: '🧈' },
    ]
  },
  {
    id: 'spice-garden-starters',
    name: 'Spice Garden Starters',
    icon: '🥗',
    subcategories: [
      { id: 'crispy-corn-sg', name: 'Crispy Corn', icon: '🌽' },
      { id: 'paneer-65-sg', name: 'Paneer 65', icon: '🧀' },
      { id: 'gobi-65-sg', name: 'Gobi 65', icon: '🥦' },
      { id: 'chicken-65-sg', name: 'Chicken 65', icon: '🍗' },
      { id: 'fish-65-sg', name: 'Fish 65', icon: '🐟' },
    ]
  },
  {
    id: 'kebabs-tikkas-sg',
    name: 'Kebabs & Tikkas',
    icon: '🍢',
    subcategories: [
      { id: 'chicken-tikka-sg', name: 'Chicken Tikka', icon: '🍢' },
      { id: 'hariyali-kebab-sg', name: 'Hariyali Kebab', icon: '🌿' },
      { id: 'reshmi-kebab-sg', name: 'Reshmi Kebab', icon: '✨' },
      { id: 'paneer-tikka-sg', name: 'Paneer Tikka', icon: '🧀' },
      { id: 'mutton-seekh-kebab-sg', name: 'Mutton Seekh Kebab', icon: '🍢' },
    ]
  },
  {
    id: 'traditional-specials',
    name: 'Traditional Specials',
    icon: '🥘',
    subcategories: [
      { id: 'dal-baati-sg', name: 'Dal Baati', icon: '🥖' },
      { id: 'chole-bhature-sg', name: 'Chole Bhature', icon: '🫓' },
      { id: 'rajma-masala-sg', name: 'Rajma Masala', icon: '🥣' },
      { id: 'malai-kofta-sg', name: 'Malai Kofta', icon: '🧀' },
      { id: 'veg-kofta-sg', name: 'Veg Kofta', icon: '🧆' },
    ]
  },
  {
    id: 'desserts-sg',
    name: 'Desserts',
    icon: '🍨',
    subcategories: [
      { id: 'gulab-jamun-sg', name: 'Gulab Jamun', icon: '🍩' },
      { id: 'rasmalai-sg', name: 'Rasmalai', icon: '🥛' },
      { id: 'double-ka-meetha-dessert', name: 'Double Ka Meetha', icon: '🍞' },
      { id: 'gajar-halwa-sg', name: 'Gajar Halwa', icon: '🥕' },
      { id: 'kulfi-sg', name: 'Kulfi', icon: '🍦' },
    ]
  },
  {
    id: 'beverages-sg',
    name: 'Beverages',
    icon: '☕',
    subcategories: [
      { id: 'masala-chai-sg', name: 'Masala Chai', icon: '🍵' },
      { id: 'filter-coffee-sg', name: 'Filter Coffee', icon: '☕' },
      { id: 'mango-lassi-sg', name: 'Mango Lassi', icon: '🥭' },
      { id: 'sweet-lassi-sg', name: 'Sweet Lassi', icon: '🥛' },
      { id: 'fresh-lime-soda-sg', name: 'Fresh Lime Soda', icon: '🍋' },
    ]
  }
];

export const CAFE_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'hot-coffee-cafe',
    name: 'Hot Coffee',
    icon: '☕',
    subcategories: [
      { id: 'espresso-cf', name: 'Espresso', icon: '☕' },
      { id: 'americano-cf', name: 'Americano', icon: '☕' },
      { id: 'cappuccino-cf', name: 'Cappuccino', icon: '☕' },
      { id: 'cafe-latte-cf', name: 'Cafe Latte', icon: '🥛' },
      { id: 'cafe-mocha-cf', name: 'Cafe Mocha', icon: '🍫' },
      { id: 'flat-white-cf', name: 'Flat White', icon: '☕' },
      { id: 'macchiato-cf', name: 'Macchiato', icon: '☕' },
      { id: 'filter-coffee-cf', name: 'Filter Coffee', icon: '☕' },
    ]
  },
  {
    id: 'specialty-coffee-cafe',
    name: 'Specialty Coffee',
    icon: '✨',
    subcategories: [
      { id: 'caramel-latte-cf', name: 'Caramel Latte', icon: '🍯' },
      { id: 'hazelnut-latte-cf', name: 'Hazelnut Latte', icon: '🌰' },
      { id: 'vanilla-latte-cf', name: 'Vanilla Latte', icon: '🍦' },
      { id: 'irish-cream-coffee-cf', name: 'Irish Cream Coffee', icon: '🍷' },
      { id: 'cinnamon-coffee-cf', name: 'Cinnamon Coffee', icon: '🌿' },
      { id: 'giri-special-coffee-cf', name: 'Giri Special Coffee', icon: '👑' },
    ]
  },
  {
    id: 'cold-coffee-cafe',
    name: 'Cold Coffee',
    icon: '🧋',
    subcategories: [
      { id: 'cold-coffee-cf', name: 'Cold Coffee', icon: '🧊' },
      { id: 'iced-americano-cf', name: 'Iced Americano', icon: '🧊' },
      { id: 'iced-latte-cf', name: 'Iced Latte', icon: '🧋' },
      { id: 'iced-mocha-cf', name: 'Iced Mocha', icon: '🍫' },
      { id: 'frappe-cf', name: 'Frappe', icon: '🥤' },
      { id: 'caramel-frappe-cf', name: 'Caramel Frappe', icon: '🍯' },
    ]
  },
  {
    id: 'tea-cafe',
    name: 'Tea',
    icon: '🍵',
    subcategories: [
      { id: 'masala-tea-cf', name: 'Masala Tea', icon: '🍵' },
      { id: 'ginger-tea-cf', name: 'Ginger Tea', icon: '🫚' },
      { id: 'cardamom-tea-cf', name: 'Cardamom Tea', icon: '🌿' },
      { id: 'lemon-tea-cf', name: 'Lemon Tea', icon: '🍋' },
      { id: 'green-tea-cf', name: 'Green Tea', icon: '🍃' },
      { id: 'black-tea-cf', name: 'Black Tea', icon: '☕' },
    ]
  },
  {
    id: 'special-tea-cafe',
    name: 'Special Tea',
    icon: '🫖',
    subcategories: [
      { id: 'kashmiri-kahwa-cf', name: 'Kashmiri Kahwa', icon: '🌸' },
      { id: 'turmeric-tea-cf', name: 'Turmeric Tea', icon: '🟡' },
      { id: 'honey-lemon-tea-cf', name: 'Honey Lemon Tea', icon: '🍯' },
      { id: 'mint-tea-cf', name: 'Mint Tea', icon: '🍃' },
      { id: 'chocolate-tea-cf', name: 'Chocolate Tea', icon: '🍫' },
    ]
  },
  {
    id: 'milkshakes-cafe',
    name: 'Milkshakes',
    icon: '🥤',
    subcategories: [
      { id: 'vanilla-milkshake-cf', name: 'Vanilla Milkshake', icon: '🍦' },
      { id: 'chocolate-milkshake-cf', name: 'Chocolate Milkshake', icon: '🍫' },
      { id: 'strawberry-milkshake-cf', name: 'Strawberry Milkshake', icon: '🍓' },
      { id: 'mango-milkshake-cf', name: 'Mango Milkshake', icon: '🥭' },
      { id: 'oreo-milkshake-cf', name: 'Oreo Milkshake', icon: '🍪' },
      { id: 'kitkat-milkshake-cf', name: 'KitKat Milkshake', icon: '🍫' },
    ]
  },
  {
    id: 'mojitos-coolers-cafe',
    name: 'Mojitos & Coolers',
    icon: '🍹',
    subcategories: [
      { id: 'virgin-mojito-cf', name: 'Virgin Mojito', icon: '🍹' },
      { id: 'mint-mojito-cf', name: 'Mint Mojito', icon: '🍃' },
      { id: 'blue-lagoon-cf', name: 'Blue Lagoon', icon: '🌊' },
      { id: 'green-apple-cooler-cf', name: 'Green Apple Cooler', icon: '🍏' },
      { id: 'strawberry-cooler-cf', name: 'Strawberry Cooler', icon: '🍓' },
      { id: 'lemon-mint-cooler-cf', name: 'Lemon Mint Cooler', icon: '🍋' },
    ]
  },
  {
    id: 'fresh-juices-cafe',
    name: 'Fresh Juices',
    icon: '🧃',
    subcategories: [
      { id: 'orange-juice-cf', name: 'Orange Juice', icon: '🍊' },
      { id: 'watermelon-juice-cf', name: 'Watermelon Juice', icon: '🍉' },
      { id: 'pineapple-juice-cf', name: 'Pineapple Juice', icon: '🍍' },
      { id: 'apple-juice-cf', name: 'Apple Juice', icon: '🍎' },
      { id: 'pomegranate-juice-cf', name: 'Pomegranate Juice', icon: '🍒' },
      { id: 'carrot-juice-cf', name: 'Carrot Juice', icon: '🥕' },
    ]
  },
  {
    id: 'smoothies-cafe',
    name: 'Smoothies',
    icon: '🥤',
    subcategories: [
      { id: 'mango-smoothie-cf', name: 'Mango Smoothie', icon: '🥭' },
      { id: 'strawberry-smoothie-cf', name: 'Strawberry Smoothie', icon: '🍓' },
      { id: 'banana-smoothie-cf', name: 'Banana Smoothie', icon: '🍌' },
      { id: 'berry-smoothie-cf', name: 'Berry Smoothie', icon: '🫐' },
      { id: 'chocolate-smoothie-cf', name: 'Chocolate Smoothie', icon: '🍫' },
    ]
  },
  {
    id: 'breakfast-cafe',
    name: 'Breakfast',
    icon: '🍳',
    subcategories: [
      { id: 'masala-dosa-cf', name: 'Masala Dosa', icon: '🥞' },
      { id: 'idli-cf', name: 'Idli', icon: '⚪' },
      { id: 'vada-cf', name: 'Vada', icon: '🍩' },
      { id: 'poori-masala-cf', name: 'Poori Masala', icon: '🫓' },
      { id: 'upma-cf', name: 'Upma', icon: '🥣' },
      { id: 'pongal-cf', name: 'Pongal', icon: '🥣' },
      { id: 'vegetable-sandwich-bf', name: 'Vegetable Sandwich', icon: '🥪' },
    ]
  },
  {
    id: 'sandwiches-cafe',
    name: 'Sandwiches',
    icon: '🥪',
    subcategories: [
      { id: 'veg-sandwich-cf', name: 'Veg Sandwich', icon: '🥪' },
      { id: 'cheese-sandwich-cf', name: 'Cheese Sandwich', icon: '🧀' },
      { id: 'grilled-paneer-sandwich-cf', name: 'Grilled Paneer Sandwich', icon: '🥪' },
      { id: 'chicken-sandwich-cf', name: 'Chicken Sandwich', icon: '🍗' },
      { id: 'club-sandwich-cf', name: 'Club Sandwich', icon: '🥪' },
      { id: 'grilled-cheese-sandwich-cf', name: 'Grilled Cheese Sandwich', icon: '🧀' },
    ]
  },
  {
    id: 'burgers-cafe',
    name: 'Burgers',
    icon: '🍔',
    subcategories: [
      { id: 'veg-burger-cf', name: 'Veg Burger', icon: '🍔' },
      { id: 'paneer-burger-cf', name: 'Paneer Burger', icon: '🧀' },
      { id: 'chicken-burger-cf', name: 'Chicken Burger', icon: '🍗' },
      { id: 'cheese-burger-cf', name: 'Cheese Burger', icon: '🧀' },
      { id: 'bbq-chicken-burger-cf', name: 'BBQ Chicken Burger', icon: '🍔' },
    ]
  },
  {
    id: 'pizza-cafe',
    name: 'Pizza',
    icon: '🍕',
    subcategories: [
      { id: 'margherita-pizza-cf', name: 'Margherita Pizza', icon: '🍕' },
      { id: 'farmhouse-pizza-cf', name: 'Farmhouse Pizza', icon: '🥦' },
      { id: 'paneer-pizza-cf', name: 'Paneer Pizza', icon: '🧀' },
      { id: 'chicken-tikka-pizza-cf', name: 'Chicken Tikka Pizza', icon: '🍗' },
      { id: 'bbq-chicken-pizza-cf', name: 'BBQ Chicken Pizza', icon: '🍕' },
    ]
  },
  {
    id: 'pasta-cafe',
    name: 'Pasta',
    icon: '🍝',
    subcategories: [
      { id: 'alfredo-pasta-cf', name: 'Alfredo Pasta', icon: '🍝' },
      { id: 'arrabbiata-pasta-cf', name: 'Arrabbiata Pasta', icon: '🌶️' },
      { id: 'pesto-pasta-cf', name: 'Pesto Pasta', icon: '🌿' },
      { id: 'creamy-mushroom-pasta-cf', name: 'Creamy Mushroom Pasta', icon: '🍄' },
      { id: 'chicken-pasta-cf', name: 'Chicken Pasta', icon: '🍗' },
    ]
  },
  {
    id: 'cafe-snacks-cafe',
    name: 'Cafe Snacks',
    icon: '🍟',
    subcategories: [
      { id: 'french-fries-cf', name: 'French Fries', icon: '🍟' },
      { id: 'peri-peri-fries-cf', name: 'Peri Peri Fries', icon: '🔥' },
      { id: 'cheese-fries-cf', name: 'Cheese Fries', icon: '🧀' },
      { id: 'garlic-bread-cf', name: 'Garlic Bread', icon: '🥖' },
      { id: 'nachos-cf', name: 'Nachos', icon: '🧀' },
      { id: 'potato-wedges-cf', name: 'Potato Wedges', icon: '🥔' },
    ]
  },
  {
    id: 'bakery-cafe',
    name: 'Bakery',
    icon: '🥐',
    subcategories: [
      { id: 'chocolate-cake-cf', name: 'Chocolate Cake', icon: '🎂' },
      { id: 'red-velvet-cake-cf', name: 'Red Velvet Cake', icon: '🧁' },
      { id: 'black-forest-cake-cf', name: 'Black Forest Cake', icon: '🍰' },
      { id: 'chocolate-pastry-cf', name: 'Chocolate Pastry', icon: '🍰' },
      { id: 'donuts-cf', name: 'Donuts', icon: '🍩' },
      { id: 'muffins-cf', name: 'Muffins', icon: '🧁' },
    ]
  },
  {
    id: 'cookies-biscuits-cafe',
    name: 'Cookies & Biscuits',
    icon: '🍪',
    subcategories: [
      { id: 'chocolate-chip-cookies-cf', name: 'Chocolate Chip Cookies', icon: '🍪' },
      { id: 'butter-cookies-cf', name: 'Butter Cookies', icon: '🧈' },
      { id: 'oat-cookies-cf', name: 'Oat Cookies', icon: '🌾' },
      { id: 'almond-cookies-cf', name: 'Almond Cookies', icon: '🌰' },
      { id: 'coconut-cookies-cf', name: 'Coconut Cookies', icon: '🥥' },
    ]
  },
  {
    id: 'desserts-cafe',
    name: 'Desserts',
    icon: '🍨',
    subcategories: [
      { id: 'brownie-cf', name: 'Brownie', icon: '🍫' },
      { id: 'brownie-ice-cream-cf', name: 'Brownie with Ice Cream', icon: '🍨' },
      { id: 'cheesecake-cf', name: 'Cheesecake', icon: '🍰' },
      { id: 'tiramisu-cf', name: 'Tiramisu', icon: '☕' },
      { id: 'chocolate-mousse-cf', name: 'Chocolate Mousse', icon: '🍫' },
      { id: 'fruit-custard-cf', name: 'Fruit Custard', icon: '🍓' },
    ]
  },
  {
    id: 'ice-cream-cafe',
    name: 'Ice Cream',
    icon: '🍦',
    subcategories: [
      { id: 'vanilla-ice-cream-cf', name: 'Vanilla Ice Cream', icon: '🍦' },
      { id: 'chocolate-ice-cream-cf', name: 'Chocolate Ice Cream', icon: '🍫' },
      { id: 'strawberry-ice-cream-cf', name: 'Strawberry Ice Cream', icon: '🍓' },
      { id: 'butterscotch-ice-cream-cf', name: 'Butterscotch Ice Cream', icon: '🍯' },
      { id: 'mango-ice-cream-cf', name: 'Mango Ice Cream', icon: '🥭' },
      { id: 'chocolate-sundae-cf', name: 'Chocolate Sundae', icon: '🍨' },
    ]
  },
  {
    id: 'cafe-combos-cafe',
    name: 'Cafe Combos',
    icon: '👑',
    subcategories: [
      { id: 'coffee-sandwich-combo', name: 'Coffee & Sandwich', icon: '🥪' },
      { id: 'coffee-brownie-combo', name: 'Coffee & Brownie', icon: '☕' },
      { id: 'tea-cookies-combo', name: 'Tea & Cookies', icon: '🍪' },
      { id: 'burger-fries-combo', name: 'Burger & Fries', icon: '🍔' },
      { id: 'pizza-beverage-combo', name: 'Pizza & Beverage', icon: '🍕' },
    ]
  }
];

export const SEAFOOD_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'fish-specials-sf',
    name: 'Fish Specials',
    icon: '🐟',
    subcategories: [
      { id: 'fish-fry-sf', name: 'Fish Fry', icon: '🐟' },
      { id: 'fish-tikka-sf', name: 'Fish Tikka', icon: '🍢' },
      { id: 'grilled-fish-sf', name: 'Grilled Fish', icon: '🔥' },
      { id: 'tandoori-fish-sf', name: 'Tandoori Fish', icon: '🪨' },
      { id: 'fish-finger-sf', name: 'Fish Finger', icon: '🍟' },
      { id: 'lemon-pepper-fish-sf', name: 'Lemon Pepper Fish', icon: '🍋' },
    ]
  },
  {
    id: 'prawns-specials-sf',
    name: 'Prawns Specials',
    icon: '🍤',
    subcategories: [
      { id: 'prawn-fry-sf', name: 'Prawn Fry', icon: '🍤' },
      { id: 'garlic-prawns-sf', name: 'Garlic Prawns', icon: '🧄' },
      { id: 'butter-garlic-prawns-sf', name: 'Butter Garlic Prawns', icon: '🧈' },
      { id: 'chilli-prawns-sf', name: 'Chilli Prawns', icon: '🌶️' },
      { id: 'prawn-tikka-sf', name: 'Prawn Tikka', icon: '🍢' },
      { id: 'tandoori-prawns-sf', name: 'Tandoori Prawns', icon: '🪨' },
    ]
  },
  {
    id: 'crab-specials-sf',
    name: 'Crab Specials',
    icon: '🦀',
    subcategories: [
      { id: 'crab-masala-sf', name: 'Crab Masala', icon: '🦀' },
      { id: 'crab-pepper-fry-sf', name: 'Crab Pepper Fry', icon: '🌶️' },
      { id: 'crab-roast-sf', name: 'Crab Roast', icon: '🔥' },
      { id: 'crab-curry-sf', name: 'Crab Curry', icon: '🍲' },
      { id: 'garlic-crab-sf', name: 'Garlic Crab', icon: '🧄' },
    ]
  },
  {
    id: 'squid-calamari-sf',
    name: 'Squid & Calamari',
    icon: '🦑',
    subcategories: [
      { id: 'calamari-fry-sf', name: 'Calamari Fry', icon: '🦑' },
      { id: 'crispy-calamari-sf', name: 'Crispy Calamari', icon: '✨' },
      { id: 'pepper-squid-sf', name: 'Pepper Squid', icon: '🌶️' },
      { id: 'chilli-squid-sf', name: 'Chilli Squid', icon: '🔥' },
      { id: 'grilled-squid-sf', name: 'Grilled Squid', icon: '🦑' },
    ]
  },
  {
    id: 'lobster-specials-sf',
    name: 'Lobster Specials',
    icon: '🦞',
    subcategories: [
      { id: 'grilled-lobster-sf', name: 'Grilled Lobster', icon: '🦞' },
      { id: 'butter-garlic-lobster-sf', name: 'Butter Garlic Lobster', icon: '🧈' },
      { id: 'lobster-thermidor-sf', name: 'Lobster Thermidor', icon: '👑' },
      { id: 'spicy-lobster-sf', name: 'Spicy Lobster', icon: '🌶️' },
    ]
  },
  {
    id: 'seafood-starters-sf',
    name: 'Seafood Starters',
    icon: '🍤',
    subcategories: [
      { id: 'seafood-65-sf', name: 'Seafood 65', icon: '🔥' },
      { id: 'crispy-fish-sf', name: 'Crispy Fish', icon: '🐟' },
      { id: 'prawn-popcorn-sf', name: 'Prawn Popcorn', icon: '🍿' },
      { id: 'seafood-kebab-sf', name: 'Seafood Kebab', icon: '🍢' },
      { id: 'fish-amritsari-sf', name: 'Fish Amritsari', icon: '🐟' },
    ]
  },
  {
    id: 'seafood-grill-sf',
    name: 'Seafood Grill',
    icon: '🔥',
    subcategories: [
      { id: 'grilled-fish-item-sf', name: 'Grilled Fish', icon: '🐟' },
      { id: 'grilled-prawns-item-sf', name: 'Grilled Prawns', icon: '🍤' },
      { id: 'grilled-squid-item-sf', name: 'Grilled Squid', icon: '🦑' },
      { id: 'grilled-crab-item-sf', name: 'Grilled Crab', icon: '🦀' },
      { id: 'mixed-seafood-grill-sf', name: 'Mixed Seafood Grill', icon: '👑' },
    ]
  },
  {
    id: 'seafood-tandoor-sf',
    name: 'Seafood Tandoor',
    icon: '🪨',
    subcategories: [
      { id: 'tandoori-prawns-item-sf', name: 'Tandoori Prawns', icon: '🍤' },
      { id: 'tandoori-fish-item-sf', name: 'Tandoori Fish', icon: '🐟' },
      { id: 'tandoori-crab-item-sf', name: 'Tandoori Crab', icon: '🦀' },
      { id: 'seafood-tikka-sf', name: 'Seafood Tikka', icon: '🍢' },
    ]
  },
  {
    id: 'coastal-specials-sf',
    name: 'Coastal Specials',
    icon: '🏖️',
    subcategories: [
      { id: 'andhra-fish-curry-sf', name: 'Andhra Fish Curry', icon: '🌶️' },
      { id: 'kerala-fish-curry-sf', name: 'Kerala Fish Curry', icon: '🥥' },
      { id: 'goan-fish-curry-sf', name: 'Goan Fish Curry', icon: '🍛' },
      { id: 'mangalorean-fish-curry-sf', name: 'Mangalorean Fish Curry', icon: '🐟' },
      { id: 'coastal-prawn-curry-sf', name: 'Coastal Prawn Curry', icon: '🍤' },
    ]
  },
  {
    id: 'seafood-curries-sf',
    name: 'Seafood Curries',
    icon: '🍲',
    subcategories: [
      { id: 'fish-curry-sf', name: 'Fish Curry', icon: '🐟' },
      { id: 'prawn-curry-sf', name: 'Prawn Curry', icon: '🍤' },
      { id: 'crab-curry-sf', name: 'Crab Curry', icon: '🦀' },
      { id: 'coconut-fish-curry-sf', name: 'Coconut Fish Curry', icon: '🥥' },
      { id: 'malabar-seafood-curry-sf', name: 'Malabar Seafood Curry', icon: '🍲' },
    ]
  },
  {
    id: 'seafood-rice-biryani-sf',
    name: 'Seafood Rice & Biryani',
    icon: '🍚',
    subcategories: [
      { id: 'fish-biryani-sf', name: 'Fish Biryani', icon: '🐟' },
      { id: 'prawn-biryani-sf', name: 'Prawn Biryani', icon: '🍤' },
      { id: 'seafood-biryani-sf', name: 'Seafood Biryani', icon: '🍲' },
      { id: 'prawn-pulao-sf', name: 'Prawn Pulao', icon: '🍚' },
      { id: 'seafood-fried-rice-sf', name: 'Seafood Fried Rice', icon: '🍳' },
    ]
  },
  {
    id: 'seafood-noodles-sf',
    name: 'Seafood Noodles',
    icon: '🍜',
    subcategories: [
      { id: 'prawn-noodles-sf', name: 'Prawn Noodles', icon: '🍜' },
      { id: 'seafood-hakka-noodles-sf', name: 'Seafood Hakka Noodles', icon: '🥢' },
      { id: 'chilli-garlic-prawn-noodles-sf', name: 'Chilli Garlic Prawn Noodles', icon: '🌶️' },
      { id: 'seafood-schezwan-noodles-sf', name: 'Seafood Schezwan Noodles', icon: '🔥' },
    ]
  },
  {
    id: 'lounge-starters-sf',
    name: 'Lounge Starters',
    icon: '🧀',
    subcategories: [
      { id: 'nachos-sf', name: 'Nachos', icon: '🧀' },
      { id: 'cheese-balls-sf', name: 'Cheese Balls', icon: '🟡' },
      { id: 'french-fries-sf', name: 'French Fries', icon: '🍟' },
      { id: 'peri-peri-fries-sf', name: 'Peri Peri Fries', icon: '🔥' },
      { id: 'potato-wedges-sf', name: 'Potato Wedges', icon: '🥔' },
    ]
  },
  {
    id: 'lounge-chicken-sf',
    name: 'Lounge Chicken',
    icon: '🍗',
    subcategories: [
      { id: 'chicken-wings-sf', name: 'Chicken Wings', icon: '🍗' },
      { id: 'bbq-wings-sf', name: 'BBQ Wings', icon: '🔥' },
      { id: 'chicken-strips-sf', name: 'Chicken Strips', icon: '🥖' },
      { id: 'chicken-popcorn-sf', name: 'Chicken Popcorn', icon: '🍿' },
      { id: 'chicken-skewers-sf', name: 'Chicken Skewers', icon: '🍢' },
    ]
  },
  {
    id: 'lounge-veg-sf',
    name: 'Lounge Veg',
    icon: '🥦',
    subcategories: [
      { id: 'paneer-tikka-sf', name: 'Paneer Tikka', icon: '🧀' },
      { id: 'crispy-corn-sf', name: 'Crispy Corn', icon: '🌽' },
      { id: 'veg-spring-rolls-sf', name: 'Veg Spring Rolls', icon: '🌯' },
      { id: 'mushroom-pepper-fry-sf', name: 'Mushroom Pepper Fry', icon: '🍄' },
      { id: 'cheese-nachos-sf', name: 'Cheese Nachos', icon: '🧀' },
    ]
  },
  {
    id: 'seafood-platters-sf',
    name: 'Seafood Platters',
    icon: '🍽️',
    subcategories: [
      { id: 'fish-platter-sf', name: 'Fish Platter', icon: '🐟' },
      { id: 'prawn-platter-sf', name: 'Prawn Platter', icon: '🍤' },
      { id: 'crab-platter-sf', name: 'Crab Platter', icon: '🦀' },
      { id: 'coastal-platter-sf', name: 'Coastal Platter', icon: '🏖️' },
      { id: 'premium-seafood-platter-sf', name: 'Premium Seafood Platter', icon: '👑' },
    ]
  },
  {
    id: 'family-platters-sf',
    name: 'Family Platters',
    icon: '👑',
    subcategories: [
      { id: 'family-seafood-platter-sf', name: 'Family Seafood Platter', icon: '👨‍👩‍👧‍👦' },
      { id: 'mixed-grill-platter-sf', name: 'Mixed Grill Platter', icon: '🔥' },
      { id: 'coastal-family-feast-sf', name: 'Coastal Family Feast', icon: '🏖️' },
      { id: 'giri-special-seafood-feast-sf', name: 'Giri Special Seafood Feast', icon: '👑' },
    ]
  },
  {
    id: 'mocktails-sf',
    name: 'Mocktails',
    icon: '🍹',
    subcategories: [
      { id: 'virgin-mojito-sf', name: 'Virgin Mojito', icon: '🍹' },
      { id: 'blue-lagoon-sf', name: 'Blue Lagoon', icon: '🌊' },
      { id: 'green-apple-mojito-sf', name: 'Green Apple Mojito', icon: '🍏' },
      { id: 'strawberry-mojito-sf', name: 'Strawberry Mojito', icon: '🍓' },
      { id: 'passion-fruit-cooler-sf', name: 'Passion Fruit Cooler', icon: '🍹' },
    ]
  },
  {
    id: 'fresh-juices-sf',
    name: 'Fresh Juices',
    icon: '🧃',
    subcategories: [
      { id: 'watermelon-juice-sf', name: 'Watermelon', icon: '🍉' },
      { id: 'pineapple-juice-sf', name: 'Pineapple', icon: '🍍' },
      { id: 'orange-juice-sf', name: 'Orange', icon: '🍊' },
      { id: 'pomegranate-juice-sf', name: 'Pomegranate', icon: '🍒' },
      { id: 'sweet-lime-juice-sf', name: 'Sweet Lime', icon: '🍋' },
    ]
  },
  {
    id: 'lounge-beverages-sf',
    name: 'Lounge Beverages',
    icon: '☕',
    subcategories: [
      { id: 'iced-tea-sf', name: 'Iced Tea', icon: '🍹' },
      { id: 'cold-coffee-sf', name: 'Cold Coffee', icon: '🧋' },
      { id: 'fresh-lime-soda-sf', name: 'Fresh Lime Soda', icon: '🍋' },
      { id: 'ginger-lemonade-sf', name: 'Ginger Lemonade', icon: '🍋' },
      { id: 'mint-cooler-sf', name: 'Mint Cooler', icon: '🍃' },
    ]
  },
  {
    id: 'desserts-sf',
    name: 'Desserts',
    icon: '🍨',
    subcategories: [
      { id: 'cheesecake-sf', name: 'Cheesecake', icon: '🍰' },
      { id: 'chocolate-brownie-sf', name: 'Chocolate Brownie', icon: '🍫' },
      { id: 'tiramisu-sf', name: 'Tiramisu', icon: '☕' },
      { id: 'chocolate-mousse-sf', name: 'Chocolate Mousse', icon: '🍫' },
      { id: 'caramel-custard-sf', name: 'Caramel Custard', icon: '🍮' },
    ]
  },
  {
    id: 'ice-creams-sf',
    name: 'Ice Creams',
    icon: '🍦',
    subcategories: [
      { id: 'vanilla-ic-sf', name: 'Vanilla', icon: '🍦' },
      { id: 'chocolate-ic-sf', name: 'Chocolate', icon: '🍫' },
      { id: 'butterscotch-ic-sf', name: 'Butterscotch', icon: '🍯' },
      { id: 'strawberry-ic-sf', name: 'Strawberry', icon: '🍓' },
      { id: 'mango-ic-sf', name: 'Mango', icon: '🥭' },
      { id: 'brownie-sundae-sf', name: 'Brownie Sundae', icon: '🍨' },
    ]
  }
];

export const EXPRESS_BISTRO_EXCLUSIVE_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'express-breakfast-eb',
    name: 'Express Breakfast',
    icon: '🥞',
    subcategories: [
      { id: 'masala-dosa-eb', name: 'Masala Dosa', icon: '🥞' },
      { id: 'idli-eb', name: 'Idli', icon: '⚪' },
      { id: 'vada-eb', name: 'Vada', icon: '🍩' },
      { id: 'poori-masala-eb', name: 'Poori Masala', icon: '🫓' },
      { id: 'upma-eb', name: 'Upma', icon: '🍚' },
      { id: 'pongal-eb', name: 'Pongal', icon: '🥣' },
      { id: 'bread-omelette-eb', name: 'Bread Omelette', icon: '🍳' },
    ]
  },
  {
    id: 'quick-meals-eb',
    name: 'Quick Meals',
    icon: '🍱',
    subcategories: [
      { id: 'veg-meal-eb', name: 'Veg Meal', icon: '🥬' },
      { id: 'south-indian-meal-eb', name: 'South Indian Meal', icon: '🍌' },
      { id: 'mini-meal-eb', name: 'Mini Meal', icon: '🍲' },
      { id: 'andhra-meal-eb', name: 'Andhra Meal', icon: '🌶️' },
      { id: 'chicken-meal-eb', name: 'Chicken Meal', icon: '🍗' },
      { id: 'executive-meal-eb', name: 'Executive Meal', icon: '🍱' },
    ]
  },
  {
    id: 'rice-bowls-eb',
    name: 'Rice & Bowls',
    icon: '🍚',
    subcategories: [
      { id: 'veg-rice-bowl-eb', name: 'Veg Rice Bowl', icon: '🥦' },
      { id: 'chicken-rice-bowl-eb', name: 'Chicken Rice Bowl', icon: '🍗' },
      { id: 'paneer-rice-bowl-eb', name: 'Paneer Rice Bowl', icon: '🧀' },
      { id: 'egg-rice-bowl-eb', name: 'Egg Rice Bowl', icon: '🥚' },
      { id: 'fried-rice-bowl-eb', name: 'Fried Rice Bowl', icon: '🍚' },
    ]
  },
  {
    id: 'biryani-eb',
    name: 'Biryani',
    icon: '🍲',
    subcategories: [
      { id: 'chicken-biryani-eb', name: 'Chicken Biryani', icon: '🍗' },
      { id: 'mutton-biryani-eb', name: 'Mutton Biryani', icon: '🥩' },
      { id: 'egg-biryani-eb', name: 'Egg Biryani', icon: '🥚' },
      { id: 'veg-biryani-eb', name: 'Veg Biryani', icon: '🥦' },
      { id: 'paneer-biryani-eb', name: 'Paneer Biryani', icon: '🧀' },
    ]
  },
  {
    id: 'burgers-eb',
    name: 'Burgers',
    icon: '🍔',
    subcategories: [
      { id: 'veg-burger-eb', name: 'Veg Burger', icon: '🍔' },
      { id: 'paneer-burger-eb', name: 'Paneer Burger', icon: '🧀' },
      { id: 'chicken-burger-eb', name: 'Chicken Burger', icon: '🍗' },
      { id: 'cheese-burger-eb', name: 'Cheese Burger', icon: '🧀' },
      { id: 'bbq-chicken-burger-eb', name: 'BBQ Chicken Burger', icon: '🔥' },
    ]
  },
  {
    id: 'wraps-rolls-eb',
    name: 'Wraps & Rolls',
    icon: '🌯',
    subcategories: [
      { id: 'paneer-wrap-eb', name: 'Paneer Wrap', icon: '🧀' },
      { id: 'veg-roll-eb', name: 'Veg Roll', icon: '🥬' },
      { id: 'chicken-wrap-eb', name: 'Chicken Wrap', icon: '🍗' },
      { id: 'chicken-kathi-roll-eb', name: 'Chicken Kathi Roll', icon: '🌯' },
      { id: 'egg-roll-eb', name: 'Egg Roll', icon: '🥚' },
      { id: 'bbq-chicken-wrap-eb', name: 'BBQ Chicken Wrap', icon: '🔥' },
    ]
  },
  {
    id: 'sandwiches-eb',
    name: 'Sandwiches',
    icon: '🥪',
    subcategories: [
      { id: 'veg-grilled-sandwich-eb', name: 'Veg Grilled Sandwich', icon: '🥪' },
      { id: 'cheese-sandwich-eb', name: 'Cheese Sandwich', icon: '🧀' },
      { id: 'paneer-sandwich-eb', name: 'Paneer Sandwich', icon: '🧀' },
      { id: 'chicken-sandwich-eb', name: 'Chicken Sandwich', icon: '🍗' },
      { id: 'club-sandwich-eb', name: 'Club Sandwich', icon: '🥪' },
    ]
  },
  {
    id: 'pizza-eb',
    name: 'Pizza',
    icon: '🍕',
    subcategories: [
      { id: 'margherita-pizza-eb', name: 'Margherita Pizza', icon: '🍕' },
      { id: 'farmhouse-pizza-eb', name: 'Farmhouse Pizza', icon: '🥦' },
      { id: 'paneer-pizza-eb', name: 'Paneer Pizza', icon: '🧀' },
      { id: 'chicken-tikka-pizza-eb', name: 'Chicken Tikka Pizza', icon: '🍗' },
      { id: 'bbq-chicken-pizza-eb', name: 'BBQ Chicken Pizza', icon: '🔥' },
    ]
  },
  {
    id: 'pasta-eb',
    name: 'Pasta',
    icon: '🍝',
    subcategories: [
      { id: 'alfredo-pasta-eb', name: 'Alfredo Pasta', icon: '🍝' },
      { id: 'arrabbiata-pasta-eb', name: 'Arrabbiata Pasta', icon: '🌶️' },
      { id: 'pesto-pasta-eb', name: 'Pesto Pasta', icon: '🌿' },
      { id: 'mushroom-pasta-eb', name: 'Mushroom Pasta', icon: '🍄' },
      { id: 'chicken-pasta-eb', name: 'Chicken Pasta', icon: '🍗' },
    ]
  },
  {
    id: 'express-starters-eb',
    name: 'Express Starters',
    icon: '🧆',
    subcategories: [
      { id: 'crispy-corn-eb', name: 'Crispy Corn', icon: '🌽' },
      { id: 'gobi-65-eb', name: 'Gobi 65', icon: '🥦' },
      { id: 'chicken-65-eb', name: 'Chicken 65', icon: '🍗' },
      { id: 'chicken-popcorn-eb', name: 'Chicken Popcorn', icon: '🍿' },
      { id: 'chilli-paneer-eb', name: 'Chilli Paneer', icon: '🌶️' },
    ]
  },
  {
    id: 'fries-snacks-eb',
    name: 'Fries & Snacks',
    icon: '🍟',
    subcategories: [
      { id: 'french-fries-eb', name: 'French Fries', icon: '🍟' },
      { id: 'peri-peri-fries-eb', name: 'Peri Peri Fries', icon: '🔥' },
      { id: 'cheese-fries-eb', name: 'Cheese Fries', icon: '🧀' },
      { id: 'potato-wedges-eb', name: 'Potato Wedges', icon: '🥔' },
      { id: 'nachos-eb', name: 'Nachos', icon: '🧀' },
    ]
  },
  {
    id: 'chicken-specials-eb',
    name: 'Chicken Specials',
    icon: '🍗',
    subcategories: [
      { id: 'chicken-wings-eb', name: 'Chicken Wings', icon: '🍗' },
      { id: 'chicken-strips-eb', name: 'Chicken Strips', icon: '🥖' },
      { id: 'chilli-chicken-eb', name: 'Chilli Chicken', icon: '🌶️' },
      { id: 'pepper-chicken-eb', name: 'Pepper Chicken', icon: '🧂' },
      { id: 'bbq-chicken-eb', name: 'BBQ Chicken', icon: '🔥' },
    ]
  },
  {
    id: 'veg-specials-eb',
    name: 'Veg Specials',
    icon: '🥦',
    subcategories: [
      { id: 'paneer-tikka-eb', name: 'Paneer Tikka', icon: '🧀' },
      { id: 'veg-manchurian-eb', name: 'Veg Manchurian', icon: '🧆' },
      { id: 'chilli-paneer-veg-eb', name: 'Chilli Paneer', icon: '🌶️' },
      { id: 'mushroom-pepper-fry-eb', name: 'Mushroom Pepper Fry', icon: '🍄' },
      { id: 'crispy-baby-corn-eb', name: 'Crispy Baby Corn', icon: '🌽' },
    ]
  },
  {
    id: 'bistro-coffee-eb',
    name: 'Bistro Coffee',
    icon: '☕',
    subcategories: [
      { id: 'espresso-eb', name: 'Espresso', icon: '☕' },
      { id: 'americano-eb', name: 'Americano', icon: '☕' },
      { id: 'cappuccino-eb', name: 'Cappuccino', icon: '☕' },
      { id: 'cafe-latte-eb', name: 'Cafe Latte', icon: '☕' },
      { id: 'cafe-mocha-eb', name: 'Cafe Mocha', icon: '☕' },
      { id: 'filter-coffee-eb', name: 'Filter Coffee', icon: '☕' },
    ]
  },
  {
    id: 'cold-beverages-eb',
    name: 'Cold Beverages',
    icon: '🧋',
    subcategories: [
      { id: 'cold-coffee-eb', name: 'Cold Coffee', icon: '🧋' },
      { id: 'iced-latte-eb', name: 'Iced Latte', icon: '🧊' },
      { id: 'iced-mocha-eb', name: 'Iced Mocha', icon: '🍫' },
      { id: 'iced-tea-eb', name: 'Iced Tea', icon: '🍹' },
      { id: 'chocolate-frappe-eb', name: 'Chocolate Frappe', icon: '🥤' },
    ]
  },
  {
    id: 'mocktails-coolers-eb',
    name: 'Mocktails & Coolers',
    icon: '🍹',
    subcategories: [
      { id: 'virgin-mojito-eb', name: 'Virgin Mojito', icon: '🍹' },
      { id: 'blue-lagoon-eb', name: 'Blue Lagoon', icon: '🌊' },
      { id: 'green-apple-cooler-eb', name: 'Green Apple Cooler', icon: '🍏' },
      { id: 'lemon-mint-cooler-eb', name: 'Lemon Mint Cooler', icon: '🍋' },
      { id: 'strawberry-cooler-eb', name: 'Strawberry Cooler', icon: '🍓' },
    ]
  },
  {
    id: 'fresh-juices-eb',
    name: 'Fresh Juices',
    icon: '🧃',
    subcategories: [
      { id: 'orange-juice-eb', name: 'Orange Juice', icon: '🍊' },
      { id: 'watermelon-juice-eb', name: 'Watermelon Juice', icon: '🍉' },
      { id: 'pineapple-juice-eb', name: 'Pineapple Juice', icon: '🍍' },
      { id: 'pomegranate-juice-eb', name: 'Pomegranate Juice', icon: '🍒' },
      { id: 'sweet-lime-eb', name: 'Sweet Lime', icon: '🍋' },
    ]
  },
  {
    id: 'milkshakes-eb',
    name: 'Milkshakes',
    icon: '🥤',
    subcategories: [
      { id: 'chocolate-shake-eb', name: 'Chocolate Shake', icon: '🍫' },
      { id: 'vanilla-shake-eb', name: 'Vanilla Shake', icon: '🍦' },
      { id: 'strawberry-shake-eb', name: 'Strawberry Shake', icon: '🍓' },
      { id: 'mango-shake-eb', name: 'Mango Shake', icon: '🥭' },
      { id: 'oreo-shake-eb', name: 'Oreo Shake', icon: '🍪' },
    ]
  },
  {
    id: 'desserts-eb',
    name: 'Desserts',
    icon: '🍰',
    subcategories: [
      { id: 'brownie-eb', name: 'Brownie', icon: '🍫' },
      { id: 'cheesecake-eb', name: 'Cheesecake', icon: '🍰' },
      { id: 'tiramisu-eb', name: 'Tiramisu', icon: '☕' },
      { id: 'chocolate-mousse-eb', name: 'Chocolate Mousse', icon: '🍫' },
      { id: 'gulab-jamun-eb', name: 'Gulab Jamun', icon: '🍩' },
    ]
  },
  {
    id: 'combos-eb',
    name: 'Combos',
    icon: '🍱',
    subcategories: [
      { id: 'burger-combo-eb', name: 'Burger Combo', icon: '🍔' },
      { id: 'biryani-combo-eb', name: 'Biryani Combo', icon: '🍲' },
      { id: 'wrap-combo-eb', name: 'Wrap Combo', icon: '🌯' },
      { id: 'sandwich-combo-eb', name: 'Sandwich Combo', icon: '🥪' },
      { id: 'pizza-combo-eb', name: 'Pizza Combo', icon: '🍕' },
      { id: 'family-combo-eb', name: 'Family Combo', icon: '👨‍👩‍👧‍👦' },
    ]
  }
];
