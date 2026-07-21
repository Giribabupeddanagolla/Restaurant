import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Award, Users, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-20">

      {/* Header */}
      <div className="text-center">
        <span className="section-label">Our Heritage</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">About Giri Restaurant</h1>
        <p className="text-sm text-[#6b5840] mt-2">Where traditional culinary perfection meets heartfelt hospitality.</p>
        <hr className="divider-gold mt-6" />
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 text-[#C8A055] text-xs font-bold uppercase tracking-widest">
            <span className="w-6 h-px bg-[#C8A055]" /> Our Story
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1008] leading-snug">
            A Legacy of Flavor & <span className="text-[#8B0000]">Genuine Warmth</span>
          </h2>
          <p className="text-sm text-[#6b5840] leading-relaxed">
            Founded on a passion for authentic cuisine and real hospitality, Giri Restaurant has grown from a family kitchen
            into a beloved dining destination — built on the belief that good food and great company are at the heart of every gathering.
          </p>
          <p className="text-sm text-[#6b5840] leading-relaxed">
            We source 100% organic, non-GMO produce and grass-fed meats directly from certified local farms,
            ensuring every dish is fresh, nutritious, and made with care.
          </p>
          <Link href="/menu" className="btn-primary inline-flex w-fit px-6 py-2.5 rounded-xl text-sm font-bold mt-2">
            Explore Our Menu →
          </Link>
        </div>

        <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
            alt="Giri Restaurant Dining Area"
            fill className="object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow border border-[#C8A055]/30">
            <span className="text-[#8B6914] font-bold text-sm">Good Food, Great Experience</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <Users  className="w-6 h-6 text-[#C8A055]" />, bg: 'bg-[#FFF8F0]', value: '10,000+', label: 'Happy Guests' },
          { icon: <Award  className="w-6 h-6 text-[#8B0000]" />, bg: 'bg-[#FFF0F0]', value: '15+',     label: 'Signature Dishes' },
          { icon: <Leaf   className="w-6 h-6 text-[#16603A]" />, bg: 'bg-[#F0FAF4]', value: '100%',    label: 'Organic Sourced' },
          { icon: <Clock  className="w-6 h-6 text-[#C8A055]" />, bg: 'bg-[#FFF8F0]', value: '10 Yrs',  label: 'Of Excellence' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>{stat.icon}</div>
            <div className="text-2xl font-extrabold text-[#1a1008]">{stat.value}</div>
            <div className="text-xs text-[#6b5840] font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div>
        <div className="text-center mb-8">
          <span className="section-label">What We Stand For</span>
          <h2 className="text-2xl font-extrabold text-[#1a1008] mt-1">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { bg: 'bg-[#FFF0F0]', icon: '👨‍🍳', color: 'text-[#8B0000]', title: 'Authentic Recipes',
              desc: 'Traditional recipes passed down and refined over generations — never compromising on taste.' },
            { bg: 'bg-[#FFF8F0]', icon: '🌾', color: 'text-[#8B6914]', title: 'Quality Ingredients',
              desc: 'Farm-fresh organic produce sourced daily from trusted local partners who share our commitment.' },
            { bg: 'bg-[#F0FAF4]', icon: '🤝', color: 'text-[#16603A]', title: 'Warm Hospitality',
              desc: 'From the moment you walk in, our team treats every guest as family — attentive and welcoming.' },
          ].map((v) => (
            <div key={v.title} className="glass-card p-7 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center text-xl`}>{v.icon}</div>
              <h3 className={`font-extrabold text-lg ${v.color}`}>{v.title}</h3>
              <p className="text-sm text-[#6b5840] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
