'use client';

/**
 * HeroSection Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Hero.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - min-h-screen, bg-white
 * - pt-5 pb-20 (outer section)
 * - px-5 (wrapper)
 *
 * Inner Container (Gradient Background):
 * - rounded-[24px]
 * - min-h-[800px]
 * - py-32 md:py-40
 * - bg-gradient-to-br from-[#06003F] via-[#1a0070] to-[#FF4E3A]
 *
 * Content:
 * - w-[1000px] max-w-full mx-auto px-6
 *
 * Badge:
 * - px-4 py-1.5
 * - rounded-full
 * - bg-white
 * - text-[10px] font-bold uppercase tracking-[0.1em]
 * - text-[#06003F]
 * - border border-black/5
 * - shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]
 * - mb-12
 * - gap-2
 * - Icon: w-3 h-3 text-[#FF4E3A] fill-[#FF4E3A]
 *
 * Subheader:
 * - text-[18px] md:text-[22px]
 * - font-medium
 * - text-white/90
 * - mb-4
 * - tracking-tight
 *
 * Headline Container:
 * - h-[140px] md:h-[200px]
 *
 * Headline:
 * - text-[44px] md:text-[84px]
 * - font-bold
 * - tracking-[-0.04em]
 * - leading-[1.1]
 * - text-white
 *
 * Primary Button:
 * - bg-[#FF4E3A]
 * - text-white
 * - px-8 py-3.5
 * - rounded-[6px]
 * - text-sm font-semibold
 * - shadow-xl shadow-[#FF4E3A]/20
 * - hover:bg-[#FF4E3A]/90
 * - gap-2
 * - ArrowRight icon: w-4 h-4, hover:translate-x-1
 *
 * Secondary Button:
 * - bg-white
 * - border border-white/20
 * - text-[#06003F]
 * - px-8 py-3.5
 * - rounded-[6px]
 * - text-sm font-semibold
 * - shadow-sm
 * - hover:bg-white/90
 *
 * Button Container:
 * - gap-4
 * - mt-[40px]
 *
 * Animations:
 * - Entry: stagger 0.1s, y: 10 → 0, opacity: 0 → 1
 * - Headline: 4000ms interval, 0.8s duration, easing [0.16, 1, 0.3, 1]
 * - Background blobs: various durations (8s, 10s, 12s)
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';

// ============================================
// Types
// ============================================

interface HeroSectionProps {
  className?: string;
}

// ============================================
// Constants
// ============================================

const HEADLINES = [
  'Automating administrative burdens',
  'Creating time for care teams',
  'Improving patient outcomes',
];

const ROTATION_INTERVAL = 4000; // 4 seconds

// ============================================
// Component
// ============================================

export function HeroSection({ className = '' }: HeroSectionProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % HEADLINES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative pt-5 pb-20 overflow-hidden bg-white ${className}`}
      aria-labelledby="hero-heading"
    >
      <div className="w-full px-5">
        {/* Rounded Rectangle Background Container */}
        <div className="relative rounded-[24px] overflow-hidden w-full">
          {/* Vibrant Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#06003F] via-[#1a0070] to-[#FF4E3A]">
            {/* Animated gradient overlay for extra vibrancy */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255, 78, 58, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255, 78, 58, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255, 78, 58, 0.4) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Additional vibrant accent gradients */}
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px]"
              animate={{
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 78, 58, 0.6) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-[700px] h-[700px]"
              animate={{
                opacity: [0.5, 0.7, 0.5],
                scale: [1.1, 0.9, 1.1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              style={{
                background:
                  'radial-gradient(circle, rgba(6, 0, 63, 0.8) 0%, transparent 70%)',
                filter: 'blur(90px)',
              }}
            />
          </div>

          {/* Animated Noise Grain Texture Overlay */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {/* SVG Noise Filter */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <filter id="heroNoiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.8;0.82;0.8"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#heroNoiseFilter)" />
            </svg>
          </div>

          {/* Content Container - Centered */}
          <div className="relative py-24 md:py-32 flex items-center justify-center">
            <div className="w-[1000px] max-w-full mx-auto px-6">
              <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {/* Badge */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-[0.1em] mb-12 text-[#06003F] border border-black/5"
                  style={{
                    boxShadow:
                      '0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)',
                  }}
                >
                  <Zap className="w-3 h-3 text-[#FF4E3A] fill-[#FF4E3A]" />
                  Agentic Intelligence for RCM
                </motion.div>

                {/* Static Subheader */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-[18px] md:text-[22px] font-medium text-white/90 mb-4 tracking-tight"
                >
                  Supercharging Healthcare Workers with Care and AI by
                </motion.p>

                {/* Rotating Headlines */}
                <div className="relative h-[140px] md:h-[200px] flex items-center justify-center w-full">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      id="hero-heading"
                      key={currentHeadingIndex}
                      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute text-[44px] md:text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white text-center"
                    >
                      {HEADLINES[currentHeadingIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.98 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4 justify-center mt-[40px] mr-[0px] mb-[0px] ml-[0px]"
                >
                  {/* Primary CTA */}
                  <Link
                    href="#experience"
                    className="inline-flex items-center gap-2 bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:bg-[#FF4E3A]/90 transition-all group shadow-xl shadow-[#FF4E3A]/20"
                  >
                    Experience it
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    href="#demo"
                    className="inline-flex items-center bg-white border border-white/20 text-[#06003F] px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:bg-white/90 transition-all shadow-sm"
                  >
                    Schedule a Demo
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
