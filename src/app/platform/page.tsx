/**
 * Platform Page
 * Implementation from designer-src/src/app/components/Platform.tsx
 *
 * All sections IMPLEMENTED:
 * 1. PlatformHero
 * 2. PlatformEHRContent
 * 3. PlatformTabbedCapabilities
 * 4. PlatformBenefits
 *
 * NOTE: Header and Footer are rendered by root layout.tsx
 */

import type { Metadata } from 'next';
import {
  PlatformHero,
  PlatformEHRContent,
  PlatformTabbedCapabilities,
  PlatformBenefits,
} from '@/components/platform';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Platform',
  description:
    'Discover the VoiceCare AI platform powered by Healthcare Administration General Intelligence (HAGI). Automate benefit verification, prior authorization, and routine back-office workflows with Generative and Conversational AI.',
  pathname: '/platform',
});

export default function PlatformPage() {
  return (
    <>
      <div id="platform-hero">
        <PlatformHero />
      </div>
      <div id="platform-ehr">
        <PlatformEHRContent />
      </div>
      <div id="platform-solutions">
        <PlatformTabbedCapabilities />
      </div>
      <div id="platform-benefits">
        <PlatformBenefits />
      </div>
    </>
  );
}
