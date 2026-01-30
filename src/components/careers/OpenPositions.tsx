'use client';

/**
 * OpenPositions Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Careers.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - py-24 bg-white
 *
 * Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Header Animation:
 * - initial: opacity: 0, y: 20
 * - whileInView: opacity: 1, y: 0
 * - viewport: once: true
 * - transition: duration: 0.6
 *
 * Header:
 * - text-center mb-16
 * - h2: text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]
 *
 * List Container:
 * - max-w-4xl mx-auto space-y-6
 *
 * Card Animation:
 * - initial: opacity: 0, y: 20
 * - whileInView: opacity: 1, y: 0
 * - viewport: once: true
 * - transition: duration: 0.5, delay: index * 0.1
 *
 * Card Hover:
 * - y: -4
 * - transition: duration: 0.3, ease: [0.23, 1, 0.32, 1]
 *
 * Card:
 * - group bg-white border border-[#06003F]/10 rounded-[12px] p-8
 * - hover:border-[#FF4E3A]/30 transition-all duration-300
 *
 * Card Content:
 * - flex flex-col md:flex-row md:items-center justify-between gap-6
 *
 * Title:
 * - text-[24px] font-bold text-[#06003F] mb-4
 * - group-hover:text-[#FF4E3A] transition-colors duration-300
 *
 * Meta:
 * - flex flex-wrap items-center gap-2 text-[14px] text-[#06003F]/60
 * - Category: font-semibold text-[#06003F]
 * - Separators: text-[#06003F]/30
 *
 * Button:
 * - bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px] text-sm font-semibold
 * - hover:bg-[#FF4E3A]/90 transition-all flex items-center gap-2 group
 * - shadow-lg shadow-[#FF4E3A]/20 self-start md:self-center
 *
 * ArrowRight Icon:
 * - w-4 h-4 group-hover:translate-x-1 transition-transform
 */

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { jobsData, generateJobSlug } from './jobsData';

// ============================================
// Component
// ============================================

export function OpenPositions() {
  return (
    <section className="py-14 sm:py-18 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            Open Positions
          </h2>
        </motion.div>

        {/* Positions List */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
          {jobsData.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
              }}
              className="group bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#FF4E3A]/30 transition-all duration-300 w-full min-w-0 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#06003F] mb-2 sm:mb-3 md:mb-4 group-hover:text-[#FF4E3A] transition-colors duration-300 break-words">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#06003F]/60">
                    <span className="font-semibold text-[#06003F]">{position.category}</span>
                    <span className="text-[#06003F]/30">|</span>
                    {position.locations.map((location, idx) => (
                      <span key={location}>
                        <span>{location}</span>
                        {idx < position.locations.length - 1 && (
                          <span className="text-[#06003F]/30"> or </span>
                        )}
                      </span>
                    ))}
                    <span className="text-[#06003F]/30">|</span>
                    {position.type.map((type, idx) => (
                      <span key={type}>
                        <span>{type}</span>
                        {idx < position.type.length - 1 && (
                          <span className="text-[#06003F]/30"> | </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/careers/${generateJobSlug(position.title)}`}
                  className="bg-[#FF4E3A] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3 md:py-3.5 rounded-[6px] text-[13px] sm:text-sm font-semibold hover:bg-[#FF4E3A]/90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#FF4E3A]/20 self-stretch sm:self-center w-full sm:w-auto shrink-0"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OpenPositions;
