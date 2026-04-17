import Image from "next/image";
import { Fragment } from "react";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** Footer trust row — larger marks, shared cap height */
const ROW_H = "h-[4.5rem] sm:h-20 md:h-[5.5rem] lg:h-24";

const ITEMS = [
  {
    src: assets.company.security.hipaaBadge,
    alt: "HIPAA compliant",
    wide: true,
  },
  {
    src: assets.company.security.soc2Badge,
    alt: "AICPA SOC",
    wide: false,
  },
  {
    src: assets.company.security.isoBadge,
    alt: "ISO certification badge",
    wide: false,
  },
] as const;

function Divider() {
  return (
    <div
      role="presentation"
      className={cn("w-px shrink-0 bg-black/[0.18]", ROW_H)}
    />
  );
}

export type ComplianceBadgesRowProps = {
  className?: string;
};

/**
 * Single-row HIPAA, SOC 2, and ISO marks with light vertical rules.
 * Heights match across marks (Figma footer).
 */
export function ComplianceBadgesRow({ className }: ComplianceBadgesRowProps) {
  return (
    <div
      className={cn(
        "flex w-max max-w-full flex-nowrap items-end justify-start gap-2 sm:gap-3 md:gap-4",
        className,
      )}
    >
      {ITEMS.map((item, index) => (
        <Fragment key={item.alt}>
          {index > 0 ? <Divider /> : null}
          <div
            className={cn(
              "relative shrink-0",
              ROW_H,
              item.wide
                ? "w-[9rem] sm:w-[9.5rem] md:w-40 lg:w-[11rem]"
                : "w-[4.5rem] sm:w-20 md:w-[5.5rem] lg:w-24",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 160px, 200px"
              unoptimized
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
