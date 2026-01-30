/**
 * Services Listing Page
 * Displays all healthcare services
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHeader, Grid, ServiceCard } from '@/components/ui';
import { CTASection } from '@/sections';
import { generatePageMetadata } from '@/lib/seo';
import { getServices, processService } from '@/lib/wordpress';
import type { ServiceCardContent } from '@/types';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services',
  description:
    'Explore our comprehensive range of healthcare services including primary care, cardiology, pediatrics, orthopedics, dermatology, and mental health.',
  pathname: '/services',
});

// ============================================
// ISR Configuration
// ============================================

export const revalidate = 600;

// ============================================
// Service Icon Component
// ============================================

function ServiceIcon({ type }: { type: string }) {
  const iconClass = 'w-6 h-6';

  const icons: Record<string, JSX.Element> = {
    stethoscope: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    heart: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    child: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    bone: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    ),
    skin: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    brain: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    emergency: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    lab: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.611L5 14.5" />
      </svg>
    ),
    imaging: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  };

  return icons[type] || icons.stethoscope;
}

// ============================================
// Default Services
// ============================================

const defaultServices: ServiceCardContent[] = [
  {
    id: 1,
    title: 'Primary Care',
    description: 'Comprehensive health assessments, preventive care, and treatment for common illnesses with personalized attention.',
    icon: 'stethoscope',
    href: '/services/primary-care',
  },
  {
    id: 2,
    title: 'Cardiology',
    description: 'Expert heart care including diagnostics, interventional procedures, and ongoing cardiac health management.',
    icon: 'heart',
    href: '/services/cardiology',
  },
  {
    id: 3,
    title: 'Pediatrics',
    description: 'Specialized care for infants, children, and adolescents from newborn wellness to teenage health.',
    icon: 'child',
    href: '/services/pediatrics',
  },
  {
    id: 4,
    title: 'Orthopedics',
    description: 'Treatment for bone, joint, and muscle conditions including sports injuries and joint replacements.',
    icon: 'bone',
    href: '/services/orthopedics',
  },
  {
    id: 5,
    title: 'Dermatology',
    description: 'Skin health services from medical dermatology to cosmetic procedures and skin cancer screening.',
    icon: 'skin',
    href: '/services/dermatology',
  },
  {
    id: 6,
    title: 'Mental Health',
    description: 'Compassionate psychiatric care, counseling, and therapy for anxiety, depression, and other conditions.',
    icon: 'brain',
    href: '/services/mental-health',
  },
  {
    id: 7,
    title: 'Emergency Care',
    description: '24/7 emergency medical services for urgent health situations requiring immediate attention.',
    icon: 'emergency',
    href: '/services/emergency-care',
  },
  {
    id: 8,
    title: 'Laboratory Services',
    description: 'Comprehensive diagnostic testing with fast, accurate results for informed medical decisions.',
    icon: 'lab',
    href: '/services/laboratory',
  },
  {
    id: 9,
    title: 'Imaging & Radiology',
    description: 'Advanced diagnostic imaging including X-rays, MRI, CT scans, and ultrasound services.',
    icon: 'imaging',
    href: '/services/imaging',
  },
];

// ============================================
// Data Fetching
// ============================================

async function getServicesData() {
  try {
    const services = await getServices();
    return services.map(processService);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// ============================================
// Page Component
// ============================================

export default async function ServicesPage() {
  const cmsServices = await getServicesData();

  // Use CMS services if available, otherwise use defaults
  const services: ServiceCardContent[] =
    cmsServices.length > 0
      ? cmsServices.map((service) => ({
          id: service.id,
          title: service.title,
          description: service.shortDescription,
          icon: service.icon || 'stethoscope',
          href: `/services/${service.slug}`,
        }))
      : defaultServices;

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Section background="gradient" spacing="xl" className="pt-20 sm:pt-24 md:pt-32">
        <Container>
          <SectionHeader
            eyebrow="What We Offer"
            title="Our Healthcare Services"
            description="From preventive care to specialized treatments, we offer a comprehensive range of medical services delivered by our expert team of physicians."
          />

          <Grid cols={3} gap="lg">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard
                  icon={<ServiceIcon type={service.icon} />}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Why Choose Our Services */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary-600 mb-2 sm:mb-3">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
                Excellence in Every Aspect of Care
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Our healthcare services are designed with you in mind. We combine 
                medical expertise with compassionate care to ensure the best 
                possible outcomes for every patient.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {[
                  { stat: '50+', label: 'Expert Physicians' },
                  { stat: '15k+', label: 'Patients Treated' },
                  { stat: '25+', label: 'Years Experience' },
                  { stat: '98%', label: 'Satisfaction Rate' },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 sm:p-5 md:p-6 bg-neutral-50 rounded-xl sm:rounded-2xl">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-0.5 sm:mb-1">
                      {item.stat}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="aspect-square max-w-[320px] sm:max-w-[400px] md:max-w-none mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                <div className="text-center p-6 sm:p-8">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-primary-400 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-sm sm:text-base text-primary-700 font-medium">Healthcare Excellence</p>
                  <p className="text-xs sm:text-sm text-primary-600/80">Add image via WordPress CMS</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        content={{
          headline: 'Need Help Choosing a Service?',
          description: 'Our patient coordinators are here to help you find the right care. Contact us today for a consultation.',
          buttonText: 'Contact Us',
          buttonHref: '/contact',
        }}
        variant="gradient"
      />
    </div>
  );
}
