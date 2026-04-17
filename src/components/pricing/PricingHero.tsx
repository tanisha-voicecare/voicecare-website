'use client';

/**
 * PricingHero Component
 * Dynamic content from WordPress + matching site design
 */

import { motion } from 'motion/react';
import type { PricingHeroContent } from '@/lib/content';

interface PricingHeroProps {
  content?: PricingHeroContent;
}

const DEFAULT_CONTENT: PricingHeroContent = {
  badge: 'Pricing',
  headline: 'ROI Calculator',
  description: 'Calculate your potential savings and explore our flexible pricing options.',
};

export function PricingHero({ content }: PricingHeroProps) {
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
{/* Badge chip - commented out per feedback
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#06003F]/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-[#06003F] border border-[#06003F]/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse" />
            {heroContent.badge}
          </div>
          */}
        </motion.div>
      </div>
    </section>
  );
}

export default PricingHero;
