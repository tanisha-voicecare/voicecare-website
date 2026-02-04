/**
 * Site Content API
 * Fetches dynamic content from WordPress headless CMS
 * Content is managed in WordPress Admin → React Site Content
 */

// ============================================
// Configuration
// ============================================

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';
const WORDPRESS_CONTENT_ENABLED = process.env.WORDPRESS_CONTENT_ENABLED === 'true';

// Only set API base if WordPress content is explicitly enabled
const CONTENT_API_BASE = (WORDPRESS_CONTENT_ENABLED && WORDPRESS_API_URL) 
  ? `${WORDPRESS_API_URL}/wp-json/voicecare/v1` 
  : '';

// Revalidation time (10 minutes) - content updates will reflect within this time
export const CONTENT_REVALIDATE_TIME = 600;

// Request timeout (2 seconds) - if WordPress doesn't respond, use fallback immediately
const FETCH_TIMEOUT_MS = 2000;

/**
 * Fetch with timeout - returns null if request takes too long
 */
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`[Content] Request timed out after ${timeoutMs}ms`);
    }
    return null;
  }
}

// ============================================
// Types
// ============================================

export interface SiteContent<T = Record<string, unknown>> {
  slug: string;
  title: string;
  data: T;
  updated: string;
}

export interface ContentResponse<T = Record<string, unknown>> {
  success: boolean;
  slug: string;
  title: string;
  data: T;
  updated: string;
}

export interface ContentBatchResponse {
  success: boolean;
  content: Record<string, SiteContent | null>;
}

// ============================================
// Content Type Definitions (for each section)
// ============================================

