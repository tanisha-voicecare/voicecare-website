/**
 * Design Tokens - VoiceCare AI
 * ================================
 * Extracted from: designer-src/src/
 * Verified against: https://craft-juror-27577775.figma.site/
 * 
 * DO NOT modify these values without verifying against Figma source.
 * All values are 1:1 matches from designer-src implementation.
 */

// ============================================
// COLORS - Core Palette
// ============================================

export const colors = {
  // Primary Brand Colors (from theme.css :root)
  primary: {
    DEFAULT: '#06003F',      // --primary: Navy
    foreground: '#FFFFFF',   // --primary-foreground
  },
  
  // Accent Colors (from theme.css :root)
  accent: {
    DEFAULT: '#FF4E3A',      // --accent: Coral/Orange
    foreground: '#FFFFFF',   // --accent-foreground
  },
  
  // Secondary (from theme.css :root)
  secondary: {
    DEFAULT: '#02007F',      // --secondary
    foreground: '#FFFFFF',   // --secondary-foreground
  },
  
  // Background & Surface (from theme.css :root)
  background: '#FFFFFF',     // --background
  foreground: '#06003F',     // --foreground
  
  // Muted (from theme.css :root)
  muted: {
    DEFAULT: '#f5f5f7',      // --muted
    foreground: '#666680',   // --muted-foreground
  },
  
  // Card (from theme.css :root)
  card: {
    DEFAULT: '#FFFFFF',      // --card
    foreground: '#06003F',   // --card-foreground
  },
  
  // Border (from theme.css :root)
  border: 'rgba(0, 0, 0, 0.08)',  // --border
  
  // Destructive (from theme.css :root)
  destructive: {
    DEFAULT: '#d4183d',      // --destructive
    foreground: '#FFFFFF',   // --destructive-foreground
  },
  
  // Input (from theme.css :root)
  input: {
    DEFAULT: 'transparent',  // --input
    background: '#f3f3f5',   // --input-background
  },
  
  // Ring (from theme.css :root)
  ring: '#000000',           // --ring
} as const;


// ============================================
// COLORS - Company Page Specific
// (Extracted from Company.tsx inline styles)
// ============================================

export const companyColors = {
  // Mission Card (from Company.tsx line 198-200)
  missionCard: {
    dark: '#2C3E50',
    mid: '#34495E',
  },
  
  // Mission Icon Box (from Company.tsx line 235)
  missionIcon: {
    light: '#4A5568',
    dark: '#2D3748',
  },
  
  // CEO Quote Section (from Company.tsx line 276)
  ceoQuote: {
    purple1: '#1a0f3d',
    purple2: '#2d1147',
  },
  
  // About Us Section (from Company.tsx line 391)
  aboutUs: {
    purple: '#3D1B5F',
  },
  
  // Radial Glow (from Company.tsx line 280)
  glow: {
    purple: '#8B3A8B',
  },
  
  // Section Backgrounds (from Company.tsx)
  sectionBg: {
    light: '#FAFBFC',        // Operating Principles (line 331)
    card: '#F8F9FA',         // Advisor image fallback, tags (lines 472, 503)
  },
} as const;


// ============================================
// GRADIENTS
// All gradients use Tailwind's "to-br" = 135deg angle
// ============================================

export const gradients = {
  // Hero Section (from Company.tsx line 152)
  hero: {
    angle: '135deg',  // bg-gradient-to-br
    stops: ['#06003F', '#FF4E3A'],
    css: 'linear-gradient(135deg, #06003F 0%, #FF4E3A 100%)',
  },
  
  // CEO Quote Background (from Company.tsx line 276)
  ceoQuote: {
    angle: '135deg',  // bg-gradient-to-br
    stops: ['#06003F', '#1a0f3d', '#2d1147'],
    css: 'linear-gradient(135deg, #06003F 0%, #1a0f3d 50%, #2d1147 100%)',
  },
  
  // CEO Quote Radial Glow (from Company.tsx line 280)
  ceoQuoteGlow: {
    type: 'radial',
    stops: [
      'rgba(255, 78, 58, 0.4)',   // #FF4E3A at 40%
      'rgba(139, 58, 139, 0.3)',  // #8B3A8B at 30%
      'transparent',
    ],
    css: 'radial-gradient(circle, rgba(255, 78, 58, 0.4) 0%, rgba(139, 58, 139, 0.3) 50%, transparent 100%)',
  },
  
  // About Us Card (from Company.tsx line 391)
  aboutUs: {
    angle: '135deg',  // bg-gradient-to-br
    stops: ['#06003F', '#3D1B5F', '#FF4E3A'],
    css: 'linear-gradient(135deg, #06003F 0%, #3D1B5F 50%, #FF4E3A 100%)',
  },
  
  // Mission Card Border (from Company.tsx line 198)
  missionCardBorder: {
    angle: '135deg',  // bg-gradient-to-br
    stops: ['#2C3E50', '#34495E', '#2C3E50'],
    css: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
  },
  
  // Mission Icon Box (from Company.tsx line 235)
  missionIcon: {
    angle: '135deg',  // bg-gradient-to-br
    stops: ['#4A5568', '#2D3748'],
    css: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
  },
} as const;


// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font Family (from fonts.css)
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    serif: 'Georgia, serif',  // Used for quote marks (line 292)
  },
  
  // Font Weights (from fonts.css @import and theme.css)
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Font Sizes - Extracted from Company.tsx
  // Format: [mobile, desktop] or single value
  fontSize: {
    // Headlines
    heroH1: { mobile: '84px', desktop: '96px' },     // line 164
    sectionH2Large: '56px',                          // lines 402, 452
    sectionH2Medium: '48px',                         // lines 181, 340
    
    // Quote
    quoteMark: '80px',                               // line 292
    quoteText: '28px',                               // line 295
    
    // Card Titles
    cardTitle: '24px',                               // line 483
    
    // Body Text
    bodyLarge: '20px',                               // lines 302, 455
    body: '18px',                                    // lines 161, 184, 343, 405
    bodySmall: '16px',                               // line 305
    bodyXSmall: '15px',                              // lines 376, 489, 494
    
    // Labels & Tags
    roleLabel: '14px',                               // line 486
    tag: '12px',                                     // line 503
  },
  
  // Line Heights (Tailwind conversions)
  lineHeight: {
    none: 1,           // leading-none
    tight: 1.1,        // leading-[1.1] (line 164)
    snug: 1.25,        // leading-tight
    normal: 1.5,       // default
    relaxed: 1.625,    // leading-relaxed
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.04em',   // tracking-[-0.04em] (line 164)
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',      // tracking-wide (lines 161, 486)
  },
} as const;


// ============================================
// SPACING
// Base unit: 4px (Tailwind default)
// ============================================

export const spacing = {
  // Padding - Section Level
  section: {
    paddingY: {
      sm: '96px',    // py-24
      md: '128px',   // py-32
    },
    paddingX: {
      mobile: '24px',   // px-6
      tablet: '48px',   // px-12
      desktop: '64px',  // px-16
    },
    paddingTop: {
      hero: '160px',    // pt-40
    },
    paddingBottom: {
      hero: '96px',     // pb-24
    },
  },
  
  // Padding - Component Level
  component: {
    card: '32px',          // p-8
    cardLarge: '64px',     // p-16
    cardXLarge: '96px',    // p-24
    button: {
      x: '32px',           // px-8
      y: '16px',           // py-4
    },
    tag: {
      x: '16px',           // px-4
      y: '8px',            // py-2
    },
  },
  
  // Margins
  margin: {
    xs: '4px',     // mb-1
    sm: '8px',     // mb-2
    md: '16px',    // mb-4
    lg: '24px',    // mb-6
    xl: '32px',    // mb-8
    '2xl': '48px', // mb-12
    '3xl': '64px', // mt-16
    '4xl': '80px', // mb-20
  },
  
  // Gap (Grid/Flex)
  gap: {
    xs: '12px',    // gap-3
    sm: '16px',    // gap-4
    md: '32px',    // gap-8
    lg: '40px',    // gap-10
    xl: '48px',    // gap-12
    '2xl': '64px', // gap-16
  },
  
  // Special Spacing
  hero: {
    bannerInset: '48px',  // left-12, right-12
  },
  attribution: {
    borderLeft: '2px',    // border-l-2
    paddingLeft: '24px',  // pl-6
  },
} as const;


// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0px',
  sm: '4px',       // --radius from theme.css
  md: '6px',       // rounded-[6px] - buttons, tags, icon boxes
  lg: '12px',      // rounded-[12px] - cards, images
  xl: '23px',      // rounded-[23px] - mission card inner
  '2xl': '24px',   // rounded-[24px] - mission card outer, icon box
  '3xl': '29px',   // rounded-b-[29px] - hero banner bottom
  full: '9999px',  // rounded-full
} as const;


// ============================================
// CONTAINER MAX-WIDTHS
// ============================================

export const containers = {
  // Tailwind defaults
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  
  // Named containers from Company.tsx
  content: {
    sm: '448px',     // max-w-md
    md: '512px',     // max-w-lg
    lg: '672px',     // max-w-2xl
    xl: '768px',     // max-w-3xl
  },
  section: {
    sm: '896px',     // max-w-4xl (Hero content)
    md: '1024px',    // max-w-5xl (Mission)
    lg: '1152px',    // max-w-6xl (Principles)
    xl: '1280px',    // max-w-7xl (CEO, Advisors)
  },
  wide: {
    inner: '1400px', // About Us inner
    outer: '1800px', // About Us outer
  },
} as const;


// ============================================
// OPACITY VALUES
// ============================================

