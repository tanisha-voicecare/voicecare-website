'use client';

/**
 * SupportedEHRIntegrationsSection Component
 * PIXEL-PERFECT design matching designer-src/app/components/EHRIntegrations.tsx
 */

import Image from 'next/image';
import { motion } from 'motion/react';
import type { EHRIntegrationsContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface SupportedEHRIntegrationsSectionProps {
  className?: string;
  content?: EHRIntegrationsContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: EHRIntegrationsContent = {
  sectionTitle: 'Supported EHR Integrations',
  sectionDescription: 'Seamlessly connect with the leading healthcare platforms',
};

interface EHRLogo {
  name: string;
  src: string;
  alt: string;
  padding?: string; // p-4 for scaled logos, p-6 for others
  scale?: string;
}

// ============================================
// Data - EHR Partner Logos (EXACT order from designer-src)
// Row 1: athena (p-4, scale-110), Epic (p-6), ModMed (p-6), Greenway (p-6), Veradigm (p-4, scale-110)
// Row 2: Open Dental (p-6), denticon (p-4, scale-110), cloud 9 (p-6), Dentrix Ascend (p-6), CareStack (p-6)
// ============================================

const ROW_1_LOGOS: EHRLogo[] = [
  {
    name: 'athenahealth',
    src: '/images/logos/ehr/athena-health.png',
    alt: 'athenahealth',
    padding: 'p-4',
    scale: 'scale-110',
  },
  {
    name: 'Epic',
    src: '/images/logos/ehr/epic.png',
    alt: 'Epic',
    padding: 'p-6',
  },
  {
    name: 'ModMed',
    src: '/images/logos/ehr/modmed.png',
    alt: 'ModMed',
    padding: 'p-4',
    scale: 'scale-110',
  },
  {
    name: 'Greenway Health',
    src: '/images/logos/ehr/greenway.png',
    alt: 'Greenway Health',
    padding: 'p-6',
  },
  {
    name: 'Veradigm',
    src: '/images/logos/ehr/veradigm.png',
    alt: 'Veradigm',
    padding: 'p-4',
    scale: 'scale-110',
  },
];

const ROW_2_LOGOS: EHRLogo[] = [
  {
    name: 'Open Dental',
    src: '/images/logos/ehr/opendental.png',
    alt: 'Open Dental',
    padding: 'p-6',
  },
  {
    name: 'denticon',
    src: '/images/logos/ehr/denticon.png',
    alt: 'denticon',
    padding: 'p-4',
    scale: 'scale-110',
  },
  {
    name: 'cloud 9',
    src: '/images/logos/ehr/cloud-9.png',
    alt: 'cloud 9',
    padding: 'p-6',
  },
  {
    name: 'Dentrix Ascend',
    src: '/images/logos/ehr/dentrix-ascend.png',
    alt: 'Dentrix Ascend',
    padding: 'p-6',
  },
  {
    name: 'CareStack',
    src: '/images/logos/ehr/carestack.png',
    alt: 'CareStack',
    padding: 'p-4',
    scale: 'scale-110',
  },
];

// ============================================
// Component
// ============================================

export function SupportedEHRIntegrationsSection({
  className = '',
  content,
}: SupportedEHRIntegrationsSectionProps) {
  const sectionContent = content || DEFAULT_CONTENT;

  return (
    <section
      className={`bg-[#FAFAFA] py-12 sm:py-16 md:py-[80px] ${className}`}
      aria-labelledby="ehr-integrations-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
        {/* Header - matching designer: mb-12 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2
            id="ehr-integrations-heading"
            className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-2 sm:mb-3"
          >
            {sectionContent.sectionTitle}
          </h2>
          {sectionContent.sectionDescription && (
            <p className="text-base sm:text-lg text-[#06003F]/60 max-w-2xl mx-auto">
              {sectionContent.sectionDescription}
            </p>
          )}
        </motion.div>

        {/* Logo Grid - matching designer: max-w-6xl */}
        <div className="max-w-6xl mx-auto">
          {/* Combined grid: 2 cols mobile, 3 cols tablet, 5 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {[...ROW_1_LOGOS, ...ROW_2_LOGOS].map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`bg-white rounded-[12px] ${logo.padding} flex items-center justify-center min-h-[80px] sm:min-h-[90px] md:min-h-[120px]`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={60}
                  loading="lazy"
                  className={`w-full h-auto object-contain ${logo.scale || ''}`}
                />
              </motion.div>
            ))}
          </div>

          {/* "& many more..." - matching designer: mt-8, text-lg */}
          <div className="flex justify-center mt-6 sm:mt-7 md:mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-center justify-center"
            >
              <p className="text-base sm:text-lg text-[#06003F]/40">
                & many more...
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportedEHRIntegrationsSection;
