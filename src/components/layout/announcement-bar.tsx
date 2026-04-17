"use client";

const announcements = [
  "Agentic AI Startup VoiceCare AI Completes Successful Funding Round",
  "Inside Healthcare's Hottest New AI Category: Agentic AI",
  "Streamlining Revenue Cycle Management with AI: VoiceCare AI at Becker's 15th Annual Meeting",
] as const;

export function AnnouncementBar() {
  const marqueeItems = [...announcements, ...announcements];

  return (
    <div className="border-b border-[#FF4E3A]/20 bg-[#02007F] text-white">
      <div className="flex items-center gap-3 py-2.5 sm:py-3">
        <div className="ml-4 hidden h-4 w-4 shrink-0 sm:ml-6 sm:block">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-full text-[#FF4E3A]"
            aria-hidden="true"
          >
            <path d="M12 0l2.7 6.3L21 9l-6.3 2.7L12 18l-2.7-6.3L3 9l6.3-2.7L12 0zM19 15l1.5 3.5L24 20l-3.5 1.5L19 25l-1.5-3.5L14 20l3.5-1.5L19 15zM5 14l1 2.4L8.4 17l-2.4 1L5 20.4 4 18 1.6 17 4 16.4 5 14z" />
          </svg>
        </div>
        <div className="relative flex-1 overflow-hidden px-4 sm:px-0">
          <div
            className="flex min-w-max items-center gap-8 whitespace-nowrap"
            style={{ animation: "announcement-marquee 44s linear infinite" }}
          >
            {marqueeItems.map((text, index) => (
              <div key={`${text}-${index}`} className="flex items-center gap-8">
                <p className="text-[13px] font-medium text-white/92 sm:text-[15px]">
                  {text}
                </p>
                <span className="text-white/35">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
