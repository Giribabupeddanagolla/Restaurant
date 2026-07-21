'use client';

import { PUBLIC_OFFERS } from '@/data/mockData';
import { Copy, Tag } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="section-label">Special Promotions</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Offers & Promo Deals</h1>
        <p className="text-sm text-[#6b5840] mt-2">Claim promo codes at checkout for instant discounts on your order.</p>
        <hr className="divider-gold mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PUBLIC_OFFERS.map((offer) => (
          <div key={offer.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-dashed border-[#C8A055]/40 hover:shadow-lg transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold border border-[#8B0000]/15">
                  {offer.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#a09070]">
                  <Tag className="w-3.5 h-3.5" /> {offer.expiry}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1a1008] mb-2">{offer.title}</h3>
              <p className="text-xs text-[#6b5840] leading-relaxed mb-6">{offer.description}</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#C8A055]/20">
              <button
                onClick={() => { navigator.clipboard.writeText(offer.code); alert(`Copied: ${offer.code}`); }}
                className="bg-[#FFF8F0] border border-[#C8A055]/50 text-[#8B6914] px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:bg-[#C8A055]/10 transition-colors"
              >
                <span>{offer.code}</span>
                <Copy className="w-3.5 h-3.5" />
              </button>
              <Link href="/menu" className="btn-crimson text-xs px-5 py-2 rounded-xl font-bold">
                Use Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Loyalty banner */}
      <div className="mt-10 rounded-2xl p-8 text-center bg-gradient-to-br from-[#FFF8F0] to-[#FFF0E8] border border-[#C8A055]/30">
        <p className="text-2xl mb-2">🌟</p>
        <h3 className="text-lg font-extrabold text-[#1a1008] mb-2">Loyalty Members Get More</h3>
        <p className="text-sm text-[#6b5840] max-w-md mx-auto mb-5">
          Sign up for Giri Rewards and earn points on every order — redeem them for free dishes and exclusive deals.
        </p>
        <Link href="/contact" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-bold inline-block">
          Join Giri Rewards →
        </Link>
      </div>
    </div>
  );
}
