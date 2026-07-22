import type { Metadata } from 'next';
import './globals.css';
import Navbar    from '@/components/Navbar';
import Footer    from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import BottomBar  from '@/components/BottomBar';
import TopBar from '@/components/TopBar';
import FloatingCartButton from '@/components/FloatingCartButton';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Giri Restaurant | Good Food, Great Experience',
  description: 'Giri Restaurant — fine dining with artisanal recipes, farm-fresh ingredients, and seamless mobile ordering.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload system fonts for faster first paint */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#1a1008] flex flex-col justify-between">
        <CartProvider>
          <div>
            <Navbar />
            <TopBar />
            {/*
              pt-[128px]  — clears the fixed navbar (64px) + top bar (64px) on mobile
              pt-[64px]   — only navbar on desktop (md:)
              pb-[72px]  — on mobile, clears the fixed bottom bar (md:pb-0 removes it on desktop)
            */}
            <main className="pt-[128px] md:pt-[64px] pb-[72px] md:pb-0">{children}</main>
          </div>
          {/* Footer only on desktop */}
          <div className="hidden md:block">
            <Footer />
          </div>
          <CartDrawer />
          <BottomBar />
          <FloatingCartButton />
        </CartProvider>
      </body>
    </html>
  );
}
