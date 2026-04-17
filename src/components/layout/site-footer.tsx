"use client";

import Image from "next/image";
import Link from "next/link";

import { ComplianceBadgesRow } from "@/components/compliance";
import { companyInfo, socialLinks } from "@/constants/company";
import { footerColumns } from "@/constants/navigation";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
] as const;

function AskAiBar() {
  return (
    <div className="w-full bg-[#02007F] px-4 py-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-center gap-4">
        <p className="font-satoshi text-sm font-normal tracking-[0.01em] sm:text-[16px]">
          Ask AI about VoiceCare AI
        </p>
        <div className="flex items-center gap-4 text-white">
          <Image
            src={assets.footer.icons.sparkle}
            alt="Sparkle icon"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
          <Image
            src={assets.footer.icons.planet}
            alt="Planet icon"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
          <Image
            src={assets.footer.icons.sun}
            alt="Sun icon"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
          <Image
            src={assets.footer.icons.network}
            alt="Network icon"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const linkedin = socialLinks.find((item) => item.platform === "linkedin");

  return (
    <footer className="bg-white text-black">
      {/* Match SectionWrapper + company sections: max-w-[1600px], px-4 sm:px-6 lg:px-8 */}
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10 lg:pt-12">
        <Link href="/" className="mb-6 inline-flex w-fit md:mb-8">
          <Image
            src={assets.brand.logo}
            alt="VoiceCare AI logo"
            width={240}
            height={80}
            className="h-14 w-auto sm:h-[4.5rem]"
            unoptimized
          />
        </Link>

        <nav aria-label="Footer">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-6 md:gap-x-12 lg:gap-x-14 xl:gap-x-20">
            {footerColumns.map((column) => (
              <ul key={column.links[0]?.label} className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-satoshi text-[16px] font-normal leading-snug text-black transition-colors hover:text-[#FF4E3A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>

        {/* Below link columns: LinkedIn left, badges right (Figma) */}
        <div
          className={cn(
            "mt-8 flex flex-row items-end gap-6 sm:mt-10",
            linkedin ? "justify-between" : "justify-end",
          )}
          role="group"
          aria-label="Social and compliance"
        >
          {linkedin ? (
            <Link
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-black transition-colors hover:bg-black/85"
              aria-label="VoiceCare AI on LinkedIn"
            >
              <Image
                src="/icons/linkedin.png"
                alt=""
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </Link>
          ) : null}
          <ComplianceBadgesRow className="shrink-0" />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/[0.08] pt-8 font-satoshi text-[13px] font-normal text-black/45 sm:flex-row sm:items-center sm:justify-between lg:mt-12 lg:pt-8">
          <p>
            &copy; {companyInfo.copyrightYear} {companyInfo.legalName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#FF4E3A]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AskAiBar />
    </footer>
  );
}
