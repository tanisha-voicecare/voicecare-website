'use client';

/**
 * About Us Section Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import { Target, Lightbulb } from 'lucide-react';
import type { AboutUsSectionContent } from '@/lib/content';

interface AboutUsSectionProps {
  content?: AboutUsSectionContent;
}

const DEFAULT_CONTENT: AboutUsSectionContent = {
  sectionTitle: 'About Us',
  sectionDescription: 'We are building a Healthcare Administration General Intelligence (HAGI) company for the entire back-office. Powered by advanced Generative AI, we are massively eliminating administrative burden and radically improving operational efficiency.',
  visionTitle: 'Our Vision',
  visionDescription: 'To transform healthcare administration through intelligent automation, giving healthcare professionals more time to focus on what matters most: patient care.',
  missionTitle: 'Our Mission',
  missionDescription: 'To dramatically improve access, adherence, and outcomes for the patients and the healthcare workforce through the application of generative AI.',
};

export function AboutUsSection({ content }: AboutUsSectionProps) {
  const sectionContent = content || DEFAULT_CONTENT;
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
            {sectionContent.sectionTitle}
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[18px] text-[#06003F]/60 max-w-[48ch] sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
            {sectionContent.sectionDescription}
          </p>
        </motion.div>

        {/* Two Column Cards - Metrics Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-0 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 md:p-0 md:pr-12 md:border-r md:border-[#06003F]/10 group cursor-default bg-[#FAFBFC] md:bg-transparent rounded-[12px] md:rounded-none text-center md:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-[8px] bg-[#06003F] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto md:mx-0"
            >
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            </motion.div>
            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4 leading-none group-hover:text-[#FF4E3A] transition-colors duration-200">
              {sectionContent.visionTitle}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#06003F]/60 leading-relaxed">
              {sectionContent.visionDescription}
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 md:p-0 md:pl-12 group cursor-default bg-[#FAFBFC] md:bg-transparent rounded-[12px] md:rounded-none text-center md:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-[8px] bg-[#FF4E3A] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto md:mx-0"
            >
              <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            </motion.div>
            <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4 leading-none group-hover:text-[#FF4E3A] transition-colors duration-200">
              {sectionContent.missionTitle}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#06003F]/60 leading-relaxed">
              {sectionContent.missionDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
