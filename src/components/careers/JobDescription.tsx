'use client';

/**
 * JobDescription Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/JobDescription.tsx
 * 
 * NOW WITH DYNAMIC FORM SUPPORT:
 * - Fetches form fields from WordPress automatically
 * - Admin can change form fields without code changes
 * - Zero developer dependency
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Header Section:
 * - pt-6 pb-16 bg-white border-b border-[#06003F]/10
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Back Button:
 * - flex items-center gap-2 text-[#06003F]/60 hover:text-[#FF4E3A]
 * - transition-colors mb-8 group
 * - ArrowLeft: w-5 h-5 group-hover:-translate-x-1 transition-transform
 *
 * Title Animation:
 * - initial: opacity: 0, y: 20
 * - animate: opacity: 1, y: 0
 * - transition: duration: 0.5
 *
 * Title:
 * - text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-6
 *
 * Meta:
 * - flex flex-wrap items-center gap-2 text-[16px] text-[#06003F]/60
 *
 * Content Section:
 * - py-16 bg-white
 * - grid grid-cols-1 lg:grid-cols-3 gap-12
 *
 * Left Column (2/3):
 * - lg:col-span-2
 * - Animation: initial opacity:0, y:20 → opacity:1, y:0, delay: 0.1
 * - space-y-8
 *
 * Section Headings:
 * - text-[32px] font-bold text-[#06003F] mb-6
 *
 * List Items:
 * - flex gap-3 text-[16px] text-[#06003F]/80 leading-relaxed
 * - Bullet: text-[#FF4E3A] mt-1.5
 *
 * Right Column (1/3 - Sticky Sidebar):
 * - lg:col-span-1
 * - sticky top-32
 * - Animation: initial opacity:0, y:20 → opacity:1, y:0, delay: 0.2
 */

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { JobData } from './jobsData';
import { JobApplicationForm } from '@/components/forms';

// ============================================
// Types
// ============================================

export type { JobData };

interface JobDescriptionProps {
  jobData: JobData;
  /** Optional: Form ID from WordPress MetForm (if known) */
  formId?: number;
}

// ============================================
// Component
// ============================================

export function JobDescription({ jobData, formId }: JobDescriptionProps) {

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <section className="pt-4 sm:pt-5 md:pt-6 pb-10 sm:pb-12 md:pb-16 bg-white border-b border-[#06003F]/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors mb-6 sm:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-4 sm:mb-5 md:mb-6 break-words">
              {jobData.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-2 text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/60 min-w-0">
              <span className="font-semibold text-[#06003F]">{jobData.category}</span>
              <span className="hidden sm:inline text-[#06003F]/30">|</span>
              <span className="min-w-0">{jobData.locations.join(' or ')}</span>
              <span className="hidden sm:inline text-[#06003F]/30">|</span>
              <div className="flex flex-wrap gap-1 sm:gap-0">
                {jobData.type.map((t, idx) => (
                  <span key={t}>
                    <span>{t}</span>
                    {idx < jobData.type.length - 1 && <span className="text-[#06003F]/30"> | </span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Job Description - Left Column (2/3) */}
            <div className="lg:col-span-2 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6 sm:space-y-7 md:space-y-8"
              >
                {/* Introduction */}
                <div>
                  <p className="text-[15px] sm:text-[16px] text-[#06003F]/80 leading-relaxed break-words">
                    {jobData.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
                    Key Responsibilities:
                  </h2>
                  <ul className="space-y-3 sm:space-y-4">
                    {jobData.responsibilities.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 sm:gap-3 text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/80 leading-relaxed"
                      >
                        <span className="text-[#FF4E3A] mt-1 sm:mt-1.5 shrink-0">•</span>
                        <span className="break-words min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
                    Looking for someone who has the following skills:
                  </h2>
                  <ul className="space-y-3 sm:space-y-4">
                    {jobData.skills.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 sm:gap-3 text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/80 leading-relaxed"
                      >
                        <span className="text-[#FF4E3A] mt-1 sm:mt-1.5 shrink-0">•</span>
                        <span className="break-words min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* At VoiceCare */}
                <div>
                  <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
                    At VoiceCare, you will:
                  </h2>
                  <ul className="space-y-3 sm:space-y-4">
                    {jobData.benefits.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 sm:gap-3 text-[14px] sm:text-[15px] md:text-[16px] text-[#06003F]/80 leading-relaxed"
                      >
                        <span className="text-[#FF4E3A] mt-1 sm:mt-1.5 shrink-0">•</span>
                        <span className="break-words min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Application Form - Right Column (1/3) */}
            <div className="lg:col-span-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:sticky lg:top-32"
              >
                {/* Dynamic Job Application Form - fetches fields from WordPress */}
                <JobApplicationForm 
                  formId={formId} 
                  jobTitle={jobData.title}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobDescription;
