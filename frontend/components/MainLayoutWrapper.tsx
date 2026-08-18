'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCartButton from '@/components/FloatingCartButton';
import CartDrawer from '@/components/CartDrawer';
import { Suspense } from 'react';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDashboardRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/merchant') || pathname?.startsWith('/manager');
  const isShopRoute = Boolean(searchParams?.get('shop'));

  if (isDashboardRoute) {
    return <div className="min-h-screen bg-[#F8F5F0]">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className={isShopRoute ? 'pt-1 sm:pt-2' : 'pt-[64px]'}>
        <main>{children}</main>
      </div>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </>
  );
}

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5F0]">{children}</div>}>
      <LayoutInner>{children}</LayoutInner>
    </Suspense>
  );
}
