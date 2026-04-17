"use client";

import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";

const colorRow = [
  { src: assets.logoColor1, alt: "Partner logo" },
  { src: assets.logoColor2, alt: "Partner logo" },
  { src: assets.logoColor3, alt: "Partner logo" },
  { src: assets.logoColor4, alt: "Partner logo" },
  { src: assets.logoColor5, alt: "Partner logo" },
];

const grayRow = [
  { src: assets.logoGray1, alt: "Partner logo" },
  { src: assets.logoGray2, alt: "Partner logo" },
  { src: assets.logoGray3, alt: "Partner logo" },
  { src: assets.logoGray4, alt: "Partner logo" },
  { src: assets.logoGray5, alt: "Partner logo" },
  { src: assets.logoGray6, alt: "Partner logo" },
];

export function PartnerLogosSection() {
  return (
    <section aria-labelledby="integration-heading">
      <SectionWrapper className="bg-white py-10 sm:py-10 lg:py-12">
        <FadeIn>
          <h2
            id="integration-heading"
            className="text-center text-lg font-medium text-[#06003f] sm:text-xl"
          >
            Deep EHR Integration
          </h2>
        </FadeIn>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90">
          {colorRow.map((logo) => (
            <div key={logo.src} className="relative h-10 w-28 sm:h-12 sm:w-36">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <div className="bg-[#f3f3f3] py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-center text-lg font-medium text-[#06003f] sm:text-xl">
              <span className="block sm:inline">Universal Reach:</span>{" "}
              <span className="font-semibold">Connectivity to 4,000+ Payers</span>
            </p>
          </FadeIn>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
            {grayRow.map((logo) => (
              <div key={logo.src} className="relative h-10 w-28 sm:h-14 sm:w-40">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain grayscale"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
