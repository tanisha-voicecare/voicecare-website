"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { Check, CheckCircle, Database, FileText, Globe, MessageSquare, ShieldCheck, User, Terminal } from 'lucide-react';
import Ellipse40 from "./ellipses/ellipse-40";

import { assets } from "@/lib/assets";
const ehrLogos = assets.landing.logos.ehr;

type Phase = 'calendar' | 'ehr' | 'api' | 'call' | 'fax' | 'portal' | 'summarizing' | 'captured';

const API_CODE_LINES = [
  'print("Interacting with payer API...")',
  '',
  'response = api.call(',
  '    endpoint="/claims/status",',
  '    data={',
  '        "claim_id": "CLM-458921",',
  '        "provider_id": "PRV-102938"',
  '    }',
  ')',
  '',
  'print("Response received ✔")',
  '',
  'import requests',
  '',
  'print("Interacting with payer API...")',
  '',
  'response = requests.post(',
  '    "https://api.payerconnect.com/v1/claims/check",',
  '    json={',
  '        "claim_id": "CLM-458921"',
  '    }',
  ')',
  '',
  'if response.status_code == 200:',
  '    print("✔ Claim status retrieved: PAID")',
  'else:',
  '    print("✖ API request failed")',
  '',
  'log("Connecting to payer system...")',
  'log("Authenticating...")',
  'log("Interacting with payer API...")',
  '',
  'result = agent.execute("check_claim", claim_id="CLM-458921")',
  '',
  'log("Parsing response...")',
  'log("✔ Claim verified successfully")'
];

const CALL_MSGS = [
  { id: 'c1', type: 'joy', text: "Hi, I’m calling to check the status of a claim. Claim ID is CLM-458921." },
  { id: 'c2', type: 'payer', text: "The claim has been processed and paid." },
  { id: 'c3', type: 'joy', text: "Thank you. Could you fax the payment details to 555-123-4567?" },
  { id: 'c4', type: 'payer', text: "Sure, I’ll send it shortly." }
];

const DATA_POINTS = [
  "Claim ID: CLM-458921",
  "Status: Paid",
  "Paid Amount: $1,250",
  "Payment Date: 04/10/2026"
];

