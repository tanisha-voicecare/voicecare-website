"use client";

import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

import { ImpactAiComparison } from "./impact-ai-comparison";

type PillarTone = "navy" | "coral" | "royal";

const pillarTone: Record<PillarTone, string> = {
  navy: "bg-[#06003f]",
  coral: "bg-[#ff4e3a]",
  royal: "bg-[#02007f]",
};

function ImpactPillar({
  tone,
  title,
  children,
  className,
}: {
  tone: PillarTone;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex min-h-[26rem] flex-col rounded-2xl p-6 text-white shadow-lg sm:min-h-[28rem] sm:p-8 lg:min-h-[30rem]",
        pillarTone[tone],
        className
      )}
    >
      <div className="flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-[1.75rem] lg:leading-tight">
          {title}
        </h3>
        <div className="mt-4 flex flex-1 flex-col gap-4">{children}</div>
      </div>
    </article>
  );
}

export function ImpactSection() {
  return (
    <SectionWrapper
      id="impact"
      aria-labelledby="impact-heading"
      className="bg-white"
    >
      <FadeIn>
        <h2
          id="impact-heading"
          className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl lg:text-6xl"
        >
          Impact
        </h2>
      </FadeIn>

      {/* Three equal pillars — Figma 762:274–276 */}
      <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
        <FadeIn>
          <ImpactPillar tone="navy" title="Operating Leverage : handle more volume">
            <p className="text-base leading-relaxed text-white/90 sm:text-lg">
              500 Hours Saved per 1,000 payer phone calls. decoupling your growth
              from manual labor costs.
            </p>
            <ImpactAiComparison />
          </ImpactPillar>
        </FadeIn>
        <FadeIn delay={0.05}>
          <ImpactPillar tone="coral" title="Revenue Protection : Reduce manual errors">
            <p className="font-normal tabular-nums text-5xl tracking-tight sm:text-6xl lg:text-7xl">
              20%
            </p>
            <p className="text-base leading-relaxed text-white/95 sm:text-lg">
              Better Quality - eliminating the human errors that lead to systemic
              denials.
            </p>
          </ImpactPillar>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ImpactPillar
            tone="royal"
            title="Cash Flow Velocity : Speed up the time from claim to reimbursement"
          >
            <p className="font-normal tabular-nums text-5xl tracking-tight sm:text-6xl lg:text-7xl">
              70%
            </p>
            <p className="text-base leading-relaxed text-white/95 sm:text-lg">
              Higher ROI via accelerated claim lifecycles
            </p>
          </ImpactPillar>
        </FadeIn>
      </div>

      {/* Second band: headcount + system velocity — Figma 120:708–716 region */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <FadeIn delay={0.12}>
          <article className="flex min-h-[20rem] flex-col justify-center rounded-2xl bg-[#06003f] p-6 text-white sm:p-10 lg:min-h-[22rem]">
            <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">
              Without scaling headcount linearly. Do more with less.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
              Break the 1:1 link between volume and headcount. Handle 5x the
              claims with 0% staff increase.
            </p>
            <div className="relative mt-10 h-40 w-40 shrink-0">
              <Image
                src={assets.growthChart}
                alt=""
                fill
                className="object-contain"
                aria-hidden
                unoptimized
              />
            </div>
          </article>
        </FadeIn>
        <FadeIn delay={0.14}>
          <article className="flex min-h-[20rem] flex-col justify-between rounded-2xl bg-[#efebf2] p-6 text-[#06003f] sm:p-10 lg:min-h-[22rem]">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                System Velocity
              </h3>
              <p className="mt-4 font-normal tabular-nums text-5xl tracking-tight sm:text-6xl lg:text-7xl">
                40%
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-800 sm:text-lg">
                Faster data initiation and transfer
              </p>
            </div>
            <div className="relative mt-8 aspect-[16/10] w-full max-w-lg">
              <Image
                src={assets.isometricBridge}
                alt="Abstract diagram representing faster data flow across systems"
                fill
                className="object-contain object-left"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </article>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
