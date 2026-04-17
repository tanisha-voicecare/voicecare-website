"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Advisor } from "./advisors-investors-data";

type AdvisorDetailModalProps = {
  advisor: Advisor | null;
  onClose: () => void;
};

export function AdvisorDetailModal({ advisor, onClose }: AdvisorDetailModalProps) {
  useEffect(() => {
    if (!advisor) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [advisor, onClose]);

  return (
    <AnimatePresence>
      {advisor && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-[#000033]/85 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="advisor-modal-title"
            className="relative z-[1] max-h-[85vh] w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl md:max-w-[900px]"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-[#06003f]/5 text-[#06003f]/70 transition-colors hover:bg-[#06003f]/10 md:right-6 md:top-6 md:size-10"
            >
              <X className="size-5 md:size-6" aria-hidden />
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-5 pt-12 sm:p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-[minmax(0,280px)_1fr] md:gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
                <div className="mx-auto w-full max-w-[260px] md:mx-0 md:max-w-none">
                  <div className="relative overflow-hidden rounded-xl bg-white">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={advisor.image}
                        alt={advisor.name}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 260px, 320px"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h2
                    id="advisor-modal-title"
                    className="text-2xl font-bold text-[#06003f] sm:text-3xl md:text-4xl"
                  >
                    {advisor.name}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#06003f]/60 sm:text-base">
                    {advisor.designation}
                  </p>

                  <div className="my-6 border-b border-[#06003f]/10 pb-6 sm:my-8 sm:pb-8">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#06003f]/40">
                      About
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#06003f]/80">{advisor.description}</p>
                  </div>

                  {advisor.logos.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#06003f]/40 sm:mb-4">
                        Affiliations
                      </h3>
                      {advisor.logos.length === 4 ? (
                        <div className="inline-grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                          {advisor.logos.map((logo) => (
                            <div key={logo.src} className="flex items-center justify-center">
                              <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={140}
                                height={56}
                                className="h-11 w-auto max-w-full object-contain grayscale transition-all hover:grayscale-0 md:h-12"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="inline-grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
                          {advisor.logos.map((logo) => (
                            <div key={logo.src} className="flex items-center justify-center">
                              <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={160}
                                height={56}
                                className="h-11 w-auto max-w-full object-contain grayscale transition-all hover:grayscale-0 md:h-[52px]"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {advisor.logos.length === 0 &&
                    advisor.affiliationTexts &&
                    advisor.affiliationTexts.length > 0 && (
                      <div>
                        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#06003f]/40">
                          Affiliations
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                          {advisor.affiliationTexts.map((text) => (
                            <span
                              key={text}
                              className="rounded-lg bg-[#06003f]/5 px-3 py-1.5 text-sm text-[#06003f]/70"
                            >
                              {text}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
