/**
 * Home Page
 * VoiceCare AI - Main landing page
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ValueMetricsSection } from '@/components/sections/ValueMetricsSection';
import { InfiniteMarqueeSection } from '@/components/sections/InfiniteMarqueeSection';
import { ProductIntroSection } from '@/components/sections/ProductIntroSection';
import { generatePageMetadata } from '@/lib/seo';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = generatePageMetadata({
  title: 'VoiceCare AI - Agentic Intelligence for Healthcare RCM',
  description:
    'Supercharging Healthcare Workers with Care and AI. Automating administrative burdens, creating time for care teams, and improving patient outcomes.',
  pathname: '/',
});

// ============================================
// ISR Configuration
// ============================================

export const revalidate = 600; // Revalidate every 10 minutes

// ============================================
// Page Component
// ============================================

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Value Metrics Section - Why VoiceCare */}
      <ValueMetricsSection />

      {/* Infinite Marquee Section - Real-World Impact */}
      <InfiniteMarqueeSection />

      {/* Product Intro Section - Introducing Joy */}
      <ProductIntroSection />
    </>
  );
}
