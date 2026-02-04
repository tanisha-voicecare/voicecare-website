'use client';

/**
 * Company Hero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { CompanyHeroContent } from '@/lib/content';

interface CompanyHeroProps {
  content?: CompanyHeroContent;
}

const DEFAULT_CONTENT: CompanyHeroContent = {
  eyebrow: 'Supercharging administration with',
  headline: 'Artificial Intelligence',
};

export function CompanyHero({ content }: CompanyHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;

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
            className="text-[14px] sm:text-[16px] md:text-[18px] text-white/80 mb-4 sm:mb-5 md:mb-6 tracking-wide"
          >
            {heroContent.eyebrow}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="text-[36px] sm:text-[52px] md:text-[68px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] md:leading-[1.1] text-white inline-block px-2 pb-4 max-w-[18ch] sm:max-w-[22ch] md:max-w-none mx-auto"
          >
            {heroContent.headline}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}

export default CompanyHero;
