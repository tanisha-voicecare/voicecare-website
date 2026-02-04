'use client';

/**
 * PressCoverage Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { PressItemContent } from '@/lib/content';

// ============================================
// Types
// ============================================

interface PressCoverageProps {
  coverageTitle?: string;
  items?: PressItemContent[];
}

const DEFAULT_ITEMS: PressItemContent[] = [
  {
    id: 1,
    logo: '/images/press/logos/pr-newswire.png',
    outlet: 'PR Newswire',
    quote: "Company closes $4.54M in Seed round led by Caduceus Capital Partners, with participation from Bread and Butter Ventures, Mayo Clinic, and a strategic RCM company\n\nVoiceCare AI's goal is to tackle one of the largest and most overlooked pain points in healthcare, said Parag Jhaveri, founder and CEO of VoiceCare AI. With this funding, we are doubling down on our mission to reduce the burden of administrative conversations and tasks so care teams can prioritize high-value patient care.",
    link: 'https://prnewswire.com',
    featured: true,
  },
  {
    id: 2,
    logo: '/images/press/logos/forbes.png',
    outlet: 'Forbes',
    quote: 'AI Agents Are Coming to HealthCare\n\nVoiceCare AI automates communication between provider organizations, insurers, and patients. Its CEO, Parag Jhaveri, reported that their agent, Joy, can wait on hold for more than 30 minutes, navigate phone trees, sustain multi-hour conversations, and take actions like updating claims and filing requests.',
    link: 'https://forbes.com',
    featured: true,
  },
  {
    id: 3,
    logo: '/images/press/logos/beckers.png',
    outlet: "Becker's Hospital Review",
    quote: 'Streamlining Revenue Cycle Management with AI: VoiceCare AI at Becker\'s 15th Annual Meeting\n\nVoiceCare AI showcased "Joy," its advanced voice agent, at Becker\'s 15th Annual Meeting, which automates payer calls for benefits verification, prior authorizations, claims follow‑up, and A/R collections. Leveraging generative AI and conversational models, it reduces denials, accelerates reimbursements, and slashes administrative workload in revenue‑cycle management.',
    link: 'https://beckershospitalreview.com',
    featured: true,
  },
  {
    id: 4,
    logo: '/images/press/logos/hit-consultant.png',
    outlet: 'Healthcare IT Consultant',
    quote: "Inside Healthcare's Hottest New AI Category: Agentic AI\n\nAutomating these phone calls end-to-end eliminates a \"tremendous\" amount of tedious work, Jhaveri pointed out.\nHe said he was recently on a call with leaders from another large health system who told him their imaging department makes 70,000 calls to insurers per month.",
    link: 'https://healthcareitconsultant.com',
    featured: true,
  },
  {
    id: 5,
    logo: '/images/press/logos/medcity-news.png',
    outlet: 'MedCity News',
    quote: 'VoiceCare AI, new agentic AI startup, kicks off pilot with Mayo Clinic to automate back office work\n\nVoiceCare AI dubbed its voice AI agent "Joy," and the agent is capable of supporting long, complex, and highly nuanced conversations and extended hold times, Jhaveri said.',
    link: 'https://medcitynews.com',
    featured: true,
  },
  {
    id: 6,
    logo: '/images/press/logos/fierce-healthcare.png',
    outlet: 'Fierce Healthcare',
    quote: 'Agentic AI Startup, VoiceCare AI, Launches to Automate Healthcare Back Office and Super-Staff Workforce\n\nCompany Raises $3.85M in Seed Funding led by Caduceus Capital Partners, with Participation\nfrom Bread and Butter Ventures; Announces Collaboration with Mayo Clinic',
    link: 'https://fiercehealthcare.com',
    featured: true,
  },
  {
    id: 7,
    logo: '/images/press/logos/pr-newswire.png',
    outlet: 'PR Newswire',
    quote: 'VoiceCare AI plans to automate back-office operations with generative AI\n\nVoiceCare AI founder and CEO Parag Jhavari said: "By automating conversations in a way that feels genuinely human, we seek to give back time to healthcare professionals so they can focus on high-order patient care, driving radical efficiencies with every conversation. That\'s why we created "Joy," our voice AI agent."',
    link: 'https://prnewswire.com',
    featured: true,
  },
  {
    id: 8,
    logo: '/images/press/logos/yahoo-finance.png',
    outlet: 'Yahoo Finance',
    quote: 'VoiceCare AI Launches with $3.85M to Automate Healthcare Back Office with AI-Powered Voice Agent "Joy"\n\nImagine a world where the time spent on manual phone calls and faxes is replaced by meaningful patient interactions. With generative AI, we want to make this a reality," said Parag Jhaveri, founder and CEO of VoiceCare AI.',
    link: 'https://finance.yahoo.com',
    featured: true,
  },
];

// ============================================
// Component
// ============================================

export function PressCoverage({ coverageTitle = 'Recent Coverage', items }: PressCoverageProps) {
  const pressItems = items || DEFAULT_ITEMS;
  const featuredItems = pressItems.filter((item) => item.featured);
  
  if (featuredItems.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 md:py-16 border-b border-[#06003F]/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tight text-[#06003F]">{coverageTitle}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {featuredItems.map((item, index) => {
            // Split quote into paragraphs (EXACT logic from designer-src)
            const paragraphs = item.quote.split('\n\n');
            const firstParagraph = paragraphs[0];
            const restOfQuote = paragraphs.slice(1).join('\n\n');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer bg-white border border-[#06003F]/5 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8 hover:border-[#FF4E3A]/20 transition-all duration-500 flex flex-col w-full min-w-0 overflow-hidden"
              >
                {/* Logo container with fixed height for alignment */}
                <div className="h-10 sm:h-12 md:h-14 lg:h-16 flex items-center mb-5 sm:mb-6 md:mb-8 shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.outlet}
                    width={200}
                    height={64}
                    className="max-h-10 sm:max-h-12 md:max-h-14 lg:max-h-16 w-auto object-contain object-left shrink-0"
                  />
                </div>

                <blockquote className="flex-1 mb-4 sm:mb-5 md:mb-6 min-w-0">
                  <p className="text-[14px] sm:text-[15px] text-[#06003F] leading-[1.6] whitespace-pre-line break-words [overflow-wrap:anywhere]">
                    <span className="font-bold">{firstParagraph}</span>
                    {restOfQuote && (
                      <>
                        {'\n\n'}
                        {restOfQuote}
                      </>
                    )}
                  </p>
                </blockquote>

                {/* Bottom row: outlet + link - stacks on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 min-w-0">
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#06003F]/70">{item.outlet}</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FF4E3A] font-medium text-[12px] sm:text-[13px] group-hover:gap-3 transition-all whitespace-nowrap shrink-0"
                  >
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PressCoverage;
