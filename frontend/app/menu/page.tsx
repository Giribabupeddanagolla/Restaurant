'use client';

import { useState } from 'react';
import Image from 'next/image';
import { INITIAL_CATEGORIES, INITIAL_DISHES } from '@/data/mockData';
import { Search, Leaf, Menu, X } from 'lucide-react';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';
import AddButton from '@/components/AddButton';
import { formatCurrency } from '@/utils/formatters';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [dietFilter,     setDietFilter]     = useState('all');
  const [selectedDish,   setSelectedDish]   = useState<MenuItem | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredDishes = INITIAL_DISHES.filter((dish) => {
    const matchCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchSearch   = !searchQuery ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDiet = dietFilter === 'all' || dish.dietary.includes(dietFilter);
    return matchCategory && matchSearch && matchDiet;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search Bar with 3-Lines Categories & Filter Dropdown */}
        <div className="relative w-full mb-6 sm:mb-8 z-30">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-5 h-5 z-10 pointer-events-none" />

            <input
              type="text"
              placeholder="Search dishes, ingredients, or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#8B0000]/20 text-[#1a1008] rounded-full pl-12 pr-14 py-3 text-sm font-semibold placeholder:text-[#a09070]/70 outline-none focus:ring-2 focus:ring-[#8B0000] shadow-sm"
            />

            {/* Vertical Divider */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[1px] h-5 bg-[#8B0000]/20 z-10 pointer-events-none" />

            {/* Three Lines Menu / Filter Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-20 flex items-center justify-center cursor-pointer ${
                showFilterMenu ? 'bg-[#8B0000] text-white shadow-md' : 'text-[#8B0000] hover:bg-[#8B0000]/10'
              }`}
              title="Toggle Menu Categories & Filters"
              aria-label="Toggle categories and filters"
            >
              {showFilterMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Floating Categories & Filters Popover Dropdown Menu */}
          {showFilterMenu && (
            <>
              {/* Backdrop Listener */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowFilterMenu(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#8B0000]/20 shadow-2xl z-50 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] overflow-y-auto">
                
                {/* Categories Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-1.5">
                    <span className="text-[11px] font-extrabold text-[#8B0000] uppercase tracking-wider flex items-center gap-1.5">
                      <Menu className="w-3.5 h-3.5" /> Menu Categories
                    </span>
                    {activeCategory !== 'all' && (
                      <button
                        onClick={() => setActiveCategory('all')}
                        className="text-[10px] text-[#8B0000] font-bold hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {INITIAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          activeCategory === cat.id
                            ? 'bg-[#8B0000] text-white font-extrabold shadow-sm'
                            : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        {activeCategory === cat.id && <span className="text-white font-extrabold text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Filters Section */}
                <div className="space-y-2 pt-2 border-t border-[#8B0000]/10">
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="text-[11px] font-extrabold text-[#8B0000] uppercase tracking-wider">
                      Dietary Preferences
                    </span>
                    {dietFilter !== 'all' && (
                      <button
                        onClick={() => setDietFilter('all')}
                        className="text-[10px] text-[#8B0000] font-bold hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all',          label: 'All Diets' },
                      { id: 'veg',          label: '🌱 Vegetarian' },
                      { id: 'spicy',        label: '🔥 Spicy' },
                      { id: 'chef-special', label: '⭐ Special' },
                    ].map((diet) => (
                      <button
                        key={diet.id}
                        onClick={() => {
                          setDietFilter(diet.id);
                          setShowFilterMenu(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
                          dietFilter === diet.id
                            ? 'bg-[#8B0000] text-white shadow-xs'
                            : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                        }`}
                      >
                        {diet.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowFilterMenu(false)}
                  className="w-full py-2 bg-[#F8F5F0] hover:bg-[#8B0000]/10 text-[#8B0000] font-extrabold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Close Menu
                </button>

              </div>
            </>
          )}
        </div>

        {/* Dish Grid - Mobile Optimized */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 sm:py-20 text-[#a09070]">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-semibold">No dishes match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="glass-card rounded-lg sm:rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all cursor-pointer group active:shadow-md sm:active:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-48 w-full bg-[#F8F5F0] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 active:scale-105 sm:active:scale-100 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold text-[#1a1008] shadow">
                    {dish.dietary.includes('veg')
                      ? <span className="flex items-center gap-1"><Leaf className="w-3 h-3 text-[#16603A]" /> Veg</span>
                      : '🥩 Non-Veg'}
                  </div>
                  {dish.dietary.includes('chef-special') && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#8B0000] px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold text-white">
                      ⭐ Special
                    </div>
                  )}
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center hidden sm:flex">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[#8B0000] text-xs font-bold px-3 py-1.5 rounded-full shadow transition-all">
                      Tap to view details
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-5 flex flex-col flex-1 gap-2 sm:gap-4">
                  <div>
                    <h3 className="font-extrabold text-[#1a1008] text-base sm:text-lg mb-0.5 sm:mb-1 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed">{dish.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto gap-2 sm:gap-3">
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl font-extrabold text-[#8B0000]">{formatCurrency(dish.price)}</span>
                      <span className="text-xs text-[#a09070]">{dish.prepTime} min</span>
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
