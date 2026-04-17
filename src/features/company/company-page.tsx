"use client";

import { HeroSection } from "./hero-section";
import { MissionSection } from "./mission-section";
import { PrinciplesSection } from "./principles-section";
import { TeamSection } from "./team-section";
import { AdvisorsInvestorsSection } from "./advisors-investors-section";
import { PartnersSection } from "./partners-section";
import { EhrEcosystemSection } from "./ehr-ecosystem-section";
import { SecuritySection } from "./security-section";

/**
 * Fully refactored Company Page.
 * Organized into a clean vertical narrative with premium animations.
 */
export function CompanyPage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PrinciplesSection />
      <AdvisorsInvestorsSection />
      <PartnersSection />
      <TeamSection />
      <EhrEcosystemSection />
      <SecuritySection />
    </>
  );
}
