/**
 * On-Demand Revalidation API
 * Called by WordPress webhook when content is updated
 * This ensures content changes reflect immediately on the deployed site
 *
 * Usage from WordPress:
 * POST /api/revalidate
 * Body: { "slug": "homepage-hero", "secret": "your-revalidation-secret" }
 *
 * Or revalidate all content:
 * POST /api/revalidate
 * Body: { "slug": "all", "secret": "your-revalidation-secret" }
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secret to prevent unauthorized revalidation requests
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || process.env.VOICECARE_FORM_API_KEY || '';

// Mapping of content slugs to the pages they affect
const SLUG_TO_PATHS: Record<string, string[]> = {
  'homepage-hero': ['/'],
  'value-metrics': ['/'],
  'radical-efficiencies': ['/'],
  'ehr-integrations': ['/'],
  'product-intro': ['/'],
  'trusted-by': ['/'],
  'platform-hero': ['/platform'],
  'platform-ehr': ['/platform'],
  'platform-benefits': ['/platform'],
  'platform-capabilities': ['/platform'],
  'who-we-serve': ['/who-we-serve'],
  'security': ['/security'],
  'company': ['/company'],
  'careers': ['/careers'],
  'press': ['/press'],
  'pricing': ['/pricing'],
  'partner-with-us': ['/partner-with-us'],
  'schedule-demo': ['/schedule-demo'],
  'terms': ['/terms-of-service'],
  'privacy': ['/privacy-policy'],
  'layout': ['/', '/platform', '/security', '/company', '/careers', '/press', '/pricing', '/who-we-serve'],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, secret } = body;

    // Validate secret
    if (!secret || secret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    // Revalidate all content
    if (slug === 'all') {
      revalidateTag('content');
      // Revalidate all known paths
      const allPaths = Array.from(new Set(Object.values(SLUG_TO_PATHS).flat()));
      allPaths.forEach((path) => revalidatePath(path));
      return NextResponse.json({
        success: true,
        message: 'All content revalidated',
        revalidated: allPaths,
      });
    }

    // Revalidate specific content slug
    revalidateTag(`content-${slug}`);

    // Also revalidate the affected pages
    const paths = SLUG_TO_PATHS[slug] || [];
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated content: ${slug}`,
      revalidated: paths,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

// Also support GET for easy testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');

  if (!secret || secret !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Invalid secret' },
      { status: 401 }
    );
  }

  if (!slug) {
    return NextResponse.json(
      { success: false, message: 'Missing slug parameter. Use ?slug=all to revalidate everything.' },
      { status: 400 }
    );
  }

  if (slug === 'all') {
    revalidateTag('content');
    const allPaths = Array.from(new Set(Object.values(SLUG_TO_PATHS).flat()));
    allPaths.forEach((path) => revalidatePath(path));
    return NextResponse.json({
      success: true,
      message: 'All content revalidated',
    });
  }

  revalidateTag(`content-${slug}`);
  const paths = SLUG_TO_PATHS[slug] || [];
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    success: true,
    message: `Revalidated: ${slug}`,
  });
}
