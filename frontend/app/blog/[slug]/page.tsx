import { BLOG_POSTS } from '@/data/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Tag } from 'lucide-react';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post    = BLOG_POSTS.find((p) => p.slug === params.slug);
  const related = BLOG_POSTS.filter((p) => p.slug !== params.slug).slice(0, 3);

  if (!post) notFound();

  // Simple markdown-lite: bold **text**, paragraphs separated by blank lines
  const renderContent = (text: string) => {
    return text.split('\n\n').map((block, i) => {
      const isHeading = block.startsWith('**') && block.endsWith('**');
      if (isHeading) {
        return (
          <h3 key={i} className="text-lg font-extrabold text-[#8B0000] mt-6 mb-2">
            {block.replace(/\*\*/g, '')}
          </h3>
        );
      }
      // inline bold
      const parts = block.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-sm text-[#4a3820] leading-7">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-[#1a1008] font-bold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Back */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B0000] hover:text-[#C8102E] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      {/* Category + Title */}
      <div className="mb-6">
        <span className="section-label">{post.category}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-2 leading-tight">{post.title}</h1>
      </div>

      {/* Author + Meta */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#C8A055]/20">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A055]/30 shrink-0">
          <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
        </div>
        <div>
          <p className="font-bold text-[#1a1008] text-sm">{post.author}</p>
          <p className="text-xs text-[#a09070]">{post.authorRole}</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-[#a09070]">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-md">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      {/* Excerpt highlight */}
      <blockquote className="border-l-4 border-[#8B0000] pl-5 mb-8 bg-[#FFF8F0] py-4 pr-4 rounded-r-xl">
        <p className="text-base text-[#4a3820] italic leading-relaxed">{post.excerpt}</p>
      </blockquote>

      {/* Content */}
      <div className="flex flex-col gap-4 mb-10">
        {renderContent(post.content)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-[#C8A055]/20">
        <span className="flex items-center gap-1 text-xs text-[#a09070]"><Tag className="w-3.5 h-3.5" /> Tags:</span>
        {post.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-full text-xs font-semibold text-[#6b5840] capitalize">
            {tag}
          </span>
        ))}
      </div>

      {/* Related posts */}
      <div>
        <h2 className="text-xl font-extrabold text-[#1a1008] mb-6">More from the Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-36 bg-[#F8F5F0]">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-[#C8A055] uppercase tracking-wider mb-1">{p.category}</p>
                  <h4 className="text-sm font-extrabold text-[#1a1008] group-hover:text-[#8B0000] transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-[#a09070] mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.readTime} min read
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
