import React from "react";
import { CompanyHero } from "@/app/components/company/CompanyHero";
import { AboutUsSection } from "@/app/components/company/AboutUsSection";
import { CEOQuoteSection } from "@/app/components/company/CEOQuoteSection";
import { PrinciplesSection } from "@/app/components/company/PrinciplesSection";
import { AdvisorsSection } from "@/app/components/company/AdvisorsSection";
import { Footer } from "@/app/components/Footer";

interface CompanyProps {
  onNavigate: (
    page: "home" | "about" | "team" | "platform" | "solutions",
  ) => void;
}

export const Company = ({ onNavigate }: CompanyProps) => {
  return (
    <div className="relative bg-white">
      {/* Noise Grain Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
          <filter id="noiseFilterCompany">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                values="0.8;0.82;0.8"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterCompany)" />
        </svg>
      </div>

      <CompanyHero />
      <AboutUsSection />
      <CEOQuoteSection />
      <PrinciplesSection />
      <AdvisorsSection />
      <Footer />
    </div>
  );
};