'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_SHOPS, getStoredShops, saveStoredShops, getStoredDishes, getMatchingFoodImage } from '@/data/mockData';
import { Search, ChevronLeft, ChevronRight, Star, Clock, Leaf, MapPin, Sparkles, Flame, Check, Utensils, Building2 } from 'lucide-react';
import { MenuItem, Shop } from '@/types';
import AddButton from '@/components/AddButton';
import DishModal from '@/components/DishModal';
import SafeImage, { FALLBACK_SVG } from '@/components/SafeImage';
import { formatCurrency } from '@/utils/formatters';
import { shopApi, menuApi } from '@/services/restaurantService';

const CATEGORY_IMAGES: Record<string, string> = {
  all:                     'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&auto=format&fit=crop&q=85',
  breakfast:               'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&auto=format&fit=crop&q=85',
  soups:                   'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&auto=format&fit=crop&q=85',
  'veg-starters':          'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&auto=format&fit=crop&q=85',
  'non-veg-starters':      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&h=300&auto=format&fit=crop&q=85',
  tandoor:                 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&auto=format&fit=crop&q=85',
  grill:                   'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&auto=format&fit=crop&q=85',
  kebabs:                  'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&auto=format&fit=crop&q=85',
  biryani:                 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&auto=format&fit=crop&q=85',
  'rice-pulao':            'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&auto=format&fit=crop&q=85',
  'south-indian-curries':  'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&auto=format&fit=crop&q=85',
  'north-indian-curries':  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&auto=format&fit=crop&q=85',
  seafood:                 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&auto=format&fit=crop&q=85',
  chinese:                 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&auto=format&fit=crop&q=85',
  breads:                  'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&auto=format&fit=crop&q=85',
  'fast-food':             'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&auto=format&fit=crop&q=85',
  bakery:                  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&auto=format&fit=crop&q=85',
  desserts:                'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&auto=format&fit=crop&q=85',
  beverages:               'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&auto=format&fit=crop&q=85',
};

