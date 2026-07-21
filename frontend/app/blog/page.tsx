import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/mockData';
import { Clock, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Chef Stories', 'Behind the Scenes', 'Recipes & Tips', 'Dining Tips'];

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest     = BLOG_POSTS.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="section-label">Stories, Tips & Recipes</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Giri Blog</h1>
        <p className="text-sm text-[#6b5840] mt-2">
          Behind-the-scenes stories, chef recipes, and dining inspiration from our kitchen to your table.
        </p>
        <hr className="divider-gold mt-6" />
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-10">
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all
              ${cat === 'All'
                ? 'bg-[#8B0000] text-white shadow'
                : 'bg-[#F8F5F0] text-[#6b5840] border border-[#8B0000]/10 hover:border-[#8B0000]/30 hover:text-[#8B0000]'
              }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Featured post */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-12">
        <div className="glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 hover:shadow-xl transition-all">
          <div className="relative h-64 md:h-auto min-h-[280px] bg-[#F8F5F0]">
            <Image src={featured.image} alt={featured.title} fill className="object-cover" />
            <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full">
              ✦ Featured
            </span>
          </div>
          <div className="p-8 flex flex-col justify-center gap-4">
            <span className="text-xs font-bold text-[#C8A055] uppercase tracking-widest">{featured.category}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] group-hover:text-[#8B0000] transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-sm text-[#6b5840] leading-relaxed line-clamp-3">{featured.excerpt}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={featured.authorAvatar} alt={featured.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1a1008]">{featured.author}</p>
                  <p className="text-[10px] text-[#a09070]">{featured.date}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-[#a09070] ml-auto">
                <Clock className="w-3.5 h-3.5" /> {featured.readTime} min read
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#8B0000] group-hover:gap-2 transition-all mt-1">
              Read Article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Rest of posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <div className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all h-full">
              <div className="relative h-48 bg-[#F8F5F0]">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-white/90 text-[#8B0000] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#8B0000]/15">
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
                    <span className="text-[10px] text-[#6b5840] font-medium">{post.author}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-[#a09070]">
                    <Clock className="w-3 h-3" /> {post.readTime} min
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
