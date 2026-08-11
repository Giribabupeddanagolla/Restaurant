'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INITIAL_CATEGORIES, INITIAL_DISHES, getStoredDishes, saveStoredDishes } from '@/data/mockData';
import { Search, Leaf, Menu, X, Store, ArrowLeft } from 'lucide-react';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';
import AddButton from '@/components/AddButton';
import { formatCurrency } from '@/utils/formatters';
import { menuApi } from '@/services/restaurantService';

const SHOP_INFO: Record<string, { title: string; tagline: string; icon: string; bg: string }> = {
  'giri-fine-dining':  { title: 'Giri Fine Dining', tagline: 'Signature Experience & Fine Dining Specials', icon: '🍷', bg: 'from-[#8B0000] to-[#500000]' },
  'giri-kitchen':      { title: 'Giri Kitchen', tagline: 'Home Comfort Food, Alfredo Pastas & Soups', icon: '🍲', bg: 'from-[#16603A] to-[#0D4A2D]' },
  'giri-bakery':       { title: 'Giri Bakery', tagline: 'Artisanal Pastries, Tiramisu & Desserts', icon: '🥐', bg: 'from-[#C8A055] to-[#8C6F32]' },
  'giri-grill':        { title: 'Giri Grill', tagline: 'Smoked Wagyu Burgers, Ribs & Pizzas', icon: '🔥', bg: 'from-[#C8102E] to-[#8B0000]' },
  'giri-spice-garden': { title: 'Giri Spice Garden', tagline: 'Authentic Indian Curries & Asian Delicacies', icon: '🍛', bg: 'from-[#D97706] to-[#92400E]' },
  'giri-cafe':         { title: 'Giri Café', tagline: 'Cold Brew Coffee & Signature Mixes', icon: '☕', bg: 'from-[#4B5563] to-[#1F2937]' },
  'giri-seafood':      { title: 'Giri Seafood & Lounge', tagline: 'Fresh Norwegian Salmon & Coastal Delicacies', icon: '🍤', bg: 'from-[#0284C7] to-[#0369A1]' },
};

