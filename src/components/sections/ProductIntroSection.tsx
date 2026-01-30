'use client';

/**
 * ProductIntroSection Component (Introducing Joy / CTA)
 * PIXEL-PERFECT implementation from designer-src/src/app/components/CTA.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - py-40 (160px)
 * - bg-[#06003F]
 * - relative overflow-hidden
 *
 * Background Effects:
 * - Base: bg-[#06003F]
 * - Primary glow: top-[-20%] right-[-10%] w-[80%] h-[80%] opacity-60 blur-[120px]
 *   radial-gradient(circle, #FF4E3A 0%, transparent 70%)
 * - Secondary glow: bottom-[-20%] left-[-20%] w-[60%] h-[60%] opacity-40 blur-[100px]
 *   radial-gradient(circle, #FF4E3A 0%, transparent 70%)
 * - Navy accent: top-[20%] left-[10%] w-[50%] h-[50%] opacity-50 blur-[120px]
 *   radial-gradient(circle, #0A005F 0%, transparent 70%)
 * - Noise overlay: opacity-10 mix-blend-overlay
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 * - relative z-10 text-center
 * - max-w-[800px] inner wrapper
 *
 * Badge:
 * - inline-block px-4 py-1.5 rounded-full
 * - border border-white/10 bg-white/5
 * - mb-8
 * - Text: text-[10px] font-mono font-bold tracking-[0.3em] text-[#FF4E3A] uppercase
 *
 * Heading:
 * - text-5xl md:text-7xl font-bold
 * - tracking-tighter leading-[0.95]
 * - mb-10 text-white
 *
 * Description:
 * - text-white/80 text-xl md:text-2xl font-medium
 * - max-w-2xl mx-auto leading-relaxed
 * - mb-14
 *
 * Button Group:
 * - flex flex-col sm:flex-row items-center justify-center gap-6
 *
 * Primary Button:
 * - bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px]
 * - text-sm font-semibold
 * - shadow-2xl shadow-[#FF4E3A]/20
 * - hover:brightness-110 hover:shadow-[#FF4E3A]/40
 * - Arrow icon: w-4 h-4, hover:translate-x-1
 *
 * Secondary Button:
 * - border border-white/10 text-white/80
 * - px-8 py-3.5 rounded-[6px]
 * - text-sm font-semibold
 * - hover:text-white hover:border-white/20 hover:bg-white/5
 *
 * Animations:
 * - Container: opacity 0→1, y 40→0, duration 0.9s
 * - Badge: opacity 0→1, scale 0.95→1, duration 0.6s, delay 0.1s
 * - Heading: opacity 0→1, y 30→0, duration 0.8s, delay 0.2s
 * - Description: opacity 0→1, y 20→0, duration 0.7s, delay 0.3s
 * - Buttons: opacity 0→1, y 20→0, duration 0.6s, delay 0.4s
 * - All use ease: [0.23, 1, 0.32, 1]
 */

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// ============================================
// Types
// ============================================

interface ProductIntroSectionProps {
  className?: string;
}

// ============================================
// Component
// ============================================

export function ProductIntroSection({ className = '' }: ProductIntroSectionProps) {
  return (
    <section className={`py-20 sm:py-28 md:py-32 lg:py-40 bg-[#06003F] relative overflow-hidden ${className}`}>
      {/* High-Impact Vibrant Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-[#06003F]" />

        {/* Primary Orange Glow - Top Right */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] opacity-60 blur-[120px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #FF4E3A 0%, transparent 70%)',
          }}
        />

        {/* Secondary Orange Glow - Bottom Left */}
        <div
          className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] opacity-40 blur-[100px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #FF4E3A 0%, transparent 70%)',
          }}
        />

        {/* Deep Navy/Blue accents to mix */}
        <div
          className="absolute top-[20%] left-[10%] w-[50%] h-[50%] opacity-50 blur-[120px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #0A005F 0%, transparent 70%)',
          }}
        />

        {/* Noise Overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[800px] mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FF4E3A] uppercase">
              AI_Agent
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 sm:mb-8 md:mb-10 text-white"
          >
            Introducing Joy
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/80 mb-8 sm:mb-10 md:mb-14 text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed px-2"
          >
            Your automated Voice AI Agent, designed to optimize and ease administrative burden by
            supercharging your workflow to be more efficient and empathetic.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary CTA */}
            <Link
              href="#experience"
              className="w-full sm:w-auto bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-[#FF4E3A]/20 hover:shadow-[#FF4E3A]/40"
            >
              Experience It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-[6px] transition-all shadow-sm"
            >
              Schedule a Demo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductIntroSection;
