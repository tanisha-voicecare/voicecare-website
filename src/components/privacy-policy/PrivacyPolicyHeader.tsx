'use client';

/**
 * PrivacyPolicyHeader Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PrivacyFullContent } from '@/lib/content';

interface PrivacyPolicyHeaderProps {
  content?: PrivacyFullContent;
}

const DEFAULT_CONTENT: PrivacyFullContent = {
  title: 'Privacy Policy',
  sections: [],
};

export function PrivacyPolicyHeader({ content }: PrivacyPolicyHeaderProps) {
  const headerContent = content || DEFAULT_CONTENT;

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl py-12 sm:py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] mb-[24px] sm:mb-[36px] md:mb-[48px] font-bold text-[#06003F] text-center mt-[-20px] sm:mt-[-30px] md:mt-[-45px]">
          {headerContent.title}
        </h1>
      </motion.div>
    </section>
  );
}
