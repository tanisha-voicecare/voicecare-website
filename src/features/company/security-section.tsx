"use client";

import { Fragment } from "react";
import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const CERTS = [
  { src: assets.company.security.hipaaBadge, alt: "HIPAA compliant", large: true },
  { src: assets.company.security.soc2Badge, alt: "AICPA SOC", large: false },
  { src: assets.company.security.isoBadge, alt: "ISO certified", large: false },
] as const;

/** Vertical rule between badges; height tracks the taller HIPAA mark. */
function CertDivider({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="120"
      viewBox="0 0 3 120"
      fill="none"
      className={cn("h-48 shrink-0 self-center sm:h-52 md:h-56 w-[3px]", className)}
      aria-hidden
    >
      <path d="M1.5 0L1.5 120" stroke="black" strokeOpacity={0.18} strokeWidth={3} />
    </svg>
  );
}

export function SecuritySection() {
  return (
    <SectionWrapper
      id="security"
      className="bg-[#EFEBF2] py-12 sm:py-16 lg:py-20"
      innerClassName="max-w-[1600px]"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-16">
        <FadeIn>
          <div className="max-w-[36rem]">
            <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
              <div className="shrink-0 pt-1" aria-hidden>
                <Image
                  src={assets.company.security.shieldIcon}
                  alt=""
                  width={66}
                  height={66}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-[66px] lg:w-[66px]"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2
                  id="security-heading"
                  className="font-satoshi text-[36px] font-normal leading-[120%] text-black sm:text-[48px] lg:text-[60px]"
                >
                  <span className="block">Security &amp;</span>
                  <span className="block">Governance</span>
                </h2>
                <p className="mt-4 max-w-xl font-satoshi text-[21px] font-normal leading-[120%] text-black">
                  We treat your data as a liability to be protected, ensuring the highest standards of
                  encryption and residency.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="min-w-0">
          <div
            className={cn(
              "flex min-w-0 w-full flex-nowrap items-center justify-start gap-2 md:justify-end",
              "overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "sm:gap-4 md:gap-5 lg:gap-6",
            )}
          >
            {CERTS.map((cert, index) => (
              <Fragment key={cert.alt}>
                {index > 0 ? <CertDivider /> : null}
                <div
                  className={cn(
                    "relative shrink-0",
                    cert.large
                      ? "h-48 w-56 sm:h-52 sm:w-64 md:h-56 md:w-72"
                      : "h-28 w-36 sm:h-32 sm:w-40 md:h-36 md:w-44",
                  )}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className={cn(
                      "object-contain object-center",
                      cert.large && "mix-blend-multiply",
                    )}
                    sizes={cert.large ? "(max-width: 768px) 280px, 320px" : "(max-width: 768px) 160px, 180px"}
                    unoptimized
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
