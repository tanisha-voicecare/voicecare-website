import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Partner With Us",
  description: "Join the VoiceCare AI partner ecosystem and transform healthcare together.",
});

export default function PartnerPage() {
  return (
    <SectionWrapper className="bg-white">
      <h1 className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl lg:text-6xl">
        Partner With Us
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
        Collaborate with VoiceCare AI to deliver high-precision automation to your clients.
      </p>
    </SectionWrapper>
  );
}
