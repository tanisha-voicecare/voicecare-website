'use client';

/**
 * WhoWeServeTabs Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/WhoWeServe.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Section:
 * - py-24 bg-white
 *
 * Container:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Tab Navigation:
 * - flex flex-wrap justify-center gap-4 mb-16
 *
 * Tab Button:
 * - px-6 py-3 rounded-[6px] text-[14px] font-semibold transition-all
 * - Active: bg-[#FF4E3A] text-white
 * - Inactive: bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#FF4E3A]/30
 *
 * Tab Content Animation:
 * - key={activeTab} for re-render
 * - initial={{ opacity: 0, y: 20 }}
 * - animate={{ opacity: 1, y: 0 }}
 * - transition={{ duration: 0.5 }}
 *
 * Title/Subtitle:
 * - text-center mb-12
 * - H2: text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-4
 * - P: text-[16px] text-[#06003F]/60 max-w-3xl mx-auto
 *
 * Cards Grid:
 * - grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto
 *
 * Card:
 * - bg-white border border-[#06003F]/10 rounded-[12px] p-8
 * - hover:border-[#FF4E3A]/30 transition-all duration-300
 * - whileHover={{ y: -8 }}
 *
 * Icon Container:
 * - w-14 h-14 rounded-[12px] bg-[#FF4E3A] flex items-center justify-center mb-6
 *
 * Icon:
 * - w-6 h-6 text-white strokeWidth={2}
 *
 * Card Title:
 * - text-[24px] font-bold text-[#06003F] mb-4 group-hover:text-[#FF4E3A]
 *
 * Card Description:
 * - text-[16px] text-[#06003F]/60 leading-relaxed
 */

import { useState, ComponentType, SVGProps } from 'react';
import { motion } from 'motion/react';
import {
  FlaskConical,
  Pill,
  Stethoscope,
  Heart,
  Activity,
  Brain,
  Bone,
  Baby,
  Syringe,
  Plus,
  LucideProps,
} from 'lucide-react';
import {
  VirusIcon,
  StomachIcon,
  BloodIcon,
  KidneyIcon,
  ToothIcon,
} from './MedicalIcons';

// ============================================
// Types
// ============================================

type TabId =
  | 'healthcare-stakeholders'
  | 'specialist-practice'
  | 'revenue-cycle'
  | 'dental';

interface Tab {
  id: TabId;
  label: string;
}

type IconComponent = ComponentType<LucideProps> | ComponentType<SVGProps<SVGSVGElement>>;

interface Card {
  icon: IconComponent;
  title: string;
  description: string;
}

interface TabContent {
  title: string;
  subtitle: string;
  cards: Card[];
}

// ============================================
// Data - EXACT from designer-src
// ============================================

const tabs: Tab[] = [
  {
    id: 'healthcare-stakeholders',
    label: 'Healthcare Stakeholders',
  },
  {
    id: 'specialist-practice',
    label: 'Specialist Practice Providers',
  },
  {
    id: 'revenue-cycle',
    label: 'Revenue Cycle Management',
  },
  { id: 'dental', label: 'Dental' },
];

const healthcareStakeholders: Card[] = [
  {
    icon: Plus,
    title: 'Health Systems',
    description:
      'Streamline administrative processes by automating insurance verification and authorization calls, reducing wait times and improving patient flow. Empower healthcare teams to concentrate on delivering quality care rather than handling repetitive administrative tasks.',
  },
  {
    icon: FlaskConical,
    title: 'Labs & Diagnostics',
    description:
      'Optimize operational efficiency by automating insurance pre-authorization calls and patient follow-ups, allowing lab technicians and diagnostic professionals to focus on accurate and timely test results.',
  },
  {
    icon: Pill,
    title: 'Specialty Pharmacies',
    description:
      'Improve patient satisfaction and adherence by automating insurance-related tasks, enabling quicker access to specialty medications.',
  },
  {
    icon: Stethoscope,
    title: 'Ambulatory Surgery Centers',
    description:
      'Optimize resource allocation by automating insurance interactions, enabling surgical teams to dedicate more time to clinical care and procedural excellence.',
  },
];

