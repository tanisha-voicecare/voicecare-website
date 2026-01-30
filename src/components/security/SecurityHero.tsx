'use client';

/**
 * Security Hero Component
 * EXACT implementation from designer-src/src/app/components/Solutions.tsx (Hero Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative pt-16 pb-24 overflow-hidden
 *
 * Gradient Background:
 * - absolute inset-y-0 left-12 right-12
 * - bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F]
 * - rounded-b-[29px]
 * - Animation: opacity 0→1, scale 0.95→1, duration 0.6s, ease "easeOut"
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Inner Wrapper:
 * - max-w-4xl mx-auto text-center
 * - Animation: opacity 0→1, y 30→0, duration 0.5s, delay 0.1s
 *
 * Eyebrow:
 * - text-[18px] text-white/80 mb-6 tracking-wide
 * - Animation: opacity 0→1, y 20→0, duration 0.4s, delay 0.2s
 * - Hover: scale 1.02
 *
 * Headline (H1):
 * - text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white
 * - inline-block px-2 pb-4
 * - Animation: opacity 0→1, y 30→0, duration 0.5s, delay 0.3s
 * - Hover: scale 1.01
 */

import { motion } from 'motion/react';

export function SecurityHero() {
  return (
    <section className="relative pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Gradient Background - responsive left/right insets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[20px] sm:rounded-b-[24px] md:rounded-b-[29px]"
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center px-2 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-20"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="text-[14px] sm:text-[16px] md:text-[18px] text-white/80 mb-3 sm:mb-4 md:mb-6 tracking-wide"
          >
            We are SOC 2 Type II attested, HIPAA-compliant.
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] md:leading-[1.1] text-white inline-block px-2 pb-4 max-w-[18ch] sm:max-w-[22ch] md:max-w-none mx-auto"
          >
            Healthcare Data. Maximum Security.
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}

export default SecurityHero;
