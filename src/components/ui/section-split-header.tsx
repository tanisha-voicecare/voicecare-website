"use client";

import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Matches “Our Operating Principles”: title left, lede right, bottom-aligned on large screens. */
export type SectionSplitHeaderTone = "light" | "dark";

export type SectionSplitHeaderProps = {
  headingId: string;
  title: ReactNode;
  /** Optional right-column copy (16px / 400 / 120%). Omit for title-only blocks. */
  description?: ReactNode;
  /** `light`: black text on gray/white. `dark`: white text on navy. */
  tone?: SectionSplitHeaderTone;
  titleLevel?: "h1" | "h2";
  className?: string;
};

export function SectionSplitHeader({
  headingId,
  title,
  description,
  tone = "light",
  titleLevel = "h2",
  className,
}: SectionSplitHeaderProps) {
  const text = tone === "dark" ? "text-white" : "text-black";
  const TitleTag = titleLevel === "h1" ? "h1" : "h2";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-12",
        className,
      )}
    >
      <FadeIn className="max-w-[min(100%,22rem)] shrink-0 sm:max-w-xl">
        <TitleTag
          id={headingId}
          className={cn(
            "font-sans text-[40px] font-normal leading-[107%] sm:text-[52px] lg:text-[70px]",
            text,
          )}
        >
          {title}
        </TitleTag>
      </FadeIn>
      {description != null && (
        <FadeIn delay={0.06} className="max-w-[min(100%,20rem)] shrink-0 lg:max-w-[280px] lg:text-left">
          <div className={cn("font-sans text-[16px] font-normal leading-[120%]", text)}>
            {description}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