const specialistPracticeProviders: Card[] = [
  {
    icon: Heart,
    title: 'Cardiology',
    description:
      'Improve patient satisfaction and outcomes by automating insurance interactions, facilitating quicker approvals for cardiac treatments and procedures.',
  },
  {
    icon: Activity,
    title: 'Oncology',
    description:
      'Enhance operational efficiency in oncology practices by automating insurance billing and claims management, reducing administrative overhead and optimizing revenue cycles.',
  },
  {
    icon: VirusIcon,
    title: 'Infectious diseases',
    description:
      'Improve patient outcomes by automating insurance-related tasks, facilitating faster approvals and seamless coordination of treatments for infectious diseases.',
  },
  {
    icon: StomachIcon,
    title: 'Gastroenterology',
    description:
      'Enhance operational efficiency in gastroenterology practices by automating insurance billing and claims processing, reducing administrative workload and optimizing revenue cycles.',
  },
  {
    icon: KidneyIcon,
    title: 'Nephrology',
    description:
      'Optimize patient care by automating insurance verification and pre-authorization processes for nephrology treatments and procedures, ensuring timely access to critical renal care services.',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description:
      'Enable neurology teams to focus on delivering personalized care and innovative treatments with improved administrative efficiency.',
  },
  {
    icon: KidneyIcon,
    title: 'Urology',
    description:
      'Improve revenue cycles while delivering comprehensive urological care and innovative treatment plans.',
  },
  {
    icon: Bone,
    title: 'Rheumatology',
    description:
      'Empower rheumatology teams to deliver personalized care and effective treatments with enhanced administrative efficiency.',
  },
  {
    icon: BloodIcon,
    title: 'Hematology',
    description:
      'Streamline patient care with automated insurance verification and pre-authorization processes tailored for hematological treatments and diagnostics, ensuring timely access to critical medical interventions.',
  },
  {
    icon: Syringe,
    title: 'Anesthesia',
    description:
      'Improve revenue cycles while delivering comprehensive urological care and innovative treatment plans.',
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description:
      'Empower rheumatology teams to deliver personalized care and effective treatments with enhanced administrative efficiency.',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description:
      'Streamline patient care with automated insurance verification and pre-authorization processes tailored for hematological treatments and diagnostics, ensuring timely access to critical medical interventions.',
  },
];

const revenueCycleManagement: Card[] = [
  {
    icon: Plus,
    title: 'Revenue Cycle Management',
    description:
      'Improve revenue integrity with AI-driven automation of insurance eligibility verification and denial management processes. Ensure accurate billing and coding to maximize reimbursements and minimize revenue leakage.',
  },
];

const dental: Card[] = [
  {
    icon: ToothIcon,
    title: 'Dental',
    description:
      'Improve revenue integrity with AI-driven automation of insurance eligibility verification and denial management processes. Ensure accurate billing and coding to maximize reimbursements and minimize revenue leakage.',
  },
];

// ============================================
// Helper Function
// ============================================

const getTabContent = (activeTab: TabId): TabContent => {
  switch (activeTab) {
    case 'healthcare-stakeholders':
      return {
        title: 'Healthcare Stakeholders',
        subtitle:
          'We collaborate with stakeholders across different verticals within the healthcare domain.',
        cards: healthcareStakeholders,
      };
    case 'specialist-practice':
      return {
        title: 'Specialist Practice Providers',
        subtitle:
          'We specialize in providing efficient, customized solutions for specialized segments within the healthcare industry.',
        cards: specialistPracticeProviders,
      };
    case 'revenue-cycle':
      return {
        title: 'Revenue Cycle Management',
        subtitle:
          'Optimizing financial operations for healthcare organizations.',
        cards: revenueCycleManagement,
      };
    case 'dental':
      return {
        title: 'Dental',
        subtitle:
          'Transforming dental practice operations with AI-powered automation.',
        cards: dental,
      };
    default:
      return {
        title: 'Healthcare Stakeholders',
        subtitle:
          'We collaborate with stakeholders across different verticals within the healthcare domain.',
        cards: healthcareStakeholders,
      };
  }
};

// ============================================
// Component
// ============================================

export function WhoWeServeTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('healthcare-stakeholders');
  const currentContent = getTabContent(activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
              className={`px-6 py-3 rounded-[6px] text-[14px] font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF4E3A] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#FF4E3A]/30'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1] mb-4">
              {currentContent.title}
            </h2>
            <p className="text-[16px] text-[#06003F]/60 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {currentContent.cards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="group bg-white border border-[#06003F]/10 rounded-[12px] p-8 hover:border-[#FF4E3A]/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-[12px] bg-[#FF4E3A] flex items-center justify-center mb-6">
                    <IconComponent
                      className="w-6 h-6 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="text-[24px] font-bold text-[#06003F] mb-4 group-hover:text-[#FF4E3A] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-[16px] text-[#06003F]/60 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
