'use client';

/**
 * PartnerForm Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/PartnerWithUs.tsx
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
 * Input/Textarea:
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
  organisationName: string;
  department: string;
  industryVertical: string;
  email: string;
  phoneNumber: string;
  howCanIHelp: string;
}

export function PartnerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organisationName: '',
    department: '',
    industryVertical: '',
    email: '',
    phoneNumber: '',
    howCanIHelp: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="container mx-auto px-6 md:px-16 max-w-7xl pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Organisation Name - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-[14px] font-medium mb-2">
                Name <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="organisationName" className="block text-[14px] font-medium mb-2">
                Organisation Name <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="text"
                id="organisationName"
                name="organisationName"
                required
                value={formData.organisationName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="Enter your organisation name"
              />
            </div>
          </div>

          {/* Department and Industry Vertical - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="department" className="block text-[14px] font-medium mb-2">
                Department <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="text"
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="Enter your department"
              />
            </div>

            <div>
              <label htmlFor="industryVertical" className="block text-[14px] font-medium mb-2">
                Industry Vertical <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="text"
                id="industryVertical"
                name="industryVertical"
                required
                value={formData.industryVertical}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="e.g., Healthcare, Finance, Retail"
              />
            </div>
          </div>

          {/* Email and Phone Number - Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-[14px] font-medium mb-2">
                Email Address <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-[14px] font-medium mb-2">
                Phone Number <span className="text-[#FF4E3A]">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* How can I help? - Full Width */}
          <div>
            <label htmlFor="howCanIHelp" className="block text-[14px] font-medium mb-2">
              How can I help?
            </label>
            <textarea
              id="howCanIHelp"
              name="howCanIHelp"
              value={formData.howCanIHelp}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors resize-none"
              placeholder="Type here..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#FF4E3A] text-white px-8 py-2.5 rounded-[6px] font-medium hover:brightness-110 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default PartnerForm;
