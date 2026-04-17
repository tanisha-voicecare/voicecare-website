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
    <section className="relative pt-3 sm:pt-5 pb-6 sm:pb-8 overflow-hidden bg-white">
      <div className="w-full px-3 sm:px-5">
        {/* Rounded Rectangle Background Container */}
        <div className="relative rounded-[24px] overflow-hidden w-full">
          {/* Gradient Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F]"
          />

          {/* Content Container */}
          <div className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
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
                  className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.1] text-white mb-4 sm:mb-6"
                >
                  {heroContent.headline}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[16px] sm:text-[19px] md:text-[23px] text-white/80 max-w-3xl mx-auto leading-relaxed"
                >
                  {heroContent.description}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
