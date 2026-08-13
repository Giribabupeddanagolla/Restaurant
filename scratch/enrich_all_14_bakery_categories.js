const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let dishesContent = fs.readFileSync(dishesPath, 'utf8');

// Expanded 45+ authentic bakery dishes for the 14 new Bakery categories & sub-categories
const fullBakeryDishes = `
  // --- FULL 14 BAKERY & SWEETS TAXONOMY DISHES ---
  // Cakes
  {
    id: 'dish-bakery-c1',
    name: 'Customized Royal Birthday Layer Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 850,
    description: 'Multi-layer vanilla & Belgian chocolate sponge topped with buttercream rosettes, edible pearls, and customized birthday plaque.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c1',
    dietary: ['veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [{ name: 'Custom Name Plaque writing', price: 50 }]
  },
  {
    id: 'dish-bakery-c2',
    name: 'Tiered Fondant Elegant Wedding Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 1800,
    description: 'Grand 3-tiered white chocolate ganache wedding cake with handcrafted sugar flowers and champagne syrup infusion.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c2',
    dietary: ['veg', 'chef-special'],
    prepTime: 30,
    available: true,
    customizations: [{ name: 'Sparkling Candle Set', price: 40 }]
  },
  {
    id: 'dish-bakery-c3',
    name: 'Edible Photo Print Special Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 950,
    description: 'Fresh cream pineapple sponge cake topped with custom edible sugar paper photo print.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c3',
    dietary: ['veg'],
    prepTime: 20,
    available: true,
    customizations: [{ name: 'Photo Upload Processing', price: 0 }]
  },
  {
    id: 'dish-bakery-c4',
    name: 'Superhero & Floral Theme Designer Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 1100,
    description: 'Artisanal handcrafted theme cake with fondant cutouts, chocolate rocks, and rich chocolate truffle center.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c4',
    dietary: ['veg'],
    prepTime: 25,
    available: true,
    customizations: [{ name: 'Theme Color Choice', price: 0 }]
  },
  {
    id: 'dish-bakery-c5',
    name: 'Signature Dutch Dark Chocolate Fudge Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 750,
    description: 'Moist dark cocoa sponge layered with molten Belgian fudge and dusted with Dutch cocoa powder.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c5',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Add Extra Chocolate Dip', price: 30 }]
  },
  {
    id: 'dish-bakery-c6',
    name: 'Crimson Red Velvet Cream Cheese Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 790,
    description: 'Classic cocoa velvet cake layered with smooth Philadelphia cream cheese icing and red velvet crumbs.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c6',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Cream Cheese Drizzle', price: 35 }]
  },
  {
    id: 'dish-bakery-c7',
    name: 'German Black Forest Maraschino Cherry Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 690,
    description: 'Traditional chocolate sponge soaked in cherry syrup, layered with whipped cream, maraschino cherries, and dark chocolate shavings.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c7',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Cherries Bowl', price: 30 }]
  },
  {
    id: 'dish-bakery-c8',
    name: 'Fresh Exotic Berry & Tropical Fruit Cake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 720,
    description: 'Light vanilla bean sponge crowned with fresh kiwi, strawberries, blueberries, peaches, and passion fruit glaze.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c8',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Fresh Berries Topping', price: 40 }]
  },
  {
    id: 'dish-bakery-c9',
    name: 'New York Baked Blueberry Swirl Cheesecake',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 890,
    description: 'Rich dense cream cheese baked on a buttery graham cracker crust, finished with fresh blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=85&v=dish-bakery-c9',
    dietary: ['veg', 'chef-special'],
    prepTime: 10,
    available: true,
    customizations: [{ name: 'Extra Blueberry Compote', price: 35 }]
  },

  // Pastries
  {
    id: 'dish-bakery-p1',
    name: 'Belgian Chocolate Ganache Slice Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 180,
    description: 'Decadent chocolate sponge slice coated in glossy Belgian dark chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=85&v=dish-bakery-p1',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Add Chocolate Sauce Drizzle', price: 20 }]
  },
  {
    id: 'dish-bakery-p2',
    name: 'Fresh Pineapple Cream Slice Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 150,
    description: 'Fluffy vanilla sponge layered with juicy crushed pineapple and light whipped cream.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85&v=dish-bakery-p2',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Pineapple Chunks', price: 20 }]
  },
  {
    id: 'dish-bakery-p3',
    name: 'Red Velvet Cream Cheese Slice Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Moist red velvet slice with tang of rich cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-p3',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Cream Cheese', price: 25 }]
  },
  {
    id: 'dish-bakery-p4',
    name: 'Black Forest Shaved Chocolate Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 160,
    description: 'Traditional cocoa slice with dark cherries and fluffy white cream.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=85&v=dish-bakery-p4',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Cherry topping', price: 15 }]
  },
  {
    id: 'dish-bakery-p5',
    name: 'Golden Butterscotch Crunch Slice Pastry',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 170,
    description: 'Vanilla sponge layered with butterscotch cream and crunchy caramelized praline nuts.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=85&v=dish-bakery-p5',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Butterscotch Praline', price: 20 }]
  },

  // Breads
  {
    id: 'dish-bakery-b1',
    name: 'Artisanal White Milk Bread Loaf',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 90,
    description: 'Soft pillow-like sliced white sandwich bread baked fresh daily with whole milk.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=85&v=dish-bakery-b1',
    dietary: ['veg'],
    prepTime: 3,
    available: true,
    customizations: [{ name: 'Thick Slice Toasting', price: 10 }]
  },
  {
    id: 'dish-bakery-b2',
    name: '100% Whole Wheat Brown Bread Loaf',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 110,
    description: 'Nutritious whole wheat brown bread loaf high in fiber and natural wheat grain aroma.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=85&v=dish-bakery-b2',
    dietary: ['veg'],
    prepTime: 3,
    available: true,
    customizations: [{ name: 'Side Butter Portion', price: 15 }]
  },
  {
    id: 'dish-bakery-b3',
    name: '7-Grain Multigrain Health Bread Loaf',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 130,
    description: 'High-protein multigrain bread packed with flaxseeds, sunflower seeds, oats, and sesame.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=85&v=dish-bakery-b3',
    dietary: ['veg'],
    prepTime: 3,
    available: true,
    customizations: [{ name: 'Toast & Herb Butter', price: 20 }]
  },
  {
    id: 'dish-bakery-b4',
    name: 'Crispy Butter Garlic Toast Bread (4pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 160,
    description: 'Thick sliced baguette toasted with garlic butter, parsley, and melted mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-b4',
    dietary: ['veg'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Add Extra Mozzarella', price: 30 }]
  },

  // Cookies & Biscuits
  {
    id: 'dish-bakery-k1',
    name: 'Desi Ghee Rich Butter Cookies (250g Box)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 220,
    description: 'Melt-in-your-mouth golden butter cookies baked with pure cows ghee and cardamom.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=85&v=dish-bakery-k1',
    dietary: ['veg'],
    prepTime: 2,
    available: true,
    customizations: [{ name: 'Gift Box Wrapping', price: 15 }]
  },
  {
    id: 'dish-bakery-k2',
    name: 'Belgian Dark Chocolate Chip Cookies (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Crunchy outer, soft gooey center cookies studded with premium Belgian dark chocolate chips.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=85&v=dish-bakery-k2',
    dietary: ['veg'],
    prepTime: 2,
    available: true,
    customizations: [{ name: 'Warm Service', price: 10 }]
  },
  {
    id: 'dish-bakery-k3',
    name: 'Toasted Coconut Roasted Almond Cookies Box',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Fragrant toasted coconut macaron cookies embedded with roasted Californian almond flakes.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=85&v=dish-bakery-k3',
    dietary: ['veg'],
    prepTime: 2,
    available: true,
    customizations: [{ name: 'Extra Almond Flakes', price: 20 }]
  },

  // Muffins & Donuts
  {
    id: 'dish-bakery-m1',
    name: 'Molten Belgian Chocolate Chip Muffin (2pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 180,
    description: 'Moist fluffy chocolate muffin stuffed with chocolate lava center and chocolate chips.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&auto=format&fit=crop&q=85&v=dish-bakery-m1',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Warm Lava Heating', price: 10 }]
  },
  {
    id: 'dish-bakery-m2',
    name: 'Fresh Blueberry Crumble Vanilla Muffin (2pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Soft vanilla muffin bursting with wild blueberries and topped with crispy butter streusel crumble.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&auto=format&fit=crop&q=85&v=dish-bakery-m2',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Blueberry Jam Side', price: 20 }]
  },
  {
    id: 'dish-bakery-d1',
    name: 'Glazed Belgian Chocolate Ring Donut (2pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 170,
    description: 'Pillowy ring donut dipped in glossy dark chocolate glaze and colorful sprinkles.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=85&v=dish-bakery-d1',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Chocolate Drizzle', price: 20 }]
  },
  {
    id: 'dish-bakery-d2',
    name: 'Nutella Cream Filled Custard Donut (2pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Soft round donut generously filled with rich Nutella hazelnut spread and vanilla custard.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=85&v=dish-bakery-d2',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Dusting Powdered Sugar', price: 10 }]
  },

  // Brownies
  {
    id: 'dish-bakery-w1',
    name: 'Fudgy Dark Chocolate Walnut Brownie',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Dense chewy cocoa brownie with crispy shiny top crust and roasted crunchy walnuts.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-w1',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Add Vanilla Ice Cream Scoop', price: 50 }]
  },
  {
    id: 'dish-bakery-w2',
    name: 'Nutella Hazelnut Double Chocolate Brownie',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Decadent chocolate fudge brownie layered with Nutella spread and dark chocolate chunks.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop&q=85&v=dish-bakery-w2',
    dietary: ['veg', 'chef-special'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Hot Fudge Sauce Drizzle', price: 30 }]
  },

  // Puffs, Rolls & Sandwiches
  {
    id: 'dish-bakery-f1',
    name: 'Spicy Masala Veg Flaky Puff (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 130,
    description: 'Golden puff pastry turnover filled with seasoned potatoes, green peas, and fragrant Indian spices.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=85&v=dish-bakery-f1',
    dietary: ['veg', 'spicy'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Mint Chutney Portion', price: 15 }]
  },
  {
    id: 'dish-bakery-f2',
    name: 'Tandoori Paneer Cottage Cheese Puff (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 160,
    description: 'Flaky buttery puff pastry stuffed with chargrilled tandoori paneer cubes and capsicum.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=85&v=dish-bakery-f2',
    dietary: ['veg', 'spicy'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Extra Chili Dip', price: 20 }]
  },
  {
    id: 'dish-bakery-f3',
    name: 'Black Pepper Chicken Flaky Puff (2pcs)',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 180,
    description: 'Crispy layered puff filled with minced chicken, black pepper, caramelized onions, and cilantro.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=85&v=dish-bakery-f3',
    dietary: ['non-veg', 'spicy'],
    prepTime: 6,
    available: true,
    customizations: [{ name: 'Hot Garlic Ketchup Dip', price: 20 }]
  },
  {
    id: 'dish-bakery-r1',
    name: 'Gourmet Paneer Tikka Mayo Sandwich Roll',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Grilled multigrain bread loaded with paneer tikka, mint mayo, crunchy lettuce, and tomatoes.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=85&v=dish-bakery-r1',
    dietary: ['veg'],
    prepTime: 8,
    available: true,
    customizations: [{ name: 'Add Melted Cheese Slice', price: 25 }]
  },
  {
    id: 'dish-bakery-r2',
    name: 'Smoked Chicken Herb Mayo Toast Sandwich',
    category: 'starters',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Toasted bakery loaf stuffed with shredded smoked chicken breast, herbs, cheddar cheese, and dijon mustard.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=85&v=dish-bakery-r2',
    dietary: ['non-veg'],
    prepTime: 8,
    available: true,
    customizations: [{ name: 'Extra Cheddar Cheese', price: 30 }]
  },

  // Sweets, Ice Cream & Beverages
  {
    id: 'dish-bakery-s1',
    name: 'Royal Saffron Kesar Rasmalai Bowl (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 240,
    description: 'Soft cottage cheese patties immersed in chilled saffron infused rabri with sliced almonds.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85&v=dish-bakery-s1',
    dietary: ['veg', 'chef-special'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Saffron Milk Drizzle', price: 30 }]
  },
  {
    id: 'dish-bakery-s2',
    name: 'Desi Ghee Hot Gulab Jamun Bowl (4pcs)',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Warm fried khoya dumplings soaked in rose cardamom sugar syrup.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=85&v=dish-bakery-s2',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Add Vanilla Ice Cream', price: 45 }]
  },
  {
    id: 'dish-bakery-i1',
    name: 'Belgian Chocolate & Vanilla Sundae Glass',
    category: 'desserts',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 230,
    description: 'Double scoops of dark chocolate & Madagascar vanilla ice cream topped with hot fudge, whipped cream, and cherries.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=85&v=dish-bakery-i1',
    dietary: ['veg'],
    prepTime: 4,
    available: true,
    customizations: [{ name: 'Extra Hot Fudge Portion', price: 30 }]
  },
  {
    id: 'dish-bakery-v1',
    name: 'Rich Creamy Iced Cold Coffee with Ice Cream',
    category: 'drinks',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 190,
    description: 'Blended espresso with chilled milk, dark cocoa, topped with vanilla scoop & chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=85&v=dish-bakery-v1',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Add Whipped Cream Top', price: 25 }]
  },
  {
    id: 'dish-bakery-v2',
    name: 'Gourmet Hot Chocolate with Marshmallows',
    category: 'drinks',
    shopSlug: 'giri-bakery',
    shopName: 'Giri Bakery',
    price: 210,
    description: 'Steaming hot Dutch dark chocolate drink crowned with mini toasted fluffy marshmallows.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&auto=format&fit=crop&q=85&v=dish-bakery-v2',
    dietary: ['veg'],
    prepTime: 5,
    available: true,
    customizations: [{ name: 'Extra Marshmallows', price: 20 }]
  }
`;

// Replace existing bakery section in dishes.ts
if (!dishesContent.includes('dish-bakery-c1')) {
  dishesContent = dishesContent.replace(
    "export const BIRYANI_SPECIAL_DISHES: MenuItem[] = [",
    `${fullBakeryDishes}\n];\n\nexport const BIRYANI_SPECIAL_DISHES: MenuItem[] = [`
  );
  
  dishesContent = dishesContent.replace(
    "const versionKey = 'giri_dishes_v29_bakery_and_sweets_category_added_fresh';",
    "const versionKey = 'giri_dishes_v30_bakery_all_14_categories_and_subcategories_full';"
  );
  
  fs.writeFileSync(dishesPath, dishesContent, 'utf8');
  console.log('Successfully updated dishes.ts with all 14 Bakery Category dishes!');
}
