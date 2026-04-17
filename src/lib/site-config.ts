/**
 * Single source of truth for public site identity used in metadata, JSON-LD,
 * OpenGraph, and structured data across every page.
 */
export const siteConfig = {
  name: "VoiceCare AI",
  shortName: "VoiceCare",
  tagline: "The Autonomous Workforce for High-Precision RCM",
  description:
    "VoiceCare AI automates your entire revenue cycle — from intake to claims — across payer portals, voice, and legacy systems with native EHR integration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-default.png",
  themeColor: "#06003f",
  locale: "en_US",
  keywords: [
    "VoiceCare AI",
    "RCM automation",
    "revenue cycle management",
    "agentic AI",
    "healthcare AI",
    "prior authorization",
    "benefit verification",
    "claims management",
    "EHR integration",
    "autonomous workforce",
  ],
  social: {
    linkedin: "https://linkedin.com/company/voicecareai",
    twitter: "@voicecareai",
  },
} as const;
