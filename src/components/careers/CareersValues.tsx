'use client';

/**
 * CareersValues Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import { Heart, Target, Shield, LucideIcon } from 'lucide-react';
import type { CareersValuesContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface CareersValuesProps {
  content?: CareersValuesContent;
}

const DEFAULT_CONTENT: CareersValuesContent = {
  values: [
    { title: 'Passionate.', description: 'We value individuals who can adapt, learn, and persevere through challenges.' },
    { title: 'Committed.', description: 'A shared promise to push the envelope for the future of healthcare.' },
    { title: 'Resilient.', description: 'Support and uplift each other to achieve our shared vision and goals.' },
  ],
};

// Icon and color mapping
const ICON_MAP: Record<string, LucideIcon> = {
  'Passionate.': Heart,
  'Committed.': Target,
  'Resilient.': Shield,
};

const COLOR_MAP: Record<string, string> = {
  'Passionate.': '#FF4E3A',
  'Committed.': '#06003F',
  'Resilient.': '#06003F',
};

const ICON_SEQUENCE: LucideIcon[] = [Heart, Target, Shield];
const COLOR_SEQUENCE: string[] = ['#FF4E3A', '#06003F', '#06003F'];

// ============================================
// Component
// ============================================

export function CareersValues({ content }: CareersValuesProps) {
  const sectionContent = content || DEFAULT_CONTENT;
  const values = sectionContent.values;
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-14 sm:pb-18 md:pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        {/* Grid Features - 3 columns on lg, 2 on sm, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = ICON_MAP[value.title] || ICON_SEQUENCE[index % ICON_SEQUENCE.length];
            const bgColor = COLOR_MAP[value.title] || COLOR_SEQUENCE[index % COLOR_SEQUENCE.length];
            
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                }}
                className={`group cursor-pointer p-5 sm:p-6 lg:p-0 text-center lg:text-left border-b border-[#06003F]/10 last:border-b-0 sm:border-b-0 ${
                  index !== values.length - 1
                    ? 'lg:border-r lg:border-[#06003F]/10 lg:pr-12'
                    : ''
                }`}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-[10px] sm:rounded-[12px] flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 transition-all duration-300 mx-auto lg:mx-0"
                  style={{ backgroundColor: bgColor }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" strokeWidth={2} />
                </motion.div>

                {/* Title */}
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#06003F] tracking-tight mb-3 sm:mb-4 group-hover:text-[#FF4E3A] transition-colors duration-300">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-300 max-w-[32ch] mx-auto lg:mx-0 lg:max-w-none">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CareersValues;
