'use client';

/**
 * PressHero Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Press.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - pt-32 pb-12 border-b border-border/50
 *
 * Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Content Wrapper:
 * - max-w-4xl
 * - Animation: initial opacity:0, y:30 → opacity:1, y:0
 * - Duration: 0.8s, ease: [0.23, 1, 0.32, 1]
 *
 * Badge:
 * - inline-flex items-center gap-2 px-4 py-1.5 rounded-full
 * - bg-[#06003F]/5 text-[10px] font-bold uppercase tracking-[0.1em]
 * - mb-8 text-[#06003F] border border-[#06003F]/5
 * - Pulse dot: w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse
 *
 * Headline (h1):
 * - text-[84px] font-bold tracking-tight text-[#06003F] mb-6 leading-[0.95]
 *
 * Subheadline (p):
 * - text-xl text-[#06003F]/60 leading-relaxed font-medium max-w-2xl
 */

import { motion } from 'motion/react';

export function PressHero() {
  return (
    <section className="pt-32 pb-12 border-b border-[#06003F]/10">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06003F]/5 text-[10px] font-bold uppercase tracking-[0.1em] mb-8 text-[#06003F] border border-[#06003F]/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse" />
            Press Coverage
          </div>

          <h1 className="text-[84px] font-bold tracking-tight text-[#06003F] mb-6 leading-[0.95]">
            Press
          </h1>

          <p className="text-xl text-[#06003F]/60 leading-relaxed font-medium max-w-2xl">
            Explore our remarkable journey through extensive press features, media highlights that
            showcase our brand&apos;s growth and impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PressHero;
