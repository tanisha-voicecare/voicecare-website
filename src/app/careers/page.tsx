/**
 * Careers Page
 * Implementation from designer-src/src/app/components/Careers.tsx
 *
 * All sections IMPLEMENTED:
 * 1. CareersHero ✓
 * 2. CareersValues ✓
 * 3. OpenPositions ✓
 *
 * JobDescription is rendered via dynamic route /careers/[slug]
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import type { Metadata } from 'next';
import { CareersHero, CareersValues, OpenPositions } from '@/components/careers';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Careers',
  description:
    'Join VoiceCare AI and help transform healthcare with AI. Explore open positions in engineering, applied AI, and more. People who care. AI that matters.',
  pathname: '/careers',
});

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <CareersHero />
      <CareersValues />
      <OpenPositions />
    </div>
  );
}
