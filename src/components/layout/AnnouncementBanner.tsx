'use client';

/**
 * AnnouncementBanner Component
 * PIXEL-PERFECT design matching Figma: https://craft-juror-27577775.figma.site/
 * Scrolling marquee with multiple announcements
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { AnnouncementBannerContent } from '@/lib/content';

interface AnnouncementBannerProps {
  content?: AnnouncementBannerContent;
}

// Multiple announcements matching Figma design
const announcements = [
  {
    id: 1,
    highlight: 'Agentic AI company VoiceCare AI raises $4.54M series Seed financing,',
    text: 'strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant platform',
  },
  {
    id: 2,
    highlight: 'Agentic AI company VoiceCare AI raises $4.54M series Seed financing,',
    text: 'strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant platform',
  },
  {
    id: 3,
    highlight: 'Agentic AI company VoiceCare AI raises $4.54M series Seed financing,',
    text: 'strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant platform',
  },
];

export function AnnouncementBanner({ content }: AnnouncementBannerProps) {
  // If custom content is provided, use it as the first announcement
  const displayAnnouncements = content
    ? [
        { id: 0, highlight: content.highlightText, text: content.regularText },
        ...announcements.slice(1),
      ]
    : announcements;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative mt-14 bg-gradient-to-r from-[#06003F] via-[#06003F]/95 to-[#06003F] border-b border-[#FF4E3A]/20 overflow-hidden"
    >
      <div className="flex items-center gap-3 py-3">
        <Sparkles className="w-4 h-4 text-[#FF4E3A] flex-shrink-0 ml-4 sm:ml-6" />
        <div className="relative overflow-hidden flex-1">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-8 whitespace-nowrap items-center"
          >
            {/* First set of announcements */}
            {displayAnnouncements.map((announcement) => (
              <div
                key={`first-${announcement.id}`}
                className="flex items-center gap-8"
              >
                <div className="text-[15px] text-white/90">
                  <span className="font-semibold text-white">
                    {announcement.highlight}
                  </span>{' '}
                  {announcement.text}
                </div>
                <span className="text-white/30">|</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {displayAnnouncements.map((announcement) => (
              <div
                key={`second-${announcement.id}`}
                className="flex items-center gap-8"
              >
                <div className="text-[15px] text-white/90">
                  <span className="font-semibold text-white">
                    {announcement.highlight}
                  </span>{' '}
                  {announcement.text}
                </div>
                <span className="text-white/30">|</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AnnouncementBanner;
