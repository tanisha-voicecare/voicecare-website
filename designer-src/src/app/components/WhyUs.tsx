import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Zap, CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Higher ROI",
    description: "Returns within a few months, not years.",
    icon: TrendingUp,
    bgColor: "#06003F",
    percentage: "70%"
  },
  {
    title: "Faster",
    description: "Collect, initiate, and transfer data",
    icon: Zap,
    bgColor: "#FF4E3A",
    percentage: "40%"
  },
  {
    title: "Better Data Quality",
    description: "Consistent data output with every conversation",
    icon: CheckCircle,
    bgColor: "#06003F",
    percentage: "20%"
  }
];

export const WhyUs = () => {
  return (
    <>
      {/* REMOVED: Image 1 Split Layout - "Why VoiceCare. (Option 1)" */}
      {/* <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#06003F] mb-8">
                Why VoiceCare.
              </h2>
              
              <p className="text-lg text-[#06003F]/60 leading-relaxed font-medium">
                Transform complex and variable administrative conversations and tasks into structured notes, in one click, in near real-time.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 + index * 0.1, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  whileHover={{ 
                    y: -4, 
                    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } 
                  }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-14 h-14 rounded-[6px] flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                    style={{ backgroundColor: benefit.bgColor }}
                  >
                    <benefit.icon className="w-6 h-6 text-white relative z-10" />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: benefit.bgColor }}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#06003F] mb-2 group-hover:text-[#FF4E3A] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-[#06003F]/60 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Image 2: Grid Layout with Percentages - KEEPING THIS ONE */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16 text-center"
          >
            <h2 className="text-[48px] font-bold tracking-tight text-[#06003F] mb-8">
              Why VoiceCare.
            </h2>
            
            <p className="text-lg text-[#06003F]/60 leading-relaxed font-medium max-w-3xl mx-auto mt-[-30px] mr-[208px] mb-[0px] ml-[208px]">
              Our agentic AI goes beyond traditional automation to take meaningful action, delivering measurable outcomes that transform healthcare operations.
            </p>
          </motion.div>

          {/* Grid Features - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1, 
                  ease: [0.23, 1, 0.32, 1] 
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                }}
                className={`group cursor-pointer ${index !== benefits.length - 1 ? 'md:border-r md:border-[#06003F]/10 md:pr-12' : ''}`}
              >
                {/* Icon */}
                <motion.div 
                  className="w-16 h-16 rounded-[12px] flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ backgroundColor: benefit.bgColor }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <benefit.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </motion.div>

                {/* Percentage + Title on same line */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                    {benefit.percentage}
                  </span>
                  <h3 className="text-2xl font-bold text-[#06003F] tracking-tight group-hover:text-[#FF4E3A] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[16px] text-[#06003F]/60 leading-relaxed group-hover:text-[#06003F]/80 transition-colors duration-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};