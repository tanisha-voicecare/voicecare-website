"use client";

import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";

export function PrecisionSection() {
  return (
    <SectionWrapper
      id="precision"
      aria-labelledby="precision-heading"
      className="bg-[#06003f] text-white"
      noPadding
      innerClassName="px-0"
    >
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#ff4e3a] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <FadeIn>
            <h2
              id="precision-heading"
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Precision &amp; Transparency
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/95 sm:text-xl">
              <p>
                Every agent action is logged, audit-ready, and transparent. Every
                phone call Joy makes is recorded and transcribed. You maintain
                100% oversight with 0% of the manual labor.
              </p>
              <p>
                For complex clinical exceptions, our Human-in-the-Loop safety net
                triggers a specialist review ensuring 99.9% precision with the
                speed of an agentic workforce.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="relative min-h-[20rem] lg:min-h-full">
          <Image
            src={assets.precisionHero}
            alt="Healthcare operations leader reviewing VoiceCare AI analytics on a workstation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
