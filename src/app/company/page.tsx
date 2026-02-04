/**
 * Company Page
 * Content is fetched from WordPress headless CMS
 */

import type { Metadata } from 'next';
import {
  CompanyHero,
  AboutUsSection,
  CEOQuoteSection,
  PrinciplesSection,
  AdvisorsSection,
} from '@/components/company';
import { generatePageMetadata } from '@/lib/seo';
import { getCompanyContent } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Company',
  description:
    'Learn about VoiceCare AI and our mission to supercharge healthcare administration with Artificial Intelligence. Meet our leadership team, advisors, and investors.',
  pathname: '/company',
});

export const revalidate = 600; // Revalidate every 10 minutes

export default async function CompanyPage() {
  const content = await getCompanyContent();

  return (
    <>
      <CompanyHero content={content.hero} />
      <AboutUsSection content={content.aboutUs} />
      <CEOQuoteSection content={content.ceoQuote} />
      <PrinciplesSection content={content.principles} />
      <AdvisorsSection content={content.advisors} />
    </>
  );
}
