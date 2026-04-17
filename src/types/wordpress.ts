export interface WPRenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  avatar_urls: {
    "96": string;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: WPRenderedContent;
  excerpt: WPRenderedContent;
  content: WPRenderedContent;
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPFeaturedMedia[];
    "wp:term"?: WPCategory[][];
  };
}

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
