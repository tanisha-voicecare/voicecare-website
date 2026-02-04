/**
 * Press Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { PressHero, PressCoverage } from '@/components/press';
import { generatePageMetadata } from '@/lib/seo';
import { getPressContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Press',
  description:
    'Explore VoiceCare AI press coverage and media highlights. Read about our journey through features in Forbes, Becker\'s, MedCity News, and other leading publications.',
  pathname: '/press',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function PressPage() {
  const content = await getPressContent();

  return (
    <div className="w-full overflow-x-hidden">
      <PressHero content={content.hero} />
      <PressCoverage coverageTitle={content.coverageTitle} items={content.items} />
    </div>
  );
}
