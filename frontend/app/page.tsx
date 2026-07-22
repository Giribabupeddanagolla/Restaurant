'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { INITIAL_DISHES, INITIAL_CATEGORIES } from '@/data/mockData';
import { Search, ChevronLeft, ChevronRight, Star, Clock, Leaf } from 'lucide-react';
import { MenuItem } from '@/types';
import dynamic from 'next/dynamic';
import AddButton from '@/components/AddButton';

// Lazy load modal - improves page transition speed
const DishModal = dynamic(() => import('@/components/DishModal'), { ssr: false });

const CATEGORY_IMAGES: Record<string, string> = {
  all:      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&auto=format&fit=crop&q=80',
  specials: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&auto=format&fit=crop&q=80',
  starters: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&auto=format&fit=crop&q=80',
  mains:    'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&auto=format&fit=crop&q=80',
  pizzas:   'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&auto=format&fit=crop&q=80',
  desserts: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&auto=format&fit=crop&q=80',
  drinks:   'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&auto=format&fit=crop&q=80',
};

const SHOPS = [
  { name: 'Giri Fine Dining',  tag: 'Signature Experience', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.9, time: '30–40 min' },
  { name: 'Giri Kitchen',      tag: 'Home Comfort Food',    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.7, time: '20–30 min' },
  { name: 'Giri Bakery',       tag: 'Pastries & Desserts',  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.8, time: '15–20 min' },
  { name: 'Giri Grill',        tag: 'BBQ & Mains',          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.6, time: '25–35 min' },
  { name: 'Giri Spice Garden', tag: 'Indian & Asian',       image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.7, time: '20–30 min' },
  { name: 'Giri Café',         tag: 'Coffee & Snacks',      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=360&auto=format&fit=crop&q=80', rating: 4.5, time: '10–15 min' },
];

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });

  return (
    <div className="relative">
      <button onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
        aria-label="scroll left"
      ><ChevronLeft className="w-4 h-4" /></button>

      <div
        ref={ref}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {children}
      </div>

      <button onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
        aria-label="scroll right"
      ><ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredDishes = INITIAL_DISHES.filter(
    (d) => search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-12 pb-16">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] to-[#C8102E] text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 w-full">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase w-fit">
              ✦ Good Food, Great Experience
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
              Authentic Flavours,<br />Delivered Fresh to You
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-lg leading-relaxed">
              Explore Giri Restaurant's full menu — from chef specials to desserts — all made with organic ingredients and served with genuine warmth.
            </p>

            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#a09070]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for dishes, cuisines..."
                className="w-full bg-white text-[#1a1008] rounded-2xl pl-11 pr-10 py-3 sm:py-3.5 text-sm font-medium shadow-lg outline-none placeholder-[#a09070] focus:ring-2 focus:ring-[#C8A055]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] text-sm font-bold">✕</button>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 flex-wrap text-[10px] sm:text-xs text-red-100 font-medium">
              <span>🔥 Popular:</span>
              {['Wagyu Burger', 'Truffle Risotto', 'Lava Cake', 'Thai Curry'].map((s) => (
                <button key={s} onClick={() => setSearch(s)} className="underline hover:text-white transition-colors">{s}</button>
              ))}
            </div>
          </div>

          <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 hidden md:block">
            <Image 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&auto=format&fit=crop&q=85" 
              alt="Giri signature dish" 
              fill 
              priority
              className="object-cover" 
              sizes="400px"
            />
          </div>
        </div>
      </section>

      {/* Search results */}
      {search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="text-lg font-extrabold text-[#1a1008] mb-4">
            Results for &ldquo;{search}&rdquo; ({filteredDishes.length})
          </h2>
          {filteredDishes.length === 0 ? (
            <div className="text-center py-10 text-[#a09070]">
              <p className="text-3xl mb-2">🍽️</p>
              <p className="font-semibold">No dishes found. Try a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-40 w-full bg-[#F8F5F0]">
                    <Image 
                      src={dish.image} 
                      alt={dish.name} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-bold text-[#1a1008] text-sm line-clamp-1">{dish.name}</h3>
                    <p className="text-xs text-[#6b5840] line-clamp-1">{dish.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
                      <AddButton dish={dish} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Category cards */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-extrabold text-[#1a1008]">Inspiration for your first order</h2>
            <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline">View all</Link>
          </div>
          <ScrollRow>
            {INITIAL_CATEGORIES.map((cat) => (
              <Link key={cat.id} href="/menu" className="shrink-0 flex flex-col items-center gap-2 group">
                <div className="relative w-24 h-20 sm:w-36 sm:h-28 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#8B0000] transition-all shadow-sm">
                  <Image 
                    src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.all} 
                    alt={cat.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 96px, 144px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#1a1008] text-center group-hover:text-[#8B0000] transition-colors max-w-[90px] sm:max-w-none">
                  {cat.icon} {cat.name}
                </span>
              </Link>
            ))}
          </ScrollRow>
        </section>
      )}

      {/* Best Shops */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-extrabold text-[#1a1008]">Best Shops</h2>
            <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline">See all</Link>
          </div>
          <ScrollRow>
            {SHOPS.map((shop) => (
              <Link key={shop.name} href="/menu" className="shrink-0 w-56 glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all block group">
                <div className="relative h-36 w-full bg-[#F8F5F0]">
                  <Image 
                    src={shop.image} 
                    alt={shop.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="224px"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-extrabold text-[#1a1008] text-sm">{shop.name}</h3>
                  <p className="text-xs text-[#6b5840] mt-0.5">{shop.tag}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-[#C8A055]">
                      <Star className="w-3.5 h-3.5 fill-[#C8A055]" /> {shop.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#a09070]">
                      <Clock className="w-3 h-3" /> {shop.time}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollRow>
        </section>
      )}

      {/* Popular Dishes */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-extrabold text-[#1a1008]">Popular Dishes</h2>
            <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline">View full menu →</Link>
          </div>
          <ScrollRow>
            {INITIAL_DISHES.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="shrink-0 w-52 glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="relative h-36 w-full bg-[#F8F5F0] overflow-hidden">
                  <Image 
                    src={dish.image} 
                    alt={dish.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="208px"
                  />
                  {dish.dietary.includes('chef-special') && (
                    <span className="absolute top-2 left-2 bg-[#8B0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">⭐ Special</span>
                  )}
                  {dish.dietary.includes('veg') && (
                    <span className="absolute top-2 right-2 bg-white/90 text-[#16603A] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#16603A]/20">
                      <Leaf className="w-2.5 h-2.5 inline" /> Veg
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <h3 className="font-extrabold text-[#1a1008] text-sm line-clamp-1 group-hover:text-[#8B0000] transition-colors">{dish.name}</h3>
                  <p className="text-xs text-[#6b5840] mt-0.5 line-clamp-1">{dish.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
                    <AddButton dish={dish} />
                  </div>
                </div>
              </div>
            ))}
          </ScrollRow>
        </section>
      )}

      {/* Signature Dishes */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <div>
              <span className="section-label">Chef Selection</span>
              <h2 className="text-xl font-extrabold text-[#1a1008] mt-0.5">Signature Dishes</h2>
            </div>
            <Link href="/menu" className="text-sm font-bold text-[#8B0000] hover:underline">See all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INITIAL_DISHES.filter((d) => d.dietary.includes('chef-special')).map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="relative h-52 w-full bg-[#F8F5F0] overflow-hidden">
                  <Image 
                    src={dish.image} 
                    alt={dish.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-[#8B0000] text-white text-xs font-bold px-2.5 py-1 rounded-full">⭐ Chef Special</span>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-[#1a1008] text-lg mb-1 group-hover:text-[#8B0000] transition-colors">{dish.name}</h3>
                  <p className="text-xs text-[#6b5840] line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-extrabold text-[#8B0000]">${dish.price.toFixed(2)}</span>
                    <AddButton dish={dish} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Offers Banner */}
      {!search && (
        <section className="max-w-7xl mx-auto px-4 w-full">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E8] border border-[#C8A055]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="section-label">Limited Time</span>
              <h2 className="text-2xl font-extrabold text-[#1a1008] mt-1 mb-2">Exclusive Offers Just for You</h2>
              <p className="text-sm text-[#6b5840] max-w-sm leading-relaxed">
                Use code <span className="font-bold text-[#8B0000]">GIRI20</span> for 20% off your first order, or{' '}
                <span className="font-bold text-[#8B0000]">WAGYU2FOR1</span> for buy-1-get-1 Wagyu Burgers.
              </p>
            </div>
            <Link href="/offers" className="btn-crimson px-8 py-3.5 rounded-xl text-sm font-extrabold whitespace-nowrap shrink-0">
              🎁 View All Offers
            </Link>
          </div>
        </section>
      )}

      {/* Modal - lazy loaded only when needed */}
      {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}

    </div>
  );
}
