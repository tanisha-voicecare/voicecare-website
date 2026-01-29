'use client';

/**
 * CEO Quote Section Component
 * EXACT implementation from designer-src/src/app/components/company/CEOQuoteSection.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-32 overflow-hidden
 *
 * Background Gradient:
 * - absolute inset-0 bg-gradient-to-br from-[#06003F] via-[#1a0f3d] to-[#2d1147]
 *
 * Decorative Glow:
 * - absolute top-0 right-0 w-[800px] h-[800px]
 * - Inner: bg-gradient-radial from-[#FF4E3A]/40 via-[#8B3A8B]/30 to-transparent blur-3xl
 * - Animation: opacity 0→0.3, scale 0.8→1, duration 0.8s, whileInView
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Grid:
 * - grid lg:grid-cols-2 gap-16 items-center
 *
 * Left Column (Quote):
 * - Animation: opacity 0→1, x -30→0, duration 0.5s
 *
 * Quote Mark:
 * - text-[#FF4E3A] text-[80px] leading-none mb-6 font-serif
 * - Animation: opacity 0→1, scale 0.5→1, duration 0.4s, delay 0.1s
 *
 * Quote Text:
 * - text-[28px] text-white/95 leading-relaxed mb-8 font-light
 * - Animation: opacity 0→1, y 20→0, duration 0.5s, delay 0.15s
 *
 * Attribution:
 * - border-l-2 border-[#FF4E3A] pl-6
 * - Animation: opacity 0→1, x -20→0, duration 0.4s, delay 0.25s
 * - Hover: x 5, duration 0.2s
 * - Name: text-white font-bold text-[20px] mb-1
 * - Title: text-[#FF4E3A] text-[16px] font-medium
 *
 * Right Column (Image):
 * - Animation: opacity 0→1, x 30→0, duration 0.5s
 * - Hover: scale 1.02, duration 0.3s
 * - Image container: rounded-[12px] overflow-hidden border border-white/10
 * - Image: w-full h-auto object-cover aspect-[4/5]
 * - Image hover: scale-105 transition-transform duration-300
 * - Overlay: bg-gradient-to-t from-[#FF4E3A]/10 to-transparent, opacity 0→1 on hover
 */

import Image from 'next/image';
import { motion } from 'motion/react';

export function CEOQuoteSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06003F] via-[#1a0f3d] to-[#2d1147]" />

      {/* Decorative Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[800px] h-[800px]"
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#FF4E3A]/40 via-[#8B3A8B]/30 to-transparent blur-3xl" />
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Quote Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Quote Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[#FF4E3A] text-[80px] leading-none mb-6 font-serif"
            >
              &ldquo;
            </motion.div>

            {/* Quote Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[28px] text-white/95 leading-relaxed mb-8 font-light"
            >
              We&apos;re giving back time to healthcare professionals so that they
              can focus on high-order patient tasks, and driving radical
              efficiencies with every conversation.
            </motion.p>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="border-l-2 border-[#FF4E3A] pl-6"
            >
              <div className="text-white font-bold text-[20px] mb-1">
                Parag Jhaveri
              </div>
              <div className="text-[#FF4E3A] text-[16px] font-medium">
                CEO, Founder
              </div>
            </motion.div>
          </motion.div>

          {/* Right: CEO Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="group"
          >
            <div className="relative rounded-[12px] overflow-hidden border border-white/10">
              <Image
                src="/images/company/ceo/parag-jhaveri.png"
                alt="Parag Jhaveri - CEO & Founder"
                width={600}
                height={750}
                className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF4E3A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CEOQuoteSection;
