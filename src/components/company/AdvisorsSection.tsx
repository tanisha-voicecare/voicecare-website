'use client';

/**
 * Advisors Section Component
 * EXACT implementation from designer-src/src/app/components/company/AdvisorsSection.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative py-[60px] bg-white
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Header:
 * - text-center mb-20
 * - Title: text-[48px] font-bold text-[#06003F] mb-4
 * - Description: text-[18px] text-[#06003F]/60 max-w-3xl mx-auto
 *
 * Horizontal Scroll:
 * - overflow-x-auto scrollbar-hide
 * - Cards container: flex gap-6 pb-6, width: max-content
 *
 * Card:
 * - width: 280px, flex-shrink-0
 * - Animation: opacity 0→1, x 30→0, delay index*0.06
 * - Hover: y -8, scale 1.02, duration 0.2s
 *
 * Photo Container:
 * - aspect-[3/4], rounded-[12px], overflow-hidden
 * - Image hover: scale-105
 * - Gradient overlay on hover
 *
 * Role Chip:
 * - Investor: bg-[#FF4E3A] text-white
 * - Board Member: bg-[#06003F] text-white
 * - Advisor: bg-white text-[#06003F]
 *
 * Modal:
 * - Backdrop: fixed, bg-[#06003F]/80 backdrop-blur-sm, z-[100]
 * - Content: fixed center, max-w-[900px], max-h-[85vh], z-[101]
 * - Animation: opacity/scale/y with AnimatePresence
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

// ============================================
// Advisors Data (EXACT from designer-src/company-data.ts)
// ============================================

interface AdvisorLogo {
  src: string;
  alt: string;
}

interface Advisor {
  name: string;
  role: 'Investor' | 'Board Member' | 'Advisor';
  designation: string;
  description: string;
  image: string;
  logos: AdvisorLogo[];
}

const advisors: Advisor[] = [
  {
    name: 'Dave Vreeland',
    role: 'Investor',
    designation: 'Senior Managing Director, Caduceus Capital',
    description:
      '30 years of experience in the healthcare industry, Dave is a well-known authority on healthcare innovation and venture capital investment. MBA in Healthcare, Washington University School of Medicine.',
    image: '/images/company/advisors/photos/dave-vreeland.png',
    logos: [
      { src: '/images/company/advisors/logos/caduceus.png', alt: 'Caduceus Capital Partners' },
      { src: '/images/company/advisors/logos/washington-uni.png', alt: 'Washington University School of Medicine' },
    ],
  },
  {
    name: 'Mary Grove',
    role: 'Investor',
    designation: 'Managing Partner, Bread & Butter Ventures',
    description:
      "20 years of experience in tech and early stage venture investing. Previously was Founding Director of Google for Startups and Investment Partner at Revolution's Rise of the Rest Seed Fund. MBA in Healthcare, Washington University School of Medicine.",
    image: '/images/company/advisors/photos/mary-grove.png',
    logos: [
      { src: '/images/company/advisors/logos/bread-butter.png', alt: 'Bread & Butter Ventures' },
      { src: '/images/company/advisors/logos/google.png', alt: 'Google for Startups' },
      { src: '/images/company/advisors/logos/washington-uni.png', alt: 'Washington University School of Medicine' },
    ],
  },
  {
    name: 'Paul Conley',
    role: 'Advisor',
    designation: 'Chairman and CEO, General Inception',
    description:
      'Serial Life Sciences entrepreneur and Deep Tech investor. Took 10x Genomics (TXG) and Twist Bio (TWST) public. Ph.D. in Computational Physics, UCSD.',
    image: '/images/company/advisors/photos/paul-conley.png',
    logos: [
      { src: '/images/company/advisors/logos/los-alamos.png', alt: 'Los Alamos National Laboratory' },
      { src: '/images/company/advisors/logos/ucsd.png', alt: 'University of California, San Diego' },
      { src: '/images/company/advisors/logos/uva.png', alt: 'University of Virginia' },
    ],
  },
  {
    name: 'Andrew Vaz',
    role: 'Board Member',
    designation: 'Ex-Global Chief Innovation Officer, Deloitte',
    description:
      '30 years of experience in growing Global Fortune 500, technology companies, and start-ups. Expert in emerging technologies, business model innovation, and digital customer and cloud transformation. Masters in Health Sciences, University of Toronto.',
    image: '/images/company/advisors/photos/andrew-vaz.png',
    logos: [
      { src: '/images/company/advisors/logos/deloitte.png', alt: 'Deloitte' },
      { src: '/images/company/advisors/logos/toronto-uni.png', alt: 'University of Toronto' },
    ],
  },
  {
    name: 'Mark Nathan',
    role: 'Advisor',
    designation: 'CEO and Founder, Mangoose Health and Burrow Software',
    description:
      'Serial Healthcare entrepreneur. Co-founder and CEO of Zipari.com, acquired by Thoma Bravo for $500M. Masters in Electrical Engineering, University of Colorado.',
    image: '/images/company/advisors/photos/mark-nathan.png',
    logos: [
      { src: '/images/company/advisors/logos/zipari.png', alt: 'Zipari' },
      { src: '/images/company/advisors/logos/apple.png', alt: 'Apple' },
      { src: '/images/company/advisors/logos/colorado-uni.png', alt: 'University of Colorado Boulder' },
    ],
  },
  {
    name: 'James Fan',
    role: 'Advisor',
    designation: 'Co-founder and CTO, Tomato.ai',
    description:
      'Serial entrepreneur with deep expertise in speech-to-text and text-to-speech. Led Google Cloud Speech and CCAI group. Ph.D. in Computer Science, UT Austin.',
    image: '/images/company/advisors/photos/james-fan.png',
    logos: [
      { src: '/images/company/advisors/logos/google.png', alt: 'Google' },
      { src: '/images/company/advisors/logos/ut-austin.png', alt: 'University of Texas at Austin' },
    ],
  },
  {
    name: 'Sheena Menezes',
    role: 'Advisor',
    designation: 'Co-founder and CEO, Simple HealthKit',
    description:
      '15+ years of start-up experience focused on payors, pharmacies, providers, and government. Ph.D. in Biochemistry from UC Santa Barbara.',
    image: '/images/company/advisors/photos/sheena-menezes.png',
    logos: [
      { src: '/images/company/advisors/logos/simple-healthkit.png', alt: 'Simple HealthKit' },
      { src: '/images/company/advisors/logos/ucsb.png', alt: 'UC Santa Barbara' },
    ],
  },
];

// ============================================
// Component
// ============================================

export function AdvisorsSection() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);

  return (
    <section className="relative py-[60px] bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[48px] font-bold text-[#06003F] mb-4"
          >
            Our Advisors & Investors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[18px] text-[#06003F]/60 max-w-3xl mx-auto"
          >
            Backed by industry leaders who share our vision for transforming
            healthcare administration
          </motion.p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 md:-mx-16 px-6 md:px-16">
          <div className="flex gap-6 pb-6" style={{ width: 'max-content' }}>
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                className="group flex-shrink-0 cursor-pointer"
                style={{ width: '280px' }}
                onClick={() => setSelectedAdvisor(index)}
              >
                {/* Photo Card */}
                <div className="relative bg-white rounded-[12px] overflow-hidden mb-5 transition-all duration-200">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06003F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* "View Details" text on hover */}
                    <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white text-[13px] font-semibold">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Role chip */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 left-4"
                  >
                    <span
                      className={`px-3 py-1.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${
                        advisor.role === 'Investor'
                          ? 'bg-[#FF4E3A] text-white'
                          : advisor.role === 'Board Member'
                            ? 'bg-[#06003F] text-white'
                            : 'bg-white text-[#06003F]'
                      }`}
                    >
                      {advisor.role}
                    </span>
                  </motion.div>
                </div>

                {/* Info Section */}
                <div>
                  <h3 className="text-[20px] font-bold text-[#06003F] mb-1 group-hover:text-[#FF4E3A] transition-colors duration-200">
                    {advisor.name}
                  </h3>
                  <p className="text-[13px] text-[#06003F]/50 leading-relaxed line-clamp-2">
                    {advisor.designation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAdvisor !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#06003F]/80 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedAdvisor(null)}
            />

            {/* Modal Content Wrapper - using flexbox for centering to avoid conflict with framer-motion transforms */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-[90vw] max-w-[900px] max-h-[85vh] bg-white rounded-[12px] overflow-hidden pointer-events-auto"
              >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAdvisor(null)}
                className="absolute top-6 right-6 z-10 text-[#06003F]/40 hover:text-[#06003F] transition-colors duration-200"
              >
                <X size={24} />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[85vh] p-10 md:p-12">
                <div className="relative grid md:grid-cols-[320px_1fr] gap-10">
                  {/* Left: Photo */}
                  <div>
                    <div className="relative bg-white rounded-[12px] overflow-hidden mb-4">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={advisors[selectedAdvisor].image}
                          alt={advisors[selectedAdvisor].name}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div>
                    <h2 className="text-[36px] font-bold text-[#06003F] mb-2">
                      {advisors[selectedAdvisor].name}
                    </h2>
                    <p className="text-[16px] text-[#06003F]/60 mb-8 leading-relaxed">
                      {advisors[selectedAdvisor].designation}
                    </p>

                    <div className="mb-8 pb-8 border-b border-[#06003F]/10">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#06003F]/40 mb-3">
                        About
                      </h3>
                      <p className="text-[15px] text-[#06003F]/80 leading-relaxed">
                        {advisors[selectedAdvisor].description}
                      </p>
                    </div>

                    {advisors[selectedAdvisor].logos &&
                      advisors[selectedAdvisor].logos.length > 0 && (
                        <div>
                          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#06003F]/40 mb-4">
                            Affiliations
                          </h3>
                          <div className="flex gap-6 items-center flex-wrap">
                            {advisors[selectedAdvisor].logos.map((logo, idx) => (
                              <Image
                                key={idx}
                                src={logo.src}
                                alt={logo.alt}
                                width={100}
                                height={40}
                                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AdvisorsSection;
