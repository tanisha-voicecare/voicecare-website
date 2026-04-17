"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PremiumAIAnimation } from './premium-ai-animation';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-stretch overflow-hidden bg-[#06003F] pt-[80px] md:pt-[100px]"
    >
      <div className="w-full h-full flex flex-col lg:flex-row max-w-[1600px] mx-auto">
        {/* Left Half - Text content */}
        <motion.div
          style={{ y: yLeft }}
          className="w-full lg:w-1/2 flex items-center px-6 md:px-12 lg:px-16 xl:px-20 z-10 py-12 lg:py-24"
        >
          <div className="max-w-[560px] w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="leading-[1.05] text-white mb-6 md:mb-8 text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[72px]"
              style={{ fontWeight: 400, letterSpacing: '-0.02em' }}
            >
              The Autonomous<br />Workforce for<br />High-Precision<br />RCM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/70 leading-relaxed text-[15px] sm:text-[16px] mb-10 max-w-[480px]"
              style={{ fontWeight: 300 }}
            >
              One agent to run your entire revenue cycle - from intake to
              claims. VoiceCare AI automates workflows across stakeholders,
              payer portals, and legacy systems with native EHR integration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF4E3A] to-[#02007F] text-white rounded-[4px] transition-all duration-200 text-sm font-medium"
              >
                Schedule a Demo
              </motion.button>
              <motion.button
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-white/90 hover:text-white transition-colors duration-200 text-sm font-light"
              >
                Become a Partner
              </motion.button>
            </motion.div>

            {/* Backed & Trusted by */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-full relative"
            >
              {/* Dashed line extending to the right */}
              <div className="absolute top-[10px] left-0 w-full lg:w-[150%] h-[1px] border-t border-dashed border-white/20" />
              
              <div className="relative bg-[#06003F] inline-block pr-6 mb-6 text-white/60 text-[13px] font-light">
                Backed & Trusted by
              </div>
              
              <div className="flex items-center gap-8 sm:gap-12 flex-wrap">
                {/* Mayo Clinic */}
                <div className="flex items-center gap-2">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="opacity-90">
                    <path d="M10 5 h40 v15 c0 15-20 20-20 20 s-20-5-20-20 z" stroke="white" strokeWidth="1.5" fill="none" />
                    <text x="30" y="16" fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Satoshi, sans-serif">MAYO</text>
                    <text x="30" y="26" fill="white" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Satoshi, sans-serif">CLINIC</text>
                  </svg>
                </div>
                {/* Optum */}
                <div className="text-white font-medium text-[22px] tracking-tight opacity-90">Optum</div>
                {/* Cencora */}
                <div className="text-white font-light text-[22px] tracking-tight opacity-90">cencora</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Half - Animation */}
        <motion.div
          style={{ y: yRight }}
          className="w-full lg:w-1/2 flex items-center justify-center p-0 min-h-[500px] lg:min-h-screen relative"
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <PremiumAIAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
