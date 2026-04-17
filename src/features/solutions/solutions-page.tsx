"use client";

import { SolutionsHero } from "./solutions-hero";
import { SolutionsIndustriesSection } from "./solutions-industries-section";
import { SolutionsSkillsCardsSection } from "./solutions-skills-cards-section";

/**
 * Solutions marketing page — layout and copy from design export (src.zip).
 */
export function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsSkillsCardsSection />
      <SolutionsIndustriesSection />
    </>
  );
}
