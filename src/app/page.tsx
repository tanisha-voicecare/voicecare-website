/**
 * Home Page
 * VoiceCare AI - Main landing page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ValueMetricsSection } from '@/components/sections/ValueMetricsSection';
import { InfiniteMarqueeSection } from '@/components/sections/InfiniteMarqueeSection';
import { SupportedEHRIntegrationsSection } from '@/components/sections/SupportedEHRIntegrationsSection';
import { ProductIntroSection } from '@/components/sections/ProductIntroSection';
import { generatePageMetadata } from '@/lib/seo';
import {
  getHomepageHeroContent,
  getValueMetricsContent,
  getRadicalEfficienciesContent,
  getEHRIntegrationsContent,
  getProductIntroContent,
  getTrustedByContent,
} from '@/lib/content';

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

export default async function HomePage() {
  // Fetch all content from WordPress in parallel
  const [
    heroContent,
    valueMetricsContent,
    radicalEfficienciesContent,
    ehrIntegrationsContent,
    productIntroContent,
    trustedByContent,
  ] = await Promise.all([
    getHomepageHeroContent(),
    getValueMetricsContent(),
    getRadicalEfficienciesContent(),
    getEHRIntegrationsContent(),
    getProductIntroContent(),
    getTrustedByContent(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection content={heroContent} />

      {/* Trusted By Section */}
      <TrustedBySection content={trustedByContent} />

      {/* Value Metrics Section - The VoiceCare Advantage */}
      <ValueMetricsSection content={valueMetricsContent} />

      {/* Supported EHR Integrations Section */}
      <SupportedEHRIntegrationsSection content={ehrIntegrationsContent} />

      {/* Infinite Marquee Section - Radical Efficiencies */}
      <InfiniteMarqueeSection content={radicalEfficienciesContent} />

      {/* Product Intro Section - Meet Your AI Workforce */}
      <ProductIntroSection content={productIntroContent} />
    </>
  );
}
