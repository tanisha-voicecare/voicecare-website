/**
 * Press Page
 * Implementation from designer-src/src/app/components/Press.tsx
 *
 * Sections IMPLEMENTED:
 * 1. PressHero ✓
 * 2. PressCoverage ✓
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import type { Metadata } from 'next';
import { PressHero, PressCoverage } from '@/components/press';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Press',
  description:
    'Explore VoiceCare AI press coverage and media highlights. Read about our journey through features in Forbes, Becker\'s, MedCity News, and other leading publications.',
  pathname: '/press',
});

export default function PressPage() {
  return (
    <>
      <PressHero />
      <PressCoverage />
    </>
  );
}
