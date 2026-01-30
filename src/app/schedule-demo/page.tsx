import type { Metadata } from 'next';
import { ScheduleDemoHero, ScheduleDemoForm } from '@/components/schedule-demo';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Schedule a Demo',
  description:
    'Gain a comprehensive understanding of how our AI-driven solutions can revolutionize your operations. Schedule a tailored demonstration with our team.',
  pathname: '/schedule-demo',
});

export default function ScheduleDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScheduleDemoHero />
      <ScheduleDemoForm />
    </div>
  );
}
