'use client';

/**
 * Principles Section Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
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
import type { PrinciplesSectionContent } from '@/lib/content';

interface PrinciplesSectionProps {
  content?: PrinciplesSectionContent;
}

const DEFAULT_CONTENT: PrinciplesSectionContent = {
  sectionTitle: 'Our Operating Principles',
  sectionDescription: 'Core principles that guide how we build, ship, and deliver excellence.',
  principles: [
    { title: 'Solving Customer Problems', description: 'We relentlessly focus on solving real customer problems with measurable value.' },
    { title: 'Innovate Constantly', description: "Innovation isn't a department, it's our operating system for staying ahead." },
    { title: 'Go Above & Beyond', description: "Good enough isn't in our vocabulary. We deliver exceptional outcomes." },
    { title: 'Take Ownership', description: 'We take full ownership of our commitments, no excuses, no finger-pointing.' },
    { title: 'Default Trust', description: 'Transparency, honesty, and integrity guide every interaction with our team.' },
    { title: 'Think in First Principles', description: 'We break down complex problems to fundamentals, building from the ground up.' },
    { title: 'Attention to Detail', description: 'Excellence lives in the details, we sweat the small stuff because it matters.' },
  ],
};

// Icon mapping for principles
const ICON_MAP: Record<string, LucideIcon> = {
  'Solving Customer Problems': Target,
  'Innovate Constantly': Lightbulb,
  'Go Above & Beyond': TrendingUp,
  'Take Ownership': Shield,
  'Default Trust': Users,
  'Think in First Principles': Clock,
  'Attention to Detail': Zap,
};

const ICON_SEQUENCE: LucideIcon[] = [Target, Lightbulb, TrendingUp, Shield, Users, Clock, Zap];

// ============================================
// Component
// ============================================

export function PrinciplesSection({ content }: PrinciplesSectionProps) {
  const sectionContent = content || DEFAULT_CONTENT;
  
  // Split principles into two rows: first 4, then remaining 3
  const firstRowPrinciples = sectionContent.principles.slice(0, 4);
  const secondRowPrinciples = sectionContent.principles.slice(4, 7);

  const renderCard = (principle: { title: string; description: string }, index: number) => {
    const Icon = ICON_MAP[principle.title] || ICON_SEQUENCE[index % ICON_SEQUENCE.length];

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
        className="group cursor-default h-auto sm:h-[220px] md:h-[240px]"
      >
        {/* Card Container */}
        <div className="bg-white rounded-[12px] p-6 sm:p-7 md:p-8 h-full border border-[#06003F]/5 hover:border-[#06003F]/10 transition-colors duration-200 overflow-hidden flex flex-col">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[6px] bg-[#06003F]/5 flex items-center justify-center group-hover:bg-[#FF4E3A]/10 transition-colors duration-200 mb-4 sm:mb-5 flex-shrink-0"
          >
            <Icon
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-[#06003F]/70 group-hover:text-[#FF4E3A] transition-colors duration-200"
              strokeWidth={2}
            />
          </motion.div>

          {/* Content */}
          <div className="overflow-hidden">
            <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-[#06003F] mb-2 sm:mb-3 leading-tight group-hover:text-[#FF4E3A] transition-colors duration-200">
              {principle.title}
            </h3>
            <p className="text-[14px] sm:text-[14px] md:text-[15px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-200 line-clamp-4">
              {principle.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-12 sm:py-14 md:py-16 bg-[#FAFBFC]">
      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] mb-1 sm:mb-2"
          >
            {sectionContent.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[16px] sm:text-[17px] md:text-[18px] text-[#06003F]/60 max-w-xl sm:max-w-2xl mx-auto"
          >
            {sectionContent.sectionDescription}
          </motion.p>
        </motion.div>

        {/* First Row - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {firstRowPrinciples.map((principle, index) => renderCard(principle, index))}
        </div>

        {/* Second Row - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {secondRowPrinciples.map((principle, index) => renderCard(principle, index + 4))}
        </div>
      </div>
    </section>
  );
}

export default PrinciplesSection;
