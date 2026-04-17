"use client";

import Image from "next/image";
import { useState } from "react";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const workflows = [
  {
    id: "prior-auth",
    label: "Prior Authorization",
    description:
      "End-to-end clinical submission, portal navigation, and status tracking",
  },
  {
    id: "benefits",
    label: "Benefit Verification",
    description:
      "Real-time discovery of coverage, deductibles, and out-of-network benefits.",
  },
  {
    id: "claims",
    label: "Claims & Denials",
    description:
      "Autonomous status checks, intelligent appeals, and ERA reconciliation.",
  },
  {
    id: "receptionist",
    label: "AI Receptionist",
    description:
      "24/7 patient scheduling and intake via voice and SMS, synced to your schedule.",
  },
] as const;

export function WorkflowSection() {
  const [activeId, setActiveId] = useState<string>(workflows[0].id);

  return (
    <SectionWrapper
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative overflow-hidden bg-[#02007f]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Image
          src={assets.heroTexture}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
          unoptimized
        />
      </div>
      <div className="relative">
        <FadeIn>
          <h2
            id="workflow-heading"
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            One Agent.
            <br />
            Every RCM Workflow.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ul className="space-y-0">
              {workflows.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        "w-full border-b border-white/15 py-6 text-left transition-colors",
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white/70"
                      )}
                    >
                      <span className="block text-2xl font-medium sm:text-3xl">
                        {item.label}
                      </span>
                      {isActive ? (
                        <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/90">
                          {item.description}
                        </p>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#06003f]/80 shadow-2xl ring-1 ring-white/10">
              <Image
                src={assets.mockPriorAuth}
                alt="Prior authorization workflow status in the VoiceCare AI console"
                fill
                className="object-cover mix-blend-lighten"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/70 sm:text-base">
              Prior Authorization · Completed — Joy orchestrating payer touchpoints
            </p>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
