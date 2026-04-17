import { NextResponse } from "next/server";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";
export const revalidate = 3600;

const GLOBAL_STYLES_REGEX =
  /<style[^>]*\sid=["']global-styles-inline-css["'][^>]*>([\s\S]*?)<\/style>/i;

export async function GET() {
  if (!WORDPRESS_API_URL) {
    return new NextResponse("", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  try {
    const url = `${WORDPRESS_API_URL.replace(/\/$/, "")}/`;
    const res = await fetch(url, {
      headers: { "User-Agent": "VoiceCareBlog/1.0 (Global Styles)" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return new NextResponse("", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
        },
      });
    }

    const html = await res.text();
    const match = html.match(GLOBAL_STYLES_REGEX);
    const css = match?.[1]?.trim() ?? "";

    return new NextResponse(css, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
      },
    });
  }
}
