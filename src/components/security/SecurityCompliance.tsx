'use client';

/**
 * Security Compliance Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Database,
  Server,
  ShieldCheck,
  Key,
  Bell,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import type { SecurityComplianceContent, SecurityFeature } from '@/lib/content';

// ============================================
// Types
// ============================================

interface SecurityComplianceProps {
  content?: SecurityComplianceContent;
}

// EASING from designer-src/src/utils/animations.ts
const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

// ANIMATION_DURATION from designer-src/src/utils/animations.ts
const ANIMATION_DURATION = {
  normal: 0.6,
};

type TabKey = 'infrastructure' | 'organizational' | 'product' | 'internal' | 'data';

// Icon mappings per tab (matching designer's specific icon assignments)
const TAB_ICONS: Record<TabKey, LucideIcon[]> = {
  infrastructure: [Server, Database, Key, ShieldCheck],
  organizational: [Lock, ShieldCheck, Key, Activity, FileCheck, Database, FileCheck],
  product: [Lock, Eye],
  internal: [Eye, Bell, Key, Lock, FileCheck, Server, Bell, FileCheck, Shield, Activity],
  data: [FileCheck, Activity],
};

// Tab configuration
const tabs: { key: TabKey; label: string }[] = [
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'organizational', label: 'Organizational' },
  { key: 'product', label: 'Product' },
  { key: 'internal', label: 'Internal' },
  { key: 'data', label: 'Data & Privacy' },
];

// ============================================
// Default Content (Fallback) - Original content
// ============================================

// Designer's exact content - NO titles on cards, only descriptions
const DEFAULT_CONTENT: SecurityComplianceContent = {
  sectionTitle: 'Compliance and Monitoring',
  sectionDescription: 'We provide an overview of our dedication to compliance and security, offering access to certifications, documentation, and details on our strict control adherence.',
  tabs: {
    infrastructure: [
      { title: '', description: 'We maintain our service infrastructure' },
      { title: '', description: 'We conduct regular backups of production data' },
      { title: '', description: 'Multi-factor authentication (MFA) is enforced on all systems' },
      { title: '', description: 'Firewalls and intrusion prevention and detection systems protect our network' },
    ],
    organizational: [
      { title: '', description: 'All endpoints are encrypted' },
      { title: '', description: 'Anti-malware technology is utilized' },
      { title: '', description: 'Password policy is enforced' },
      { title: '', description: 'Security training is implemented' },
      { title: '', description: 'Contractors sign Confidentiality Agreements and BAAs' },
      { title: '', description: 'Production inventory is maintained' },
      { title: '', description: 'Employees acknowledge Confidentiality Agreements' },
    ],
    product: [
      { title: '', description: 'Data is encrypted both at rest and in transit' },
      { title: '', description: 'Vulnerability and system monitoring procedures have been established' },
    ],
    internal: [
      { title: '', description: 'Scanned for and remediated vulnerabilities' },
      { title: '', description: 'Tested the incident response plan' },
      { title: '', description: 'Processed access requests as required' },
      { title: '', description: 'Restricted production deployment access' },
      { title: '', description: 'Enforced change management procedures' },
      { title: '', description: 'Established a configuration management system' },
      { title: '', description: 'Provided an available support system' },
      { title: '', description: 'Established third-party agreements' },
      { title: '', description: 'Maintained cybersecurity insurance' },
      { title: '', description: 'Reviewed system capacity' },
    ],
    dataPrivacy: [
      { title: '', description: 'Established privacy policy' },
      { title: '', description: 'Security awareness and privacy training' },
    ],
  },
};

export function SecurityCompliance({ content }: SecurityComplianceProps) {
  const complianceContent = content || DEFAULT_CONTENT;
  const [activeTab, setActiveTab] = React.useState<TabKey>('infrastructure');

  // Get features for current tab
  const getCurrentFeatures = (): SecurityFeature[] => {
    switch (activeTab) {
      case 'infrastructure':
        return complianceContent.tabs.infrastructure;
      case 'organizational':
        return complianceContent.tabs.organizational;
      case 'product':
        return complianceContent.tabs.product;
      case 'internal':
        return complianceContent.tabs.internal;
      case 'data':
        return complianceContent.tabs.dataPrivacy;
      default:
        return complianceContent.tabs.infrastructure;
    }
  };

  const currentFeatures = getCurrentFeatures();

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
          className="text-center mb-10 sm:mb-14 md:mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-3 sm:mb-4">
            {complianceContent.sectionTitle}
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/60 leading-relaxed px-2">
            {complianceContent.sectionDescription}
          </p>
        </motion.div>

        {/* Tabs - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{
            duration: ANIMATION_DURATION.normal,
            ease: EASING.smooth,
            delay: 0.1,
          }}
          className="flex overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 md:mb-[64px] md:mt-[-40px] pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-hide"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-[6px] text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 md:flex-shrink ${
                activeTab === tab.key
                  ? 'bg-[#06003F] text-white'
                  : 'bg-[#F5F5F7] md:bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content - Cards Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASING.smooth }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-[70px]"
        >
          {currentFeatures.map((feature, index) => {
            const tabIcons = TAB_ICONS[activeTab];
            const Icon = tabIcons[index % tabIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: EASING.smooth,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F8F9FA] rounded-[12px] p-5 sm:p-6 md:p-8 hover:bg-[#FF4E3A]/5 hover:border hover:border-[#FF4E3A]/20 transition-all duration-300 cursor-pointer group"
              >
                {/* Icon Container */}
                <motion.div
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-[8px] bg-[#06003F]/5 group-hover:bg-[#FF4E3A]/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 transition-all duration-300"
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <Icon
                    className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-[#06003F] group-hover:text-[#FF4E3A] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Feature Title - only shown if provided */}
                {feature.title && (
                  <h3 className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F] font-bold mb-2">
                    {feature.title}
                  </h3>
                )}

                {/* Feature Text */}
                <p className={`text-[14px] sm:text-[14px] md:text-[15px] text-[#06003F] ${feature.title ? 'text-[#06003F]/60' : 'font-medium'} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default SecurityCompliance;
