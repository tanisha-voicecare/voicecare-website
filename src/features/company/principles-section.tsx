"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionSplitHeader } from "@/components/ui/section-split-header";
import { cn } from "@/lib/utils";
import { COMPANY_PRINCIPLES_LEDE } from "./company-narrative";

/** Design assets: `/public/images/company/principles/*.svg` (from VCAI WEBSITE REVAMP.zip). */
const ICON_BASE = "/images/company/principles" as const;

const PRINCIPLES: readonly {
  title: string;
  description: string;
  iconSrc: string;
}[] = [
  {
    title: "Solving Customer Problems",
    description:
      "We relentlessly focus on solving real-world RCM frictions that yield measurable economic value. We favor outcomes over features.",
    iconSrc: `${ICON_BASE}/solving-customer-problems.svg`,
  },
  {
    title: "Innovate Constantly",
    description:
      "Innovation isn't a department; it's our operating system. We stay ahead of payer complexity by evolving faster than the legacy systems we navigate.",
    iconSrc: `${ICON_BASE}/innovate-constantly.svg`,
  },
  {
    title: "Go Above & Beyond",
    description:
      '"Good enough" is a failure state. We deliver exceptional outcomes that redefine what providers expect from their technology partners.',
    iconSrc: `${ICON_BASE}/go-above-beyond.svg`,
  },
  {
    title: "Take Ownership",
    description:
      "We take full ownership of our commitments. No excuses, no finger-pointing. If an agent encounters a block, we own the resolution.",
    iconSrc: `${ICON_BASE}/take-ownership.svg`,
  },
  {
    title: "Default Trust",
    description:
      "Transparency, honesty, and integrity guide every interaction. We build in the open so our partners can trust our autonomy.",
    iconSrc: `${ICON_BASE}/default-trust.svg`,
  },
  {
    title: "Think in First Principles",
    description:
      "We break down complex RCM bottlenecks to their fundamentals—building from the ground up rather than patching broken legacy workflows.",
    iconSrc: `${ICON_BASE}/think-first-principles.svg`,
  },
  {
    title: "Attention to Detail",
    description:
      "In healthcare, excellence lives in the details. We sweat the small stuff—the CPT modifiers, the NPI nuances, the portal edge cases—because they matter to your bottom line.",
    iconSrc: `${ICON_BASE}/attention-to-detail.svg`,
  },
] as const;

const CARD_GAP_PX = 24;

function PrincipleCard({
  title,
  description,
  iconSrc,
}: (typeof PRINCIPLES)[number]) {
  return (
    <article
      data-principle-card
      className="flex h-[400px] w-[400px] shrink-0 snap-start flex-col bg-[#000033] p-8 text-white sm:p-10"
    >
      <Image
        src={iconSrc}
        alt=""
        width={47}
        height={47}
        className="h-[47px] w-[47px] shrink-0 object-contain"
        unoptimized
      />
      <h3 className="mt-8 font-sans text-[36px] font-normal leading-[120%] text-white">
        {title}
      </h3>
      <p className="mt-4 min-h-0 flex-1 overflow-y-auto font-sans text-[21px] font-light leading-[120%] text-white [scrollbar-width:thin]">
        {description}
      </p>
    </article>
  );
}

export function PrinciplesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByStep = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("[data-principle-card]") as HTMLElement | null;
    const cardW = first?.getBoundingClientRect().width ?? 320;
    const step = cardW + CARD_GAP_PX;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <SectionWrapper
      id="principles"
      className="bg-[#f3f4f6]"
      innerClassName="max-w-[1600px]"
      aria-labelledby="principles-heading"
    >
      <SectionSplitHeader
        headingId="principles-heading"
        title={
          <>
            Our Operating
            <br />
            Principles
          </>
        }
        description={COMPANY_PRINCIPLES_LEDE}
        tone="light"
      />

      <div
        className="mt-14 flex items-stretch gap-3 sm:mt-16 lg:mt-20"
        role="region"
        aria-label="Operating principles cards"
      >
        <button
          type="button"
          className={cn(
            "hidden size-11 shrink-0 self-center rounded-full border border-black/10 bg-white text-[#000033] shadow-sm transition-opacity md:flex md:items-center md:justify-center",
            !canPrev && "pointer-events-none opacity-35",
          )}
          aria-label="Previous principles"
          disabled={!canPrev}
          onClick={() => scrollByStep(-1)}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className={cn(
            "flex min-w-0 flex-1 touch-pan-x gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "snap-x snap-mandatory",
            "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#000033]/30 focus-visible:ring-offset-2",
          )}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollByStep(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollByStep(1);
            }
          }}
        >
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.title} {...p} />
          ))}
        </div>

        <button
          type="button"
          className={cn(
            "hidden size-11 shrink-0 self-center rounded-full border border-black/10 bg-white text-[#000033] shadow-sm transition-opacity md:flex md:items-center md:justify-center",
            !canNext && "pointer-events-none opacity-35",
          )}
          aria-label="Next principles"
          disabled={!canNext}
          onClick={() => scrollByStep(1)}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </SectionWrapper>
  );
}
