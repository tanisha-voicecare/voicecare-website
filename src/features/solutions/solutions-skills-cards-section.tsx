"use client";

import type { ComponentType } from "react";

import {
  AIReceptionistVisualization,
  BenefitVerificationVisualization,
  ClaimsAndDenialsVisualization,
  PriorAuthVisualization,
} from "@/components/home";

type SkillSection = { label: string; text: string };

type SkillCardConfig = {
  id: string;
  title: string;
  bgColor: string;
  sections: SkillSection[];
  Animation: ComponentType;
  /** When true, copy is on the right column and animation on the left */
  alignAnimationLeft: boolean;
};

const SKILL_CARD_HEIGHT_PX = 700;
/**
 * Invisible heading block + `mt-4` before cards — keeps sticky track aligned with layout.
 * (Measured ≈ title row + description + padding; buffer avoids early unpin.)
 */
const SKILLS_STICKY_TOP_RESERVE_PX = 280;

function getStickySkillsHeaderTrackHeightPx(cardCount: number) {
  return (
    SKILLS_STICKY_TOP_RESERVE_PX +
    cardCount * (SKILL_CARD_HEIGHT_PX + SKILL_CARD_HEIGHT_PX)
  );
}

const solutionsSkillCards: SkillCardConfig[] = [
  {
    id: "01",
    title: "AI Receptionist & Patient Scheduling",
    bgColor: "bg-[#02007F]",
    alignAnimationLeft: false,
    sections: [
      { label: "The Job:", text: 'A fluid, multi-modal "Front Door."' },
      {
        label: "Capability:",
        text: "24/7 inbound scheduling and intake via Voice and SMS, synced directly to your schedule.",
      },
      {
        label: "The Edge:",
        text: 'Joy understands insurance nuance, answering patient questions like "Is my specific plan covered for this procedure?"',
      },
    ],
    Animation: AIReceptionistVisualization,
  },
  {
    id: "02",
    title: "Benefit Verification & Discovery",
    bgColor: "bg-[#06003F]",
    alignAnimationLeft: true,
    sections: [
      {
        label: "The Job:",
        text: "Eradicate eligibility-related denials before the patient arrives.",
      },
      {
        label: "Capability:",
        text: "Real-time discovery of primary, secondary, and tertiary coverage.",
      },
      {
        label: "The Edge:",
        text: 'Joy extracts granular details (remaining maximums, deductibles, OON benefits) that standard "dumb" eligibility tools miss.',
      },
    ],
    Animation: BenefitVerificationVisualization,
  },
  {
    id: "03",
    title: "Prior Authorization",
    bgColor: "bg-[#02007F]",
    alignAnimationLeft: false,
    sections: [
      { label: "The Job :", text: 'Navigate the "Portal Maze" from submission to approval' },
      {
        label: "Capability :",
        text: "Joy identifies required clinical documentation, uploads it to payer portals, and monitors status updates in real-time.",
      },
      {
        label: "The Edge :",
        text: '24/7 "Auth-Watching" ensures no request sits idle. If a payer stalls, Joy initiates a follow-up call.',
      },
    ],
    Animation: PriorAuthVisualization,
  },
  {
    id: "04",
    title: "Claims & Denials Resolution",
    bgColor: "bg-[#06003F]",
    alignAnimationLeft: true,
    sections: [
      { label: "The Job:", text: "Recover revenue trapped in legacy payer logic." },
      {
        label: "Capability:",
        text: "Joy scans ERAs, identifies rejection codes, cross-references EHR data, and submits appeals via portal, fax, or voice.",
      },
      {
        label: "Revenue Integrity:",
        text: "Recover trapped cash with zero manual status calls.",
      },
      {
        label: "The Edge:",
        text: '"Reasoning-based" appeals: Joy doesn\'t just resubmit; she identifies why it failed and fixes the underlying data.',
      },
    ],
    Animation: ClaimsAndDenialsVisualization,
  },
];

function SkillsStickyHeader() {
  return (
    <div className="mx-[0px] mt-[0px] flex items-start justify-between gap-12">
      <h2 className="font-satoshi text-[64px] font-light leading-tight text-black">Voicecare skills</h2>
      <p className="mx-[0px] mb-[0px] mt-[38px] max-w-xl pt-3 text-[15px] text-gray-600 font-satoshi">
        These are Voicecare&apos;s core capabilities that can be deployed by Joy individually or as a
        complete RCM orchestration
      </p>
    </div>
  );
}

/**
 * Sticky stacked skill cards with alternating copy / visualization columns.
 */
export function SolutionsSkillsCardsSection() {
  const stickyHeaderTrackPx = getStickySkillsHeaderTrackHeightPx(solutionsSkillCards.length);

  return (
    <section className="relative z-30 w-full bg-white px-6 py-16 lg:px-12">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="invisible border-b border-transparent pb-6" aria-hidden>
          <SkillsStickyHeader />
        </div>

        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-40"
          style={{ height: `${stickyHeaderTrackPx}px` }}
        >
          <div className="sticky top-14">
            <div className="pointer-events-auto border-b border-transparent bg-white pb-6">
              <SkillsStickyHeader />
            </div>
          </div>
        </div>

        <div className="relative mt-4 pb-px">
          {solutionsSkillCards.map((card, index) => {
            const Animation = card.Animation;
            const animationLeft = card.alignAnimationLeft;

            return (
              <div
                key={card.id}
                className={`sticky top-[200px] ${card.bgColor} grid h-[700px] grid-cols-1 overflow-hidden rounded-none shadow-2xl md:grid-cols-2`}
                style={{
                  zIndex: 20 + index,
                  marginBottom: `${SKILL_CARD_HEIGHT_PX}px`,
                }}
              >
                <div className="absolute top-0 left-1/2 hidden h-full w-px bg-white/20 md:block" />

                <div className="relative flex flex-col py-8 md:py-12">
                  {!animationLeft ? (
                    <div>
                      <h3 className="mx-[0px] mt-[-27px] mb-[0px] px-8 pb-4 font-satoshi text-[28px] font-light leading-tight text-white md:px-12 md:text-[32px]">
                        {card.title}
                      </h3>
                      <div className="mb-6 h-px w-full bg-white/30" />
                      <div className="space-y-6 px-8 md:px-12">
                        {card.sections.map((section, idx) => (
                          <p key={idx} className="font-satoshi text-[15px] font-light leading-relaxed text-white">
                            {section.label} {section.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center px-6 py-8 md:px-8 md:py-12">
                      <div className="h-full w-full max-w-[550px] scale-90">
                        <Animation />
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col py-8 md:py-12">
                  {animationLeft ? (
                    <div>
                      <h3 className="mx-[0px] mt-[-27px] mb-[0px] px-8 pb-4 font-satoshi text-[28px] font-light leading-tight text-white md:px-12 md:text-[32px]">
                        {card.title}
                      </h3>
                      <div className="mb-6 h-px w-full bg-white/30" />
                      <div className="space-y-6 px-8 md:px-12">
                        {card.sections.map((section, idx) => (
                          <p key={idx} className="font-satoshi text-[15px] font-light leading-relaxed text-white">
                            {section.label} {section.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center px-6 py-8 md:px-8 md:py-12">
                      <div className="h-full w-full max-w-[550px] scale-90">
                        <Animation />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
