/**
 * API Route: Proxy for WordPress Forms List
 * Fetches all available forms from WordPress server-side,
 * so the client never needs to call WordPress directly.
 * 
 * Uses wp-fetch utility to connect directly to WordPress server IP
 * with proper TLS SNI, bypassing DNS resolution issues.
 */

import { NextResponse } from 'next/server';
import { wpGet } from '@/lib/wp-fetch';

export async function GET() {
  try {
    const response = await wpGet('/wp-json/voicecare/v1/forms');

    if (!response) {
      console.error('[Forms Proxy] No response from WordPress');
      return NextResponse.json(
        { success: false, message: 'WordPress server unreachable' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error('[Forms Proxy] Failed to fetch forms:', response.status);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch forms' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Forms Proxy] Error fetching forms:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}
