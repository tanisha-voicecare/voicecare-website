'use client';

/**
 * About Us Section Component
 * EXACT implementation from designer-src/src/app/components/company/AboutUsSection.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-32 bg-white
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Header:
 * - text-center mb-16
 * - h2: text-[48px] font-bold text-[#06003F] mb-6
 * - p: text-[18px] text-[#06003F]/60 max-w-3xl mx-auto leading-relaxed
 * - Animation: opacity 0→1, y 20→0, duration 0.5s, whileInView, viewport once
 *
 * Cards Grid:
 * - grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 max-w-4xl mx-auto
 *
 * Vision Card (left):
 * - md:pr-12 md:border-r md:border-[#06003F]/10 group cursor-default
 * - Animation: opacity 0→1, y 30→0, duration 0.5s, delay 0.05s
 * - Hover: y -5, duration 0.2s
 * - Icon box: w-14 h-14 rounded-[8px] bg-[#06003F]
 * - Icon hover: scale 1.05, rotate 2, spring
 *
 * Mission Card (right):
 * - md:pl-12 mt-8 md:mt-0 group cursor-default
 * - Animation: opacity 0→1, y 30→0, duration 0.5s, delay 0.1s
 * - Hover: y -5, duration 0.2s
 * - Icon box: w-14 h-14 rounded-[8px] bg-[#FF4E3A]
 * - Icon hover: scale 1.05, rotate -2, spring
 *
 * Card Title:
 * - text-[24px] font-bold text-[#06003F] mb-4 leading-none
 * - group-hover:text-[#FF4E3A] transition-colors duration-200
 *
 * Card Description:
 * - text-[16px] text-[#06003F]/60 leading-relaxed
 */

import { motion } from 'motion/react';
import { Target, Lightbulb } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section className="relative py-32 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[48px] font-bold text-[#06003F] mb-6">
            About Us
          </h2>
          <p className="text-[18px] text-[#06003F]/60 max-w-3xl mx-auto leading-relaxed">
            We are building a Healthcare Administration General Intelligence
            (HAGI) company for the entire back-office. Powered by advanced
            Generative AI, we are massively eliminating administrative burden
            and radically improving operational efficiency.
          </p>
        </motion.div>

        {/* Two Column Cards - Metrics Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 max-w-4xl mx-auto">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="md:pr-12 md:border-r md:border-[#06003F]/10 group cursor-default"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-14 h-14 rounded-[8px] bg-[#06003F] flex items-center justify-center mb-6"
            >
              <Target className="w-7 h-7 text-white" strokeWidth={2} />
            </motion.div>
            <h3 className="text-[24px] font-bold text-[#06003F] mb-4 leading-none group-hover:text-[#FF4E3A] transition-colors duration-200">
              Our Vision
            </h3>
            <p className="text-[16px] text-[#06003F]/60 leading-relaxed">
              To transform healthcare administration through intelligent
              automation, giving healthcare professionals more time to focus on
              what matters most: patient care.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="md:pl-12 mt-8 md:mt-0 group cursor-default"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-14 h-14 rounded-[8px] bg-[#FF4E3A] flex items-center justify-center mb-6"
            >
              <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />
            </motion.div>
            <h3 className="text-[24px] font-bold text-[#06003F] mb-4 leading-none group-hover:text-[#FF4E3A] transition-colors duration-200">
              Our Mission
            </h3>
            <p className="text-[16px] text-[#06003F]/60 leading-relaxed">
              To dramatically improve access, adherence, and outcomes for the
              patients and the healthcare workforce through the application of
              generative AI.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
