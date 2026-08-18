import type { Metadata } from 'next';
import './globals.css';
import MainLayoutWrapper from '@/components/MainLayoutWrapper';
import { CartProvider } from '@/context/CartContext';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Royal Restaurant | Good Food, Great Experience',
  description: 'Royal Restaurant — fine dining with artisanal recipes, farm-fresh ingredients, and seamless mobile ordering.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8F5F0] text-[#1a1008]">
        <Providers>
          <CartProvider>
            <MainLayoutWrapper>{children}</MainLayoutWrapper>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
