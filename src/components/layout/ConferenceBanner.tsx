'use client';

import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * ConferenceBanner Component
 * Secondary announcement banner for AAOE Annual Conference
 * Positioned just above the main moving banner and below the header
 */

interface ConferenceBannerProps {
  className?: string;
}

export function ConferenceBanner({ className = '' }: ConferenceBannerProps) {
  const announcement = {
    highlight: 'Meet the Voicecare.ai team at AAOE Annual Conference 2026 (Booth #423).',
    text: 'Schedule a 30 min demo now',
    linkUrl: 'https://www.voicecare.ai/aaoe',
  };

  return (
    <div
      className={`relative bg-gradient-to-r from-[#FF4E3A] to-[#02007F] border-b border-[#FF4E3A]/20 overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center gap-3 py-3">
        <Sparkles className="w-4 h-4 text-white flex-shrink-0" />
        <Link
          href={announcement.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline-none flex items-center gap-2 group text-center"
        >
          <div className="text-[14px] sm:text-[15px] text-white/90">
            <span className="font-semibold text-white">
              {announcement.highlight}
            </span>
            <span className="hidden sm:inline">
              {' '}{announcement.text}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#FF4E3A] transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1 " />
        </Link>
      </div>
    </div>
  );
}

export default ConferenceBanner;
