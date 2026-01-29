'use client';

/**
 * Platform Hero Component
 * EXACT implementation from designer-src/src/app/components/Platform.tsx (Hero Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative pt-40 pb-24 overflow-hidden
 *
 * Gradient Background:
 * - absolute inset-y-0 left-12 right-12
 * - bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F]
 * - rounded-b-[29px]
 * - Animation: opacity 0→1, scale 0.95→1, duration 0.6s
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Inner Wrapper:
 * - max-w-4xl mx-auto text-center
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
 *
 * Description:
 * - text-[18px] text-white/80 mt-6 tracking-wide max-w-3xl mx-auto
 * - Animation: opacity 0→1, y 20→0, duration 0.4s, delay 0.4s
 * - Hover: scale 1.02
 */

import { motion } from 'motion/react';

export function PlatformHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-12 right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[29px]"
      />

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="text-[18px] text-white/80 mb-6 tracking-wide"
          >
            We're powered by
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white inline-block px-2 pb-4"
          >
            Healthcare Administration General Intelligence (HAGI)
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="text-[18px] text-white/80 mt-6 tracking-wide max-w-3xl mx-auto"
          >
            It is the heart of the VoiceCare platform. Using Generative and Conversational AI, it
            intelligently automates routine back-office workflows.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PlatformHero;
