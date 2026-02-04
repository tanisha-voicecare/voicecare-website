/**
 * Careers Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { CareersHero, CareersValues, OpenPositions } from '@/components/careers';
import { generatePageMetadata } from '@/lib/seo';
import { getCareersContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Careers',
  description:
    'Join VoiceCare AI and help transform healthcare with AI. Explore open positions in engineering, applied AI, and more. People who care. AI that matters.',
  pathname: '/careers',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function CareersPage() {
  const content = await getCareersContent();

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <CareersHero content={content.hero} />
      <CareersValues content={content.values} />
      <OpenPositions sectionTitle={content.openPositionsTitle} />
    </div>
  );
}
