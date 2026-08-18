'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { INITIAL_CATEGORIES, INITIAL_SHOPS, getStoredShops, saveStoredShops, getStoredDishes } from '@/data/mockData';
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

// 24 Premier Curated Main Items for Home Page
const CURATED_MAIN_DISHES: MenuItem[] = [
  {
    id: 'h-1',
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
    id: 'h-2',
    name: 'Signature Dutch Dark Chocolate Cake',
    category: 'bakery',
    price: 650,
    rating: 5.0,
    prepTime: 15,
    preparationTime: '10-15 mins',
    dietary: ['chef-special', 'veg'],
    description: '70% Dutch dark chocolate layers filled with ganache and crowned with artisanal gold leaves.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-3',
    name: 'Norwegian Wild Salmon Steak',
    category: 'seafood',
    price: 890,
    rating: 4.8,
    prepTime: 25,
    preparationTime: '20-25 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Pan-seared Atlantic wild salmon fillet served over lemon garlic asparagus and butter emulsion.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-4',
    name: 'Royal Hyderabadi Dum Biryani',
    category: 'biryani',
    price: 490,
    rating: 4.9,
    prepTime: 30,
    preparationTime: '25-30 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Aromatic long-grain basmati rice layered with tender marinated chicken, saffron, and fried onions in handi.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-5',
    name: 'Truffle & Wild Mushroom Risotto',
    category: 'fine-dining-starters',
    price: 620,
    rating: 4.7,
    prepTime: 20,
    preparationTime: '15-20 mins',
    dietary: ['chef-special', 'veg'],
    description: 'Creamy Arborio rice with porcini mushrooms, black truffle oil shavings, and 24-month aged Parmigiano Reggiano.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-6',
    name: 'Slow-Cooked Wood-Fired Lamb Chops',
    category: 'grill',
    price: 850,
    rating: 4.9,
    prepTime: 25,
    preparationTime: '20-25 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Rosemary & garlic crusted Australian lamb chops grilled over oakwood with mint reduction glaze.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-7',
    name: 'Butter Chicken Murgh Makhani',
    category: 'north-indian-curries',
    price: 450,
    rating: 4.8,
    prepTime: 20,
    preparationTime: '15-20 mins',
    dietary: ['non-veg'],
    description: 'Charcoal-grilled chicken tikka simmered in rich creamy tomato and cashew butter gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-8',
    name: 'Royal Paneer Butter Masala',
    category: 'north-indian-curries',
    price: 390,
    rating: 4.7,
    prepTime: 18,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Fresh malai paneer cubes cooked in velvet tomato gravy infused with fenugreek and butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-9',
    name: 'Red Velvet Cream Cheese Layer Cake',
    category: 'bakery',
    price: 580,
    rating: 4.9,
    prepTime: 15,
    preparationTime: '10-15 mins',
    dietary: ['veg'],
    description: 'Moist cocoa-rubbed red velvet cake frosted with smooth Madagascar vanilla cream cheese.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-10',
    name: 'Tandoori Jumbo Prawn Skewers',
    category: 'seafood',
    price: 780,
    rating: 4.8,
    prepTime: 20,
    preparationTime: '15-20 mins',
    dietary: ['chef-special', 'non-veg'],
    description: 'Fresh tiger prawns marinated in Ajwain spices and hung curd, roasted in clay tandoor oven.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-11',
    name: 'Smoked BBQ Chicken Wings',
    category: 'grill',
    price: 390,
    rating: 4.6,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['non-veg'],
    description: 'Crispy hickory-smoked chicken wings tossed in signature sweet bourbon BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-12',
    name: 'Belgian Chocolate Hazelnut Pastry',
    category: 'bakery',
    price: 240,
    rating: 4.9,
    prepTime: 10,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'French flaky pastry layers filled with hazelnut praline mousse and dark Belgian glaze.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-13',
    name: 'Dal Makhani Shahi Handi',
    category: 'north-indian-curries',
    price: 350,
    rating: 4.8,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['veg'],
    description: 'Overnight slow-cooked black lentils and kidney beans enriched with fresh cream and butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-14',
    name: 'Tandoori Malai Broccoli',
    category: 'tandoor',
    price: 360,
    rating: 4.7,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Tender broccoli florets marinated in cardamom, cheese cream, and roasted in clay oven.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-15',
    name: 'Fresh Strawberry Tartlet',
    category: 'bakery',
    price: 280,
    rating: 4.8,
    prepTime: 10,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'Butter tart shell filled with vanilla pastry cream and topped with glazed fresh strawberries.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-16',
    name: 'Artisanal Cold Brew Caramel Latte',
    category: 'beverages',
    price: 220,
    rating: 4.9,
    prepTime: 8,
    preparationTime: '5-10 mins',
    dietary: ['veg'],
    description: '18-hour cold steeped single-origin Arabica coffee layered with sea salt caramel and oat milk.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-17',
    name: 'Gourmet Truffle Wood-Fired Pizza',
    category: 'fast-food',
    price: 590,
    rating: 4.8,
    prepTime: 18,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Hand-stretched sourdough pizza topped with fior di latte mozzarella, mushrooms, and truffle glaze.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-18',
    name: 'Amritsari Kulcha with Chole',
    category: 'breakfast',
    price: 290,
    rating: 4.7,
    prepTime: 15,
    preparationTime: '15 mins',
    dietary: ['veg'],
    description: 'Stuffed potato and paneer tandoori kulcha served with spicy Punjabi chickpeas and pickle.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-19',
    name: 'Signature Mango Passion Fruit Cooler',
    category: 'beverages',
    price: 190,
    rating: 4.8,
    prepTime: 5,
    preparationTime: '5 mins',
    dietary: ['veg'],
    description: 'Refreshing Alphonso mango puree blended with fresh passion fruit seed pulp and mint.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-20',
    name: 'Kerala Coconut Fish Curry',
    category: 'seafood',
    price: 520,
    rating: 4.7,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['non-veg'],
    description: 'Fresh kingfish steak simmered in kokum, mustard seeds, curry leaves, and coconut milk.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-21',
    name: 'Classic Mutton Seekh Kebab',
    category: 'kebabs',
    price: 490,
    rating: 4.8,
    prepTime: 20,
    preparationTime: '20 mins',
    dietary: ['non-veg'],
    description: 'Minced spiced lamb skewers grilled over charcoal, served with mint chutney and onion rings.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-22',
    name: 'Authentic Crispy Masala Dosa',
    category: 'breakfast',
    price: 190,
    rating: 4.9,
    prepTime: 12,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'Golden thin crepe stuffed with spiced potato mash, served with sambar and 3 coconut chutneys.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-23',
    name: 'Creamy Garlic Butter Naan',
    category: 'breads',
    price: 90,
    rating: 4.8,
    prepTime: 8,
    preparationTime: '8 mins',
    dietary: ['veg'],
    description: 'Soft leavened bread baked in tandoor, brushed generously with minced garlic and butter.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=85',
  },
  {
    id: 'h-24',
    name: 'Spanish Churros with Hot Chocolate Dip',
    category: 'desserts',
    price: 320,
    rating: 4.9,
    prepTime: 12,
    preparationTime: '10 mins',
    dietary: ['veg'],
    description: 'Crispy cinnamon sugar dusted churros paired with warm thick melted dark chocolate.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=85',
  },
];

