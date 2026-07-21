'use client';

import { useState } from 'react';
import { PUBLIC_REVIEWS } from '@/data/mockData';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(PUBLIC_REVIEWS);
  const [name,    setName]    = useState('');
  const [comment, setComment] = useState('');
  const [rating,  setRating]  = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    setReviews([{
      id: `rev-${Date.now()}`, name, role: 'Verified Diner', rating,
      date: 'Just now', comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
    }, ...reviews]);
    setName(''); setComment(''); setRating(5);
    alert('Thank you for your review!');
  };

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="section-label">Verified Diner Reviews</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Guest Testimonials</h1>
        <p className="text-sm text-[#6b5840] mt-2">Real experiences from our valued guests.</p>
        <hr className="divider-gold mt-6" />
      </div>

      {/* Rating stat */}
      <div className="flex justify-center mb-10">
        <div className="glass-card rounded-2xl px-8 py-5 flex items-center gap-6 bg-[#FFF8F0]">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-[#8B0000]">{avg}</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(avg)) ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'}`} />
              ))}
            </div>
            <div className="text-xs text-[#a09070] mt-1">{reviews.length} reviews</div>
          </div>
          <div className="w-px h-14 bg-[#C8A055]/30" />
          <p className="text-sm text-[#6b5840] max-w-[180px] leading-relaxed">
            Based on verified diner feedback at Giri Restaurant.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="glass-card p-6 rounded-2xl h-fit bg-[#FFF8F0]">
          <h3 className="text-lg font-extrabold text-[#1a1008] mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#8B0000] rounded-full inline-block" />
            Write a Review
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Full name" className="input-light" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <button type="button" key={s} onClick={() => setRating(s)}>
                    <Star className={`w-6 h-6 transition-colors ${s <= rating ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Experience</label>
              <textarea rows={4} required value={comment} onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..." className="input-light" />
            </div>

            <button type="submit" className="btn-crimson py-2.5 rounded-xl text-xs font-bold w-full">
              ⭐ Submit Review
            </button>
          </form>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-card p-6 rounded-2xl flex flex-col gap-3 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C8A055]/30">
                  <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1008] text-sm">{rev.name}</h4>
                  <span className="text-xs text-[#a09070]">{rev.role} · {rev.date}</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-[#C8A055] text-[#C8A055]' : 'text-[#e0d8cc]'}`} />
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
