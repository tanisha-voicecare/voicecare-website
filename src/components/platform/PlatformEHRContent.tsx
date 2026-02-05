'use client';

/**
 * Platform EHR Content Section
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PlatformEHRContent as PlatformEHRContentType } from '@/lib/content';

// ============================================
// Types
// ============================================

interface PlatformEHRContentProps {
  content?: PlatformEHRContentType;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: PlatformEHRContentType = {
  heading: 'We Are Enterprise\nAdministration platform',
  subheading: 'One secure conversational platform, powered by advanced and constantly improving generative models for healthcare professionals to complete 1000s of calls and tasks in one click. You can search for historical calls, and get summarized use-case-specific information, which is ingested in any EHR or any system of record.',
  additionalParagraphs: [
    'Our AI-powered analytics gives you actionable insights to measure the performance of every conversation.',
  ],
  closingStatement: 'Automate the back office to improve patient experience with every conversation.',
};

export function PlatformEHRContent({ content }: PlatformEHRContentProps) {
  const ehrContent = content || DEFAULT_CONTENT;

  return (
    <section className="relative pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-[90px] bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] mb-3 sm:mb-4 tracking-tight leading-[1.1]">
            {ehrContent.heading.split('\n').map((line, index, arr) => (
              <span key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed mb-4 sm:mb-6 max-w-4xl mx-auto">
            {ehrContent.subheading}
          </p>

          {ehrContent.additionalParagraphs.map((paragraph, index) => (
            <p key={index} className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed mb-4 sm:mb-6 max-w-4xl mx-auto">
              {paragraph}
            </p>
          ))}

          <p className="font-bold text-[16px] sm:text-[17px] md:text-[18px] text-[#06003F]">
            {ehrContent.closingStatement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default PlatformEHRContent;
