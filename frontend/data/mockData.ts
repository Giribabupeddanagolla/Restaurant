import { Category, MenuItem, Offer, Review, BlogPost } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'specials', name: 'Chef Specials', icon: '⭐' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Main Course', icon: '🍲' },
  { id: 'pizzas', name: 'Pizzas & Burgers', icon: '🍕' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Beverages & Bar', icon: '🍹' }
];

export const INITIAL_DISHES: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Risotto',
    category: 'specials',
    price: 18.50,
    description: 'Arborio rice cooked with wild forest mushrooms, black truffle oil, and aged parmesan crisp.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop',
    dietary: ['veg', 'chef-special'],
    prepTime: 20,
    available: true,
    customizations: [
      { name: 'Add Extra Truffle Oil', price: 2.50 },
      { name: 'Extra Parmesan Cheese', price: 1.50 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Smoked Wagyu Beef Burger',
    category: 'pizzas',
    price: 21.00,
    description: 'Double Wagyu patty, smoked cheddar, caramelized onions, brioche bun, served with truffle fries.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    dietary: ['non-veg', 'chef-special'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Double Bacon Slice', price: 3.00 },
      { name: 'Gluten-Free Bun', price: 1.50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Artisanal Margherita Pizza',
    category: 'pizzas',
    price: 15.00,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, organic basil, extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 12,
    available: true,
    customizations: [
      { name: 'Burrata Cheese Topping', price: 4.00 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Crispy Pan-Seared Salmon',
    category: 'mains',
    price: 24.50,
    description: 'Atlantic salmon fillet, asparagus spears, saffron lemon butter sauce, baby potatoes.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop',
    dietary: ['non-veg'],
    prepTime: 18,
    available: true,
    customizations: [
      { name: 'Side Garlic Herb Butter', price: 1.00 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Spicy Thai Green Curry',
    category: 'mains',
    price: 16.50,
    description: 'Authentic coconut curry with bamboo shoots, Thai basil, and fragrant jasmine rice.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop',
    dietary: ['veg', 'spicy'],
    prepTime: 15,
    available: true,
    customizations: [
      { name: 'Extra Spicy Level 🔥', price: 0.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 9.50,
    description: 'Warm Belgian dark chocolate cake with melting chocolate center & vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    dietary: ['veg'],
    prepTime: 10,
    available: true,
    customizations: [
      { name: 'Extra Scoop Ice Cream', price: 2.00 }
    ]
  }
];

export const PUBLIC_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: '🎉 Welcome 20% Discount',
    code: 'GIRI20',
    description: 'Get 20% off on your first dine-in or takeaway mobile order above $30.',
    expiry: 'Valid till Sunday',
    badge: 'NEW CUSTOMER'
  },
  {
    id: 'off-2',
    title: '🍔 Buy 1 Get 1 Wagyu Burger',
    code: 'WAGYU2FOR1',
    description: 'Order any Wagyu Burger on Tuesday evenings and get the second burger 50% off.',
    expiry: 'Tuesdays Only',
    badge: 'POPULAR'
  }
];

export const PUBLIC_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sophia Williams',
    role: 'Food Critic & Local Guide',
    rating: 5,
    date: '2 days ago',
    comment: 'The Truffle Mushroom Risotto was absolute perfection! Instant mobile table ordering made our anniversary dinner completely seamless and relaxing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'art-of-truffle-cuisine',
    title: 'The Art of Truffle Cuisine: A Chef\'s Journey',
    excerpt: 'Discover how our executive chef sources and prepares the finest black truffles to craft dishes that awaken the senses.',
    content: `Truffles are among the most prized ingredients in fine dining — earthy, aromatic, and intensely flavourful. At Giri Restaurant, our love for truffle cuisine began with a single dish: the Truffle Mushroom Risotto.

Our executive chef travels to the markets of southern France each season to hand-select the finest black truffles. The aroma alone — a deep, woody perfume with hints of chocolate and earth — tells you everything about quality.

**How We Prepare It**

The secret lies in restraint. Truffle oil is added at the very end of cooking, never heated, so its volatile aromatic compounds remain intact. Shaved truffle is folded into the risotto just before plating, releasing its fragrance into the warm, creamy rice.

**Pairing Suggestions**

A light Burgundy Pinot Noir or a crisp Chablis Premier Cru complements truffle dishes beautifully — the mineral notes of the wine echo the earthiness of the fungi.

We invite you to visit Giri Restaurant and experience truffle cuisine as it was meant to be — simple, honest, and extraordinary.`,
    category: 'Chef Stories',
    author: 'Chef Rajiv Giri',
    authorRole: 'Executive Chef',
    authorAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop',
    date: 'July 15, 2026',
    readTime: 5,
    tags: ['truffle', 'fine dining', 'chef special', 'risotto'],
  },
  {
    id: 'blog-2',
    slug: 'farm-to-table-philosophy',
    title: 'Our Farm-to-Table Philosophy',
    excerpt: 'Learn how we partner with local organic farms to bring the freshest seasonal produce straight to your plate every single day.',
    content: `At Giri Restaurant, "farm-to-table" isn't a marketing phrase — it's a daily commitment. Every morning, our kitchen team receives fresh deliveries directly from certified organic farms within 50 kilometres of our restaurant.

**Why Local Sourcing Matters**

Locally grown produce is harvested at peak ripeness, which means better flavour, more nutrients, and a smaller carbon footprint. When tomatoes ripen on the vine and are in your dish within 24 hours, the difference is unmistakable.

**Our Farm Partners**

We work closely with Green Valley Organics for leafy greens and herbs, Sunrise Dairy for grass-fed butter and cheese, and Heritage Meats for free-range chicken and grass-fed beef.

**Seasonal Menus**

Our menu changes with the seasons. When asparagus is in season, it features prominently. When winter squash arrives, our chefs get creative. This keeps our cooking vibrant and ensures you always taste the best of what the land is offering right now.

Come dine with us and taste the difference that real ingredients make.`,
    category: 'Behind the Scenes',
    author: 'Meena Krishnan',
    authorRole: 'Head of Sourcing',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
    date: 'July 10, 2026',
    readTime: 4,
    tags: ['organic', 'farm-to-table', 'sustainability', 'local'],
  },
  {
    id: 'blog-3',
    slug: 'perfect-wagyu-burger',
    title: 'What Makes the Perfect Wagyu Burger?',
    excerpt: 'From the grade of beef to the brioche bun and truffle fries — a deep dive into our most popular signature dish.',
    content: `The Smoked Wagyu Beef Burger is Giri Restaurant's most-ordered dish, and for good reason. Every element has been obsessively refined over dozens of iterations to achieve what we believe is the perfect burger.

**The Beef**

We use Grade A4 Wagyu beef, known for its intense marbling. The fat content gives it a buttery richness that standard beef simply cannot replicate. Our patties are loosely packed — never pressed — to preserve that melt-in-your-mouth texture.

**The Smoking Process**

Each patty is cold-smoked over cherry wood for 20 minutes before hitting the grill. This infuses a subtle smokiness without overpowering the natural flavour of the beef.

**The Build**

Smoked cheddar is melted directly on the patty. Caramelised onions — slow-cooked for 45 minutes in butter and a splash of balsamic — add sweetness and depth. The brioche bun is toasted in clarified butter for a golden, slightly crisp exterior.

**Truffle Fries**

No Wagyu burger is complete without our truffle fries: hand-cut, double-fried for maximum crispness, then tossed in truffle oil, sea salt, and fresh parsley.

Order yours today — available Tuesday evenings with our WAGYU2FOR1 deal.`,
    category: 'Recipes & Tips',
    author: 'Chef Rajiv Giri',
    authorRole: 'Executive Chef',
    authorAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    date: 'July 5, 2026',
    readTime: 6,
    tags: ['wagyu', 'burger', 'beef', 'recipe'],
  },
  {
    id: 'blog-4',
    slug: 'dessert-secrets-lava-cake',
    title: 'The Secret Behind Our Molten Lava Cake',
    excerpt: 'Our pastry chef reveals the precise technique that creates that perfectly molten chocolate centre every single time.',
    content: `The Molten Chocolate Lava Cake is a dessert that looks simple but demands precision. A difference of just 60 seconds in baking time separates a perfect flowing centre from an overcooked disappointment.

**The Chocolate**

We use 72% Belgian dark chocolate — high enough cocoa content to give intensity without bitterness. It's melted with unsalted butter in a double boiler, never a microwave, to preserve the smooth emulsion.

**The Technique**

The batter is portioned into buttered ramekins and refrigerated for at least two hours before baking. This cold-start method ensures the outside sets while the centre stays liquid. We bake at 200°C for exactly 11 minutes.

**The Ice Cream**

Our vanilla bean ice cream is made in-house using double cream and real Madagascar vanilla pods. The contrast of hot and cold, bitter chocolate and sweet cream, is what makes this dessert unforgettable.

Visit us and end your meal on a high note.`,
    category: 'Recipes & Tips',
    author: 'Priya Nair',
    authorRole: 'Pastry Chef',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop',
    date: 'June 28, 2026',
    readTime: 4,
    tags: ['dessert', 'chocolate', 'lava cake', 'pastry'],
  },
  {
    id: 'blog-5',
    slug: 'hosting-the-perfect-dinner-party',
    title: 'Hosting the Perfect Dinner Party: Tips from Giri',
    excerpt: 'Planning a dinner gathering at home? Our team shares professional hosting tips to impress your guests effortlessly.',
    content: `Hosting a dinner party doesn't have to be stressful. With the right preparation and a few professional tricks, you can create an evening your guests will talk about for months.

**Plan Your Menu Around One Star Dish**

Choose one show-stopping main course — perhaps a roasted leg of lamb or a whole sea bass — and build simple, complementary starters and desserts around it. This lets you focus your energy where it matters most.

**Prep 80% the Day Before**

Stocks, sauces, desserts, and salad dressings can all be made ahead. On the day of the party, you should only be doing final assembly and finishing touches.

**Set the Atmosphere**

Candlelight, fresh flowers, and a curated playlist transform any dining space. Lower the main lights an hour before guests arrive and light candles — the ambience makes food taste better.

**Don't Forget the Welcome Drink**

Greet guests with a signature cocktail or mocktail as they arrive. It sets the tone and gives you time to finish last-minute preparations.

**Ask for Help**

Professional restaurants have entire teams. For a dinner party, it's perfectly fine to ask a friend to help serve or clear plates. Delegate and enjoy the evening yourself.

If you'd rather leave the cooking to us, Giri Restaurant offers private dining and catering for all occasions. Get in touch today.`,
    category: 'Dining Tips',
    author: 'Meena Krishnan',
    authorRole: 'Head of Sourcing',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    date: 'June 20, 2026',
    readTime: 5,
    tags: ['hosting', 'dinner party', 'tips', 'entertaining'],
  },
  {
    id: 'blog-6',
    slug: 'spice-secrets-thai-green-curry',
    title: 'Spice Secrets: Inside Our Thai Green Curry',
    excerpt: 'The Spicy Thai Green Curry is our most-loved vegetarian dish. Here\'s what goes into making it authentically bold and aromatic.',
    content: `Thai green curry is one of the most complex dishes in our menu — a harmony of heat, creaminess, and fragrant aromatics that must be carefully balanced.

**The Paste**

We make our green curry paste from scratch. Fresh green chillies, lemongrass, galangal, kaffir lime zest, coriander root, white pepper, and shrimp paste (we offer a vegan version with miso) are pounded together in a stone mortar until completely smooth. This takes about 15 minutes — a food processor simply doesn't release the essential oils the same way.

**The Coconut Milk**

We use full-fat coconut milk from Thailand. The paste is fried in the thick cream that rises to the top of the can before the rest of the coconut milk is added. This "cracking" step intensifies the flavour dramatically.

**The Vegetables**

Bamboo shoots, Thai aubergine, baby courgette, and fresh spinach are added in stages according to their cooking times. Nothing is overcooked — every vegetable retains its colour and texture.

**The Finish**

Fish sauce (or soy sauce for the vegan version), palm sugar, and fresh Thai basil leaves are stirred in at the last moment. The result is a curry that is simultaneously hot, sweet, salty, and fragrant.

Order it with jasmine rice — the gentle floral fragrance of the rice is the perfect complement.`,
    category: 'Recipes & Tips',
    author: 'Chef Rajiv Giri',
    authorRole: 'Executive Chef',
    authorAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop',
    date: 'June 14, 2026',
    readTime: 6,
    tags: ['thai', 'curry', 'vegetarian', 'spice'],
  },
];
