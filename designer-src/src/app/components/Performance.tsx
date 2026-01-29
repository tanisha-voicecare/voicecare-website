import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const Performance = () => {
  return (
    <>
      <section className="py-20 border-y border-border/50 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left"
          >
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
              <div className="text-4xl font-bold tracking-tighter mb-2 text-[#06003F]">99.99<span className="text-[#FF4E3A]">%</span></div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#06003F]/40">Uptime SLA</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
              <div className="text-4xl font-bold tracking-tighter mb-2 text-[#06003F]">100M<span className="text-[#FF4E3A]">+</span></div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#06003F]/40">Daily Agent Interactions</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
              <div className="text-4xl font-bold tracking-tighter mb-2 text-[#06003F]">&lt;200<span className="text-[#FF4E3A]">ms</span></div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#06003F]/40">Reasoning Latency</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
              <div className="text-4xl font-bold tracking-tighter mb-2 text-[#06003F]">ISO<span className="text-[#FF4E3A]">27001</span></div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#06003F]/40">Certified Infrastructure</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* REMOVED: "Built for Enterprise Intelligence at Scale." */}
      {/* <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-8 text-[#06003F]">
                Built for Enterprise <br />
                <span className="text-[#06003F]/60">Intelligence at Scale.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Deploy agentic workflows with a robust infrastructure designed for high-density computations and seamless integration. Our system ensures every decision is validated through a multi-layered verification protocol, providing the reliability required by global enterprises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-video rounded-[8px] overflow-hidden border border-[#06003F]/10 shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655696644743-972ed99b89f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZnV0dXJpc3RpYyUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMHN5c3RlbSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njc2OTg5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                className="w-full h-full object-cover grayscale brightness-90"
                alt="System Architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06003F]/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section> */}
    </>
  );
};