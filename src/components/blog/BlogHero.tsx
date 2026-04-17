'use client';

/**
 * BlogHero Component
 * Same themed header as Press Coverage: identical section, typography, and motion.
 */

import { motion } from 'motion/react';

interface BlogHeroProps {
  headline: string;
  description?: string;
}

export function BlogHero({ headline, description }: BlogHeroProps) {
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
            {headline}
          </h1>

          {description && (
            <p className="text-[16px] sm:text-[17px] md:text-[18px] text-[#06003F]/60 leading-relaxed font-medium max-w-[60ch] sm:max-w-xl md:max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default BlogHero;
