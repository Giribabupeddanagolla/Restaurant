const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// 1. Locate GIRI_EXPRESS_BISTRO_DISHES start and ANDHRA_SPECIAL_DISHES start
const startExpress = content.indexOf('export const GIRI_EXPRESS_BISTRO_DISHES: MenuItem[] = [');
const startAndhra = content.indexOf('export const ANDHRA_SPECIAL_DISHES: MenuItem[] = [');

if (startExpress === -1 || startAndhra === -1) {
  console.error('Could not locate GIRI_EXPRESS_BISTRO_DISHES or ANDHRA_SPECIAL_DISHES boundary');
  process.exit(1);
}

// 2. Extract the 115 dishes string
const populateScriptPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/scratch/populate_express_bistro_dishes.js';
const populateContent = fs.readFileSync(populateScriptPath, 'utf8');

const catalogStart = populateContent.indexOf('// ==========================================');
const catalogEnd = populateContent.indexOf('const insertIndex =');

if (catalogStart === -1 || catalogEnd === -1) {
  console.error('Could not extract catalog from populate script');
  process.exit(1);
}

const express115Catalog = populateContent.slice(catalogStart, catalogEnd).trim();

// 3. Locate where RAW_INITIAL_DISHES starts near the bottom
const rawInitialIndex = content.lastIndexOf('const RAW_INITIAL_DISHES: MenuItem[] = [');

if (rawInitialIndex === -1) {
  console.error('Could not find RAW_INITIAL_DISHES near bottom');
  process.exit(1);
}

// Top part: everything up to export const GIRI_EXPRESS_BISTRO_DISHES: MenuItem[] = [
const topPart = content.slice(0, startExpress);

// Middle part: ANDHRA_SPECIAL_DISHES up to RAW_INITIAL_DISHES
const middlePart = content.slice(startAndhra, rawInitialIndex);

// New clean bottom section
const newBottomSection = `const RAW_INITIAL_DISHES: MenuItem[] = [
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
    const versionKey = 'giri_dishes_v41_clean_express_bistro';
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

const finalFileContent = topPart +
  'export const GIRI_EXPRESS_BISTRO_DISHES: MenuItem[] = [\n' +
  express115Catalog +
  '\n];\n\n' +
  middlePart +
  newBottomSection;

fs.writeFileSync(dishesPath, finalFileContent, 'utf8');
console.log('✅ Successfully cleaned dishes.ts with exact 115 Giri Express & Bistro items!');
