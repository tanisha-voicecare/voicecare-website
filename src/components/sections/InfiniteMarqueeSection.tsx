'use client';

/**
 * InfiniteMarqueeSection Component (Radical Efficiencies)
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { RadicalEfficienciesContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface InfiniteMarqueeSectionProps {
  className?: string;
  content?: RadicalEfficienciesContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: RadicalEfficienciesContent = {
  sectionTitle: 'Radical Efficiencies',
  stats: [
    { value: '32000', label: 'Minutes saved per 1,000 phone calls' },
  ],
};

// ============================================
// Component
// ============================================

export function InfiniteMarqueeSection({ className = '', content }: InfiniteMarqueeSectionProps) {
  // Use provided content or fallback to defaults
  const sectionContent = content || DEFAULT_CONTENT;
  
  // Extract primary stat for animated counter (first stat's numeric value)
  const primaryStat = sectionContent.stats[0];
  const targetValue = parseInt(primaryStat?.value.replace(/[^0-9]/g, '') || '32000'); // Direct minutes value
  
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetValue);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <section
      className={`relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden bg-white ${className}`}
      aria-labelledby="radical-efficiencies-heading"
    >
      <div className="relative z-10 mb-0" ref={ref}>
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mt-[-40px] sm:mt-[-60px] md:mt-[-80px] lg:mt-[-91px] relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] mb-4 sm:mb-6 md:mb-8 text-[#06003F] border border-[#06003F]/5 shadow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse" />
              Real-World Impact
            </motion.div>

            {/* Heading */}
            <h2
              id="radical-efficiencies-heading"
              className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#06003F] tracking-[-0.02em] leading-[1.05] mb-4 sm:mb-6"
            >
              {sectionContent.sectionTitle}
            </h2>

            {/* Large stat display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold text-[#FF4E3A] tracking-tight leading-none mb-3 sm:mb-4">
                {count.toLocaleString()}
              </div>
              <p className="text-[#06003F]/60 text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-relaxed px-2">
                Minutes saved per 1,000 phone calls
              </p>
            </motion.div>

            {/* Additional Stats Grid */}
            {sectionContent.stats.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
              >
                {sectionContent.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#06003F] mb-1">
                      {stat.value}
                    </div>
                    <p className="text-[#06003F]/60 text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(6, 0, 63, 0.1), transparent)',
        }}
      />
    </section>
  );
}

export default InfiniteMarqueeSection;
