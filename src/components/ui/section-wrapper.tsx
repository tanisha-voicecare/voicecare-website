import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  /** Additional classes applied to the inner max-width container. */
  innerClassName?: string;
  /** HTML id for the section. */
  id?: string;
  /** Accessible label for the section. */
  "aria-labelledby"?: string;
  /** If true, removes the default vertical padding. */
  noPadding?: boolean;
};

/**
 * Reusable section layout wrapper that provides consistent
 * max-width, horizontal padding, and vertical spacing.
 *
 * @example
 * ```tsx
 * <SectionWrapper id="hero" className="bg-[#06003f]">
 *   <h2>…</h2>
 * </SectionWrapper>
 * ```
 */
export function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
  noPadding = false,
  ...rest
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(!noPadding && "py-16 sm:py-20 lg:py-28", className)}
      {...rest}
    >
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
