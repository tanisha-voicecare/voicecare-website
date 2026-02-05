'use client';

/**
 * PricingFAQ Component
 * Tabbed FAQ section with expandable accordion Q&A
 * Tabs styled to match WhoWeServeTabs.tsx
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { PricingFAQContent } from '@/lib/content';

interface PricingFAQProps {
  content?: PricingFAQContent;
}

// Animation constants
const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

type TabKey = 'pricing' | 'implementation' | 'support';

// Tab configuration
const tabs: { key: TabKey; label: string }[] = [
  { key: 'pricing', label: 'Pricing' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'support', label: 'Support' },
];

// FAQ Questions and Answers for each tab
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_CONTENT: Record<TabKey, FAQItem[]> = {
  pricing: [
    {
      question: 'How do you charge?',
      answer: 'We charge a price per successful call or a fixed monthly price (SaaS) based on customer archetype.',
    },
    {
      question: 'Do you have an enterprise offering?',
      answer: 'Discounted pricing is available to customers who engage with us through multi-year contracts.',
    },
    {
      question: 'How does your pricing compare to the workforce that I currently have?',
      answer: 'Use our handy ROI calculator above to learn more about potential cost savings compared to your current workforce.',
    },
  ],
  implementation: [
    {
      question: 'Do you offer a trial period?',
      answer: 'We offer a no-cost trial period during which we will make a certain number of agreed upon calls for you to experience the capabilities of the VoiceCare platform.',
    },
    {
      question: 'How long does it take to implement post the trial period?',
      answer: 'Post the trial period, the full-fledged implementation of the platform typically takes 30 calendar days.',
    },
  ],
  support: [
    {
      question: 'What kind of support do you offer your customers?',
      answer: "For every customer, we offer three kinds of support - technical support, customer success manager and the ability to chat with our team of experts during business hours via VoiceCare's portal chat.",
    },
  ],
};

// Accordion Item Component
interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: EASING.smooth,
      }}
      className="border border-[#06003F]/10 rounded-xl overflow-hidden bg-white hover:border-[#FF4E3A]/30 transition-colors"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-[#06003F] leading-snug">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASING.smooth }}
          className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#06003F]/5 flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#06003F]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASING.smooth }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/70 leading-relaxed -mt-2">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PricingFAQ({ content }: PricingFAQProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('pricing');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Get FAQ items for current tab
  const getCurrentFAQItems = (): FAQItem[] => {
    // If content is provided from WordPress, transform it to FAQ format
    if (content?.tabs) {
      const tabContent = content.tabs[activeTab] || [];
      // If WordPress content is just strings, convert to FAQ format
      // Otherwise use the default FAQ content
      return FAQ_CONTENT[activeTab];
    }
    return FAQ_CONTENT[activeTab];
  };

  const currentFAQItems = getCurrentFAQItems();

  const toggleItem = (question: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  return (
    <section className="py-14 sm:py-18 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-2 sm:mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/60 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our pricing, implementation, and support.
          </p>
        </motion.div>

        {/* Tab Navigation - styled like WhoWeServeTabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-12 md:mb-16 pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-hide"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              onClick={() => {
                setActiveTab(tab.key);
                setOpenItems({}); // Reset open items when switching tabs
              }}
              aria-selected={activeTab === tab.key}
              role="tab"
              className={`px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-[6px] text-[12px] sm:text-[13px] md:text-[14px] font-semibold transition-all whitespace-nowrap min-w-max flex-shrink-0 md:flex-shrink ${
                activeTab === tab.key
                  ? 'bg-[#FF4E3A] text-white'
                  : 'bg-[#F5F5F7] md:bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#FF4E3A]/30'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Accordion Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASING.smooth }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            {currentFAQItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openItems[item.question] || false}
                onToggle={() => toggleItem(item.question)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-[#06003F]/60 text-base sm:text-lg mb-6">
            Ready to get started?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/schedule-demo"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF4E3A] text-white rounded-lg font-medium hover:brightness-110 transition-all text-[15px]"
            >
              Schedule a Demo
            </a>
            {/* Partner with Us button - commented out for now
            <a
              href="/partner-with-us"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#06003F] text-white rounded-lg font-medium hover:bg-[#06003F]/90 transition-all text-[15px]"
            >
              Partner with Us
            </a>
            */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingFAQ;
