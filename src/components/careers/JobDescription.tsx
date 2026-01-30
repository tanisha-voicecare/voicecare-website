'use client';

/**
 * JobDescription Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/JobDescription.tsx
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
 *
 * Form Card:
 * - bg-white border border-[#06003F]/10 rounded-[12px] p-8
 *
 * Form Title:
 * - text-[24px] font-bold text-[#06003F] mb-6
 *
 * Labels:
 * - text-[14px] font-semibold text-[#06003F] mb-2
 *
 * Inputs:
 * - px-4 py-3 border border-[#06003F]/20 rounded-[6px] text-[14px]
 * - focus:border-[#FF4E3A]
 *
 * File Upload:
 * - border-2 border-dashed border-[#06003F]/20 rounded-[6px] p-6
 * - hover:border-[#FF4E3A]/50
 *
 * Submit Button:
 * - w-full bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px]
 * - text-sm font-semibold shadow-lg shadow-[#FF4E3A]/20
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import type { JobData } from './jobsData';

// ============================================
// Types
// ============================================

export type { JobData };

interface JobDescriptionProps {
  jobData: JobData;
}

// ============================================
// Component
// ============================================

export function JobDescription({ jobData }: JobDescriptionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    officeAvailability: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { ...formData, file: uploadedFile });
  };

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
                <div className="w-full bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8">
                  <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
                    Apply for this position
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[13px] sm:text-[14px] font-semibold text-[#06003F] mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border border-[#06003F]/20 rounded-[6px] text-[13px] sm:text-[14px] text-[#06003F] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[13px] sm:text-[14px] font-semibold text-[#06003F] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border border-[#06003F]/20 rounded-[6px] text-[13px] sm:text-[14px] text-[#06003F] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label
                        htmlFor="resume"
                        className="block text-[13px] sm:text-[14px] font-semibold text-[#06003F] mb-2"
                      >
                        Resume/CV *
                      </label>
                      {!uploadedFile ? (
                        <label
                          htmlFor="resume"
                          className="w-full border-2 border-dashed border-[#06003F]/20 rounded-[6px] p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF4E3A]/50 transition-colors"
                        >
                          <Upload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#06003F]/40 mb-2" />
                          <span className="text-[13px] sm:text-[14px] text-[#06003F]/60 text-center">Click to upload</span>
                          <span className="text-[11px] sm:text-[12px] text-[#06003F]/40 mt-1 text-center break-words">
                            PDF, DOC, DOCX (Max 10MB)
                          </span>
                          <input
                            type="file"
                            id="resume"
                            required
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="border border-[#06003F]/20 rounded-[6px] p-3 sm:p-4 flex items-center justify-between gap-2 min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF4E3A]/10 rounded-[6px] flex items-center justify-center shrink-0">
                              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4E3A]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] sm:text-[14px] font-medium text-[#06003F] truncate">
                                {uploadedFile.name}
                              </p>
                              <p className="text-[11px] sm:text-[12px] text-[#06003F]/60">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors shrink-0"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Radio Buttons */}
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#06003F] mb-2 sm:mb-3 leading-relaxed">
                        Our hybrid office culture believes innovation happens when team members
                        collaborate live. Would you be available to work in our Bay Area or India
                        office 3 days a week? *
                      </label>
                      <div className="space-y-2 sm:space-y-3">
                        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="officeAvailability"
                            value="yes"
                            required
                            checked={formData.officeAvailability === 'yes'}
                            onChange={(e) =>
                              setFormData({ ...formData, officeAvailability: e.target.value })
                            }
                            className="w-4 h-4 text-[#FF4E3A] border-[#06003F]/20 focus:ring-[#FF4E3A]"
                          />
                          <span className="text-[13px] sm:text-[14px] text-[#06003F]">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="officeAvailability"
                            value="no"
                            required
                            checked={formData.officeAvailability === 'no'}
                            onChange={(e) =>
                              setFormData({ ...formData, officeAvailability: e.target.value })
                            }
                            className="w-4 h-4 text-[#FF4E3A] border-[#06003F]/20 focus:ring-[#FF4E3A]"
                          />
                          <span className="text-[13px] sm:text-[14px] text-[#06003F]">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#FF4E3A] text-white px-6 sm:px-8 py-3 lg:py-3.5 rounded-[6px] text-sm font-semibold hover:bg-[#FF4E3A]/90 transition-all shadow-lg shadow-[#FF4E3A]/20"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobDescription;
