'use client';

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

import {
  SecurityHero,
  SecurityCertifications,
  SecurityCompliance,
} from '@/components/security';

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <SecurityCertifications />
      <SecurityCompliance />
    </>
  );
}
