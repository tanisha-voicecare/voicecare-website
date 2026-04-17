"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { primaryNav } from "@/constants/navigation";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** Fixed bar height — spacer + CTA strip must stay in sync. */
const HEADER_HEIGHT_PX = 56;

/** Scroll threshold before elevated header styles apply. */
const SCROLL_THRESHOLD_PX = 10;

const scheduleDemoHref = "/schedule-demo";
const becomeCustomerHref = "https://customer.voicecare.ai/become-a-customer";
const loginHref = "https://customer.voicecare.ai/";

const ctaLinkClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap px-6 text-[14px] text-white transition-colors duration-200";

const brandLogoClass =
  "h-11 w-auto max-h-[48px] sm:h-12 sm:max-h-[52px]";

function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type HeaderCtaItem = {
  readonly href: string;
  readonly label: string;
  readonly desktopClassName: string;
  readonly mobileClassName: string;
};

const headerCtaItems: readonly HeaderCtaItem[] = [
  {
    href: scheduleDemoHref,
    label: "Schedule a Demo",
    desktopClassName:
      "bg-gradient-to-r from-[#FF4E3A] to-[#02007F] hover:opacity-90",
    mobileClassName:
      "rounded-lg bg-[#FF4E3A] px-6 py-2.5 text-center text-white transition-colors duration-200 hover:bg-[#ff3a25]",
  },
  {
    href: becomeCustomerHref,
    label: "Become a Customer",
    desktopClassName: "bg-[#06003F] hover:bg-[#02007F]",
    mobileClassName:
      "rounded-lg bg-[#06003F] px-6 py-2.5 text-center text-white transition-colors duration-200 hover:bg-[#02007F]",
  },
  {
    href: loginHref,
    label: "Login",
    desktopClassName: "bg-[#FF4E3A] hover:bg-[#ff3a25]",
    mobileClassName:
      "rounded-lg bg-[#FF4E3A] px-6 py-2.5 text-center text-white transition-colors duration-200 hover:bg-[#ff3a25]",
  },
] as const;

function DesktopPrimaryNav({
  pathname,
}: {
  pathname: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute left-1/2 z-10 my-0 mr-0 ml-[-440px] hidden -translate-x-1/2 items-center gap-8 md:flex"
    >
      {primaryNav.map((item) => {
        const isActive = isNavItemActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-[15px] text-[#06003F] transition-colors duration-200 hover:text-[#FF4E3A]",
              isActive && "text-[#FF4E3A]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </motion.div>
  );
}

function DesktopCtaStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute top-0 right-0 bottom-0 z-20 ml-auto hidden h-full items-stretch gap-0 lg:flex"
    >
      {headerCtaItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(ctaLinkClass, item.desktopClassName)}
          style={{ height: HEADER_HEIGHT_PX, fontWeight: 500 }}
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

/**
 * Global marketing header: real links for crawlability, semantic landmarks,
 * and a passive scroll listener for the elevated state.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const mobileMenuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="shrink-0"
        style={{ height: HEADER_HEIGHT_PX }}
        aria-hidden
      />
      <motion.header
        id="site-header"
        initial={reduceMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-white"
        )}
      >
        <div className="relative w-full">
          <nav
            className="relative mx-auto flex max-w-[1440px] items-center justify-between px-8 md:px-12 lg:px-16 lg:pr-[360px] xl:px-20 2xl:px-24"
            style={{ height: HEADER_HEIGHT_PX }}
            aria-label="Primary"
          >
            <Link href="/" className="relative z-20 shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="my-0 mr-0 ml-[-135px] flex items-center max-md:ml-0"
              >
                <Image
                  src={assets.brand.logo}
                  alt="VoiceCare AI"
                  width={216}
                  height={58}
                  className={brandLogoClass}
                  sizes="(max-width: 640px) 180px, 216px"
                  priority
                  unoptimized
                />
              </motion.div>
            </Link>

            <DesktopPrimaryNav pathname={pathname} />

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-20 p-2 text-[#06003F] lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </motion.button>
          </nav>

          <DesktopCtaStrip />

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                key="mobile-primary-nav"
                id={mobileMenuId}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                aria-label="Mobile primary"
                className="space-y-4 px-8 pb-6 md:px-12 lg:hidden xl:px-20 2xl:px-24"
              >
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-[#06003F] transition-colors duration-200 hover:text-[#FF4E3A]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="space-y-3 pt-4">
                  {headerCtaItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn("block w-full", item.mobileClassName)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
