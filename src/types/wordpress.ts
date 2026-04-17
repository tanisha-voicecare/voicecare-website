/**
 * WordPress REST API Type Definitions
 * These types represent the data structures returned by WordPress REST API
 */

// ============================================
// Core WordPress Types
// ============================================

export interface WPRenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WPMediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    thumbnail?: WPMediaSize;
    medium?: WPMediaSize;
    medium_large?: WPMediaSize;
    large?: WPMediaSize;
    full?: WPMediaSize;
    [key: string]: WPMediaSize | undefined;
  };
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: WPMediaDetails;
  caption: WPRenderedContent;
}

export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
}

// ============================================
// Post Types
// ============================================

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  // Embedded data when using _embed parameter
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: (WPCategory | WPTag)[][];
  };
}

export interface WPPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: 'page';
  link: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}

// ============================================
// Custom Post Types for Healthcare
// ============================================

export interface WPService {
  id: number;
  date: string;
  slug: string;
  status: 'publish' | 'draft';
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  featured_media: number;
  acf?: {
    icon?: string;
    short_description?: string;
    benefits?: string[];
    cta_text?: string;
    cta_link?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}

export interface WPDoctor {
  id: number;
  date: string;
  slug: string;
  status: 'publish' | 'draft';
  title: WPRenderedContent;
  content: WPRenderedContent;
  featured_media: number;
  acf?: {
    specialty?: string;
    qualifications?: string;
    experience_years?: number;
    languages?: string[];
    available_days?: string[];
    booking_link?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}

export interface WPTestimonial {
  id: number;
  slug: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  acf?: {
    patient_name?: string;
    rating?: number;
    service_received?: string;
    date_of_visit?: string;
  };
}

// ============================================
// SEO Metadata (Yoast/RankMath compatible)
// ============================================

export interface WPSEOData {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: {
    url: string;
    width: number;
    height: number;
  }[];
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: Record<string, unknown>;
}

// ============================================
// API Response Types
// ============================================

export interface WPAPIResponse<T> {
  data: T;
  total: number;
  totalPages: number;
}

export interface WPMenuLocation {
  name: string;
  description: string;
  slug: string;
}

export interface WPMenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
  classes: string[];
  parent: number;
  order: number;
  children?: WPMenuItem[];
}

export interface WPMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  items: WPMenuItem[];
}

// ============================================
// Site Settings / Options
// ============================================

export interface WPSiteSettings {
  name: string;
  description: string;
  url: string;
  home: string;
  gmt_offset: number;
  timezone_string: string;
  site_logo?: number;
  site_icon?: number;
}

// ============================================
// Form & Contact Types
// ============================================

export interface WPContactFormSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service_interest?: string;
  preferred_date?: string;
  preferred_time?: string;
}

// ============================================
// Contact Form 7 Types
// ============================================

export interface CF7FormData {
  [key: string]: string | File;
}

export interface CF7Response {
  status: 'mail_sent' | 'mail_failed' | 'validation_failed' | 'spam' | 'aborted';
  message: string;
  invalid_fields?: Array<{
    field: string;
    message: string;
  }>;
}

export interface CF7FormConfig {
  formId: string | number;
  fields: CF7FormData;
}

// ============================================
// Job Listings Types
// ============================================

export interface WPJob {
  id: number;
  date: string;
  slug: string;
  status: 'publish' | 'draft';
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  featured_media: number;
  acf?: {
    department?: string;
    location?: string;
    employment_type?: string;
    experience_level?: string;
    salary_range?: string;
    responsibilities?: string;
    requirements?: string;
    benefits?: string;
    application_deadline?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}

export interface ProcessedJob {
  id: number;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryRange?: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  applicationDeadline?: string;
  postedDate: string;
}

// ============================================
// Helper Types for Frontend
// ============================================

export interface ProcessedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modifiedDate: string;
  author: {
    name: string;
    avatar: string;
  } | null;
  featuredImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  readingTime: number;
}

export interface ProcessedService {
  id: number;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string | null;
  image: {
    src: string;
    alt: string;
  } | null;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}
