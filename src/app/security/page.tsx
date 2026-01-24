'use client';

/**
 * Security Page
 * EXACT implementation from designer-src/src/app/components/Solutions.tsx
 *
 * Sections in order:
 * 1. Hero Section - Gradient title with compliance badges
 * 2. Security Features Grid - 6 numbered feature cards
 * 3. Security Pillars - Expandable cards
 * 4. Real-Time Threat Intelligence - Content + Image
 * 5. Enterprise-Grade Encryption - Image + Content
 * 6. Final CTA
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Database,
  CheckCircle2,
} from 'lucide-react';

// ============================================
// Animation Constants (from designer-src)
// ============================================

const ANIMATION_DURATION = {
  normal: 0.6,
};

const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
};

// ============================================
// Data
// ============================================

const securityFeatures = [
  {
    number: '01',
    title: 'Compliance Management',
    description:
      'Automated compliance monitoring and reporting across HIPAA, SOC 2, and GDPR requirements with real-time alerts.',
  },
  {
    number: '02',
    title: 'Threat Detection',
    description:
      'AI-powered threat intelligence with behavioral analysis to identify and neutralize security risks in real-time.',
  },
  {
    number: '03',
    title: 'Data Encryption',
    description:
      'End-to-end AES-256 encryption for all data at rest and in transit, with automated key rotation and management.',
  },
  {
    number: '04',
    title: 'Access Control',
    description:
      'Role-based access control with multi-factor authentication and granular permission management across all systems.',
  },
  {
    number: '05',
    title: 'Audit Logging',
    description:
      'Comprehensive activity tracking and immutable audit trails for complete visibility into all system operations.',
  },
  {
    number: '06',
    title: 'Incident Response',
    description:
      '24/7 security operations center with automated incident detection, response protocols, and recovery procedures.',
  },
];

const expandableCards = [
  {
    title: 'Infrastructure Security',
    description:
      'Multi-layered infrastructure protection with automated threat detection and real-time security monitoring across all systems.',
    image:
      'https://images.unsplash.com/photo-1760199789455-49098afd02f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjgyOTY3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Data Encryption',
    description:
      'End-to-end AES-256 encryption for all data at rest and in transit, ensuring complete data privacy and security compliance.',
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY4MzA5OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Lock,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Continuous Monitoring',
    description:
      '24/7 security operations center with AI-powered anomaly detection and instant threat response capabilities.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW5jcnlwdGlvbnxlbnwxfHx8fDE3NjgzMTQwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Eye,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Compliance Framework',
    description:
      'HIPAA, SOC 2, and HITRUST certified with regular third-party audits and comprehensive compliance documentation.',
    image:
      'https://images.unsplash.com/photo-1708807472445-d33589e6b090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzY4MzE0MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Database,
    gradient: 'from-cyan-500 to-blue-500',
  },
];

// ============================================
// ImageWithFallback Component
// ============================================

function ImageWithFallback({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const errorImgSrc =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=';

  if (didError) {
    return (
      <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}>
        <div className="flex items-center justify-center w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={errorImgSrc} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setDidError(true)}
      {...props}
    />
  );
}

// ============================================
// ExpandableCards Component
// ============================================

function ExpandableCards() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="flex gap-4 h-[450px]">
      {expandableCards.map((card, index) => {
        const isExpanded = expandedIndex === index;
        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            animate={{
              flex: isExpanded ? 2.5 : 0.5,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={() => setExpandedIndex(index)}
            className="relative rounded-[12px] overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8">
              {/* Icon */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 rounded-[12px] bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 mb-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title */}
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.h3
                    key="expanded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[24px] font-bold text-white leading-tight mb-4"
                  >
                    {card.title}
                  </motion.h3>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center h-full"
                  >
                    <h3
                      className="text-[26px] font-bold text-white whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {card.title}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-[15px] text-white/85 leading-relaxed mb-6"
                  >
                    {card.description}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Learn More Link */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-[14px] font-semibold text-white flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  >
                    Learn More
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================
// Page Component
// ============================================

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#06003F]/10 rounded-full mb-10"
              >
                <span className="text-[13px] font-medium text-[#06003F]/70">
                  SOC 2 Type II Certified
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <h1
                  className="text-[68px] md:text-[80px] font-bold tracking-tight leading-[1.05]"
                  style={{
                    background: 'linear-gradient(to right, #06003F 0%, #06003F 50%, #FF4E3A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Security &<br />Compliance
                </h1>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-end space-y-8 pt-12"
            >
              <p className="text-[17px] text-[#06003F]/60 leading-relaxed">
                Built with healthcare in mind. Our platform delivers bank-level security with
                comprehensive compliance certifications, protecting patient data at every layer.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4E3A]" />
                  <span className="text-[14px] font-medium text-[#06003F]">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4E3A]" />
                  <span className="text-[14px] font-medium text-[#06003F]">100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4E3A]" />
                  <span className="text-[14px] font-medium text-[#06003F]">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4E3A]" />
                  <span className="text-[14px] font-medium text-[#06003F]">24/7 Monitoring</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="relative py-24 bg-[#FAFAFA] -mt-[110px]">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: ANIMATION_DURATION.normal,
                  delay: index * 0.08,
                  ease: EASING.smooth,
                }}
                className="bg-white border border-[#06003F]/10 rounded-[12px] p-8 hover:border-[#06003F]/20 transition-all duration-300"
              >
                <div className="text-[15px] font-bold text-[#FF4E3A] mb-4">{feature.number}</div>
                <h3 className="text-[24px] font-bold text-[#06003F] mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-[#06003F]/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expandable Security Pillars */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
            className="text-center mb-20"
          >
            <h2 className="text-[56px] md:text-[64px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-6">
              Security Pillars
            </h2>
            <p className="text-[17px] text-[#06003F]/60 max-w-2xl mx-auto">
              Four foundational layers protecting your healthcare data
            </p>
          </motion.div>

          <ExpandableCards />
        </div>
      </section>

      {/* Content + Image Section 1 - Content Left */}
      <section className="relative py-32 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
            >
              <h2 className="text-[56px] md:text-[64px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-8">
                Real-Time Threat Intelligence
              </h2>
              <p className="text-[17px] text-[#06003F]/60 leading-relaxed">
                Our advanced security monitoring system operates 24/7, leveraging machine learning
                algorithms to detect and neutralize threats before they impact your operations. With
                real-time alerts and automated response protocols, your healthcare data remains
                protected against emerging vulnerabilities and sophisticated attack vectors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706248504630-d165ae5f7134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmQ8ZW58MXx8fHwxNzY4MjgyMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Security monitoring dashboard"
                className="w-full h-[500px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content + Image Section 2 - Content Right */}
      <section className="relative py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
              className="relative order-2 lg:order-1"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZW5jcnlwdGlvbiUyMG5ldHdvcmt8ZW58MXx8fHwxNzY4MzE2NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Data encryption network"
                className="w-full h-[500px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-[56px] md:text-[64px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-8">
                Enterprise-Grade Encryption
              </h2>
              <p className="text-[17px] text-[#06003F]/60 leading-relaxed">
                Every piece of data is protected with military-grade AES-256 encryption, both at
                rest and in transit. Our automated key management system ensures seamless rotation
                and compliance, while zero-knowledge architecture guarantees that only authorized
                parties can access sensitive healthcare information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-[56px] md:text-[64px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-6">
              Questions About Security?
            </h2>
            <p className="text-[18px] text-[#06003F]/60 mb-12 leading-relaxed">
              Our security team is here to answer your questions and provide detailed documentation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-[#06003F] text-white rounded-full font-semibold text-[15px] hover:bg-[#06003F]/90 transition-all shadow-xl shadow-[#06003F]/20 flex items-center gap-2 group"
              >
                Schedule Security Review
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white border border-[#06003F]/10 text-[#06003F] rounded-full font-semibold text-[15px] hover:bg-black/5 transition-all shadow-sm"
              >
                Download Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
