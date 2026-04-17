"use client";

import { SectionSplitHeader } from "@/components/ui/section-split-header";

export function HeroSection() {
  return (
    <section
      id="pricing-hero"
      aria-labelledby="pricing-hero-heading"
      className="relative overflow-hidden bg-[#000033]"
    >
      <div className="mx-auto flex min-h-[280px] max-w-[1600px] flex-col px-4 sm:px-6 lg:min-h-[320px] lg:flex-row lg:px-8">
        {/* Left ~70% — headline + description in navy */}
        <div className="flex min-w-0 flex-[7] flex-col justify-center py-14 sm:py-16 lg:py-[100px]">
          <SectionSplitHeader
            headingId="pricing-hero-heading"
            titleLevel="h1"
            title={
              <>
                Pay for Output, Not
                <br />
                Overhead
              </>
            }
            description="Voicecare.ai operates as an autonomous workforce priced strictly on output: driven by task capacity and clinical complexity."
            tone="dark"
          />
        </div>

        {/* Right ~30% — solid royal blue */}
        <div className="relative min-h-[120px] shrink-0 flex-[3] sm:min-h-[140px] lg:min-h-0 lg:self-stretch" aria-hidden>
          {/* This absolute div extends the blue background to the extreme right edge of the screen */}
          <div className="absolute inset-y-0 left-1/2 w-[100vw] -translate-x-1/2 bg-[#000099] lg:left-0 lg:translate-x-0" />
        </div>
      </div>
    </section>
  );
}
