"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { solutionsIndustryTabs } from "./data/solutions-industry-tabs";

const SCHEDULE_DEMO_HREF = "/schedule-demo";

/**
 * Industries tabs, accordions, and specialty grid (design export).
 */
export function SolutionsIndustriesSection() {
  const [activeTab, setActiveTab] = useState("specialist-medical");
  const [openAccordions, setOpenAccordions] = useState<number[]>([0, 1]);

  const activeTabData = solutionsIndustryTabs.find((tab) => tab.id === activeTab);

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#06003F] px-6 py-32 lg:px-16">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start gap-16 lg:flex-row xl:gap-24">
          <div className="relative w-full shrink-0 lg:w-[434px]">
            <div className="flex flex-col lg:sticky lg:top-32">
              <h2 className="mb-6 font-satoshi text-[70px] font-normal leading-[1.07] tracking-tight text-white">
                Industries
              </h2>

              <p className="mb-16 max-w-[344px] font-satoshi text-[16px] font-normal leading-[1.45] text-white">
                Joy is pre-trained on the unique taxonomies and payer rules of your specific sector.
              </p>

              <div className="mb-16 flex flex-col gap-2">
                {solutionsIndustryTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setOpenAccordions([0, 1]);
                      }}
                      className="group relative w-full overflow-hidden text-left transition-all"
                    >
                      {isActive ? (
                        <div
                          className="absolute inset-0 z-0"
                          style={{
                            backgroundImage:
                              "linear-gradient(146.128deg, rgb(255, 78, 58) 2.5166%, rgb(2, 0, 127) 79.802%)",
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 z-0 bg-transparent transition-colors group-hover:bg-white/5" />
                      )}
                      <div className="relative z-10 flex items-center px-8 py-7">
                        <span
                          className={`font-satoshi text-[21px] leading-[1.2] ${
                            isActive ? "font-normal text-white" : "font-light text-white/80"
                          }`}
                        >
                          {tab.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <Link
                href={SCHEDULE_DEMO_HREF}
                className="ml-8 flex h-[63px] w-[276px] items-center justify-center gap-3 bg-white transition-transform hover:scale-105 lg:ml-0"
              >
                <span className="font-satoshi text-[21px] leading-[1.2] text-black">Schedule a Demo</span>
                <ArrowRight className="h-6 w-6 text-[#FF4E3A]" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-12 lg:pt-8">
            {activeTabData?.accordions.map((accordion, index) => {
              const isOpen = openAccordions.includes(index);

              return (
                <div key={`${activeTab}-${index}-${accordion.title}`} className="flex w-full flex-col">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="group flex w-full items-center justify-between pb-6"
                  >
                    <span className="font-satoshi text-[36px] font-normal leading-[1.2] text-white transition-colors group-hover:text-white/90">
                      {accordion.title}
                    </span>
                    <ChevronDown
                      className={`h-6 w-6 text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>

                  <div className="mb-8 h-px w-full bg-white/20" />

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {accordion.intros && accordion.intros.length > 0 && (
                        <div className="mb-12 flex flex-col gap-8">
                          {accordion.intros.map((intro, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              <span className="font-satoshi text-[21px] font-normal leading-[1.4] text-white">
                                {intro.label}
                              </span>
                              <p className="max-w-[800px] font-satoshi text-[16px] font-light leading-[1.45] text-white">
                                {intro.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {accordion.items && accordion.items.length > 0 && (
                        <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 xl:grid-cols-3">
                          {accordion.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex h-[243px] flex-col justify-start bg-[#02007F] p-8 transition-transform duration-300 hover:-translate-y-1"
                            >
                              <h4 className="mb-4 font-satoshi text-[21px] font-bold leading-[1.3] whitespace-pre-wrap text-white">
                                {item.title}
                              </h4>
                              <p className="font-satoshi text-[16px] font-light leading-[1.45] text-white">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {(!activeTabData?.accordions || activeTabData.accordions.length === 0) && (
              <div className="flex h-[400px] w-full flex-col items-center justify-center border border-dashed border-white/20">
                <p className="font-satoshi text-[21px] text-white/50">
                  Select a specialization to view capabilities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
