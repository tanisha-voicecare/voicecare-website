import { Eye, Globe, MousePointerClick } from 'lucide-react';
import { assets } from "@/lib/assets";
import orbGradient from "@/assets/68e564fc051151a61f78ecc6d8f02de5033ed42b.png";

const SoundwaveIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
    <rect x="2" y="5" width="2" height="6" rx="1" />
    <rect x="6" y="2" width="2" height="12" rx="1" />
    <rect x="10" y="4" width="2" height="8" rx="1" />
    <rect x="14" y="6" width="2" height="4" rx="1" />
  </svg>
);

export function PremiumAIAnimation() {
  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center pointer-events-none">
      {/* Intense Background Layer Blur effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#02007F] rounded-full filter blur-[120px] opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3300] rounded-full filter blur-[150px] opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#02007F] rounded-full filter blur-[150px] opacity-90 pointer-events-none" />

      {/* Container aspect ratio wrapper */}
      <div className="w-full max-w-[1000px] aspect-square relative z-10">
        <svg viewBox="0 0 1000 1000" className="w-full h-full scale-90 origin-center transform-gpu" style={{ overflow: 'visible' }}>
          <style>
            {`
              @keyframes orbit-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes orbit-med { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
              @keyframes orbit-fast { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes float-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
              @keyframes float-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
              @keyframes float-3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
              @keyframes float-4 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }

              @keyframes soundwave-pulse {
                0%, 100% { transform: scaleY(1); }
                25% { transform: scaleY(1.3); }
                50% { transform: scaleY(0.8); }
                75% { transform: scaleY(1.2); }
              }

              @keyframes navigate-click {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(2px, -2px) scale(0.95); }
                50% { transform: translate(-2px, 2px) scale(1.05); }
                75% { transform: translate(2px, 1px) scale(0.98); }
              }

              @keyframes eye-blink {
                0%, 90%, 100% { transform: scaleY(1); opacity: 0.9; }
                93%, 97% { transform: scaleY(0.1); opacity: 0.3; }
                95% { transform: scaleY(0.05); opacity: 0.2; }
              }

              .group-orbit-inner { animation: orbit-fast 45s linear infinite; transform-origin: 500px 500px; }
              .group-orbit-middle { animation: orbit-med 65s linear infinite; transform-origin: 500px 500px; }
              .group-orbit-outer { animation: orbit-slow 85s linear infinite; transform-origin: 500px 500px; }

              .anim-float-1 { animation: float-1 5s ease-in-out infinite; }
              .anim-float-2 { animation: float-2 6s ease-in-out infinite; }
              .anim-float-3 { animation: float-3 5.5s ease-in-out infinite; }
              .anim-float-4 { animation: float-4 6.5s ease-in-out infinite; }

              .icon-soundwave { animation: soundwave-pulse 1.2s ease-in-out infinite; transform-origin: center; }
              .icon-navigate { animation: navigate-click 2s ease-in-out infinite; transform-origin: center; }
              .icon-eye { animation: eye-blink 3s ease-in-out infinite; transform-origin: center; }

              @keyframes orb-pulse {
                0%, 100% { transform: scale(0.95); opacity: 0.85; }
                50% { transform: scale(1.05); opacity: 1; }
              }
              @keyframes orb-ring-1 {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.05); }
                100% { transform: rotate(360deg) scale(1); }
              }
              @keyframes orb-ring-2 {
                0% { transform: rotate(360deg) scale(1.05); }
                50% { transform: rotate(180deg) scale(1); }
                100% { transform: rotate(0deg) scale(1.05); }
              }
              @keyframes orb-ring-3 {
                0% { transform: rotate(0deg) scale(1) skew(0deg); }
                100% { transform: rotate(360deg) scale(1.05) skew(5deg); }
              }
              .anim-orb-core { animation: orb-pulse 4s ease-in-out infinite; transform-origin: 500px 500px; }
              .anim-orb-ring-1 { animation: orb-ring-1 15s linear infinite; transform-origin: 500px 500px; }
              .anim-orb-ring-2 { animation: orb-ring-2 20s linear infinite; transform-origin: 500px 500px; }
              .anim-orb-ring-3 { animation: orb-ring-3 12s linear infinite alternate; transform-origin: 500px 500px; }
            `}
          </style>

          <defs>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#0011FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0000FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="orbCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#99CCFF" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0044FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#000033" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="orbBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="darkGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="30" result="blur" />
            </filter>
          </defs>

          {/* Concentric Dashed Orbits */}
          <circle cx="500" cy="500" r="180" fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="8 10" />
          <circle cx="500" cy="500" r="320" fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="8 10" />
          <circle cx="500" cy="500" r="460" fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="8 10" />

          {/* Orbiting Dots */}
          {/* Inner Group */}
          <g className="group-orbit-inner">
            <circle cx="627" cy="627" r="5" fill="#ffffff" />
            <circle cx="627" cy="627" r="24" fill="url(#dotGlow)" />

            <circle cx="373" cy="373" r="5" fill="#ffffff" />
            <circle cx="373" cy="373" r="24" fill="url(#dotGlow)" />
          </g>

          {/* Middle Group */}
          <g className="group-orbit-middle">
            <circle cx="820" cy="500" r="5" fill="#ffffff" />
            <circle cx="820" cy="500" r="24" fill="url(#dotGlow)" />

            <circle cx="273" cy="273" r="5" fill="#ffffff" />
            <circle cx="273" cy="273" r="24" fill="url(#dotGlow)" />

            <circle cx="273" cy="727" r="5" fill="#ffffff" />
            <circle cx="273" cy="727" r="24" fill="url(#dotGlow)" />
          </g>

          {/* Outer Group */}
          <g className="group-orbit-outer">
            <circle cx="880" cy="235" r="5" fill="#ffffff" />
            <circle cx="880" cy="235" r="24" fill="url(#dotGlow)" />

            <circle cx="178" cy="828" r="5" fill="#ffffff" />
            <circle cx="178" cy="828" r="24" fill="url(#dotGlow)" />
          </g>

          {/* Center Node - Animated Orb */}
          <g className="anim-orb-core">
            {/* Video replacement for the orb */}
            <foreignObject x="200" y="200" width="600" height="600">
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 109px, transparent 110px)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 109px, transparent 110px)',
                  transform: 'translateZ(0)',
                  background: `url(${orbGradient}) center / 218px 218px no-repeat`
                }}
              >
                <video 
                  src={assets.home.orbVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="max-w-none" 
                  style={{ width: '450px', height: '450px', objectFit: 'cover', willChange: 'transform', mixBlendMode: 'luminosity' }}
                />
              </div>
            </foreignObject>

            {/* Node Text - Positioned at the bottom edge inside the orb */}
            <text x="500" y="635" fill="#FFFFFF" fontSize="21" fontFamily="Satoshi, sans-serif" fontWeight="500" textAnchor="middle" alignmentBaseline="middle" dominantBaseline="central" style={{ textShadow: '0px 4px 15px rgba(0,0,0,0.8)' }}>Joy</text>
          </g>

          {/* ForeignObjects for HTML content (Cards & Badges) */}

          {/* Top Left: Benefit Verification */}
          <foreignObject x="40" y="100" width="600" height="150" className="anim-float-1" style={{ overflow: 'visible' }}>
            <div className="flex flex-col items-start w-max gap-3 ml-[132px]">
              <div className="w-fit bg-[#FF4E3A] text-white text-[20px] px-8 py-5 rounded-tl-xl rounded-tr-xl rounded-br-xl font-medium shadow-[0_8px_30px_rgba(255,78,58,0.4)] whitespace-nowrap tracking-wide">
                Benefit Verification
              </div>
              <div className="w-fit bg-[#ffffff10] border border-white/20 text-white/95 text-[20px] px-8 py-5 rounded-tr-xl rounded-br-xl rounded-bl-xl backdrop-blur-md flex items-center justify-start gap-2.5 shadow-lg whitespace-nowrap">
                <span className="opacity-90 icon-soundwave inline-block"><SoundwaveIcon size={28} /></span>
                <span className="font-light tracking-wide">Joy talking to payer</span>
              </div>
            </div>
          </foreignObject>

          {/* Mid Right: Claims & Denials */}
          <foreignObject x="660" y="420" width="600" height="150" className="anim-float-2" style={{ overflow: 'visible' }}>
            <div className="flex flex-col items-start w-max gap-3 ml-[-1px] mt-[-72px]">
              <div className="w-fit bg-white text-[#06003F] text-[20px] px-8 py-5 rounded-tl-xl rounded-tr-xl rounded-br-xl font-medium shadow-[0_8px_30px_rgba(255,255,255,0.2)] whitespace-nowrap tracking-wide">
                Claims & Denials
              </div>
              <div className="w-fit bg-[#ffffff10] border border-white/20 text-white/95 text-[20px] px-8 py-5 rounded-tr-xl rounded-br-xl rounded-bl-xl backdrop-blur-md flex items-center justify-start gap-2.5 shadow-lg whitespace-nowrap">
                <span className="opacity-90 icon-navigate inline-block"><MousePointerClick size={28} strokeWidth={1.5} /></span>
                <span className="font-light tracking-wide">Joy navigating portals</span>
              </div>
            </div>
          </foreignObject>

          {/* Mid Left: Prior Authorisations */}
          <foreignObject x="40" y="420" width="600" height="150" className="anim-float-3" style={{ overflow: 'visible' }}>
            <div className="flex flex-col items-start w-max gap-3 ml-[10px] mt-[113px]">
              <div className="w-fit bg-white text-[#06003F] text-[20px] px-8 py-5 rounded-tl-xl rounded-tr-xl rounded-br-xl font-medium shadow-[0_8px_30px_rgba(255,255,255,0.2)] whitespace-nowrap tracking-wide">
                Prior Authorisations
              </div>
              <div className="w-fit bg-[#ffffff10] border border-white/20 text-white/95 text-[20px] px-8 py-5 rounded-tr-xl rounded-br-xl rounded-bl-xl backdrop-blur-md flex items-center justify-start gap-2.5 shadow-lg whitespace-nowrap">
                <span className="opacity-90 icon-eye inline-block"><Eye size={28} strokeWidth={1.5} /></span>
                <span className="font-light tracking-wide">Joy reading faxes</span>
              </div>
            </div>
          </foreignObject>

          {/* Bottom Right: AI Receptionist */}
          <foreignObject x="650" y="720" width="600" height="150" className="anim-float-4" style={{ overflow: 'visible' }}>
            <div className="flex flex-col items-start w-max gap-3 ml-[-175px] mt-[28px]">
              <div className="w-fit bg-[#FF4E3A] text-white text-[20px] px-8 py-5 rounded-tl-xl rounded-tr-xl rounded-br-xl font-medium shadow-[0_8px_30px_rgba(255,78,58,0.4)] whitespace-nowrap tracking-wide">
                AI Receptionist
              </div>
              <div className="w-fit bg-[#ffffff10] border border-white/20 text-white/95 text-[20px] px-8 py-5 rounded-tr-xl rounded-br-xl rounded-bl-xl backdrop-blur-md flex items-center justify-start gap-2.5 shadow-lg whitespace-nowrap">
                <span className="opacity-90 icon-soundwave inline-block"><SoundwaveIcon size={28} /></span>
                <span className="font-light tracking-wide">Joy talking to patient</span>
              </div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
