'use client';

/**
 * ScheduleDemoForm Component
 * DYNAMIC VERSION - Fetches form fields from WordPress
 * 
 * Features:
 * - Zero developer dependency - admin changes fields in WordPress
 * - Maintains pixel-perfect styling
 * - Automatic 2-column grid layout
 * - Label overrides for correct display (WordPress may return generic labels)
 */

import { DynamicForm } from '@/components/forms';

// Form ID from WordPress MetForm (Get a Demo form)
const DEMO_FORM_ID = process.env.NEXT_PUBLIC_WP_DEMO_FORM_ID || '1671';

// Label overrides - EXACT field names from WordPress API response
// API: https://voicecare.ai/wp-json/voicecare/v1/form-fields/1671
const LABEL_OVERRIDES: Record<string, string> = {
  // Exact field names from WordPress (form ID 1671)
  'name': 'Name',                              // WP label: "First Name"
  'company___': 'Company Name',                // WP label: "Text"
  'callspermonth': 'No of calls to automate per month',  // WP label: "Select"
  'industry': 'Industry Vertical',             // WP label: "Select"
  'mf-email': 'Email Address',                 // WP label: "Email Address" (already correct)
  'mf-telephone': 'Phone Number',              // WP label: "Telephone"
  'message': 'Message',                        // WP label: "Textarea"
  
  // Fallback: Match by WP label (in case field names change)
  'First Name': 'Name',
  'Text': 'Company Name',
  'Select': 'No of calls to automate per month', // First select encountered
  'Telephone': 'Phone Number',
  'Textarea': 'Message',
};

// Placeholder overrides (matching Figma design)
const PLACEHOLDER_OVERRIDES: Record<string, string> = {
  // Exact field names from WordPress
  'name': 'Enter your name',
  'company___': 'Enter your company name',
  'callspermonth': 'Select range',
  'industry': 'Select industry',
  'mf-email': 'Enter your email address',
  'mf-telephone': 'Enter your phone number',
  'message': 'Type here...',
  
  // Fallback by label
  'First Name': 'Enter your name',
  'Text': 'Enter your company name',
  'Telephone': 'Enter your phone number',
  'Textarea': 'Type here...',
};

// Required overrides - all fields required except Message
const REQUIRED_OVERRIDES: Record<string, boolean> = {
  'name': true,
  'company___': true,
  'callspermonth': true,
  'industry': true,
  'mf-email': true,
  'mf-telephone': true,
  'message': false,  // Message is optional
};

export function ScheduleDemoForm() {
  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pb-12 sm:pb-16 md:pb-20">
      <DynamicForm
        formId={DEMO_FORM_ID}
        successMessage="Our team will reach out to you within the next 24 hours."
        labelOverrides={LABEL_OVERRIDES}
        placeholderOverrides={PLACEHOLDER_OVERRIDES}
        requiredOverrides={REQUIRED_OVERRIDES}
      />
    </section>
  );
}

export default ScheduleDemoForm;
