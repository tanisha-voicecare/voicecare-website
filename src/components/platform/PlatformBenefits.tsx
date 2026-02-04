'use client';

/**
 * Platform Benefits Section
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import type { PlatformBenefitsContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface PlatformBenefitsProps {
  content?: PlatformBenefitsContent;
}

interface BenefitWithVideo {
  id: string;
  title: string;
  description: string;
  video: string;
  alt: string;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: PlatformBenefitsContent = {
  sectionTitle: 'Benefits',
  benefits: [
    {
      title: 'Automate tasks and conversations',
      description: 'Schedule one-time or recurring automated phone conversations and tasks in one click.',
    },
    {
      title: 'Search for conversations',
      description: 'Find structured data across every conversational audio and transcript, and get use-case specific call summary.',
    },
    {
      title: 'AI-powered call analytics',
      description: "Generate knowledge grounded in your back-office information – with drill-down analytics for every conversation on what's working, and where to improve.",
    },
    {
      title: 'Customize conversations',
      description: 'For use-case specific conversations, ask the questions that matter to deliver healthcare outcomes for your patients.',
    },
  ],
};

// Video paths remain static (managed in codebase, not CMS)
const VIDEO_PATHS = [
  '/images/platform/benefits/automate-tasks.mp4',
  '/images/platform/benefits/search-conversations.mp4',
  '/images/platform/benefits/ai-analytics.mp4',
  '/images/platform/benefits/customize-conversations.mp4',
];

// ============================================
// Component
// ============================================

export function PlatformBenefits({ content }: PlatformBenefitsProps) {
  const benefitsContent = content || DEFAULT_CONTENT;
  
  // Merge content with video paths
  const benefits: BenefitWithVideo[] = benefitsContent.benefits.map((benefit, index) => ({
    id: `benefit-${index}`,
    title: benefit.title,
    description: benefit.description,
    video: VIDEO_PATHS[index] || VIDEO_PATHS[0],
    alt: benefit.title,
  }));

  return (
    <section className="relative py-14 sm:py-18 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            {benefitsContent.sectionTitle}
          </h2>
        </motion.div>

        {/* Benefit 1: Content LEFT, Image RIGHT */}
        {benefits[0] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2 md:order-1"
            >
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.2]">
                {benefits[0].title}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed">
                {benefits[0].description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 md:order-2"
            >
              <div className="aspect-[16/10] md:aspect-square w-full rounded-[12px] overflow-hidden">
                <video src={benefits[0].video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Benefit 2: Video LEFT, Content RIGHT */}
        {benefits[1] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mt-12 sm:mt-16 md:mt-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1"
            >
              <div className="aspect-[16/10] md:aspect-square w-full rounded-[12px] overflow-hidden">
                <video src={benefits[1].video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2"
            >
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.2]">
                {benefits[1].title}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed">
                {benefits[1].description}
              </p>
            </motion.div>
          </div>
        )}

        {/* Benefit 3: Content LEFT, Video RIGHT */}
        {benefits[2] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mt-12 sm:mt-16 md:mt-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2 md:order-1"
            >
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.2]">
                {benefits[2].title}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed">
                {benefits[2].description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 md:order-2"
            >
              <div className="aspect-[16/10] md:aspect-square w-full rounded-[12px] overflow-hidden">
                <video src={benefits[2].video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Benefit 4: Video LEFT, Content RIGHT */}
        {benefits[3] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mt-12 sm:mt-16 md:mt-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1"
            >
              <div className="aspect-[16/10] md:aspect-square w-full rounded-[12px] overflow-hidden">
                <video src={benefits[3].video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2"
            >
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.2]">
                {benefits[3].title}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed">
                {benefits[3].description}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PlatformBenefits;