export function ClaimsAndDenialsVisualization() {
  const [phase, setPhase] = useState<Phase>('calendar');
  const [msgIndex, setMsgIndex] = useState(0);
  const [apiLines, setApiLines] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (phase) {
      case 'calendar':
        queueMicrotask(() => setCycleCount(c => c + 1));
        timeout = setTimeout(() => setPhase('api'), 4000);
        break;
      case 'api':
        timeout = setTimeout(() => setPhase('call'), 3000);
        break;
      case 'call':
        if (msgIndex < CALL_MSGS.length) {
          timeout = setTimeout(() => setMsgIndex(prev => prev + 1), 2200);
        } else {
          timeout = setTimeout(() => {
            setPhase('fax');
            setMsgIndex(0);
          }, 3000);
        }
        break;
      case 'fax':
        timeout = setTimeout(() => setPhase('portal'), 2500);
        break;
      case 'portal':
        timeout = setTimeout(() => setPhase('summarizing'), 2500);
        break;
      case 'summarizing':
        timeout = setTimeout(() => setPhase('captured'), 2500);
        break;
      case 'captured':
        timeout = setTimeout(() => setPhase('calendar'), 6000);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, msgIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'api') {
      interval = setInterval(() => {
        setApiLines(v => Math.min(v + 1, API_CODE_LINES.length));
      }, 75); // fast typing effect
    } else {
      queueMicrotask(() => setApiLines(0));
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Calendar dates logic
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  // Padding for start of April 2026 (Wednesday)
  const padding = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="w-full flex flex-col items-center justify-center relative h-full py-2 px-2 max-w-[1200px] mx-auto min-h-[500px]">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: CALENDAR & EHR */}
        {phase === 'calendar' && (
          <motion.div
            key="phase-calendar-ehr"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center gap-10 w-full max-w-2xl"
          >
            {/* Calendar */}
            <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-3xl shadow-2xl shrink-0 w-full max-w-[280px]">
              <h3 className="text-white/90 text-lg font-medium mb-4 font-['Satoshi']">April 2026</h3>
              <div className="grid grid-cols-7 gap-1.5 mb-2 w-full text-white/50 text-xs font-['Satoshi'] text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="w-8 mx-auto">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5 w-full text-center text-white/90 font-['Satoshi'] text-sm">
                {padding.map(i => <div key={`pad-${i}`} className="w-8 h-8 mx-auto" />)}
                {days.map(d => {
                  const isSelected = d >= 18 && d <= 27;
                  const isStart = d === 18;
                  const isEnd = d === 27;
                  const isMiddle = d > 18 && d < 27;
                  
                  let delay = 0;
                  if (isStart) delay = 0.2;
                  else if (isEnd) delay = 0.8;
                  else if (isMiddle) delay = 1.2 + (d - 19) * 0.05;

                  return (
                    <motion.div
                      key={d}
                      initial={{
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        scale: 1,
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                      animate={{
                        backgroundColor: isStart || isEnd ? 'rgba(74, 58, 255, 0.9)' : (isMiddle ? 'rgba(74, 58, 255, 0.4)' : 'rgba(255, 255, 255, 0)'),
                        scale: isStart || isEnd ? 1.1 : (isMiddle ? 1.05 : 1),
                        borderColor: isStart || isEnd ? 'rgba(74, 58, 255, 0.9)' : (isMiddle ? 'rgba(74, 58, 255, 0)' : 'rgba(255, 255, 255, 0.05)'),
                        color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)'
                      }}
                      transition={{ duration: 0.4, delay }}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/5 transition-colors mx-auto"
                    >
                      {d}
                    </motion.div>
                  );
                })}
              </div>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }}
                className="mt-4 text-[#FF4E3A] font-medium tracking-wide text-xs uppercase"
              >
                Selecting Dates...
              </motion.p>
            </div>

            {/* EHR Data Retrieval */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-full max-w-[600px]"
            >
              <div className="flex flex-col items-center gap-6">
                <Database size={40} className="text-white" strokeWidth={1.5} />
                <h3 className="text-white text-xl font-light font-['Satoshi'] tracking-wide text-center">
                  Retrieving data through EHR
                </h3>

                <div className="w-full relative">
                  <div className="overflow-hidden">
                    <Marquee key={`marquee-${cycleCount}`} speed={40} gradient={false} loop={0} pauseOnHover={false}>
                      {[...ehrLogos, ...ehrLogos, ...ehrLogos].map((logo, i) => (
                        <div
                          key={`logo-${i}`}
                          className="mx-3 h-14 w-36 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-2.5"
                        >
                          <img
                            src={logo}
                            alt={`EHR System`}
                            className="max-w-full max-h-full object-contain brightness-0 invert"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>
                      ))}
                    </Marquee>
                  </div>

                  {/* Edge fades */}
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#02007F] to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#02007F] to-transparent pointer-events-none" />
                </div>

                <p className="text-white/40 text-sm font-['Satoshi']">
                  ...and many more.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* PHASES 3-8: ORB & CONTENT LAYOUT */}
        {['api', 'call', 'fax', 'portal', 'summarizing', 'captured'].includes(phase) && (
          <motion.div
            key="phase-orb-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-8 h-full relative"
          >
            {/* Left Side: Orb */}
            <div className="relative flex flex-col justify-center items-center shrink-0 w-[100px] md:w-[120px] xl:w-[160px]">
              <motion.div
                className="relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] xl:w-[150px] xl:h-[150px] z-10"
                initial={{ scale: 0.9 }}
                animate={{ scale: phase === 'captured' ? 0.85 : 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Glowing layers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#FF4E3A] rounded-full filter blur-[40px] opacity-40 mix-blend-screen pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#02007F] rounded-full filter blur-[50px] opacity-60 mix-blend-screen pointer-events-none" />

                {/* Masked Orb */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    maskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 49.5%, transparent 50%)',
                    transform: 'translateZ(0)',
                    overflow: 'hidden'
                  }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Ellipse40 />
                  </div>
                  <video
                    ref={videoRef}
                    src={assets.home.orbVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute max-w-none top-1/2 left-1/2"
                    style={{
                      width: '125%',
                      height: '125%',
                      objectFit: 'cover',
                      willChange: 'transform',
                      mixBlendMode: 'luminosity',
                      transform: 'translate(-50%, -50%) rotate(270deg)'
                    }}
                  />
                </div>

                {/* Overlapping Badges */}
                <motion.div
                  className="absolute bottom-0 right-0 md:-bottom-2 md:-right-2 xl:-bottom-1 xl:-right-1 z-20"
                  layout
                >
                  {phase === 'captured' ? (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] xl:w-[50px] xl:h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#33FF37] to-[#2FD923] shadow-[0_4px_20px_rgba(51,255,55,0.4)] border border-white/20 mb-2 mr-2 md:mb-3 md:mr-3 xl:mb-4 xl:mr-4"
                    >
                      <Check size={24} className="text-white" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <div
                      className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] mb-2 mr-2 md:mb-3 md:mr-3 xl:mb-4 xl:mr-4"
                      style={{ background: 'linear-gradient(135deg, rgba(6,0,63,0.6) 0%, rgba(2,0,127,0.6) 100%)' }}
                    >
                      <div className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center scale-[1]">
                        <AnimatePresence mode="wait">
                          {phase === 'api' && (
                            <motion.div key="api" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Terminal size={16} className="text-white" />
                            </motion.div>
                          )}
                          {phase === 'call' && (
                            <motion.div key="call" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center text-white">
                              <motion.div
                                animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1] }}
                                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                                style={{ transformOrigin: 'center' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                  <rect x="2" y="5" width="2" height="6" rx="1" />
                                  <rect x="6" y="2" width="2" height="12" rx="1" />
                                  <rect x="10" y="4" width="2" height="8" rx="1" />
                                  <rect x="14" y="6" width="2" height="4" rx="1" />
                                </svg>
                              </motion.div>
                            </motion.div>
                          )}
                          {phase === 'fax' && (
                            <motion.div key="fax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <FileText size={16} className="text-white" />
                            </motion.div>
                          )}
                          {phase === 'portal' && (
                            <motion.div key="portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Globe size={16} className="text-white" />
                            </motion.div>
                          )}
                          {phase === 'summarizing' && (
                            <motion.div key="sum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Database size={16} className="text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* State Text below Orb */}
              <motion.div className="mt-2 text-center flex flex-col items-center justify-center w-[180px] xl:w-[240px] z-20 h-[40px]">
                <AnimatePresence mode="wait">
                  {phase === 'api' && <motion.span key="api" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Joy interacting with the API</motion.span>}
                  {phase === 'call' && <motion.span key="call" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Joy talking to payer</motion.span>}
                  {phase === 'fax' && <motion.span key="fax" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Joy reading Faxes</motion.span>}
                  {phase === 'portal' && <motion.span key="portal" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Joy navigating through portals</motion.span>}
                  {phase === 'summarizing' && <motion.span key="sum" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Joy summarizing data</motion.span>}
                  {phase === 'captured' && <motion.span key="cap" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="-mt-2 text-white/90 text-[14px] md:text-[16px] leading-tight font-normal font-['Satoshi']">Claim Status Captured</motion.span>}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Side: Content Area */}
            <div className="flex-1 w-full min-w-[280px] h-full relative flex flex-col justify-center py-4">
              <AnimatePresence mode="wait">
                
                {/* API Phase - Code Running */}
                {phase === 'api' && (
                  <motion.div
                    key="content-api"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col w-full h-[320px] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden font-mono text-[11px] md:text-xs xl:text-sm"
                  >
                    {/* Fake Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-white/40 text-xs ml-2 font-sans tracking-wide">payer_api_interaction.py</span>
                    </div>
                    
                    {/* Code Content */}
                    <div 
                      className="p-4 flex-1 relative flex flex-col overflow-hidden" 
                      style={{ 
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)', 
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)' 
                      }}
                    >
                      <div className="flex flex-col gap-1 w-full justify-end min-h-full">
                        {API_CODE_LINES.slice(0, apiLines).map((line, i) => {
                          const isString = line.includes('"') || line.includes("'");
                          const isKeyword = line.includes('import ') || line.includes('if ') || line.includes('else:');
                          const isFunc = line.includes('print(') || line.includes('log(') || line.includes('.post(') || line.includes('.call(') || line.includes('.execute(');
                          const isError = line.includes('✖');
                          const isSuccess = line.includes('✔');

                          let colorClass = "text-[#D8DEE9]"; // default var color
                          if (isError) colorClass = "text-red-400";
                          else if (isSuccess) colorClass = "text-green-400";
                          else if (isKeyword) colorClass = "text-[#B48EAD]";
                          else if (isFunc) colorClass = "text-[#88C0D0]";
                          else if (isString) colorClass = "text-[#A3BE8C]";
                          else if (line.includes('=')) colorClass = "text-white/90";
                          
                          return (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}
                            >
                              {line || " "}
                            </motion.div>
                          );
                        })}
                        {/* Blinking Cursor */}
                        {apiLines < API_CODE_LINES.length && (
                          <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-[1em] bg-[#88C0D0]/80 mt-1 inline-block shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Call Phase - Chat Bubbles */}
                {phase === 'call' && (
                  <motion.div
                    key="content-call"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2.5 w-full justify-center h-full pb-4 px-2"
                  >
                    <AnimatePresence mode="popLayout">
                      {CALL_MSGS.slice(Math.max(0, msgIndex - 3), msgIndex).map((msg, idx, arr) => {
                        const isJoy = msg.type === 'joy';
                        const showName = idx === 0 || arr[idx - 1]?.type !== msg.type;
                        
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
                            {showName && (
                              <span className={`text-[11px] text-white/50 mb-1 ${isJoy ? 'ml-1' : 'mr-1'} font-medium tracking-wide uppercase font-['Satoshi']`}>
                                {isJoy ? 'Joy' : 'Payer'}
                              </span>
                            )}
                            <div className={`
                              max-w-[100%] xl:max-w-[90%] px-5 py-3 md:py-3.5 text-[13px] md:text-[14px] font-normal font-['Satoshi'] leading-relaxed shadow-lg
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
                    className="flex flex-col items-center justify-center h-full w-full relative"
                  >
                    <div className="relative w-48 xl:w-56 h-64 xl:h-72 bg-[#ffffff]/5 rounded-lg border border-white/20 overflow-hidden flex flex-col p-5 shadow-2xl backdrop-blur-md z-10">
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
                        <div className="h-2 w-5/6 bg-white/20 rounded"></div>
                      </div>
                      
                      {/* Laser Scanner */}
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-[#33FF37] shadow-[0_0_15px_3px_rgba(51,255,55,0.6)] z-10"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      
                      {/* Overlay Gradient for scan effect */}
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
                    className="flex items-center justify-center h-full w-full"
                  >
                    <div className="w-full max-w-sm h-64 xl:h-72 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl">
                      {/* Browser Header */}
                      <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-3 gap-2 shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="ml-2 flex-1 h-6 bg-white/5 rounded-md border border-white/5 flex items-center px-2">
                          <Globe size={12} className="text-white/40 mr-2" />
                          <span className="text-[10px] text-white/50 font-mono tracking-wide">payer-portal.com/auth</span>
                        </div>
                      </div>
                      
                      {/* Browser Body */}
                      <div className="p-4 flex-1 flex flex-col gap-4 relative overflow-hidden">
                        {/* Fake UI Elements loading */}
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
                          <motion.div className="h-10 xl:h-12 w-full bg-white/5 border border-white/10 rounded-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.1, repeat: Infinity }} />
                          <motion.div className="h-10 xl:h-12 w-full bg-white/5 border border-white/10 rounded-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }} />
                          <motion.div className="h-10 xl:h-12 w-full bg-white/5 border border-white/10 rounded-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />
                        </div>

                        {/* Mouse Pointer Simulation */}
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

                {/* Transition States (Summarizing) */}
                {phase === 'summarizing' && (
                  <motion.div
                    key="content-processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full w-full"
                  >
                    {/* Abstract processing visualization */}
                    <div className="w-full max-w-md space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, width: "0%" }}
                          animate={{ opacity: 0.5, width: "100%" }}
                          transition={{ 
                            duration: 1.5, 
                            delay: i * 0.2, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                          }}
                          className="h-3 bg-white/20 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Captured Phase - Data Stack */}
                {phase === 'captured' && (
                  <motion.div
                    key="content-captured"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2.5 w-full justify-center h-full px-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full xl:max-w-[85%] mb-2"
                    >
                      <h3 className="text-white/90 text-xl font-medium font-['Satoshi'] tracking-wide">
                        Claim Status Captured
                      </h3>
                      <p className="text-[#33FF37] text-sm mt-1 uppercase tracking-widest font-medium font-['Satoshi']">
                        Status: Paid
                      </p>
                    </motion.div>
                    
                    {DATA_POINTS.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="w-full xl:max-w-[85%] px-5 py-3 xl:py-3.5 rounded-lg border border-white/5"
                        style={{
                          background: 'linear-gradient(98.9deg, rgba(6, 0, 63, 0.3) 0.4%, rgba(2, 0, 127, 0.3) 92.9%)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <span className="text-white/90 text-[14px] xl:text-[15px] font-['Satoshi'] font-light tracking-wide">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
