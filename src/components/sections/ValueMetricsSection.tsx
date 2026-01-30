'use client';

/**
 * ValueMetricsSection Component (Why VoiceCare)
 * PIXEL-PERFECT implementation from designer-src/src/app/components/WhyUs.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - max-w-7xl (1280px)
 * - py-24 (96px)
 * - px-6 md:px-12 (24px / 48px)
 * - bg-background (#FFFFFF)
 *
 * Header:
 * - Wrapper: text-center mb-16
 * - Heading: text-[48px] font-bold tracking-tight text-[#06003F] mb-8
 * - Paragraph: text-lg font-medium leading-relaxed text-[#06003F]/60
 *              max-w-3xl mx-auto mt-[-30px]
 *
 * Grid:
 * - grid-cols-1 md:grid-cols-3
 * - gap-12 (48px)
 * - Dividers: md:border-r md:border-[#06003F]/10 md:pr-12 (columns 1-2 only)
 *
 * Cards:
 * - cursor-pointer
 * - hover: y: -8px, duration: 0.3s, ease: [0.23, 1, 0.32, 1]
 *
 * Icon Box:
 * - w-16 h-16 rounded-[12px] mb-6
 * - flex items-center justify-center
 * - transition-all duration-300
 * - hover: scale(1.05) rotate(3deg)
 * - Higher ROI: bg-[#06003F]
 * - Faster: bg-[#FF4E3A]
 * - Better Data Quality: bg-[#06003F]
 *
 * Icon: w-7 h-7 text-white strokeWidth={2}
 *
 * Typography:
 * - Percentage: text-5xl font-bold tracking-tight text-[#06003F] hover:text-[#FF4E3A]
 * - Title: text-2xl font-bold tracking-tight text-[#06003F] hover:text-[#FF4E3A]
 * - Row: flex items-baseline gap-3 mb-4
 * - Description: text-[16px] leading-relaxed text-[#06003F]/60 hover:text-[#06003F]/80
 *
 * Animations:
 * - Header: opacity 0→1, y 20→0, duration 0.7s, ease [0.23,1,0.32,1]
 * - Cards: opacity 0→1, y 30→0, duration 0.6s, stagger index*0.1
 */

import { motion } from 'motion/react';
import { TrendingUp, Zap, CheckCircle } from 'lucide-react';

// ============================================
// Types
// ============================================

interface ValueMetricsSectionProps {
  className?: string;
}

// ============================================
// Data - EXACT from designer-src WhyUs.tsx
// ============================================

const benefits = [
  {
    title: 'Higher ROI',
    description: 'Returns within a few months, not years.',
    icon: TrendingUp,
    bgColor: '#06003F',
    percentage: '70%',
  },
  {
    title: 'Faster',
    description: 'Collect, initiate, and transfer data',
    icon: Zap,
    bgColor: '#FF4E3A',
    percentage: '40%',
  },
  {
    title: 'Better Data Quality',
    description: 'Consistent data output with every conversation',
    icon: CheckCircle,
    bgColor: '#06003F',
    percentage: '20%',
  },
];

// ============================================
// Component
// ============================================

export function ValueMetricsSection({ className = '' }: ValueMetricsSectionProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-tight text-[#06003F] mb-4 sm:mb-6 md:mb-8">
            Why VoiceCare.
          </h2>

          <p className="text-base sm:text-lg text-[#06003F]/60 leading-relaxed font-medium max-w-[22rem] sm:max-w-3xl mx-auto text-center">
            Our agentic AI goes beyond traditional automation to take meaningful action, delivering
            measurable outcomes that transform healthcare operations.
          </p>
        </motion.div>

        {/* Grid Features - 3 columns on lg+, stacked on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
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
              className={`group cursor-pointer text-center lg:text-left py-8 lg:py-0 ${
                index !== benefits.length - 1
                  ? 'border-b border-[#06003F]/10 lg:border-b-0 lg:border-r lg:border-[#06003F]/10 lg:pr-12'
                  : ''
              }`}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-[12px] flex items-center justify-center mb-6 transition-all duration-300 mx-auto lg:mx-0"
                style={{ backgroundColor: benefit.bgColor }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <benefit.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </motion.div>

              {/* Percentage + Title on same line */}
              <div className="flex flex-wrap justify-center lg:justify-start items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                  {benefit.percentage}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                  {benefit.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[16px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-300 max-w-[26rem] mx-auto lg:mx-0">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueMetricsSection;
