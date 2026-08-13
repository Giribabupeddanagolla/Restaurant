'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INITIAL_SHOPS, getStoredShops, saveStoredShops } from '@/data/mockData';
import { Shop } from '@/types';
import { shopApi } from '@/services/restaurantService';
import ShopGalleryModal from '@/components/ShopGalleryModal';
import { MapPin, Phone, Clock, Star, Search, ExternalLink, Utensils, CheckCircle, XCircle, Menu, X, Camera, Eye, Images } from 'lucide-react';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Photo Gallery Modal State
  const [selectedGalleryShop, setSelectedGalleryShop] = useState<Shop | null>(null);
  const [galleryTab, setGalleryTab] = useState<'all' | 'dining' | 'kitchen'>('all');

  useEffect(() => {
    const stored = getStoredShops();
    if (stored && stored.length > 0) {
      setShops(stored);
    }
    shopApi.getShops()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setShops(res.data);
          saveStoredShops(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openGallery = (shop: Shop, tab: 'all' | 'dining' | 'kitchen' = 'all') => {
    setSelectedGalleryShop(shop);
    setGalleryTab(tab);
  };

  const cities = ['all', ...Array.from(new Set(shops.map((s) => s.city || 'Metropolitan City')))];

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      search === '' ||
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      (shop.tagline && shop.tagline.toLowerCase().includes(search.toLowerCase())) ||
      (shop.address && shop.address.toLowerCase().includes(search.toLowerCase()));

    const matchesCity = selectedCity === 'all' || (shop.city || 'Metropolitan City') === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#C8102E] text-white p-8 md:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format')] bg-cover bg-center" />
        <div className="relative z-10 max-w-2xl flex flex-col gap-3">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full w-fit">
            📍 Our Branches & Outlets
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Best Shops & Locations
          </h1>
          <p className="text-red-100 text-sm md:text-base leading-relaxed">
            Find a Giri Restaurant outlet near you. Click on any shop image to view rich photo galleries of our dining halls, live kitchens, and master chef setups!
          </p>
        </div>
      </div>

      {/* Search Bar with 3-Lines City & Location Filter Dropdown */}
      <div className="relative w-full mb-2 z-30">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B0000] w-4 h-4 pointer-events-none" />

          <input
            type="text"
            placeholder="Search by shop name, tagline, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
          />

          {/* Right Action Icons: Clear & Three-Lines Filter Button */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-1 rounded-full text-gray-400 hover:text-[#8B0000] hover:bg-black/5 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Frameless 3-Lines Icon Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                showFilterMenu
                  ? 'text-[#8B0000] bg-[#8B0000]/15'
                  : 'text-[#8B0000] hover:bg-[#8B0000]/10'
              }`}
              title="Toggle Location & City Filters"
              aria-label="Toggle location and city filters"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating City & Location Popover Dropdown Menu */}
        {showFilterMenu && (
          <>
            {/* Backdrop Listener */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowFilterMenu(false)}
            />

            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-[#8B0000]/20 shadow-2xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-[11px] font-extrabold text-[#8B0000] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Filter By City
                </span>
                {selectedCity !== 'all' && (
                  <button
                    onClick={() => setSelectedCity('all')}
                    className="text-[10px] text-[#8B0000] font-bold hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1 pt-1">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between capitalize transition-colors cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#8B0000] text-white font-extrabold shadow-xs'
                        : 'text-[#4a3820] hover:bg-[#FFF0EB] hover:text-[#8B0000]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🏙️</span>
                      <span>{city === 'all' ? 'All Cities & Outlets' : city}</span>
                    </span>
                    {selectedCity === city && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map((shop, idx) => {
          const shopName = (shop.name || '').toLowerCase();
          let categoryUrl = '/menu';
          if (shopName.includes('fine dining')) categoryUrl = '/menu?shop=giri-fine-dining';
          else if (shopName.includes('kitchen')) categoryUrl = '/menu?shop=giri-kitchen';
          else if (shopName.includes('bakery')) categoryUrl = '/menu?shop=giri-bakery';
          else if (shopName.includes('grill')) categoryUrl = '/menu?shop=giri-grill';
          else if (shopName.includes('spice')) categoryUrl = '/menu?shop=giri-spice-garden';
          else if (shopName.includes('café') || shopName.includes('cafe')) categoryUrl = '/menu?shop=giri-cafe';
          else if (shopName.includes('seafood')) categoryUrl = '/menu?shop=giri-seafood';
          else if (shopName.includes('express') || shopName.includes('bistro')) categoryUrl = '/menu?shop=giri-express-bistro';

          const diningCount = shop.diningImages ? shop.diningImages.length : 1;
          const kitchenCount = shop.kitchenImages ? shop.kitchenImages.length : 1;
          const totalPhotos = diningCount + kitchenCount;

          return (
            <div
              key={shop._id || shop.id || idx}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#8B0000]/10"
            >
              {/* Image & Clickable Lightbox Overlay */}
              <div
                onClick={() => openGallery(shop, 'all')}
                className="relative h-52 w-full bg-[#F8F5F0] block overflow-hidden cursor-pointer group/img"
                title={`Click image to view photos of ${shop.name}`}
              >
                <img
                  src={shop.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85'}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 group-hover/img:from-black/80 transition-all" />

                {/* Hover Center Badge: "Click to View Gallery" */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#8B0000] flex items-center justify-center shadow-xl mb-2 group-hover/img:scale-110 transition-transform">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40">
                    📷 Click to View Photos
                  </span>
                  <span className="text-[11px] font-semibold text-amber-200 mt-1">
                    Dining Room ({diningCount}) • Live Kitchen ({kitchenCount})
                  </span>
                </div>

                {/* Status Badge Top Left */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  {shop.isOpen !== false ? (
                    <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <CheckCircle className="w-3 h-3" /> Open Now
                    </span>
                  ) : (
                    <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <XCircle className="w-3 h-3" /> Closed
                    </span>
                  )}
                  {shop.isFeatured && (
                    <span className="bg-[#C8A055]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Camera Gallery Counter Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(shop, 'all');
                  }}
                  className="absolute top-3 right-3 bg-black/75 hover:bg-[#8B0000] backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/30 shadow-md transition-colors z-10"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-300" /> {totalPhotos} Photos
                </button>

                {/* Rating & Delivery Time Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold z-10">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/20">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {shop.rating}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-red-300" /> {shop.deliveryTime || shop.time || '20-30 min'}
                  </span>
                </div>
              </div>

              {/* Shop Details */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex justify-between items-start">
                  <Link href={categoryUrl} className="block cursor-pointer">
                    <h3 className="font-extrabold text-lg text-[#1a1008] group-hover:text-[#8B0000] transition-colors">
                      {shop.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8B0000] mt-0.5">
                      {shop.tagline || shop.tag || 'Fine Dining & Takeaway'}
                    </p>
                  </Link>
                </div>

                {/* Quick Photo Category Pills: Click to view Dining or Kitchen Photos directly */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={() => openGallery(shop, 'dining')}
                    className="px-2.5 py-1 bg-[#FFF0EB] hover:bg-[#8B0000] hover:text-white border border-[#8B0000]/20 rounded-lg text-[11px] font-bold text-[#8B0000] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    🍷 Dining Photos ({diningCount})
                  </button>
                  <button
                    onClick={() => openGallery(shop, 'kitchen')}
                    className="px-2.5 py-1 bg-[#F0FAF4] hover:bg-[#16603A] hover:text-white border border-[#16603A]/20 rounded-lg text-[11px] font-bold text-[#16603A] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    🍳 Kitchen Photos ({kitchenCount})
                  </button>
                </div>

                <div className="flex flex-col gap-2 text-xs text-[#6b5840] pt-2 border-t border-[#8B0000]/10">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                    <span>{shop.address || 'Central District, Metropolitan City'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C8A055] shrink-0" />
                    <span>{shop.phone || '+1 (555) 987-6543'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#16603A] shrink-0" />
                    <span>Hours: {shop.openingHours || '11:00 AM – 11:00 PM'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-3 flex gap-2">
                  <Link
                    href={categoryUrl}
                    className="flex-1 btn-crimson py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Utensils className="w-3.5 h-3.5" /> View Category Menu
                  </Link>
                  {shop.mapUrl ? (
                    <a
                      href={shop.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 border border-[#8B0000]/30 text-[#8B0000] rounded-xl text-xs font-bold hover:bg-[#8B0000]/10 flex items-center justify-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Map
                    </a>
                  ) : (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${shop.name} ${shop.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 border border-[#8B0000]/30 text-[#8B0000] rounded-xl text-xs font-bold hover:bg-[#8B0000]/10 flex items-center justify-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Map
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredShops.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <p className="text-4xl mb-2">📍</p>
          <h3 className="text-lg font-bold text-[#1a1008]">No shop locations found</h3>
          <p className="text-xs text-[#6b5840] mt-1">Try adjusting your search criteria or city filter.</p>
        </div>
      )}

      {/* Render Image Gallery Lightbox Modal when selected */}
      {selectedGalleryShop && (
        <ShopGalleryModal
          shop={selectedGalleryShop}
          initialTab={galleryTab}
          onClose={() => setSelectedGalleryShop(null)}
        />
      )}
    </div>
  );
}

