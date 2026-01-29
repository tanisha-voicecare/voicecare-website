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
    <section className="relative bg-white p-[0px]">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-6">
            Compliance and Monitoring
          </h2>
          <p className="text-[17px] text-[#06003F]/60 leading-relaxed">
            We provide an overview of our dedication to compliance and security,
            offering access to certifications, documentation, and details on our
            strict control adherence.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{
            duration: ANIMATION_DURATION.normal,
            ease: EASING.smooth,
            delay: 0.1,
          }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[0px] mr-[0px] mb-[70px] ml-[0px]"
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
                className="bg-[#F8F9FA] rounded-[12px] p-8 hover:bg-[#FF4E3A]/5 hover:border hover:border-[#FF4E3A]/20 transition-all duration-300 cursor-pointer group"
              >
                {/* Icon Container */}
                <motion.div
                  className="w-12 h-12 rounded-[8px] bg-[#06003F]/5 group-hover:bg-[#FF4E3A]/10 flex items-center justify-center mb-6 transition-all duration-300"
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <Icon
                    className="w-6 h-6 text-[#06003F] group-hover:text-[#FF4E3A] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Feature Text */}
                <p className="text-[15px] text-[#06003F] font-medium leading-relaxed">
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
