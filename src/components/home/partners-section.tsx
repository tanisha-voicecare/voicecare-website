"use client";

import { motion } from "framer-motion";

import { assets } from "@/lib/assets";

const ehrSrc = assets.landing.logos.ehr;
const payerSrc = assets.landing.logos.payers;

/** Shared dimensions; fixed width keeps flex `gap` visually even between marks. */
const slotSizeClassName =
  "flex h-10 w-[148px] shrink-0 items-center justify-center overflow-hidden px-2.5 sm:h-11 sm:w-[156px] md:h-12 md:w-[160px] lg:h-14 lg:w-[168px]";

/** EHR row sits on white — subtle card matches main site grid. */
const ehrSlotClassName = `${slotSizeClassName} rounded-[12px] bg-white`;

/** Universal Reach sits on gray — no white plate behind logos. */
const payerSlotClassName = slotSizeClassName;

const partnerLogoImgClassName = "h-full w-full max-w-full object-contain";

function LogoStrip({
  sources,
  variant,
  keySuffix = "",
  decorative = false,
}: {
  sources: readonly string[];
  variant: "ehr" | "payer";
  keySuffix?: string;
  decorative?: boolean;
}) {
  const slotClass = variant === "ehr" ? ehrSlotClassName : payerSlotClassName;
  return (
    <>
      {sources.map((src, index) => (
        <div
          key={`${src}-${index}${keySuffix}`}
          className={slotClass}
          aria-hidden={decorative || undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- marquee strip; static paths */}
          <img
            src={src}
            alt=""
            width={200}
            height={60}
            className={partnerLogoImgClassName}
          />
        </div>
      ))}
    </>
  );
}

function MarqueeRow({
  sources,
  variant,
  reverse,
}: {
  sources: readonly string[];
  variant: "ehr" | "payer";
  reverse?: boolean;
}) {
  return (
    <div
      className={`partner-marquee-track${reverse ? " partner-marquee-track--reverse" : ""}`}
    >
      {/* One flex row: every gap (including loop seam) matches — see keyframe offset. */}
      <div className="partner-marquee-inner shrink-0">
        <LogoStrip sources={sources} variant={variant} />
        <LogoStrip sources={sources} variant={variant} keySuffix="-dup" decorative />
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="partners-logo-marquees relative w-full">
      <style>{`
        .partners-logo-marquees {
          --partner-marquee-gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .partners-logo-marquees {
            --partner-marquee-gap: 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .partners-logo-marquees {
            --partner-marquee-gap: 2rem;
          }
        }
        @keyframes partner-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            /* With flex gap, -50% under-scrolls by half a gap; subtract that for a seamless loop. */
            transform: translate3d(
              calc(-50% - 0.5 * var(--partner-marquee-gap)),
              0,
              0
            );
          }
        }
        .partner-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: partner-marquee 50s linear infinite;
          will-change: transform;
        }
        .partner-marquee-inner {
          display: flex;
          align-items: center;
          gap: var(--partner-marquee-gap);
        }
        .partner-marquee-track--reverse {
          animation-direction: reverse;
        }
      `}</style>

      {/* Deep EHR Integration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-hidden bg-white py-[54px]"
      >
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <p
              className="shrink-0 text-[14px] font-medium text-[#06003F] md:text-[15px]"
              style={{ fontWeight: 500 }}
            >
              Deep EHR Integration
            </p>

            <div className="min-w-0 flex-1 overflow-hidden">
              <MarqueeRow sources={ehrSrc} variant="ehr" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Universal Reach */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full overflow-hidden bg-[#F5F5F5] py-[54px]"
      >
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <p
              className="shrink-0 text-[14px] font-medium leading-snug text-[#06003F] md:text-[15px]"
              style={{ fontWeight: 500 }}
            >
              Universal Reach:
              <br />
              Connectivity to 4,000+ Payers
            </p>

            <div className="min-w-0 flex-1 overflow-hidden">
              <MarqueeRow sources={payerSrc} variant="payer" reverse />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
