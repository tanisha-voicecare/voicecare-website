'use client';

/**
 * ScheduleDemoForm Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/ScheduleDemo.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Form Wrapper (motion.div):
 * - max-w-4xl mx-auto
 * - Animation: initial={{ opacity: 0, y: 20 }}, animate={{ opacity: 1, y: 0 }}
 * - Transition: { duration: 0.6, delay: 0.2 }
 *
 * Form:
 * - space-y-6
 *
 * Grid Rows:
 * - grid grid-cols-1 md:grid-cols-2 gap-6
 *
 * Labels:
 * - block text-[14px] font-medium mb-2
 * - Required indicator: <span className="text-[#FF4E3A]">*</span>
 *
 * Input/Select/Textarea:
 * - w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px]
 * - focus:outline-none focus:border-[#FF4E3A] transition-colors
 * - Textarea: resize-none
 *
 * Submit Button:
 * - w-full bg-[#FF4E3A] text-white px-8 py-2.5 rounded-[6px]
 * - font-medium hover:brightness-110 transition-all
 */

import { useState } from 'react';
import { motion } from 'motion/react';

interface FormData {
  name: string;
  companyName: string;
  callsPerMonth: string;
  industryVertical: string;
  email: string;
  phoneNumber: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function ScheduleDemoForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    callsPerMonth: '',
    industryVertical: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'schedule-demo',
          fields: {
            // Exact field names from existing voicecare.ai MetForm
            'name': formData.name,
            'company___': formData.companyName,
            'callspermonth': formData.callsPerMonth,
            'industry': formData.industryVertical,
            'mf-email': formData.email,
            'mf-telephone': formData.phoneNumber,
            'message': formData.message,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'Thank you! We will contact you shortly.');
        // Reset form on success
        setFormData({
          name: '',
          companyName: '',
          callsPerMonth: '',
          industryVertical: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pb-12 sm:pb-16 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Name and Company Name - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="name" className="block text-[13px] sm:text-[14px] font-medium">
              Name <span className="text-[#FF4E3A]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit]"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="companyName" className="block text-[13px] sm:text-[14px] font-medium">
              Company Name <span className="text-[#FF4E3A]">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit]"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        {/* Calls per month and Industry Vertical - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="callsPerMonth" className="block text-[13px] sm:text-[14px] font-medium">
              No of calls to automate per month <span className="text-[#FF4E3A]">*</span>
            </label>
            <select
              id="callsPerMonth"
              name="callsPerMonth"
              required
              value={formData.callsPerMonth}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit] appearance-none"
            >
              <option value="">Select range</option>
              <option value="0-1000">0 - 1,000</option>
              <option value="1000-5000">1,000 - 5,000</option>
              <option value="5000-10000">5,000 - 10,000</option>
              <option value="10000-25000">10,000 - 25,000</option>
              <option value="25000-50000">25,000 - 50,000</option>
              <option value="50000+">50,000+</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="industryVertical" className="block text-[13px] sm:text-[14px] font-medium">
              Industry Vertical <span className="text-[#FF4E3A]">*</span>
            </label>
            <select
              id="industryVertical"
              name="industryVertical"
              required
              value={formData.industryVertical}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit] appearance-none"
            >
              <option value="">Select industry</option>
              <option value="Dental Practice">Dental Practice</option>
              <option value="Provider Practice">Provider Practice</option>
              <option value="Hospital / Health System">Hospital / Health System</option>
              <option value="Ambulatory Surgery Center">Ambulatory Surgery Center</option>
              <option value="Patient Access / Support Program">Patient Access / Support Program</option>
              <option value="Speciality Pharmacy">Speciality Pharmacy</option>
              <option value="Labs / Diagnostics">Labs / Diagnostics</option>
              <option value="Payors">Payors</option>
              <option value="Technology Provider">Technology Provider</option>
            </select>
          </div>
        </div>

        {/* Email and Phone Number - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="email" className="block text-[13px] sm:text-[14px] font-medium">
              Email Address <span className="text-[#FF4E3A]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit]"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="phoneNumber" className="block text-[13px] sm:text-[14px] font-medium">
              Phone Number <span className="text-[#FF4E3A]">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit]"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Message - Full Width */}
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="message" className="block text-[13px] sm:text-[14px] font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors resize-none text-base md:text-[inherit]"
            placeholder="Type here..."
          />
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-4 rounded-[6px] text-sm ${
              submitStatus === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 sm:pt-3 md:pt-4">
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="w-full bg-[#FF4E3A] text-white px-6 sm:px-8 py-3 md:py-2.5 rounded-[6px] font-medium hover:brightness-110 transition-all text-[15px] sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitStatus === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        </form>
      </motion.div>
    </section>
  );
}

export default ScheduleDemoForm;
