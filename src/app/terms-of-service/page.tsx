/**
 * Terms of Service Page
 * Implementation from designer-src/src/app/components/TermsOfService.tsx
 *
 * Sections IMPLEMENTED:
 * 1. TermsHeader (H1 title) ✓
 * 2. TermsContent (16 H2 sections, 22 H3 subsections) ✓
 *
 * NOTE: Header is rendered by root layout.tsx
 * NOTE: Footer is NOT rendered on this page (per designer-src)
 */

import type { Metadata } from 'next';
import { TermsHeader, TermsContent } from '@/components/terms-of-service';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'VoiceCare AI Terms of Service - Review our terms of use, service conditions, and user agreements.',
  pathname: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <TermsHeader />
      <TermsContent />
    </div>
  );
}
