/**
 * API Proxy: Forms List
 * Proxies form list requests to WordPress to avoid CORS issues
 */

import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://74.208.236.249';

export async function GET() {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp-json/voicecare/v1/forms`,
      {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, forms: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Forms proxy error:', error);
    return NextResponse.json(
      { success: false, forms: [] },
      { status: 500 }
    );
  }
}
