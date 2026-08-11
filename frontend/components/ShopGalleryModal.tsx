'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, MapPin, Phone, Star, Utensils, Sparkles, Eye } from 'lucide-react';
import { Shop } from '@/types';

interface ShopGalleryModalProps {
  shop: Shop | null;
  onClose: () => void;
  initialTab?: 'all' | 'dining' | 'kitchen';
}

interface GalleryItem {
  id: string;
  url: string;
  category: 'dining' | 'kitchen' | 'main';
  title: string;
  description: string;
}

export default function ShopGalleryModal({ shop, onClose, initialTab = 'all' }: ShopGalleryModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'dining' | 'kitchen'>(initialTab);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveTab(initialTab);
    setActiveImageIndex(0);
  }, [shop, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!shop) return null;

  // Build combined gallery items
  const mainImage: GalleryItem = {
    id: 'main-0',
    url: shop.image,
    category: 'main',
    title: `${shop.name} - Front Showcase`,
    description: 'Main outlet feature image & welcome view',
  };

  const diningItems: GalleryItem[] = (shop.diningImages && shop.diningImages.length > 0
    ? shop.diningImages
    : [shop.image]
  ).map((url, idx) => ({
    id: `dining-${idx}`,
    url,
    category: 'dining',
    title: `${shop.name} - Dining Area #${idx + 1}`,
    description: 'Luxury indoor seating, ambient lighting & guest comfort dining hall',
  }));

  const kitchenItems: GalleryItem[] = (shop.kitchenImages && shop.kitchenImages.length > 0
    ? shop.kitchenImages
    : ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80']
  ).map((url, idx) => ({
    id: `kitchen-${idx}`,
    url,
    category: 'kitchen',
    title: `${shop.name} - Live Kitchen #${idx + 1}`,
    description: 'Hygienic prep counters, artisanal wood-fired stoves & master chef culinary stations',
  }));

  // Combine and deduplicate images
  const allGallery: GalleryItem[] = [];
  const seenUrls = new Set<string>();

  [mainImage, ...diningItems, ...kitchenItems].forEach((item) => {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url);
      allGallery.push(item);
    }
  });

  const filteredGallery = allGallery.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'dining') return item.category === 'dining' || item.category === 'main';
    if (activeTab === 'kitchen') return item.category === 'kitchen';
    return true;
  });

  const safeIndex = Math.min(activeImageIndex, Math.max(0, filteredGallery.length - 1));
  const currentPhoto = filteredGallery[safeIndex] || allGallery[0];

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  const shopNameLower = (shop.name || '').toLowerCase();
  let categoryUrl = '/menu';
  if (shopNameLower.includes('fine dining')) categoryUrl = '/menu?shop=giri-fine-dining';
  else if (shopNameLower.includes('kitchen')) categoryUrl = '/menu?shop=giri-kitchen';
  else if (shopNameLower.includes('bakery')) categoryUrl = '/menu?shop=giri-bakery';
  else if (shopNameLower.includes('grill')) categoryUrl = '/menu?shop=giri-grill';
  else if (shopNameLower.includes('spice')) categoryUrl = '/menu?shop=giri-spice-garden';
  else if (shopNameLower.includes('café') || shopNameLower.includes('cafe')) categoryUrl = '/menu?shop=giri-cafe';
  else if (shopNameLower.includes('seafood')) categoryUrl = '/menu?shop=giri-seafood';

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        <div
          className="bg-[#14100C] text-white w-full max-w-5xl rounded-3xl shadow-2xl border border-[#8B0000]/30 flex flex-col max-h-[92vh] h-[780px] overflow-hidden relative animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#C8102E] flex items-center justify-center text-white font-black shadow-md">
                🏪
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  {shop.name}
                  {shop.isFeatured && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                      ⭐ Featured Outlet
                    </span>
                  )}
                </h2>
                <p className="text-xs text-amber-200/80 font-medium">
                  {shop.tagline || shop.tag || 'Restaurant Outlet & Ambience Gallery'}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gallery Category Tabs */}
          <div className="px-6 py-3 bg-[#1e1713] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setActiveImageIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> All Photos ({allGallery.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('dining');
                  setActiveImageIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dining'
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                🍷 Dining & Ambience ({diningItems.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('kitchen');
                  setActiveImageIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'kitchen'
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                🍳 Live Kitchen & Chefs ({kitchenItems.length})
              </button>
            </div>

            <div className="text-xs text-amber-200/80 font-bold hidden sm:flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{shop.rating} Rating</span> • <span>{shop.deliveryTime || '20-30 min'} delivery</span>
            </div>
          </div>

          {/* Main Photo Showcase Area */}
          <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[320px] overflow-hidden group">
            {currentPhoto && (
              <Image
                src={currentPhoto.url}
                alt={currentPhoto.title}
                fill
                className="object-contain p-2 transition-all duration-300 select-none"
                sizes="(max-width: 1200px) 100vw, 1000px"
                priority
              />
            )}

            {/* Left Prev Arrow */}
            {filteredGallery.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#8B0000] text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Next Arrow */}
            {filteredGallery.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#8B0000] text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Floating Photo Caption Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-white/10 backdrop-blur-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#8B0000] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    {currentPhoto?.category === 'dining' ? '🍷 Dining Room' : currentPhoto?.category === 'kitchen' ? '🍳 Live Kitchen' : '✨ Main Showcase'}
                  </span>
                  <span className="text-xs text-gray-300 font-bold">
                    {safeIndex + 1} of {filteredGallery.length}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white mt-1">{currentPhoto?.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-1">{currentPhoto?.description}</p>
              </div>

              <Link
                href={categoryUrl}
                onClick={onClose}
                className="btn-crimson text-xs px-4 py-2 rounded-xl font-extrabold flex items-center gap-1.5 shadow-md shrink-0"
              >
                <Utensils className="w-3.5 h-3.5" /> Order From {shop.name}
              </Link>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="p-4 bg-[#1a1410] border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {filteredGallery.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                    safeIndex === idx
                      ? 'border-[#8B0000] scale-105 shadow-lg shadow-[#8B0000]/40'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <Image src={item.url} alt={item.title} fill className="object-cover" sizes="80px" />
                  {item.category === 'dining' && (
                    <span className="absolute bottom-0.5 right-0.5 text-[10px] bg-black/70 px-1 rounded">🍷</span>
                  )}
                  {item.category === 'kitchen' && (
                    <span className="absolute bottom-0.5 right-0.5 text-[10px] bg-black/70 px-1 rounded">🍳</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info & Actions */}
          <div className="px-6 py-3 bg-black/50 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 text-xs text-gray-300 shrink-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#8B0000]" /> {shop.address || 'Downtown'}
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-[#C8A055]" /> {shop.phone || '+1 (555) 123-4567'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${shop.name} ${shop.address}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
              >
                📍 View Map
              </a>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-[#8B0000] hover:bg-[#A00000] text-white rounded-xl font-bold transition-all"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
