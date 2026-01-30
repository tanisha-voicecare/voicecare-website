import type { Metadata } from 'next';
import { PartnerHero, PartnerForm } from '@/components/partner-with-us';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Partner with Us',
  description:
    'Collaborating with VoiceCare will drive mutual growth and success. Explore partnership opportunities and shape the future of healthcare together.',
  pathname: '/partner-with-us',
});

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PartnerHero />
      <PartnerForm />
    </div>
  );
}
