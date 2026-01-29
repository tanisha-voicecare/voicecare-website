'use client';

/**
 * Platform Tabbed Capabilities Section
 * EXACT implementation from designer-src/src/app/components/Platform.tsx (Tabbed Platform Capabilities)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative pt-12 pb-24 bg-white
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Section Heading:
 * - text-center mb-12
 * - h2: text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]
 *
 * Tabbed Interface Grid:
 * - grid md:grid-cols-[300px_1fr] gap-12
 *
 * Tab Navigation (Left):
 * - flex flex-col gap-3
 * - Active tab: bg-[#06003F] text-white shadow-lg
 * - Inactive tab: bg-transparent text-[#06003F]/60 hover:bg-[#F5F5F7]
 * - Button: px-6 py-4 rounded-[6px] text-left transition-all
 * - Icon: w-5 h-5
 * - Label: font-semibold text-[15px]
 *
 * Content Panel (Right):
 * - AnimatePresence mode="wait"
 * - Container: bg-[#FAFAFA] rounded-[12px] p-10 border border-[#06003F]/5
 * - Title: text-[32px] font-bold text-[#06003F] mb-4
 * - Video container: bg-white rounded-[12px] p-6 border border-[#06003F]/10
 * - Window dots: w-3 h-3 rounded-full (red-400, yellow-400, green-400)
 * - Video: 16:9 aspect ratio with poster and controls
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, FileText, Activity, Search, Shield, Play } from 'lucide-react';

// ============================================
// Types
// ============================================

interface Capability {
  id: string;
  icon: typeof CheckCircle2;
  label: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
}

// ============================================
// Data (EXACT from designer-src)
// ============================================

const capabilities: Capability[] = [
  {
    id: 'benefit-verification',
    icon: CheckCircle2,
    label: 'Benefit Verification',
    title: 'Benefit Verification',
    description: 'Autonomous eligibility & coverage checks with payer systems.',
    video: '/videos/platform/benefit-verification.mp4',
    thumbnail: '/videos/platform/thumbnails/benefit-verification.jpg',
  },
  {
    id: 'prior-authorization',
    icon: FileText,
    label: 'Prior Authorization',
    title: 'Prior Authorization',
    description: 'Smart determination, initiation, and follow-up across channels.',
    video: '/videos/platform/prior-authorization.mp4',
    thumbnail: '/videos/platform/thumbnails/prior-authorization.jpg',
  },
  {
    id: 'prescription-support',
    icon: Activity,
    label: 'Prescription Support',
    title: 'Prescription Support',
    description: 'Context-aware verification and prior auth support workflows.',
    video: '/videos/platform/prescription-support.mp4',
    thumbnail: '/videos/platform/thumbnails/prescription-support.jpg',
  },
  {
    id: 'claim-status',
    icon: Search,
    label: 'Claim Status',
    title: 'Claim Status',
    description: 'Automated tracking and follow-ups for claim processing.',
    video: '/videos/platform/claim-status.mp4',
    thumbnail: '/videos/platform/thumbnails/claim-status.jpg',
  },
  {
    id: 'claim-denials',
    icon: Shield,
    label: 'Claim Denials',
    title: 'Claim Denials',
    description: 'Intelligent denial management and appeal readiness.',
    video: '/videos/platform/claim-denials.mp4',
    thumbnail: '/videos/platform/thumbnails/claim-denials.jpg',
  },
];

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

export function PlatformTabbedCapabilities() {
  const [activeTab, setActiveTab] = useState('benefit-verification');

  return (
    <section className="relative pt-12 pb-24 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            Our Solutions
          </h2>
        </motion.div>

        {/* Tabbed Interface */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12">
          {/* Left: Tab Navigation */}
          <div className="flex flex-col gap-3">
            {capabilities.map((cap, index) => (
              <motion.button
                key={cap.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveTab(cap.id)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-[6px] text-left transition-all ${
                  activeTab === cap.id
                    ? 'bg-[#06003F] text-white shadow-lg'
                    : 'bg-transparent text-[#06003F]/60 hover:bg-[#F5F5F7]'
                }`}
              >
                <cap.icon className="w-5 h-5" />
                <span className="font-semibold text-[15px]">{cap.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right: Content Area */}
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
                    className="bg-[#FAFAFA] rounded-[12px] p-10 border border-[#06003F]/5"
                  >
                    <h3 className="text-[32px] font-bold text-[#06003F] mb-4">{cap.title}</h3>

                    {/* Video Player Container */}
                    <div className="bg-white rounded-[12px] p-6 border border-[#06003F]/10">
                      {/* Mac-style window buttons */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#06003F]/5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>

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
