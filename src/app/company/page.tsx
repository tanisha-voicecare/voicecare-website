'use client';

/**
 * Company Page
 * Implementation from designer-src/src/app/components/Company.tsx
 *
 * All sections IMPLEMENTED:
 * 1. CompanyHero
 * 2. AboutUsSection
 * 3. CEOQuoteSection
 * 4. PrinciplesSection
 * 5. AdvisorsSection
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import {
  CompanyHero,
  AboutUsSection,
  CEOQuoteSection,
  PrinciplesSection,
  AdvisorsSection,
} from '@/components/company';

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <AboutUsSection />
      <CEOQuoteSection />
      <PrinciplesSection />
      <AdvisorsSection />
    </>
  );
}
