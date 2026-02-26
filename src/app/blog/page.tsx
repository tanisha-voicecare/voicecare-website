/**
 * Blog Listing Page
 * Displays all blog posts with pagination and category filters
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogHero } from '@/components/blog';
import { Container, Section, Grid, BlogCard } from '@/components/ui';
import { generatePageMetadata } from '@/lib/seo';
import { getPosts, getCategories, processPost } from '@/lib/wordpress';
import type { ProcessedPost, WPCategory } from '@/types';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = generatePageMetadata({
  title: 'Health Blog',
  description:
    'Stay informed with the latest health tips, medical news, and wellness advice from our expert healthcare professionals.',
  pathname: '/blog',
});

// ============================================
// ISR Configuration
// ============================================

export const revalidate = 600;

// ============================================
// Data Fetching
// ============================================

async function getBlogData(page: number = 1) {
  try {
    const [postsResult, categoriesResult] = await Promise.allSettled([
      getPosts({ page, perPage: 9 }),
      getCategories(),
    ]);

    const posts =
      postsResult.status === 'fulfilled'
        ? postsResult.value.posts.map(processPost)
        : [];

    const categories =
      categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];

    const totalPages =
      postsResult.status === 'fulfilled' ? postsResult.value.totalPages : 1;
    const total =
      postsResult.status === 'fulfilled' ? postsResult.value.total : 0;

    return { posts, categories, totalPages, total };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return { posts: [], categories: [], totalPages: 1, total: 0 };
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
// Category Filter - matches site chip/button style (border, brand colors)
// ============================================

/** Only shows categories fetched from WordPress — no extra chips. */
function CategoryFilter({
  categories,
  currentSlug,
}: {
  categories: WPCategory[];
  currentSlug?: string | null;
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
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/category/${category.slug}`}
          className={base + (currentSlug === category.slug ? active : inactive)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

// ============================================
// Pagination - functional links, site-themed styling
// ============================================

function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const base =
    'inline-flex items-center justify-center min-w-[44px] h-10 px-4 text-sm font-medium rounded-[6px] border transition-colors ';
  const active = 'bg-[#06003F] text-white border-[#06003F]';
  const inactive =
    'bg-white text-[#06003F] border-[#06003F]/15 hover:border-[#06003F]/30 hover:bg-[#06003F]/5';
  const disabled = 'bg-[#06003F]/5 text-[#06003F]/40 border-[#06003F]/10 cursor-not-allowed';

  return (
    <nav
      aria-label="Blog pagination"
      className="flex flex-wrap justify-center items-center gap-2 mt-8 sm:mt-10"
    >
      {prevPage ? (
        <Link
          href={prevPage === 1 ? '/blog' : `/blog?page=${prevPage}`}
          className={base + inactive}
        >
          Previous
        </Link>
      ) : (
        <span className={base + disabled}>Previous</span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={p === 1 ? '/blog' : `/blog?page=${p}`}
            className={base + (p === currentPage ? active : inactive)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </Link>
        ))}
      </div>

      {nextPage ? (
        <Link href={`/blog?page=${nextPage}`} className={base + inactive}>
          Next
        </Link>
      ) : (
        <span className={base + disabled}>Next</span>
      )}
    </nav>
  );
}

// ============================================
// Page Component
// ============================================

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(String(pageParam), 10) || 1);
  const { posts, categories, totalPages } = await getBlogData(currentPage);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <BlogHero
        headline="Health Insights & News"
        description="Expert health advice, medical news, and wellness tips from our team of healthcare professionals."
      />

      <Section background="light" spacing="xl" className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        <Container>
          {categories.length > 0 && (
            <CategoryFilter categories={categories} currentSlug={null} />
          )}

          {posts.length > 0 ? (
            <>
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
              <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-[#06003F]/70 mb-4">
                No posts yet. Add and publish posts from WordPress (React Site Content → Blog) to see them here.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
