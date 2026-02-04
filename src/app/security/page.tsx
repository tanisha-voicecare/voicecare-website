/**
 * Security Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import {
  SecurityHero,
  SecurityCertifications,
  SecurityCompliance,
} from '@/components/security';
import { generatePageMetadata } from '@/lib/seo';
import { getSecurityContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Security',
  description:
    'VoiceCare AI security and compliance. SOC 2 Type II attested and HIPAA-compliant healthcare data protection ensuring maximum security for sensitive patient information.',
  pathname: '/security',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function SecurityPage() {
  const content = await getSecurityContent();

  return (
    <>
      <SecurityHero content={content.hero} />
      <SecurityCertifications content={content.certifications} />
      <SecurityCompliance content={content.compliance} />
    </>
  );
}
