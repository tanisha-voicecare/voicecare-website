/**
 * Partner With Us Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { PartnerHero, PartnerForm } from '@/components/partner-with-us';
import { generatePageMetadata } from '@/lib/seo';
import { getPartnerContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Partner with Us',
  description:
    'Collaborating with VoiceCare will drive mutual growth and success. Explore partnership opportunities and shape the future of healthcare together.',
  pathname: '/partner-with-us',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function PartnerWithUsPage() {
  const content = await getPartnerContent();

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <PartnerHero content={content.hero} />
      <PartnerForm />
    </div>
  );
}
