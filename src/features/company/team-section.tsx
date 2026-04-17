"use client";

import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionSplitHeader } from "@/components/ui/section-split-header";
import { assets } from "@/lib/assets";

import { TeamMember } from "./team-member";

const TEAM = [
  {
    name: "Parag Jhaveri",
    role: "CEO & Founder",
    image: assets.company.team.paragJhaveri,
  },
  {
    name: "Amber Day",
    role: "VP of Sales",
    image: assets.company.team.amberDay,
  },
  {
    name: "Abhishek Pandey",
    role: "Head of AI",
    image: assets.company.team.abhishekPandey,
  },
  {
    name: "Akshay Kore",
    role: "Head of Product & Design",
    image: assets.company.team.akshayKore,
  },
  {
    name: "Shubham Kalburgi",
    role: "Backend Lead",
    image: assets.company.team.shubhamKalburgi,
  },
] as const;

export function TeamSection() {
  return (
    <SectionWrapper id="team" className="bg-[#06003f] text-white" innerClassName="max-w-[1600px]">
      <SectionSplitHeader headingId="team-heading" title="Team" tone="dark" />

      <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:mt-20 lg:gap-x-6 lg:gap-y-14 xl:grid-cols-5 xl:gap-x-5">
        {TEAM.map((member, idx) => (
          <FadeIn key={member.name} delay={idx * 0.06}>
            <TeamMember name={member.name} role={member.role} image={member.image} />
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
