'use client';

/**
 * CareersHero Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Careers.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - relative pt-16 pb-24 overflow-hidden
 *
 * Gradient Background:
 * - absolute inset-y-0 left-12 right-12
 * - bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F]
 * - rounded-b-[29px]
 * - Animation: initial opacity:0, scale:0.95 → opacity:1, scale:1
 * - Duration: 0.6s, ease: "easeOut"
 *
 * Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Content Wrapper:
 * - max-w-4xl mx-auto text-center
 * - Animation: initial opacity:0, y:30 → opacity:1, y:0
 * - Duration: 0.5s, delay: 0.1s
 *
 * Headline (h1):
 * - text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white mb-8
 * - Animation: initial opacity:0, y:30 → opacity:1, y:0
 * - Duration: 0.5s, delay: 0.3s
 *
 * Subheadline (p):
 * - text-[18px] text-white/80 leading-relaxed max-w-3xl mx-auto
 * - Animation: initial opacity:0, y:20 → opacity:1, y:0
 * - Duration: 0.4s, delay: 0.4s
 */

import { motion } from 'motion/react';

export function CareersHero() {
  return (
    <section className="relative pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Gradient Background - responsive left/right insets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[20px] sm:rounded-b-[24px] md:rounded-b-[29px]"
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center py-8 sm:py-10 md:py-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.1] text-white mb-5 sm:mb-6 md:mb-8 max-w-[16ch] sm:max-w-[20ch] md:max-w-none mx-auto break-words"
          >
            People who care.
            <br />
            AI that matters.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-[14px] sm:text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-[50ch] sm:max-w-2xl md:max-w-3xl mx-auto px-2"
          >
            A collective of talented individuals uniting to create something greater than themselves.
            Together, we&apos;re pushing the boundaries of AI and healthcare.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default CareersHero;
