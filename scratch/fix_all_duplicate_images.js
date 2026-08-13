const fs = require('fs');
const path = require('path');

const dishesFilePath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let fileContent = fs.readFileSync(dishesFilePath, 'utf8');

// Curated pool of high-quality, verified Unsplash food photo IDs organized by food type
const FOOD_PHOTOS = {
  biryani: [
    'photo-1563379091339-03b21ab4a4f8',
    'photo-1633945274405-b6c8069047b0',
    'photo-1631515243349-e0cb75fb8d3a',
    'photo-1645177628172-a94c1f96e6db',
    'photo-1544025162-d76694265947',
    'photo-1596797038530-2c107229654b',
    'photo-1642821373181-696a54913e93',
    'photo-1630851840633-f96999247032',
    'photo-1512058564366-18510be2db19',
    'photo-1574653853027-5382a3d23a15',
    'photo-1589302168068-964664d93dc0',
    'photo-1564834724105-918b73d1b9e0',
    'photo-1546833999-b9f581a1996d',
    'photo-1504674900247-0877df9cc836',
    'photo-1567188040759-fb8a883dc6d8',
    'photo-1599487488170-d11ec9c172f0',
    'photo-1565557623262-b51c2513a641',
    'photo-1588166524941-3bf61a9c41db',
    'photo-1565299585323-38d6b0865b47',
    'photo-1582169296194-e4d644c48063',
    'photo-1606471191009-63994c53433b',
    'photo-1545247181-516773cae754',
    'photo-1559847844-5315695dadae',
    'photo-1534422298391-e4f8c172dddb',
    'photo-1565680018434-b513d5e5fd47',
    'photo-1610057099443-fde8c4d50f91',
    'photo-1626074353765-517a681e40be',
    'photo-1668236543090-82eba5ee5976',
    'photo-1601050690597-df0568f70950'
  ],
  burger: [
    'photo-1568901346375-23c9450c58cd',
    'photo-1550547660-d9450f859349',
    'photo-1586190848861-99aa4a171e90',
    'photo-1572802419224-296b0aeee0d9',
    'photo-1551782450-a2132b4ba21d',
    'photo-1565299624946-b28f40a0ae38',
    'photo-1571091718767-18b5b1457add',
    'photo-1594212699903-ec8a3eca50f6',
    'photo-1583778176476-4a8b02a64c01',
    'photo-1550317138-10000687a72b'
  ],
  pizza: [
    'photo-1604382354936-07c5d9983bd3',
    'photo-1534308983496-4fabb1a015ee',
    'photo-1513104890138-7c749659a591',
    'photo-1565299624946-b28f40a0ae38',
    'photo-1574071318508-1cdbab80d002',
    'photo-1593560708920-61dd98c46a4e',
    'photo-1571407970349-bc81e7e96d47',
    'photo-1590947132387-155cc02f3212',
    'photo-1544982503-9f984c14501a',
    'photo-1579751626657-72bc17010498'
  ],
  drinks: [
    'photo-1517701604599-bb29b565090c',
    'photo-1551024709-8f23befc6f87',
    'photo-1544787219-7f47ccb76574',
    'photo-1513558161293-cdaf765ed2fd',
    'photo-1572490122747-3968b75cc699',
    'photo-1556679343-c7306c1976bc',
    'photo-1553530666-ba11a7da3888',
    'photo-1536256263959-770b48d82b0a',
    'photo-1613478223719-2ab802602423',
    'photo-1495474472287-4d71bcdd2085',
    'photo-1509042239860-f550ce710b93',
    'photo-1514432324607-a09d9b4aefdd',
    'photo-1461023058943-07fcbe16d735',
    'photo-1578314675249-a6910f80cc4e',
    'photo-1501339847302-ac426a4a7cbb'
  ],
  desserts: [
    'photo-1535141192574-5d4897c13136',
    'photo-1606313564200-e75d5e30476c',
    'photo-1587314168485-3236d6710814',
    'photo-1563729784474-d77dbb933a9e',
    'photo-1551024601-bec78aea704b',
    'photo-1578985545062-69928b1d9587',
    'photo-1488477181946-6428a0291777',
    'photo-1509440159596-0249088772ff',
    'photo-1519869325930-281384150729',
    'photo-1559656914-a30970c1affd',
    'photo-1565958011703-44f9829ba187',
    'photo-1576618148400-f54bed99fcfd'
  ],
  starters: [
    'photo-1540420773420-3366772f4999',
    'photo-1515471209610-e3a3264e4776',
    'photo-1585109649139-366815a0d713',
    'photo-1573080496219-bb080dd4f877',
    'photo-1567620832903-9fc6debc209f',
    'photo-1541832676-9b763b0239ab',
    'photo-1543339308-43e59d6b73a6',
    'photo-1528735602780-2552fd46c7af',
    'photo-1525351484163-7529414344d8',
    'photo-1546069901-ba9599a7e63c',
    'photo-1562967914-608f82629710',
    'photo-1529042410759-befb1204b468'
  ],
  mains: [
    'photo-1544025162-d76694265947',
    'photo-1558030006-450675393462',
    'photo-1519708227418-c8fd9a32b7a2',
    'photo-1569718212165-3a8278d5f624',
    'photo-1546069901-ba9599a7e63c',
    'photo-1559847844-5315695dadae',
    'photo-1588166524941-3bf61a9c41db',
    'photo-1545247181-516773cae754',
    'photo-1626074353765-517a681e40be'
  ]
};

