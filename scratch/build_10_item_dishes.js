const fs = require('fs');
const path = require('path');

const shops = [
  { slug: 'giri-grill', name: 'Giri Grill' },
  { slug: 'giri-kitchen', name: 'Giri Kitchen' },
  { slug: 'giri-fine-dining', name: 'Giri Fine Dining' }
];

const tandooriFullImages = [
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85'
];

const dosaImages = [
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=85'
];

const paneerImages = [
  'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=85'
];

const biryaniImages = [
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=85'
];

const templates = [
  // Full Tandoori Chicken (10 items)
  {
    prefix: 'full-tan',
    subcat: 'full-tandoori-chicken',
    names: [
      'Signature Royal Full Tandoori Chicken',
      'Peshawari Bhatti Full Tandoori Chicken',
      'Spicy Afghani Charcoal Full Tandoori Chicken',
      'Classic Dum Full Tandoori Chicken',
      'Zafrani Shahi Full Tandoori Chicken',
      'Tangra Spicy Full Tandoori Chicken',
      'Butter Garlic Full Tandoori Chicken',
      'Peri Peri Roast Full Tandoori Chicken',
      'Claypot Roasted Full Tandoori Chicken',
      'Kashmiri Red Roast Full Tandoori Chicken'
    ],
    basePrice: 580,
    dietary: ['non-veg', 'chef-special'],
    imgs: tandooriFullImages
  },
  // Half Tandoori Chicken (10 items)
  {
    prefix: 'half-tan',
    subcat: 'half-tandoori-chicken',
    names: [
      'Classic Half Tandoori Chicken',
      'Peshawari Malai Half Tandoori Chicken',
      'Smoky Charcoal Half Tandoori Chicken',
      'Guntur Spicy Half Tandoori Chicken',
      'Bhatti Tikka Half Tandoori Chicken',
      'Lemon Garlic Half Tandoori Chicken',
      'Zafrani Dum Half Tandoori Chicken',
      'Kashmiri Red Half Tandoori Chicken',
      'Chettinad Roast Half Tandoori Chicken',
      'Green Hariyali Half Tandoori Chicken'
    ],
    basePrice: 340,
    dietary: ['non-veg'],
    imgs: tandooriFullImages
  },
  // Tandoori Chicken Legs (10 items)
  {
    prefix: 'tan-leg',
    subcat: 'tandoori-chicken-legs',
    names: [
      'Royal Tangdi Tandoori Chicken Legs (4 Pcs)',
      'Bhatti Spice Tandoori Chicken Legs',
      'Afghani Creamy Tandoori Chicken Legs',
      'Spicy Guntur Tandoori Chicken Legs',
      'Zafrani Malai Tandoori Chicken Legs',
      'Chettinad Roasted Tandoori Chicken Legs',
      'Peri Peri Glazed Tandoori Chicken Legs',
      'Kebab Special Tandoori Chicken Legs',
      'Reshmi Cream Tandoori Chicken Legs',
      'Hariyali Herbs Tandoori Chicken Legs'
    ],
    basePrice: 380,
    dietary: ['non-veg'],
    imgs: tandooriFullImages
  },
  // Tandoori Chicken Wings (10 items)
  {
    prefix: 'tan-wing',
    subcat: 'tandoori-chicken-wings',
    names: [
      'Crispy Tandoori Chicken Wings (8 Pcs)',
      'Smoky Bhatti Tandoori Chicken Wings',
      'Hot Habanero Tandoori Chicken Wings',
      'Honey Glazed Tandoori Chicken Wings',
      'Guntur Mirchi Tandoori Chicken Wings',
      'Butter Garlic Tandoori Chicken Wings',
      'Peri Peri Fiery Tandoori Chicken Wings',
      'Tangra Schezwan Tandoori Chicken Wings',
      'Lemon Pepper Tandoori Chicken Wings',
      'Malai Cheese Tandoori Chicken Wings'
    ],
    basePrice: 320,
    dietary: ['non-veg', 'spicy'],
    imgs: tandooriFullImages
  },
  // Breakfast - Dosa (10 items)
  {
    prefix: 'dosa-sub',
    subcat: 'dosa',
    names: [
      'Classic Ghee Roast Masala Dosa',
      'Butter Cheese Garlic Dosa',
      'Andhra Spicy Karam Dosa',
      'Mysore Special Paneer Masala Dosa',
      'Paper Thin Crispy Plain Dosa',
      'Rava Onion Cashew Dosa',
      'Gunpowder Podi Ghee Dosa',
      'Cheese Chilli Sweet Corn Dosa',
      'Chef Special Family Paper Dosa',
      'Spinach & Mushroom Gourmet Dosa'
    ],
    basePrice: 140,
    dietary: ['veg'],
    imgs: dosaImages
  },
  // Breakfast - Idli (10 items)
  {
    prefix: 'idli-sub',
    subcat: 'idli',
    names: [
      'Steamed Button Idli with Sambar & 3 Chutneys',
      'Ghee Podi Button Idli Tossed',
      'Kanchipuram Spiced Heritage Idli',
      'Fried Chilli Garlic Crispy Idli',
      'Rava Cashew Steamed Idli',
      'Tandoori Malai Stuffed Idli',
      'Schezwan Tossed Cocktail Idli',
      'Sambar Vada Idli Combo Platter',
      'Butter Garlic Herb Idli',
      'Podi Ghee Roasted Minis'
    ],
    basePrice: 110,
    dietary: ['veg'],
    imgs: dosaImages
  },
  // Veg Starters - Paneer Tikka (10 items)
  {
    prefix: 'pan-tik',
    subcat: 'paneer-tikka',
    names: [
      'Classic Claypot Paneer Tikka',
      'Malai Cardamom Cream Paneer Tikka',
      'Achari Pickle Spiced Paneer Tikka',
      'Hariyali Mint Coriander Paneer Tikka',
      'Truffle Infused Gourmet Paneer Tikka',
      'Spicy Schezwan Garlic Paneer Tikka',
      'Kashmiri Zafrani Paneer Tikka',
      'Pahadi Green Herb Paneer Tikka',
      'Bhatti Charcoal Paneer Tikka',
      'Stuffed Cheese & Nut Paneer Tikka'
    ],
    basePrice: 280,
    dietary: ['veg'],
    imgs: paneerImages
  },
  // Veg Starters - Gobi 65 (10 items)
  {
    prefix: 'gobi-65',
    subcat: 'gobi-65',
    names: [
      'Classic Crispy Gobi 65',
      'Andhra Curry Leaf Gobi 65',
      'Schezwan Garlic Crunchy Gobi 65',
      'Tandoori Spiced Roasted Gobi 65',
      'Honey Chilli Sesame Gobi 65',
      'Butter Pepper Garlic Gobi 65',
      'Guntur Red Hot Gobi 65',
      'Tangra Style Manchurian Gobi 65',
      'Chettinad Spiced Gobi 65',
      'Chef Signature Gold Gobi 65'
    ],
    basePrice: 220,
    dietary: ['veg', 'spicy'],
    imgs: paneerImages
  },
  // Biryani - Chicken Biryani (10 items)
  {
    prefix: 'chk-bir',
    subcat: 'chicken-biryani',
    names: [
      'Hyderabadi Dum Chicken Biryani',
      'Royal Zafrani Special Chicken Biryani',
      'Andhra Spicy Natu Kodi Biryani',
      'Claypot Matka Dum Chicken Biryani',
      'Boneless Chicken 65 Biryani',
      'Guntur Mirchi Special Chicken Biryani',
      'Chettinad Dum Chicken Biryani',
      'Bhatti Roasted Tandoori Chicken Biryani',
      'Peshawari Shahi Chicken Biryani',
      'Mughlai Malai Chicken Biryani'
    ],
    basePrice: 360,
    dietary: ['non-veg', 'chef-special'],
    imgs: biryaniImages
  },
  // Biryani - Mutton Biryani (10 items)
  {
    prefix: 'mut-bir',
    subcat: 'mutton-biryani',
    names: [
      'Hyderabadi Mutton Dum Biryani',
      'Royal 24K Gold Nalli Mutton Biryani',
      'Seemandhra Mamsam Dum Biryani',
      'Claypot Shahi Mutton Dum Biryani',
      'Boti Kebab Special Mutton Biryani',
      'Kashmiri Rogan Josh Mutton Biryani',
      'Chettinad Spicy Mutton Biryani',
      'Peshawari Dumpukht Mutton Biryani',
      'Zafrani Shahi Mutton Biryani',
      'Guntur Mirchi Mutton Biryani'
    ],
    basePrice: 480,
    dietary: ['non-veg', 'chef-special'],
    imgs: biryaniImages
  }
];

