import {
  EngineBehindAgent,
  HeroSection,
  PartnersSection,
  RCMWorkflowAnimation,
  WorkflowSection,
  Divider,
} from "@/components/home";

import { PrecisionSection } from "./precision-section";
import { SolutionsSection } from "./solutions-section";

/**
 * Homepage: hero through EngineBehindAgent from `components/home`, plus solutions and precision.
 */
export function LandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <Divider />
      <PartnersSection />
      <Divider />
      <WorkflowSection />
      <RCMWorkflowAnimation />
      <EngineBehindAgent />
      <SolutionsSection />
      <PrecisionSection />
    </div>
  );
}
