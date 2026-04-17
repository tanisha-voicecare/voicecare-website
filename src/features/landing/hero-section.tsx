"use client";

import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";

export function HeroSection() {
  return (
    <SectionWrapper
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#06003f] pt-10 sm:pb-24 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(2,0,127,0.45),transparent_55%)]" />
      <div className="relative grid gap-12 sm:gap-16 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="max-w-xl">
          <FadeIn>
            <h1
              id="hero-heading"
              className="text-4xl font-semibold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              The Autonomous Workforce for High-Precision RCM
            </h1>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
              One agent to run your entire revenue cycle—from intake to claims.
              VoiceCare AI automates workflows across stakeholders, payer
              portals, and legacy systems with native EHR integration.
            </p>
          </FadeIn>
          <FadeIn
            delay={0.12}
            className="mt-10 flex flex-wrap gap-4"
            id="schedule-demo"
          >
            <BrandButton variant="gradient" size="lg" className="w-full sm:w-auto">
              Schedule a Demo
            </BrandButton>
            <BrandButton
              href="/about"
              variant="outline"
              size="lg"
              className="w-full border-white/60 sm:w-auto"
            >
              Become a Partner
            </BrandButton>
          </FadeIn>
          <FadeIn delay={0.16} className="mt-14 border-t border-white/15 pt-10">
            <p className="text-center text-lg text-white/90 sm:text-left">
              Backed &amp; Trusted by
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-10">
              <div className="relative h-10 w-24">
                <Image
                  src={assets.partners.trusted1}
                  alt="Healthcare partner logo"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="relative h-8 w-32">
                <Image
                  src={assets.partners.trusted2}
                  alt="Healthcare partner logo"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="relative h-10 w-40">
                <Image
                  src={assets.partners.trusted3}
                  alt="Healthcare partner logo"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn
          delay={0.1}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative size-[85%] max-w-[28rem]">
                <Image
                  src={assets.home.ellipse28}
                  alt=""
                  fill
                  className="object-contain opacity-90"
                  aria-hidden
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative size-[70%] max-w-[22rem]">
                  <Image
                    src={assets.home.ellipse29}
                    alt=""
                    fill
                    className="object-contain opacity-95"
                    aria-hidden
                    unoptimized
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative size-[55%] max-w-[18rem]">
                  <Image
                    src={assets.home.ellipse25}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative size-[40%] max-w-[13rem]">
                    <Image
                      src={assets.home.ellipse26}
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden
                      unoptimized
                    />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative size-[26%] max-w-[8rem]">
                    <Image
                      src={assets.home.ellipse27}
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 hidden flex-col items-end justify-between gap-2 p-3 text-xs font-medium text-white lg:flex lg:gap-3 lg:p-4 lg:text-sm">
              <span className="rounded-xl bg-[#ff4e3a] px-3 py-2 shadow-lg">
                Benefit Verification
              </span>
              <span className="rounded-xl bg-white/10 px-3 py-2 shadow-lg backdrop-blur-sm">
                Joy talking to payer
              </span>
              <span className="rounded-xl bg-white px-3 py-2 text-[#06003f] shadow-lg">
                Prior Authorizations
              </span>
              <span className="rounded-xl bg-white/10 px-3 py-2 shadow-lg backdrop-blur-sm">
                Joy navigating portals
              </span>
              <span className="rounded-xl bg-white/10 px-3 py-2 shadow-lg backdrop-blur-sm">
                Claims &amp; Denials
              </span>
            </div>
          </div>
          <ul
            className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden"
            aria-label="Joy capabilities"
          >
            <li className="rounded-lg bg-[#ff4e3a] px-3 py-1.5 text-xs text-white">
              Benefit Verification
            </li>
            <li className="rounded-lg bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              Joy talking to payer
            </li>
            <li className="rounded-lg bg-white px-3 py-1.5 text-xs text-[#06003f]">
              Prior Authorizations
            </li>
            <li className="rounded-lg bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              Portals &amp; claims
            </li>
          </ul>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
