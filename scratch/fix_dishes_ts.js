const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// Find where REMOVED_ITEM_KEYWORDS starts
const idxKeywords = content.indexOf('const REMOVED_ITEM_KEYWORDS = [');
if (idxKeywords === -1) {
  console.error('Could not find REMOVED_ITEM_KEYWORDS');
  process.exit(1);
}

// Slice content up to const REMOVED_ITEM_KEYWORDS = [
const cleanTop = content.slice(0, idxKeywords);

// Extract the 115 dishes array content (starts after line "// ==========================================" and ends before "export const getStoredDishes")
const expressSectionStart = content.indexOf('// ==========================================\n  // GIRI EXPRESS & BISTRO COMPLETE 115 DISHES');
const expressSectionEnd = content.indexOf('export const getStoredDishes =');

if (expressSectionStart === -1 || expressSectionEnd === -1) {
  console.error('Could not find express section boundaries');
  process.exit(1);
}

let expressCatalogCode = content.slice(expressSectionStart, expressSectionEnd).trim();
if (expressCatalogCode.endsWith('];')) {
  expressCatalogCode = expressCatalogCode.slice(0, -2).trim();
}

const fixedEndSection = `const REMOVED_ITEM_KEYWORDS = [
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

export const GIRI_EXPRESS_BISTRO_DISHES: MenuItem[] = [
${expressCatalogCode}
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
    const versionKey = 'giri_dishes_v40_express_bistro_syntax_fixed';
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

fs.writeFileSync(dishesPath, cleanTop + fixedEndSection, 'utf8');
console.log('✅ Successfully fixed syntax error in dishes.ts and exported GIRI_EXPRESS_BISTRO_DISHES!');