let generatedDishes = [];
let counter = 1000;

shops.forEach(shop => {
  templates.forEach(tpl => {
    tpl.names.forEach((dishName, idx) => {
      counter++;
      const img = tpl.imgs[idx % tpl.imgs.length];
      const dishObj = {
        id: `dish-gen-${shop.slug}-${tpl.prefix}-${counter}`,
        name: dishName,
        category: 'starters',
        shopSlug: shop.slug,
        shopName: shop.name,
        price: tpl.basePrice + (idx * 20),
        prepTime: 15 + (idx % 5),
        description: `Authentic gourmet ${dishName} crafted by master chefs using premium fresh ingredients, aromatic spices, and traditional techniques at ${shop.name}.`,
        dietary: tpl.dietary,
        available: true,
        image: `${img}&v=${counter}`
      };
      generatedDishes.push(dishObj);
    });
  });
});

console.log(`Generated ${generatedDishes.length} rich dish items across shops.`);

const dishesFilePath = path.join(__dirname, '../frontend/data/dishes.ts');
let dishesContent = fs.readFileSync(dishesFilePath, 'utf-8');

// Insert ENRICHED_10_ITEM_DISHES before export const INITIAL_DISHES
const exportCode = `\nexport const ENRICHED_10_ITEM_DISHES: MenuItem[] = ${JSON.stringify(generatedDishes, null, 2)};\n`;

if (!dishesContent.includes('ENRICHED_10_ITEM_DISHES')) {
  dishesContent = dishesContent.replace('const RAW_INITIAL_DISHES: MenuItem[] = [', `${exportCode}\nconst RAW_INITIAL_DISHES: MenuItem[] = [\n  ...ENRICHED_10_ITEM_DISHES,`);
  // Update version key in getStoredDishes
  dishesContent = dishesContent.replace(/giri_dishes_v\d+[^']*/g, 'giri_dishes_v50_10_items_per_subcategory_enrich');
  fs.writeFileSync(dishesFilePath, dishesContent, 'utf-8');
  console.log('Successfully updated dishes.ts with ENRICHED_10_ITEM_DISHES and bumped version key!');
} else {
  console.log('ENRICHED_10_ITEM_DISHES already present in dishes.ts');
}
