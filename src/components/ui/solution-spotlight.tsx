import Image from "next/image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export type SolutionBullet = {
  title: string;
  description?: string;
};

type SolutionSpotlightProps = {
  badgeClassName: string;
  badge: React.ReactNode;
  backgroundSrc: string;
  backgroundAlt: string;
  bullets: readonly SolutionBullet[];
  className?: string;
};

export function SolutionSpotlight({
  badgeClassName,
  badge,
  backgroundSrc,
  backgroundAlt,
  bullets,
  className,
}: SolutionSpotlightProps) {
  return (
    <section className={cn("relative isolate min-h-[32rem] overflow-hidden lg:min-h-[36rem]", className)}>
      <Image
        src={backgroundSrc}
        alt={backgroundAlt}
        fill
        className="object-cover object-center mix-blend-luminosity"
        sizes="100vw"
        priority={false}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/55" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-stretch lg:gap-16 lg:px-8 lg:py-24">
        <div className="lg:w-1/2">
          <div
            className={cn(
              "inline-block max-w-xl rounded-2xl px-6 py-6 text-white shadow-lg sm:px-8 sm:py-8",
              badgeClassName
            )}
          >
            <div className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">{badge}</div>
          </div>
          <a
            href="#schedule-demo"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-medium text-[#06003f] shadow-md transition hover:bg-white/95"
          >
            Schedule a Demo
            <span className="relative size-8">
              <Image src={assets.arrowRight} alt="" fill className="object-contain" unoptimized />
            </span>
          </a>
        </div>
        <ul className="flex flex-1 flex-col gap-4 lg:max-w-xl lg:justify-center">
          {bullets.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white/95 px-5 py-4 text-[#06003f] shadow-md backdrop-blur-sm sm:px-6 sm:py-5"
            >
              <p className="text-lg font-medium leading-snug sm:text-xl">{item.title}</p>
              {item.description ? (
                <p className="mt-2 text-base leading-relaxed text-neutral-700">{item.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
