import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header, Footer, ScrollToTop } from '@/components/layout';
import { generateSiteMetadata } from '@/lib/seo';
import './globals.css';

// ============================================
// Font Configuration - Inter (EXACT from designer-src)
// ============================================

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = generateSiteMetadata();

export const viewport: Viewport = {
  themeColor: '#06003F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
