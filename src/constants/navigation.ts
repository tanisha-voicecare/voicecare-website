/**
 * Centralised navigation links consumed by both the header and footer.
 * Add or remove items here to update every part of the site at once.
 */

export type NavItem = {
  readonly href: string;
  readonly label: string;
  /** If true the link opens in a new tab. */
  readonly external?: boolean;
};

/** Primary header navigation */
export const primaryNav: readonly NavItem[] = [
  { href: "/solutions", label: "Solutions" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const;

/** Footer layout as seen in design image */
export const footerColumns = [
  {
    links: [
      { href: "/", label: "Home" },
      { href: "/solutions", label: "Solutions" },
    ],
  },
  {
    links: [
      { href: "/company", label: "Company" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    links: [
      { href: "/blog", label: "Blogs" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    links: [
      { href: "/security", label: "Security/Trust center" },
      { href: "/partner-with-us", label: "Partner with us" },
    ],
  },
] as const;
