'use client';

/**
 * CEO Quote Section Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import Image from 'next/image';
import { motion } from 'motion/react';
import type { CEOQuoteContent } from '@/lib/content';

interface CEOQuoteSectionProps {
  content?: CEOQuoteContent;
}

const DEFAULT_CONTENT: CEOQuoteContent = {
  quote: "We're giving back time to healthcare professionals so that they can focus on high-order patient tasks, and driving radical efficiencies with every conversation.",
  name: 'Parag Jhaveri',
  title: 'CEO, Founder',
  image: '/images/company/ceo/parag-jhaveri.png',
};

export function CEOQuoteSection({ content }: CEOQuoteSectionProps) {
  const quoteContent = content || DEFAULT_CONTENT;
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden w-full">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06003F] via-[#1a0f3d] to-[#2d1147]" />

      {/* Decorative Glow - contained to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-[#FF4E3A]/40 via-[#8B3A8B]/30 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Quote Content - order-2 on mobile to show image first */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Quote Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[#FF4E3A] text-[48px] sm:text-[64px] md:text-[80px] leading-none mb-3 sm:mb-4 md:mb-6 font-serif"
            >
              &ldquo;
            </motion.div>

            {/* Quote Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] text-white/95 leading-relaxed mb-6 sm:mb-7 md:mb-8 font-light"
            >
              {quoteContent.quote}
            </motion.p>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="border-l-2 border-[#FF4E3A] pl-4 sm:pl-5 md:pl-6 inline-block lg:block"
            >
              <div className="text-white font-bold text-[17px] sm:text-[18px] md:text-[20px] mb-1">
                {quoteContent.name}
              </div>
              <div className="text-[#FF4E3A] text-[14px] sm:text-[15px] md:text-[16px] font-medium">
                {quoteContent.title}
              </div>
            </motion.div>
          </motion.div>

          {/* CEO Image - order-1 on mobile to show first */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="group order-1 lg:order-2 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-none mx-auto lg:mx-0"
          >
            <div className="relative rounded-[12px] overflow-hidden border border-white/10">
              <Image
                src={quoteContent.image}
                alt={`${quoteContent.name} - ${quoteContent.title} of VoiceCare AI`}
                width={600}
                height={750}
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 50vw"
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
