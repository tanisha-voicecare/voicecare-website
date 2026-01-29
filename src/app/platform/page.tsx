'use client';

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

import {
  PlatformHero,
  PlatformEHRContent,
  PlatformTabbedCapabilities,
  PlatformBenefits,
} from '@/components/platform';

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <PlatformEHRContent />
      <PlatformTabbedCapabilities />
      <PlatformBenefits />
    </>
  );
}
