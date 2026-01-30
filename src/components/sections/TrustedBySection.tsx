'use client';

/**
 * TrustedBySection Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Logos.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Container:
 * - border-y border-black/[0.04] (border-border/50 resolved)
 * - py-10 (40px)
 * - bg-white/50 (bg-background/50 resolved)
 * - mt-[-123px] (overlaps hero)
 * - overflow-hidden
 *
 * Logo Track:
 * - flex gap-12 md:gap-16 items-center
 * - Animated x: [0, -1200], 25s, linear, infinite
 * - Pauses on hover
 *
 * Logo Sizing:
 * - Normal: h-7 md:h-8 (28px / 32px)
 * - Large: h-10 md:h-12 (40px / 48px)
 * - w-auto object-contain flex-shrink-0
 *
 * Logo Visual Treatment:
 * - Default: grayscale brightness-75
 * - Hover: grayscale-0 brightness-100
 * - transition-all duration-300
 *
 * Entry Animation:
 * - initial: opacity 0, y 20
 * - whileInView: opacity 1, y 0
 * - viewport: once true, margin -100px
 * - duration: 0.8s, ease: [0.23, 1, 0.32, 1]
 *
 * ASSET PATHS:
 * - All logos must be placed in /public/images/logos/
 * - Use semantic kebab-case names
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// ============================================
// Types
// ============================================

interface TrustedBySectionProps {
  className?: string;
}

interface Logo {
  name: string;
  src: string;
  size: 'normal' | 'large';
}

// ============================================
// Data - Healthcare Partner Logos
// Local assets from /public/images/logos/
// ============================================

const LOGOS: Logo[] = [
  {
    name: 'American Specialty Health',
    src: '/images/logos/american-specialty-health.png',
    size: 'normal',
  },
  {
    name: 'Anthem',
    src: '/images/logos/anthem.png',
    size: 'normal',
  },
  {
    name: 'Aetna',
    src: '/images/logos/aetna.png',
    size: 'normal',
  },
  {
    name: 'Blue Shield of California',
    src: '/images/logos/blue-shield-california.png',
    size: 'large',
  },
  {
    name: 'Cigna Healthcare',
    src: '/images/logos/cigna-healthcare.png',
    size: 'large',
  },
  {
    name: 'Quantum Health',
    src: '/images/logos/quantum-health.png',
    size: 'normal',
  },
  {
    name: 'UMR',
    src: '/images/logos/umr.png',
    size: 'normal',
  },
  {
    name: 'United Healthcare',
    src: '/images/logos/united-healthcare.png',
    size: 'normal',
  },
];

// ============================================
// Component
// ============================================

export function TrustedBySection({ className = '' }: TrustedBySectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Render logos 3x for seamless infinite loop
  const repeatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`border-y border-black/[0.04] py-6 sm:py-8 md:py-10 bg-white/50 mt-[-30px] sm:mt-[-40px] md:mt-[-60px] overflow-hidden ${className}`}
      aria-label="Trusted by leading healthcare organizations"
    >
      <div className="relative">
        <motion.div
          className="flex gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center"
          animate={{
            x: isPaused ? undefined : [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {repeatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
                <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.size === 'large' ? 160 : 120}
                height={logo.size === 'large' ? 48 : 32}
                sizes="(max-width: 768px) 80px, 160px"
                className={`w-auto object-contain grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-300 cursor-pointer ${
                  logo.size === 'large'
                    ? 'h-8 sm:h-9 md:h-10 lg:h-12'
                    : 'h-6 sm:h-6 md:h-7 lg:h-8'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default TrustedBySection;
