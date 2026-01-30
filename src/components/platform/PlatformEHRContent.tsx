'use client';

/**
 * Platform EHR Content Section
 * EXACT implementation from designer-src/src/app/components/Platform.tsx (EHR Content Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-[90px] bg-white px-[0px]
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-5xl
 *
 * Motion Wrapper:
 * - initial: opacity 0, y 20
 * - whileInView: opacity 1, y 0
 * - viewport: once true
 * - transition: duration 0.6
 * - text-center
 *
 * Heading (h2):
 * - text-[48px] font-bold text-[#06003F] mb-8 tracking-tight leading-[1.1]
 *
 * Paragraph Container:
 * - text-[17px] text-[#06003F]/70 leading-relaxed space-y-6 max-w-4xl mx-auto
 *
 * Bold Paragraph:
 * - font-bold text-[18px]
 */

import { motion } from 'motion/react';

export function PlatformEHRContent() {
  return (
    <section className="relative py-16 sm:py-20 md:py-[90px] bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] mb-6 sm:mb-8 tracking-tight leading-[1.1] max-w-[20ch] mx-auto md:max-w-none">
            We Are Enterprise
            <br />
            Administration platform
          </h2>
          <div className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            <p>
              One secure conversational platform, powered by advanced and constantly improving
              generative models for healthcare professionals to complete 1000s of calls and tasks in
              one click. You can search for historical calls, and get summarized use-case-specific
              information, which is ingested in any EHR or any system of record.
            </p>
            <p>
              Our AI-powered analytics gives you actionable insights to measure the performance of
              every conversation.
            </p>
            <p className="font-bold text-[16px] sm:text-[17px] md:text-[18px]">
              Automate the back office to improve patient experience with every conversation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PlatformEHRContent;
