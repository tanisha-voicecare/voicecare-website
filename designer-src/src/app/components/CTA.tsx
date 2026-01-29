import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-40 bg-[#06003F] relative overflow-hidden">
      {/* High-Impact Vibrant Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-[#06003F]" />
        
        {/* Primary Orange Glow - Top Right */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] opacity-60 blur-[120px] rounded-full"
          style={{ background: 'radial-gradient(circle, #FF4E3A 0%, transparent 70%)' }}
        />
        
        {/* Secondary Orange Glow - Bottom Left */}
        <div 
          className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] opacity-40 blur-[100px] rounded-full"
          style={{ background: 'radial-gradient(circle, #FF4E3A 0%, transparent 70%)' }}
        />
        
        {/* Deep Navy/Blue accents to mix */}
        <div 
          className="absolute top-[20%] left-[10%] w-[50%] h-[50%] opacity-50 blur-[120px] rounded-full"
          style={{ background: 'radial-gradient(circle, #0A005F 0%, transparent 70%)' }}
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-16 max-w-7xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[800px] mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FF4E3A] uppercase">AI_Agent</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-10 text-white"
          >
            Introducing Joy
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/80 mb-14 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Your automated Voice AI Agent, designed to optimize and ease administrative burden by supercharging your workflow to be more efficient and empathetic.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[#FF4E3A] text-white px-8 py-3.5 rounded-[6px] text-sm font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-[#FF4E3A]/20 hover:shadow-[#FF4E3A]/40"
            >
              Experience It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-[6px] transition-all shadow-sm"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};