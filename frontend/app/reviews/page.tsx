'use client';

import { useState, useRef, useEffect } from 'react';
import { PUBLIC_REVIEWS, getStoredReviews, saveStoredReviews } from '@/data/mockData';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Review } from '@/types';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  // Smooth slow auto scrolling
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: 'Verified Diner',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);

    // Non-blocking async persistence for zero-delay UI response
    setTimeout(() => saveStoredReviews(updated), 0);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const avg = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="section-label">Verified Diner Reviews</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] tracking-tight">
          Guest Testimonials & Reviews
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5840] leading-relaxed">
          Read real diner experiences or share your feedback on dining with Giri Restaurant.
        </p>
        <hr className="divider-gold mt-4" />
      </div>

      {/* Rating Stats Card */}
      <div className="flex justify-center">
        <div className="glass-card rounded-2xl px-8 py-5 flex items-center gap-6 bg-[#FFF8F0] shadow-md border border-[#8B0000]/10">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-[#8B0000]">{avg}</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(avg)) ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-[#a09070] font-semibold mt-1">{reviews.length} total reviews</div>
          </div>
          <div className="w-px h-14 bg-[#C8A055]/30" />
          <p className="text-xs sm:text-sm text-[#6b5840] max-w-[200px] leading-relaxed">
            Based on verified diner ratings and reviews at Giri Restaurant.
          </p>
        </div>
      </div>

      {/* Reviews Carousel Slider Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-[#1a1008] flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#8B0000] rounded-full inline-block" />
            Featured Diner Experience
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-[#8B0000]/20 shadow-md flex items-center justify-center text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="shrink-0 w-80 sm:w-96 snap-start glass-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-[#8B0000]/10 hover:shadow-lg transition-all bg-gradient-to-b from-white to-[#FFF8F5]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A055]/40 shrink-0">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1008] text-base">{rev.name}</h4>
                    <span className="text-xs text-[#a09070] font-medium">{rev.role} · {rev.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#4a3820] leading-relaxed italic">&ldquo;{rev.comment}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="glass-card p-6 rounded-2xl h-fit bg-[#FFF8F0] border border-[#8B0000]/10 shadow-md">
          <h3 className="text-lg font-extrabold text-[#1a1008] mb-4 flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-[#8B0000]" />
            Write a Review
          </h3>

          {submitted && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Thank you! Your review was saved successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-white text-[#1a1008] rounded-xl px-3.5 py-2.5 text-xs font-medium border border-[#8B0000]/20 outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Rating *</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setRating(s)}
                    className="p-1 rounded-lg hover:bg-amber-50 active:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 transition-all duration-150 ${
                        s <= rating ? 'fill-[#C8A055] text-[#C8A055] scale-105' : 'text-[#e0d8cc]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Experience *</label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your dining experience with us..."
                className="w-full bg-white text-[#1a1008] rounded-xl px-3.5 py-2.5 text-xs font-medium border border-[#8B0000]/20 outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>

            <button type="submit" className="btn-crimson py-2.5 rounded-xl text-xs font-bold w-full shadow-md">
              ⭐ Submit Review
            </button>
          </form>
        </div>

        {/* Reviews vertical list */}
        <div className="lg:col-span-2 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-card p-6 rounded-2xl flex flex-col gap-3 hover:shadow-md transition-all border border-[#8B0000]/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C8A055]/30 shrink-0">
                  <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1008] text-sm">{rev.name}</h4>
                  <span className="text-xs text-[#a09070]">{rev.role} · {rev.date}</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#4a3820] leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
