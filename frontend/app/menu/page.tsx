'use client';

import { useState } from 'react';
import Image from 'next/image';
import { INITIAL_CATEGORIES, INITIAL_DISHES } from '@/data/mockData';
import { Search, Plus, Check, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types';
import DishModal from '@/components/DishModal';

/* ── Quick-add button (stops propagation so card click still works) */
function AddButton({ dish }: { dish: MenuItem }) {
  const { addItem, items } = useCart();
  const [flashed, setFlashed] = useState(false);
  const inCart = items.find((i) => i.dish.id === dish.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // don't open modal
    addItem(dish);
    setFlashed(true);
    setTimeout(() => setFlashed(false), 1200);
  };

  return (
    <button
      onClick={handleAdd}
      className={`text-xs px-4 py-2 rounded-lg flex items-center gap-1 font-bold transition-all ${
        flashed ? 'bg-[#16603A] text-white scale-95' : 'btn-primary'
      }`}
    >
      {flashed
        ? <><Check className="w-3.5 h-3.5" /> Added!</>
        : <><Plus className="w-4 h-4" /> {inCart ? `Add (${inCart.qty})` : 'Add'}</>}
    </button>
  );
}

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
        <div className="flex flex-col gap-4 mb-8">
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

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all',          label: 'All Diets' },
              { id: 'veg',          label: '🌱 Vegetarian' },
              { id: 'spicy',        label: '🔥 Spicy' },
              { id: 'chef-special', label: '⭐ Chef Special' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietFilter(diet.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  dietFilter === diet.id
                    ? 'bg-[#8B0000] text-white shadow'
                    : 'bg-[#F8F5F0] text-[#6b5840] hover:text-[#1a1008] border border-[#8B0000]/15'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#8B0000] to-[#C8102E] text-white shadow-md'
                  : 'bg-[#F8F5F0] text-[#4a3820] hover:bg-[#FFF0EB] border border-[#8B0000]/10'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 text-[#a09070]">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-semibold">No dishes match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-[#F8F5F0] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#1a1008] shadow">
                    {dish.dietary.includes('veg')
                      ? <span className="flex items-center gap-1"><Leaf className="w-3 h-3 text-[#16603A]" /> Veg</span>
                      : '🥩 Non-Veg'}
                  </div>
                  {dish.dietary.includes('chef-special') && (
                    <div className="absolute top-3 right-3 bg-[#8B0000] px-2.5 py-1 rounded-full text-xs font-bold text-white">
                      ⭐ Special
                    </div>
                  )}
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[#8B0000] text-xs font-bold px-3 py-1.5 rounded-full shadow transition-all">
                      Tap to view details
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="font-extrabold text-[#1a1008] text-lg mb-1 group-hover:text-[#8B0000] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#6b5840] line-clamp-2 leading-relaxed">{dish.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xl font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
                      <span className="text-xs text-[#a09070] ml-2">• {dish.prepTime} min</span>
                    </div>
                    <AddButton dish={dish} />
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
