/**
 * API Proxy: Form Fields
 * Proxies form field requests to WordPress to avoid CORS issues
 * since voicecare.ai now points to Vercel, not WordPress directly
 */

import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://voicecare.ai';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ form_id: string }> }
) {
  try {
    const { form_id } = await params;
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp-json/voicecare/v1/form-fields/${form_id}`,
      {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Form fields proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch form fields' },
      { status: 500 }
    );
  }
}
