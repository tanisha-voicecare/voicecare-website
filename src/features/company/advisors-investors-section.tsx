"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionSplitHeader } from "@/components/ui/section-split-header";
import { cn } from "@/lib/utils";

import { AdvisorDetailModal } from "./advisor-detail-modal";
import { ADVISORS_AND_INVESTORS } from "./advisors-investors-data";

const SECTION_LEDE =
  "Backed by industry leaders who share our vision for transforming healthcare administration.";

const CARD_WIDTH_PX = 280;
const CARD_GAP_PX = 20;

function roleChipClassName(role: string) {
  if (role === "Investor") return "bg-[#ff4e3a] text-white";
  if (role === "Board Member") return "bg-[#000099] text-white";
  return "bg-white text-[#06003f]";
}

export function AdvisorsInvestorsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const selectedAdvisor =
    selectedIndex !== null ? ADVISORS_AND_INVESTORS[selectedIndex] ?? null : null;

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
    const first = el.querySelector("[data-advisor-card]") as HTMLElement | null;
    const w = first?.getBoundingClientRect().width ?? CARD_WIDTH_PX;
    el.scrollBy({ left: dir * (w + CARD_GAP_PX), behavior: "smooth" });
  }, []);

  return (
    <SectionWrapper
      id="advisors-investors"
      className="bg-[#000033] text-white"
      innerClassName="max-w-[1600px]"
      aria-labelledby="advisors-investors-heading"
    >
      <SectionSplitHeader
        headingId="advisors-investors-heading"
        title={
          <>
            Our Advisors &
            <br />
            Investors
          </>
        }
        description={SECTION_LEDE}
        tone="dark"
      />

      <div
        className="mt-12 sm:mt-14 lg:mt-16"
        role="region"
        aria-label="Advisors and investors"
      >
        <div
          ref={scrollerRef}
          className={cn(
            "flex touch-pan-x items-stretch gap-5 overflow-x-auto scroll-smooth scroll-pl-1 scroll-pr-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "snap-x snap-mandatory",
            "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000033]",
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
          {ADVISORS_AND_INVESTORS.map((advisor, index) => (
            <button
              key={advisor.name}
              type="button"
              data-advisor-card
              aria-label={`${advisor.name}, ${advisor.role}. View details.`}
              className="group flex w-[280px] shrink-0 snap-start flex-col self-stretch text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000033] sm:w-[300px]"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative w-full shrink-0 overflow-hidden rounded-lg bg-white/5 aspect-[3/4]">
                <Image
                  src={advisor.image}
                  alt=""
                  fill
                  className="object-cover grayscale transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 280px, 300px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000033]/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <p className="pointer-events-none absolute bottom-10 left-0 right-0 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  View Details
                </p>
                <div className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)]">
                  <span
                    className={cn(
                      "inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-[11px]",
                      roleChipClassName(advisor.role),
                    )}
                  >
                    {advisor.role}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 flex-col justify-start">
                <h3 className="line-clamp-2 min-h-[2.75rem] text-[18px] font-bold leading-snug text-white transition-colors group-hover:text-[#ff4e3a] sm:min-h-[3rem] sm:text-[20px] md:text-[22px]">
                  {advisor.name}
                </h3>
                <p className="mt-1.5 line-clamp-5 text-[14px] font-light leading-snug text-white/70 sm:text-[15px]">
                  {advisor.designation}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
        <FadeIn>
          <Link
            href="/schedule-demo"
            className="group inline-flex items-center gap-2 font-sans text-[16px] font-normal text-white transition-colors hover:text-white/90"
          >
            <span className="leading-none">Schedule a Demo</span>
            {/* Text arrow shares Satoshi metrics so it centers with the label (SVG icons often sit high). */}
            <span
              className="leading-none text-[#ff4e3a] transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </FadeIn>
        <div className="flex items-center gap-2 sm:ml-auto">
          <button
            type="button"
            className={cn(
              "flex size-11 items-center justify-center bg-white text-[#000033] shadow-sm transition-opacity",
              !canPrev && "pointer-events-none opacity-35",
            )}
            aria-label="Previous advisors"
            disabled={!canPrev}
            onClick={() => scrollByStep(-1)}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            className={cn(
              "flex size-11 items-center justify-center bg-white text-[#000033] shadow-sm transition-opacity",
              !canNext && "pointer-events-none opacity-35",
            )}
            aria-label="Next advisors"
            disabled={!canNext}
            onClick={() => scrollByStep(1)}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <AdvisorDetailModal advisor={selectedAdvisor} onClose={() => setSelectedIndex(null)} />
    </SectionWrapper>
  );
}
