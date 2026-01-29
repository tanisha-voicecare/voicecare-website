import React, { useState } from "react";
import { motion } from "motion/react";
import { createScrollAnimation } from "@/utils/animations";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import americanSpecialtyHealth from "figma:asset/81116975e04518d4138c9b496b8b163130326944.png";
import anthem from "figma:asset/10d47d5e4a1a6e2e6ed27dfa13c5bc10c3695fdb.png";
import aetna from "figma:asset/e8e9c1aba23c48b2bb10c67c5638d55c5e5e3f87.png";
import blueShield from "figma:asset/7e903a7eaa382677ed9d7c5d1ec6cc73e0614638.png";
import cigna from "figma:asset/f577ad7e18c9ed7f65093f1ea8f1de01f8e8f914.png";
import quantumHealth from "figma:asset/8f4c0c46fe9e18a9f5f56f1cbe32a5e9a7ef16cc.png";
import umr from "figma:asset/dc2f57d8f97a9a06e4d01bd89e09cf9b42e3cc67.png";
import unitedHealthcare from "figma:asset/f41a67fc9c2266db01fa3bc4ea6e0f4e64e38e3e.png";

const LOGOS = [
  { name: "American Specialty Health", src: americanSpecialtyHealth, size: "normal" },
  { name: "Anthem", src: anthem, size: "normal" },
  { name: "Aetna", src: aetna, size: "normal" },
  { name: "Blue Shield of California", src: blueShield, size: "large" },
  { name: "Cigna Healthcare", src: cigna, size: "large" },
  { name: "Quantum Health", src: quantumHealth, size: "normal" },
  { name: "UMR", src: umr, size: "normal" },
  { name: "United Healthcare", src: unitedHealthcare, size: "normal" },
];

export const Logos = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="border-y border-border/50 py-10 bg-background/50 mt-[-123px] mr-[0px] mb-[0px] ml-[0px] overflow-hidden"
    >
      <div className="relative">
        <motion.div
          className="flex gap-12 md:gap-16 items-center"
          animate={{
            x: isPaused ? undefined : [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {/* Render logos multiple times for seamless loop */}
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
            <ImageWithFallback 
              key={`${logo.name}-${index}`}
              src={logo.src}
              alt={logo.name}
              className={`w-auto object-contain flex-shrink-0 grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-300 cursor-pointer ${
                logo.size === "large" ? "h-10 md:h-12 max-h-10 md:max-h-12" : "h-7 md:h-8 max-h-7 md:max-h-8"
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};