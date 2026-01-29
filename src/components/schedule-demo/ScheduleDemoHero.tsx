'use client';

/**
 * ScheduleDemoHero Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/ScheduleDemo.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Page Wrapper (in page.tsx):
 * - min-h-screen bg-white pt-14
 *
 * Section Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl pt-20
 *
 * Hero Wrapper:
 * - text-center max-w-4xl mx-auto mb-16
 *
 * Title (H1):
 * - text-[48px] leading-[1.1] mb-[24px] font-bold mt-[-50px] mr-[0px] ml-[0px]
 *
 * Description:
 * - text-[16px] text-muted-foreground leading-relaxed
 *
 * Animation:
 * - initial: { opacity: 0, y: 20 }
 * - animate: { opacity: 1, y: 0 }
 * - transition: { duration: 0.6 }
 */

import { motion } from 'motion/react';

export function ScheduleDemoHero() {
  return (
    <section className="container mx-auto px-6 md:px-16 max-w-7xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-[48px] leading-[1.1] mb-[24px] font-bold text-[#06003F] mt-[-50px] mr-[0px] ml-[0px]">
            Schedule a Demo
          </h1>
          <p className="text-[16px] text-[#06003F]/60 leading-relaxed">
            Gain a comprehensive understanding of how our AI-driven solutions can revolutionize your operations.<br />
            Our team will reach out promptly to arrange a tailored demonstration that aligns with your needs and objectives.
          </p>
        </motion.div>
    </section>
  );
}

export default ScheduleDemoHero;
