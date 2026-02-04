'use client';

/**
 * ValueMetricsSection Component (The VoiceCare Advantage)
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import { TrendingUp, Zap, CheckCircle, type LucideIcon } from 'lucide-react';
import type { ValueMetricsContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface ValueMetricsSectionProps {
  className?: string;
  content?: ValueMetricsContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: ValueMetricsContent = {
  sectionTitle: 'Why VoiceCare.',
  sectionDescription: 'Our agentic AI goes beyond traditional automation to take meaningful action, delivering measurable outcomes that transform healthcare operations.',
  metrics: [
    {
      value: '70%',
      title: 'Higher ROI',
      description: 'Returns within a few months, not years.',
    },
    {
      value: '40%',
      title: 'Faster',
      description: 'Collect, initiate, and transfer data',
    },
    {
      value: '20%',
      title: 'Better Data Quality',
      description: 'Consistent data output with every conversation',
    },
  ],
};

// Icon mapping for metrics
const METRIC_ICONS: Record<string, LucideIcon> = {
  'Higher ROI': TrendingUp,
  'Faster': Zap,
  'Better Data Quality': CheckCircle,
};

const METRIC_COLORS = ['#06003F', '#FF4E3A', '#06003F'];

// ============================================
// Component
// ============================================

export function ValueMetricsSection({ className = '', content }: ValueMetricsSectionProps) {
  // Use provided content or fallback to defaults
  const sectionContent = content || DEFAULT_CONTENT;

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
            {sectionContent.sectionTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#06003F]/60 leading-relaxed font-medium max-w-[22rem] sm:max-w-3xl mx-auto text-center">
            {sectionContent.sectionDescription}
          </p>
        </motion.div>

        {/* Grid Features - 3 columns on lg+, stacked on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {sectionContent.metrics.map((metric, index) => {
            const Icon = METRIC_ICONS[metric.title] || TrendingUp;
            const bgColor = METRIC_COLORS[index % METRIC_COLORS.length];
            
            return (
              <motion.div
                key={metric.title}
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
                  index !== sectionContent.metrics.length - 1
                    ? 'border-b border-[#06003F]/10 lg:border-b-0 lg:border-r lg:border-[#06003F]/10 lg:pr-12'
                    : ''
                }`}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-[12px] flex items-center justify-center mb-6 transition-all duration-300 mx-auto lg:mx-0"
                  style={{ backgroundColor: bgColor }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </motion.div>

                {/* Value + Title on same line */}
                <div className="flex flex-wrap justify-center lg:justify-start items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                    {metric.value}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                    {metric.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[16px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-300 max-w-[26rem] mx-auto lg:mx-0">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ValueMetricsSection;
