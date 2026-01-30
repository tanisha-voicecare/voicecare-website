'use client';

/**
 * AnnouncementBanner Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/AnnouncementBanner.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Wrapper:
 * - relative mt-14 (positions below fixed h-14 navbar)
 * - bg-gradient-to-r from-[#06003F] via-[#06003F]/95 to-[#06003F]
 * - border-b border-[#FF4E3A]/20
 * - Animation: initial opacity:0, y:-20 → opacity:1, y:0
 * - Duration: 0.6s, ease: [0.23, 1, 0.32, 1]
 *
 * Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Inner:
 * - flex items-center justify-center gap-3 py-3
 * - overflow-x-auto scrollbar-hide
 *
 * Icon:
 * - Sparkles w-4 h-4 text-[#FF4E3A] flex-shrink-0
 *
 * Text:
 * - text-sm text-white/90 text-center whitespace-nowrap
 * - Bold part: font-semibold text-white
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative mt-14 bg-gradient-to-r from-[#06003F] via-[#06003F]/95 to-[#06003F] border-b border-[#FF4E3A]/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <div className="flex items-center justify-start xl:justify-center gap-3 py-3 overflow-x-auto scrollbar-hide">
          <Sparkles className="w-4 h-4 text-[#FF4E3A] flex-shrink-0" />
          <p className="text-sm text-white/90 xl:text-center xl:whitespace-nowrap">
            <span className="font-semibold text-white">
              Agentic AI company VoiceCare AI raises $4.54M series Seed financing,
            </span>{' '}
            strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant
            platform
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AnnouncementBanner;
