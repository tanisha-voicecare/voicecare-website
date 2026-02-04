import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header, Footer, ScrollToTop, AnnouncementBanner } from '@/components/layout';
import { generateSiteMetadata } from '@/lib/seo';
import { getLayoutContent } from '@/lib/content';
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

export const revalidate = 600; // Revalidate layout content every 10 minutes

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutContent = await getLayoutContent();

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />
          <AnnouncementBanner content={layoutContent.announcementBanner} />
          <main className="flex-1">{children}</main>
          <Footer content={layoutContent.footer} />
        </div>
      </body>
    </html>
  );
}
