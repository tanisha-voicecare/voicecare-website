'use client';

/**
 * Header/Navbar Component
 * PIXEL-PERFECT implementation from designer-src/src/app/components/Navbar.tsx
 *
 * DESIGNER EXACT VALUES (DO NOT CHANGE for desktop lg+):
 *
 * Layout:
 * - fixed top-0 left-0 right-0 z-50
 * - h-14 (56px)
 * - flex items-center justify-between
 *
 * Background:
 * - bg-background/80 (white with opacity)
 * - backdrop-blur-md
 * - border-b border-border/50
 *
 * Scroll Behavior (desktop lg+ only):
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
 * Nav Links (EXACT from designer-src, desktop lg+ only):
 * - hidden lg:flex items-center gap-8
 * - text-[14px] font-medium text-muted-foreground
 * - Hover: text-foreground
 * - Active: text-[#FF4E3A]
 *
 * Navigation Items (EXACT from designer-src):
 * - Platform
 * - Security
 * - Company
 * - Partner with Us
 * - Schedule a Demo
 *
 * CTAs:
 * - flex items-center gap-4
 * - Login: text-sm font-medium text-[#06003F] hover:text-[#FF4E3A]
 * - Button: bg-[#FF4E3A] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium
 *           hover:brightness-110 shadow-sm
 *
 * RESPONSIVE BREAKPOINTS:
 * - Mobile (<768px): Hamburger menu, px-4 padding
 * - Tablet (768-1023px): Hamburger menu, px-6 padding
 * - Desktop (>=1024px): Full nav, animated padding (48-96px)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

// ============================================
// Types
// ============================================

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

interface DropdownItem {
  label: string;
  href: string;
  isDisabled?: boolean;
}

// Navigation items EXACT from designer-src/src/app/components/Navbar.tsx
const navigation: NavItem[] = [
  { label: 'Platform', href: '/platform' },
  { label: 'Security', href: '/security' },
  { label: 'Company', href: '/company' },
  { label: 'Partner with Us', href: '/partner-with-us' },
  { label: 'Schedule a Demo', href: '/schedule-demo' },
];

// Platform dropdown items - EXACT from designer-src/src/app/components/Navbar.tsx
const platformDropdownItems: DropdownItem[] = [
  { label: 'What we do', href: '/platform#platform-hero' },
  { label: 'Benefits', href: '/platform#platform-benefits' },
  { label: 'Our Solutions', href: '/platform#platform-solutions' },
  { label: 'Who we serve', href: '/who-we-serve' },
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
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [isMobilePlatformExpanded, setIsMobilePlatformExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Check if viewport is desktop (lg: 1024px+) or large desktop (xl: 1280px+)
  useEffect(() => {
    const lgQuery = window.matchMedia('(min-width: 1024px)');
    const xlQuery = window.matchMedia('(min-width: 1280px)');
    
    const handleLgChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
      // Close mobile menu when switching to desktop
      if (e.matches) {
        setIsMobileMenuOpen(false);
        setIsMobilePlatformExpanded(false);
      }
    };
    
    const handleXlChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLargeDesktop(e.matches);
    };
    
    // Set initial values
    handleLgChange(lgQuery);
    handleXlChange(xlQuery);
    
    // Listen for changes
    lgQuery.addEventListener('change', handleLgChange);
    xlQuery.addEventListener('change', handleXlChange);
    return () => {
      lgQuery.removeEventListener('change', handleLgChange);
      xlQuery.removeEventListener('change', handleXlChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key and return focus to hamburger
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobilePlatformExpanded(false);
    // Return focus to hamburger button
    hamburgerRef.current?.focus();
  }, []);

  // Close dropdown and mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
        if (isPlatformDropdownOpen) {
          setIsPlatformDropdownOpen(false);
        }
      }
    };

    if (isPlatformDropdownOpen || isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isPlatformDropdownOpen, isMobileMenuOpen, closeMobileMenu]);

  // Handle dropdown hover with delay to prevent flickering
  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsPlatformDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsPlatformDropdownOpen(false);
    }, 150);
  };

  // Handle anchor navigation with smooth scroll
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsPlatformDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobilePlatformExpanded(false);

    const [path, hash] = href.split('#');
    
    if (pathname === path) {
      // Already on Platform page, just scroll
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to Platform page then scroll
      router.push(href);
    }
  };

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
        initial={isDesktop ? { 
          paddingLeft: isLargeDesktop ? 96 : 48, 
          paddingRight: isLargeDesktop ? 96 : 48 
        } : undefined}
        animate={isDesktop ? {
          paddingLeft: isScrolled ? (isLargeDesktop ? 48 : 32) : (isLargeDesktop ? 96 : 48),
          paddingRight: isScrolled ? (isLargeDesktop ? 48 : 32) : (isLargeDesktop ? 96 : 48),
        } : undefined}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={`flex items-center justify-between h-full ${
          !isDesktop ? 'px-4 sm:px-6' : ''
        }`}
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

        {/* Desktop Navigation - EXACT from designer-src (lg+ only) */}
        <div className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#06003F]/60">
          {navigation.map((item) =>
            item.label === 'Platform' ? (
              // Platform with dropdown
              <div
                key={item.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  type="button"
                  className={`text-[14px] hover:text-[#06003F] transition-colors flex items-center gap-1 ${
                    pathname === item.href || pathname?.startsWith('/platform') ? 'text-[#FF4E3A]' : ''
                  }`}
                  onClick={() => router.push(item.href)}
                  aria-expanded={isPlatformDropdownOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isPlatformDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isPlatformDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white backdrop-blur-md border border-[#06003F]/10 rounded-[6px] overflow-hidden z-[100]"
                      style={{ boxShadow: '0 10px 40px rgba(6, 0, 63, 0.15)' }}
                    >
                      {platformDropdownItems.map((dropdownItem) => (
                        dropdownItem.isDisabled ? (
                          <span
                            key={dropdownItem.label}
                            className="block w-full px-4 py-3 text-left text-[14px] font-medium text-[#06003F]/40 cursor-not-allowed"
                          >
                            {dropdownItem.label}
                          </span>
                        ) : (
                          <a
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={(e) => handleAnchorClick(e, dropdownItem.href)}
                            className="block w-full px-4 py-3 text-left text-[14px] font-medium text-[#06003F] hover:bg-[#FF4E3A]/5 hover:text-[#FF4E3A] transition-colors"
                          >
                            {dropdownItem.label}
                          </a>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : item.isDisabled ? (
              <span
                key={item.label}
                className="text-[14px] text-[#06003F]/40 cursor-not-allowed"
              >
                {item.label}
              </span>
            ) : item.isExternal ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] hover:text-[#06003F] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] hover:text-[#06003F] transition-colors ${
                  pathname === item.href ? 'text-[#FF4E3A]' : ''
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs (lg+ only) */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile menu button (visible below lg) */}
        <button
          ref={hamburgerRef}
          type="button"
          className="lg:hidden p-2 -mr-2 text-[#06003F] min-h-[44px] min-w-[44px] flex items-center justify-center"
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

      {/* Mobile menu (visible below lg) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-black/[0.04] overflow-y-auto max-h-[calc(100vh-3.5rem)]"
          >
            <div className="px-4 sm:px-6 py-4">
              <div className="flex flex-col gap-1">
                {navigation.map((item) =>
                  item.label === 'Platform' ? (
                    // Platform with accordion on mobile
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => setIsMobilePlatformExpanded(!isMobilePlatformExpanded)}
                        className={`w-full px-4 py-3 min-h-[44px] text-[14px] font-medium hover:bg-[#06003F]/5 rounded-lg transition-colors flex items-center justify-between ${
                          pathname === item.href || pathname?.startsWith('/platform')
                            ? 'text-[#FF4E3A]'
                            : 'text-[#06003F]/70'
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMobilePlatformExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isMobilePlatformExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-1">
                              {platformDropdownItems.map((dropdownItem) => (
                                dropdownItem.isDisabled ? (
                                  <span
                                    key={dropdownItem.label}
                                    className="block px-4 py-3 min-h-[44px] text-[13px] text-[#06003F]/40 cursor-not-allowed flex items-center"
                                  >
                                    {dropdownItem.label}
                                  </span>
                                ) : (
                                  <a
                                    key={dropdownItem.href}
                                    href={dropdownItem.href}
                                    onClick={(e) => handleAnchorClick(e, dropdownItem.href)}
                                    className="block px-4 py-3 min-h-[44px] text-[13px] text-[#06003F]/60 hover:text-[#FF4E3A] hover:bg-[#06003F]/5 rounded-lg transition-colors flex items-center"
                                  >
                                    {dropdownItem.label}
                                  </a>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.isDisabled ? (
                    <span
                      key={item.label}
                      className="px-4 py-3 min-h-[44px] text-[14px] font-medium text-[#06003F]/40 cursor-not-allowed flex items-center"
                    >
                      {item.label}
                    </span>
                  ) : item.isExternal ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 min-h-[44px] text-[14px] font-medium text-[#06003F]/70 hover:bg-[#06003F]/5 hover:text-[#06003F] rounded-lg transition-colors flex items-center"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-3 min-h-[44px] text-[14px] font-medium hover:bg-[#06003F]/5 hover:text-[#06003F] rounded-lg transition-colors flex items-center ${
                        pathname === item.href
                          ? 'text-[#FF4E3A]'
                          : 'text-[#06003F]/70'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="mt-4 pt-4 border-t border-black/[0.04] space-y-3">
                  <Link
                    href="https://customer.voicecare.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 min-h-[44px] text-sm font-medium text-[#06003F] text-center hover:bg-[#06003F]/5 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    href="https://customer.voicecare.ai/become-a-customer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 min-h-[44px] bg-[#FF4E3A] text-white text-center text-sm font-medium rounded-[4px] hover:brightness-110 transition-all"
                    onClick={closeMobileMenu}
                  >
                    Become a Customer
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
