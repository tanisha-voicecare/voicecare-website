'use client';

/**
 * PartnerHero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PartnerHeroContent } from '@/lib/content';

interface PartnerHeroProps {
  content?: PartnerHeroContent;
}

const DEFAULT_CONTENT: PartnerHeroContent = {
  headline: 'Partner with Us',
  description: 'Collaborating with VoiceCare will drive mutual growth and success. Fill out the form below to explore partnership opportunities and embark on a journey toward shaping the future of healthcare together.',
};

export function PartnerHero({ content }: PartnerHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pt-12 sm:pt-16 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16"
      >
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] mb-[16px] sm:mb-[20px] md:mb-[24px] font-bold text-[#06003F] mt-[-25px] sm:mt-[-35px] md:mt-[-45px]">
          {heroContent.headline}
        </h1>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/60 leading-relaxed mx-auto px-2">
          {heroContent.description}
        </p>
      </motion.div>
    </section>
  );
}

export default PartnerHero;
