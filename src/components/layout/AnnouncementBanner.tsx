'use client';

/**
 * AnnouncementBanner Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { AnnouncementBannerContent } from '@/lib/content';

interface AnnouncementBannerProps {
  content?: AnnouncementBannerContent;
}

const DEFAULT_CONTENT: AnnouncementBannerContent = {
  highlightText: 'Agentic AI company VoiceCare AI raises $4.54M series Seed financing,',
  regularText: 'strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant platform',
};

export function AnnouncementBanner({ content }: AnnouncementBannerProps) {
  const bannerContent = content || DEFAULT_CONTENT;
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
              {bannerContent.highlightText}
            </span>{' '}
            {bannerContent.regularText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AnnouncementBanner;
