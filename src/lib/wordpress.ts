import type { ProcessedPost, WPCategory, WPPost } from "@/types/wordpress";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";
const API_BASE = WORDPRESS_API_URL ? `${WORDPRESS_API_URL}/wp-json/wp/v2` : "";
export const REVALIDATE_TIME = 30;

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  if (!WORDPRESS_API_URL) {
    return [] as unknown as T;
  }

  const { revalidate = REVALIDATE_TIME, tags, ...fetchOptions } = options;
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]+>/g, "");
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const { page = 1, perPage = 10, categoryId, search } = params || {};

  if (!API_BASE) return { posts: [], total: 0, totalPages: 0 };

  const searchParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    _embed: "true",
    status: "publish",
  });
  if (categoryId) searchParams.set("categories", categoryId.toString());
  if (search) searchParams.set("search", search);

  const response = await fetch(`${API_BASE}/posts?${searchParams}`, {
    next: { revalidate: REVALIDATE_TIME, tags: ["posts"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  const total = parseInt(response.headers.get("X-WP-Total") || "0", 10);
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "0", 10);
  return { posts, total, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${slug}&_embed=true`, {
    tags: ["posts", `post-${slug}`],
  });
  return posts[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>("/categories?per_page=100&hide_empty=true", {
    tags: ["categories"],
  });
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchAPI<WPPost[]>("/posts?per_page=100&_fields=slug", {
    tags: ["posts"],
  });
  return posts.map((post) => post.slug);
}

export function processPost(post: WPPost): ProcessedPost {
  const embedded = post._embedded;
  const author = embedded?.author?.[0];
  const featuredMedia = embedded?.["wp:featuredmedia"]?.[0];
  const categories = embedded?.["wp:term"]?.[0] as WPCategory[] | undefined;

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
          avatar: author.avatar_urls["96"],
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
