import type { Metadata } from "next";
import { SolutionsPage } from "@/features/solutions";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions | VoiceCare AI",
  description:
    "Autonomous agents tailored to your workflow: VoiceCare skills from AI receptionist to claims resolution, plus industry-specific depth.",
});

export default function Page() {
  return <SolutionsPage />;
}
