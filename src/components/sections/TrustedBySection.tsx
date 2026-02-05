'use client';

/**
 * TrustedBySection Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import type { TrustedByLogoContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface TrustedBySectionProps {
  className?: string;
  content?: { logos: TrustedByLogoContent[] };
}

// ============================================
// Default Logos - Fallback content
// ============================================

const DEFAULT_LOGOS: TrustedByLogoContent[] = [
  { name: 'American Specialty Health', src: '/images/logos/american-specialty-health.png', size: 'normal' },
  { name: 'Anthem', src: '/images/logos/anthem.png', size: 'normal' },
  { name: 'Aetna', src: '/images/logos/aetna.png', size: 'normal' },
  { name: 'Blue Shield of California', src: '/images/logos/blue-shield-california.png', size: 'large' },
  { name: 'Cigna Healthcare', src: '/images/logos/cigna-healthcare.png', size: 'xlarge' },
  { name: 'Quantum Health', src: '/images/logos/quantum-health.png', size: 'normal' },
  { name: 'UMR', src: '/images/logos/umr.png', size: 'large' },
  { name: 'United Healthcare', src: '/images/logos/united-healthcare.png', size: 'large' },
];

// ============================================
// Component
// ============================================

export function TrustedBySection({ className = '', content }: TrustedBySectionProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Use content from props or fallback to defaults
  const logos = content?.logos || DEFAULT_LOGOS;

  // Render logos 3x for seamless infinite loop
  const repeatedLogos = [...logos, ...logos, ...logos];

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
                width={logo.size === 'xlarge' ? 200 : logo.size === 'large' ? 160 : 120}
                height={logo.size === 'xlarge' ? 56 : logo.size === 'large' ? 48 : 32}
                sizes="(max-width: 768px) 80px, 200px"
                className={`w-auto object-contain grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-300 cursor-pointer ${
                  logo.size === 'xlarge'
                    ? 'h-10 sm:h-11 md:h-12 lg:h-14'
                    : logo.size === 'large'
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
