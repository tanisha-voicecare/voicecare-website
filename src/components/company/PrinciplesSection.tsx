'use client';

/**
 * Principles Section Component
 * EXACT implementation from designer-src/src/app/components/company/PrinciplesSection.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-[110px] bg-[#FAFBFC] px-[0px]
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-6xl relative z-10
 *
 * Header:
 * - text-center mb-12
 * - Animation: opacity 0→1, y 20→0, duration 0.5s
 *
 * Title:
 * - text-[48px] font-bold text-[#06003F] mb-4
 * - Animation: opacity 0→1, scale 0.95→1, duration 0.4s, delay 0.1s
 *
 * Description:
 * - text-[18px] text-[#06003F]/60 max-w-2xl mx-auto
 * - Animation: opacity 0→1, y 10→0, duration 0.4s, delay 0.15s
 *
 * Grid:
 * - grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16
 *
 * Card Wrapper:
 * - Animation: opacity 0→1, y 20→0, delay index*0.05
 * - Hover: y -8, scale 1.02, duration 0.2s
 * - group cursor-default
 *
 * Card Container:
 * - bg-white rounded-[12px] p-8 h-full border border-[#06003F]/5
 * - hover:border-[#06003F]/10 transition-colors duration-200
 *
 * Icon Container:
 * - w-12 h-12 rounded-[6px] bg-[#06003F]/5 flex items-center justify-center mb-5
 * - group-hover:bg-[#FF4E3A]/10
 * - Hover animation: scale 1.1, rotate 5, spring
 *
 * Icon:
 * - w-6 h-6 text-[#06003F]/70 group-hover:text-[#FF4E3A] strokeWidth 2
 *
 * Title:
 * - text-[18px] font-bold text-[#06003F] mb-3 leading-tight
 * - group-hover:text-[#FF4E3A]
 *
 * Description:
 * - text-[15px] text-[#06003F]/60 leading-relaxed
 * - group-hover:text-[#06003F]/80
 */

import { motion } from 'motion/react';
import {
  Target,
  Lightbulb,
  TrendingUp,
  Shield,
  Users,
  Clock,
  Zap,
  LucideIcon,
} from 'lucide-react';

// ============================================
// Principles Data (EXACT from designer-src/company-data.ts)
// ============================================

interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    icon: Target,
    title: 'Solving Customer Problems',
    description:
      'We relentlessly focus on solving real customer problems with measurable value.',
  },
  {
    icon: Lightbulb,
    title: 'Innovate Constantly',
    description:
      "Innovation isn't a department—it's our operating system for staying ahead.",
  },
  {
    icon: TrendingUp,
    title: 'Go Above & Beyond',
    description:
      "Good enough isn't in our vocabulary. We deliver exceptional outcomes.",
  },
  {
    icon: Shield,
    title: 'Take Ownership',
    description:
      'We take full ownership of our commitments—no excuses, no finger-pointing.',
  },
  {
    icon: Users,
    title: 'Default Trust',
    description:
      'Transparency, honesty, and integrity guide every interaction with our team.',
  },
  {
    icon: Clock,
    title: 'Think in First Principles',
    description:
      'We break down complex problems to fundamentals, building from the ground up.',
  },
  {
    icon: Zap,
    title: 'Attention to Detail',
    description:
      'Excellence lives in the details—we sweat the small stuff because it matters.',
  },
];

// ============================================
// Component
// ============================================

export function PrinciplesSection() {
  return (
    <section className="relative py-[110px] bg-[#FAFBFC] px-[0px]">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[48px] font-bold text-[#06003F] mb-4"
          >
            Our Operating Principles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[18px] text-[#06003F]/60 max-w-2xl mx-auto"
          >
            Core principles that guide how we build, ship, and deliver
            excellence.
          </motion.p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                className="group cursor-default"
              >
                {/* Card Container */}
                <div className="bg-white rounded-[12px] p-8 h-full border border-[#06003F]/5 hover:border-[#06003F]/10 transition-colors duration-200">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="w-12 h-12 rounded-[6px] bg-[#06003F]/5 flex items-center justify-center group-hover:bg-[#FF4E3A]/10 transition-colors duration-200 mb-5"
                  >
                    <Icon
                      className="w-6 h-6 text-[#06003F]/70 group-hover:text-[#FF4E3A] transition-colors duration-200"
                      strokeWidth={2}
                    />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[18px] font-bold text-[#06003F] mb-3 leading-tight group-hover:text-[#FF4E3A] transition-colors duration-200">
                      {principle.title}
                    </h3>
                    <p className="text-[15px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-200">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PrinciplesSection;
