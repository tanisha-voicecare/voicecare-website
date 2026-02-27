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
// Partner logos - Mayo same as AdvisorsSection (company/investors, 200×112)
// Optum: 200×58px (designer)
// ============================================

// ============================================
// Component
// ============================================

export function OurPartnersSection({ className = '' }: OurPartnersSectionProps) {
  return (
    <section
      className={`relative py-10 sm:py-14 md:py-16 lg:py-20 bg-[#FAFBFC] ${className}`}
      aria-labelledby="our-partners-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center">
        {/* Section Header - responsive type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="w-full text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14"
        >
          <h2
            id="our-partners-heading"
            className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] px-1"
          >
            Strategic Partnership with World Class Companies
          </h2>
        </motion.div>

        {/* Partner Logos - stack on mobile, row on tablet+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:inline-flex md:flex-row md:items-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:inline-flex m-0 p-0 [&>*]:m-0 [&>*]:p-0">
            {/* Cencora Logo */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none md:-mr-6 lg:-mr-8"
            >
              <div className="w-[140px] h-[78px] sm:w-[180px] sm:h-[101px] lg:w-[200px] lg:h-[112px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/partners/cencora-standard.png"
                  alt="Cencora"
                  width={200}
                  height={112}
                  className="w-full h-full object-contain block"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                />
              </div>
            </motion.div>
            {/* Mayo Clinic Logo */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none md:-mr-6 lg:-mr-8"
            >
              <div className="w-[140px] h-[78px] sm:w-[180px] sm:h-[101px] lg:w-[200px] lg:h-[112px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/company/investors/mayo-clinic.png"
                  alt="Mayo Clinic"
                  width={200}
                  height={112}
                  className="w-full h-full object-contain block"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                />
              </div>
            </motion.div>
            {/* Optum Logo */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none"
            >
              <div className="w-[140px] h-[41px] sm:w-[180px] sm:h-[52px] lg:w-[200px] lg:h-[58px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/partners/optum.png"
                  alt="Optum"
                  width={200}
                  height={58}
                  className="w-full h-full object-contain block"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient border - matching designer */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06003F]/10 to-transparent" />
    </section>
  );
}

export default OurPartnersSection;
