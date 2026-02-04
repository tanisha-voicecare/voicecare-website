'use client';

/**
 * HeroSection Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 *
 * Content is fetched server-side and passed as props.
 * Falls back to defaults if WordPress content not available.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';
import type { HomepageHeroContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface HeroSectionProps {
  className?: string;
  content?: HomepageHeroContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: HomepageHeroContent = {
  badge: 'Backed by Mayo Clinic',
  headline: '',
  rotatingHeadlines: [
    'Automating administrative burdens',
    'Creating time for care teams',
    'Improving patient outcomes',
  ],
  primaryButtonText: 'Experience it',
  primaryButtonLink: '#experience',
  secondaryButtonText: 'Schedule a Demo',
  secondaryButtonLink: '/schedule-demo',
};

const ROTATION_INTERVAL = 4000; // 4 seconds

// ============================================
// Component
// ============================================

export function HeroSection({ className = '', content }: HeroSectionProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  // Use provided content or fallback to defaults
  const heroContent = content || DEFAULT_CONTENT;
  const rotatingHeadlines = heroContent.rotatingHeadlines;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % rotatingHeadlines.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [rotatingHeadlines.length]);

  return (
    <section
      className={`relative pt-3 sm:pt-5 pb-12 sm:pb-20 overflow-hidden bg-white ${className}`}
      aria-labelledby="hero-heading"
    >
      <div className="w-full px-3 sm:px-5">
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
          <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 flex items-center justify-center">
            <div className="w-[1000px] max-w-full mx-auto px-4 sm:px-6">
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
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] mb-6 sm:mb-8 md:mb-12 text-[#06003F] border border-black/5"
                  style={{
                    boxShadow:
                      '0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)',
                  }}
                >
                  <Zap className="w-3 h-3 text-[#FF4E3A] fill-[#FF4E3A]" />
                  {heroContent.badge}
                </motion.div>

                {/* Static Headline */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-medium text-white/90 mb-4 tracking-tight px-2"
                >
                  {heroContent.headline}
                </motion.p>

                {/* Rotating Sub-Headlines */}
                <div className="relative h-[100px] sm:h-[120px] md:h-[160px] lg:h-[200px] flex items-center justify-center w-full">
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
                      className="absolute text-[28px] sm:text-[36px] md:text-[52px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white text-center px-2"
                    >
                      {rotatingHeadlines[currentHeadingIndex]}
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
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-[40px] w-full sm:w-auto px-4 sm:px-0"
                >
                  {/* Primary CTA */}
                  <Link
                    href={heroContent.primaryButtonLink}
                    className="inline-flex items-center justify-center gap-2 bg-[#FF4E3A] text-white px-6 sm:px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:bg-[#FF4E3A]/90 transition-all group shadow-xl shadow-[#FF4E3A]/20 min-h-[48px]"
                  >
                    {heroContent.primaryButtonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    href={heroContent.secondaryButtonLink}
                    className="inline-flex items-center justify-center bg-white border border-white/20 text-[#06003F] px-6 sm:px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:bg-white/90 transition-all shadow-sm min-h-[48px]"
                  >
                    {heroContent.secondaryButtonText}
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
