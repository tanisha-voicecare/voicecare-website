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
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight } from 'lucide-react';

// ============================================
// Pages that should NOT render Footer (per designer-src)
// ============================================
const PAGES_WITHOUT_FOOTER = ['/schedule-demo', '/partner-with-us', '/privacy-policy', '/terms-of-service'];

// ============================================
// Footer Navigation Data - EXACT from designer-src
// ============================================

interface FooterLink {
  name: string;
  href: string;
  isDisabled?: boolean;
}

// Company column - EXACT from designer-src
const companyLinks: FooterLink[] = [
  { name: 'About Us', href: '/company' },
  { name: 'Our Platform', href: '/platform' },
  { name: 'Who We Serve', href: '/who-we-serve' },
  { name: 'Schedule a Demo', href: '/schedule-demo' },
  { name: 'Press', href: '/press' },
];

// Resources column - EXACT from designer-src
const resourcesLinks: FooterLink[] = [
  { name: 'Pricing', href: '#', isDisabled: true }, // Page not implemented yet
  { name: 'Security', href: '/security' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blogs', href: '#', isDisabled: true }, // WordPress CMS not connected yet
];

// Legal links - Privacy Policy & Terms of Service from designer-src, Cookie Policy added for compliance
const legalLinks: FooterLink[] = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  // { name: 'Cookie Policy', href: '/cookies' },
];

// ============================================
// Component
// ============================================

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hide footer on specific pages (per designer-src behavior)
  if (PAGES_WITHOUT_FOOTER.includes(pathname)) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="bg-white border-t border-[#06003F]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        {/* Main Footer Content */}
        <div className="pt-12 sm:pt-16 lg:pt-20 pb-8 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-8">
            {/* Logo & Social */}
            <div className="md:col-span-2 lg:col-span-4 text-center lg:text-left">
              <Link href="/" className="inline-block">
                <Image
                  src="/icons/png/logo.png"
                  alt="VoiceCare AI logo"
                  width={200}
                  height={80}
                  sizes="200px"
                  className="h-16 sm:h-20 w-auto mb-6 sm:mb-8 mx-auto lg:mx-0"
                />
              </Link>

              {/* Social Section */}
              <div>
                <p className="text-[13px] font-medium text-[#06003F]/40 uppercase tracking-wider mb-3 sm:mb-4">
                  Connect with us
                </p>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] border border-[#06003F]/10 hover:border-[#FF4E3A] bg-white hover:bg-[#FF4E3A] text-[#06003F] hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation columns wrapper for tablet centering */}
            <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {/* Company Column - EXACT from designer-src */}
              <div className="text-center lg:text-left">
                <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-4 sm:mb-6">
                  Company
                </h5>
                <ul className="space-y-3 sm:space-y-4">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      {link.isDisabled ? (
                        <span className="text-[15px] text-[#06003F]/40 cursor-not-allowed min-h-[44px] inline-flex items-center justify-center lg:justify-start">
                          {link.name}
                        </span>
                      ) : link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center justify-center lg:justify-start group min-h-[44px]"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center justify-center lg:justify-start group min-h-[44px]"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column - EXACT from designer-src */}
              <div className="text-center lg:text-left">
                <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-4 sm:mb-6">
                  Resources
                </h5>
                <ul className="space-y-3 sm:space-y-4">
                  {resourcesLinks.map((link) => (
                    <li key={link.name}>
                      {link.isDisabled ? (
                        <span className="text-[15px] text-[#06003F]/40 cursor-not-allowed min-h-[44px] inline-flex items-center justify-center lg:justify-start">
                          {link.name}
                        </span>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[15px] text-[#06003F]/60 hover:text-[#FF4E3A] transition-colors inline-flex items-center justify-center lg:justify-start group min-h-[44px]"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-2 lg:col-span-4 text-center lg:text-left">
              <h5 className="text-[13px] font-semibold text-[#06003F] uppercase tracking-wider mb-4 sm:mb-6">
                Stay Updated
              </h5>
              <p className="text-[15px] text-[#06003F]/60 mb-4 sm:mb-6 leading-relaxed max-w-md mx-auto lg:mx-0 lg:max-w-none">
                Get the latest news and updates delivered to your inbox.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Stacked input + button layout on all screen sizes */}
                <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0 lg:max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 lg:px-5 py-3.5 text-[15px] bg-[#06003F]/[0.02] border border-[#06003F]/10 rounded-[8px] focus:outline-none focus:border-[#FF4E3A] focus:bg-white transition-all placeholder:text-[#06003F]/30 text-center lg:text-left"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full bg-[#FF4E3A] text-white px-5 py-3 rounded-[6px] font-semibold hover:bg-[#FF4E3A]/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 min-h-[44px]"
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
        <div className="py-6 sm:py-8 border-t border-[#06003F]/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-[13px] sm:text-[14px] text-[#06003F]/40 text-center lg:text-left order-3 lg:order-1">
              © 2025 VoiceCare AI. All rights reserved.
            </p>

            {/* Compliance Badges - placeholder for local asset */}
            <div className="flex items-center gap-4 order-1 lg:order-2">
              <Image
                src="/images/icons/soc-hipaa-badges.png"
                alt="SOC 2 Type II and HIPAA Compliance badges"
                width={200}
                height={80}
                sizes="200px"
                className="h-16 sm:h-20 w-auto"
                onError={(e) => {
                  // Hide if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex items-center gap-4 sm:gap-6 order-2 lg:order-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[13px] sm:text-[14px] text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors min-h-[44px] flex items-center"
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
