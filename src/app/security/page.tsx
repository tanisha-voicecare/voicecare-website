/**
 * Security Page
 * Implementation from designer-src/src/app/components/Solutions.tsx
 *
 * Current sections IMPLEMENTED:
 * 1. SecurityHero
 * 2. SecurityCertifications
 * 3. SecurityCompliance (5 tabs + cards)
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import type { Metadata } from 'next';
import {
  SecurityHero,
  SecurityCertifications,
  SecurityCompliance,
} from '@/components/security';

export const metadata: Metadata = {
  title: 'Security',
  description: 'VoiceCare AI security and compliance - SOC 2 Type II attested, HIPAA-compliant healthcare data protection.',
};

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <SecurityCertifications />
      <SecurityCompliance />
    </>
  );
}
