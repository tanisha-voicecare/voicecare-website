/**
 * Central export for all TypeScript types
 */

export * from './wordpress';

// ============================================
// Component Props Types
// ============================================

export interface BaseComponentProps {
  className?: string;
  id?: string;
}

export interface SectionProps extends BaseComponentProps {
  heading?: string;
  subheading?: string;
  background?: 'white' | 'light' | 'dark' | 'primary' | 'gradient';
}

// ============================================
// Navigation Types
// ============================================

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavLink[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ============================================
// Form Types
// ============================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

// ============================================
// UI State Types
// ============================================

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// ============================================
// CMS Content Blocks
// ============================================

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export interface ServiceCardContent {
  id: number;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface TestimonialContent {
  id: number;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorImage?: string;
  rating?: number;
}

export interface CTAContent {
  headline: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'primary' | 'secondary';
}
