'use client';

/**
 * Security Compliance Component
 * EXACT implementation from designer-src/src/app/components/Solutions.tsx (Compliance and Monitoring Section)
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section Container:
 * - relative bg-white p-[0px]
 *
 * Content Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Header:
 * - text-center mb-20 max-w-4xl mx-auto
 * - Title: text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-6
 * - Description: text-[17px] text-[#06003F]/60 leading-relaxed
 * - Animation: opacity 0→1, y 20→0, duration 0.6s, ease smooth
 *
 * Tabs Container:
 * - flex flex-wrap justify-center gap-3 mb-16
 *
 * Tab Button:
 * - px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300
 * - Active: bg-[#06003F] text-white
 * - Inactive: bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30
 * - Animation: whileHover scale 1.05, whileTap scale 0.95, duration 0.2s
 *
 * Cards Grid:
 * - grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[0px] mr-[0px] mb-[70px] ml-[0px]
 * - Animation: key={activeTab}, opacity 0→1, y 20→0, duration 0.4s, ease smooth
 *
 * Feature Card:
 * - bg-[#F8F9FA] rounded-[12px] p-8
 * - hover:bg-[#FF4E3A]/5 hover:border hover:border-[#FF4E3A]/20
 * - transition-all duration-300 cursor-pointer group
 * - Animation: opacity 0→1, y 20→0, duration 0.4s, delay index*0.05, ease smooth
 * - whileHover: y -4, duration 0.2s
 *
 * Icon Container:
 * - w-12 h-12 rounded-[8px] bg-[#06003F]/5 group-hover:bg-[#FF4E3A]/10
 * - flex items-center justify-center mb-6 transition-all duration-300
 * - whileHover: rotate [0, -5, 5, 0], duration 0.5s
 *
 * Icon:
 * - w-6 h-6 text-[#06003F] group-hover:text-[#FF4E3A]
 * - transition-colors duration-300, strokeWidth 1.5
 *
 * Feature Text:
 * - text-[15px] text-[#06003F] font-medium leading-relaxed
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
} from 'lucide-react';

// EASING from designer-src/src/utils/animations.ts
const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

// ANIMATION_DURATION from designer-src/src/utils/animations.ts
const ANIMATION_DURATION = {
  normal: 0.6,
};

type TabKey = 'infrastructure' | 'organizational' | 'product' | 'internal' | 'data';

// Security categories data from designer-src/Solutions.tsx
const securityCategories: Record<
  TabKey,
  {
    icon: typeof Server;
    title: string;
    features: { text: string; icon: typeof Server }[];
  }
> = {
  infrastructure: {
    icon: Server,
    title: 'Infrastructure Security',
    features: [
      { text: 'We maintain our service infrastructure', icon: Server },
      { text: 'We conduct regular backups of production data', icon: Database },
      {
        text: 'Multi-factor authentication (MFA) is enforced on all systems',
        icon: Key,
      },
      {
        text: 'Firewalls and intrusion prevention and detection systems protect our network',
        icon: ShieldCheck,
      },
    ],
  },
  organizational: {
    icon: ShieldCheck,
    title: 'Organizational Security',
    features: [
      { text: 'All endpoints are encrypted', icon: Lock },
      { text: 'Anti-malware technology is utilized', icon: ShieldCheck },
      { text: 'Password policy is enforced', icon: Key },
      { text: 'Security training is implemented', icon: Activity },
      {
        text: 'Contractors sign Confidentiality Agreements and BAAs',
        icon: FileCheck,
      },
      { text: 'Production inventory is maintained', icon: Database },
      {
        text: 'Employees acknowledge Confidentiality Agreements',
        icon: FileCheck,
      },
    ],
  },
  product: {
    icon: Lock,
    title: 'Product Security',
    features: [
      { text: 'Data is encrypted both at rest and in transit', icon: Lock },
      {
        text: 'Vulnerability and system monitoring procedures have been established',
        icon: Eye,
      },
    ],
  },
  internal: {
    icon: Key,
    title: 'Internal Security',
    features: [
      { text: 'Scanned for and remediated vulnerabilities', icon: Eye },
      { text: 'Tested the incident response plan', icon: Bell },
      { text: 'Processed access requests as required', icon: Key },
      { text: 'Restricted production deployment access', icon: Lock },
      { text: 'Enforced change management procedures', icon: FileCheck },
      { text: 'Established a configuration management system', icon: Server },
      { text: 'Provided an available support system', icon: Bell },
      { text: 'Established third-party agreements', icon: FileCheck },
      { text: 'Maintained cybersecurity insurance', icon: Shield },
      { text: 'Reviewed system capacity', icon: Activity },
    ],
  },
  data: {
    icon: Database,
    title: 'Data and Privacy',
    features: [
      { text: 'Established privacy policy', icon: FileCheck },
      { text: 'Security awareness and privacy training', icon: Activity },
    ],
  },
};

// Tab configuration
const tabs: { key: TabKey; label: string }[] = [
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'organizational', label: 'Organizational' },
  { key: 'product', label: 'Product' },
  { key: 'internal', label: 'Internal' },
  { key: 'data', label: 'Data & Privacy' },
];

export function SecurityCompliance() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('infrastructure');

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
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-4 sm:mb-5 md:mb-6">
            Compliance and Monitoring
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#06003F]/60 leading-relaxed px-2">
            We provide an overview of our dedication to compliance and security,
            offering access to certifications, documentation, and details on our
            strict control adherence.
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
          className="flex overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-hide"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-[70px]"
        >
          {securityCategories[activeTab].features.map((feature, index) => {
            const Icon = feature.icon;
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

                {/* Feature Text */}
                <p className="text-[14px] sm:text-[14px] md:text-[15px] text-[#06003F] font-medium leading-relaxed">
                  {feature.text}
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
