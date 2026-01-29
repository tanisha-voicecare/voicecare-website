/**
 * Job Detail Page
 * Dynamic route for individual job descriptions
 * Pattern follows blog/[slug]/page.tsx
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JobDescription } from '@/components/careers/JobDescription';
import { jobsData, generateJobSlug, getJobBySlug } from '@/components/careers/jobsData';
import { generatePageMetadata } from '@/lib/seo';

// ============================================
// Types
// ============================================

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Static Params Generation
// ============================================

export async function generateStaticParams() {
  return jobsData.map((job) => ({
    slug: generateJobSlug(job.title),
  }));
}

// ============================================
// Metadata
// ============================================

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return generatePageMetadata({
      title: 'Job Not Found',
      description: 'The requested job posting could not be found.',
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${job.title} - Careers`,
    description: job.description.slice(0, 160),
    pathname: `/careers/${slug}`,
  });
}

// ============================================
// Page Component
// ============================================

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobDescription jobData={job} />;
}
