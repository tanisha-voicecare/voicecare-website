'use client';

/**
 * WhoWeServeHero Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/WhoWeServe.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - relative pt-4 pb-24 overflow-hidden
 *
 * Gradient Background (motion.div):
 * - absolute inset-y-0 left-12 right-12
 * - bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F]
 * - rounded-b-[29px]
 * - Animation: opacity 0->1, scale 0.95->1, duration 0.6s, easeOut
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10 mt-8
 *
 * Inner Wrapper:
 * - max-w-4xl mx-auto text-center
 * - Animation: opacity 0->1, y 30->0, duration 0.5s, delay 0.1s
 *
 * H1:
 * - text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white
 * - mb-[38px] mt-[64px] mr-[0px] ml-[0px]
 * - Animation: opacity 0->1, y 30->0, duration 0.5s, delay 0.3s
 */

import { motion } from 'motion/react';

export function WhoWeServeHero() {
  return (
    <section className="relative pt-4 pb-24 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-12 right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[29px]"
      />

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white mb-[38px] mt-[64px] mr-[0px] ml-[0px]"
          >
            Who We Serve
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
