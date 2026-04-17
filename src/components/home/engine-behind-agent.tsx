"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code, Globe, Printer, MessageSquare, FileText, Terminal } from 'lucide-react';
import { assets } from "@/lib/assets";
import orbGradient from "@/assets/68e564fc051151a61f78ecc6d8f02de5033ed42b.png";

// Animated Soundwave Icon for the orb badge
const AnimatedSoundwave = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <motion.rect x="3" y="8" width="2" height="8" rx="1" animate={{ height: [8, 16, 8], y: [8, 4, 8] }} transition={{ duration: 1, repeat: Infinity }} />
    <motion.rect x="8" y="4" width="2" height="16" rx="1" animate={{ height: [16, 6, 16], y: [4, 9, 4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
    <motion.rect x="13" y="6" width="2" height="12" rx="1" animate={{ height: [12, 20, 12], y: [6, 2, 6] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
    <motion.rect x="18" y="9" width="2" height="6" rx="1" animate={{ height: [6, 14, 6], y: [9, 5, 9] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
  </svg>
);

// Static Soundwave Icon for the grid card
const StaticSoundwave = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <rect x="3" y="8" width="2" height="8" rx="1" />
    <rect x="8" y="4" width="2" height="16" rx="1" />
    <rect x="13" y="6" width="2" height="12" rx="1" />
    <rect x="18" y="9" width="2" height="6" rx="1" />
  </svg>
);

type AnimationPhase = 'api' | 'talking' | 'fax' | 'portal';

const CHAT_MSGS = [
  { id: 'm1', type: 'joy', text: "Hi, I'm calling to verify benefits for a patient." },
  { id: 'm2', type: 'payer', text: "Sure, I can help with that." },
];

const API_CODE = [
  'import requests',
  '',
  'response = requests.post(',
  '  "https://api.payer.com/verify",',
  '  json={"member_id": "12345"}',
  ')',
  '',
  'print("✔ Connected")'
];

export function EngineBehindAgent() {
  const [phase, setPhase] = useState<AnimationPhase>('api');
  const [msgIndex, setMsgIndex] = useState(0);
  const [codeLines, setCodeLines] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (phase) {
      case 'api':
        timeout = setTimeout(() => setPhase('talking'), 3000);
        break;
      case 'talking':
        if (msgIndex < CHAT_MSGS.length) {
          timeout = setTimeout(() => setMsgIndex(prev => prev + 1), 1500);
        } else {
          timeout = setTimeout(() => {
            setPhase('fax');
            setMsgIndex(0);
          }, 2000);
        }
        break;
      case 'fax':
        timeout = setTimeout(() => setPhase('portal'), 2500);
        break;
      case 'portal':
        timeout = setTimeout(() => {
          setPhase('api');
          setMsgIndex(0);
        }, 2500);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, msgIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'api') {
      interval = setInterval(() => {
        setCodeLines(v => Math.min(v + 1, API_CODE.length));
      }, 100);
    } else {
      queueMicrotask(() => setCodeLines(0));
    }
    return () => clearInterval(interval);
  }, [phase]);

  const cards = [
    {
      icon: Code,
      text: "API : For complex payer phone lines",
    },
    {
      icon: StaticSoundwave,
      text: "Voice : For complex payer phone lines",
    },
    {
      icon: Globe,
      text: "Web API : For instantaneous portal navigation",
    },
    {
      icon: Printer,
      text: "Fax : For legacy documentation requirements",
    }
  ];

  return (
    <section className="w-full bg-[#06003F] py-24 md:py-32 px-6 lg:px-12 overflow-hidden border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column */}
        <div className="flex flex-col relative w-full items-start justify-start">
          <h2 className="text-white text-[32px] md:text-[44px] leading-[1.2] font-light tracking-wide mb-16 lg:mb-24">The Engine<br />Behind the Agent</h2>

          <div className="relative self-center lg:self-start lg:ml-12 mt-4 lg:mt-0 z-10">
            {/* The Orb - Fixed Size Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glowing background behind orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF3300] rounded-full filter blur-[80px] opacity-20 pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#02007F] rounded-full filter blur-[80px] opacity-40 pointer-events-none z-0" />

                {/* Masked Orb Container */}
                <div
                  className="relative w-full h-full flex items-center justify-center z-10"
                  style={{
                    maskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
                    transform: 'translateZ(0)',
                    background: `url(${orbGradient}) center / cover no-repeat`
                  }}
                >
                  {/* Static video orb */}
                  <video
                    src={assets.home.orbVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-w-none"
                    style={{
                      width: '125%',
                      height: '125%',
                      objectFit: 'cover',
                      mixBlendMode: 'luminosity',
                      filter: 'brightness(1.5) contrast(1.2)'
                    }}
                  />
                </div>
              </div>

              {/* Glassmorphic Badge Overlaid - Bottom Left */}
              <motion.div
                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-20 backdrop-blur-sm border border-white/5 ml-[34px] mr-[0px] mt-[0px] mb-[35px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.02)'
                }}
                initial={{ opacity: 0, x: -20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <div className="scale-75 md:scale-100">
                  <div className="relative w-6 h-6 flex items-center justify-center scale-[1.35]">
                    <AnimatePresence mode="wait">
                      {phase === 'api' && (
                        <motion.div key="api" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-white">
                          <Terminal size={20} strokeWidth={1.5} />
                        </motion.div>
                      )}
                      {phase === 'talking' && (
                        <motion.div key="talk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-white">
                          <AnimatedSoundwave />
                        </motion.div>
                      )}
                      {phase === 'fax' && (
                        <motion.div key="fax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-white">
                          <FileText size={20} strokeWidth={1.5} />
                        </motion.div>
                      )}
                      {phase === 'portal' && (
                        <motion.div key="portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center text-white">
                          <Globe size={20} strokeWidth={1.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Overlaid Animations on the Orb */}
              <div className="absolute top-[15%] left-[25%] md:top-[20%] md:left-[40%] w-[280px] md:w-[400px] flex items-center justify-start z-15 pointer-events-none">
            <AnimatePresence mode="wait">
              {/* API Phase - Code Running */}
              {phase === 'api' && (
                <motion.div
                  key="content-api"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col w-full h-[280px] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden font-mono text-[11px] md:text-xs"
                >
                  {/* Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-white/40 text-xs ml-2 font-sans tracking-wide">api_call.py</span>
                  </div>

                  {/* Code Content */}
                  <div className="p-4 flex-1 relative flex flex-col overflow-hidden">
                    <div className="flex flex-col gap-1 w-full justify-end min-h-full">
                      {API_CODE.slice(0, codeLines).map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`whitespace-pre-wrap leading-relaxed ${
                            line.includes('✔') ? 'text-green-400' :
                            line.includes('import') ? 'text-[#B48EAD]' :
                            line.includes('requests') || line.includes('print') ? 'text-[#88C0D0]' :
                            line.includes('"') ? 'text-[#A3BE8C]' : 'text-[#D8DEE9]'
                          }`}
                        >
                          {line || " "}
                        </motion.div>
                      ))}
                      {codeLines < API_CODE.length && (
                        <motion.div
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-[1em] bg-[#88C0D0]/80 mt-1 inline-block"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Talking Phase - Chat Bubbles */}
              {phase === 'talking' && (
                <motion.div
                  key="content-talking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-2.5 w-full justify-center pb-4 px-2"
                >
                  <AnimatePresence mode="popLayout">
                    {CHAT_MSGS.slice(0, msgIndex).map((msg, idx) => {
                      const isJoy = msg.type === 'joy';
                      return (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                          className={`w-full flex flex-col ${isJoy ? 'items-start' : 'items-end'}`}
                        >
                          <div className={`
                            max-w-[90%] px-5 py-3 text-[13px] md:text-[14px] font-normal font-['Satoshi'] leading-relaxed shadow-lg
                            ${isJoy
                              ? 'bg-white/10 backdrop-blur-xl text-white rounded-[20px] rounded-bl-sm border border-white/10'
                              : 'bg-[#4A3AFF]/60 backdrop-blur-xl text-white rounded-[20px] rounded-br-sm border border-[#4A3AFF]/40'
                            }
                          `}>
                            {msg.text}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Fax Phase - Document Scanning */}
              {phase === 'fax' && (
                <motion.div
                  key="content-fax"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-full"
                >
                  <div className="relative w-48 h-64 bg-[#ffffff]/5 rounded-lg border border-white/20 overflow-hidden flex flex-col p-5 shadow-2xl backdrop-blur-md">
                    {/* Document Lines */}
                    <div className="space-y-4 w-full h-full relative z-0">
                      <div className="flex justify-between items-center mb-6">
                        <div className="h-3 w-1/3 bg-white/30 rounded"></div>
                        <div className="h-3 w-1/4 bg-white/20 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-white/20 rounded"></div>
                      <div className="h-2 w-5/6 bg-white/20 rounded"></div>
                      <div className="h-2 w-full bg-white/20 rounded"></div>
                      <div className="h-2 w-4/6 bg-white/20 rounded"></div>
                      <div className="h-2 w-full bg-white/20 rounded mt-8"></div>
                      <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                    </div>

                    {/* Laser Scanner */}
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-[#33FF37] shadow-[0_0_15px_3px_rgba(51,255,55,0.6)] z-10"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Scan effect */}
                    <motion.div
                      className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#33FF37]/10 to-transparent z-0 pointer-events-none"
                      animate={{ top: ['-30%', '100%', '-30%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Portal Phase - Web Navigation */}
              {phase === 'portal' && (
                <motion.div
                  key="content-portal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-full"
                >
                  <div className="w-full max-w-sm h-64 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl">
                    {/* Browser Header */}
                    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-3 gap-2 shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="ml-2 flex-1 h-6 bg-white/5 rounded-md border border-white/5 flex items-center px-2">
                        <Globe size={12} className="text-white/40 mr-2" />
                        <span className="text-[10px] text-white/50 font-mono tracking-wide">payer-portal.com</span>
                      </div>
                    </div>

                    {/* Browser Body */}
                    <div className="p-4 flex-1 flex flex-col gap-4 relative overflow-hidden">
                      <div className="flex gap-4 items-center mb-2">
                        <motion.div
                          className="w-10 h-10 rounded bg-white/10"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <div className="space-y-2 flex-1">
                          <motion.div className="h-3 w-1/3 bg-white/20 rounded" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} />
                          <motion.div className="h-2 w-1/2 bg-white/10 rounded" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.1, repeat: Infinity }} />
                        <motion.div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }} />
                      </div>

                      {/* Mouse Pointer */}
                      <motion.div
                        className="absolute z-20 drop-shadow-lg pointer-events-none"
                        initial={{ x: 150, y: 150, opacity: 0 }}
                        animate={{
                          x: [150, 40, 40, 180, 180],
                          y: [150, 60, 60, 160, 160],
                          scale: [1, 1, 0.85, 1, 0.85],
                          opacity: [0, 1, 1, 1, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          times: [0, 0.3, 0.4, 0.7, 0.8]
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="white" stroke="rgba(0,0,0,0.5)" strokeWidth="1" className="w-5 h-5">
                          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L5.5 3.21z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-start max-w-[500px] mx-auto lg:mx-0 w-full pt-10 lg:pt-0">
          <motion.p
            className="text-[#EFEBF2] text-[15px] md:text-[16px] leading-[1.7] font-light mx-[0px] mt-[23px] mb-[48px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Joy : The reasoning engine that powers our autonomous workforce. Joy doesn&apos;t just &apos;process&apos; data; she navigates the nuance of payer logic using the most efficient modality available :
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mx-[0px] mt-[91px] mb-[0px]">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-transparent border border-white/10 rounded-[2px] p-6 md:p-8 flex flex-col gap-6 hover:bg-white/[0.02] transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                >
                  <div className="text-[#EFEBF2]/80">
                    {typeof Icon === 'function' && Icon.name === 'StaticSoundwave' ? (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Icon />
                      </div>
                    ) : (
                      <Icon size={20} strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-[#EFEBF2] text-[14px] font-light leading-snug">
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}