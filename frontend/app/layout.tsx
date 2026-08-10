import type { Metadata } from 'next';
import './globals.css';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import { CartProvider } from '@/context/CartContext';
import { Providers } from '@/components/Providers';

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
        <Providers>
          <CartProvider>
            <Navbar />
            <div className="pt-[64px]">
              <main>{children}</main>
            </div>
            {/* Footer */}
            <Footer />
            <FloatingCartButton />
            <CartDrawer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