function MenuContent() {
  const searchParams = useSearchParams();
  const shopParam = searchParams.get('shop');
  const catParam = searchParams.get('category');

  const [dishes, setDishes] = useState<MenuItem[]>(INITIAL_DISHES);
  const [activeCategory, setActiveCategory] = useState(catParam || 'all');
  const [activeShop, setActiveShop] = useState<string | null>(shopParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    if (shopParam) {
      setActiveShop(shopParam);
    } else if (catParam) {
      setActiveCategory(catParam);
    }
  }, [shopParam, catParam]);

  // Load dynamically stored/created dishes immediately
  useEffect(() => {
    const stored = getStoredDishes();
    if (stored && stored.length > 0) {
      setDishes(stored);
    }
    menuApi.getDishes()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setDishes(res.data);
          saveStoredDishes(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setActiveShop(null);
    }
  };

  const currentShopInfo = activeShop ? SHOP_INFO[activeShop] : null;

  const filteredDishes = dishes.filter((dish) => {
    let matchShop = true;
    if (activeShop) {
      const dShop = (dish.shopSlug || '').toLowerCase();
      const dName = (dish.shopName || '').toLowerCase();

      if (activeShop === 'giri-fine-dining') {
        matchShop = dShop === 'giri-fine-dining' || dName.includes('fine dining');
      } else if (activeShop === 'giri-kitchen') {
        matchShop = dShop === 'giri-kitchen' || dName.includes('kitchen');
      } else if (activeShop === 'giri-bakery') {
        matchShop = dShop === 'giri-bakery' || dName.includes('bakery');
      } else if (activeShop === 'giri-grill') {
        matchShop = dShop === 'giri-grill' || dName.includes('grill');
      } else if (activeShop === 'giri-spice-garden') {
        matchShop = dShop === 'giri-spice-garden' || dName.includes('spice');
      } else if (activeShop === 'giri-cafe') {
        matchShop = dShop === 'giri-cafe' || dName.includes('caf');
      } else if (activeShop === 'giri-seafood') {
        matchShop = dShop === 'giri-seafood' || dName.includes('seafood');
      } else {
        matchShop = dShop === activeShop;
      }
    }

    let matchCategory = true;
    if (activeCategory !== 'all' && !activeShop) {
      matchCategory = dish.category === activeCategory;
    }

    const matchSearch = !searchQuery ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDiet = dietFilter === 'all' || (dish.dietary && dish.dietary.includes(dietFilter));

    return matchShop && matchCategory && matchSearch && matchDiet;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search Bar with 3-Lines Categories & Filter Dropdown */}
        <div className="relative w-full mb-6 sm:mb-8 z-30">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4 pointer-events-none" />

            <input
              type="text"
              placeholder={currentShopInfo ? `Search within ${currentShopInfo.title}...` : "Search dishes, ingredients, or cuisines..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
            />

            {/* Right Action Icons: Clear & Frameless 3-Lines Menu Icon */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Frameless 3-Lines Menu Icon Button */}
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                  showFilterMenu ? 'text-[#8B0000] bg-[#8B0000]/15' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
                }`}
                title="Toggle Categories & Filters"
                aria-label="Toggle Categories & Filters"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Filter Menu Dropdown */}
          {showFilterMenu && (
            <>
              <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowFilterMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#8B0000]/15 rounded-2xl p-4 shadow-xl z-50 animate-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2 mb-3">
                  <span className="text-xs font-extrabold text-[#1a1008] uppercase tracking-wider">Filter Menu</span>
                  <button onClick={() => setShowFilterMenu(false)} className="text-gray-400 hover:text-[#8B0000]">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Dietary Filter Options */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block">Dietary Options</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'veg', label: '🌱 Veg' },
                      { id: 'non-veg', label: '🍖 Non-Veg' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setDietFilter(d.id);
                          setShowFilterMenu(false);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                          dietFilter === d.id
                            ? 'bg-[#8B0000] text-white shadow-xs'
                            : 'bg-[#F8F5F0] text-[#6b5840] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#a09070] uppercase tracking-wider block">Food Categories</span>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {INITIAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleSelectCategory(cat.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                          activeCategory === cat.id
                            ? 'bg-[#8B0000] text-white'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span>{cat.icon} {cat.name}</span>
                        {activeCategory === cat.id && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Category Header Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a1008] capitalize">
              {currentShopInfo ? `${currentShopInfo.title} Dishes` : INITIAL_CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Menu Dishes'}
            </h1>
            <p className="text-xs text-[#a09070] mt-0.5 font-medium">
              Showing {filteredDishes.length} gourmet dish options
            </p>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#8B0000]/10 p-8">
            <p className="text-4xl mb-3">🍽️</p>
            <h3 className="text-base font-bold text-[#1a1008]">No dishes found</h3>
            <p className="text-xs text-[#a09070] mt-1">Try selecting another category or resetting your search filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveShop(null);
                setSearchQuery('');
                setDietFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#8B0000] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#A00000] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDishes.map((dish, idx) => (
              <div
                key={dish.id || (dish as any)._id || idx}
                onClick={() => setSelectedDish(dish)}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#8B0000]/10 bg-white cursor-pointer"
              >
                {/* Dish Image */}
                <div
                  className="relative h-44 sm:h-48 w-full bg-[#F8F5F0] overflow-hidden shrink-0"
                  style={{ position: 'relative', width: '100%', height: '192px', overflow: 'hidden' }}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Dietary Tag Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    {dish.dietary?.includes('veg') && (
                      <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    )}
                    {dish.dietary?.includes('non-veg') && (
                      <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        🍖 Non-Veg
                      </span>
                    )}
                    {dish.dietary?.includes('chef-special') && (
                      <span className="bg-[#C8A055]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        ⭐ Special
                      </span>
                    )}
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
                  <div className="cursor-pointer" onClick={() => setSelectedDish(dish)}>
                    <h3 className="font-extrabold text-base text-[#1a1008] group-hover:text-[#8B0000] transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed mt-1">{dish.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#8B0000]/10 gap-2 sm:gap-3">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-extrabold text-[#8B0000]">
                        {formatCurrency(dish.price)}
                      </span>
                      <span className="text-[11px] font-semibold text-[#a09070] mt-0.5">
                        ⏱️ {dish.prepTime} min prep
                      </span>
                    </div>
                    <AddButton dish={dish} variant="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dish detail modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-[#8B0000] font-bold">
        Loading Menu...
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}

