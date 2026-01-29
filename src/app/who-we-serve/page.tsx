/**
 * Who We Serve Page
 * Implementation from designer-src/src/app/components/WhoWeServe.tsx
 *
 * Sections IMPLEMENTED:
 * 1. WhoWeServeHero ✓
 * 2. WhoWeServeTabs ✓
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import type { Metadata } from 'next';
import { WhoWeServeHero, WhoWeServeTabs } from '@/components/who-we-serve';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Who We Serve',
  description:
    'VoiceCare AI serves healthcare stakeholders, specialist practice providers, revenue cycle management, and dental practices with AI-powered automation solutions.',
  pathname: '/who-we-serve',
});

export default function WhoWeServePage() {
  return (
    <div className="min-h-screen bg-white">
      <WhoWeServeHero />
      <WhoWeServeTabs />
    </div>
  );
}
