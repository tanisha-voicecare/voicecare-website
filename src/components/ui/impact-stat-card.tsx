import { cn } from "@/lib/utils";

type ImpactStatCardProps = {
  title: string;
  subtitle?: string;
  metric?: string;
  className?: string;
  tone?: "coral" | "navy" | "navy-deep" | "muted";
  children?: React.ReactNode;
};

const toneClasses: Record<NonNullable<ImpactStatCardProps["tone"]>, string> = {
  coral: "bg-[#ff4e3a] text-white",
  navy: "bg-[#02007f] text-white",
  "navy-deep": "bg-[#06003f] text-white",
  muted: "bg-[#efebf2] text-[#06003f]",
};

export function ImpactStatCard({
  title,
  subtitle,
  metric,
  className,
  tone = "navy",
  children,
}: ImpactStatCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between rounded-2xl p-6 sm:p-8",
        toneClasses[tone],
        className
      )}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
        {subtitle ? <p className="text-sm leading-relaxed opacity-90 sm:text-base">{subtitle}</p> : null}
      </div>
      {metric ? (
        <p className="mt-6 font-normal tabular-nums tracking-tight text-5xl sm:text-6xl lg:text-7xl">{metric}</p>
      ) : null}
      {children}
    </article>
  );
}
