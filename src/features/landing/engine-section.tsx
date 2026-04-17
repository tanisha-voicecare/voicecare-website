"use client";

import Image from "next/image";

import { Cpu, FileCheck, Phone, ShieldCheck } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";

const bullets = [
  { icon: Cpu, label: "LLM-powered reasoning across modalities" },
  { icon: ShieldCheck, label: "HIPAA-ready logging and audit trails" },
  { icon: Phone, label: "Voice : For complex payer phone lines" },
  { icon: FileCheck, label: "Web API : For instantaneous portal navigation" },
] as const;

export function EngineSection() {
  return (
    <SectionWrapper
      id="engine"
      aria-labelledby="engine-heading"
      className="bg-[#02007f] text-white"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <FadeIn>
            <h2
              id="engine-heading"
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              The Engine
              <br />
              Behind the Agent
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
              Meet Joy: The reasoning engine that powers our autonomous workforce.
              Joy doesn&apos;t just process data—she navigates the nuance of payer
              logic using the most efficient modality available.
            </p>
          </FadeIn>
          <ul className="mt-10 space-y-4">
            {bullets.map(({ icon: Icon, label }, i) => (
              <FadeIn key={label} delay={0.08 + i * 0.04}>
                <li className="flex gap-4 rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <Icon
                    className="mt-0.5 size-5 shrink-0 text-[#ff4e3a]"
                    aria-hidden
                  />
                  <span className="text-base leading-snug">{label}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-base text-white/80">
              Fax : For legacy documentation requirements
            </p>
          </FadeIn>
        </div>
        <FadeIn
          delay={0.1}
          className="relative mx-auto aspect-square w-full max-w-lg"
        >
          <Image
            src={assets.mockPriorAuth}
            alt="Abstract visualization of the Joy orchestration engine"
            fill
            className="object-cover mix-blend-lighten opacity-90"
            sizes="(max-width: 1024px) 100vw, 480px"
            unoptimized
          />
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