// 25 Premier Curated Main Signature Items for Home Page
const CURATED_MAIN_DISHES: MenuItem[] = [
  {
    id: 'm-truffle-risotto-1',
    name: 'Wild Mushroom & Black Truffle Cream Risotto',
    category: 'curries',
    price: 640,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['chef-special', 'veg'],
    description: 'Creamy Italian Carnaroli rice slow-simmered with porcini mushrooms, black truffle paste, aged Parmesan, and white truffle oil.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-1',
    name: 'Royal Hyderabadi Chicken Dum Biryani',
    category: 'biryani',
    price: 290,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Aromatic long-grain basmati rice layered with tender marinated chicken, saffron, fried onions, and braised spices in clay handi.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-2',
    name: 'Lucknowi Slow-Cooked Mutton Biryani',
    category: 'biryani',
    price: 480,
    rating: 4.9,
    prepTime: 25,
    preparationTime: '25 mins',
    dietary: ['non-veg'],
    description: 'Succulent lamb cuts cooked with rose water, kewra, and fragrant spices, layered with aged basmati rice.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-3',
    name: 'Royal Nizam Paneer Dum Biryani',
    category: 'biryani',
    price: 260,
    rating: 4.8,
    prepTime: 18,
    preparationTime: '18 mins',
    dietary: ['veg'],
    description: 'Marinated malai paneer cubes, saffron rice, fresh mint leaves, and roasted cashews dum-cooked to perfection.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-4',
    name: 'Smoked Wagyu Beef Burger',
    category: 'grill',
    price: 580,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '15-20 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Slow-smoked 200g Wagyu beef patty with sharp cheddar, caramelized onions, and house smoked aioli on brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-5',
    name: 'Slow-Cooked Wood-Fired Lamb Chops',
    category: 'grill',
    price: 790,
    rating: 4.9,
    prepTime: 25,
    preparationTime: '25 mins',
    dietary: ['non-veg'],
    description: 'Rosemary & garlic crusted Australian lamb chops grilled over oakwood with mint reduction glaze.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-6',
    name: 'Butter Chicken Murgh Makhani',
    category: 'curries',
    price: 380,
    rating: 4.9,
    prepTime: 18,
    preparationTime: '18 mins',
    dietary: ['non-veg'],
    description: 'Charcoal-grilled chicken tikka simmered in rich creamy tomato and cashew butter gravy.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-7',
    name: 'Royal Paneer Butter Masala',
    category: 'curries',
    price: 320,
    rating: 4.8,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Fresh malai paneer cubes cooked in velvet tomato gravy infused with fenugreek and butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-8',
    name: 'Dal Makhani Shahi Handi',
    category: 'curries',
    price: 260,
    rating: 4.9,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Overnight slow-cooked black lentils and kidney beans enriched with fresh cream and butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-9',
    name: 'Classic Mutton Seekh Kebab',
    category: 'kebabs',
    price: 420,
    rating: 4.8,
    prepTime: 18,
    preparationTime: '18 mins',
    dietary: ['non-veg'],
    description: 'Hand-ground spiced minced mutton skewers char-broiled over hot embers with mint dip.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-10',
    name: 'Tandoori Jumbo Prawn Skewers',
    category: 'seafood',
    price: 650,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['non-veg'],
    description: 'Fresh tiger prawns marinated in Ajwain spices and hung curd, roasted in clay tandoor oven.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-11',
    name: 'Tandoori Malai Broccoli',
    category: 'tandoor',
    price: 320,
    rating: 4.8,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Tender broccoli florets marinated in cardamom, cheese cream, and roasted in clay oven.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-12',
    name: 'Norwegian Wild Salmon Steak',
    category: 'seafood',
    price: 890,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Pan-seared Atlantic wild salmon fillet served over lemon garlic asparagus and butter emulsion.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-13',
    name: 'Signature Dutch Dark Chocolate Cake',
    category: 'bakery-desserts',
    price: 650,
    rating: 5.0,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: '70% Dutch dark chocolate layers filled with ganache and crowned with artisanal gold leaves.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-14',
    name: 'Red Velvet Cream Cheese Layer Cake',
    category: 'bakery-desserts',
    price: 580,
    rating: 4.9,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Moist cocoa-rubbed red velvet cake frosted with smooth Madagascar vanilla cream cheese.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-15',
    name: 'Belgian Chocolate Hazelnut Pastry',
    category: 'bakery-desserts',
    price: 240,
    rating: 4.8,
    prepTime: 10,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'French flaky pastry layers filled with hazelnut praline mousse and dark Belgian glaze.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-16',
    name: 'Fresh Strawberry Tartlet',
    category: 'bakery-desserts',
    price: 280,
    rating: 4.8,
    prepTime: 10,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'Sweet butter pastry shell filled with vanilla pastry cream and crowned with fresh strawberries.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-17',
    name: 'Gourmet Truffle Wood-Fired Pizza',
    category: 'fast-food',
    price: 520,
    rating: 4.9,
    prepTime: 18,
    preparationTime: '18 mins',
    dietary: ['veg'],
    description: 'Artisanal sourdough crust topped with black truffle cream, wild porcini, fior di latte mozzarella, and fresh arugula.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-18',
    name: 'Amritsari Kulcha with Chole',
    category: 'breakfast',
    price: 220,
    rating: 4.8,
    prepTime: 12,
    preparationTime: '12 mins',
    dietary: ['veg'],
    description: 'Crispy clay-oven stuffed potato and pomegranate seed naan served with spicy Punjabi chickpea curry.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-19',
    name: 'Authentic Crispy Masala Dosa',
    category: 'breakfast',
    price: 160,
    rating: 4.8,
    prepTime: 10,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'Golden thin fermented rice crepe filled with spiced potato onion mash served with coconut chutney & sambar.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-20',
    name: 'Kerala Coconut Fish Curry',
    category: 'seafood',
    price: 490,
    rating: 4.9,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['non-veg'],
    description: 'Seer fish fillet simmered in raw mango coconut milk curry infused with mustard seeds and curry leaves.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-21',
    name: 'Crispy Amritsari Fish Fry',
    category: 'non-veg-starters',
    price: 480,
    rating: 4.8,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['non-veg'],
    description: 'Golden carom seed and gram flour battered river fish fillets fried till crispy, served with mint chutney.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-22',
    name: 'Chef Signature Spicy Chicken 65',
    category: 'non-veg-starters',
    price: 390,
    rating: 4.7,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['non-veg'],
    description: 'Crispy deep-fried chicken bites tossed with curry leaves, red chili paste, and mustard seeds.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-23',
    name: 'Artisanal Cold Brew Caramel Latte',
    category: 'beverages',
    price: 220,
    rating: 4.9,
    prepTime: 5,
    preparationTime: '5 mins',
    dietary: ['veg'],
    description: '18-hour steep Arabica cold brew espresso shaken with salted caramel syrup and creamy whole milk over ice.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-24',
    name: 'Signature Mango Passion Fruit Cooler',
    category: 'beverages',
    price: 180,
    rating: 4.9,
    prepTime: 5,
    preparationTime: '5 mins',
    dietary: ['veg'],
    description: 'Fresh Alphonso mango pulp shaken with passion fruit nectar, fresh mint, and sparkling soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'm-25',
    name: 'Spanish Churros with Hot Chocolate Dip',
    category: 'bakery-desserts',
    price: 260,
    rating: 4.8,
    prepTime: 12,
    preparationTime: '12 mins',
    dietary: ['veg'],
    description: 'Golden fried cinnamon sugar dusted dough pastry sticks served with thick molten dark chocolate dip.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&auto=format&fit=crop&q=85',
  },
];

