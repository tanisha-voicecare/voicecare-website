import Image from "next/image";

import { cn } from "@/lib/utils";

export type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
  className?: string;
};

/** Square portrait + name + title; grayscale treatment matches Company / Team Figma. */
export function TeamMember({ name, role, image, className }: TeamMemberProps) {
  return (
    <div className={cn("flex flex-col items-start text-white", className)}>
      <div className="relative aspect-square w-full overflow-hidden bg-white/[0.06]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 18vw"
          unoptimized
        />
      </div>
      <h3 className="mt-4 font-sans text-lg font-semibold leading-tight tracking-[-0.02em] sm:text-xl">
        {name}
      </h3>
      <p className="mt-1.5 font-sans text-sm font-normal leading-snug text-white/75 sm:text-[15px]">
        {role}
      </p>
    </div>
  );
}
