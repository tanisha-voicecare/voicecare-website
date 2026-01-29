'use client';

/**
 * Footer Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Footer.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Footer Container:
 * - bg-white border-t border-[#06003F]/10
 *
 * Inner Wrapper:
 * - container mx-auto px-6 md:px-16 max-w-7xl
 *
 * Main Content:
 * - pt-16 md:pt-20 pb-8 md:pb-10
 *
 * Grid:
 * - grid-cols-1 md:grid-cols-12 gap-12 md:gap-8
 *
 * Logo Column (md:col-span-4):
 * - Logo: h-20 mb-8
 * - Social label: text-[13px] font-medium text-[#06003F]/40 uppercase tracking-wider mb-4
 * - LinkedIn button: w-11 h-11 rounded-[8px] border border-[#06003F]/10
 *   hover:border-[#FF4E3A] bg-white hover:bg-[#FF4E3A]
 *   text-[#06003F] hover:text-white
 *
 * Navigation Columns (md:col-span-2 each):
 * - Headings: text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6
 * - Links: text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors
 * - space-y-4
 *
 * Newsletter Column (md:col-span-4):
 * - Heading: text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6
 * - Description: text-[15px] text-[#06003F]/60 mb-6 leading-relaxed
 * - Input: px-5 py-3.5 text-[15px] bg-[#06003F]/[0.02] border border-[#06003F]/10
 *   rounded-[8px] focus:border-[#FF4E3A] placeholder:text-[#06003F]/30
 * - Submit button: bg-[#FF4E3A] text-white px-5 rounded-[6px] font-semibold
 *
 * Bottom Bar:
 * - py-8 border-t border-[#06003F]/10
 * - Copyright: text-[14px] text-[#06003F]/40
 * - Compliance badges: h-20
 * - Legal links: text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A]
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight } from 'lucide-react';

// ============================================
// Footer Navigation Data - EXACT from designer-src
// ============================================

const companyLinks = [
  { name: 'About Us', href: '/company' },
  { name: 'Our Platform', href: '/platform' },
  // { name: 'Who We Serve', href: '/services' }, // TODO: Re-enable when services page is fully implemented
  { name: 'Press', href: '/press' },
  { name: 'Careers', href: '/careers' },
];

const resourcesLinks = [
  { name: 'Pricing', href: '#' },
  { name: 'Security', href: '/security' },
  { name: 'Careers', href: '/careers' },
  // { name: 'Blogs', href: '/blog' }, // TODO: Re-enable when WordPress CMS is connected
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
];

// ============================================
// Component
// ============================================

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="bg-white border-t border-[#06003F]/10">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        {/* Main Footer Content */}
        <div className="pt-16 md:pt-20 pb-8 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Logo & Social */}
            <div className="md:col-span-4">
              <Link href="/">
                <Image
                  src="/icons/png/logo.png"
                  alt="VoiceCare AI logo"
                  width={200}
                  height={80}
                  sizes="200px"
                  className="h-20 w-auto mb-8"
                />
              </Link>

              {/* Social Section */}
              <div>
                <p className="text-[13px] font-medium text-[#06003F]/40 uppercase tracking-wider mb-4">
                  Connect with us
                </p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[#06003F]/10 hover:border-[#FF4E3A] bg-white hover:bg-[#FF4E3A] text-[#06003F] hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div className="md:col-span-2">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Company
              </h5>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="md:col-span-2">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Resources
              </h5>
              <ul className="space-y-4">
                {resourcesLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center group"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-6">
                Stay Updated
              </h5>
              <p className="text-[15px] text-[#06003F]/60 mb-6 leading-relaxed">
                Get the latest news and updates delivered to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-3.5 text-[15px] bg-[#06003F]/[0.02] border border-[#06003F]/10 rounded-[8px] focus:outline-none focus:border-[#FF4E3A] focus:bg-white transition-all placeholder:text-[#06003F]/30"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF4E3A] text-white px-5 rounded-[6px] font-semibold hover:bg-[#FF4E3A]/90 transition-all flex items-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitted ? (
                      'Subscribed!'
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {isSubmitted && (
                <p className="text-[13px] text-[#FF4E3A] mt-3 font-medium">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[#06003F]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[14px] text-[#06003F]/40">
              © 2025 VoiceCare AI. All rights reserved.
            </p>

            {/* Compliance Badges - placeholder for local asset */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/icons/soc-hipaa-badges.png"
                alt="SOC 2 Type II and HIPAA Compliance badges"
                width={200}
                height={80}
                sizes="200px"
                className="h-20 w-auto"
                onError={(e) => {
                  // Hide if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
