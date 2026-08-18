'use client';

import Link from 'next/link';
import { Star, Clock, MapPin, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Shop } from '@/types';

interface RestaurantInfoProps {
  shop?: Partial<Shop> | null;
  shopName?: string;
  shopId?: string;
  merchantId?: string;
  address?: string;
  city?: string;
  rating?: number;
  deliveryTime?: string;
  isOpen?: boolean;
  compact?: boolean;
  showViewButton?: boolean;
  onViewRestaurant?: () => void;
  className?: string;
}

export default function RestaurantInfo({
  shop,
  shopName,
  shopId,
  merchantId,
  address,
  city,
  rating,
  deliveryTime,
  isOpen = true,
  compact = false,
  showViewButton = true,
  onViewRestaurant,
  className = '',
}: RestaurantInfoProps) {
  const name = shopName || shop?.name || (shop as any)?.shopName || 'Giri Spice Garden';
  const displayAddress = address || shop?.address || 'Plot 42, Jubilee Hills Road No 36';
  const displayCity = city || shop?.city || 'Hyderabad';
  const displayRating = rating || shop?.rating || 4.8;
  const displayTime = deliveryTime || shop?.deliveryTime || shop?.time || '25-35 min';
  const logoUrl = shop?.image || (shop as any)?.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=85';
  const sId = shopId || shop?.id || shop?._id || merchantId || encodeURIComponent(name);
  const targetHref = `/menu?shop=${encodeURIComponent(name)}&shopId=${encodeURIComponent(sId)}`;

  if (compact) {
    return (
      <div className={`flex items-center justify-between gap-3 text-xs ${className}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg overflow-hidden relative shrink-0 border border-[#8B0000]/15 bg-[#F8F5F0]">
            <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-[#1a1008] truncate hover:text-[#8B0000] transition-colors">
              🏪 {name}
            </div>
            <div className="text-[10px] text-[#6b5840] truncate flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-[#8B0000] shrink-0" /> {displayCity}
            </div>
          </div>
        </div>

        {showViewButton && (
          <Link
            href={targetHref}
            onClick={onViewRestaurant}
            className="text-[11px] font-extrabold text-[#8B0000] hover:underline shrink-0 flex items-center gap-0.5 bg-[#FFF8F0] px-2 py-1 rounded-lg border border-[#8B0000]/15"
          >
            View Shop <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl p-4 bg-white border border-[#8B0000]/15 shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border-2 border-[#C8A055]/30 bg-[#F8F5F0] shadow-xs">
            <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#1a1008] truncate hover:text-[#8B0000] transition-colors">
                {name}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <p className="text-xs text-[#6b5840] truncate flex items-center gap-1 font-medium mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0" /> {displayAddress}, {displayCity}
            </p>
          </div>
        </div>

        {showViewButton && (
          <Link
            href={targetHref}
            onClick={onViewRestaurant}
            className="btn-crimson py-1.5 px-3 rounded-xl text-xs font-extrabold shrink-0 shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" /> View Menu
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs font-bold text-[#4a3820] pt-2 border-t border-[#8B0000]/10">
        <span className="flex items-center gap-1 text-[#C8A055]">
          <Star className="w-3.5 h-3.5 fill-[#C8A055]" /> {displayRating}
        </span>
        <span className="flex items-center gap-1 text-[#6b5840]">
          <Clock className="w-3.5 h-3.5 text-[#8B0000]" /> {displayTime}
        </span>
        <span className="flex items-center gap-1 text-emerald-700 ml-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Merchant
        </span>
      </div>
    </div>
  );
}
