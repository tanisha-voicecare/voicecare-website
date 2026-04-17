"use client";

import { FadeIn } from "@/components/motion";
import { COMPANY_HERO_HEADLINE } from "./company-narrative";

/**
 * Company hero: split navy + blue rail (matches pricing). Intro copy lives in MissionSection.
 */
export function HeroSection() {
  return (
    <section id="company-hero" aria-labelledby="company-hero-heading">
      <div className="relative overflow-hidden bg-[#000033]">
        <div className="mx-auto flex min-h-[280px] max-w-[1600px] flex-col px-4 sm:px-6 lg:min-h-[320px] lg:flex-row lg:px-8">
          <div className="flex min-w-0 flex-[7] flex-col justify-center py-14 sm:py-16 lg:py-[100px]">
            <FadeIn>
              <h1
                id="company-hero-heading"
                className="max-w-[min(100%,920px)] font-sans text-[40px] font-normal leading-[107%] text-white sm:text-[52px] lg:text-[70px]"
              >
                {COMPANY_HERO_HEADLINE}
              </h1>
            </FadeIn>
          </div>

          <div
            className="relative min-h-[120px] shrink-0 flex-[3] sm:min-h-[140px] lg:min-h-0 lg:self-stretch"
            aria-hidden
          >
            <div className="absolute inset-y-0 left-1/2 w-[100vw] -translate-x-1/2 bg-[#000099] lg:left-0 lg:translate-x-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
