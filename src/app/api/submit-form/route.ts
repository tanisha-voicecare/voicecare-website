/**
 * API Route: Secure Form Submission Handler
 * Submits form data to WordPress via custom secure endpoint
 * 
 * Supports both:
 * - Legacy: { formType: 'schedule-demo', fields: {...} }
 * - Dynamic: { formId: '1671', fields: {...} }
 */

import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://voicecare.ai';
const API_KEY = process.env.VOICECARE_FORM_API_KEY || '';

// Legacy form type to ID mapping (for backward compatibility)
const FORM_TYPE_TO_ID: Record<string, string> = {
  'schedule-demo': process.env.NEXT_PUBLIC_WP_DEMO_FORM_ID || '1671',
  'partner': process.env.NEXT_PUBLIC_WP_PARTNER_FORM_ID || '3054',
  'newsletter': process.env.NEXT_PUBLIC_WP_NEWSLETTER_FORM_ID || '3550',
};

interface FormSubmissionRequest {
  formType?: string;  // Legacy support
  formId?: string;    // New dynamic support
  fields: Record<string, string | string[]>;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmissionRequest = await request.json();
    const { formType, formId: directFormId, fields } = body;

    // Determine form ID (support both legacy formType and direct formId)
    let formId: string | undefined;
    
    if (directFormId) {
      // Direct form ID provided (dynamic forms)
      formId = String(directFormId);
    } else if (formType && formType in FORM_TYPE_TO_ID) {
      // Legacy form type mapping
      formId = FORM_TYPE_TO_ID[formType];
    } else if (formType && /^\d+$/.test(formType)) {
      // Form type is actually a numeric ID
      formId = formType;
    }

    // Validate we have a form ID
    if (!formId) {
      console.log(`[Form Logged - Unknown]`, JSON.stringify({ formType, fields }, null, 2));
      return NextResponse.json({
        success: true,
        message: 'Thank you for your submission! We will get back to you soon.',
      });
    }

    // Use the secure custom endpoint
    const endpoint = `${WORDPRESS_API_URL}/wp-json/voicecare/v1/submit-form/${formId}`;
    console.log(`Submitting to form ${formId}: ${endpoint}`);

    // Submit with API key
    const wpResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VoiceCare-API-Key': API_KEY,
      },
      body: JSON.stringify(fields),
    });

    const wpResult = await wpResponse.json();
    console.log('WordPress response:', wpResult);

    if (wpResponse.ok && wpResult.success) {
      return NextResponse.json({
        success: true,
        message: wpResult.message || 'Thank you for your submission! We will contact you shortly.',
      });
    } else {
      console.error('Form submission failed:', wpResult);
      
      // Log for manual follow-up but show success to user
      console.log(`[Form Logged - Form ${formId}]`, JSON.stringify(fields, null, 2));
      
      return NextResponse.json({
        success: true,
        message: 'Thank you for your submission! We will get back to you soon.',
      });
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({
      success: true,
      message: 'Thank you for your submission! We will get back to you soon.',
    });
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
