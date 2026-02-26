/**
 * Blog Category Page
 * Lists blog posts for a single category
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogHero } from '@/components/blog';
import { Container, Section, Grid, BlogCard } from '@/components/ui';
import { generatePageMetadata } from '@/lib/seo';
import { getPosts, getCategories, getCategoryBySlug, processPost } from '@/lib/wordpress';
import type { ProcessedPost, WPCategory } from '@/types';

/** Format slug as display name (e.g. "product" -> "Product", "company-news" -> "Company news") */
function slugToTitle(s: string): string {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// ============================================
// Types
// ============================================

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Metadata
// ============================================

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return generatePageMetadata({
        title: 'Category Not Found',
        description: 'The requested blog category could not be found.',
        noIndex: true,
      });
    }
    return generatePageMetadata({
      title: `${category.name} | Health Blog`,
      description: category.description || `Read our latest posts in ${category.name}.`,
      pathname: `/blog/category/${slug}`,
    });
  } catch {
    return generatePageMetadata({
      title: 'Blog Category',
      description: 'Browse blog posts by category.',
      pathname: `/blog/category/${slug}`,
    });
  }
}

// ============================================
// ISR Configuration
// ============================================

export const revalidate = 600;

// ============================================
// Data Fetching
// ============================================

async function getCategoryBlogData(slug: string) {
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return null;

    const [postsResult, categoriesResult] = await Promise.allSettled([
      getPosts({ perPage: 9, categoryId: category.id }),
      getCategories(),
    ]);

    let posts: ProcessedPost[] = [];
    if (postsResult.status === 'fulfilled' && Array.isArray(postsResult.value?.posts)) {
      try {
        posts = postsResult.value.posts.map((p) => processPost(p));
      } catch {
        posts = [];
      }
    }

    const categories =
      categoriesResult.status === 'fulfilled' && Array.isArray(categoriesResult.value)
        ? categoriesResult.value
        : [];

    // Normalize so name/description are always strings (some WP setups return different shapes)
    const nameStr =
      typeof (category as { name?: string | { rendered?: string } }).name === 'string'
        ? (category as { name: string }).name
        : (category as { name?: { rendered?: string } }).name?.rendered ?? slugToTitle(String(category.slug ?? ''));
    const descStr = typeof (category as { description?: string }).description === 'string' ? (category as { description: string }).description : '';
    const safeCategory = { ...category, name: nameStr, description: descStr };

    return { category: safeCategory, posts, categories };
  } catch (error) {
    console.error('Error fetching category blog data:', error);
    return null;
  }
}

// ============================================
// Placeholder Post Card
// ============================================

function PlaceholderPostCard({ post, index }: { post: ProcessedPost; index: number }) {
  return (
    <article
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-soft-md hover:shadow-soft-xl transition-all duration-300 w-full min-w-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-primary-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs sm:text-sm text-primary-600">Blog Image</p>
          </div>
        </div>
        {post.categories[0] && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-white/90 backdrop-blur-sm rounded-full text-primary-700">
            {post.categories[0].name}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-[#06003F] mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-3 sm:pt-4 border-t border-[#06003F]/10 text-xs sm:text-sm text-[#06003F]/60">
          <span className="flex items-center gap-x-2">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </span>
          {post.author?.name && (
            <span className="font-medium text-[#06003F]/80 shrink-0">{post.author.name}</span>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================
// Category Filter - matches blog listing (border, brand colors)
// ============================================

/** Only shows categories fetched from WordPress — no extra chips. */
function CategoryFilter({
  categories,
  currentSlug,
}: {
  categories: WPCategory[];
  currentSlug: string;
}) {
  if (categories.length === 0) return null;

  const base =
    'inline-flex items-center px-4 py-2 text-[13px] sm:text-sm font-medium rounded-[6px] border transition-colors ';
  const active =
    'bg-[#06003F] text-white border-[#06003F] hover:bg-[#06003F]/90';
  const inactive =
    'bg-white text-[#06003F] border-[#06003F]/15 hover:border-[#06003F]/30 hover:bg-[#06003F]/5';

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog/category/${cat.slug}`}
          className={base + (cat.slug === currentSlug ? active : inactive)}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

// ============================================
// Page Component
// ============================================

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { slug } = await params;
  const safeSlug = typeof slug === 'string' ? slug : '';
  const data = await getCategoryBlogData(safeSlug);

  // When category is not found or API fails, show a friendly page instead of blank/404.
  const categoryName =
    (data?.category && typeof data.category.name === 'string')
      ? data.category.name
      : slugToTitle(safeSlug || 'category');
  const categoryDescription =
    (data?.category && typeof data.category.description === 'string' && data.category.description)
      ? data.category.description
      : `No posts in "${categoryName}" yet. Browse all posts or choose another category.`;
  const posts = Array.isArray(data?.posts) ? data.posts : [];
  let categories: WPCategory[] = Array.isArray(data?.categories) ? data.categories : [];
  if (categories.length === 0) {
    try {
      const list = await getCategories();
      categories = Array.isArray(list) ? list : [];
    } catch {
      categories = [];
    }
  }

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <section className="pt-10 sm:pt-12 md:pt-[45px] pb-2">
        <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#06003F]/60 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#FF4E3A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-[#FF4E3A] transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#06003F]">{categoryName}</li>
            </ol>
          </nav>
        </div>
      </section>

      <BlogHero
        headline={categoryName}
        description={categoryDescription}
      />

      <Section background="light" spacing="xl" className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        <Container>
          {/* Show category filter only when there are posts (same layout as main blog); empty state stays clean like Product */}
          {posts.length > 0 && categories.length > 0 && (
            <CategoryFilter categories={categories} currentSlug={slug} />
          )}

          {posts.length > 0 ? (
            <Grid cols={3} gap="lg">
              {posts.map((post, index) =>
                post.featuredImage?.src ? (
                  <BlogCard
                    key={post.id}
                    image={post.featuredImage.src}
                    category={post.categories[0]?.name}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readingTime={post.readingTime}
                    href={`/blog/${post.slug}`}
                    authorName={post.author?.name}
                  />
                ) : (
                  <PlaceholderPostCard key={post.id} post={post} index={index} />
                )
              )}
            </Grid>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-[#06003F]/70 mb-4">
                This category doesn&apos;t exist or has no posts yet. Browse all posts or choose another category.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-[#FF4E3A] font-medium hover:text-[#FF4E3A]/90 transition-colors"
              >
                View all blog posts
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
