/**
 * WordPress REST API Client
 * Handles all communication with the headless WordPress CMS
 */

import type {
  WPPost,
  WPPage,
  WPService,
  WPCategory,
  WPAuthor,
  WPSiteSettings,
  WPMenu,
  ProcessedPost,
  ProcessedService,
} from '@/types';

// ============================================
// Configuration
// ============================================

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';

// Only warn in development, not in production builds
if (!WORDPRESS_API_URL && process.env.NODE_ENV === 'development') {
  console.warn(
    'Warning: WORDPRESS_API_URL is not set. WordPress API calls will return empty data. Set it in .env.local to enable CMS features.'
  );
}

const API_BASE = WORDPRESS_API_URL ? `${WORDPRESS_API_URL}/wp-json/wp/v2` : '';

/**
 * Check if WordPress is configured
 */
export function isWordPressConfigured(): boolean {
  return Boolean(WORDPRESS_API_URL);
}

// ISR revalidation time in seconds (10 minutes default)
export const REVALIDATE_TIME = 600;

// ============================================
// Fetch Wrapper with Error Handling
// ============================================

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // Return empty data if WordPress is not configured
  if (!WORDPRESS_API_URL) {
    console.warn('WordPress API not configured. Returning empty data.');
    return [] as unknown as T;
  }

  const { revalidate = REVALIDATE_TIME, tags, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    next: {
      revalidate: revalidate === false ? 0 : revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// Post Functions
// ============================================

export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const { page = 1, perPage = 10, categoryId, search } = params || {};

  const searchParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    _embed: 'true',
    status: 'publish',
  });

  if (categoryId) searchParams.set('categories', categoryId.toString());
  if (search) searchParams.set('search', search);

  const response = await fetch(`${API_BASE}/posts?${searchParams}`, {
    next: { revalidate: REVALIDATE_TIME, tags: ['posts'] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);

  return { posts, total, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${slug}&_embed=true`, {
    tags: ['posts', `post-${slug}`],
  });

  return posts.length > 0 ? posts[0] : null;
}

export async function getPostById(id: number): Promise<WPPost> {
  return fetchAPI<WPPost>(`/posts/${id}?_embed=true`, {
    tags: ['posts', `post-${id}`],
  });
}

// ============================================
// Page Functions
// ============================================

export async function getPages(): Promise<WPPage[]> {
  return fetchAPI<WPPage[]>('/pages?_embed=true&per_page=100', {
    tags: ['pages'],
  });
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>(`/pages?slug=${slug}&_embed=true`, {
    tags: ['pages', `page-${slug}`],
  });

  return pages.length > 0 ? pages[0] : null;
}

// ============================================
// Services (Custom Post Type)
// ============================================

export async function getServices(): Promise<WPService[]> {
  try {
    return await fetchAPI<WPService[]>('/services?_embed=true&per_page=100', {
      tags: ['services'],
    });
  } catch {
    // Fallback if custom post type not configured
    console.warn('Services endpoint not available. Returning empty array.');
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<WPService | null> {
  try {
    const services = await fetchAPI<WPService[]>(`/services?slug=${slug}&_embed=true`, {
      tags: ['services', `service-${slug}`],
    });
    return services.length > 0 ? services[0] : null;
  } catch {
    return null;
  }
}

// ============================================
// Categories & Taxonomy
// ============================================

export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/categories?per_page=100&hide_empty=true', {
    tags: ['categories'],
  });
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const categories = await fetchAPI<WPCategory[]>(`/categories?slug=${slug}`, {
    tags: ['categories'],
  });

  return categories.length > 0 ? categories[0] : null;
}

// ============================================
// Authors
// ============================================

export async function getAuthors(): Promise<WPAuthor[]> {
  return fetchAPI<WPAuthor[]>('/users?per_page=100&who=authors', {
    tags: ['authors'],
  });
}

export async function getAuthorBySlug(slug: string): Promise<WPAuthor | null> {
  const authors = await fetchAPI<WPAuthor[]>(`/users?slug=${slug}`, {
    tags: ['authors'],
  });

  return authors.length > 0 ? authors[0] : null;
}

// ============================================
// Site Settings
// ============================================

export async function getSiteSettings(): Promise<WPSiteSettings> {
  // Note: This endpoint might need custom REST route in WordPress
  const url = `${WORDPRESS_API_URL}/wp-json`;
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME * 6, tags: ['settings'] },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch site settings');
  }

  return response.json();
}

// ============================================
// Menu Functions
// ============================================

export async function getMenuByLocation(location: string): Promise<WPMenu | null> {
  try {
    // Requires WP REST API Menus plugin or custom endpoint
    const menus = await fetchAPI<WPMenu[]>(
      `${WORDPRESS_API_URL}/wp-json/menus/v1/menus?location=${location}`,
      { tags: ['menus'] }
    );
    return menus.length > 0 ? menus[0] : null;
  } catch {
    console.warn(`Menu for location "${location}" not available.`);
    return null;
  }
}

// ============================================
// Data Processing Utilities
// ============================================

/**
 * Calculate reading time based on word count
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]+>/g, ''); // Strip HTML
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

/**
 * Process raw WP post into frontend-friendly format
 */
export function processPost(post: WPPost): ProcessedPost {
  const embedded = post._embedded;
  const author = embedded?.author?.[0];
  const featuredMedia = embedded?.['wp:featuredmedia']?.[0];
  const categories = embedded?.['wp:term']?.[0] as WPCategory[] | undefined;

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date,
    modifiedDate: post.modified,
    author: author
      ? {
          name: author.name,
          avatar: author.avatar_urls['96'],
        }
      : null,
    featuredImage: featuredMedia
      ? {
          src: featuredMedia.source_url,
          alt: featuredMedia.alt_text || stripHtml(post.title.rendered),
          width: featuredMedia.media_details?.width || 1200,
          height: featuredMedia.media_details?.height || 630,
        }
      : null,
    categories:
      categories?.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],
    readingTime: calculateReadingTime(post.content.rendered),
  };
}

/**
 * Process raw WP service into frontend-friendly format
 */
export function processService(service: WPService): ProcessedService {
  const featuredMedia = service._embedded?.['wp:featuredmedia']?.[0];

  return {
    id: service.id,
    slug: service.slug,
    title: stripHtml(service.title.rendered),
    description: service.content.rendered,
    shortDescription: service.acf?.short_description || stripHtml(service.excerpt.rendered),
    icon: service.acf?.icon || null,
    image: featuredMedia
      ? {
          src: featuredMedia.source_url,
          alt: featuredMedia.alt_text || stripHtml(service.title.rendered),
        }
      : null,
    benefits: service.acf?.benefits || [],
    ctaText: service.acf?.cta_text || 'Learn More',
    ctaLink: service.acf?.cta_link || `/services/${service.slug}`,
  };
}

// ============================================
// Static Generation Helpers
// ============================================

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchAPI<WPPost[]>('/posts?per_page=100&_fields=slug', {
    tags: ['posts'],
  });

  return posts.map((post) => post.slug);
}

/**
 * Get all page slugs for static generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const pages = await fetchAPI<WPPage[]>('/pages?per_page=100&_fields=slug', {
    tags: ['pages'],
  });

  return pages.map((page) => page.slug);
}

/**
 * Get all service slugs for static generation
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await fetchAPI<WPService[]>('/services?per_page=100&_fields=slug', {
      tags: ['services'],
    });
    return services.map((service) => service.slug);
  } catch {
    return [];
  }
}

// ============================================
// Contact Form 7 Integration
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

/**
 * Submit form data to WordPress Contact Form 7
 * Requires Contact Form 7 plugin with REST API enabled
 * 
 * @param formId - The Contact Form 7 form ID (found in WordPress admin)
 * @param data - Form field data as key-value pairs
 */
export async function submitContactForm7(
  formId: string | number,
  data: CF7FormData
): Promise<CF7Response> {
  // Return error if WordPress is not configured
  if (!WORDPRESS_API_URL) {
    console.warn('WordPress API not configured. Form submission disabled.');
    return {
      status: 'aborted',
      message: 'Form submission is not configured. Please contact support.',
    };
  }

  const url = `${WORDPRESS_API_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
  
  // Create FormData for multipart submission (required by CF7)
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header - browser will set it with boundary for FormData
  });
  
  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// ============================================
// WPForms Integration (Alternative)
// ============================================

export interface WPFormsData {
  [key: string]: string | number | boolean;
}

/**
 * Submit form data to WPForms via REST API
 * Requires WPForms plugin with API addon
 */
export async function submitWPForms(
  formId: string | number,
  data: WPFormsData
): Promise<{ success: boolean; message: string }> {
  const url = `${WORDPRESS_API_URL}/wp-json/wpforms/v1/forms/${formId}/entries`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: data }),
  });
  
  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// ============================================
