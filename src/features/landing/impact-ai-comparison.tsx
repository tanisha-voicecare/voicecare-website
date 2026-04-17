/**
 * Simplified “With AI vs Without AI” bar comparison from Impact section (Figma).
 */
export function ImpactAiComparison() {
  return (
    <div
      className="mt-8 rounded-xl border border-white/15 bg-black/15 p-4 sm:p-5"
      role="img"
      aria-label="Comparison of call volume and handle time with AI versus without AI"
    >
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-6 text-xs font-medium uppercase tracking-wide text-white/70 sm:gap-x-6 sm:text-sm">
        <div aria-hidden />
        <span className="text-center text-white/55">Without AI</span>
        <span className="text-center text-[#7dd3a0]">With AI</span>
        <span className="self-end text-white/85">Calls</span>
        <div className="flex h-28 items-end justify-center sm:h-32">
          <div className="h-10 w-8 rounded-t-md bg-white/25 sm:h-12 sm:w-10" />
        </div>
        <div className="flex h-28 items-end justify-center sm:h-32">
          <div className="h-24 w-8 rounded-t-md bg-[#ea473a] sm:h-28 sm:w-10" />
        </div>
        <span className="self-end text-white/85">Time</span>
        <div className="flex h-28 items-end justify-center sm:h-32">
          <div className="h-8 w-8 rounded-t-md bg-white/25 sm:h-10 sm:w-10" />
        </div>
        <div className="flex h-28 items-end justify-center sm:h-32">
          <div className="h-20 w-8 rounded-t-md bg-[#ea473a] sm:h-24 sm:w-10" />
        </div>
      </div>
    </div>
  );
}
