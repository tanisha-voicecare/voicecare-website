import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Security",
  description: "Enterprise-grade security, HIPAA compliance, and SOC 2 Type II trust.",
});

export default function SecurityPage() {
  return (
    <SectionWrapper className="bg-white">
      <h1 className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl lg:text-6xl">
        Security & Trust
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
        Your data security and patient privacy are our top priorities.
      </p>
    </SectionWrapper>
  );
}
