/**
 * Static company information shared across the site.
 */

export type SocialLink = {
  readonly platform: string;
  readonly href: string;
  readonly label: string;
};

export const socialLinks: readonly SocialLink[] = [
  { platform: "linkedin", href: "https://linkedin.com/company/voicecareai", label: "LinkedIn" },
  { platform: "twitter", href: "https://twitter.com/voicecareai", label: "X (Twitter)" },
] as const;

export const companyInfo = {
  legalName: "VoiceCare AI, Inc.",
  copyrightYear: new Date().getFullYear(),
} as const;
