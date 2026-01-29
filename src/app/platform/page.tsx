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

export const metadata: Metadata = {
  title: 'Platform',
  description: 'Discover VoiceCare AI platform - AI-powered healthcare administration automation for benefit verification, prior authorization, and more.',
};

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
