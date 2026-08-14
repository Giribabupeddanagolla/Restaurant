'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCartButton from '@/components/FloatingCartButton';
import CartDrawer from '@/components/CartDrawer';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-[#F8F5F0]">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-[64px]">
        <main>{children}</main>
      </div>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </>
  );
}
