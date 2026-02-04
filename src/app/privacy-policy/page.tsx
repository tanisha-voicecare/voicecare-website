/**
 * Privacy Policy Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { PrivacyPolicyHeader, PrivacyPolicyContent } from '@/components/privacy-policy';
import { generatePageMetadata } from '@/lib/seo';
import { getPrivacyContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'VoiceCare AI Privacy Policy - Learn how we collect, use, and protect your personal data and information.',
  pathname: '/privacy-policy',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyContent();

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <PrivacyPolicyHeader content={content} />
      <PrivacyPolicyContent sections={content.sections} />
    </div>
  );
}
