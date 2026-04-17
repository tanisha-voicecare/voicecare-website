"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Paperclip, Check, Volume2, VolumeX } from 'lucide-react';
import { assets } from "@/lib/assets";
import orbGradient from "@/assets/68e564fc051151a61f78ecc6d8f02de5033ed42b.png";

// Reusable SVG for the Top straight Arrow
const TopArrow = () => (
  <svg width="18" height="71" viewBox="0 0 18 71" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF4E3A]">
    <motion.path 
      d="M9 0V69" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path 
      d="M4 64L9 69L14 64" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.2 }}
    />
  </svg>
);

// Reusable SVG for the Bottom straight Arrow
const BottomArrow = () => (
  <svg width="18" height="71" viewBox="0 0 18 71" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF4E3A]">
    <motion.path 
      d="M9 0V69" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path 
      d="M4 64L9 69L14 64" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.2 }}
    />
  </svg>
);

// Define the 3 states
const ORB_STATES = [
  { text: "Joy talking to payer", icon: "soundwave" },
  { text: "Joy reading faxes", icon: "eye" },
  { text: "Joy navigating portals", icon: "pointer" }
];

export function WorkflowVisualization({ activeTitle }: { activeTitle: string }) {
  const [isMuted, setIsMuted] = useState(true);
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Manage audio play/pause when user toggles
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Cycle through states smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStateIndex((prev) => (prev + 1) % ORB_STATES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center relative h-full max-h-[85vh] justify-center py-4">
      
      {/* Audio Control Button (Bottom Left) */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-4 left-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-full transition-all z-30 flex items-center justify-center shadow-lg"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Top Section */}
      <div className="w-full flex flex-col items-center gap-4 relative z-10 mx-[0px] mt-[0px] mb-[-56px]">
        {/* Main Instruction Box */}
        <motion.div 
          className="w-full md:w-[95%] bg-gradient-to-r from-[#06003F]/80 to-[#02007F]/80 backdrop-blur-md border border-white/10 rounded-[6px] px-5 py-3 md:py-4 flex items-center justify-between shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white text-[16px] md:text-[18px] font-light tracking-wide leading-tight font-['Satoshi']">
            Complete {activeTitle} for these patients
          </span>
          <div className="bg-white p-1.5 md:p-2 rounded-sm ml-4 shrink-0 shadow-md">
            <CornerDownLeft size={16} className="text-[#06003F]" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* File Attachment Box Container */}
        <div className="relative flex flex-col items-center w-full">
          <motion.div 
            className="w-[60%] md:w-[50%] bg-gradient-to-r from-[#06003F]/80 to-[#02007F]/80 backdrop-blur-md border border-white/10 rounded-[6px] px-5 py-3 flex items-center justify-between gap-3 shadow-lg z-10 ml-[-200px] mr-[0px] my-[0px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white/90 text-[14px] md:text-[15px] font-light font-['Satoshi'] tracking-wide">
              Patient-Details-26.csv
            </span>
            <div className="bg-white p-1 rounded-sm shrink-0 shadow-md">
              <Paperclip size={14} className="text-[#06003F]" strokeWidth={2.5} />
            </div>
          </motion.div>
          
          {/* Straight Arrow connecting File to Orb */}
          <div className="w-[14px] md:w-[18px] h-[40px] md:h-[50px] mt-4 z-0">
            <TopArrow />
          </div>
        </div>
      </div>

      {/* Center Section: Orb and Badge */}
      <div className="relative mt-8 mb-[10px] md:mb-[15px] flex flex-col justify-center items-center">
        
        {/* The Orb container */}
        <motion.div 
          className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Intense background glowing layer for orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#FF4E3A] rounded-full filter blur-[50px] opacity-40 mix-blend-screen pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#02007F] rounded-full filter blur-[60px] opacity-60 mix-blend-screen pointer-events-none" />

          {/* Masked Orb */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{
              maskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
              transform: 'translateZ(0)',
              background: `url(${orbGradient}) center / 100% 100% no-repeat`
            }}
          >
            <video 
              ref={videoRef}
              src={assets.home.orbVideo} 
              autoPlay 
              loop 
              muted={isMuted}
              playsInline 
              className="absolute max-w-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: '125%', 
                height: '125%', 
                objectFit: 'cover', 
                willChange: 'transform', 
                mixBlendMode: 'luminosity' 
              }}
            />
          </div>

          {/* Overlapping Badge */}
          <motion.div 
            className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {/* Circular Badge with animating icons */}
            <div 
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] ml-[0px] mr-[51px] mt-[0px] mb-[37px]"
              style={{ background: 'linear-gradient(135deg, rgba(6,0,63,0.6) 0%, rgba(2,0,127,0.6) 100%)' }}
            >
              <div className="relative w-6 h-6 flex items-center justify-center scale-[1.2]">
                <AnimatePresence mode="wait">
                  {activeStateIndex === 0 && (
                    <motion.div 
                      key="soundwave"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <motion.div
                        animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1] }}
                        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                        style={{ transformOrigin: 'center' }}
                      >
                        <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                          <rect x="2" y="5" width="2" height="6" rx="1" />
                          <rect x="6" y="2" width="2" height="12" rx="1" />
                          <rect x="10" y="4" width="2" height="8" rx="1" />
                          <rect x="14" y="6" width="2" height="4" rx="1" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {activeStateIndex === 1 && (
                    <motion.div 
                      key="eye"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <motion.div
                        animate={{ 
                          scaleY: [1, 1, 0.1, 0.05, 0.1, 1],
                          opacity: [0.9, 0.9, 0.3, 0.2, 0.3, 0.9]
                        }}
                        transition={{ 
                          duration: 3, 
                          ease: "easeInOut", 
                          repeat: Infinity,
                          times: [0, 0.9, 0.93, 0.95, 0.97, 1]
                        }}
                        style={{ transformOrigin: 'center' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeStateIndex === 2 && (
                    <motion.div 
                      key="cursor"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <motion.div
                        animate={{ 
                          x: [0, 2, -2, 2, 0], 
                          y: [0, -2, 2, 1, 0], 
                          scale: [1, 0.95, 1.05, 0.98, 1] 
                        }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        style={{ transformOrigin: 'center' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 4.1 12 6"/>
                          <path d="m5.1 8-2.9-.8"/>
                          <path d="m6 12-1.9 2"/>
                          <path d="M7.2 2.2 8 5.1"/>
                          <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text corresponding to icon state under the orb */}
        <motion.div 
          className="mt-0 md:mt-1 relative w-full h-[24px] overflow-hidden text-center z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStateIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full flex items-center justify-center text-white/90 text-[15px] font-light tracking-wide whitespace-nowrap"
            >
              {ORB_STATES[activeStateIndex]?.text ?? ''}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Arrow */}
      <div className="w-[14px] md:w-[18px] h-[30px] md:h-[40px] mt-2 mb-4">
        <BottomArrow />
      </div>

      {/* Final State Checkmark */}
      <motion.div 
        className="flex flex-col items-center gap-3 m-[0px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="relative">
          {/* Green Glow */}
          <div className="absolute inset-0 bg-[#34DD1A] rounded-full filter blur-[10px] opacity-40 mix-blend-screen" />
          {/* Checkmark circle */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#34DD1A]/40 bg-gradient-to-tr from-[#34DD1A]/20 to-[#2FD923]/20 flex items-center justify-center relative z-10 backdrop-blur-sm">
            <Check size={20} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="text-center flex flex-col">
          <span className="text-white/90 text-[15px] md:text-[16px] font-light tracking-wide leading-tight">
            {activeTitle}
          </span>
          <span className="text-white/90 text-[15px] md:text-[16px] font-light tracking-wide leading-tight">
            Completed
          </span>
        </div>
      </motion.div>

    </div>
  );
}
