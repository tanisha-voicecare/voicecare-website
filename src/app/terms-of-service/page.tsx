/**
 * Terms of Service Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { TermsHeader, TermsContent } from '@/components/terms-of-service';
import { generatePageMetadata } from '@/lib/seo';
import { getTermsContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'VoiceCare AI Terms of Service - Review our terms of use, service conditions, and user agreements.',
  pathname: '/terms-of-service',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function TermsOfServicePage() {
  const content = await getTermsContent();

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <TermsHeader content={content} />
      <TermsContent sections={content.sections} />
    </div>
  );
}
