import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Phone, FileText, Globe, Search, BarChart3, Settings, CheckCircle2, Shield, Clock, Users, TrendingUp, Sparkles, Brain, Zap, Target, Activity, Database, Network, Play, ChevronRight, ChevronLeft } from "lucide-react";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const Platform = ({ onNavigate }: { onNavigate: (view: 'home' | 'about' | 'team' | 'platform' | 'solutions') => void }) => {
  const [activeTab, setActiveTab] = useState("benefit-verification");

  const capabilities = [
    {
      id: "benefit-verification",
      icon: CheckCircle2,
      label: "Benefit Verification",
      title: "Benefit Verification",
      description: "Autonomous eligibility & coverage checks with payer systems.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "prior-authorization",
      icon: FileText,
      label: "Prior Authorization",
      title: "Prior Authorization",
      description: "Smart determination, initiation, and follow-up across channels.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "prescription-support",
      icon: Activity,
      label: "Prescription Support",
      title: "Prescription Support",
      description: "Context-aware verification and prior auth support workflows.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "claim-status",
      icon: Search,
      label: "Claim Status",
      title: "Claim Status",
      description: "Automated tracking and follow-ups for claim processing.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "claim-denials",
      icon: Shield,
      label: "Claim Denials",
      title: "Claim Denials",
      description: "Intelligent denial management and appeal readiness.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching Solutions.tsx Header Style */}
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
              We're powered by
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className="text-[84px] font-bold tracking-[-0.04em] leading-[1.1] text-white inline-block px-2 pb-4"
            >
              Healthcare Administration General Intelligence (HAGI)
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="text-[18px] text-white/80 mt-6 tracking-wide max-w-3xl mx-auto"
            >
              It is the heart of the VoiceCare platform. Using Generative and Conversational AI, it intelligently automates routine back-office workflows.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EHR Content Section */}
      <section className="relative py-[90px] bg-white px-[0px]">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[48px] font-bold text-[#06003F] mb-8 tracking-tight leading-[1.1]">
              We Are Enterprise<br />
              Administration platform
            </h2>
            <div className="text-[17px] text-[#06003F]/70 leading-relaxed space-y-6 max-w-4xl mx-auto">
              <p>
                One secure conversational platform, powered by advanced and constantly
                improving generative models for healthcare professionals to complete 1000s
                of calls and tasks in one click. You can search for historical calls, and get
                summarized use-case-specific information, which is ingested in any EHR
                or any system of record.
              </p>
              <p>
                Our AI-powered analytics gives you actionable insights to measure
                the performance of every conversation.
              </p>
              <p className="font-bold text-[18px]">
                Automate the back office to improve patient experience with every conversation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Platform Capabilities */}
      <section className="relative pt-12 pb-24 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] md:text-[56px] font-bold text-[#06003F] tracking-tight leading-[1.05]">
              Our Solutions
            </h2>
          </motion.div>

          {/* Tabbed Interface */}
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            {/* Left: Tab Navigation */}
            <div className="flex flex-col gap-3">
              {capabilities.map((cap, index) => (
                <motion.button
                  key={cap.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveTab(cap.id)}
                  className={`group flex items-center gap-3 px-6 py-4 rounded-[6px] text-left transition-all ${
                    activeTab === cap.id
                      ? "bg-[#06003F] text-white shadow-lg"
                      : "bg-transparent text-[#06003F]/60 hover:bg-[#F5F5F7]"
                  }`}
                >
                  <cap.icon className="w-5 h-5" />
                  <span className="font-semibold text-[15px]">{cap.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right: Content Area */}
            <AnimatePresence mode="wait">
              {capabilities.map(
                (cap) =>
                  activeTab === cap.id && (
                    <motion.div
                      key={cap.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#FAFAFA] rounded-[12px] p-10 border border-[#06003F]/5"
                    >
                      <h3 className="text-[32px] font-bold text-[#06003F] mb-4">{cap.title}</h3>

                      {/* Video Player Container */}
                      <div className="bg-white rounded-[12px] p-6 border border-[#06003F]/10">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#06003F]/5">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={cap.videoUrl}
                            className="absolute top-0 left-0 w-full h-full rounded-[8px]"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
              Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
                Automate tasks and conversations
              </h3>
              <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
                Schedule one-time or recurring automated phone conversations and tasks in one click.
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYXV0b21hdGlvbiUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmQ8ZW58MXx8fHwxNzY5NTI1MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare automation dashboard"
                className="w-full h-[400px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>
          </div>

          {/* Second Benefit - Image Left, Content Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1648134859177-525771773915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2VhcmNoJTIwYW5hbHl0aWNzJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2OTUyNTMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Search conversations interface"
                className="w-full h-[400px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
                Search for conversations
              </h3>
              <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
                Find structured data across every conversational audio and transcript, and get use-case specific call summary.
              </p>
            </motion.div>
          </div>

          {/* Third Benefit - Content Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
                AI-powered call analytics
              </h3>
              <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
                Generate knowledge grounded in your back-office information – with drill-down analytics for every conversation on what's working, and where to improve.
              </p>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBncmFwaHMlMjBjaGFydHN8ZW58MXx8fHwxNzY5NTI1NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI-powered analytics dashboard"
                className="w-full h-[400px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>
          </div>

          {/* Fourth Benefit - Image Left, Content Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762340275855-ae8f4c2c144e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBpbnRlcmZhY2UlMjBwZXJzb25hbGl6YXRpb24lMjBzZXR0aW5nc3xlbnwxfHx8fDE3Njk1MjU0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Customize conversations interface"
                className="w-full h-[400px] object-cover rounded-[12px] border border-[#06003F]/10"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[32px] font-bold text-[#06003F] mb-6 tracking-tight leading-[1.2]">
                Customize conversations
              </h3>
              <p className="text-[17px] text-[#06003F]/70 leading-relaxed">
                For use-case specific conversations, ask the questions that matter to deliver healthcare outcomes for your patients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};