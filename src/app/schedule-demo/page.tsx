/**
 * Schedule Demo Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import { ScheduleDemoHero, ScheduleDemoForm } from '@/components/schedule-demo';
import { generatePageMetadata } from '@/lib/seo';
import { getScheduleDemoContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Schedule a Demo',
  description:
    'Gain a comprehensive understanding of how our AI-driven solutions can revolutionize your operations. Schedule a tailored demonstration with our team.',
  pathname: '/schedule-demo',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function ScheduleDemoPage() {
  const content = await getScheduleDemoContent();

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <ScheduleDemoHero content={content.hero} />
      <ScheduleDemoForm />
    </div>
  );
}
