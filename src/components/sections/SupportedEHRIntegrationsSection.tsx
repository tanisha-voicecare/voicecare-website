'use client';

/**
 * SupportedEHRIntegrationsSection Component
 * PIXEL-PERFECT implementation matching Figma site
 *
 * DESIGN SPECIFICATIONS (from Figma):
 *
 * Section:
 * - py-16 md:py-20 (64px / 80px)
 * - bg-white
 *
 * Container:
 * - max-w-[1100px] mx-auto
 * - px-6 md:px-12
 *
 * Title:
 * - text-[36px] md:text-[48px]
 * - font-bold
 * - text-[#06003F]
 * - tracking-[-0.02em]
 * - text-center
 * - mb-12 md:mb-16
 *
 * Logo Grid:
 * - grid-cols-2 md:grid-cols-4
 * - gap-y-10 md:gap-y-12 (vertical)
 * - gap-x-8 md:gap-x-16 (horizontal)
 * - items-center justify-items-center
 *
 * Logo Sizing:
 * - max-h-[40px] md:max-h-[48px]
 * - w-auto max-w-[160px]
 * - object-contain
 * - Full color (NO grayscale)
 *
 * ASSET PATHS:
 * - All EHR logos in /public/images/logos/ehr/
 * - Use kebab-case filenames
 */

import Image from 'next/image';
import { motion } from 'motion/react';

// ============================================
// Types
// ============================================

interface SupportedEHRIntegrationsSectionProps {
  className?: string;
}

interface EHRLogo {
  name: string;
  src: string;
  alt: string;
}

// ============================================
// Data - EHR Partner Logos (order matches Figma)
// Row 1: athenahealth, Greenway, CareStack, OpenDental
// Row 2: ModMed, denticon, Dentrix Ascend, cloud 9
// ============================================

const EHR_LOGOS: EHRLogo[] = [
  // Row 1
  {
    name: 'Athena Health',
    src: '/images/logos/ehr/athena-health.png',
    alt: 'Athena Health EHR Integration - VoiceCare AI seamlessly integrates with Athena Health electronic health records',
  },
  {
    name: 'Greenway Health',
    src: '/images/logos/ehr/greenway.png',
    alt: 'Greenway Health EHR Integration - VoiceCare AI integrates with Greenway Health electronic health records',
  },
  {
    name: 'CareStack',
    src: '/images/logos/ehr/carestack.png',
    alt: 'CareStack EHR Integration - VoiceCare AI connects with CareStack dental practice management software',
  },
  {
    name: 'Open Dental',
    src: '/images/logos/ehr/opendental.png',
    alt: 'Open Dental EHR Integration - VoiceCare AI integrates with Open Dental practice management software',
  },
  // Row 2
  {
    name: 'ModMed',
    src: '/images/logos/ehr/modmed.png',
    alt: 'ModMed EHR Integration - VoiceCare AI connects with Modernizing Medicine specialty EHR',
  },
  {
    name: 'Denticon',
    src: '/images/logos/ehr/denticon.png',
    alt: 'Denticon EHR Integration - VoiceCare AI integrates with Denticon cloud-based dental software',
  },
  {
    name: 'Dentrix Ascend',
    src: '/images/logos/ehr/dentrix-ascend.png',
    alt: 'Dentrix Ascend EHR Integration - VoiceCare AI works with Dentrix Ascend dental practice management',
  },
  {
    name: 'Cloud 9',
    src: '/images/logos/ehr/cloud-9.png',
    alt: 'Cloud 9 EHR Integration - VoiceCare AI works with Cloud 9 orthodontic practice management',
  },
];

// ============================================
// Component
// ============================================

export function SupportedEHRIntegrationsSection({
  className = '',
}: SupportedEHRIntegrationsSectionProps) {
  return (
    <section
      className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}
      aria-labelledby="ehr-integrations-heading"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Title - matches Figma exactly */}
        <motion.h2
          id="ehr-integrations-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold text-[#06003F] tracking-[-0.02em] text-center mb-8 sm:mb-12 md:mb-16"
        >
          Supported EHR Integrations
        </motion.h2>

        {/* Logo Grid - 2 columns mobile, 4 columns desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-items-center"
        >
          {EHR_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.05,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-center justify-center w-full"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={60}
                loading="lazy"
                className="h-[40px] sm:h-[50px] lg:h-[60px] w-auto max-w-[140px] sm:max-w-[160px] lg:max-w-[200px] object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SupportedEHRIntegrationsSection;
