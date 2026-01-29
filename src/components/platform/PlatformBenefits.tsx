'use client';

/**
 * Platform Benefits Section
 * EXACT implementation from designer-src/src/app/components/Platform.tsx (Benefits Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-24 bg-white
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Section Heading:
 * - text-center mb-16
 * - h2: text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]
 *
 * Benefit Block Grid:
 * - grid md:grid-cols-2 gap-16 items-center
 * - Spacing between blocks: mt-24
 *
 * Alternating Pattern:
 * 1. Content LEFT, Image RIGHT
 * 2. Image LEFT, Content RIGHT
 * 3. Content LEFT, Image RIGHT
 * 4. Image LEFT, Content RIGHT
 *
 * Content Block:
 * - h3: text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]
 * - p: text-[17px] text-[#06003F]/70 leading-relaxed
 *
 * Video Block:
 * - Container: aspect-square w-full rounded-[12px] overflow-hidden
 * - Video: w-full h-full object-cover
 * - autoPlay, loop, muted, playsInline (behaves like GIF)
 *
 * Animations:
 * - Content/Video from left: initial x: -30, animate x: 0
 * - Content/Video from right: initial x: 30, animate x: 0
 * - All: opacity 0→1, duration 0.6, viewport once: true
 */

import { motion } from 'motion/react';

// ============================================
// Types
// ============================================

interface Benefit {
  id: string;
  title: string;
  description: string;
  video: string;
  alt: string;
}

// ============================================
// Data (EXACT from designer-src)
// ============================================

const benefits: Benefit[] = [
  {
    id: 'automate',
    title: 'Automate tasks and conversations',
    description:
      'Schedule one-time or recurring automated phone conversations and tasks in one click.',
    video: '/images/platform/benefits/automate-tasks.mp4',
    alt: 'Healthcare automation dashboard',
  },
  {
    id: 'search',
    title: 'Search for conversations',
    description:
      'Find structured data across every conversational audio and transcript, and get use-case specific call summary.',
    video: '/images/platform/benefits/search-conversations.mp4',
    alt: 'Search conversations interface',
  },
  {
    id: 'analytics',
    title: 'AI-powered call analytics',
    description:
      "Generate knowledge grounded in your back-office information – with drill-down analytics for every conversation on what's working, and where to improve.",
    video: '/images/platform/benefits/ai-analytics.mp4',
    alt: 'AI-powered analytics dashboard',
  },
  {
    id: 'customize',
    title: 'Customize conversations',
    description:
      'For use-case specific conversations, ask the questions that matter to deliver healthcare outcomes for your patients.',
    video: '/images/platform/benefits/customize-conversations.mp4',
    alt: 'Customize conversations interface',
  },
];

// ============================================
// Component
// ============================================

export function PlatformBenefits() {
  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            Benefits
          </h2>
        </motion.div>

        {/* Benefit 1: Content LEFT, Image RIGHT */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
              {benefits[0].title}
            </h3>
            <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
              {benefits[0].description}
            </p>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square w-full rounded-[12px] overflow-hidden">
              <video
                src={benefits[0].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Benefit 2: Video LEFT, Content RIGHT */}
        <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square w-full rounded-[12px] overflow-hidden">
              <video
                src={benefits[1].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
              {benefits[1].title}
            </h3>
            <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
              {benefits[1].description}
            </p>
          </motion.div>
        </div>

        {/* Benefit 3: Content LEFT, Video RIGHT */}
        <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
              {benefits[2].title}
            </h3>
            <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
              {benefits[2].description}
            </p>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square w-full rounded-[12px] overflow-hidden">
              <video
                src={benefits[2].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Benefit 4: Video LEFT, Content RIGHT */}
        <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square w-full rounded-[12px] overflow-hidden">
              <video
                src={benefits[3].video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
              {benefits[3].title}
            </h3>
            <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
              {benefits[3].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PlatformBenefits;
