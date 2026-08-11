'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import { CartProvider } from '@/context/CartContext';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <CartProvider>{children}</CartProvider>;
  }

  return (
    <CartProvider>
      <Navbar />
      <div className="pt-[64px]">
        <main>{children}</main>
      </div>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </CartProvider>
  );
}
