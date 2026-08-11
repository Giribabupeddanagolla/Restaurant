'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';
import { Clock, ArrowRight, Search, Menu, X, Filter, CheckCircle2, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Chef Stories', 'Behind the Scenes', 'Recipes & Tips', 'Dining Tips'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'readTime'>('newest');

  // Filter and Search logic
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      search.trim() === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'readTime') return a.readTime - b.readTime;
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // newest
  });

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Full Width Side-to-Side Search Bar with Integrated Three-Lines Filter Button */}
      <div className="w-full relative z-30">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] pointer-events-none" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories, recipes, ingredients, or chef tips..."
            className="w-full bg-white border-none text-[#1a1008] rounded-2xl pl-11 pr-24 py-3 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all shadow-md placeholder:text-[#a09070]"
          />

          {/* Right Action Icons: Clear & Three-Lines Filter Menu */}
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

            <div className="w-[1px] h-4 bg-[#C8A055]/30 mx-0.5" />

            {/* Frameless 3-Lines Icon Button */}
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                showFilterMenu
                  ? 'text-[#8B0000] bg-[#8B0000]/15'
                  : 'text-[#8B0000] hover:bg-[#8B0000]/10'
              }`}
              title="Toggle Filters & Options"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Three-Lines Floating Dropdown Filter Popover */}
          {showFilterMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowFilterMenu(false)} />

              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-3xl border border-[#C8A055]/30 shadow-2xl z-50 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#C8A055]/20 pb-2.5">
                  <h3 className="font-extrabold text-xs text-[#1a1008] uppercase tracking-wider flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#8B0000]" />
                    Filter & Sorting Options
                  </h3>
                  {(activeCategory !== 'All' || search || sortBy !== 'newest') && (
                    <button
                      onClick={() => {
                        setActiveCategory('All');
                        setSearch('');
                        setSortBy('newest');
                        setShowFilterMenu(false);
                      }}
                      className="text-[10px] font-extrabold text-[#8B0000] hover:underline"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Categories Section */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block">
                    Category Filter
                  </span>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-[#8B0000] text-white shadow-xs'
                            : 'text-[#4a3820] hover:bg-[#FFF8F0] hover:text-[#8B0000]'
                        }`}
                      >
                        <span>{cat}</span>
                        {activeCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Order Section */}
                <div className="space-y-1.5 pt-2 border-t border-[#C8A055]/20">
                  <span className="text-[10px] font-extrabold text-[#a09070] uppercase tracking-wider block">
                    Sort Articles By
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'newest', label: 'Newest' },
                      { id: 'oldest', label: 'Oldest' },
                      { id: 'readTime', label: 'Quick Read' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id as any)}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                          sortBy === opt.id
                            ? 'bg-[#8B0000] text-white border-[#8B0000]'
                            : 'bg-[#F8F5F0] text-[#4a3820] border-[#C8A055]/20 hover:border-[#8B0000]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>



      {/* Active Filter Indicator */}
      {(search || activeCategory !== 'All') && (
        <div className="flex items-center justify-between bg-[#FFF8F0] border border-[#C8A055]/30 px-4 py-2 rounded-xl text-xs font-semibold text-[#6b5840]">
          <span>
            Showing results for {search ? `"${search}"` : ''} {activeCategory !== 'All' ? `in category "${activeCategory}"` : ''} ({filteredPosts.length} articles)
          </span>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
            }}
            className="text-[#8B0000] font-bold hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* No articles found fallback */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-[#a09070] glass-card bg-white rounded-3xl p-8 border border-[#C8A055]/20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-extrabold text-lg text-[#1a1008]">No culinary articles found</p>
          <p className="text-xs text-[#6b5840] mt-1">Try adjusting your search terms or selecting a different category above.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
            }}
            className="mt-4 btn-primary px-5 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 hover:shadow-xl transition-all border border-[#8B0000]/10 bg-white">
                <div className="relative h-64 md:h-auto min-h-[300px] bg-[#F8F5F0]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    ✦ Featured Article
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
                  <div className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all h-full border border-[#8B0000]/10 bg-white">
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
