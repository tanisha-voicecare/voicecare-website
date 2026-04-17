/**
 * Pricing Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { PricingFAQ, ROICalculator } from '@/components/pricing';
import { generatePageMetadata } from '@/lib/seo';
import { getPricingContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing',
  description:
    'VoiceCare AI pricing, implementation, and support information. Flexible pricing models with per-call or SaaS options, quick implementation, and comprehensive customer support.',
  pathname: '/pricing',
});

export const revalidate = 60; // Revalidate every 1 minute

export default async function PricingPage() {
  const content = await getPricingContent();

  return (
    <>
      <ROICalculator />
      <PricingFAQ content={content.faq} />
    </>
  );
}
