/**
 * Jobs Data
 * Centralized job listings data for the Careers page
 * EXACT data from designer-src/src/app/components/Careers.tsx
 */

// ============================================
// Types
// ============================================

export interface JobData {
  title: string;
  category: string;
  locations: string[];
  type: string[];
  description: string;
  responsibilities: string[];
  skills: string[];
  benefits: string[];
}

// ============================================
// Helper Functions
// ============================================

/**
 * Generate URL-friendly slug from job title
 */
export function generateJobSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Get job data by slug
 */
export function getJobBySlug(slug: string): JobData | undefined {
  return jobsData.find((job) => generateJobSlug(job.title) === slug);
}

// ============================================
// Jobs Data - EXACT from designer-src
// ============================================

export const jobsData: JobData[] = [
  {
    title: 'Principal or Senior Security Engineer or Consultant',
    category: 'Engineering',
    locations: ['Bay Area', 'India'],
    type: ['Remote', 'Full-time', 'Part-time'],
    description:
      "Join us as a Principal or Senior Security Engineer (Part-time/Full-time) and play a crucial role in safeguarding VoiceCare AI's digital landscape. This position is pivotal in supporting our dynamic team—including researchers, engineers, and staff—ensuring they have the secure and efficient tools necessary for their roles. As a central figure connecting applied artificial intelligence, engineering, product development, and infrastructure, you'll spearhead the development and enforcement of robust security practices across the company.",
    responsibilities: [
      "Develop, implement, and maintain security protocols to shield the company's information assets from unauthorized access and potential threats.",
      'Continuously monitor our systems to promptly detect and address security vulnerabilities and breaches.',
      'Collaborate closely with IT, Engineering, Product, and Legal departments to enhance security frameworks and compliance with established policies.',
      'Guide the integration and optimization of security practices within our tech stack, including GSuite, GCPW, and GitHub.',
      "Innovate and implement cutting-edge security measures such as 'secure by default' and 'zero trust' models to fortify our digital environments.",
      'Lead initiatives in data protection through advanced sharing controls, Data Loss Prevention (DLP), and other relevant security mechanisms.',
      'Utilize AI-driven models to advance our capabilities in security detection, response, and data classification.',
      'Engage in educational outreach within the organization to promote security awareness and best practices among all employees.',
    ],
    skills: [
      'Proven experience in managing and securing windows environments and deploying endpoint security solutions.',
      'Solid background in public cloud infrastructures like GCP, and proficiency in managing cloud security aspects.',
      'Expertise in identity and access management, including familiarity with protocols like SAML, OAUTH, and SCIM.',
      'Strong understanding of email security standards such as SPF, DKIM, and DMARC.',
      'Competency in scripting languages such as Python or Bash, enabling automation and efficient security management.',
      'Adept at navigating the landscape of modern cybersecurity threats and employing effective countermeasures.',
      'Excellent project management skills with a keen ability to prioritize risk-reducing strategies in a collaborative setting.',
    ],
    benefits: [
      'Work at a unique blend of technical expertise, strategic thinking, and a collaborative spirit, making you the ideal candidate to lead our security efforts.',
      'Lead security with a proactive approach and dedication to maintaining high standards will contribute significantly to our mission of advancing secure and innovative technology solutions.',
    ],
  },
  {
    title: 'Senior Backend Engineer',
    category: 'Engineering',
    locations: ['India'],
    type: ['Hybrid', 'Full-time'],
    description:
      'As a Senior Backend Engineer, you will have the opportunity to work with a talented team of engineers, data scientists, and healthcare professionals to develop cutting-edge technologies that transform the healthcare industry. You will be responsible for developing and maintaining the backend infrastructure that powers our core Healthcare AI platform. You will work closely with data scientists, machine learning engineers, and product managers to build scalable and reliable systems that retrieve and process vast amounts of healthcare data to train and operate our AI models.',
    responsibilities: [
      'Design, develop, and maintain backend infrastructure',
      'Collaborate with data scientists and machine learning engineers to design and implement scalable data pipelines',
      'Build and maintain APIs and microservices that enable efficient and reliable data retrieval and processing',
      'Develop and implement robust data security and privacy measures to protect sensitive patient information',
      'Monitor and optimize the performance of backend systems to ensure maximum efficiency and uptime',
      'Work closely with product managers to understand customer needs and requirements and translate them into technical solutions',
      'Mentor and provide technical guidance to junior engineers',
    ],
    skills: [
      "Bachelor's or Master's degree in Computer Science, Computer Engineering, or a related field",
      'At least 5 years of professional experience in backend development',
      'Strong proficiency in one or more programming languages such as Python, Java, or Scala',
      'Expertise in vector database technology and designing retrieval systems for high-performance machine learning applications',
      'Knowledge of data modeling, database design, and SQL',
      'Experience with cloud computing platforms such as AWS, GCP, or Azure',
      'Familiarity with DevOps principles and tools such as Docker, Kubernetes, and CI/CD pipelines',
      'Strong problem-solving skills and ability to work independently and collaboratively in a team environment',
      'Experience with technologies such as Langchain is a plus',
      'Excellent communication and interpersonal skills',
    ],
    benefits: [
      'Work with a talented team of engineers, data scientists, and healthcare professionals',
      'Develop cutting-edge technologies that transform the healthcare industry',
      'Build scalable and reliable systems that make a real impact on patient care',
    ],
  },
  {
    title: 'Senior DevOps Engineer',
    category: 'Engineering',
    locations: ['India'],
    type: ['Hybrid', 'Full-time'],
    description:
      'We are seeking a highly skilled DevOps Engineer to join our team. In this role responsibilities will include designing and implementing infrastructure automation, continuous integration and delivery pipelines, and monitoring and scaling the infrastructure that powers our healthcare AI platform. You will work closely with software engineers, research scientists, and other cross-functional teams to develop and maintain reliable and scalable infrastructure that enables rapid iteration and deployment of our products.',
    responsibilities: [
      'Design and implement infrastructure automation and deployment pipelines using tools such as Terraform, Ansible, and Jenkins',
      'Implement and maintain monitoring and logging systems to ensure the reliability and performance of our healthcare AI platform',
      'Work closely with software engineers to design and deploy scalable, fault-tolerant, and secure production systems on cloud platforms such as AWS, GCP, or Azure',
      'Develop and maintain security and compliance policies and procedures for our healthcare AI platform',
      'Collaborate with cross-functional teams to troubleshoot and resolve complex issues related to infrastructure, deployment, and operations',
      'Implement and maintain disaster recovery and business continuity plans',
      'Develop and maintain documentation related to infrastructure, deployment, and operations',
      'Mentor and provide technical guidance to junior engineers',
    ],
    skills: [
      "Bachelor's or Master's degree in Computer Science, Computer Engineering, or a related field",
      'At least 5 years of professional experience in DevOps engineering or a related field',
      'Expertise in infrastructure automation and deployment tools such as Terraform, Ansible, Jenkins, or GitLab CI/CD',
      'Experience with cloud platforms such as AWS, GCP, or Azure',
      'Strong knowledge of containerization technologies such as Docker and Kubernetes',
      'Experience with monitoring and logging tools such as ELK, Grafana, or Datadog',
      'Familiarity with security and compliance best practices and tools such as HashiCorp Vault, AWS KMS, or Azure Key Vault',
      'Strong problem-solving skills and ability to work independently and collaboratively in a team environment',
      'Excellent communication and interpersonal skills',
      'Experience implementing HIPAA and SOC2 compliance is a plus',
      'Experience working in an HPC Environment is a plus',
    ],
    benefits: [
      'Work closely with software engineers, research scientists, and cross-functional teams',
      'Develop and maintain reliable and scalable infrastructure that enables rapid iteration',
      'Play a key role in powering our healthcare AI platform',
    ],
  },
  {
    title: 'Staff Data Scientist',
    category: 'Applied AI',
    locations: ['Bay Area'],
    type: ['Hybrid', 'Full-time'],
    description:
      'Applied Scientists at VoiceCare provide a dynamic opportunity to work with a team of world-class research scientists and engineers, who are pursuing scientific and technical innovation to help solve complex challenges through the use of Generative AI technology. We are seeking Artificial Intelligence (AI) Applied Scientists to join our team and contribute to the development of Large Conversational Language Models (LCLMs) aimed at creating disruptive safety-focused generative intelligence for Healthcare. As an Applied Scientist, you will play a crucial role in developing, improving, and exploring the capabilities of LCLMs to solve complex real-world problems geared towards building Conversation AI products.',
    responsibilities: [
      'Alignment and Post-training: Instruction tuning and reinforcement learning from human and model feedback',
      'Continual Learning: Enabling LCLMs to evolve and adapt over time and learn from previous experiences over human interactions',
      'Specialization: Tailoring LCLMs to meet domain-specific requirements',
      'Efficiency: Optimizing the computational efficiency and cost-effectiveness of LCLM deployments',
    ],
    skills: [
      'PhD in Computer Science, Electrical Engineering, or related field',
      '5+ years Industry experience in NLP and machine learning',
      'Strong programming skills in Python and experience with deep learning frameworks such as TensorFlow or PyTorch',
      'Experience with large-scale data processing and distributed computing',
      'Experience with training (pre-training / fine-tuning / RLHF) autoregressive language models like LLaMA, Falcon, GPT-x family, etc.',
      'Experience with open-source LLM platforms and training stack (e.g., HuggingFace, Deepspeed etc.)',
      'Experience in healthcare or life sciences is a plus',
    ],
    benefits: [
      'Applied Data Scientists translate customer needs into tangible outcomes',
      'In this crucial role, you will propel forward innovative research and development',
    ],
  },
  {
    title: 'Research Scientist',
    category: 'Applied AI',
    locations: ['Bay Area'],
    type: ['Hybrid', 'Full-time'],
    description:
      'As a Research Scientist you will help lead the development for our Speech Synthesis technology which is core to VoiceCare AI and our Generative AI Healthcare Agents. You will play a pivotal role in developing and advancing our state-of-the-art speech synthesis capabilities tailored specifically for the healthcare domain. Working alongside a dedicated and talented team, you will lead efforts to tackle challenging problems in generative speech synthesis, text-to-speech, accent modeling, and voice conversions. This position offers an exciting opportunity to contribute to groundbreaking research and shape the future of AI-driven healthcare.',
    responsibilities: [
      'Design, develop, and maintain speech synthesis infrastructure',
      'Collaborate with data scientists and machine learning engineers to design and implement scalable audio pipelines',
      'Build and maintain APIs and microservices that enable efficient and reliable audio processing',
      'Develop and implement robust data security and privacy measures to protect sensitive patient information',
      'Monitor and optimize the performance of speech synthesis systems to ensure maximum efficiency and uptime',
      'Work closely with product managers to understand customer needs and requirements and translate them into technical solutions',
      'Mentor and provide technical guidance to junior engineers',
    ],
    skills: [
      'Ph.D. or Postdoctoral researcher in audio synthesis, speech processing, or a related field, with a strong academic background in healthcare applications preferred',
      '3+ years of experience in audio synthesis techniques, including TTS, SST, or voice conversion methods, with a track record of successful research projects',
      'Demonstrable research experience with a strong publication record in major Speech Synthesis and Speech Processing venues such as ICASSP, Interspeech, or NeurIPS',
      'Hands-on experience in Python, PyTorch, or TensorFlow',
      'Familiarity with compute platforms such AWS for scalable model development and deployment',
      'Experience in audio identity embedding, accent modeling, style-transfer, and multi-language audio synthesis within the context of healthcare applications',
      'Knowledge of attention mechanisms, diffusion models, and advanced speech signal processing techniques',
    ],
    benefits: [
      'Research Scientists translate customer needs into tangible outcomes',
      'In this crucial role, you will propel forward innovative research and development',
    ],
  },
];
