/**
 * Shared TypeScript types used across the application.
 */

/** Generic props for a section with an optional className override. */
export type SectionProps = {
  className?: string;
};

/** Represents a single logo item in a logo strip. */
export type LogoItem = {
  src: string;
  alt: string;
};

/** A CTA button descriptor used in hero sections and cards. */
export type CtaItem = {
  label: string;
  href: string;
  variant?: string;
};
