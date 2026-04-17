import type { Metadata } from "next";

import { ContactForm } from "@/features/pricing/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Schedule a Demo | VoiceCare AI",
  description:
    "Book a demo with VoiceCare AI and see how autonomous AI agents transform healthcare RCM workflows.",
});

export default function ScheduleDemoPage() {
  return <ContactForm />;
}
