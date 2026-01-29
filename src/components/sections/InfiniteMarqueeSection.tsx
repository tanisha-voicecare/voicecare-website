'use client';

/**
 * InfiniteMarqueeSection Component (Radical Efficiencies)
 * PIXEL-PERFECT implementation from designer-src/src/app/components/InfiniteMarquee.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - relative py-32 md:py-40 overflow-hidden bg-white
 *
 * Content Container:
 * - max-w-[1000px] mx-auto px-6 md:px-12
 * - text-center
 * - mt-[-91px] (negative margin adjustment)
 *
 * Badge:
 * - inline-flex items-center gap-2
 * - px-4 py-1.5 rounded-full
 * - bg-white text-[10px] font-bold uppercase tracking-[0.1em]
 * - text-[#06003F] border border-[#06003F]/5 shadow-sm
 * - mb-8
 * - Dot: w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse
 *
 * Heading:
 * - text-[48px] font-bold text-[#06003F]
 * - tracking-[-0.02em] leading-[1.05]
 * - mb-6
 *
 * Counter:
 * - text-[72px] md:text-[96px] font-bold text-[#FF4E3A]
 * - tracking-tight leading-none
 * - mb-4
 * - Animates: 0 → 32,000
 * - Duration: 2000ms
 * - Steps: 60
 *
 * Caption:
 * - text-[#06003F]/60 text-[18px] font-medium leading-relaxed
 *
 * Bottom Border:
 * - absolute bottom-0 left-0 right-0 h-px
 * - bg-gradient-to-r from-transparent via-[#06003F]/10 to-transparent
 *
 * Animations:
 * - Header: opacity 0→1, y 30→0, duration 1s, ease [0.23,1,0.32,1]
 * - Badge: opacity 0→1, scale 0.9→1, duration 0.6s, delay 0.2s
 * - Counter: opacity 0→1, scale 0.95→1, duration 0.8s, delay 0.3s
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

// ============================================
// Types
// ============================================

interface InfiniteMarqueeSectionProps {
  className?: string;
}

// ============================================
// Component
// ============================================

export function InfiniteMarqueeSection({ className = '' }: InfiniteMarqueeSectionProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const targetValue = 32000;
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
  }, [isInView]);

  return (
    <section
      className={`relative py-32 md:py-40 overflow-hidden bg-white ${className}`}
      aria-labelledby="radical-efficiencies-heading"
    >
      <div className="relative z-10 mb-0" ref={ref}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mt-[-91px] mr-[0px] mb-[0px] ml-[0px] relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-[0.1em] mb-8 text-[#06003F] border border-[#06003F]/5 shadow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E3A] animate-pulse" />
              Real-World Impact
            </motion.div>

            {/* Heading */}
            <h2
              id="radical-efficiencies-heading"
              className="text-[48px] font-bold text-[#06003F] tracking-[-0.02em] leading-[1.05] mb-6"
            >
              Radical Efficiencies
            </h2>

            {/* Large stat display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-[72px] md:text-[96px] font-bold text-[#FF4E3A] tracking-tight leading-none mb-4">
                {count.toLocaleString()}
              </div>
              <p className="text-[#06003F]/60 text-[18px] font-medium leading-relaxed">
                Minutes saved per 1,000 phone calls
              </p>
            </motion.div>
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
