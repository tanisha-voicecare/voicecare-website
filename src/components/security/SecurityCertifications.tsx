'use client';

/**
 * Security Certifications Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import Image from 'next/image';
import type { SecurityCertificationsContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface SecurityCertificationsProps {
  content?: SecurityCertificationsContent;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: SecurityCertificationsContent = {
  title: '',
  description: 'Independently verified and certified to meet the highest standards of healthcare data security and compliance.',
};

// EASING from designer-src/src/utils/animations.ts
const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

export function SecurityCertifications({ content }: SecurityCertificationsProps) {
  const certContent = content || DEFAULT_CONTENT;

  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      {/* Subtle radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,78,58,0.03)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.8, ease: EASING.smooth }}
          className="flex flex-col items-center"
        >
          {/* Title - only shown if provided */}
          {certContent.title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASING.smooth }}
              className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#06003F] tracking-tight text-center mb-4 sm:mb-6"
            >
              {certContent.title}
            </motion.h2>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASING.smooth }}
            className="relative max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[450px] mx-auto w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 78, 58, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 78, 58, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center',
            }}
          >
            <Image
              src="/images/security/certifications/certification-shields.png"
              alt="HIPAA Compliant and AICPA SOC 2 Type II Certification badges"
              width={450}
              height={200}
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 420px, 450px"
              className="w-full h-auto relative z-10"
              priority
            />
          </motion.div>

          {/* Description - shown below image */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASING.smooth }}
            className="text-[#06003F]/60 text-[15px] sm:text-[16px] md:text-[18px] text-center mt-8 sm:mt-10 md:mt-12 max-w-xl sm:max-w-2xl md:max-w-3xl leading-relaxed px-2"
          >
            {certContent.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default SecurityCertifications;
