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
      className={`relative py-20 bg-[#FAFBFC] ${className}`}
      aria-labelledby="our-partners-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center">
        {/* Section Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="w-full text-center mb-14"
        >
          <h2
            id="our-partners-heading"
            className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05]"
          >
            Our Partners
          </h2>
        </motion.div>

        {/* Partner Logos - inline-flex so container is exact width of logos, no gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center"
        >
          <div className="inline-flex flex-row items-center gap-0 m-0 p-0 [&>*]:m-0 [&>*]:p-0">
            {/* Cencora Logo - same size as Mayo (200×112) */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none -mr-6 sm:-mr-8"
            >
              <div className="w-[200px] h-[112px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/partners/cencora-standard.png"
                  alt="Cencora"
                  width={200}
                  height={112}
                  className="w-full h-full object-contain block"
                  sizes="200px"
                />
              </div>
            </motion.div>
            {/* Mayo Clinic Logo - same image & size as AdvisorsSection (200×112) */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none -mr-6 sm:-mr-8"
            >
              <div className="w-[200px] h-[112px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/company/investors/mayo-clinic.png"
                  alt="Mayo Clinic"
                  width={200}
                  height={112}
                  className="w-full h-full object-contain block"
                  sizes="200px"
                />
              </div>
            </motion.div>
            {/* Optum Logo - flush against Mayo */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="m-0 p-0 flex-shrink-0 leading-none"
            >
              <div className="w-[200px] h-[58px] flex items-center justify-center m-0 p-0">
                <Image
                  src="/images/partners/optum.png"
                  alt="Optum"
                  width={200}
                  height={58}
                  className="w-full h-full object-contain block"
                  sizes="200px"
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
