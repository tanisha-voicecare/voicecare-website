export type AdvisorLogo = { src: string; alt: string };

export type Advisor = {
  name: string;
  role: string;
  designation: string;
  description: string;
  image: string;
  logos: AdvisorLogo[];
  affiliationTexts?: string[];
};

/** Paths under `/public/images/company/advisors/` — aligned with legacy Website CMS defaults. */
export const ADVISORS_AND_INVESTORS: Advisor[] = [
  {
    name: "Dave Vreeland",
    role: "Investor",
    designation: "Senior Managing Director, Caduceus Capital",
    description:
      "30 years of experience in the healthcare industry, Dave is a well-known authority on healthcare innovation and venture capital investment. MBA in Healthcare, Washington University School of Medicine.",
    image: "/images/company/advisors/photos/dave-vreeland.png",
    logos: [
      { src: "/images/company/advisors/logos/caduceus.png", alt: "Caduceus Capital Partners" },
      { src: "/images/company/advisors/logos/washington-uni.png", alt: "Washington University School of Medicine" },
    ],
  },
  {
    name: "Mary Grove",
    role: "Investor",
    designation: "Managing Partner, Bread & Butter Ventures",
    description:
      "20 years of experience in tech and early stage venture investing. Previously was Founding Director of Google for Startups and Investment Partner at Revolution's Rise of the Rest Seed Fund. MBA in Healthcare, Washington University School of Medicine.",
    image: "/images/company/advisors/photos/mary-grove.png",
    logos: [
      { src: "/images/company/advisors/logos/bread-butter.png", alt: "Bread & Butter Ventures" },
      { src: "/images/company/advisors/logos/google.png", alt: "Google for Startups" },
      { src: "/images/company/advisors/logos/washington-uni.png", alt: "Washington University School of Medicine" },
    ],
  },
  {
    name: "Paul Conley",
    role: "Advisor",
    designation: "Chairman and CEO, General Inception",
    description:
      "Serial Life Sciences entrepreneur and Deep Tech investor. Took 10x Genomics (TXG) and Twist Bio (TWST) public. Ph.D. in Computational Physics, UCSD.",
    image: "/images/company/advisors/photos/paul-conley.png",
    logos: [
      { src: "/images/company/advisors/logos/los-alamos.png", alt: "Los Alamos National Laboratory" },
      { src: "/images/company/advisors/logos/ucsd.png", alt: "University of California, San Diego" },
      { src: "/images/company/advisors/logos/uva.png", alt: "University of Virginia" },
    ],
  },
  {
    name: "Andrew Vaz",
    role: "Board Member",
    designation: "Ex-Global Chief Innovation Officer, Deloitte",
    description:
      "30 years of experience in growing Global Fortune 500, technology companies, and start-ups. Expert in emerging technologies, business model innovation, and digital customer and cloud transformation. Masters in Health Sciences, University of Toronto.",
    image: "/images/company/advisors/photos/andrew-vaz.png",
    logos: [
      { src: "/images/company/advisors/logos/deloitte.png", alt: "Deloitte" },
      { src: "/images/company/advisors/logos/toronto-uni.png", alt: "University of Toronto" },
    ],
  },
  {
    name: "Brian Colao",
    role: "Customer Advisory, Dental",
    designation: "Member & Director of the Dental Service Organization Industry Group at Dykema",
    description:
      "Brian A. Colao specializes in complex commercial litigation nationwide, handling a wide range of business disputes such as contracts, franchise issues, fiduciary duty breaches, intellectual property infringement, unfair competition, and other related claims.",
    image: "/images/company/advisors/photos/brian-colao-dental.jpg",
    logos: [
      { src: "/images/company/advisors/logos/dykema.png", alt: "Dykema" },
      { src: "/images/company/advisors/logos/vanderbilt-university.png", alt: "Vanderbilt University Law School" },
    ],
    affiliationTexts: ["Dykema", "Vanderbilt University Law School"],
  },
  {
    name: "Kate Smith",
    role: "Customer Advisory, Dental",
    designation: "Director of Revenue Cycle, OMS360",
    description:
      "15 years of experience as a revenue cycle leader helping healthcare organizations improve profitability and efficiency. She specializes in strategy execution, KPI optimization, contract analysis, training, and educating teams on revenue cycle best practices.",
    image: "/images/company/advisors/photos/kate-smith-dental.JPG",
    logos: [
      { src: "/images/company/advisors/logos/oms360.png", alt: "OMS360" },
      { src: "/images/company/advisors/logos/guidehouse.png", alt: "Guidehouse" },
      { src: "/images/company/advisors/logos/central-michigan-university.png", alt: "Central Michigan University" },
    ],
    affiliationTexts: ["OMS360", "Guidehouse", "Central Michigan University"],
  },
  {
    name: "Charles Bush-Joseph, MD",
    role: "Customer Advisory, Specialty",
    designation:
      "Orthopedic Surgeon, Professor, Rush University Medical Center, Team Physician Chicago White Sox",
    description:
      "Dr. Charles Bush-Joseph is a renowned sports medicine and arthroscopic surgical specialist, known for his warm and compassionate bedside manner. He is currently a Professor at Rush University Medical Center, where he also serves as the Associate Director of the Rush Orthopaedic Sports Medicine Fellowship Program. He is a team physician for the Chicago White Sox (MLB) and an Associate Team Physician for the Chicago Bulls (NBA).",
    image: "/images/company/advisors/photos/bush-joseph-charles-ortho.jpg",
    logos: [
      { src: "/images/company/advisors/logos/midwest-ortho.png", alt: "Midwest Orthopaedics at Rush" },
      { src: "/images/company/advisors/logos/rush-university.png", alt: "Rush University" },
      { src: "/images/company/advisors/logos/chicago-white-sox.png", alt: "Chicago White Sox" },
      { src: "/images/company/advisors/logos/chicago-bulls.png", alt: "Chicago Bulls" },
    ],
    affiliationTexts: ["Midwest Orthopaedics at Rush", "Rush University", "Chicago White Sox", "Chicago Bulls"],
  },
  {
    name: "Mark Nathan",
    role: "Advisor",
    designation: "CEO and Founder, Mangoose Health and Burrow Software",
    description:
      "Serial Healthcare entrepreneur. Co-founder and CEO of Zipari.com, acquired by Thoma Bravo for $500M. Masters in Electrical Engineering, University of Colorado.",
    image: "/images/company/advisors/photos/mark-nathan.png",
    logos: [
      { src: "/images/company/advisors/logos/zipari.png", alt: "Zipari" },
      { src: "/images/company/advisors/logos/apple.png", alt: "Apple" },
      { src: "/images/company/advisors/logos/colorado-uni.png", alt: "University of Colorado Boulder" },
    ],
  },
  {
    name: "James Fan",
    role: "Advisor",
    designation: "Co-founder and CTO, Tomato.ai",
    description:
      "Serial entrepreneur with deep expertise in speech-to-text and text-to-speech. Led Google Cloud Speech and CCAI group. Ph.D. in Computer Science, UT Austin.",
    image: "/images/company/advisors/photos/james-fan.png",
    logos: [
      { src: "/images/company/advisors/logos/google.png", alt: "Google" },
      { src: "/images/company/advisors/logos/ut-austin.png", alt: "University of Texas at Austin" },
    ],
  },
  {
    name: "Sheena Menezes",
    role: "Advisor",
    designation: "Co-founder and CEO, Simple HealthKit",
    description:
      "15+ years of start-up experience focused on payors, pharmacies, providers, and government. Ph.D. in Biochemistry from UC Santa Barbara.",
    image: "/images/company/advisors/photos/sheena-menezes.png",
    logos: [
      { src: "/images/company/advisors/logos/simple-healthkit.png", alt: "Simple HealthKit" },
      { src: "/images/company/advisors/logos/ucsb.png", alt: "UC Santa Barbara" },
    ],
  },
];
