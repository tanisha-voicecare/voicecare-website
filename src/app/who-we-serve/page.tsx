/**
 * Who We Serve Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { WhoWeServeHero, WhoWeServeTabs } from '@/components/who-we-serve';
import { generatePageMetadata } from '@/lib/seo';
import { getWhoWeServeContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Who We Serve',
  description:
    'VoiceCare AI serves healthcare stakeholders, specialist practice providers, revenue cycle management, and dental practices with AI-powered automation solutions.',
  pathname: '/who-we-serve',
});

export const revalidate = 10; // Revalidate every 10 minutes

export default async function WhoWeServePage() {
  const content = await getWhoWeServeContent();

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <WhoWeServeHero content={content.hero} />
      <WhoWeServeTabs content={content.tabs} />
    </div>
  );
}
