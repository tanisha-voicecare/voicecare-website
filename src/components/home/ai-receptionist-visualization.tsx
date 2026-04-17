"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { assets } from "@/lib/assets";
import Ellipse37 from "./ellipses/ellipse-37";

const VOICE_MSGS = [
  { id: 'v1', type: 'joy', text: "Hello! This is Joy. How can I help you today?" },
  { id: 'v2', type: 'patient', text: "Hi, this is Adam. I'd like to schedule an appointment with Dr. James Smith at Silverline Hospital." },
  { id: 'v3', type: 'joy', text: "Hi Adam, thanks for calling! I'd be happy to help. When would you like to schedule your appointment with Dr. Smith?" },
  { id: 'v4', type: 'patient', text: "Tomorrow at 10 AM." },
  { id: 'v5', type: 'joy', text: "Confirmed. Your appointment with Dr. Smith is scheduled for tomorrow at 10 AM." },
  { id: 'v6', type: 'patient', text: "Thank you" }
];

const SMS_MSGS = [
  { id: 's1', type: 'sms', text: "Your appointment with Dr. James Smith has been confirmed for tomorrow at 10:00 AM at Silverline Hospital. Please arrive 10 minutes early. Let us know if you need to reschedule." },
  { id: 's2', type: 'sms', text: "Reminder: Your appointment is coming up.\nDr. James Smith — Today at 10:00 AM\nLocation: Silverline Hospital" }
];

export function AIReceptionistVisualization() {
  const [isMuted, setIsMuted] = useState(true);
  const [phase, setPhase] = useState<'voice' | 'sms'>('voice');
  const [msgIndex, setMsgIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'voice') {
      if (msgIndex < VOICE_MSGS.length) {
        timeout = setTimeout(() => setMsgIndex(prev => prev + 1), 1800);
      } else {
        timeout = setTimeout(() => {
          setPhase('sms');
          setMsgIndex(0);
        }, 4000);
      }
    } else if (phase === 'sms') {
      if (msgIndex < SMS_MSGS.length) {
        timeout = setTimeout(() => setMsgIndex(prev => prev + 1), 2200);
      } else {
        timeout = setTimeout(() => {
          setPhase('voice');
          setMsgIndex(0);
        }, 5000);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, msgIndex]);

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-6 relative h-full py-2 px-2 max-w-[1200px] mx-auto">

      {/* Left Side: Orb */}
      <div className="relative flex flex-col justify-center items-center shrink-0 w-[100px] md:w-[120px] xl:w-[160px]">
        <motion.div
          className="relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] xl:w-[150px] xl:h-[150px] z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Intense background glowing layer for orb */}
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
              <Ellipse37 />
            </div>
            <video
              ref={videoRef}
              src={assets.home.orbVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute max-w-none top-1/2 left-1/2"
              style={{
                width: '125%',
                height: '125%',
                objectFit: 'cover',
                willChange: 'transform',
                mixBlendMode: 'luminosity',
                transform: 'translate(-50%, -50%) rotate(0deg)'
              }}
            />
          </div>

          {/* Overlapping Badge */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            layout
          >
            <div
              className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] ml-[71px] mr-[0px] mt-[83px] mb-[0px]"
              style={{ background: 'linear-gradient(135deg, rgba(6,0,63,0.6) 0%, rgba(2,0,127,0.6) 100%)' }}
            >
              <div className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center scale-[1]">
                <AnimatePresence mode="wait">
                  {phase === 'voice' ? (
                    <motion.div
                      key="soundwave"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <motion.div
                        animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1] }}
                        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                        style={{ transformOrigin: 'center' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                          <rect x="2" y="5" width="2" height="6" rx="1" />
                          <rect x="6" y="2" width="2" height="12" rx="1" />
                          <rect x="10" y="4" width="2" height="8" rx="1" />
                          <rect x="14" y="6" width="2" height="4" rx="1" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <MessageSquare size={16} strokeWidth={1.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* State Text */}
        <motion.div className="mt-4 text-center flex flex-col items-center justify-center w-[180px] z-20">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white/90 text-[13px] md:text-[15px] leading-tight font-light tracking-wide font-['Satoshi'] relative -top-2 md:-top-4"
            >
              {phase === 'voice' ? 'Joy talking to patient' : 'Joy sending SMS to patients'}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side: Chat Bubbles */}
      <div className="flex-1 w-full min-w-[280px] h-full relative flex flex-col justify-center py-4">
        <AnimatePresence mode="wait">
          {phase === 'voice' ? (
            <motion.div
              key="voice-chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2 md:gap-3 w-full justify-center h-full px-2 pb-4"
            >
              <AnimatePresence mode="popLayout">
                {VOICE_MSGS.slice(Math.max(0, msgIndex - 3), msgIndex).map((msg, idx, arr) => {
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
                          {isJoy ? 'Joy' : 'Patient'}
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
          ) : (
            <motion.div
              key="sms-chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 md:gap-4 w-full justify-center h-full pb-4 px-2"
            >
              <AnimatePresence mode="popLayout">
                {SMS_MSGS.slice(Math.max(0, msgIndex - 1), msgIndex).map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                    className="w-full flex justify-start"
                  >
                    <div className="max-w-[100%] xl:max-w-[90%] px-6 py-4.5 text-[14px] font-normal font-['Satoshi'] leading-relaxed shadow-lg bg-white/10 backdrop-blur-xl text-white rounded-[20px] rounded-bl-sm border border-white/10">
                      <div className="flex items-center gap-2 mb-2 opacity-80">
                        <MessageSquare size={14} />
                        <span className="text-[11px] font-semibold tracking-wider uppercase">SMS Reminder</span>
                      </div>
                      {msg.text.split('\n').map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
