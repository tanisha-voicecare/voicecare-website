"use client";

import { useState, useCallback } from "react";
import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function ROICalculator() {
  const [tasks, setTasks] = useState(25000);
  const [costPerTask, setCostPerTask] = useState(8);
  const [slaDays, setSlaDays] = useState(14);

  const monthlySavings = useCallback(() => {
    const currentCost = tasks * costPerTask;
    const aiCost = tasks * 4.5;
    return Math.max(0, currentCost - aiCost);
  }, [tasks, costPerTask]);

  const hoursReclaimed = useCallback(() => {
    const totalMinutes = tasks * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toLocaleString()}hrs ${minutes}min`;
  }, [tasks]);

  const throughputIncrease = useCallback(() => {
    if (slaDays <= 1) return 0;
    return Math.round(((slaDays - 1) / slaDays) * 100);
  }, [slaDays]);

  return (
    <SectionWrapper
      id="roi-calculator"
      className="bg-[#02007F] text-white"
      innerClassName="max-w-[1600px]"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-32">
        {/* Left Column */}
        <div className="flex flex-col">
          {/* Heading Container (Fixed height to align with right paragraph) */}
          <div className="flex h-auto flex-col justify-end lg:h-[144px]">
            <FadeIn>
              <h2 className="font-satoshi text-[40px] font-normal leading-[120%] text-white sm:text-[48px] lg:text-[60px]">
                ROI: The Margin
                <br />
                Expansion Calculator
              </h2>
            </FadeIn>
          </div>

          {/* Inputs Container */}
          <FadeIn delay={0.2} className="mt-12 flex flex-col gap-8 lg:mt-16">
            {/* Input 1: Tasks (Slider) */}
            <div className="w-full max-w-[652px]">
              <label className="mb-3 block font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Average Manual Tasks per Month
              </label>
              <div className="relative flex h-[64px] items-center bg-[#06003F] px-6">
                <span className="font-satoshi text-[24px] font-normal leading-[120%] text-white">
                  {tasks.toLocaleString()}
                </span>
                
                {/* Custom Slider Track matching Figma */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px]">
                  {/* Active Red Line */}
                  <div
                    className="absolute left-0 top-0 h-[3px] bg-[#FF4E3A]"
                    style={{ width: `${(tasks / 100000) * 100}%` }}
                  />
                  {/* Thumb Pointer */}
                  <div
                    className="absolute top-1/2 h-[8px] w-[32px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-[#FF4E3A]"
                    style={{ left: `${(tasks / 100000) * 100}%` }}
                  />
                </div>

                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={tasks}
                  onChange={(e) => setTasks(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div className="mt-3 flex justify-between font-satoshi text-[16px] font-normal leading-[120%] text-white">
                <span>1,000</span>
                <span>100,000+</span>
              </div>
            </div>

            {/* Input 2: Cost (Text Input) */}
            <div className="w-full max-w-[652px]">
              <label className="mb-3 block font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Current Cost per Internal FTE / BPO Task
              </label>
              <div className="flex h-[64px] items-center bg-[#06003F] px-6">
                <span className="font-satoshi text-[24px] font-normal leading-[120%] text-white">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={costPerTask}
                  onChange={(e) => setCostPerTask(Number(e.target.value))}
                  className="w-full bg-transparent pl-1 font-satoshi text-[24px] font-normal leading-[120%] text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Input 3: SLA (Text Input) */}
            <div className="w-full max-w-[652px]">
              <label className="mb-3 block font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Average Wait Time / SLA (Days)
              </label>
              <div className="flex h-[64px] items-center bg-[#06003F] px-6">
                <input
                  type="number"
                  value={slaDays}
                  onChange={(e) => setSlaDays(Number(e.target.value))}
                  className="w-16 bg-transparent font-satoshi text-[24px] font-normal leading-[120%] text-white focus:outline-none"
                />
                <span className="ml-2 font-satoshi text-[24px] font-normal leading-[120%] text-white">
                  Days
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Paragraph Container (Fixed height to align with left heading) */}
          <div className="flex h-auto flex-col justify-end lg:h-[144px]">
            <FadeIn delay={0.1}>
              <p className="max-w-[480px] font-satoshi text-[16px] font-light leading-[1.25] text-white">
                Determine the exact financial impact of replacing manual labor with
                autonomous execution. Calculate your shift from fixed headcount to
                variable operating leverage.
              </p>
            </FadeIn>
          </div>

          {/* Red Card Container */}
          <FadeIn
            delay={0.3}
            className="mt-12 flex w-full flex-col justify-center gap-6 bg-[#FF4E3A] px-10 py-8 sm:px-12 lg:mt-16 lg:gap-8 lg:px-16 lg:py-10 xl:py-12"
          >
            <div className="flex flex-col gap-2">
              <p className="font-satoshi text-[60px] font-normal leading-[120%] text-white">
                $ {monthlySavings().toLocaleString()}
              </p>
              <p className="font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Monthly Labor Arbitrage (Savings)
              </p>
            </div>

            <div className="-mx-10 h-px bg-white/20 sm:-mx-12 lg:-mx-16" />

            <div className="flex flex-col gap-2 xl:flex-row xl:items-baseline xl:gap-4">
              <p className="font-satoshi text-[36px] font-normal leading-[120%] text-white">
                {hoursReclaimed()}
              </p>
              <p className="font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Hours of Bandwidth Reclaimed
              </p>
            </div>

            <div className="-mx-10 h-px bg-white/20 sm:-mx-12 lg:-mx-16" />

            <div className="flex flex-col gap-2 xl:flex-row xl:items-baseline xl:gap-4">
              <p className="font-satoshi text-[36px] font-normal leading-[120%] text-white">
                {throughputIncrease()}%
              </p>
              <p className="font-satoshi text-[16px] font-normal leading-[120%] text-white">
                Projected Increase in Throughput
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
