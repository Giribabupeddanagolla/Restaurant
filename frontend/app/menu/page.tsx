'use client';

import { useState } from 'react';
import Image from 'next/image';
import { INITIAL_CATEGORIES, INITIAL_DISHES } from '@/data/mockData';
import { Search, Leaf } from 'lucide-react';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';
import AddButton from '@/components/AddButton';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [dietFilter,     setDietFilter]     = useState('all');
  const [selectedDish,   setSelectedDish]   = useState<MenuItem | null>(null);

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

        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-label">Our Artisanal Catalog</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Giri Menu</h1>
          <p className="text-sm text-[#6b5840] mt-2">Click any dish to see details, or hit Add to add it straight to your cart.</p>
          <hr className="divider-gold mt-6" />
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 mb-6 sm:mb-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-5 h-5" />
            <input
              type="text"
              placeholder="Search Truffle, Wagyu, Salmon, Pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-light pl-12"
            />
          </div>

          {/* Diet Filter Buttons - Full Width Stack on Mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {[
              { id: 'all',          label: 'All Diets' },
              { id: 'veg',          label: '🌱 Vegetarian' },
              { id: 'spicy',        label: '🔥 Spicy' },
              { id: 'chef-special', label: '⭐ Chef Special' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietFilter(diet.id)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 rounded-full text-sm sm:text-xs font-bold transition-all ${
                  dietFilter === diet.id
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'bg-[#F8F5F0] text-[#6b5840] hover:text-[#1a1008] border border-[#8B0000]/15'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills - Horizontal Scroll on Mobile */}
        <div className="mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-start">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap sm:whitespace-normal transition-all shrink-0 sm:shrink ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#8B0000] to-[#C8102E] text-white shadow-md'
                    : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB] border border-[#8B0000]/10'
                }`}
              >
                <span>{cat.icon}</span> 
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
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
                      <span className="text-lg sm:text-xl font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
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
