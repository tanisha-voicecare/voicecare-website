import { SolutionSpotlight } from "@/components/ui/solution-spotlight";
import { assets } from "@/lib/assets";

const solutions = [
  {
    badgeClassName: "bg-[#06003f]/95",
    badge: (
      <>
        For Dental Groups &amp; DSOs: <span className="block font-normal">“The Invisible Front Desk”</span>
      </>
    ),
    backgroundSrc: assets.solutionDental,
    backgroundAlt: "Dental practice team collaborating at a front desk",
    bullets: [
      { title: "Maximize chair time by ensuring every patient is cleared before they arrive." },
      {
        title: "Automated Eligibility",
        description: "Real-time discovery of primary and secondary coverage",
      },
      { title: "AI Receptionist", description: "24/7 patient scheduling via voice" },
    ],
  },
  {
    badgeClassName: "bg-[#ff4e3a]/95",
    badge: (
      <>
        For Specialist Medical Practices: <span className="block font-normal">“Eliminate the Clinical Burden”</span>
      </>
    ),
    backgroundSrc: assets.solutionMedical,
    backgroundAlt: "Clinicians reviewing diagnostics in a hospital setting",
    bullets: [
      {
        title: "Free your clinical staff from the “Portal Maze.”",
      },
      {
        title: "Prior Authorization",
        description: "End-to-end clinical submission and tracking—no more manual status checks.",
      },
    ],
  },
  {
    badgeClassName: "bg-[#ff4e3a]/95",
    badge: (
      <>
        For RCM Enterprises: <span className="block font-normal">“Scale Without Headcount”</span>
      </>
    ),
    backgroundSrc: assets.solutionRcm,
    backgroundAlt: "Operations team monitoring revenue cycle metrics",
    bullets: [
      {
        title:
          "Decouple Revenue from Headcount. Scale your portfolio 5x while keeping back-office costs flat. Deploy an AI-driven agent fleet to absorb massive volume without the friction of hiring or training",
      },
      {
        title: "Claims & Denials",
        description: "Autonomous status checks and intelligent appeals",
      },
      {
        title: "Revenue Integrity",
        description: "Recover trapped cash with zero manual status calls",
      },
    ],
  },
] as const;

export function SolutionsSection() {
  return (
    <div id="solutions">
      {solutions.map((solution) => (
        <SolutionSpotlight key={solution.backgroundSrc} {...solution} />
      ))}
    </div>
  );
}
