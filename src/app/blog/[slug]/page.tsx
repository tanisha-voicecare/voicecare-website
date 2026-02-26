/**
 * Blog Post Detail Page
 * Individual blog post with full content
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Text } from '@/components/ui';
import { BlogPostBody } from '@/components/blog';
import { CTASection } from '@/sections';
import { generatePageMetadata, generateArticleSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import { getPostBySlug, getAllPostSlugs, processPost } from '@/lib/wordpress';
import { absoluteUrl, formatDate } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Static Params Generation
// ============================================

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ============================================
// Metadata
// ============================================

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return generatePageMetadata({
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
        noIndex: true,
      });
    }

    const processedPost = processPost(post);

    return generatePageMetadata({
      title: processedPost.title,
      description: processedPost.excerpt,
      image: processedPost.featuredImage?.src,
      pathname: `/blog/${slug}`,
      article: {
        publishedTime: processedPost.date,
        modifiedTime: processedPost.modifiedDate,
        author: processedPost.author?.name,
        tags: processedPost.categories.map((cat) => cat.name),
      },
    });
  } catch {
    return generatePageMetadata({
      title: 'Blog Post',
      description: 'Read our latest health insights and medical advice.',
      pathname: `/blog/${slug}`,
    });
  }
}

// ============================================
// ISR Configuration
// ============================================

export const revalidate = 30; // 1 min – draft/publish changes appear sooner

// ============================================
// Page Component
// ============================================

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let post;
  try {
    const wpPost = await getPostBySlug(slug);
    if (wpPost) {
      post = processPost(wpPost);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    notFound();
  }

  // JSON-LD Schema
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.featuredImage?.src || `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    authorName: post.author?.name || siteConfig.name,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
    { name: post.title, url: absoluteUrl(`/blog/${post.slug}`) },
  ]);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <article className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <Container size="md">
          {/* Breadcrumb - matches Press/Blog brand styling */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
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
              <li className="text-[#06003F] truncate max-w-[140px] sm:max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          {/* Header - title matches Press/Blog hero typography */}
          <header className="mb-8 sm:mb-10 md:mb-12">
            {/* Category Badge */}
            {post.categories[0] && (
              <Link
                href={`/blog/category/${post.categories[0].slug}`}
                className="inline-block px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-[#06003F]/10 text-[#06003F] rounded-full mb-3 sm:mb-4 hover:bg-[#06003F]/15 transition-colors"
              >
                {post.categories[0].name}
              </Link>
            )}

            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold tracking-tight text-[#06003F] mb-4 sm:mb-5 md:mb-6 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 md:gap-6 text-[#06003F]/60 text-sm sm:text-base">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <span className="text-xs sm:text-sm font-medium text-primary-700">
                      {post.author.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium text-[#06003F]">{post.author.name}</span>
                </div>
              )}

              {/* Date */}
              <time dateTime={post.date}>{formatDate(post.date)}</time>

              {/* Reading time */}
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage ? (
            <figure className="mb-8 sm:mb-10 md:mb-12 -mx-4 sm:mx-0">
              <div className="relative aspect-video sm:rounded-2xl overflow-hidden">
                <Image
                  src={post.featuredImage.src}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </figure>
          ) : (
            <figure className="mb-8 sm:mb-10 md:mb-12 -mx-4 sm:mx-0">
              <div className="relative aspect-video sm:rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-primary-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm sm:text-base text-primary-700 font-medium">Featured Image</p>
                  <p className="text-xs sm:text-sm text-primary-600/80">Add via WordPress CMS</p>
                </div>
              </div>
            </figure>
          )}

          {/* Content – WordPress block library CSS in Shadow DOM so editor styles match. Uses CDN so it works even when WP URL isn’t reachable from browser. */}
          <BlogPostBody
            content={post.content}
            wpBlockCssUrl="https://unpkg.com/@wordpress/block-library@9.40.1/build-style/style.css"
          />

          {/* Tags/Categories */}
          {post.categories.length > 0 && (
            <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-neutral-200">
              <Text weight="medium" className="mb-2 sm:mb-3 text-sm sm:text-base">
                Categories:
              </Text>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-neutral-100 text-neutral-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-200">
            <Text weight="medium" className="mb-2 sm:mb-3 text-sm sm:text-base">
              Share this article:
            </Text>
            <div className="flex gap-2 sm:gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(absoluteUrl(`/blog/${post.slug}`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl(`/blog/${post.slug}`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(absoluteUrl(`/blog/${post.slug}`))}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <img src="/icons/linkedin.png" alt="LinkedIn" className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </Container>
      </article>
      </div>

      {/* CTA Section */}
      <CTASection
        content={{
          headline: 'Have Questions About Your Health?',
          description: 'Our team of expert physicians is here to help. Schedule a consultation today.',
          buttonText: 'Book a Consultation',
          buttonHref: '/appointments',
        }}
        variant="primary"
      />
    </>
  );
}
