'use client';

/**
 * CareersHero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { CareersHeroContent } from '@/lib/content';

interface CareersHeroProps {
  content?: CareersHeroContent;
}

const DEFAULT_CONTENT: CareersHeroContent = {
  headline: 'People who care.\nAI that matters.',
  subheadline: "A collective of talented individuals uniting to create something greater than themselves. Together, we're pushing the boundaries of AI and healthcare.",
};

export function CareersHero({ content }: CareersHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;
  const headlineLines = heroContent.headline.split('\n');
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
                  className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.05] sm:leading-[1.1] text-white mb-5 sm:mb-6 md:mb-8 max-w-[16ch] sm:max-w-[20ch] md:max-w-none mx-auto break-words"
                >
                  {headlineLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < headlineLines.length - 1 && <br />}
                    </span>
                  ))}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-[16px] sm:text-[19px] md:text-[23px] text-white/80 leading-relaxed max-w-[50ch] sm:max-w-2xl md:max-w-3xl mx-auto px-2"
                >
                  {heroContent.subheadline}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersHero;
