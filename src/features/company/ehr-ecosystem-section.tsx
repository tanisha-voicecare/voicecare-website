"use client";

import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function EhrEcosystemSection() {
  const logos = assets.company.ehrEcosystemLogos;

  return (
    <SectionWrapper
      id="ehr-ecosystem"
      className="bg-white py-10 sm:py-12 lg:py-14"
      innerClassName="max-w-[1600px]"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-4 xl:gap-5">
        <FadeIn className="shrink-0">
          <h2
            id="ehr-ecosystem-heading"
            className="font-satoshi text-[36px] font-normal leading-[107%] text-black"
          >
            <span className="block">EHR</span>
            <span className="block">Ecosystem</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.05} className="min-w-0 flex-1">
          {/* Single row: nowrap keeps Veradigm on the same line; scroll on very narrow desktops if needed. */}
          <ul className="flex flex-nowrap items-center gap-x-2.5 sm:gap-x-3 md:gap-x-3.5 lg:gap-x-3 xl:gap-4 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-x-visible [&::-webkit-scrollbar]:hidden">
            {logos.map((item) => {
              const boosted =
                item.alt === "athenahealth" || item.alt === "Veradigm";
              return (
                <li key={item.alt} className="flex shrink-0 items-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={200}
                    height={boosted ? 72 : 64}
                    className={cn(
                      "w-auto object-contain object-left",
                      boosted
                        ? "h-12 max-h-[3.25rem] sm:h-[3.35rem] sm:max-h-14 md:h-[3.65rem] md:max-h-[3.85rem] lg:h-[3.85rem] lg:max-h-16"
                        : "h-11 max-h-12 sm:h-12 sm:max-h-14 md:h-[3.35rem] md:max-h-14 lg:h-14 lg:max-h-[3.75rem]",
                    )}
                    unoptimized
                  />
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
