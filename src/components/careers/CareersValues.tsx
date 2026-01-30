'use client';

/**
 * CareersValues Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Careers.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - py-24 bg-white
 *
 * Container:
 * - container mx-auto px-6 md:px-12 max-w-7xl
 *
 * Grid:
 * - grid grid-cols-1 md:grid-cols-3 gap-12
 *
 * Card Animation:
 * - initial: opacity: 0, y: 30
 * - whileInView: opacity: 1, y: 0
 * - viewport: once: true, margin: "-100px"
 * - transition: duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1]
 *
 * Card Hover:
 * - y: -8
 * - transition: duration: 0.3, ease: [0.23, 1, 0.32, 1]
 *
 * Card Classes:
 * - group cursor-pointer
 * - Non-last cards: md:border-r md:border-[#06003F]/10 md:pr-12
 *
 * Icon Container:
 * - w-14 h-14 rounded-[12px] flex items-center justify-center mb-6
 * - transition-all duration-300
 * - whileHover: scale: 1.05, rotate: 3
 *
 * Icon:
 * - w-6 h-6 text-white strokeWidth={2}
 *
 * Title:
 * - text-[32px] font-bold text-[#06003F] tracking-tight mb-4
 * - group-hover:text-[#FF4E3A] transition-colors duration-300
 *
 * Description:
 * - text-[16px] text-[#06003F]/60 leading-relaxed
 * - group-hover:text-[#06003F]/80 transition-colors duration-300
 */

import { motion } from 'motion/react';
import { Heart, Target, Shield, LucideIcon } from 'lucide-react';

// ============================================
// Types
// ============================================

interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
}

// ============================================
// Data - EXACT from designer-src
// ============================================

const values: ValueItem[] = [
  {
    title: 'Passionate.',
    description: 'We value individuals who can adapt, learn, and persevere through challenges.',
    icon: Heart,
    bgColor: '#FF4E3A',
  },
  {
    title: 'Committed.',
    description: 'A shared promise to push the envelope for the future of healthcare.',
    icon: Target,
    bgColor: '#06003F',
  },
  {
    title: 'Resilient.',
    description: 'Support and uplift each other to achieve our shared vision and goals.',
    icon: Shield,
    bgColor: '#06003F',
  },
];

// ============================================
// Component
// ============================================

export function CareersValues() {
  return (
    <section className="py-14 sm:py-18 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        {/* Grid Features - 3 columns on lg, 2 on sm, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {values.map((value, index) => (
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
                style={{ backgroundColor: value.bgColor }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <value.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-white" strokeWidth={2} />
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareersValues;
