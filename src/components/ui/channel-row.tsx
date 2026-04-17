import Image from "next/image";

import { cn } from "@/lib/utils";

type ChannelRowProps = {
  label: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
  className?: string;
};

export function ChannelRow({ label, description, iconSrc, iconAlt, className }: ChannelRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl px-5 py-6 text-white sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-8",
        className
      )}
    >
      <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
        <div className="relative size-12 shrink-0 sm:size-14">
          <Image src={iconSrc} alt={iconAlt} fill className="object-contain" unoptimized />
        </div>
        <p className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{label}</p>
      </div>
      <p className="max-w-3xl text-lg leading-snug sm:text-xl lg:text-2xl">{description}</p>
    </div>
  );
}
