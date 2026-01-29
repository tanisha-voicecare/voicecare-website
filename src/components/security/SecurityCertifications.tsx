'use client';

/**
 * Security Certifications Component
 * EXACT implementation from designer-src/src/app/components/Solutions.tsx (Certification Shields Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-32 bg-white overflow-hidden
 *
 * Radial Glow Background (behind content):
 * - absolute inset-0
 * - bg-[radial-gradient(circle_at_50%_50%,_rgba(255,78,58,0.03)_0%,_transparent_50%)]
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl relative z-10
 *
 * Outer Motion Wrapper:
 * - flex flex-col items-center
 * - Animation: opacity 0→1, y 40→0, duration 0.8s, ease EASING.smooth
 * - whileInView, viewport { once: true, margin: "0px 0px -100px 0px" }
 *
 * Image Container:
 * - relative
 * - Grid background (subtle):
 *   linear-gradient(rgba(255,78,58,0.03) 1px, transparent 1px),
 *   linear-gradient(90deg, rgba(255,78,58,0.03) 1px, transparent 1px)
 *   backgroundSize: 40px 40px
 * - Animation: opacity 0→1, scale 0.9→1, duration 0.8s, delay 0.2s, ease EASING.smooth
 * - whileInView, viewport { once: true }
 *
 * Image:
 * - w-full max-w-[450px] h-auto relative z-10
 * - alt: "HIPAA Compliant and AICPA SOC 2 Certifications"
 *
 * Description Text:
 * - text-[#06003F]/60 text-[18px] text-center mt-12 max-w-3xl leading-relaxed
 * - Animation: opacity 0→1, y 20→0, duration 0.6s, delay 0.4s, ease EASING.smooth
 * - whileInView, viewport { once: true }
 */

import { motion } from 'motion/react';
import Image from 'next/image';

// EASING from designer-src/src/utils/animations.ts
const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

export function SecurityCertifications() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Subtle radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,78,58,0.03)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.8, ease: EASING.smooth }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASING.smooth }}
            className="relative"
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
              alt="HIPAA Compliant and AICPA SOC 2 Certifications"
              width={450}
              height={200}
              className="w-full max-w-[450px] h-auto relative z-10"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASING.smooth }}
            className="text-[#06003F]/60 text-[18px] text-center mt-12 max-w-3xl leading-relaxed"
          >
            Independently verified and certified to meet the highest standards
            of healthcare data security and compliance.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default SecurityCertifications;