// Generic Form Submission via Custom Endpoint
// ============================================

export interface GenericFormSubmission {
  form_name: string;
  fields: Record<string, string | number | boolean>;
  meta?: {
    page_url?: string;
    user_agent?: string;
    timestamp?: string;
  };
}

/**
 * Submit form to a custom WordPress REST endpoint
 * Requires a custom plugin or functions.php endpoint in WordPress
 */
export async function submitCustomForm(
  endpoint: string,
  data: GenericFormSubmission
): Promise<{ success: boolean; message: string; submission_id?: number }> {
  const url = `${WORDPRESS_API_URL}/wp-json/voicecare/v1/${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// ============================================
// Job Listings (Custom Post Type)
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

interface WPRenderedContent {
  rendered: string;
  protected?: boolean;
}

interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
  };
}

/**
 * Get all job listings from WordPress
 */
export async function getJobs(): Promise<WPJob[]> {
  try {
    return await fetchAPI<WPJob[]>('/jobs?_embed=true&per_page=100&status=publish', {
      tags: ['jobs'],
    });
  } catch {
    console.warn('Jobs endpoint not available. Returning empty array.');
    return [];
  }
}

/**
 * Get a single job by slug
 */
export async function getJobBySlug(slug: string): Promise<WPJob | null> {
  try {
    const jobs = await fetchAPI<WPJob[]>(`/jobs?slug=${slug}&_embed=true`, {
      tags: ['jobs', `job-${slug}`],
    });
    return jobs.length > 0 ? jobs[0] : null;
  } catch {
    return null;
  }
}

/**
 * Get all job slugs for static generation
 */
export async function getAllJobSlugs(): Promise<string[]> {
  try {
    const jobs = await fetchAPI<WPJob[]>('/jobs?per_page=100&_fields=slug', {
      tags: ['jobs'],
    });
    return jobs.map((job) => job.slug);
  } catch {
    return [];
  }
}
