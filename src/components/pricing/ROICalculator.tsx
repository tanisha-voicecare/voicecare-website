'use client';

/**
 * ROI Calculator Component
 * Logic and content matching VoiceCare.ai/pricing
 * Styling matching our current website theme
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, RotateCcw } from 'lucide-react';

// ============================================
// Types
// ============================================

interface CalculatorInputs {
  // Main metrics
  totalPatientsPerWeek: number;
  callsPerWeek: number;
  employeesMakingCalls: number;
  hoursPerWeek: number;
  hourlyRates: number;
  // Miscellaneous (cost per employee)
  recruiting: number;
  onboarding: number;
  training: number;
  certifyingFullTime: number;
  benefits: number;
}

interface ROIResults {
  totalCost: number;
  costPerCall: number;
  voicecareCost: number;
  savings: number;
  savingsPercentage: number;
}

// ============================================
// Constants
// ============================================

const WEEKS_PER_YEAR = 52;
const VOICECARE_COST_RATIO = 0.2; // VoiceCare costs approximately 20% of traditional costs

const DEFAULT_INPUTS: CalculatorInputs = {
  totalPatientsPerWeek: 0,
  callsPerWeek: 0,
  employeesMakingCalls: 0,
  hoursPerWeek: 0,
  hourlyRates: 0,
  recruiting: 0,
  onboarding: 0,
  training: 0,
  certifyingFullTime: 0,
  benefits: 0,
};

// ============================================
// Helper Functions
// ============================================

const calculateROI = (inputs: CalculatorInputs): ROIResults => {
  const {
    callsPerWeek,
    employeesMakingCalls,
    hoursPerWeek,
    hourlyRates,
    recruiting,
    onboarding,
    training,
    certifyingFullTime,
    benefits,
  } = inputs;

  // Annual labor cost
  const annualLaborCost = employeesMakingCalls * hoursPerWeek * hourlyRates * WEEKS_PER_YEAR;

  // Annual miscellaneous costs (per employee costs × number of employees)
  const miscCostPerEmployee = recruiting + onboarding + training + certifyingFullTime + benefits;
  const totalMiscCost = miscCostPerEmployee * employeesMakingCalls;

  // Total annual cost
  const totalCost = annualLaborCost + totalMiscCost;

  // Total annual calls
  const totalAnnualCalls = callsPerWeek * WEEKS_PER_YEAR;

  // Cost per call
  const costPerCall = totalAnnualCalls > 0 ? totalCost / totalAnnualCalls : 0;

  // VoiceCare's cost (approximately 20% of total cost)
  const voicecareCost = totalCost * VOICECARE_COST_RATIO;

  // Savings
  const savings = totalCost - voicecareCost;
  const savingsPercentage = totalCost > 0 ? (savings / totalCost) * 100 : 0;

  return {
    totalCost,
    costPerCall,
    voicecareCost,
    savings,
    savingsPercentage,
  };
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// ============================================
// Sub-components
// ============================================

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}

function SliderInput({ label, value, onChange, min, max, step = 1, suffix = '' }: SliderInputProps) {
  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] sm:text-[14px] text-[#06003F]/70">{label}</span>
        <span className="text-[14px] sm:text-[15px] font-semibold text-[#06003F]">
          {formatNumber(value)} {suffix}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-[#06003F]/10 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#FF4E3A]
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#FF4E3A]
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #FF4E3A 0%, #FF4E3A ${percentage}%, rgba(6,0,63,0.1) ${percentage}%, rgba(6,0,63,0.1) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-[#06003F]/40">
        <span>{formatNumber(min)}</span>
        <span>{formatNumber(max)}</span>
      </div>
    </div>
  );
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
  helperText?: string;
}

function NumberInput({ label, value, onChange, min = 0, max = 100000, prefix = '', helperText }: NumberInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] sm:text-[14px] text-[#06003F]/70">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06003F]/50 text-[14px]">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= min && val <= max) {
              onChange(val);
            }
          }}
          min={min}
          max={max}
          placeholder="0"
          inputMode="decimal"
          className={`w-full bg-white border border-[#06003F]/10 rounded-lg py-2.5 text-[#06003F] text-[14px] sm:text-[15px] focus:outline-none focus:border-[#FF4E3A]/50 focus:ring-2 focus:ring-[#FF4E3A]/10 transition-all ${
            prefix ? 'pl-7 pr-3' : 'px-3'
          }`}
        />
      </div>
      {helperText && (
        <p className="text-[11px] text-[#06003F]/40">{helperText}</p>
      )}
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ label, value, highlight = false }: SummaryRowProps) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[#06003F]/5 last:border-b-0">
      <span className="text-[13px] sm:text-[14px] text-[#06003F]/60">{label}</span>
      <span className={`text-[13px] sm:text-[14px] font-medium ${highlight ? 'text-[#FF4E3A] font-bold' : 'text-[#06003F]'}`}>
        {value}
      </span>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const resetCalculator = () => {
    setInputs(DEFAULT_INPUTS);
  };

  return (
    <section className="py-14 sm:py-18 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#06003F] tracking-tight leading-[1.1]">
            ROI Calculator
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 md:gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-[#06003F]/10 shadow-sm"
          >
            {/* Reset Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={resetCalculator}
                className="flex items-center gap-1.5 text-[13px] text-[#06003F]/50 hover:text-[#FF4E3A] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Main Sliders */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <SliderInput
                label="Total patients served per week"
                value={inputs.totalPatientsPerWeek}
                onChange={(v) => updateInput('totalPatientsPerWeek', v)}
                min={0}
                max={1000000}
                step={1000}
                suffix="/week"
              />
              <SliderInput
                label="No. of calls per week"
                value={inputs.callsPerWeek}
                onChange={(v) => updateInput('callsPerWeek', v)}
                min={0}
                max={1000000}
                step={1000}
                suffix="calls"
              />
              <SliderInput
                label="No. of employees making calls"
                value={inputs.employeesMakingCalls}
                onChange={(v) => updateInput('employeesMakingCalls', v)}
                min={0}
                max={200}
                step={1}
                suffix="emps"
              />
              <SliderInput
                label="No. of hours per week"
                value={inputs.hoursPerWeek}
                onChange={(v) => updateInput('hoursPerWeek', v)}
                min={0}
                max={200}
                step={1}
                suffix="hrs"
              />
            </div>

            {/* Hourly Rates */}
            <div className="mb-8">
              <NumberInput
                label="Hourly Rates"
                value={inputs.hourlyRates}
                onChange={(v) => updateInput('hourlyRates', v)}
                min={0}
                max={500}
                prefix="$"
              />
            </div>

            {/* Miscellaneous Section */}
            <div className="pt-6 border-t border-[#06003F]/10">
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#06003F] mb-6">
                Miscellaneous
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <NumberInput
                  label="Recruiting"
                  value={inputs.recruiting}
                  onChange={(v) => updateInput('recruiting', v)}
                  min={0}
                  max={100000}
                  helperText="Min: 0 - Max: 100000 | Avg. cost per employee"
                />
                <NumberInput
                  label="Onboarding"
                  value={inputs.onboarding}
                  onChange={(v) => updateInput('onboarding', v)}
                  min={0}
                  max={100000}
                  helperText="Min: 0 - Max: 100000 | Avg. cost per employee"
                />
                <NumberInput
                  label="Training"
                  value={inputs.training}
                  onChange={(v) => updateInput('training', v)}
                  min={0}
                  max={100000}
                  helperText="Min: 0 - Max: 100000 | Avg. cost per employee"
                />
                <NumberInput
                  label="Certifying full time employees"
                  value={inputs.certifyingFullTime}
                  onChange={(v) => updateInput('certifyingFullTime', v)}
                  min={0}
                  max={100000}
                  helperText="Min: 0 - Max: 100000 | Avg. cost per employee"
                />
                <NumberInput
                  label="Benefits"
                  value={inputs.benefits}
                  onChange={(v) => updateInput('benefits', v)}
                  min={0}
                  max={100000}
                  helperText="Min: 0 - Max: 100000 | Avg. cost per employee"
                />
              </div>
            </div>
          </motion.div>

          {/* Summary Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#06003F]/10 shadow-sm h-fit lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#06003F]">
                Total Summary
              </h3>
              <Calculator className="w-5 h-5 text-[#06003F]/30" />
            </div>

            {/* Summary Table Header */}
            <div className="flex justify-between items-center py-2.5 border-b border-[#06003F]/10 mb-1">
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#06003F]/50 uppercase tracking-wide">Name</span>
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#06003F]/50 uppercase tracking-wide">Total</span>
            </div>

            {/* Summary Rows */}
            <div className="space-y-0">
              <SummaryRow
                label="Total patients served per week"
                value={`${formatNumber(inputs.totalPatientsPerWeek)} /week`}
              />
              <SummaryRow
                label="No. of calls per week"
                value={`${formatNumber(inputs.callsPerWeek)} calls`}
              />
              <SummaryRow
                label="No. of employees making calls"
                value={`${formatNumber(inputs.employeesMakingCalls)} emps`}
              />
              <SummaryRow
                label="No. of hours per week"
                value={`${formatNumber(inputs.hoursPerWeek)} hrs`}
              />
              <SummaryRow
                label="Hourly Rates"
                value={formatCurrency(inputs.hourlyRates)}
              />
              <SummaryRow
                label="Recruiting"
                value={formatCurrency(inputs.recruiting)}
              />
              <SummaryRow
                label="Onboarding"
                value={formatCurrency(inputs.onboarding)}
              />
              <SummaryRow
                label="Training"
                value={formatCurrency(inputs.training)}
              />
              <SummaryRow
                label="Certifying full time employees"
                value={formatCurrency(inputs.certifyingFullTime)}
              />
              <SummaryRow
                label="Benefits"
                value={formatCurrency(inputs.benefits)}
              />
            </div>

            {/* Results */}
            <div className="mt-6 pt-4 border-t border-[#06003F]/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] sm:text-[15px] font-medium text-[#06003F]">Total Cost</span>
                <span className="text-[14px] sm:text-[15px] font-bold text-[#06003F]">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14px] sm:text-[15px] font-medium text-[#06003F]">Cost per call</span>
                <span className="text-[14px] sm:text-[15px] font-bold text-[#06003F]">
                  {formatCurrency(results.costPerCall)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[14px] sm:text-[15px] font-medium text-[#06003F]">VoiceCare&apos;s Cost</span>
                <span className="text-[16px] sm:text-[18px] font-bold text-[#FF4E3A] bg-[#FF4E3A]/10 px-3 py-1.5 rounded-lg">
                  {formatCurrency(results.voicecareCost)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-4 border-t border-[#06003F]/5">
              <a
                href="/schedule-demo"
                className="flex items-center justify-center w-full px-6 py-3.5 bg-[#FF4E3A] text-white rounded-lg font-medium hover:brightness-110 transition-all text-[14px] sm:text-[15px]"
              >
                Schedule a Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ROICalculator;
