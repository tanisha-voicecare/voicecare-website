/**
 * API Proxy: Form Fields
 * Proxies form field requests to WordPress to avoid CORS issues
 * since voicecare.ai now points to Vercel, not WordPress directly
 */

import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://74.208.236.249';

export async function GET(
  request: NextRequest,
  context: { params: { form_id: string } }
) {
  try {
    const form_id = context.params.form_id;
    const url = `${WORDPRESS_API_URL}/wp-json/voicecare/v1/form-fields/${form_id}`;
    console.log('[Form Fields Proxy] Fetching:', url);
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error('[Form Fields Proxy] Error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Form Fields Proxy] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch form fields' },
      { status: 500 }
    );
  }
}
