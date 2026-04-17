'use client';

/**
 * Platform Hero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PlatformHeroContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface PlatformHeroProps {
  content?: PlatformHeroContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: PlatformHeroContent = {
  eyebrow: "We're powered by",
  headline: 'Healthcare Administration General Intelligence (HAGI)',
  description: 'It is the heart of the VoiceCare platform. Using Generative and Conversational AI, it intelligently automates routine back-office workflows.',
};

export function PlatformHero({ content }: PlatformHeroProps) {
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
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="text-[16px] sm:text-[19px] md:text-[23px] text-white/80 mb-4 sm:mb-5 md:mb-6 tracking-wide"
                >
                  {heroContent.eyebrow}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.0] md:leading-[1.1] text-white inline-block px-2 pb-4 max-w-[18ch] sm:max-w-[22ch] md:max-w-none mx-auto"
                >
                  {heroContent.headline}
                </motion.h1>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="text-[16px] sm:text-[19px] md:text-[23px] text-white/80 mt-4 sm:mt-5 md:mt-6 tracking-wide max-w-[48ch] sm:max-w-2xl md:max-w-3xl mx-auto"
                >
                  {heroContent.description}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformHero;
