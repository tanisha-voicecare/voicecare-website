/**
 * Blog Listing Page
 * Displays all blog posts with pagination
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHeader, Grid, BlogCard } from '@/components/ui';
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

async function getBlogData() {
  try {
    const [postsResult, categoriesResult] = await Promise.allSettled([
      getPosts({ perPage: 9 }),
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

    return { posts, categories, totalPages };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return { posts: [], categories: [], totalPages: 1 };
  }
}

// ============================================
// Placeholder Post Card
// ============================================

function PlaceholderPostCard({ post, index }: { post: ProcessedPost; index: number }) {
  return (
    <article
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-soft-md hover:shadow-soft-xl transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-primary-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-primary-600">Blog Image</p>
          </div>
        </div>
        {post.categories[0] && (
          <span className="absolute top-4 left-4 px-3 py-1 text-sm font-medium bg-white/90 backdrop-blur-sm rounded-full text-primary-700">
            {post.categories[0].name}
          </span>
        )}
      </Link>
      
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-[#06003F] mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-neutral-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <time dateTime={post.date} className="text-sm text-neutral-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span className="text-sm text-neutral-500">{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}

// ============================================
// Category Filter
// ============================================

function CategoryFilter({ categories }: { categories: WPCategory[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <Link
        href="/blog"
        className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-full transition-colors"
      >
        All Posts
      </Link>
      {categories.slice(0, 6).map((category) => (
        <Link
          key={category.id}
          href={`/blog/category/${category.slug}`}
          className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 rounded-full transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

// ============================================
// Page Component
// ============================================

export default async function BlogPage() {
  const { posts, categories } = await getBlogData();

  // Default placeholder posts if no CMS data
  const defaultPosts: ProcessedPost[] = [
    {
      id: 1,
      slug: 'understanding-preventive-care',
      title: 'Understanding Preventive Care: Why Regular Check-ups Matter',
      excerpt: 'Learn why regular health screenings and preventive care can help detect potential health issues early.',
      content: '',
      date: '2026-01-15',
      modifiedDate: '2026-01-15',
      author: { name: 'Dr. Sarah Johnson', avatar: '' },
      featuredImage: null,
      categories: [{ id: 1, name: 'Wellness', slug: 'wellness' }],
      readingTime: 5,
    },
    {
      id: 2,
      slug: 'heart-health-tips',
      title: '10 Simple Tips for Better Heart Health',
      excerpt: 'Discover practical lifestyle changes you can make today to improve your cardiovascular health.',
      content: '',
      date: '2026-01-10',
      modifiedDate: '2026-01-10',
      author: { name: 'Dr. Michael Chen', avatar: '' },
      featuredImage: null,
      categories: [{ id: 2, name: 'Cardiology', slug: 'cardiology' }],
      readingTime: 7,
    },
    {
      id: 3,
      slug: 'mental-health-awareness',
      title: 'Breaking the Stigma: Mental Health in the Modern Age',
      excerpt: 'Mental health is just as important as physical health. Learn about common conditions.',
      content: '',
      date: '2026-01-05',
      modifiedDate: '2026-01-05',
      author: { name: 'Dr. Emily Watson', avatar: '' },
      featuredImage: null,
      categories: [{ id: 3, name: 'Mental Health', slug: 'mental-health' }],
      readingTime: 6,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <Section background="light" spacing="xl" className="pt-32">
      <Container>
        <SectionHeader
          eyebrow="Our Blog"
          title="Health Insights & News"
          description="Expert health advice, medical news, and wellness tips from our team of healthcare professionals."
        />

        {categories.length > 0 && <CategoryFilter categories={categories} />}

        <Grid cols={3} gap="lg">
          {displayPosts.map((post, index) =>
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
              />
            ) : (
              <PlaceholderPostCard key={post.id} post={post} index={index} />
            )
          )}
        </Grid>

        {/* Pagination placeholder */}
        <div className="flex justify-center mt-12 gap-2">
          <button
            disabled
            className="px-4 py-2 text-sm font-medium bg-neutral-200 text-neutral-400 rounded-lg cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg">
            1
          </span>
          <button className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors">
            2
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors">
            Next
          </button>
        </div>
      </Container>
    </Section>
  );
}