// Homepage Hero Section
export interface HomepageHeroContent {
  badge: string;
  headline: string;
  rotatingHeadlines: string[];
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

// Value Metrics Section (The VoiceCare Advantage)
export interface ValueMetricsContent {
  sectionTitle: string;
  sectionDescription: string;
  metrics: Array<{
    value: string;
    title: string;
    description: string;
  }>;
}

// Radical Efficiencies (Marquee)
export interface RadicalEfficienciesContent {
  sectionTitle: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// EHR Integrations Section
export interface EHRIntegrationsContent {
  sectionTitle: string;
  sectionDescription: string;
}

// Product Intro Section (Meet Your AI Workforce)
export interface ProductIntroContent {
  sectionTitle: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// ============================================
// Fetch Functions
// ============================================

/**
 * Fetch single content block by slug
 * @param slug - The section identifier (e.g., "homepage-hero")
 * @param fallback - Optional fallback data if content not found
 */
export async function getContent<T = Record<string, unknown>>(
  slug: string,
  fallback?: T
): Promise<T | null> {
  // If WordPress API not configured, immediately return fallback (no network request)
  if (!CONTENT_API_BASE) {
    return fallback || null;
  }

  try {
    const response = await fetchWithTimeout(
      `${CONTENT_API_BASE}/content/${slug}`,
      {
        next: {
          revalidate: CONTENT_REVALIDATE_TIME,
          tags: ['content', `content-${slug}`],
        },
      },
      FETCH_TIMEOUT_MS
    );

    // Timeout or network error - use fallback immediately
    if (!response) {
      return fallback || null;
    }

    if (!response.ok) {
      if (response.status === 404) {
        return fallback || null;
      }
      return fallback || null;
    }

    const result: ContentResponse<T> = await response.json();
    return result.data;
  } catch {
    return fallback || null;
  }
}

/**
 * Fetch multiple content blocks at once
 * @param slugs - Array of section identifiers
 */
export async function getContentBatch(
  slugs: string[]
): Promise<Record<string, unknown>> {
  if (!CONTENT_API_BASE) {
    console.warn('WordPress API not configured. Returning empty content.');
    return {};
  }

  try {
    const response = await fetch(
      `${CONTENT_API_BASE}/content-batch?slugs=${slugs.join(',')}`,
      {
        next: {
          revalidate: CONTENT_REVALIDATE_TIME,
          tags: ['content', ...slugs.map((s) => `content-${s}`)],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Content API Error: ${response.status}`);
    }

    const result: ContentBatchResponse = await response.json();
    
    // Extract just the data from each content block
    const content: Record<string, unknown> = {};
    for (const [slug, block] of Object.entries(result.content)) {
      content[slug] = block?.data || null;
    }
    
    return content;
  } catch (error) {
    console.error('Failed to fetch content batch:', error);
    return {};
  }
}

/**
 * List all available content blocks (for debugging/admin)
 */
export async function listAllContent(): Promise<Array<{
  id: number;
  title: string;
  slug: string;
  updated: string;
}>> {
  if (!CONTENT_API_BASE) {
    return [];
  }

  try {
    const response = await fetch(`${CONTENT_API_BASE}/content`, {
      next: { revalidate: CONTENT_REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`Content API Error: ${response.status}`);
    }

    const result = await response.json();
    return result.content_blocks || [];
  } catch (error) {
    console.error('Failed to list content:', error);
    return [];
  }
}

// ============================================
// Typed Content Fetchers (Convenience Functions)
// ============================================

/**
 * Get Homepage Hero content with fallback
 */
export async function getHomepageHeroContent(): Promise<HomepageHeroContent> {
  const fallback: HomepageHeroContent = {
    badge: 'Backed by Mayo Clinic',
    headline: '',
    rotatingHeadlines: [
      'Automating administrative burdens',
      'Creating time for care teams',
      'Improving patient outcomes',
    ],
    primaryButtonText: 'Experience it',
    primaryButtonLink: '#experience',
    secondaryButtonText: 'Schedule a Demo',
    secondaryButtonLink: '/schedule-demo',
  };

  const content = await getContent<HomepageHeroContent>('homepage-hero', fallback);
  return content || fallback;
}

/**
 * Get Value Metrics (VoiceCare Advantage) content with fallback
 */
export async function getValueMetricsContent(): Promise<ValueMetricsContent> {
  const fallback: ValueMetricsContent = {
    sectionTitle: 'Why VoiceCare.',
    sectionDescription: 'Our agentic AI goes beyond traditional automation to take meaningful action, delivering measurable outcomes that transform healthcare operations.',
    metrics: [
      {
        value: '70%',
        title: 'Higher ROI',
        description: 'Returns within a few months, not years.',
      },
      {
        value: '40%',
        title: 'Faster',
        description: 'Collect, initiate, and transfer data',
      },
      {
        value: '20%',
        title: 'Better Data Quality',
        description: 'Consistent data output with every conversation',
      },
    ],
  };

  const content = await getContent<ValueMetricsContent>('homepage-value-metrics', fallback);
  return content || fallback;
}

/**
 * Get Radical Efficiencies (Marquee) content with fallback
 */
export async function getRadicalEfficienciesContent(): Promise<RadicalEfficienciesContent> {
  const fallback: RadicalEfficienciesContent = {
    sectionTitle: 'Radical Efficiencies',
    stats: [
      { value: '32000', label: 'Minutes saved per 1,000 phone calls' },
    ],
  };

  const content = await getContent<RadicalEfficienciesContent>('homepage-radical-efficiencies', fallback);
  return content || fallback;
}

/**
 * Get EHR Integrations section content with fallback
 */
export async function getEHRIntegrationsContent(): Promise<EHRIntegrationsContent> {
  const fallback: EHRIntegrationsContent = {
    sectionTitle: 'Supported EHR Integrations',
    sectionDescription: '',
  };

  const content = await getContent<EHRIntegrationsContent>('homepage-ehr-integrations', fallback);
  return content || fallback;
}

/**
 * Get Product Intro (Meet Your AI Workforce) content with fallback
 */
export async function getProductIntroContent(): Promise<ProductIntroContent> {
  const fallback: ProductIntroContent = {
    sectionTitle: 'AI_AGENT',
    heading: 'Introducing Joy',
    description: 'Your automated Voice AI Agent, designed to optimize and ease administrative burden by supercharging your workflow to be more efficient and empathetic.',
    buttonText: 'Experience It',
    buttonLink: '#experience',
  };

  const content = await getContent<ProductIntroContent>('homepage-product-intro', fallback);
  return content || fallback;
}

// ============================================
// Platform Page Content Types
// ============================================

// Platform Hero Section
export interface PlatformHeroContent {
  eyebrow: string;
  headline: string;
  description: string;
}

// Platform EHR/Enterprise Section
export interface PlatformEHRContent {
  heading: string;
  subheading: string;
  additionalParagraphs: string[];
  closingStatement: string;
}

// Platform Benefits Section
export interface PlatformBenefitsContent {
  sectionTitle: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
}

// Platform Solutions/Capabilities Section
export interface PlatformSolutionsContent {
  sectionTitle: string;
  capabilities: Array<{
    id: string;
    label: string;
    title: string;
    description: string;
  }>;
}

// ============================================
// Platform Page Content Fetchers
// ============================================

/**
 * Get Platform Hero content with fallback
 */
export async function getPlatformHeroContent(): Promise<PlatformHeroContent> {
  const fallback: PlatformHeroContent = {
    eyebrow: "We're powered by",
    headline: 'Healthcare Administration General Intelligence (HAGI)',
    description: 'It is the heart of the VoiceCare platform. Using Generative and Conversational AI, it intelligently automates routine back-office workflows.',
  };

  const content = await getContent<PlatformHeroContent>('platform-hero', fallback);
  return content || fallback;
}

/**
 * Get Platform EHR/Enterprise content with fallback
 */
export async function getPlatformEHRContent(): Promise<PlatformEHRContent> {
  const fallback: PlatformEHRContent = {
    heading: 'We Are Enterprise\nAdministration platform',
    subheading: 'One secure conversational platform, powered by advanced and constantly improving generative models for healthcare professionals to complete 1000s of calls and tasks in one click. You can search for historical calls, and get summarized use-case-specific information, which is ingested in any EHR or any system of record.',
    additionalParagraphs: [
      'Our AI-powered analytics gives you actionable insights to measure the performance of every conversation.',
    ],
    closingStatement: 'Automate the back office to improve patient experience with every conversation.',
  };

  const content = await getContent<PlatformEHRContent>('platform-ehr', fallback);
  return content || fallback;
}

/**
 * Get Platform Benefits content with fallback
 */
export async function getPlatformBenefitsContent(): Promise<PlatformBenefitsContent> {
  const fallback: PlatformBenefitsContent = {
    sectionTitle: 'Benefits',
    benefits: [
      {
        title: 'Automate tasks and conversations',
        description: 'Schedule one-time or recurring automated phone conversations and tasks in one click.',
      },
      {
        title: 'Search for conversations',
        description: 'Find structured data across every conversational audio and transcript, and get use-case specific call summary.',
      },
      {
        title: 'AI-powered call analytics',
        description: "Generate knowledge grounded in your back-office information – with drill-down analytics for every conversation on what's working, and where to improve.",
      },
      {
        title: 'Customize conversations',
        description: 'For use-case specific conversations, ask the questions that matter to deliver healthcare outcomes for your patients.',
      },
    ],
  };

  const content = await getContent<PlatformBenefitsContent>('platform-benefits', fallback);
  return content || fallback;
}

/**
 * Get Platform Solutions/Capabilities content with fallback
 */
export async function getPlatformSolutionsContent(): Promise<PlatformSolutionsContent> {
  const fallback: PlatformSolutionsContent = {
    sectionTitle: 'Our Solutions',
    capabilities: [
      {
        id: 'benefit-verification',
        label: 'Benefit Verification',
        title: 'Benefit Verification',
        description: 'Autonomous eligibility & coverage checks with payer systems.',
      },
      {
        id: 'prior-authorization',
        label: 'Prior Authorization',
        title: 'Prior Authorization',
        description: 'Smart determination, initiation, and follow-up across channels.',
      },
      {
        id: 'prescription-support',
        label: 'Prescription Support',
        title: 'Prescription Support',
        description: 'Context-aware verification and prior auth support workflows.',
      },
      {
        id: 'claim-status',
        label: 'Claim Status',
        title: 'Claim Status',
        description: 'Automated tracking and follow-ups for claim processing.',
      },
      {
        id: 'claim-denials',
        label: 'Claim Denials',
        title: 'Claim Denials',
        description: 'Intelligent denial management and appeal readiness.',
      },
    ],
  };

  const content = await getContent<PlatformSolutionsContent>('platform-solutions', fallback);
  return content || fallback;
}

// ============================================
// Who We Serve Page Content Types
// ============================================

export interface WhoWeServeHeroContent {
  headline: string;
  description: string;
}

export interface WhoWeServeTabCard {
  title: string;
  description: string;
}

export interface WhoWeServeTabContent {
  title: string;
  subtitle: string;
  cards: WhoWeServeTabCard[];
}

export interface WhoWeServeContent {
  hero: WhoWeServeHeroContent;
  tabs: {
    healthcareStakeholders: WhoWeServeTabContent;
    specialistPractice: WhoWeServeTabContent;
    revenueCycle: WhoWeServeTabContent;
    dental: WhoWeServeTabContent;
  };
}

/**
 * Get Who We Serve content with fallback
 */
export async function getWhoWeServeContent(): Promise<WhoWeServeContent> {
  const fallback: WhoWeServeContent = {
    hero: {
      headline: 'Who We Serve',
      description: '',
    },
    tabs: {
      healthcareStakeholders: {
        title: 'Healthcare Stakeholders',
        subtitle: 'Transforming healthcare operations across the industry.',
        cards: [
          {
            title: 'Health Systems',
            description: 'Streamline administrative processes by automating insurance verification and authorization calls, reducing wait times and improving patient flow. Empower healthcare teams to concentrate on delivering quality care rather than handling repetitive administrative tasks.',
          },
          {
            title: 'Labs & Diagnostics',
            description: 'Optimize operational efficiency by automating insurance pre-authorization calls and patient follow-ups, allowing lab technicians and diagnostic professionals to focus on accurate and timely test results.',
          },
          {
            title: 'Specialty Pharmacies',
            description: 'Improve patient satisfaction and adherence by automating insurance-related tasks, enabling quicker access to specialty medications.',
          },
          {
            title: 'Ambulatory Surgery Centers',
            description: 'Optimize resource allocation by automating insurance interactions, enabling surgical teams to dedicate more time to clinical care and procedural excellence.',
          },
        ],
      },
      specialistPractice: {
        title: 'Specialist Practice Providers',
        subtitle: 'Serving specialized healthcare segments with tailored solutions.',
        cards: [
          {
            title: 'Cardiology',
            description: 'Improve patient satisfaction and outcomes by automating insurance interactions, facilitating quicker approvals for cardiac treatments and procedures.',
          },
          {
            title: 'Oncology',
            description: 'Enhance operational efficiency in oncology practices by automating insurance billing and claims management, reducing administrative overhead and optimizing revenue cycles.',
          },
          {
            title: 'Infectious diseases',
            description: 'Improve patient outcomes by automating insurance-related tasks, facilitating faster approvals and seamless coordination of treatments for infectious diseases.',
          },
          {
            title: 'Gastroenterology',
            description: 'Enhance operational efficiency in gastroenterology practices by automating insurance billing and claims processing, reducing administrative workload and optimizing revenue cycles.',
          },
          {
            title: 'Nephrology',
            description: 'Optimize patient care by automating insurance verification and pre-authorization processes for nephrology treatments and procedures, ensuring timely access to critical renal care services.',
          },
          {
            title: 'Neurology',
            description: 'Enable neurology teams to focus on delivering personalized care and innovative treatments with improved administrative efficiency.',
          },
          {
            title: 'Urology',
            description: 'Improve revenue cycles while delivering comprehensive urological care and innovative treatment plans.',
          },
          {
            title: 'Rheumatology',
            description: 'Empower rheumatology teams to deliver personalized care and effective treatments with enhanced administrative efficiency.',
          },
          {
            title: 'Hematology',
            description: 'Streamline patient care with automated insurance verification and pre-authorization processes tailored for hematological treatments and diagnostics, ensuring timely access to critical medical interventions.',
          },
          {
            title: 'Anesthesia',
            description: 'Improve revenue cycles while delivering comprehensive urological care and innovative treatment plans.',
          },
          {
            title: 'Orthopedics',
            description: 'Empower rheumatology teams to deliver personalized care and effective treatments with enhanced administrative efficiency.',
          },
          {
            title: 'Pediatrics',
            description: 'Streamline patient care with automated insurance verification and pre-authorization processes tailored for hematological treatments and diagnostics, ensuring timely access to critical medical interventions.',
          },
        ],
      },
      revenueCycle: {
        title: 'Revenue Cycle Management',
        subtitle: 'Optimizing financial operations for healthcare organizations.',
        cards: [
          {
            title: 'Revenue Cycle Management',
            description: 'Improve revenue integrity with AI-driven automation of insurance eligibility verification and denial management processes. Ensure accurate billing and coding to maximize reimbursements and minimize revenue leakage.',
          },
        ],
      },
      dental: {
        title: 'Dental',
        subtitle: 'Transforming dental practice operations.',
        cards: [
          {
            title: 'Dental',
            description: 'Improve revenue integrity with AI-driven automation of insurance eligibility verification and denial management processes. Ensure accurate billing and coding to maximize reimbursements and minimize revenue leakage.',
          },
        ],
      },
    },
  };

  const content = await getContent<WhoWeServeContent>('who-we-serve', fallback);
  return content || fallback;
}

// ============================================
// Security Page Content Types
// ============================================

export interface SecurityHeroContent {
  headline: string;
  subheadline: string;
}

export interface SecurityCertificationsContent {
  title: string;
  description: string;
}

export interface SecurityFeature {
  title: string;
  description: string;
}

export interface SecurityComplianceContent {
  sectionTitle: string;
  sectionDescription: string;
  tabs: {
    infrastructure: SecurityFeature[];
    organizational: SecurityFeature[];
    product: SecurityFeature[];
    internal: SecurityFeature[];
    dataPrivacy: SecurityFeature[];
  };
}

export interface SecurityContent {
  hero: SecurityHeroContent;
  certifications: SecurityCertificationsContent;
  compliance: SecurityComplianceContent;
}

/**
 * Get Security page content with fallback
 */
export async function getSecurityContent(): Promise<SecurityContent> {
  const fallback: SecurityContent = {
    hero: {
      headline: 'Healthcare Data. Maximum Security.',
      subheadline: 'We are SOC 2 Type II attested, HIPAA-compliant.',
    },
    certifications: {
      title: '',
      description: 'Independently verified and certified to meet the highest standards of healthcare data security and compliance.',
    },
    compliance: {
      sectionTitle: 'Compliance and Monitoring',
      sectionDescription: 'We provide an overview of our dedication to compliance and security, offering access to certifications, documentation, and details on our strict control adherence.',
      tabs: {
        infrastructure: [
          { title: 'Service Infrastructure', description: 'We maintain our service infrastructure' },
          { title: 'Production Data Backups', description: 'We conduct regular backups of production data' },
          { title: 'Multi-factor Authentication', description: 'Multi-factor authentication (MFA) is enforced on all systems' },
          { title: 'Network Protection', description: 'Firewalls and intrusion prevention and detection systems protect our network' },
        ],
        organizational: [
          { title: 'Endpoint Encryption', description: 'All endpoints are encrypted' },
          { title: 'Anti-malware', description: 'Anti-malware technology is utilized' },
          { title: 'Password Policy', description: 'Password policy is enforced' },
          { title: 'Security Training', description: 'Security training is implemented' },
          { title: 'Contractor Agreements', description: 'Contractors sign Confidentiality Agreements and BAAs' },
          { title: 'Production Inventory', description: 'Production inventory is maintained' },
          { title: 'Employee Agreements', description: 'Employees acknowledge Confidentiality Agreements' },
        ],
        product: [
          { title: 'Data Encryption', description: 'Data is encrypted both at rest and in transit' },
          { title: 'Vulnerability Monitoring', description: 'Vulnerability and system monitoring procedures have been established' },
        ],
        internal: [
          { title: 'Vulnerability Scanning', description: 'Scanned for and remediated vulnerabilities' },
          { title: 'Incident Response', description: 'Tested the incident response plan' },
          { title: 'Access Requests', description: 'Processed access requests as required' },
          { title: 'Production Access', description: 'Restricted production deployment access' },
          { title: 'Change Management', description: 'Enforced change management procedures' },
          { title: 'Configuration Management', description: 'Established a configuration management system' },
          { title: 'Support System', description: 'Provided an available support system' },
          { title: 'Third-party Agreements', description: 'Established third-party agreements' },
          { title: 'Cybersecurity Insurance', description: 'Maintained cybersecurity insurance' },
          { title: 'System Capacity', description: 'Reviewed system capacity' },
        ],
        dataPrivacy: [
          { title: 'Privacy Policy', description: 'Established privacy policy' },
          { title: 'Privacy Training', description: 'Security awareness and privacy training' },
        ],
      },
    },
  };

  const content = await getContent<SecurityContent>('security', fallback);
  return content || fallback;
}

// ============================================
// Company Page Content Types
// ============================================

export interface CompanyHeroContent {
  eyebrow: string;
  headline: string;
}

export interface AboutUsSectionContent {
  sectionTitle: string;
  sectionDescription: string;
  visionTitle: string;
  visionDescription: string;
  missionTitle: string;
  missionDescription: string;
}

export interface CEOQuoteContent {
  quote: string;
  name: string;
  title: string;
  image: string;
}

export interface PrincipleItem {
  title: string;
  description: string;
}

export interface PrinciplesSectionContent {
  sectionTitle: string;
  sectionDescription: string;
  principles: PrincipleItem[];
}

export interface AdvisorItem {
  name: string;
  role: 'Investor' | 'Board Member' | 'Advisor';
  designation: string;
  description: string;
  image: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface AdvisorsSectionContent {
  sectionTitle: string;
  sectionDescription: string;
  advisors: AdvisorItem[];
}

export interface CompanyContent {
  hero: CompanyHeroContent;
  aboutUs: AboutUsSectionContent;
  ceoQuote: CEOQuoteContent;
  principles: PrinciplesSectionContent;
  advisors: AdvisorsSectionContent;
}

/**
 * Get Company page content with fallback
 */
export async function getCompanyContent(): Promise<CompanyContent> {
  const fallback: CompanyContent = {
    hero: {
      eyebrow: 'Supercharging administration with',
      headline: 'Artificial Intelligence',
    },
    aboutUs: {
      sectionTitle: 'About Us',
      sectionDescription: 'We are building a Healthcare Administration General Intelligence (HAGI) company for the entire back-office. Powered by advanced Generative AI, we are massively eliminating administrative burden and radically improving operational efficiency.',
      visionTitle: 'Our Vision',
      visionDescription: 'To transform healthcare administration through intelligent automation, giving healthcare professionals more time to focus on what matters most: patient care.',
      missionTitle: 'Our Mission',
      missionDescription: 'To dramatically improve access, adherence, and outcomes for the patients and the healthcare workforce through the application of generative AI.',
    },
    ceoQuote: {
      quote: "We're giving back time to healthcare professionals so that they can focus on high-order patient tasks, and driving radical efficiencies with every conversation.",
      name: 'Parag Jhaveri',
      title: 'CEO, Founder',
      image: '/images/company/ceo/parag-jhaveri.png',
    },
    principles: {
      sectionTitle: 'Our Operating Principles',
      sectionDescription: 'Core principles that guide how we build, ship, and deliver excellence.',
      principles: [
        { title: 'Solving Customer Problems', description: 'We relentlessly focus on solving real customer problems with measurable value.' },
        { title: 'Innovate Constantly', description: "Innovation isn't a department—it's our operating system for staying ahead." },
        { title: 'Go Above & Beyond', description: "Good enough isn't in our vocabulary. We deliver exceptional outcomes." },
        { title: 'Take Ownership', description: 'We take full ownership of our commitments—no excuses, no finger-pointing.' },
        { title: 'Default Trust', description: 'Transparency, honesty, and integrity guide every interaction with our team.' },
        { title: 'Think in First Principles', description: 'We break down complex problems to fundamentals, building from the ground up.' },
        { title: 'Attention to Detail', description: 'Excellence lives in the details—we sweat the small stuff because it matters.' },
      ],
    },
    advisors: {
      sectionTitle: 'Our Advisors & Investors',
      sectionDescription: 'Backed by industry leaders who share our vision for transforming healthcare administration',
      advisors: [
        {
          name: 'Dave Vreeland',
          role: 'Investor',
          designation: 'Senior Managing Director, Caduceus Capital',
          description: '30 years of experience in the healthcare industry, Dave is a well-known authority on healthcare innovation and venture capital investment. MBA in Healthcare, Washington University School of Medicine.',
          image: '/images/company/advisors/photos/dave-vreeland.png',
          logos: [
            { src: '/images/company/advisors/logos/caduceus.png', alt: 'Caduceus Capital Partners' },
            { src: '/images/company/advisors/logos/washington-uni.png', alt: 'Washington University School of Medicine' },
          ],
        },
        {
          name: 'Mary Grove',
          role: 'Investor',
          designation: 'Managing Partner, Bread & Butter Ventures',
          description: "20 years of experience in tech and early stage venture investing. Previously was Founding Director of Google for Startups and Investment Partner at Revolution's Rise of the Rest Seed Fund. MBA in Healthcare, Washington University School of Medicine.",
          image: '/images/company/advisors/photos/mary-grove.png',
          logos: [
            { src: '/images/company/advisors/logos/bread-butter.png', alt: 'Bread & Butter Ventures' },
            { src: '/images/company/advisors/logos/google.png', alt: 'Google for Startups' },
            { src: '/images/company/advisors/logos/washington-uni.png', alt: 'Washington University School of Medicine' },
          ],
        },
        {
          name: 'Paul Conley',
          role: 'Advisor',
          designation: 'Chairman and CEO, General Inception',
          description: 'Serial Life Sciences entrepreneur and Deep Tech investor. Took 10x Genomics (TXG) and Twist Bio (TWST) public. Ph.D. in Computational Physics, UCSD.',
          image: '/images/company/advisors/photos/paul-conley.png',
          logos: [
            { src: '/images/company/advisors/logos/los-alamos.png', alt: 'Los Alamos National Laboratory' },
            { src: '/images/company/advisors/logos/ucsd.png', alt: 'University of California, San Diego' },
            { src: '/images/company/advisors/logos/uva.png', alt: 'University of Virginia' },
          ],
        },
        {
          name: 'Andrew Vaz',
          role: 'Board Member',
          designation: 'Ex-Global Chief Innovation Officer, Deloitte',
          description: '30 years of experience in growing Global Fortune 500, technology companies, and start-ups. Expert in emerging technologies, business model innovation, and digital customer and cloud transformation. Masters in Health Sciences, University of Toronto.',
          image: '/images/company/advisors/photos/andrew-vaz.png',
          logos: [
            { src: '/images/company/advisors/logos/deloitte.png', alt: 'Deloitte' },
            { src: '/images/company/advisors/logos/toronto-uni.png', alt: 'University of Toronto' },
          ],
        },
        {
          name: 'Mark Nathan',
          role: 'Advisor',
          designation: 'CEO and Founder, Mangoose Health and Burrow Software',
          description: 'Serial Healthcare entrepreneur. Co-founder and CEO of Zipari.com, acquired by Thoma Bravo for $500M. Masters in Electrical Engineering, University of Colorado.',
          image: '/images/company/advisors/photos/mark-nathan.png',
          logos: [
            { src: '/images/company/advisors/logos/zipari.png', alt: 'Zipari' },
            { src: '/images/company/advisors/logos/apple.png', alt: 'Apple' },
            { src: '/images/company/advisors/logos/colorado-uni.png', alt: 'University of Colorado Boulder' },
          ],
        },
        {
          name: 'James Fan',
          role: 'Advisor',
          designation: 'Co-founder and CTO, Tomato.ai',
          description: 'Serial entrepreneur with deep expertise in speech-to-text and text-to-speech. Led Google Cloud Speech and CCAI group. Ph.D. in Computer Science, UT Austin.',
          image: '/images/company/advisors/photos/james-fan.png',
          logos: [
            { src: '/images/company/advisors/logos/google.png', alt: 'Google' },
            { src: '/images/company/advisors/logos/ut-austin.png', alt: 'University of Texas at Austin' },
          ],
        },
        {
          name: 'Sheena Menezes',
          role: 'Advisor',
          designation: 'Co-founder and CEO, Simple HealthKit',
          description: '15+ years of start-up experience focused on payors, pharmacies, providers, and government. Ph.D. in Biochemistry from UC Santa Barbara.',
          image: '/images/company/advisors/photos/sheena-menezes.png',
          logos: [
            { src: '/images/company/advisors/logos/simple-healthkit.png', alt: 'Simple HealthKit' },
            { src: '/images/company/advisors/logos/ucsb.png', alt: 'UC Santa Barbara' },
          ],
        },
      ],
    },
  };

  const content = await getContent<CompanyContent>('company', fallback);
  return content || fallback;
}

// ============================================
// Careers Page Content Types
// ============================================

export interface CareersHeroContent {
  headline: string;
  subheadline: string;
}

export interface CareersValueItem {
  title: string;
  description: string;
}

export interface CareersValuesContent {
  values: CareersValueItem[];
}

export interface CareersContent {
  hero: CareersHeroContent;
  values: CareersValuesContent;
  openPositionsTitle: string;
}

/**
 * Get Careers page content with fallback
 */
export async function getCareersContent(): Promise<CareersContent> {
  const fallback: CareersContent = {
    hero: {
      headline: 'People who care.\nAI that matters.',
      subheadline: "A collective of talented individuals uniting to create something greater than themselves. Together, we're pushing the boundaries of AI and healthcare.",
    },
    values: {
      values: [
        { title: 'Passionate.', description: 'We value individuals who can adapt, learn, and persevere through challenges.' },
        { title: 'Committed.', description: 'A shared promise to push the envelope for the future of healthcare.' },
        { title: 'Resilient.', description: 'Support and uplift each other to achieve our shared vision and goals.' },
      ],
    },
    openPositionsTitle: 'Open Positions',
  };

  const content = await getContent<CareersContent>('careers', fallback);
  return content || fallback;
}

// ============================================
// Press Page Content Types
// ============================================

export interface PressHeroContent {
  badge: string;
  headline: string;
  description: string;
}

export interface PressItemContent {
  id: number;
  logo: string;
  outlet: string;
  quote: string;
  link: string;
  featured?: boolean;
}

export interface PressContent {
  hero: PressHeroContent;
  coverageTitle: string;
  items: PressItemContent[];
}

/**
 * Get Press page content with fallback
 */
export async function getPressContent(): Promise<PressContent> {
  const fallback: PressContent = {
    hero: {
      badge: 'Press Coverage',
      headline: 'Press',
      description: "Explore our remarkable journey through extensive press features, media highlights that showcase our brand's growth and impact.",
    },
    coverageTitle: 'Recent Coverage',
    items: [
      {
        id: 1,
        logo: '/images/press/logos/pr-newswire.png',
        outlet: 'PR Newswire',
        quote: "Company closes $4.54M in Seed round led by Caduceus Capital Partners, with participation from Bread and Butter Ventures, Mayo Clinic, and a strategic RCM company\n\nVoiceCare AI's goal is to tackle one of the largest and most overlooked pain points in healthcare, said Parag Jhaveri, founder and CEO of VoiceCare AI. With this funding, we are doubling down on our mission to reduce the burden of administrative conversations and tasks so care teams can prioritize high-value patient care.",
        link: 'https://prnewswire.com',
        featured: true,
      },
      {
        id: 2,
        logo: '/images/press/logos/forbes.png',
        outlet: 'Forbes',
        quote: 'AI Agents Are Coming to HealthCare\n\nVoiceCare AI automates communication between provider organizations, insurers, and patients. Its CEO, Parag Jhaveri, reported that their agent, Joy, can wait on hold for more than 30 minutes, navigate phone trees, sustain multi-hour conversations, and take actions like updating claims and filing requests.',
        link: 'https://forbes.com',
        featured: true,
      },
      {
        id: 3,
        logo: '/images/press/logos/beckers.png',
        outlet: "Becker's Hospital Review",
        quote: 'Streamlining Revenue Cycle Management with AI: VoiceCare AI at Becker\'s 15th Annual Meeting\n\nVoiceCare AI showcased "Joy," its advanced voice agent, at Becker\'s 15th Annual Meeting, which automates payer calls for benefits verification, prior authorizations, claims follow‑up, and A/R collections. Leveraging generative AI and conversational models, it reduces denials, accelerates reimbursements, and slashes administrative workload in revenue‑cycle management.',
        link: 'https://beckershospitalreview.com',
        featured: true,
      },
      {
        id: 4,
        logo: '/images/press/logos/hit-consultant.png',
        outlet: 'Healthcare IT Consultant',
        quote: "Inside Healthcare's Hottest New AI Category: Agentic AI\n\nAutomating these phone calls end-to-end eliminates a \"tremendous\" amount of tedious work, Jhaveri pointed out.\nHe said he was recently on a call with leaders from another large health system who told him their imaging department makes 70,000 calls to insurers per month.",
        link: 'https://healthcareitconsultant.com',
        featured: true,
      },
      {
        id: 5,
        logo: '/images/press/logos/medcity-news.png',
        outlet: 'MedCity News',
        quote: 'VoiceCare AI, new agentic AI startup, kicks off pilot with Mayo Clinic to automate back office work\n\nVoiceCare AI dubbed its voice AI agent "Joy," and the agent is capable of supporting long, complex, and highly nuanced conversations and extended hold times, Jhaveri said.',
        link: 'https://medcitynews.com',
        featured: true,
      },
      {
        id: 6,
        logo: '/images/press/logos/fierce-healthcare.png',
        outlet: 'Fierce Healthcare',
        quote: 'Agentic AI Startup, VoiceCare AI, Launches to Automate Healthcare Back Office and Super-Staff Workforce\n\nCompany Raises $3.85M in Seed Funding led by Caduceus Capital Partners, with Participation\nfrom Bread and Butter Ventures; Announces Collaboration with Mayo Clinic',
        link: 'https://fiercehealthcare.com',
        featured: true,
      },
      {
        id: 7,
        logo: '/images/press/logos/pr-newswire.png',
        outlet: 'PR Newswire',
        quote: 'VoiceCare AI plans to automate back-office operations with generative AI\n\nVoiceCare AI founder and CEO Parag Jhavari said: "By automating conversations in a way that feels genuinely human, we seek to give back time to healthcare professionals so they can focus on high-order patient care, driving radical efficiencies with every conversation. That\'s why we created "Joy," our voice AI agent."',
        link: 'https://prnewswire.com',
        featured: true,
      },
      {
        id: 8,
        logo: '/images/press/logos/yahoo-finance.png',
        outlet: 'Yahoo Finance',
        quote: 'VoiceCare AI Launches with $3.85M to Automate Healthcare Back Office with AI-Powered Voice Agent "Joy"\n\nImagine a world where the time spent on manual phone calls and faxes is replaced by meaningful patient interactions. With generative AI, we want to make this a reality," said Parag Jhaveri, founder and CEO of VoiceCare AI.',
        link: 'https://finance.yahoo.com',
        featured: true,
      },
    ],
  };

  const content = await getContent<PressContent>('press', fallback);
  return content || fallback;
}

// ============================================
// Partner With Us Page Content Types
// ============================================

export interface PartnerHeroContent {
  headline: string;
  description: string;
}

export interface PartnerContent {
  hero: PartnerHeroContent;
}

/**
 * Get Partner page content with fallback
 */
export async function getPartnerContent(): Promise<PartnerContent> {
  const fallback: PartnerContent = {
    hero: {
      headline: 'Partner with Us',
      description: 'Collaborating with VoiceCare will drive mutual growth and success. Fill out the form below to explore partnership opportunities and embark on a journey toward shaping the future of healthcare together.',
    },
  };

  const content = await getContent<PartnerContent>('partner-with-us', fallback);
  return content || fallback;
}

// ============================================
// Schedule Demo Page Content Types
// ============================================

export interface ScheduleDemoHeroContent {
  headline: string;
  description: string;
}

export interface ScheduleDemoContent {
  hero: ScheduleDemoHeroContent;
}

/**
 * Get Schedule Demo page content with fallback
 */
export async function getScheduleDemoContent(): Promise<ScheduleDemoContent> {
  const fallback: ScheduleDemoContent = {
    hero: {
      headline: 'Schedule a Demo',
      description: 'Gain a comprehensive understanding of how our AI-driven solutions can revolutionize your operations. Our team will reach out promptly to arrange a tailored demonstration that aligns with your needs and objectives.',
    },
  };

  const content = await getContent<ScheduleDemoContent>('schedule-demo', fallback);
  return content || fallback;
}

// ============================================
// Terms of Service Page Content Types
// ============================================

export interface TermsSectionContent {
  title: string;
  content: string; // HTML content
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface TermsFullContent {
  title: string;
  sections: TermsSectionContent[];
}

/**
 * Get Terms of Service page content with fallback
 */
export async function getTermsContent(): Promise<TermsFullContent> {
  const fallback: TermsFullContent = {
    title: 'Terms Of Use Policy',
    sections: [], // Empty means use default hardcoded content
  };

  const content = await getContent<TermsFullContent>('terms-of-service', fallback);
  return content || fallback;
}

// ============================================
// Privacy Policy Page Content Types
// ============================================

export interface PrivacySectionContent {
  title: string;
  content: string; // HTML content
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

export interface PrivacyFullContent {
  title: string;
  sections: PrivacySectionContent[];
}

/**
 * Get Privacy Policy page content with fallback
 */
export async function getPrivacyContent(): Promise<PrivacyFullContent> {
  const fallback: PrivacyFullContent = {
    title: 'Privacy Policy',
    sections: [], // Empty means use default hardcoded content
  };

  const content = await getContent<PrivacyFullContent>('privacy-policy', fallback);
  return content || fallback;
}

// ============================================
// TrustedBy Section Content Types
// ============================================

export interface TrustedByLogoContent {
  name: string;
  src: string;
  size: 'normal' | 'large';
}

export interface TrustedByContent {
  logos: TrustedByLogoContent[];
}

/**
 * Get TrustedBy section content with fallback
 */
export async function getTrustedByContent(): Promise<TrustedByContent> {
  const fallback: TrustedByContent = {
    logos: [
      { name: 'American Specialty Health', src: '/images/logos/american-specialty-health.png', size: 'normal' },
      { name: 'Anthem', src: '/images/logos/anthem.png', size: 'normal' },
      { name: 'Aetna', src: '/images/logos/aetna.png', size: 'normal' },
      { name: 'Blue Shield of California', src: '/images/logos/blue-shield-california.png', size: 'large' },
      { name: 'Cigna Healthcare', src: '/images/logos/cigna-healthcare.png', size: 'large' },
      { name: 'Quantum Health', src: '/images/logos/quantum-health.png', size: 'normal' },
      { name: 'UMR', src: '/images/logos/umr.png', size: 'normal' },
      { name: 'United Healthcare', src: '/images/logos/united-healthcare.png', size: 'normal' },
    ],
  };

  const content = await getContent<TrustedByContent>('trusted-by', fallback);
  return content || fallback;
}

// ============================================
// Layout Content Types (Header, Footer, Banner)
// ============================================

export interface AnnouncementBannerContent {
  highlightText: string;
  regularText: string;
}

export interface FooterContent {
  newsletterTitle: string;
  newsletterDescription: string;
  socialLabel: string;
  linkedinUrl: string;
  companyColumnTitle: string;
  resourcesColumnTitle: string;
  copyrightText: string;
}

export interface LayoutContent {
  announcementBanner: AnnouncementBannerContent;
  footer: FooterContent;
}

/**
 * Get Layout content with fallback
 */
export async function getLayoutContent(): Promise<LayoutContent> {
  const fallback: LayoutContent = {
    announcementBanner: {
      highlightText: 'Agentic AI company VoiceCare AI raises $4.54M series Seed financing,',
      regularText: 'strategic investment from Mayo Clinic, and SOC 2 Type II attested and HIPAA-compliant platform',
    },
    footer: {
      newsletterTitle: 'Stay Updated',
      newsletterDescription: 'Get the latest news and updates delivered to your inbox.',
      socialLabel: 'Connect with us',
      linkedinUrl: 'https://linkedin.com',
      companyColumnTitle: 'Company',
      resourcesColumnTitle: 'Resources',
      copyrightText: '© 2025 VoiceCare AI. All rights reserved.',
    },
  };

  const content = await getContent<LayoutContent>('layout', fallback);
  return content || fallback;
}

// ============================================
// React Hook for Client Components
// ============================================

/**
 * Check if content API is configured
 */
export function isContentAPIConfigured(): boolean {
  return Boolean(CONTENT_API_BASE);
}
