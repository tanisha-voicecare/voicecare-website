'use client';

/**
 * PartnerForm Component
 * DYNAMIC VERSION - Fetches form fields from WordPress
 * 
 * Features:
 * - Zero developer dependency - admin changes fields in WordPress
 * - Maintains pixel-perfect styling
 * - Automatic 2-column grid layout
 */

import { DynamicForm } from '@/components/forms';

// Form ID from WordPress MetForm (Partner with Us form)
const PARTNER_FORM_ID = process.env.NEXT_PUBLIC_WP_PARTNER_FORM_ID || '3054';

export function PartnerForm() {
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pb-12 sm:pb-16 md:pb-20">
      <DynamicForm
        formId={PARTNER_FORM_ID}
        successMessage="Our team will reach out to you within the next 24 hours."
      />
    </section>
  );
}

export default PartnerForm;