const FILTER_TABS = [
  { id: 'all', label: '🍽️ All Dishes' },
  { id: 'biryani', label: '🍲 Biryani' },
  { id: 'grill', label: '🔥 Grill & BBQ' },
  { id: 'kebabs', label: '🍢 Kebabs' },
  { id: 'tandoor', label: '🏺 Tandoor' },
  { id: 'veg-starters', label: '🥦 Veg Starters' },
  { id: 'non-veg-starters', label: '🍗 Non-Veg Starters' },
  { id: 'curries', label: '🥘 Curries' },
  { id: 'bakery-desserts', label: '🍰 Bakery & Sweets' },
  { id: 'beverages', label: '🍹 Drinks' },
  { id: 'fast-food', label: '🍔 Burgers & Pizza' },
  { id: 'seafood', label: '🦐 Seafood' },
  { id: 'breakfast', label: '🥞 Breakfast' },
];

const getCategoryPhoto = (catId: string, catName: string) => {
  if (CATEGORY_IMAGES[catId]) return CATEGORY_IMAGES[catId];
  const nameLower = (catName || '').toLowerCase();
  if (nameLower.includes('rice') || nameLower.includes('pulao')) return 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('south')) return 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('north')) return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('sea') || nameLower.includes('fish') || nameLower.includes('prawn')) return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('chin') || nameLower.includes('noodle')) return 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('biryani')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('bread') || nameLower.includes('naan') || nameLower.includes('roti')) return 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('kebab')) return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('tandoor')) return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('grill')) return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('soup')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('break')) return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&auto=format&fit=crop&q=85';
  if (nameLower.includes('veg')) return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&auto=format&fit=crop&q=85';
  return CATEGORY_IMAGES.all;
};

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all cursor-pointer"
        aria-label="scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={ref}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {children}
      </div>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all cursor-pointer"
        aria-label="scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [curatedDishes, setCuratedDishes] = useState<MenuItem[]>(CURATED_MAIN_DISHES);

  useEffect(() => {
    const stored = getStoredShops();
    if (stored && stored.length > 0) {
      setShops(stored);
    }

    try {
      const rawList: MenuItem[] = [];

      // 1. Add CURATED_MAIN_DISHES first
      CURATED_MAIN_DISHES.forEach((d) => {
        if (d && d.id) {
          rawList.push({
            ...d,
            image: getMatchingFoodImage(d.name, d.category, d.subCategory, d.image),
          });
        }
      });

      // 2. Add merchant-added custom dishes
      const merchantDishesData = typeof window !== 'undefined' ? (localStorage.getItem('giri_merchant_dishes') || localStorage.getItem('royal_merchant_dishes')) : null;
      if (merchantDishesData) {
        const parsed = JSON.parse(merchantDishesData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((d: any, idx: number) => {
            if (d && d.name) {
              rawList.push({
                ...d,
                id: `merchant-added-${idx}-${d.name}`,
                image: getMatchingFoodImage(d.name, d.category, d.subCategory, d.image),
                isMerchantDish: true,
              });
            }
          });
        }
      }

      // 3. Deduplicate strictly by dish name AND image URL, filtering out synthetic junk
      const seenNames = new Set<string>();
      const seenImages = new Set<string>();
      const deduplicated: MenuItem[] = [];

      rawList.forEach((item) => {
        const nameClean = (item.name || '').toLowerCase().trim();
        const baseName = nameClean.replace(/^(imperial 24k gold dust|classic claypot charcoal|black truffle infused|signature royal|exquisite)\s+/i, '');
        const imgClean = (item.image || '').split('?')[0];

        if (!seenNames.has(baseName) && !seenImages.has(imgClean)) {
          seenNames.add(baseName);
          seenImages.add(imgClean);
          deduplicated.push(item);
        }
      });

      setCuratedDishes(deduplicated.length > 0 ? deduplicated : CURATED_MAIN_DISHES);
    } catch (e) {
      setCuratedDishes(CURATED_MAIN_DISHES);
    }

    shopApi.getShops()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiShops = res.data;
          const map = new Map<string, Shop>();
          // Put stored (newly added merchant) shops FIRST
          stored.forEach((s) => map.set(s.id || s.name, s));
          apiShops.forEach((s: Shop) => {
            if (!map.has(s.id || s.name)) {
              map.set(s.id || s.name, s);
            }
          });
          const combined = Array.from(map.values());
          setShops(combined);
          saveStoredShops(combined);
        }
      })
      .catch(() => {});
  }, []);

  const filteredDishes = curatedDishes.filter((dish) => {
    if (!dish || !dish.name) return false;
    const nameStr = (dish.name || '').toLowerCase();
    const descStr = (dish.description || '').toLowerCase();
    const catStr = (dish.category || '').toLowerCase();
    const subCatStr = (dish.subCategory || '').toLowerCase();
    const searchTrim = (search || '').trim().toLowerCase();

    let matchesSearch = true;
    if (searchTrim !== '') {
      const fullContent = `${nameStr} ${descStr} ${catStr} ${subCatStr}`;
      const searchWords = searchTrim.split(/\s+/).filter(Boolean);
      matchesSearch = fullContent.includes(searchTrim) || searchWords.every((word) => fullContent.includes(word));
    }

    let matchesTab = true;
    const dietaryList = Array.isArray(dish.dietary) ? dish.dietary : [];

    // If search is non-empty, search across ALL categories so items like "Dutch Cake" are never hidden
    if (activeTab !== 'all' && searchTrim === '') {
      const target = activeTab.toLowerCase().replace(/-/g, ' ');
      matchesTab =
        catStr === activeTab ||
        catStr.includes(target) ||
        catStr.replace(/-/g, ' ').includes(target) ||
        subCatStr.includes(target) ||
        (activeTab === 'grill' && (catStr.includes('grill') || catStr.includes('bbq') || nameStr.includes('burger') || nameStr.includes('wings') || nameStr.includes('lamb') || nameStr.includes('steak') || nameStr.includes('ribeye') || nameStr.includes('tikka'))) ||
        (activeTab === 'biryani' && (catStr.includes('biryani') || nameStr.includes('biryani') || nameStr.includes('mandi') || subCatStr.includes('biryani'))) ||
        (activeTab === 'kebabs' && (catStr.includes('kebab') || nameStr.includes('kebab') || nameStr.includes('seekh') || nameStr.includes('reshmi') || nameStr.includes('tangdi') || nameStr.includes('tikka'))) ||
        (activeTab === 'tandoor' && (catStr.includes('tandoor') || nameStr.includes('tandoori') || nameStr.includes('tikka') || nameStr.includes('shashlik'))) ||
        (activeTab === 'veg-starters' && (catStr.includes('starter') || catStr.includes('amuse') || subCatStr.includes('starter') || catStr.includes('tandoor') || nameStr.includes('paneer') || nameStr.includes('risotto')) && dietaryList.includes('veg')) ||
        (activeTab === 'non-veg-starters' && (catStr.includes('starter') || catStr.includes('amuse') || subCatStr.includes('starter') || catStr.includes('kebab') || catStr.includes('grill') || nameStr.includes('65') || nameStr.includes('wings') || nameStr.includes('fish fry') || nameStr.includes('prawn')) && dietaryList.includes('non-veg')) ||
        (activeTab === 'rice-pulao' && (catStr.includes('rice') || catStr.includes('pulao') || catStr.includes('biryani'))) ||
        (activeTab === 'curries' && (catStr.includes('curry') || catStr.includes('curries') || catStr.includes('mains') || nameStr.includes('butter chicken') || nameStr.includes('makhani') || nameStr.includes('masala') || nameStr.includes('korma'))) ||
        (activeTab === 'bakery-desserts' && (catStr.includes('bakery') || catStr.includes('dessert') || catStr.includes('desserts') || catStr.includes('cake') || catStr.includes('sweet') || nameStr.includes('cake') || nameStr.includes('pastry') || nameStr.includes('tart') || nameStr.includes('churros') || nameStr.includes('kulfi') || nameStr.includes('jamun'))) ||
        (activeTab === 'fast-food' && (catStr.includes('fast') || catStr.includes('burger') || catStr.includes('pizza') || catStr.includes('quick') || nameStr.includes('burger') || nameStr.includes('pizza'))) ||
        (activeTab === 'beverages' && (catStr.includes('beverage') || catStr.includes('drink') || catStr.includes('bar') || catStr.includes('cafe') || nameStr.includes('latte') || nameStr.includes('cooler') || nameStr.includes('tea') || nameStr.includes('coffee'))) ||
        (activeTab === 'seafood' && (catStr.includes('seafood') || nameStr.includes('salmon') || nameStr.includes('fish') || nameStr.includes('prawn') || nameStr.includes('shrimp'))) ||
        (activeTab === 'breakfast' && (catStr.includes('breakfast') || nameStr.includes('dosa') || nameStr.includes('kulcha') || nameStr.includes('idli')));
    }

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col gap-10 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#A00000] to-[#C8102E] text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format')] bg-cover bg-center pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 w-full">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase w-fit">
              ✦ Good Food, Great Experience
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
              Authentic Flavours,<br />Delivered Fresh to You
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-lg leading-relaxed">
              Explore Royal Restaurant's curated signature menu — from chef specials to desserts — made with 100% organic ingredients.
            </p>

            {/* Real-time Search */}
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#a09070]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for signature dishes, burgers, biryani..."
                className="w-full bg-white text-[#1a1008] rounded-2xl pl-11 pr-10 py-3 sm:py-3.5 text-sm font-medium shadow-lg outline-none placeholder-[#a09070] focus:ring-2 focus:ring-[#C8A055]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] text-sm font-bold">✕</button>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 flex-wrap text-[10px] sm:text-xs text-red-100 font-medium">
              <span>🔥 Popular:</span>
              {['Wagyu Burger', 'Truffle Risotto', 'Dutch Cake', 'Biryani'].map((s) => (
                <button key={s} onClick={() => { setSearch(s); setActiveTab('all'); }} className="underline hover:text-white transition-colors cursor-pointer">{s}</button>
              ))}
            </div>
          </div>

          <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 hidden md:block">
            <Image 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&auto=format&fit=crop&q=85" 
              alt="Royal signature dish" 
              fill 
              priority
              className="object-cover" 
              sizes="400px"
            />
          </div>
        </div>
      </section>

      {/* Category Inspiration Row */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-extrabold text-[#1a1008]">Explore Cuisines & Brands</h2>
            <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline">View full catalog</Link>
          </div>
          <ScrollRow>
            {INITIAL_CATEGORIES.slice(0, 10).map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/menu' : `/menu?category=${cat.id}`}
                className="shrink-0 flex flex-col items-center gap-2 group"
                title={cat.name}
              >
                <div className="relative w-24 h-20 sm:w-36 sm:h-28 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#8B0000] transition-all shadow-sm">
                  <SafeImage 
                    src={getCategoryPhoto(cat.id, cat.name)} 
                    alt={cat.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 96px, 144px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </Link>
            ))}
          </ScrollRow>
        </section>
      )}

      {/* Partner Shops & Outlets */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="section-label">Our Locations</span>
              <h2 className="text-xl font-extrabold text-[#1a1008] mt-0.5">Best Merchant Outlets</h2>
            </div>
            <Link href="/shops" className="text-sm font-bold text-[#8B0000] hover:underline flex items-center gap-1">
              <MapPin className="w-4 h-4" /> See all locations →
            </Link>
          </div>
          <ScrollRow>
            {shops.map((shop, idx) => (
              <Link key={shop._id || shop.id || idx} href={`/menu?shop=${encodeURIComponent(shop.name || (shop as any).shopName || shop.id || shop._id)}`} className="shrink-0 w-60 glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all block group">
                <div className="relative h-36 w-full bg-[#F8F5F0]">
                  <img 
                    src={shop.image || FALLBACK_SVG} 
                    alt={shop.name} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_SVG;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-extrabold text-[#1a1008] text-sm group-hover:text-[#8B0000] transition-colors">{shop.name}</h3>
                  <p className="text-xs text-[#6b5840] mt-0.5 line-clamp-1">{shop.tagline || shop.tag || 'Fine Dining & Takeaway'}</p>
                  
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#8B0000]/10">
                    <span className="flex items-center gap-1 text-xs font-bold text-[#C8A055]">
                      <Star className="w-3.5 h-3.5 fill-[#C8A055]" /> {shop.rating || 4.8}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#a09070]">
                      <Clock className="w-3 h-3" /> {shop.deliveryTime || '20-30 min'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollRow>
        </section>
      )}

      {/* CURATED FEATURED MAIN DISHES CATALOG (20-30 Items) WITH REAL-TIME FILTERING */}
      <section className="max-w-7xl mx-auto px-4 w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B0000]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1008]">Top Curated Signature Dishes</h2>
            </div>
            <p className="text-xs text-[#6b5840] mt-1">
              Hand-selected main dishes ({filteredDishes.length} items) • Live order & real-time delivery
            </p>
          </div>

          <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline flex items-center gap-1">
            Browse Full 1000+ Menu Catalog →
          </Link>
        </div>

        {/* Real-time Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/20'
                  : 'bg-white text-[#4a3820] border border-[#8B0000]/15 hover:bg-[#FFF8F0]'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Items Grid */}
        {filteredDishes.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-[#8B0000]/20 space-y-3">
            <Utensils className="w-10 h-10 text-[#8B0000] mx-auto animate-pulse" />
            <h3 className="font-extrabold text-base text-[#1a1008]">No Dishes Match Your Filter</h3>
            <p className="text-xs text-[#6b5840]">Try switching category tabs or clearing your search term.</p>
            <button
              onClick={() => { setActiveTab('all'); setSearch(''); setCuratedDishes(CURATED_MAIN_DISHES); }}
              className="btn-crimson py-2 px-4 rounded-xl text-xs font-extrabold cursor-pointer inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between border border-[#8B0000]/10 bg-white"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#F8F5F0] overflow-hidden">
                    <SafeImage 
                      src={dish.image} 
                      alt={dish.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {Array.isArray(dish.dietary) && dish.dietary.includes('chef-special') && (
                        <span className="bg-[#8B0000] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C8A055]" /> Special
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                      {Array.isArray(dish.dietary) && dish.dietary.includes('veg') ? (
                        <span className="bg-white/95 text-[#16603A] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#16603A]/30 shadow-xs flex items-center gap-0.5">
                          <Leaf className="w-3 h-3 text-emerald-600" /> Veg
                        </span>
                      ) : (
                        <span className="bg-white/95 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-red-300 shadow-xs">
                          Non-Veg
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-1 text-[11px] font-extrabold">
                      <span className="flex items-center gap-1 text-[#C8A055]">
                        <Star className="w-3.5 h-3.5 fill-[#C8A055]" /> {dish.rating || 4.8}
                      </span>
                      <span className="text-[#a09070] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {dish.preparationTime || '15 mins'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-[#1a1008] text-sm line-clamp-1 group-hover:text-[#8B0000] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="pt-2 border-t border-[#8B0000]/10 flex flex-col gap-0.5 text-[11px] font-bold text-[#6b5840]">
                      <div className="flex items-center gap-1 text-[#8B0000] truncate">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{dish.shopName || 'Giri Spice Garden'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 truncate text-[10px]">
                        <MapPin className="w-3 h-3 text-[#8B0000] shrink-0" />
                        <span className="truncate">{dish.address || dish.city || 'Hyderabad'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#8B0000]/10 mt-2">
                  <span className="text-lg font-extrabold text-[#8B0000]">
                    {formatCurrency(dish.price)}
                  </span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <AddButton dish={dish} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Offers Banner */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E8] border border-[#C8A055]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="section-label">Limited Time Offer</span>
              <h2 className="text-2xl font-extrabold text-[#1a1008] mt-1 mb-2">Exclusive Dining Discounts</h2>
              <p className="text-sm text-[#6b5840] max-w-sm leading-relaxed">
                Use promo code <span className="font-bold text-[#8B0000]">ROYAL20</span> for 20% off your order, or{' '}
                <span className="font-bold text-[#8B0000]">WAGYU2FOR1</span> for buy-1-get-1 Wagyu Burgers.
              </p>
            </div>
            <Link href="/offers" className="btn-crimson px-8 py-3.5 rounded-xl text-sm font-extrabold whitespace-nowrap shrink-0 shadow-md">
              🎁 View All Offers
            </Link>
          </div>
        </section>
      )}

      {/* Merchant Partner Onboarding Request Banner */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="rounded-3xl bg-gradient-to-br from-[#1a1008] via-[#2d1b0d] to-[#1a1008] text-white border border-[#C8A055]/40 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#8B0000]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A055]/20 border border-[#C8A055]/40 text-[#E0B96A] text-xs font-extrabold uppercase">
                <Building2 className="w-3.5 h-3.5" /> For Restaurant Owners & Brand Partners
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Become a Royal Restaurant Merchant Partner
              </h2>
              <p className="text-xs sm:text-sm text-[#c0b090] max-w-xl leading-relaxed">
                Partner with us to expand your restaurant reach! Submit an onboarding request to Admin, list your outlet, create food categories, and set dish prices.
              </p>
            </div>
            <Link
              href="/merchant/register"
              className="relative z-10 btn-crimson px-8 py-3.5 rounded-xl text-sm font-extrabold whitespace-nowrap shrink-0 shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Building2 className="w-4 h-4" /> Register as Merchant Partner
            </Link>
          </div>
        </section>
      )}

      {/* Dish Modal */}
      {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}

    </div>
  );
}
