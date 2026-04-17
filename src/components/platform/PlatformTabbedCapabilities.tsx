'use client';

/**
 * Platform Tabbed Capabilities Section
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, FileText, Activity, Search, Shield, Play, type LucideIcon } from 'lucide-react';
import type { PlatformSolutionsContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface PlatformTabbedCapabilitiesProps {
  content?: PlatformSolutionsContent;
}

interface CapabilityWithIcon {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
}

// ============================================
// Default Content (Fallback)
// ============================================

const DEFAULT_CONTENT: PlatformSolutionsContent = {
  sectionTitle: 'Our Solutions',
  capabilities: [
    {
      id: 'benefit-verification',
      label: 'Benefit Verification',
      title: 'Benefit Verification',
      description: 'Autonomous eligibility & coverage checks with payer systems.',
    },
    {
      id: 'prior-authorization',
      label: 'Prior Authorization',
      title: 'Prior Authorization',
      description: 'Smart determination, initiation, and follow-up across channels.',
    },
    {
      id: 'prescription-support',
      label: 'Prescription Support',
      title: 'Prescription Support',
      description: 'Context-aware verification and prior auth support workflows.',
    },
    {
      id: 'claim-status',
      label: 'Claim Status',
      title: 'Claim Status',
      description: 'Automated tracking and follow-ups for claim processing.',
    },
    {
      id: 'claim-denials',
      label: 'Claim Denials',
      title: 'Claim Denials',
      description: 'Intelligent denial management and appeal readiness.',
    },
  ],
};

// Icon and video mappings (static, managed in codebase)
const ICON_MAP: Record<string, LucideIcon> = {
  'benefit-verification': CheckCircle2,
  'prior-authorization': FileText,
  'prescription-support': Activity,
  'claim-status': Search,
  'claim-denials': Shield,
};

const VIDEO_MAP: Record<string, { video: string; thumbnail: string }> = {
  'benefit-verification': {
    video: '/videos/platform/benefit-verification.mp4',
    thumbnail: '/videos/platform/thumbnails/benefit-verification.jpg',
  },
  'prior-authorization': {
    video: '/videos/platform/prior-authorization.mp4',
    thumbnail: '/videos/platform/thumbnails/prior-authorization.jpg',
  },
  'prescription-support': {
    video: '/videos/platform/prescription-support.mp4',
    thumbnail: '/videos/platform/thumbnails/prescription-support.jpg',
  },
  'claim-status': {
    video: '/videos/platform/claim-status.mp4',
    thumbnail: '/videos/platform/thumbnails/claim-status.jpg',
  },
  'claim-denials': {
    video: '/videos/platform/claim-denials.mp4',
    thumbnail: '/videos/platform/thumbnails/claim-denials.jpg',
  },
};

// ============================================
// Video Player Component
// ============================================

function VideoPlayer({ video, thumbnail, description }: { video: string; thumbnail: string; description: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(false);
  };

  const handleVideoPause = () => {
    if (videoRef.current?.paused) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video}
        poster={thumbnail}
        controls={showControls}
        onEnded={handleVideoEnd}
        onPause={handleVideoPause}
        onPlay={() => setIsPlaying(true)}
        className="absolute top-0 left-0 w-full h-full rounded-[8px] bg-[#06003F] object-contain"
      />
      
      {/* Play Button Overlay (shown when not playing) */}
      {!isPlaying && (
        <div 
          onClick={handlePlay}
          className="absolute top-0 left-0 w-full h-full rounded-[8px] flex items-center justify-center cursor-pointer group"
        >
          {/* Play button */}
          <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
          {/* Description overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-[8px]">
            <p className="text-white/90 text-[14px]">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Component
// ============================================

export function PlatformTabbedCapabilities({ content }: PlatformTabbedCapabilitiesProps) {
  const solutionsContent = content || DEFAULT_CONTENT;
  
  // Merge content with icons and videos
  const capabilities: CapabilityWithIcon[] = solutionsContent.capabilities.map((cap) => ({
    ...cap,
    icon: ICON_MAP[cap.id] || CheckCircle2,
    video: VIDEO_MAP[cap.id]?.video || '/videos/platform/benefit-verification.mp4',
    thumbnail: VIDEO_MAP[cap.id]?.thumbnail || '/videos/platform/thumbnails/benefit-verification.jpg',
  }));
  
  const [activeTab, setActiveTab] = useState(capabilities[0]?.id || 'benefit-verification');

  return (
    <section className="relative pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            {solutionsContent.sectionTitle}
          </h2>
        </motion.div>

        {/* Tabbed Interface */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] gap-6 sm:gap-8 md:gap-12">
          {/* Tab Navigation - horizontal scroll on mobile, vertical on md+ */}
          <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-hide">
            {capabilities.map((cap, index) => (
              <motion.button
                key={cap.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveTab(cap.id)}
                className={`group flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-[6px] text-left transition-all whitespace-nowrap md:whitespace-normal flex-shrink-0 md:flex-shrink ${
                  activeTab === cap.id
                    ? 'bg-[#06003F] text-white shadow-lg'
                    : 'bg-[#F5F5F7] md:bg-transparent text-[#06003F]/60 hover:bg-[#F5F5F7]'
                }`}
              >
                <cap.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-[13px] sm:text-[14px] md:text-[15px]">{cap.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {capabilities.map(
              (cap) =>
                activeTab === cap.id && (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#FAFAFA] rounded-[12px] p-4 sm:p-6 md:p-8 lg:p-10 border border-[#06003F]/5"
                  >
                    <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06003F] mb-3 sm:mb-4">{cap.title}</h3>

                    {/* Video Player Container */}
                    <div className="bg-white rounded-[8px] sm:rounded-[10px] md:rounded-[12px] p-3 sm:p-4 md:p-6 border border-[#06003F]/10">
                      {/* Video Player */}
                      <VideoPlayer 
                        video={cap.video} 
                        thumbnail={cap.thumbnail} 
                        description={cap.description} 
                      />
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default PlatformTabbedCapabilities;
