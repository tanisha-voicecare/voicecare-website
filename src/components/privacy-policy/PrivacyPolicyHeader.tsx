'use client';

/**
 * PrivacyPolicyHeader Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/PrivacyPolicy.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - container mx-auto px-6 md:px-16 max-w-7xl py-20
 *
 * Animation Wrapper:
 * - initial={{ opacity: 0, y: 20 }}
 * - animate={{ opacity: 1, y: 0 }}
 * - transition={{ duration: 0.6 }}
 *
 * H1:
 * - text-[48px] leading-[1.1] mb-[48px] font-bold text-center
 * - mt-[-45px] mr-[0px] ml-[0px]
 */

import { motion } from 'motion/react';

export function PrivacyPolicyHeader() {
  return (
    <section className="container mx-auto px-6 md:px-16 max-w-7xl py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[48px] leading-[1.1] mb-[48px] font-bold text-center mt-[-45px] mr-[0px] ml-[0px]">
          Privacy Policy
        </h1>
      </motion.div>
    </section>
  );
}
