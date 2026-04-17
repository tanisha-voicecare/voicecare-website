"use client";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";
import Image from "next/image";

const tiers = [
  {
    name: "SMB / Dental Groups",
    color: "bg-[#06003F]",
    features: [
      { icon: "location", text: "10-50 Locations" },
      { icon: "subscription", text: "Subscription : $500 / location / month" },
      { icon: "capacity", text: "Included Capacity : 100 Tasks + 15 Codes" },
      { icon: "overage", text: "Base Overage Rate : $5.00 / task" },
      { icon: "complexity", text: "Complexity Premium : +$1.00 / task\n(per 5 extra codes)" },
      { icon: "rush", text: "Rush SLA Premium : +$2.00 / task" },
      { icon: "implementation", text: "Implementation Fee :\n$2,000 Base + $500 / location" },
    ],
  },
  {
    name: "Mid-Market / Specialty",
    color: "bg-[#02007F]",
    features: [
      { icon: "location", text: "51-250 Locations" },
      { icon: "subscription", text: "Subscription : $500 / location / month" },
      { icon: "capacity", text: "Included Capacity : 100 Tasks + 15 Codes" },
      { icon: "overage", text: "Base Overage Rate : $4.75 / task" },
      { icon: "complexity", text: "Complexity Premium : +$1.00 / task\n(per 5 extra codes)" },
      { icon: "rush", text: "Rush SLA Premium : +$2.00 / task" },
      { icon: "implementation", text: "Implementation Fee :\n$2,000 Base + $500 / location" },
    ],
  },
  {
    name: "Enterprise CBO / Health Systems",
    color: "bg-[#06003F]",
    features: [
      { icon: "location", text: "250+ Locations" },
      { icon: "subscription", text: "Subscription : Custom Enterprise Pricing" },
      { icon: "capacity", text: "Included Capacity : Custom Enterprise Baseline" },
      { icon: "overage", text: "Base Overage Rate : $4.00 - $4.50 / task" },
      { icon: "complexity", text: "Complexity Premium : +$1.00 / task\n(per 5 extra codes)" },
      { icon: "rush", text: "Rush SLA Premium : +$2.00 / task" },
      { icon: "implementation", text: "Implementation Fee : Custom API Deployment" },
    ],
  },
] as const;

export function PricingTiers() {
  return (
    <SectionWrapper id="pricing-tiers" className="bg-white" innerClassName="max-w-[1600px]">
      <FadeIn>
        <h2 className="text-[28px] font-normal leading-[1.07] text-black sm:text-[32px] lg:text-[36px]">
          Voicecare.ai Deployment Tiers
        </h2>
      </FadeIn>

      <div className="mx-auto mt-12 grid max-w-[1560px] gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {tiers.map((tier, idx) => (
          <FadeIn key={tier.name} delay={idx * 0.1} className="flex justify-center">
            <div
              className={cn(
                "flex w-full max-w-[500px] flex-col text-white lg:h-[779px]",
                tier.color
              )}
            >
              {/* Top part: Heading */}
              <div className="px-6 pt-8 sm:px-8 sm:pt-8 lg:px-[32px] lg:pt-[40px]">
                <h3 className="mb-[32px] text-[24px] font-normal leading-[1.2] tracking-wide">
                  {tier.name}
                </h3>
              </div>

              {/* Solid line edge-to-edge */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="1"
                viewBox="0 0 472 1"
                fill="none"
                preserveAspectRatio="none"
                className="w-full shrink-0"
              >
                <path
                  d="M472 0.5L1.38283e-05 0.5"
                  stroke="white"
                  strokeOpacity="0.27"
                  strokeWidth="1"
                />
              </svg>

              {/* Bottom part: Features */}
              <div className="flex flex-1 flex-col px-6 pb-8 sm:px-8 sm:pb-8 lg:px-[32px] lg:pb-[40px]">
                <ul className="flex flex-1 flex-col justify-between pt-[32px]">
                  {tier.features.map((feature, i) => {
                    const isLast = i === tier.features.length - 1;
                    return (
                      <li key={i} className="flex flex-col">
                        <div className="flex items-center gap-5">
                          <Image
                            src={
                              assets.pricing.icons[
                                feature.icon as keyof typeof assets.pricing.icons
                              ]
                            }
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6 shrink-0"
                            unoptimized
                          />
                          <span className="whitespace-pre-line text-[16px] font-normal leading-[1.2] text-white">
                            {feature.text}
                          </span>
                        </div>

                        {/* Dashed line */}
                        {!isLast && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="1"
                            viewBox="0 0 359 1"
                            fill="none"
                            preserveAspectRatio="none"
                            className="my-[26px]"
                          >
                            <path
                              d="M359 0.5L3.33786e-06 0.5"
                              stroke="rgba(255, 255, 255, 0.27)"
                              strokeWidth="1"
                              strokeDasharray="5 5"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
