/**
 * API Route: WordPress Global Styles (Gutenberg)
 *
 * Fetches the WordPress front-end HTML and extracts the contents of the
 * <style id="global-styles-inline-css"> tag. This CSS contains Gutenberg
 * preset font sizes (has-small-font-size, has-medium-font-size, etc.) and
 * CSS variables (--wp--preset--font-size--*) so that WP editor typography
 * choices (e.g. Pullquote S/M/L/XL) render correctly in the blog Shadow DOM.
 *
 * Used only by BlogPostBody; does not affect global site styles.
 */

import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';

// Revalidate this route every hour so WP theme/global style changes propagate
export const revalidate = 3600;

const GLOBAL_STYLES_REGEX =
  /<style[^>]*\sid=["']global-styles-inline-css["'][^>]*>([\s\S]*?)<\/style>/i;

export async function GET() {
  if (!WORDPRESS_API_URL) {
    return new NextResponse('', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }

  try {
    const url = `${WORDPRESS_API_URL.replace(/\/$/, '')}/`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VoiceCareBlog/1.0 (Global Styles)' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return new NextResponse('', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
        },
      });
    }

    const html = await res.text();
    const match = html.match(GLOBAL_STYLES_REGEX);
    const css = match ? match[1].trim() : '';

    return new NextResponse(css, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
      },
    });
  }
}
