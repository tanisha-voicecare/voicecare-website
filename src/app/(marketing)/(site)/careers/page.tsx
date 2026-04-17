import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description: "Join the team building the autonomous workforce for healthcare.",
});

export default function CareersPage() {
  return (
    <SectionWrapper className="bg-white">
      <h1 className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl lg:text-6xl">
        Careers
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
        Help us bridge the gap between legacy healthcare and modern AI.
      </p>
    </SectionWrapper>
  );
}