export const opacity = {
  // Noise/Pattern
  noise: 0.015,      // opacity-[0.015]
  pattern: 0.05,     // opacity-5
  
  // Borders
  borderLight: 0.1,  // border-white/10
  
  // Glows
  glow: 0.3,         // opacity-30
  glowStrong: 0.4,   // from-[#FF4E3A]/40
  
  // Text
  text95: 0.95,      // text-white/95
  text90: 0.9,       // text-white/90
  text80: 0.8,       // text-white/80, text-[#06003F]/80
  text70: 0.7,       // text-[#06003F]/70
  text60: 0.6,       // text-[#06003F]/60
} as const;


// ============================================
// SHADOWS
// ============================================

export const shadows = {
  // None defined explicitly in Company.tsx
  // Using Tailwind defaults
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;


// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================

export const transitions = {
  // Duration (from tailwind.css - cubic-bezier easing)
  duration: {
    fast: '200ms',
    DEFAULT: '300ms',
    slow: '700ms',     // duration-700 (line 476)
    animation: '800ms', // motion duration (lines 158, 290, etc.)
  },
  
  // Easing (from tailwind.css)
  easing: {
    DEFAULT: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  
  // Noise Animation (from Company.tsx lines 132-137)
  noiseAnimation: {
    duration: '8s',
    values: '0.8;0.82;0.8',
    repeatCount: 'indefinite',
  },
} as const;


// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  noise: 0,
  base: 1,
  content: 10,
} as const;


// ============================================
// COMPONENT-SPECIFIC TOKENS
// ============================================

export const components = {
  // Icon Box (from Company.tsx lines 363-368)
  iconBox: {
    size: '48px',              // w-12 h-12
    iconSize: '24px',          // w-6 h-6
    borderRadius: '6px',       // rounded-[6px]
    background: {
      DEFAULT: 'rgba(6, 0, 63, 0.05)',    // bg-[#06003F]/5
      hover: 'rgba(255, 78, 58, 0.1)',    // bg-[#FF4E3A]/10
    },
  },
  
  // Mission Icon Box (from Company.tsx line 235)
  missionIconBox: {
    size: '128px',             // w-32 h-32
    iconSize: '64px',          // width="64" height="64"
    borderRadius: '24px',      // rounded-[24px]
  },
  
  // Advisor Card (from Company.tsx lines 469-510)
  advisorCard: {
    borderRadius: '12px',      // rounded-[12px]
    border: 'rgba(6, 0, 63, 0.1)',  // border-[#06003F]/10
    imageHeight: '288px',      // h-72
    padding: '32px',           // p-8
    hoverScale: 1.05,          // group-hover:scale-105
    hoverDuration: '700ms',    // duration-700
  },
  
  // Tag (from Company.tsx lines 500-506)
  tag: {
    paddingX: '16px',          // px-4
    paddingY: '8px',           // py-2
    borderRadius: '6px',       // rounded-[6px]
    background: '#F8F9FA',     // bg-[#F8F9FA]
    fontSize: '12px',          // text-[12px]
    fontWeight: 500,           // font-medium
  },
  
  // Button - Primary (from Company.tsx line 414)
  buttonPrimary: {
    paddingX: '32px',          // px-8
    paddingY: '16px',          // py-4
    borderRadius: '6px',       // rounded-[6px]
    background: '#FFFFFF',
    color: '#06003F',
    fontWeight: 600,           // font-semibold
    hoverScale: 1.05,          // hover:scale-105
  },
  
  // CEO Image (from Company.tsx lines 318-323)
  ceoImage: {
    borderRadius: '12px',      // rounded-[12px]
    border: 'rgba(255, 255, 255, 0.1)',  // border-white/10
    aspectRatio: '4/5',        // aspect-[4/5]
  },
  
  // About Us Image (from Company.tsx lines 428-433)
  aboutUsImage: {
    maxWidth: '448px',         // max-w-md
    borderRadius: '12px',      // rounded-[12px]
    aspectRatio: '1/1',        // aspect-square
  },
  
  // Mission Card (from Company.tsx lines 193-269)
  missionCard: {
    outerRadius: '24px',       // rounded-[24px]
    innerRadius: '23px',       // rounded-[23px]
    borderWidth: '1px',        // p-1 creates 1px border effect
    minHeight: '400px',        // min-h-[400px]
    paddingMobile: '64px',     // p-16
    paddingDesktop: '96px',    // p-24
    dotPatternSize: '40px',    // width="40" height="40"
    dotRadius: '1.5px',        // r="1.5"
  },
  
  // Hero Banner (from Company.tsx line 152)
  heroBanner: {
    inset: '48px',             // left-12 right-12
    bottomRadius: '29px',      // rounded-b-[29px]
  },
  
  // Radial Glow (from Company.tsx lines 279-281)
  radialGlow: {
    size: '800px',             // w-[800px] h-[800px]
    blur: '48px',              // blur-3xl
    opacity: 0.3,              // opacity-30
  },
} as const;


// ============================================
// EXPORT ALL TOKENS
// ============================================

export const designTokens = {
  colors,
  companyColors,
  gradients,
  typography,
  spacing,
  borderRadius,
  containers,
  opacity,
  shadows,
  transitions,
  zIndex,
  components,
} as const;

export default designTokens;
