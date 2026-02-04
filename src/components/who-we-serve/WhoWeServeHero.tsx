'use client';

/**
 * WhoWeServeHero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { WhoWeServeHeroContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface WhoWeServeHeroProps {
  content?: WhoWeServeHeroContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: WhoWeServeHeroContent = {
  headline: 'Who We Serve',
  description: '',
};

export function WhoWeServeHero({ content }: WhoWeServeHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;

  return (
    <section className="relative pt-4 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      {/* Gradient Background - responsive left/right insets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[20px] sm:rounded-b-[24px] md:rounded-b-[29px]"
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10 mt-6 sm:mt-7 md:mt-8">
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
            className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.1] text-white mb-4 sm:mb-6 mt-[40px] sm:mt-[52px] md:mt-[64px]"
          >
            {heroContent.headline}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[16px] sm:text-[18px] md:text-[20px] text-white/80 max-w-3xl mx-auto leading-relaxed mb-[24px] sm:mb-[30px] md:mb-[38px]"
          >
            {heroContent.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
