'use client';

/**
 * OurPartnersSection Component
 * PIXEL-PERFECT design matching designer-src/app/components/OurPartners.tsx
 * Section: "Our Partners" with Mayo Clinic and Optum logos (PNG)
 */

import Image from 'next/image';
import { motion } from 'motion/react';

// ============================================
// Types
// ============================================

interface OurPartnersSectionProps {
  className?: string;
}

// ============================================
// Partner logos - PNG paths (public/images/partners/)
// Mayo: 260×50px | Optum: 200×59px (designer proportions)
// ============================================

// ============================================
// Component
// ============================================

export function OurPartnersSection({ className = '' }: OurPartnersSectionProps) {
  return (
    <section
      className={`relative py-20 bg-[#FAFBFC] ${className}`}
      aria-labelledby="our-partners-heading"
    >
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Section Header - matching designer: text-center mb-12, 48px bold #06003F */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="text-center mb-12"
        >
          <h2
            id="our-partners-heading"
            className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05]"
          >
            Our Partners
          </h2>
        </motion.div>

        {/* Partner Logos Grid - matching designer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 max-w-5xl mx-auto mx-[64px] mt-[2px] mb-[0px]"
        >
          {/* Mayo Clinic Logo - PNG */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex items-center justify-center"
          >
            <div className="w-[260px] h-[50px]">
              <Image
                src="/images/partners/mayo-clinic.png"
                alt="Mayo Clinic"
                width={260}
                height={50}
                className="w-full h-full object-contain"
                sizes="260px"
              />
            </div>
          </motion.div>

          {/* Optum Logo - PNG */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex items-center justify-center"
          >
            <div className="relative w-[200px] h-[59px]">
              <Image
                src="/images/partners/optum.png"
                alt="Optum"
                width={200}
                height={59}
                className="w-full h-full object-contain"
                sizes="200px"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient border - matching designer */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06003F]/10 to-transparent" />
    </section>
  );
}

export default OurPartnersSection;
