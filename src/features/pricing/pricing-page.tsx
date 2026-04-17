"use client";

import { HeroSection } from "./hero-section";
import { PricingTiers } from "./pricing-tiers";
import { ROICalculator } from "./roi-calculator";
import { ContactForm } from "./contact-form";

/**
 * Fully refactored Pricing Page.
 * Follows the consistent project design system.
 */
export function PricingPage() {
  return (
    <>
      <HeroSection />
      <PricingTiers />
      <ROICalculator />
      <ContactForm />
    </>
  );
}
