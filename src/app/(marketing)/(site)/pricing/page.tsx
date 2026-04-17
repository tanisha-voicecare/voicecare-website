import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing/pricing-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing | VoiceCare AI",
  description: "Explore our performance-based pricing tiers and calculate your ROI with VoiceCare AI's autonomous RCM workforce.",
});

export default function Page() {
  return <PricingPage />;
}
