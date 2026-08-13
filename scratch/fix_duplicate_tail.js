const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// Find the end of GIRI_SEAFOOD_DISHES
const targetMarker = "id: 'dish-sf-ic6'";
const markerIndex = content.indexOf(targetMarker);

if (markerIndex === -1) {
  console.error('Could not find dish-sf-ic6');
  process.exit(1);
}

// Find the closing ]; after dish-sf-ic6
const arrayEndIndex = content.indexOf('];', markerIndex);

if (arrayEndIndex === -1) {
  console.error('Could not find ]; after dish-sf-ic6');
  process.exit(1);
}

const cleanContentBeforeTail = content.slice(0, arrayEndIndex + 2);

const cleanTail = `

const REMOVED_ITEM_KEYWORDS = [
  'wagyu ribeye',
  '24k gold wild forest mushroom risotto',
  'grand artisanal smoked salmon',
  "private chef's reserve",
  'four-cheese spinach ravioli',
  'heirloom tomato & buffalo mozzarella',
  'lobster thermidor',
  'prawn pepper fry',
  'octopus leg',
  'venison tenderloin',
  'tiger prawn skewers',
  'prawn',
  'truffle whipped potato puree',
  'almond cinnamon danish',
  'smokey lamb chops',
  'grilled pineapple slices',
  'masala kulhad masala chai',
  'prawns'
];

const RAW_INITIAL_DISHES: MenuItem[] = [
  ...GIRI_SEAFOOD_DISHES,
  ...GIRI_CAFE_DISHES,
  ...GIRI_SPICE_GARDEN_DISHES,
  ...GIRI_GRILL_DISHES,
  ...GIRI_BAKERY_DISHES,
  ...REGIONAL_INDIAN_DISHES,
  ...ANDHRA_SPECIAL_DISHES,
  ...BIRYANI_SPECIAL_DISHES,
  ...GIRI_EXPRESS_BISTRO_DISHES,
  ...OTHER_DISHES
];

export const INITIAL_DISHES: MenuItem[] = RAW_INITIAL_DISHES;

// Helper to deduplicate array of dishes by unique ID and dish name
const deduplicateDishes = (list: MenuItem[]): MenuItem[] => {
  const seenName = new Set<string>();
  const seenId = new Set<string>();
  return list.filter((item) => {
    const idKey = (item.id || (item as any)._id || '').trim().toLowerCase();
    const nameKey = (item.name || '').trim().toLowerCase();
    if (!nameKey || seenName.has(nameKey)) return false;
    if (idKey && seenId.has(idKey)) return false;
    seenName.add(nameKey);
    if (idKey) seenId.add(idKey);
    return true;
  });
};

export const getStoredDishes = (): MenuItem[] => {
  if (typeof window === 'undefined') return INITIAL_DISHES;
  try {
    const versionKey = 'giri_dishes_v42_clean_express_bistro';
    if (localStorage.getItem('giri_dishes_version') !== versionKey) {
      localStorage.removeItem('giri_dishes');
      localStorage.setItem('giri_dishes_version', versionKey);
      saveStoredDishes(INITIAL_DISHES);
      return INITIAL_DISHES;
    }
    const saved = localStorage.getItem('giri_dishes');
    if (saved) {
      const parsed: MenuItem[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length >= 10) {
        return parsed;
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
`;

fs.writeFileSync(dishesPath, cleanContentBeforeTail + cleanTail, 'utf8');
console.log('✅ Successfully removed duplicate tail declarations from dishes.ts!');
