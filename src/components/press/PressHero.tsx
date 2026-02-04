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
  headline: 'Press Coverage',
  description: "Explore our remarkable journey through extensive press features, media highlights that showcase our brand's growth and impact.",
};

export function PressHero({ content }: PressHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;
  return (
    <section className="pt-10 sm:pt-12 md:pt-[45px] pb-10 sm:pb-11 md:pb-12 border-b border-[#06003F]/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="max-w-4xl mt-4 sm:mt-5 md:mt-[21px]"
        >
          <h1 className="text-[48px] sm:text-[64px] md:text-[84px] font-bold tracking-tight text-[#06003F] mb-4 sm:mb-5 md:mb-6 leading-[0.95]">
            {heroContent.headline}
          </h1>

          <p className="text-[16px] sm:text-[17px] md:text-[18px] text-[#06003F]/60 leading-relaxed font-medium max-w-[60ch] sm:max-w-xl md:max-w-2xl">
            {heroContent.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PressHero;
