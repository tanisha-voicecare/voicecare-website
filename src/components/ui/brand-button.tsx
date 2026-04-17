import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const brandButtonVariants = cva(
  "inline-flex items-center justify-center text-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4e3a]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06003f] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        coral: "bg-[#ff4e3a] text-white hover:bg-[#ea473a]",
        navy: "bg-[#06003f] text-white hover:bg-[#040033]",
        "navy-muted": "bg-[#02007f] text-white hover:bg-[#030099]",
        outline: "border border-white/70 bg-transparent text-white hover:bg-white/10",
        "outline-dark":
          "border border-[#06003F]/20 bg-transparent text-[#06003F] hover:border-[#06003F]/40 hover:bg-[#06003F]/[0.03]",
        gradient:
          "bg-[linear-gradient(106deg,#FF4E3A_2.52%,#02007F_79.8%)] text-white hover:opacity-95",
        ghost: "bg-transparent text-[#06003f] hover:bg-black/5",
        onLight: "bg-[#06003f] text-white hover:bg-[#02007f]",
      },
      size: {
        default: "min-h-11 px-6 py-2.5 text-base",
        sm: "min-h-9 px-4 py-2 text-sm",
        lg: "min-h-12 px-8 py-3 text-lg",
        nav: "min-h-[58px] px-6 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "default",
    },
  }
);

export type BrandButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof brandButtonVariants> & {
    href?: string;
    className?: string;
  };

export function BrandButton({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: BrandButtonProps) {
  const classes = cn(brandButtonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export { brandButtonVariants };
