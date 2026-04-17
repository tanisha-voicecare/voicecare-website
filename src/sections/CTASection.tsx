/**
 * CTA Section Component
 * Call-to-action section for driving conversions
 * Content is designed to be CMS-driven
 */

import { Container, Button, Heading, Text } from '@/components/ui';
import type { CTAContent } from '@/types';

// ============================================
// Types
// ============================================

interface CTASectionProps {
  content?: CTAContent;
  variant?: 'primary' | 'gradient' | 'dark';
  className?: string;
}

// ============================================
// Default Content
// ============================================

const defaultContent: CTAContent = {
  headline: 'Ready to Take the First Step?',
  description:
    'Schedule your appointment today and experience healthcare that puts you first. Our team is ready to provide you with exceptional care.',
  buttonText: 'Book Your Appointment',
  buttonHref: '/appointments',
};

// ============================================
// Background Patterns
// ============================================

function CTABackground({ variant }: { variant: CTASectionProps['variant'] }) {
  if (variant === 'gradient') {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>
    );
  }

  // Primary variant
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-primary-600" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-800/50 rounded-full blur-3xl" />
    </div>
  );
}

// ============================================
// Icons
// ============================================

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

// ============================================
// Component
// ============================================

export function CTASection({
  content = defaultContent,
  variant = 'gradient',
  className = '',
}: CTASectionProps) {
  const { headline, description, buttonText, buttonHref } = content;

  return (
    <section
      className={`relative py-20 md:py-28 overflow-hidden ${className}`}
      aria-labelledby="cta-heading"
    >
      <CTABackground variant={variant} />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Heading
            as="h2"
            size="xl"
            color="white"
            className="mb-6"
            id="cta-heading"
          >
            {headline}
          </Heading>

          <Text
            size="lg"
            color="white"
            className="mb-10 opacity-90"
            leading="relaxed"
          >
            {description}
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={buttonHref}
              variant="secondary"
              size="lg"
              rightIcon={<ArrowIcon className="w-5 h-5" />}
            >
              {buttonText}
            </Button>

            <Button
              href="tel:+18004325848"
              variant="outline"
              size="lg"
              leftIcon={<PhoneIcon className="w-5 h-5" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Call 1-800-HEALTH
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Same-day appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Insurance accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
