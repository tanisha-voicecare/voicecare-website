/**
 * API Route: Secure Form Submission Handler
 * Submits form data to WordPress via custom secure endpoint
 */

import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://voicecare.ai';
const API_KEY = process.env.VOICECARE_FORM_API_KEY || '';

// Form ID mapping
const FORM_IDS: Record<string, string | undefined> = {
  'schedule-demo': process.env.NEXT_PUBLIC_WP_DEMO_FORM_ID || '1671',
  'partner': process.env.NEXT_PUBLIC_WP_PARTNER_FORM_ID || '3054',
  'newsletter': process.env.NEXT_PUBLIC_WP_NEWSLETTER_FORM_ID || '3550',
};

interface FormSubmissionRequest {
  formType: string;
  fields: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmissionRequest = await request.json();
    const { formType, fields } = body;

    // Validate form type
    if (!formType || !Object.prototype.hasOwnProperty.call(FORM_IDS, formType)) {
      return NextResponse.json(
        { success: false, message: `Invalid form type: ${formType}.` },
        { status: 400 }
      );
    }

    const formId = FORM_IDS[formType];
    if (!formId) {
      console.log(`[Form Logged - ${formType}]`, JSON.stringify(fields, null, 2));
      return NextResponse.json({
        success: true,
        message: 'Thank you for your submission! We will get back to you soon.',
      });
    }

    // Use the secure custom endpoint
    const endpoint = `${WORDPRESS_API_URL}/wp-json/voicecare/v1/submit-form/${formId}`;
    console.log(`Submitting to: ${endpoint}`);

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
      console.log(`[Form Logged - ${formType}]`, JSON.stringify(fields, null, 2));
      
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
