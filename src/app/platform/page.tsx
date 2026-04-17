/**
 * Platform Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import {
  PlatformHero,
  PlatformEHRContent,
  PlatformTabbedCapabilities,
  PlatformBenefits,
} from '@/components/platform';
import { generatePageMetadata } from '@/lib/seo';
import {
  getPlatformHeroContent,
  getPlatformEHRContent,
  getPlatformSolutionsContent,
  getPlatformBenefitsContent,
} from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Platform',
  description:
    'Discover the VoiceCare AI platform powered by Healthcare Administration General Intelligence (HAgi). Automate benefit verification, prior authorization, and routine back-office workflows with Generative and Conversational AI.',
  pathname: '/platform',
});

export const revalidate = 10; // Revalidate every 10 minutes

export default async function PlatformPage() {
  // Fetch all content from WordPress in parallel
  const [heroContent, ehrContent, solutionsContent, benefitsContent] = await Promise.all([
    getPlatformHeroContent(),
    getPlatformEHRContent(),
    getPlatformSolutionsContent(),
    getPlatformBenefitsContent(),
  ]);

  return (
    <>
      <div id="platform-hero">
        <PlatformHero content={heroContent} />
      </div>
      <div id="platform-ehr">
        <PlatformEHRContent content={ehrContent} />
      </div>
      <div id="platform-solutions">
        <PlatformTabbedCapabilities content={solutionsContent} />
      </div>
      <div id="platform-benefits">
        <PlatformBenefits content={benefitsContent} />
      </div>
    </>
  );
}
