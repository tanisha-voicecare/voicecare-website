"use client";

import { Fragment } from "react";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** 3×111 — stroke rgba(0,0,0,0.18); scales with strip on smaller breakpoints. */
function PartnerDivider() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="111"
      viewBox="0 0 3 111"
      fill="none"
      className="hidden w-[3px] shrink-0 self-center sm:block sm:h-[88px] md:h-[111px]"
      aria-hidden
    >
      <path d="M1.5 0L1.5 111" stroke="black" strokeOpacity={0.18} strokeWidth={3} />
    </svg>
  );
}

/**
 * “Backed by” strip: SVG logos (height + w-auto) plus dividers between marks.
 */
const STRIP_LOGOS = [
  {
    key: "cencora",
    src: assets.company.partners.strip.cencora,
    alt: "Cencora",
    /** Heavier look is applied inside `cencora.svg` via SVG filter. */
    imgClass: "h-9 w-auto sm:h-10 md:h-11 lg:h-12",
  },
  {
    key: "mayo",
    src: assets.company.partners.strip.mayoClinic,
    alt: "Mayo Clinic",
    imgClass:
      "h-[4.5rem] w-auto sm:h-24 md:h-[6.5rem] lg:h-32 xl:h-36",
  },
  {
    key: "optum",
    src: assets.company.partners.strip.optum,
    alt: "Optum",
    imgClass: "h-9 w-auto sm:h-10 md:h-11 lg:h-12",
  },
] as const;

export function PartnersSection() {
  return (
    <SectionWrapper id="partners" className="bg-white" innerClassName="max-w-[1600px]">
      <FadeIn>
        <div
          role="group"
          aria-label="Backed by Cencora, Mayo Clinic, and Optum"
          className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-4 md:gap-x-8 lg:gap-x-10"
        >
          <p className="shrink-0 text-center font-sans text-[32px] font-normal leading-none tracking-[-0.02em] text-black sm:text-[34px] lg:text-[36px]">
            Backed by
          </p>

          {STRIP_LOGOS.map((logo, index) => (
            <Fragment key={logo.key}>
              {index > 0 ? <PartnerDivider /> : null}
              <img
                src={logo.src}
                alt={logo.alt}
                className={cn("block shrink-0 object-contain", logo.imgClass)}
                loading="lazy"
                decoding="async"
              />
            </Fragment>
          ))}
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
