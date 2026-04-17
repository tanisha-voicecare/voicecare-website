"use client";

import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";
import {
  COMPANY_INTRO_PARAGRAPH,
  COMPANY_MISSION_STATEMENT,
  COMPANY_VISION_STATEMENT,
} from "./company-narrative";

type MissionVisionCardProps = {
  title: string;
  body: string;
  className: string;
};

function MissionVisionCard({ title, body, className }: MissionVisionCardProps) {
  return (
    <article
      className={cn(
        "flex min-h-[260px] flex-col px-8 py-12 sm:min-h-[280px] sm:px-10 sm:py-14 lg:min-h-[320px] lg:px-14 lg:py-16",
        className,
      )}
    >
      <h3 className="border-b border-white/25 pb-6 font-sans text-[32px] font-normal leading-[107%] text-white sm:text-[40px] lg:text-[48px]">
        {title}
      </h3>
      <p className="mt-6 font-sans text-[16px] font-normal leading-[145%] text-white sm:text-[18px] lg:text-[20px]">
        {body}
      </p>
    </article>
  );
}

/**
 * Mission + vision split blocks (Figma): intro paragraph, then flush navy / coral columns.
 */
export function MissionSection() {
  return (
    <section
      id="company-mission"
      className="bg-white"
      aria-labelledby="company-mission-sr-title"
    >
      <h2 id="company-mission-sr-title" className="sr-only">
        Mission and vision
      </h2>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <FadeIn>
            <p className="max-w-[42rem] font-sans text-[16px] font-normal leading-[145%] text-black">
              {COMPANY_INTRO_PARAGRAPH}
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 pb-12 sm:mt-14 sm:pb-16 lg:mt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
            <FadeIn>
              <MissionVisionCard
                title="Our Mission"
                body={COMPANY_MISSION_STATEMENT}
                className="bg-[#000033]"
              />
            </FadeIn>
            <FadeIn delay={0.06}>
              <MissionVisionCard
                title="Our Vision"
                body={COMPANY_VISION_STATEMENT}
                className="bg-[#ff4d33]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
