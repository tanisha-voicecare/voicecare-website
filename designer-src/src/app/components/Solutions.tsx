import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, FileCheck, Database, Server, ShieldCheck, Globe, Key, Bell, Activity } from "lucide-react";
import { Footer } from "./Footer";
import { createScrollAnimation, ANIMATION_DURATION, EASING } from "@/utils/animations";
import certificationShields from "figma:asset/8e7f562df772a665047e6fdd0dcb28b63e0c271c.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const Solutions = ({ onNavigate }: { onNavigate: (view: 'home' | 'about' | 'team' | 'platform' | 'solutions' | 'blogs' | 'press' | 'careers') => void }) => {
  const [activeTab, setActiveTab] = React.useState<'infrastructure' | 'organizational' | 'product' | 'internal' | 'data'>('infrastructure');

  const securityCategories = {
    infrastructure: {
      icon: Server,
      title: "Infrastructure Security",
      features: [
        { text: "We maintain our service infrastructure", icon: Server },
        { text: "We conduct regular backups of production data", icon: Database },
        { text: "Multi-factor authentication (MFA) is enforced on all systems", icon: Key },
        { text: "Firewalls and intrusion prevention and detection systems protect our network", icon: ShieldCheck }
      ]
    },
    organizational: {
      icon: ShieldCheck,
      title: "Organizational Security",
      features: [
        { text: "All endpoints are encrypted", icon: Lock },
        { text: "Anti-malware technology is utilized", icon: ShieldCheck },
        { text: "Password policy is enforced", icon: Key },
        { text: "Security training is implemented", icon: Activity },
        { text: "Contractors sign Confidentiality Agreements and BAAs", icon: FileCheck },
        { text: "Production inventory is maintained", icon: Database },
        { text: "Employees acknowledge Confidentiality Agreements", icon: FileCheck }
      ]
    },
    product: {
      icon: Lock,
      title: "Product Security",
      features: [
        { text: "Data is encrypted both at rest and in transit", icon: Lock },
        { text: "Vulnerability and system monitoring procedures have been established", icon: Eye }
      ]
    },
    internal: {
      icon: Key,
      title: "Internal Security",
      features: [
        { text: "Scanned for and remediated vulnerabilities", icon: Eye },
        { text: "Tested the incident response plan", icon: Bell },
        { text: "Processed access requests as required", icon: Key },
        { text: "Restricted production deployment access", icon: Lock },
        { text: "Enforced change management procedures", icon: FileCheck },
        { text: "Established a configuration management system", icon: Server },
        { text: "Provided an available support system", icon: Bell },
        { text: "Established third-party agreements", icon: FileCheck },
        { text: "Maintained cybersecurity insurance", icon: Shield },
        { text: "Reviewed system capacity", icon: Activity }
      ]
    },
    data: {
      icon: Database,
      title: "Data and Privacy",
      features: [
        { text: "Established privacy policy", icon: FileCheck },
        { text: "Security awareness and privacy training", icon: Activity }
      ]
    }
  };

  const features = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Full compliance with healthcare data protection standards",
      image: "https://images.unsplash.com/photo-1646038572891-86b08ccd6719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwd2F2ZXN8ZW58MXx8fHwxNzY4MTQwMDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "AES-256 encryption for all data at rest and in transit",
      image: "https://images.unsplash.com/photo-1630973981820-4a756320d1de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xvZ3JhcGhpYyUyMGdyYWRpZW50JTIwYWJzdHJhY3Q8ZW58MXx8fHwxNzY4MTQwNjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description: "Real-time threat detection and incident response",
      image: "https://images.unsplash.com/photo-1762716514229-739f6769e282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYWJzdHJhY3QlMjBncmFkaWVudHxlbnwxfHx8fDE3NjgyMDIyODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: ShieldCheck,
      title: "SOC 2 Type II",
      description: "Independently audited security controls",
      image: "https://images.unsplash.com/photo-1689005046927-0aa9f398247a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMG1lc2glMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjgyMzAxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const certifications = [
    { name: "HIPAA", icon: Shield },
    { name: "SOC 2", icon: ShieldCheck },
    { name: "HITRUST", icon: Lock },
    { name: "GDPR", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Simple Gradient Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-y-0 left-12 right-12 bg-gradient-to-br from-[#FF4E3A] via-[#06003F] via-50% to-[#02007F] rounded-b-[29px]"
        />

        <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="text-[18px] text-white/80 mb-6 tracking-wide"
            >
              We are SOC 2 Type II attested, HIPAA-compliant.
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white inline-block px-2 pb-4"
            >
              Healthcare Data. Maximum Security.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Certification Shields Section */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Subtle radial glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,78,58,0.03)_0%,_transparent_50%)]" />
        
        <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: EASING.smooth }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASING.smooth }}
              className="relative"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 78, 58, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 78, 58, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: 'center center'
              }}
            >
              <ImageWithFallback 
                src={certificationShields} 
                alt="HIPAA Compliant and AICPA SOC 2 Certifications" 
                className="w-full max-w-[450px] h-auto relative z-10"
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASING.smooth }}
              className="text-[#06003F]/60 text-[18px] text-center mt-12 max-w-3xl leading-relaxed"
            >
              Independently verified and certified to meet the highest standards of healthcare data security and compliance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Compliance and Monitoring Section */}
      <section className="relative bg-white p-[0px]">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth }}
            className="text-center mb-20 max-w-4xl mx-auto"
          >
            <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.05] mb-6">
              Compliance and Monitoring
            </h2>
            <p className="text-[17px] text-[#06003F]/60 leading-relaxed">
              We provide an overview of our dedication to compliance and security, offering access to certifications, documentation, and details on our strict control adherence.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: ANIMATION_DURATION.normal, ease: EASING.smooth, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <motion.button
              onClick={() => setActiveTab('infrastructure')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'infrastructure'
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              Infrastructure
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('organizational')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'organizational'
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              Organizational
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('product')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'product'
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              Product
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('internal')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'internal'
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              Internal
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('data')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-3 rounded-[6px] text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'data'
                  ? 'bg-[#06003F] text-white'
                  : 'bg-white border border-[#06003F]/10 text-[#06003F] hover:border-[#06003F]/30'
              }`}
            >
              Data & Privacy
            </motion.button>
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
                  transition={{ duration: 0.4, delay: index * 0.05, ease: EASING.smooth }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#F8F9FA] rounded-[12px] p-8 hover:bg-[#FF4E3A]/5 hover:border hover:border-[#FF4E3A]/20 transition-all duration-300 cursor-pointer group"
                >
                  {/* Icon Container */}
                  <motion.div 
                    className="w-12 h-12 rounded-[8px] bg-[#06003F]/5 group-hover:bg-[#FF4E3A]/10 flex items-center justify-center mb-6 transition-all duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
                  >
                    <Icon className="w-6 h-6 text-[#06003F] group-hover:text-[#FF4E3A] transition-colors duration-300" strokeWidth={1.5} />
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

      <Footer onNavigate={onNavigate} />
    </div>
  );
};