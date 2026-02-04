'use client';

/**
 * ScheduleDemoHero Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { ScheduleDemoHeroContent } from '@/lib/content';

interface ScheduleDemoHeroProps {
  content?: ScheduleDemoHeroContent;
}

const DEFAULT_CONTENT: ScheduleDemoHeroContent = {
  headline: 'Schedule a Demo',
  description: 'Gain a comprehensive understanding of how our AI-driven solutions can revolutionize your operations. Our team will reach out promptly to arrange a tailored demonstration that aligns with your needs and objectives.',
};

export function ScheduleDemoHero({ content }: ScheduleDemoHeroProps) {
  const heroContent = content || DEFAULT_CONTENT;
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pt-12 sm:pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16"
        >
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] mb-[16px] sm:mb-[20px] md:mb-[24px] font-bold text-[#06003F] mt-[-25px] sm:mt-[-35px] md:mt-[-50px]">
            {heroContent.headline}
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/60 leading-relaxed mx-auto px-2">
            {heroContent.description}
          </p>
        </motion.div>
    </section>
  );
}

export default ScheduleDemoHero;
