'use client';

/**
 * SupportedEHRIntegrationsSection Component
 * PIXEL-PERFECT design matching Figma: https://craft-juror-27577775.figma.site/
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
  width: string;
}

// ============================================
// Data - EHR Partner Logos (order matches Figma design)
// Row 1: athenahealth, ModMed, Greenway
// Row 2: Open Dental, denticon, cloud 9
// Row 3: Dentrix Ascend, CareStack, "& many more..."
// ============================================

const EHR_LOGOS: EHRLogo[] = [
  // Row 1
  {
    name: 'athenahealth',
    src: '/images/logos/ehr/athena-health.png',
    alt: 'athenahealth EHR Integration',
    width: 'w-[180px] sm:w-[220px] md:w-[280px]',
  },
  {
    name: 'ModMed',
    src: '/images/logos/ehr/modmed.png',
    alt: 'ModMed EHR Integration',
    width: 'w-[160px] sm:w-[200px] md:w-[240px]',
  },
  {
    name: 'Greenway Health',
    src: '/images/logos/ehr/greenway.png',
    alt: 'Greenway Health EHR Integration',
    width: 'w-[140px] sm:w-[170px] md:w-[200px]',
  },
  // Row 2
  {
    name: 'Open Dental',
    src: '/images/logos/ehr/opendental.png',
    alt: 'Open Dental EHR Integration',
    width: 'w-[160px] sm:w-[200px] md:w-[240px]',
  },
  {
    name: 'denticon',
    src: '/images/logos/ehr/denticon.png',
    alt: 'denticon EHR Integration',
    width: 'w-[160px] sm:w-[200px] md:w-[240px]',
  },
  {
    name: 'cloud 9',
    src: '/images/logos/ehr/cloud-9.png',
    alt: 'cloud 9 EHR Integration',
    width: 'w-[120px] sm:w-[150px] md:w-[180px]',
  },
  // Row 3
  {
    name: 'Dentrix Ascend',
    src: '/images/logos/ehr/dentrix-ascend.png',
    alt: 'Dentrix Ascend EHR Integration',
    width: 'w-[160px] sm:w-[200px] md:w-[240px]',
  },
  {
    name: 'CareStack',
    src: '/images/logos/ehr/carestack.png',
    alt: 'CareStack EHR Integration',
    width: 'w-[160px] sm:w-[200px] md:w-[240px]',
  },
];

// ============================================
// Component
// ============================================

export function SupportedEHRIntegrationsSection({
  className = '',
  content,
}: SupportedEHRIntegrationsSectionProps) {
  // Use provided content or fallback to defaults
  const sectionContent = content || DEFAULT_CONTENT;

  return (
    <section
      className={`py-16 sm:py-20 md:py-[80px] bg-[#FAFAFA] ${className}`}
      aria-labelledby="ehr-integrations-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2
            id="ehr-integrations-heading"
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-3 sm:mb-4"
          >
            {sectionContent.sectionTitle}
          </h2>
          {sectionContent.sectionDescription && (
            <p className="text-base sm:text-lg text-[#06003F]/60 max-w-2xl mx-auto">
              {sectionContent.sectionDescription}
            </p>
          )}
        </motion.div>

        {/* Logo Grid - 3 columns on tablet+, 1 on mobile */}
        <div className="max-w-6xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {EHR_LOGOS.slice(0, 3).map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[12px] p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={280}
                  height={80}
                  loading="lazy"
                  className={`${logo.width} h-auto object-contain`}
                />
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {EHR_LOGOS.slice(3, 6).map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-[12px] p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={240}
                  height={80}
                  loading="lazy"
                  className={`${logo.width} h-auto object-contain`}
                />
              </motion.div>
            ))}
          </div>

          {/* Row 3 - 2 logos + "& many more..." */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {EHR_LOGOS.slice(6, 8).map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-[12px] p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={240}
                  height={80}
                  loading="lazy"
                  className={`${logo.width} h-auto object-contain`}
                />
              </motion.div>
            ))}

            {/* "& many more..." text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px]"
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
