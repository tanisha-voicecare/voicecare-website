/**
 * SEO Utilities
 * Helper functions for generating SEO metadata
 */

import type { Metadata } from 'next';
import { absoluteUrl } from './utils';

// ============================================
// Site Configuration
// ============================================

export const siteConfig = {
  name: 'VoiceCare AI',
  shortName: 'VoiceCare',
  description:
    'Supercharging Healthcare Workers with Care and AI. Automating administrative burdens, creating time for care teams, and improving patient outcomes.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://voicecare.ai',
  ogImage: '/og-image.jpg',
  twitterHandle: '@voicecareai',
  locale: 'en_US',
  themeColor: '#06003F', // Primary brand color
};

// ============================================
// Metadata Generators
// ============================================

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  pathname = '',
  article,
}: PageSEOProps): Metadata {
  const pageTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = absoluteUrl(pathname);
  const ogImageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  const metadata: Metadata = {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: article ? 'article' : 'website',
      locale: siteConfig.locale,
      url: canonicalUrl,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImageUrl],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  // Add article-specific metadata
  if (article && metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    };
  }

  return metadata;
}

/**
 * Generate default site metadata (for layout)
 */
export function generateSiteMetadata(): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    keywords: [
      'healthcare AI',
      'RCM automation',
      'healthcare administration',
      'AI agents',
      'voice AI',
      'healthcare technology',
      'medical billing',
      'patient care',
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    verification: {
      // Add your verification codes here
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
    other: {
      'ahrefs-site-verification':
        '884da3c2afcc9dcab763ae6165f84a6b1fa091b6c9bca30f01ae79395a5ba46c',
    },
  };
}

// ============================================
// JSON-LD Schema Generators
// ============================================

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  sameAs?: string[];
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(org: OrganizationSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    telephone: org.telephone,
    email: org.email,
    address: org.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: org.address.street,
          addressLocality: org.address.city,
          addressRegion: org.address.state,
          postalCode: org.address.postalCode,
          addressCountry: org.address.country,
        }
      : undefined,
    sameAs: org.sameAs,
  };
}

export interface ArticleSchema {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(article: ArticleSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Medical Service JSON-LD schema
 */
export function generateMedicalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    howPerformed: {
      '@type': 'HowToStep',
      text: service.description,
    },
  };
}
