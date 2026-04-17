import { wpGet } from "@/lib/wp-fetch";

const WORDPRESS_CONTENT_ENABLED = process.env.WORDPRESS_CONTENT_ENABLED === "true";
const WORDPRESS_SERVER_IP = process.env.WORDPRESS_SERVER_IP || "";
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";
const CONTENT_ENABLED =
  WORDPRESS_CONTENT_ENABLED && (Boolean(WORDPRESS_SERVER_IP) || Boolean(WORDPRESS_API_URL));

const CONTENT_API_PATH = "/wp-json/voicecare/v1";
const isDevelopment = process.env.NODE_ENV === "development";
export const CONTENT_REVALIDATE_TIME = isDevelopment ? 0 : 20;
const FETCH_TIMEOUT_MS = 2000;

type LayoutContent = {
  announcementBanner: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  footer: {
    tagline: string;
  };
};

const layoutFallback: LayoutContent = {
  announcementBanner: {
    primary: "Agentic AI Startup VoiceCare AI Completes Successful Funding Round",
    secondary: "Inside Healthcare's Hottest New AI Category: Agentic AI",
    tertiary:
      "Streamlining Revenue Cycle Management with AI: VoiceCare AI at Becker's 15th Annual Meeting",
  },
  footer: {
    tagline: "The Autonomous Workforce for High-Precision RCM",
  },
};

function deepMerge<T>(fallback: T, wpData: unknown): T {
  if (!wpData || typeof wpData !== "object") return fallback;
  if (typeof fallback !== "object" || fallback === null) return fallback;

  const result = { ...fallback } as Record<string, unknown>;
  const fb = fallback as Record<string, unknown>;
  const wp = wpData as Record<string, unknown>;

  for (const key of Object.keys(fb)) {
    const wpValue = wp[key];
    const fallbackValue = fb[key];
    if (wpValue === null || wpValue === undefined) continue;

    if (Array.isArray(fallbackValue)) {
      if (Array.isArray(wpValue) && wpValue.length > 0) result[key] = wpValue;
      continue;
    }

    if (
      typeof fallbackValue === "object" &&
      fallbackValue !== null &&
      typeof wpValue === "object" &&
      !Array.isArray(wpValue)
    ) {
      result[key] = deepMerge(fallbackValue, wpValue);
      continue;
    }

    result[key] = wpValue;
  }
  return result as T;
}

export async function getLayoutContent(): Promise<LayoutContent> {
  if (!CONTENT_ENABLED) return layoutFallback;

  const response = await wpGet(`${CONTENT_API_PATH}/content/layout`, FETCH_TIMEOUT_MS);
  if (!response || !response.ok) return layoutFallback;

  try {
    const payload = await response.json();
    return deepMerge(layoutFallback, payload);
  } catch {
    return layoutFallback;
  }
}