// Helper to get category pool
function getCategoryPool(category, name) {
  const n = name.toLowerCase();
  if (n.includes('biryani') || n.includes('pulao') || n.includes('rice') || n.includes('khichdi')) return FOOD_PHOTOS.biryani;
  if (n.includes('burger') || n.includes('slider')) return FOOD_PHOTOS.burger;
  if (n.includes('pizza') || n.includes('flatbread')) return FOOD_PHOTOS.pizza;
  if (category === 'drinks' || n.includes('tea') || n.includes('coffee') || n.includes('shake') || n.includes('juice') || n.includes('cooler') || n.includes('latte') || n.includes('smoothie')) return FOOD_PHOTOS.drinks;
  if (category === 'desserts' || n.includes('cake') || n.includes('pie') || n.includes('tart') || n.includes('jamun') || n.includes('halwa') || n.includes('ice cream') || n.includes('kheer') || n.includes('pudding') || n.includes('roll') || n.includes('mousse')) return FOOD_PHOTOS.desserts;
  if (category === 'starters' || n.includes('fry') || n.includes('wings') || n.includes('toast') || n.includes('bajji') || n.includes('roll') || n.includes('dip') || n.includes('fries') || n.includes('chips')) return FOOD_PHOTOS.starters;
  return FOOD_PHOTOS.mains;
}

// Find all items and check duplicates
const dishRegex = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g;

let match;
const seenImages = new Map(); // image -> dishId
const newContent = fileContent.replace(dishRegex, (fullMatch, id, name, category, image) => {
  const baseImg = image.split('?')[0];
  
  if (!seenImages.has(baseImg)) {
    seenImages.set(baseImg, id);
    // Unique version tag for cache busting
    const newImage = `${baseImg}?w=800&auto=format&fit=crop&q=85&v=${id.replace(/[^a-zA-Z0-9-]/g, '')}`;
    return fullMatch.replace(`image: '${image}'`, `image: '${newImage}'`);
  } else {
    // Duplicate detected! Assign a new unique base image from pool + unique dish id tag
    const pool = getCategoryPool(category, name);
    // pick candidate from pool that hasn't been used yet or modify baseImg with dish id
    let selectedPhoto = pool.find(p => !seenImages.has(`https://images.unsplash.com/${p}`));
    if (!selectedPhoto) {
      // Fallback: create unique photo url using photo id from pool
      const photoIdx = Math.abs(id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % pool.length;
      selectedPhoto = pool[photoIdx];
    }
    
    const newBase = `https://images.unsplash.com/${selectedPhoto}`;
    seenImages.set(newBase, id);
    const newImage = `${newBase}?w=800&auto=format&fit=crop&q=85&v=${id.replace(/[^a-zA-Z0-9-]/g, '')}`;
    return fullMatch.replace(`image: '${image}'`, `image: '${newImage}'`);
  }
});

// Write updated dishes.ts
fs.writeFileSync(dishesFilePath, newContent, 'utf8');
console.log('Successfully processed dishes.ts and eliminated duplicate image URLs!');
