'use client';

/**
 * Advisors Section Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdvisorsSectionContent, AdvisorItem } from '@/lib/content';

// Investor logos
const INVESTOR_LOGOS = [
  { src: '/images/company/investors/bread-butter.png', alt: 'Bread & Butter Ventures', height: 'h-16 sm:h-20 md:h-24' },
  { src: '/images/company/investors/caduceus.png', alt: 'Caduceus Capital Partners', height: 'h-20 sm:h-24 md:h-28' },
  { src: '/images/company/investors/mayo-clinic.png', alt: 'Mayo Clinic', height: 'h-20 sm:h-24 md:h-28' },
];

interface AdvisorsSectionProps {
  content?: AdvisorsSectionContent;
}

const DEFAULT_CONTENT: AdvisorsSectionContent = {
  sectionTitle: 'Our Advisors & Investors',
  sectionDescription: 'Backed by industry leaders who share our vision for transforming healthcare administration',
  advisors: [
    {
      name: 'Dave Vreeland',
      role: 'Investor',
      designation: 'Senior Managing Director, Caduceus Capital',
      description: '30 years of experience in the healthcare industry, Dave is a well-known authority on healthcare innovation and venture capital investment. MBA in Healthcare, Washington University School of Medicine.',
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
      description: "20 years of experience in tech and early stage venture investing. Previously was Founding Director of Google for Startups and Investment Partner at Revolution's Rise of the Rest Seed Fund. MBA in Healthcare, Washington University School of Medicine.",
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
      description: 'Serial Life Sciences entrepreneur and Deep Tech investor. Took 10x Genomics (TXG) and Twist Bio (TWST) public. Ph.D. in Computational Physics, UCSD.',
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
      description: '30 years of experience in growing Global Fortune 500, technology companies, and start-ups. Expert in emerging technologies, business model innovation, and digital customer and cloud transformation. Masters in Health Sciences, University of Toronto.',
      image: '/images/company/advisors/photos/andrew-vaz.png',
      logos: [
        { src: '/images/company/advisors/logos/deloitte.png', alt: 'Deloitte' },
        { src: '/images/company/advisors/logos/toronto-uni.png', alt: 'University of Toronto' },
      ],
    },
    {
      name: 'Brian Colao',
      role: 'Customer Advisory, Dental',
      designation: 'Member & Director of the Dental Service Organization Industry Group at Dykema',
      description: 'Brian A. Colao specializes in complex commercial litigation nationwide, handling a wide range of business disputes such as contracts, franchise issues, fiduciary duty breaches, intellectual property infringement, unfair competition, and other related claims.',
      image: '/images/company/advisors/photos/brian-colao-dental.jpg',
      logos: [
        { src: '/images/company/advisors/logos/dykema.png', alt: 'Dykema' },
        { src: '/images/company/advisors/logos/vanderbilt-university.png', alt: 'Vanderbilt University Law School' },
      ],
      affiliationTexts: ['Dykema', 'Vanderbilt University Law School'],
    },
    {
      name: 'Kate Smith',
      role: 'Customer Advisory, Dental',
      designation: 'Director of Revenue Cycle, OMS360',
      description: '15 years of experience as a revenue cycle leader helping healthcare organizations improve profitability and efficiency. She specializes in strategy execution, KPI optimization, contract analysis, training, and educating teams on revenue cycle best practices.',
      image: '/images/company/advisors/photos/kate-smith-dental.JPG',
      logos: [
        { src: '/images/company/advisors/logos/oms360.png', alt: 'OMS360' },
        { src: '/images/company/advisors/logos/guidehouse.png', alt: 'Guidehouse' },
        { src: '/images/company/advisors/logos/central-michigan-university.png', alt: 'Central Michigan University' },
      ],
      affiliationTexts: ['OMS360', 'Guidehouse', 'Central Michigan University'],
    },
    {
      name: 'Charles Bush-Joseph, MD',
      role: 'Customer Advisory, Specialty',
      designation: 'Orthopedic Surgeon, Professor, Rush University Medical Center, Team Physician Chicago White Sox',
      description: 'Dr. Charles Bush-Joseph is a renowned sports medicine and arthroscopic surgical specialist, known for his warm and compassionate bedside manner. He is currently a Professor at Rush University Medical Center, where he also serves as the Associate Director of the Rush Orthopaedic Sports Medicine Fellowship Program. He is a team physician for the Chicago White Sox (MLB) and an Associate Team Physician for the Chicago Bulls (NBA).',
      image: '/images/company/advisors/photos/bush-joseph-charles-ortho.jpg',
      logos: [
        { src: '/images/company/advisors/logos/midwest-ortho.png', alt: 'Midwest Orthopaedics at Rush' },
        { src: '/images/company/advisors/logos/rush-university.png', alt: 'Rush University' },
        { src: '/images/company/advisors/logos/chicago-white-sox.png', alt: 'Chicago White Sox' },
        { src: '/images/company/advisors/logos/chicago-bulls.png', alt: 'Chicago Bulls' },
      ],
      affiliationTexts: ['Midwest Orthopaedics at Rush', 'Rush University', 'Chicago White Sox', 'Chicago Bulls'],
    },
    {
      name: 'Mark Nathan',
      role: 'Advisor',
      designation: 'CEO and Founder, Mangoose Health and Burrow Software',
      description: 'Serial Healthcare entrepreneur. Co-founder and CEO of Zipari.com, acquired by Thoma Bravo for $500M. Masters in Electrical Engineering, University of Colorado.',
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
      description: 'Serial entrepreneur with deep expertise in speech-to-text and text-to-speech. Led Google Cloud Speech and CCAI group. Ph.D. in Computer Science, UT Austin.',
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
      description: '15+ years of start-up experience focused on payors, pharmacies, providers, and government. Ph.D. in Biochemistry from UC Santa Barbara.',
      image: '/images/company/advisors/photos/sheena-menezes.png',
      logos: [
        { src: '/images/company/advisors/logos/simple-healthkit.png', alt: 'Simple HealthKit' },
        { src: '/images/company/advisors/logos/ucsb.png', alt: 'UC Santa Barbara' },
      ],
    },
  ],
};

// ============================================
// Component
// ============================================

export function AdvisorsSection({ content }: AdvisorsSectionProps) {
  const sectionContent = content || DEFAULT_CONTENT;
  const advisors = sectionContent.advisors;
  
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const selectedAdvisorData = selectedAdvisor !== null ? advisors[selectedAdvisor] : null;

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll handler
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300; // Scroll by 300px
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Initialize and add scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <section className="relative pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] mb-1 sm:mb-2"
          >
            {sectionContent.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[16px] sm:text-[17px] md:text-[18px] text-[#06003F]/60 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto"
          >
            {sectionContent.sectionDescription}
          </motion.p>
        </motion.div>

        {/* Investor Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-20 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          {INVESTOR_LOGOS.map((logo, index) => (
            <div key={index} className="flex items-center justify-center h-20 sm:h-24 md:h-32">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={112}
                className={`${logo.height} w-auto object-contain`}
              />
            </div>
          ))}
        </motion.div>

        {/* Horizontal Scroll Container with Navigation */}
        <div className="relative flex items-start">
          {/* Left Navigation Button - Desktop only, positioned outside carousel */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`hidden lg:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-neutral-200 text-[#06003F] hover:bg-[#06003F] hover:text-white transition-all duration-200 mr-4 ${
              canScrollLeft ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ marginTop: 'calc(280px * 4 / 3 / 2 - 24px)' }} /* Center on photo height (aspect 3/4 of 280px width) */
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scrollable Content - full width carousel */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide overscroll-x-contain [-webkit-overflow-scrolling:touch] flex-1 min-w-0"
          >
            <div className="flex gap-4 sm:gap-5 md:gap-6 pb-4 sm:pb-6 px-1" style={{ width: 'max-content' }}>
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  className="group flex-shrink-0 cursor-pointer w-[220px] sm:w-[250px] md:w-[280px]"
                  onClick={() => setSelectedAdvisor(index)}
                >
                  {/* Photo Card */}
                  <div className="relative bg-white rounded-[12px] overflow-hidden mb-4 sm:mb-5 transition-all duration-200">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={advisor.image}
                        alt={`Photo of ${advisor.name}`}
                        fill
                        sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 280px"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Brand consistent glow overlay (bottom-left) */}
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FF4E3A]/25 blur-[40px] rounded-full pointer-events-none z-10" />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06003F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                      {/* "View Details" text on hover */}
                      <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-white text-[12px] sm:text-[13px] font-semibold">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Role chip */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-3 left-3 sm:top-4 sm:left-4"
                    >
                      <span
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[6px] text-[10px] sm:text-[12px] font-bold uppercase tracking-wider ${
                          advisor.role === 'Investor'
                            ? 'bg-[#FF4E3A] text-white'
                            : advisor.role === 'Board Member'
                              ? 'bg-[#06003F] text-white'
                              : advisor.role.startsWith('Customer Advisory')
                                ? 'bg-white text-[#06003F]'
                                : 'bg-white text-[#06003F]'
                        }`}
                      >
                        {advisor.role}
                      </span>
                    </motion.div>
                  </div>

                  {/* Info Section */}
                  <div>
                    <h3 className="text-[18px] sm:text-[19px] md:text-[20px] font-bold text-[#06003F] mb-1 group-hover:text-[#FF4E3A] transition-colors duration-200">
                      {advisor.name}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-[#06003F]/50 leading-relaxed">
                      {advisor.designation}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Navigation Button - Desktop only, positioned outside carousel */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`hidden lg:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-neutral-200 text-[#06003F] hover:bg-[#06003F] hover:text-white transition-all duration-200 ml-4 ${
              canScrollRight ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ marginTop: 'calc(280px * 4 / 3 / 2 - 24px)' }} /* Center on photo height (aspect 3/4 of 280px width) */
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
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

            {/* Modal Content Wrapper - using flexbox for centering */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-[560px] md:max-w-[900px] max-h-[85vh] bg-white rounded-[12px] sm:rounded-[16px] overflow-hidden pointer-events-auto relative"
              >
              {/* Close Button - sticky position */}
              <button
                onClick={() => setSelectedAdvisor(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#06003F]/5 text-[#06003F]/60 hover:bg-[#06003F]/10 hover:text-[#06003F] transition-all duration-200"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[85vh] p-5 sm:p-8 md:p-10 lg:p-12">
                <div className="relative grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 sm:gap-8 md:gap-10 pt-6 sm:pt-0">
                  {/* Left: Photo */}
                  <div className="mx-auto md:mx-0 w-full max-w-[240px] sm:max-w-[280px] md:max-w-none">
                    <div className="relative bg-white rounded-[12px] overflow-hidden mb-4">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={advisors[selectedAdvisor].image}
                          alt={`Photo of ${advisors[selectedAdvisor].name}`}
                          fill
                          sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
                          className="w-full h-full object-cover"
                        />
                        {/* Brand consistent glow overlay (bottom-left) */}
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FF4E3A]/25 blur-[60px] rounded-full pointer-events-none z-10" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Details */}
                  <div className="text-center md:text-left">
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#06003F] mb-2">
                      {advisors[selectedAdvisor].name}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] text-[#06003F]/60 mb-6 sm:mb-8 leading-relaxed">
                      {advisors[selectedAdvisor].designation}
                    </p>

                    <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[#06003F]/10">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#06003F]/40 mb-2 sm:mb-3">
                        About
                      </h3>
                      <p className="text-[15px] text-[#06003F]/80 leading-relaxed">
                        {advisors[selectedAdvisor].description}
                      </p>
                    </div>

                    {selectedAdvisorData?.logos &&
                      selectedAdvisorData.logos.length > 0 && (
                        <div>
                          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#06003F]/40 mb-3 sm:mb-4">
                            Affiliations
                          </h3>
                          {/* Logo row layout tuned to keep short lists on one line. */}
                          {selectedAdvisorData.logos.length === 4 ? (
                            <div className="inline-grid grid-cols-4 gap-x-6 gap-y-3 items-center justify-items-center">
                              {selectedAdvisorData.logos.map((logo, idx) => (
                                <div key={idx} className="w-full flex items-center justify-center">
                                  <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={140}
                                    height={56}
                                    sizes="(max-width: 640px) 95px, (max-width: 768px) 110px, 130px"
                                    className="h-11 sm:h-12 md:h-[52px] w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="inline-grid grid-cols-3 gap-x-8 gap-y-4 items-center justify-items-center">
                              {selectedAdvisorData.logos.map((logo, idx) => (
                                <div key={idx} className="w-full flex items-center justify-center">
                                  <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={160}
                                    height={56}
                                    sizes="(max-width: 640px) 110px, (max-width: 768px) 130px, 150px"
                                    className="h-11 sm:h-12 md:h-[52px] w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                    {/* Text-based affiliations (when no logos are available) */}
                    {(!selectedAdvisorData?.logos || selectedAdvisorData.logos.length === 0) &&
                      selectedAdvisorData?.affiliationTexts &&
                      selectedAdvisorData.affiliationTexts.length > 0 && (
                        <div>
                          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#06003F]/40 mb-3 sm:mb-4">
                            Affiliations
                          </h3>
                          <div className="flex gap-2 sm:gap-3 items-center flex-wrap justify-center md:justify-start">
                            {selectedAdvisorData.affiliationTexts.map((text, idx) => (
                              <span
                                key={idx}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-[8px] bg-[#06003F]/5 text-[13px] sm:text-[14px] text-[#06003F]/70 font-medium"
                              >
                                {text}
                              </span>
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
