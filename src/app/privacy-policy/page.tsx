/**
 * Privacy Policy Page
 * Implementation from designer-src/src/app/components/PrivacyPolicy.tsx
 *
 * Sections IMPLEMENTED:
 * 1. PrivacyPolicyHeader (H1 title) ✓
 * 2. PrivacyPolicyContent (18 legal text sections) ✓
 *
 * NOTE: Header is rendered by root layout.tsx
 * NOTE: Footer is NOT rendered on this page (per designer-src)
 */

import type { Metadata } from 'next';
import { PrivacyPolicyHeader, PrivacyPolicyContent } from '@/components/privacy-policy';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'VoiceCare AI Privacy Policy - Learn how we collect, use, and protect your personal data and information.',
  pathname: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-14">
      <PrivacyPolicyHeader />
      <PrivacyPolicyContent />
    </div>
  );
}
