"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { UserRound, ShieldCheck, FileCheck, Receipt, MoreHorizontal, Eye, MousePointerClick, Check } from 'lucide-react';
import { assets } from "@/lib/assets";
import Ellipse37 from "./ellipses/ellipse-37";
import Ellipse38 from "./ellipses/ellipse-38";
import Ellipse39 from "./ellipses/ellipse-39";
import Ellipse40 from "./ellipses/ellipse-40";
import Ellipse41 from "./ellipses/ellipse-41";

const AnimatedSoundwave = () => (
  <svg width={18} height={18} viewBox="0 0 16 16" fill="currentColor">
    <motion.rect x="2" y="5" width="2" height="6" rx="1" animate={{ height: [6, 12, 6], y: [5, 2, 5] }} transition={{ duration: 0.8, repeat: Infinity }} />
    <motion.rect x="6" y="2" width="2" height="12" rx="1" animate={{ height: [12, 4, 12], y: [2, 6, 2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
    <motion.rect x="10" y="4" width="2" height="8" rx="1" animate={{ height: [8, 14, 8], y: [4, 1, 4] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
    <motion.rect x="14" y="6" width="2" height="4" rx="1" animate={{ height: [4, 10, 4], y: [6, 3, 6] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }} />
  </svg>
);

const AnimatedEye = () => (
  <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1] }}>
    <Eye size={18} />
  </motion.div>
);

const AnimatedMouse = () => (
  <motion.div animate={{ scale: [1, 0.8, 1], y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
    <MousePointerClick size={18} />
  </motion.div>
);

const stackedStates = [
  { text: 'Joy talking to payer', color: 'bg-[#FF4E3A]', Icon: AnimatedSoundwave },
  { text: 'Joy reading faxes', color: 'bg-[#02007F]', Icon: AnimatedEye },
  { text: 'Joy navigating portals', color: 'bg-[#02007F]', Icon: AnimatedMouse },
];

const workflows = [
  {
    id: 'ai-receptionist',
    title: 'AI Receptionist',
    icon: UserRound,
    badgeText: 'Joy talking to patient',
    badgeColor: 'bg-[#FF4E3A]',
    BadgeIcon: AnimatedSoundwave,
  },
  {
    id: 'benefit-verification',
    title: 'Benefit Verification',
    icon: ShieldCheck,
    badgeText: 'Joy talking to payer',
    badgeColor: 'bg-[#FF4E3A]',
    BadgeIcon: AnimatedSoundwave,
  },
  {
    id: 'prior-auth',
    title: 'Prior Authorisation',
    icon: FileCheck,
    badgeText: 'Joy reading faxes',
    badgeColor: 'bg-[#02007F]',
    BadgeIcon: AnimatedEye,
  },
  {
    id: 'claims-denials',
    title: 'Claims & Denials',
    icon: Receipt,
    badgeText: 'Joy navigating portals',
    badgeColor: 'bg-[#02007F]',
    BadgeIcon: AnimatedMouse,
  },
  {
    id: 'retrieving-data',
    title: 'Retrieving Data',
    icon: MoreHorizontal,
    badgeText: 'Joy summarising the data',
    badgeColor: 'bg-[#10B981]',
    BadgeIcon: AnimatedEye,
  },
];

// Helper to calculate exact path coordinates for the data flow line
const CARD_WIDTH = 160;
const GAP = 50;
const START_OFFSET = 80;

function getCenterX(index: number) {
  return START_OFFSET + index * (CARD_WIDTH + GAP);
}

export function RCMWorkflowAnimation() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
      setActiveIndex(0);
    }, 1500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => (prev >= workflows.length ? 0 : prev + 1));
      }, activeIndex >= workflows.length ? 3000 : 5000); // 3s pause at end before restart, 5s per step
      return () => clearTimeout(timer);
    }
  }, [activeIndex, started]);

  const isTerminal = activeIndex >= workflows.length;

  // Path string for the alternating bridge
  const bridgePathStr = `
    M ${getCenterX(0)} 200
    L ${getCenterX(0)} 60 Q ${getCenterX(0)} 40, ${getCenterX(0) + 20} 40
    L ${getCenterX(1) - 20} 40 Q ${getCenterX(1)} 40, ${getCenterX(1)} 60
    L ${getCenterX(1)} 200
    
    M ${getCenterX(1)} 200
    L ${getCenterX(1)} 340 Q ${getCenterX(1)} 360, ${getCenterX(1) + 20} 360
    L ${getCenterX(2) - 20} 360 Q ${getCenterX(2)} 360, ${getCenterX(2)} 340
    L ${getCenterX(2)} 200
    
    M ${getCenterX(2)} 200
    L ${getCenterX(2)} 60 Q ${getCenterX(2)} 40, ${getCenterX(2) + 20} 40
    L ${getCenterX(3) - 20} 40 Q ${getCenterX(3)} 40, ${getCenterX(3)} 60
    L ${getCenterX(3)} 200
    
    M ${getCenterX(3)} 200
    L ${getCenterX(3)} 340 Q ${getCenterX(3)} 360, ${getCenterX(3) + 20} 360
    L ${getCenterX(4) - 20} 360 Q ${getCenterX(4)} 360, ${getCenterX(4)} 340
    L ${getCenterX(4)} 200
  `;

  // Dynamic offset path for active segment
  const getActiveSegmentPath = (index: number) => {
    if (index === 0) return `path('M ${getCenterX(0)} 200 L ${getCenterX(0)} 60 Q ${getCenterX(0)} 40, ${getCenterX(0) + 20} 40 L ${getCenterX(1) - 20} 40 Q ${getCenterX(1)} 40, ${getCenterX(1)} 60 L ${getCenterX(1)} 200')`;
    if (index === 1) return `path('M ${getCenterX(1)} 200 L ${getCenterX(1)} 340 Q ${getCenterX(1)} 360, ${getCenterX(1) + 20} 360 L ${getCenterX(2) - 20} 360 Q ${getCenterX(2)} 360, ${getCenterX(2)} 340 L ${getCenterX(2)} 200')`;
    if (index === 2) return `path('M ${getCenterX(2)} 200 L ${getCenterX(2)} 60 Q ${getCenterX(2)} 40, ${getCenterX(2) + 20} 40 L ${getCenterX(3) - 20} 40 Q ${getCenterX(3)} 40, ${getCenterX(3)} 60 L ${getCenterX(3)} 200')`;
    if (index === 3) return `path('M ${getCenterX(3)} 200 L ${getCenterX(3)} 340 Q ${getCenterX(3)} 360, ${getCenterX(3) + 20} 360 L ${getCenterX(4) - 20} 360 Q ${getCenterX(4)} 360, ${getCenterX(4)} 340 L ${getCenterX(4)} 200')`;
    return '';
  };

  return (
    <section className="relative w-full bg-[#06003F] py-12 md:py-16 overflow-hidden flex flex-col items-center">
      {/* Workspace Background Dots */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Orbital / Space Decorative Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] border-dashed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/[0.03] border-dashed pointer-events-none" />

      {/* Decorative Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#6366F1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EC4899]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="w-[1000px] relative mx-auto h-[480px]">
          
          {/* Dashed Orbital Bridge Connecting Cards */}
          <div className="absolute top-0 left-0 w-full h-[400px] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 400" style={{ overflow: 'visible' }}>
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8B5CF6" floodOpacity="0.4" />
                </filter>
              </defs>
              <path
                d={bridgePathStr}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Data Flow Line SVG */}
          <div className="absolute top-0 left-0 w-full h-[400px] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 400" style={{ overflow: 'visible' }}></svg>

            {/* Animated Dots along the line */}
            <AnimatePresence>
              {activeIndex > 0 && activeIndex <= 4 && (
                <motion.div
                  key={`flow-dots-${activeIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`dot-${i}`}
                      style={{
                        offsetPath: getActiveSegmentPath(activeIndex - 1),
                        position: 'absolute',
                        top: -3,
                        left: -3,
                        width: 6,
                        height: 6,
                        backgroundColor: '#FFFFFF',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(139,92,246,0.6)'
                      }}
                      animate={{ offsetDistance: ['0%', '100%'] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.8,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cards Row */}
          <div className="absolute top-0 left-0 w-full h-[400px] flex flex-row items-start justify-start gap-[50px] z-10 pt-[120px] mx-[0px] mt-[0px] mb-[-28px]">
          {workflows.map((workflow, index) => {
            const isActive = activeIndex === index;
            const isCompleted = activeIndex > index || isTerminal;
            const Icon = workflow.icon;
            
            const chipPositions = [
              '-top-5 left-1/2 -translate-x-1/2',
              'top-1/2 -left-5 -translate-y-1/2',
              '-top-5 -right-4',
              '-top-5 -left-4',
              '-bottom-5 right-4'
            ];
            const iconColors = [
              'text-[#F43F5E]',
              'text-[#3B82F6]',
              'text-[#10B981]',
              'text-[#8B5CF6]',
              'text-[#F59E0B]'
            ];

            return (
              <motion.div
                key={workflow.id}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Floating Icon Chip */}
                <div 
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 w-[52px] h-[52px] bg-[#1E0B36]/60 backdrop-blur-xl border border-white/10 rounded-[16px] flex items-center justify-center z-30`}
                  style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)' }}
                >
                  <Icon className={`w-[26px] h-[26px] text-white`} strokeWidth={1.5} />
                </div>

                {/* Card Main Body */}
                <div 
                  className="w-[160px] h-[160px] bg-white/[0.03] backdrop-blur-xl rounded-[32px] flex items-center justify-center relative border border-white/10"
                  style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)' }}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isActive ? 0.95 : 1, 
                      opacity: isActive ? 0 : 1 
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    {index === workflows.length - 1 && activeIndex > index ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3">
                          <Check className="w-5 h-5 text-[#00C853]" strokeWidth={2.5} />
                        </div>
                        <span className="text-white/90 text-[14px] font-bold text-center leading-[1.2]">
                          Claims<br/>settled
                        </span>
                      </motion.div>
                    ) : (
                      <span className="text-white text-[16px] font-medium text-center tracking-wide leading-snug px-1">
                        {workflow.title}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Below Card UI (Checkmark or Badge) */}
                <div className="h-[40px] flex items-start justify-center relative w-full mt-4">
                  <AnimatePresence mode="wait">
                    {isCompleted && (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', bounce: 0.4 }}
                        className="w-8 h-8 bg-[#00C853] rounded-full flex items-center justify-center shadow-sm"
                      >
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </motion.div>
                    )}

                    {isActive && index >= 1 && index <= 3 ? (
                      <motion.div
                        key="stacked-badges"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                        className="absolute top-0 flex flex-col gap-2 items-start z-30"
                      >
                        {stackedStates.map((state, i) => (
                          <motion.div
                            key={`stack-${i}`}
                            initial={{ opacity: 0, scale: 0.9, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0, transition: { delay: 1.5 + i * 0.8, duration: 0.4, ease: "easeOut" } }}
                            className={`px-5 py-3 rounded-2xl flex items-center gap-3 text-white/90 text-[14px] font-light whitespace-nowrap backdrop-blur-xl border border-white/10`}
                            style={{ 
                              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                              backgroundColor: 'rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            <div className="text-white/70">
                              <state.Icon />
                            </div>
                            <span className="tracking-wide">{state.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : isActive && workflow.badgeText ? (
                      <motion.div
                        key="badge"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: index === 0 ? 0.5 : 1.5 } }}
                        exit={{ y: 10, opacity: 0, transition: { duration: 0.2 } }}
                        className={`absolute top-0 px-5 py-3 rounded-2xl flex items-center gap-3 text-white/90 text-[14px] font-light whitespace-nowrap z-30 backdrop-blur-xl border border-white/10`}
                        style={{ 
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)'
                        }}
                      >
                        <div className="text-white/70">
                          {workflow.BadgeIcon && <workflow.BadgeIcon />}
                        </div>
                        <span className="tracking-wide">{workflow.badgeText}</span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Moving Orb */}
        <AnimatePresence>
          {activeIndex >= 0 && activeIndex < workflows.length && (
            <motion.div
              key="global-orb"
              className="absolute z-[100] pointer-events-none flex flex-col items-center justify-center rounded-full"
              style={{
                top: 0,
                left: 0,
                width: 80,
                height: 80,
                marginLeft: -40,
                marginTop: -40,
              }}
              initial={{ x: getCenterX(0), y: 200, opacity: 0, scale: 0.8 }}
              animate={{
                x: activeIndex > 0 ? [getCenterX(activeIndex - 1), getCenterX(activeIndex - 1), getCenterX(activeIndex), getCenterX(activeIndex)] : [getCenterX(0), getCenterX(0), getCenterX(0), getCenterX(0)],
                y: activeIndex > 0 ? [200, activeIndex % 2 === 1 ? 40 : 360, activeIndex % 2 === 1 ? 40 : 360, 200] : [200, 200, 200, 200],
                opacity: 1,
                scale: 1,
                transition: { duration: 1.5, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 33px, transparent 34px)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 33px, transparent 34px)',
                  transform: 'translateZ(0)',
                  overflow: 'hidden'
                }}
              >
                {/* Gradient Background Layers */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.div className="absolute inset-0" animate={{ opacity: activeIndex === 0 ? 1 : 0 }} transition={{ duration: 1.5 }}><Ellipse37 /></motion.div>
                  <motion.div className="absolute inset-0" animate={{ opacity: activeIndex === 1 ? 1 : 0 }} transition={{ duration: 1.5 }}><Ellipse38 /></motion.div>
                  <motion.div className="absolute inset-0" animate={{ opacity: activeIndex === 2 ? 1 : 0 }} transition={{ duration: 1.5 }}><Ellipse39 /></motion.div>
                  <motion.div className="absolute inset-0" animate={{ opacity: activeIndex === 3 ? 1 : 0 }} transition={{ duration: 1.5 }}><Ellipse40 /></motion.div>
                  <motion.div className="absolute inset-0" animate={{ opacity: activeIndex === 4 ? 1 : 0 }} transition={{ duration: 1.5 }}><Ellipse41 /></motion.div>
                </div>

                {/* Rotating Video */}
                <motion.video
                  src={assets.home.orbVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute max-w-none"
                  animate={{
                    rotate: activeIndex === 0 ? 0 : activeIndex === 1 ? 90 : activeIndex === 2 ? 180 : activeIndex === 3 ? 270 : 360
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{
                    width: '160px',
                    height: '160px',
                    objectFit: 'cover',
                    opacity: 1,
                    mixBlendMode: 'luminosity',
                    filter: 'brightness(1.5) contrast(1.2)',
                    willChange: 'transform'
                  }}
                />
              </div>
              <div className="absolute -bottom-6 bg-[#1E0B36]/80 backdrop-blur-md border border-white/20 text-white text-[12px] px-3 py-1 rounded-full font-bold shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)] z-50">
                Joy
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