const FILTER_TABS = [
  { id: 'all', label: '🍽️ All Dishes' },
  { id: 'breakfast', label: '🥞 Breakfast' },
  { id: 'soups', label: '🍲 Soups' },
  { id: 'veg-starters', label: '🥦 Veg Starters' },
  { id: 'non-veg-starters', label: '🍗 Non-Veg Starters' },
  { id: 'tandoor', label: '🏺 Tandoor' },
  { id: 'grill', label: '🔥 Grill' },
  { id: 'kebabs', label: '🍢 Kebabs' },
  { id: 'biryani', label: '🍲 Biryani' },
  { id: 'rice-pulao', label: '🍚 Rice & Pulao' },
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
      const storedDishes = getStoredDishes();
      if (storedDishes && storedDishes.length > 0) {
        const cleanDishes = storedDishes.filter((d) => {
          if ((d as any).isMerchantDish || d.merchantId) return true;
          return !/\bSpecial\s+\d+\b/i.test(d.name || '');
        }).slice(0, 30);
        if (cleanDishes.length > 0) {
          setCuratedDishes(cleanDishes);
        }
      }
    } catch (e) {}

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
    if (!dish) return false;
    const nameStr = (dish.name || '').toLowerCase();
    const descStr = (dish.description || '').toLowerCase();
    const searchStr = (search || '').toLowerCase();
    const matchesSearch = search === '' || nameStr.includes(searchStr) || descStr.includes(searchStr);

    let matchesTab = true;
    const dietaryList = Array.isArray(dish.dietary) ? dish.dietary : [];
    const catStr = (dish.category || '').toLowerCase();

    if (activeTab !== 'all') {
      const target = activeTab.toLowerCase().replace(/-/g, ' ');
      matchesTab = catStr === activeTab || catStr.includes(target) || catStr.replace(/-/g, ' ').includes(target);
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
                <button key={s} onClick={() => setSearch(s)} className="underline hover:text-white transition-colors cursor-pointer">{s}</button>
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
              onClick={() => { setActiveTab('all'); setSearch(''); }}
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
