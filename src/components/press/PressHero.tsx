'use client';

/**
 * PressHero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PressHeroContent } from '@/lib/content';

interface PressHeroProps {
  content?: PressHeroContent;
}

const DEFAULT_CONTENT: PressHeroContent = {
  badge: 'Press Coverage',
  headline: 'Press',
  description: "Explore our remarkable journey through extensive press features, media highlights that showcase our brand's growth and impact.",
};

export function PressHero({ content }: PressHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;
  return (
    <section className="pt-4 sm:pt-5 md:pt-6 pb-8 sm:pb-10 md:pb-12 border-b border-[#06003F]/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#06003F]/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] mb-5 sm:mb-6 md:mb-8 text-[#06003F] border border-[#06003F]/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse" />
            {heroContent.badge}
          </div>

          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-bold tracking-tight text-[#06003F] mb-4 sm:mb-5 md:mb-6 leading-[1.0] sm:leading-[0.95]">
            {heroContent.headline}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#06003F]/60 leading-relaxed font-medium max-w-[60ch] sm:max-w-xl md:max-w-2xl">
            {heroContent.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PressHero;
