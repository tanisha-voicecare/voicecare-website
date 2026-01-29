'use client';

/**
 * Header/Navbar Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Navbar.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE):
 *
 * Layout:
 * - fixed top-0 left-0 right-0 z-50
 * - h-14 (56px)
 * - flex items-center justify-between
 *
 * Background:
 * - bg-white/80
 * - backdrop-blur-md
 * - border-b border-black/[0.08]
 *
 * Scroll Behavior:
 * - Threshold: scrollY > 20
 * - Default padding: px-[96px]
 * - Scrolled padding: px-[48px]
 * - Animation: 0.4s, easing [0.23, 1, 0.32, 1]
 *
 * Entry Animation:
 * - Initial: y: -20, opacity: 0
 * - Animate: y: 0, opacity: 1
 * - Duration: 0.5s
 *
 * Logo:
 * - h-12 (48px)
 *
 * Nav Links:
 * - hidden md:flex items-center gap-8
 * - text-[14px] font-medium
 * - Default: text-[#06003F]/60
 * - Hover: text-[#06003F]
 * - Active: text-[#FF4E3A]
 *
 * CTAs:
 * - flex items-center gap-4
 * - Login: text-sm font-medium text-[#06003F] hover:text-[#FF4E3A]
 * - Button: bg-[#FF4E3A] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium
 *           hover:brightness-110 shadow-sm
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

// ============================================
// Types
// ============================================

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: 'Platform', href: '/platform' },
  { label: 'Security', href: '/security' },
  { label: 'Company', href: '/company' },
  // { label: 'Blogs', href: '/blog' }, // TODO: Re-enable when WordPress CMS is connected
  { label: 'Press', href: '/press' },
  // { label: 'Docs', href: '/docs' }, // TODO: Re-enable when docs are available
];

// ============================================
// Icons
// ============================================

function MenuIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// ============================================
// Component
// ============================================

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        y: { duration: 0.5 },
        opacity: { duration: 0.5 },
      }}
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-md border-b border-black/[0.04]"
    >
      <motion.nav
        initial={{
          paddingLeft: 96,
          paddingRight: 96,
        }}
        animate={{
          paddingLeft: isScrolled ? 48 : 96,
          paddingRight: isScrolled ? 48 : 96,
        }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="flex items-center justify-between h-full"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/png/logo.png"
            alt="VoiceCare AI logo"
            width={180}
            height={48}
            sizes="180px"
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#06003F]/60">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#06003F] transition-colors ${
                pathname === item.href ? 'text-[#FF4E3A]' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://customer.voicecare.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#06003F] hover:text-[#FF4E3A] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="https://customer.voicecare.ai/become-a-customer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF4E3A] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium hover:brightness-110 transition-all shadow-sm"
          >
            Become a Customer
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-[#06003F]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/[0.04]"
        >
          <div className="px-6 py-4">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 text-[14px] font-medium hover:bg-[#06003F]/5 hover:text-[#06003F] rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'text-[#FF4E3A]'
                      : 'text-[#06003F]/70'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-black/[0.04] space-y-3">
                <Link
                  href="https://customer.voicecare.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2.5 text-sm font-medium text-[#06003F] text-center hover:bg-[#06003F]/5 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="https://customer.voicecare.ai/become-a-customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2.5 bg-[#FF4E3A] text-white text-center text-sm font-medium rounded-[4px] hover:brightness-110 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become a Customer
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export default Header;
