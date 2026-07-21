import Link from 'next/link';
import Image from 'next/image';
import { LogIn, UserPlus, Info, ChevronRight, Star, Leaf, Award, Clock } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 pb-28 md:pb-8 flex flex-col gap-6">

      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-white shadow-lg ring-4 ring-[#C8A055]/30 flex items-center justify-center mx-auto mb-3">
          <Image src="/giri-logo.svg" alt="Giri Restaurant" width={72} height={72} className="rounded-full" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#1a1008]">My Profile</h1>
        <p className="text-sm text-[#6b5840] mt-1">Sign in to order, save favourites & more</p>
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          className="btn-crimson w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" /> Sign In to Your Account
        </Link>
        <Link
          href="/register"
          className="w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
        >
          <UserPlus className="w-5 h-5" /> Create New Account
        </Link>
      </div>

      <hr className="border-[#C8A055]/20" />

      {/* Quick links */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-[#a09070] uppercase tracking-widest mb-1">Explore</p>

        {[
          { icon: '🍽️', label: 'Browse Our Menu',    sub: 'Chef specials, mains & more',   href: '/menu'   },
          { icon: '🎁', label: 'Offers & Deals',      sub: 'Promo codes & discounts',        href: '/offers' },
          { icon: '📝', label: 'Read Our Blog',       sub: 'Recipes, tips & chef stories',   href: '/blog'   },
          { icon: '📞', label: 'Contact Us',          sub: 'Get in touch with our team',     href: '/contact'},
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FFF8F0] flex items-center justify-center text-xl shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1a1008] text-sm group-hover:text-[#8B0000] transition-colors">{item.label}</p>
              <p className="text-xs text-[#a09070]">{item.sub}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#a09070] shrink-0" />
          </Link>
        ))}
      </div>

      <hr className="border-[#C8A055]/20" />

      {/* About Us snapshot */}
      <div>
        <p className="text-xs font-bold text-[#a09070] uppercase tracking-widest mb-3 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" /> About Giri Restaurant
        </p>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="relative h-36 bg-[#F8F5F0]">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
              alt="Giri Restaurant"
              fill className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-3 left-4 text-white font-extrabold text-lg leading-tight">
              Good Food,<br />Great Experience
            </p>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <p className="text-sm text-[#4a3820] leading-relaxed">
              Giri Restaurant brings authentic cuisine to your table — built on the belief that great food and genuine warmth belong together.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: <Star  className="w-4 h-4 text-[#C8A055]" />, val: '4.9',    lbl: 'Rating' },
                { icon: <Leaf  className="w-4 h-4 text-[#16603A]" />, val: '100%',   lbl: 'Organic' },
                { icon: <Award className="w-4 h-4 text-[#8B0000]" />, val: '15+',    lbl: 'Dishes' },
                { icon: <Clock className="w-4 h-4 text-[#C8A055]" />, val: '10 Yrs', lbl: 'Legacy' },
              ].map((s) => (
                <div key={s.lbl} className="flex flex-col items-center gap-1 bg-[#F8F5F0] rounded-xl py-2.5 px-1">
                  {s.icon}
                  <span className="text-xs font-extrabold text-[#1a1008]">{s.val}</span>
                  <span className="text-[9px] text-[#a09070] font-semibold">{s.lbl}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 mt-1">
              Read Our Full Story →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
