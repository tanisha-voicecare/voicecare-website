'use client';

/**
 * Security Hero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { SecurityHeroContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface SecurityHeroProps {
  content?: SecurityHeroContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: SecurityHeroContent = {
  headline: 'Healthcare Data. Maximum Security.',
  subheadline: 'We are SOC 2 Type II attested, HIPAA-compliant.',
};

export function SecurityHero({ content }: SecurityHeroProps) {
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
                {/* Subheadline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="text-[16px] sm:text-[19px] md:text-[23px] text-white/80 mb-3 sm:mb-4 md:mb-6 tracking-wide"
                >
                  {heroContent.subheadline}
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecurityHero;
