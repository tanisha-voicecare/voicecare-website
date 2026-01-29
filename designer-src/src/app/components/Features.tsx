import React from "react";
import { motion } from "motion/react";
import { Cpu, Network, Layers, Shield, Globe, Zap } from "lucide-react";
import { createScrollAnimation, createStaggeredAnimation, EASING } from "@/utils/animations";

const FEATURES = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Neural Architecture",
    description: "Multi-agent systems built on a robust, scalable foundation with built-in memory and state management."
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Dynamic Orchestration",
    description: "Automated task delegation and feedback loops that allow agents to self-correct and optimize in real-time."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Enterprise Governance",
    description: "Fine-grained permissions, audit logs, and compliance guardrails designed for highly regulated industries."
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Hybrid Integration",
    description: "Connect seamlessly with your existing stack via pre-built connectors for ERP, CRM, and cloud infrastructure."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Latency-Optimized",
    description: "Sub-millisecond decision making and action execution across a globally distributed agent network."
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global Scale",
    description: "Deploy once and scale infinitely. Our infrastructure handles millions of concurrent agent interactions."
  }
];

export const Features = () => {
  return (
    <section className="py-32 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="text-[11px] font-semibold tracking-[0.15em] text-white/40 uppercase mb-6">
              Core Capabilities
            </div>
            <h2 className="text-[48px] md:text-[56px] font-medium text-white tracking-tight leading-[1.1]">
              AI agents that do real work
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-end"
          >
            <p className="text-[16px] text-white/60 leading-relaxed">
              AI agents that work with your tools and complete real tasks like scheduling appointments, updating your CRM, and completing workflows automatically. Designed for quick deployment without technical barriers.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.08]">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="bg-[#0A0A0A] p-10 hover:bg-[#111111] transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#FF4E3A]/10 flex items-center justify-center mb-6 text-[#FF4E3A] group-hover:bg-[#FF4E3A]/20 transition-all duration-300">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-[20px] font-medium text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-[15px] text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};