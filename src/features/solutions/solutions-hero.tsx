"use client";

import { motion } from "framer-motion";

/**
 * Solutions page hero — split navy / blue background (design export).
 */
export function SolutionsHero() {
  return (
    <section className="relative flex w-full items-center overflow-hidden pt-12 pb-12 lg:h-[440px] lg:pb-0">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[70%_30%]">
        <div className="h-full w-full bg-[#06003F]" />
        <div className="hidden h-full w-full bg-[#02007F] lg:block" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center px-6 lg:px-12">
        <div className="grid h-full w-full grid-cols-1 items-center lg:grid-cols-[70%_30%]">
          <div className="flex w-full flex-col items-start justify-between md:flex-row md:items-center lg:pr-16 xl:pr-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-auto"
            >
              <h1 className="font-satoshi text-[42px] font-light leading-[1.1] tracking-tight text-white md:text-[56px] lg:text-[64px]">
                Autonomous
                <br />
                Agents, Tailored to
                <br />
                Your Workflow
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-8 flex w-full shrink-0 md:mt-0 md:w-[320px]"
            >
              <p className="mx-[0px] mb-[0px] mt-[150px] w-full text-sm leading-relaxed text-[#EFEBF2] opacity-80 md:text-[15px] font-satoshi">
                Our agent, Joy, arrives pre-trained with a diverse set of RCM skills and deep domain
                knowledge in medical, dental, and enterprise workflows
              </p>
            </motion.div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
