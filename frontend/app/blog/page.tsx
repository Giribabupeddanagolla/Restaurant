'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';
import { Clock, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Chef Stories', 'Behind the Scenes', 'Recipes & Tips', 'Dining Tips'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = BLOG_POSTS.filter(
    (post) => activeCategory === 'All' || post.category === activeCategory
  );

  const featured = filteredPosts[0];
  const rest     = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-10 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all shadow-sm ${
                isActive
                  ? 'bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/20 scale-[1.02]'
                  : 'bg-[#FDFBF7] text-[#4a3820] border border-[#8B0000]/15 hover:border-[#8B0000]/40 hover:bg-[#FFF5F2] hover:text-[#8B0000]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* No articles found fallback */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-[#a09070]">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-bold text-lg text-[#1a1008]">No articles in this category</p>
          <p className="text-sm">Select another category above to view more posts.</p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-12">
              <div className="glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 hover:shadow-xl transition-all border border-[#8B0000]/10">
                <div className="relative h-64 md:h-auto min-h-[300px] bg-[#F8F5F0]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    ✦ Featured
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 text-[#8B0000] text-xs font-extrabold px-3 py-1 rounded-full shadow backdrop-blur-sm border border-[#8B0000]/10">
                    {featured.category}
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center gap-4">
                  <span className="text-xs font-bold text-[#C8A055] uppercase tracking-widest">{featured.category}</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] group-hover:text-[#8B0000] transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#6b5840] leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#C8A055]/30">
                        <Image src={featured.authorAvatar} alt={featured.author} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a1008]">{featured.author}</p>
                        <p className="text-[10px] text-[#a09070]">{featured.date}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#a09070] ml-auto font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C8A055]" /> {featured.readTime} min read
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B0000] group-hover:gap-3 transition-all mt-1">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all h-full border border-[#8B0000]/10">
                    <div className="relative h-48 bg-[#F8F5F0]">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-white/95 text-[#8B0000] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#8B0000]/15 shadow-sm backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <h3 className="font-extrabold text-[#1a1008] text-base leading-snug group-hover:text-[#8B0000] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#6b5840] leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#C8A055]/15 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
                          </div>
                          <span className="text-[10px] text-[#6b5840] font-bold">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] text-[#a09070] font-medium">
                          <Clock className="w-3 h-3 text-[#C8A055]" /> {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
