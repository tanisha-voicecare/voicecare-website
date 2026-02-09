/**
 * API Route: Proxy for WordPress Form Fields
 * Fetches form field definitions from WordPress server-side,
 * so the client never needs to call WordPress directly.
 * 
 * Uses wp-fetch utility to connect directly to WordPress server IP
 * with proper TLS SNI, bypassing DNS resolution issues.
 */

import { NextRequest, NextResponse } from 'next/server';
import { wpGet } from '@/lib/wp-fetch';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;

  try {
    const response = await wpGet(`/wp-json/voicecare/v1/form-fields/${formId}`);

    if (!response) {
      console.error(`[Form Fields Proxy] No response for form ${formId}`);
      return NextResponse.json(
        { success: false, message: 'WordPress server unreachable' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error(`[Form Fields Proxy] Failed to fetch form ${formId}:`, response.status);
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[Form Fields Proxy] Error fetching form ${formId}:`, error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch form fields' },
      { status: 500 }
    );
  }
}
