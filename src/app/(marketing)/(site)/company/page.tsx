import type { Metadata } from "next";
import { CompanyPage } from "@/features/company/company-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Company | VoiceCare AI",
  description: "Learn about the mission, workforce, and leaders behind VoiceCare AI and our commitment to HIPAA-compliant healthcare automation.",
});

export default function Page() {
  return <CompanyPage />;
}
