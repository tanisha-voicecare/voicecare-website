import https from "https";

const WORDPRESS_SERVER_IP = process.env.WORDPRESS_SERVER_IP || "";
const WORDPRESS_HOST = process.env.WORDPRESS_HOSTNAME || "voicecare.ai";
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://voicecare.ai";

const DEFAULT_TIMEOUT_MS = 10000;
const USER_AGENT = "VoiceCareApp/1.0 (Next.js; Server-Side)";

interface WPResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
}

function makeDirectRequest(
  method: string,
  path: string,
  body?: string,
  extraHeaders: Record<string, string> = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {
      Host: WORDPRESS_HOST,
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      ...extraHeaders,
    };

    if (body) {
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = String(Buffer.byteLength(body));
    }

    const options: https.RequestOptions = {
      hostname: WORDPRESS_SERVER_IP,
      port: 443,
      path,
      method,
      headers,
      servername: WORDPRESS_HOST,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk: string) => (data += chunk));
      res.on("end", () => {
        const statusCode = res.statusCode || 500;
        resolve({
          ok: statusCode >= 200 && statusCode < 300,
          status: statusCode,
          json: async () => JSON.parse(data),
          text: async () => data,
        });
      });
    });

    req.on("error", (err) => {
      console.error("[wp-fetch] Request error:", err.message);
      resolve(null);
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      console.warn(`[wp-fetch] Request timed out after ${timeoutMs}ms`);
      resolve(null);
    });

    if (body) req.write(body);
    req.end();
  });
}

async function makeFetchRequest(
  method: string,
  path: string,
  body?: string,
  extraHeaders: Record<string, string> = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = {
      Host: WORDPRESS_HOST,
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      ...extraHeaders,
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${WORDPRESS_API_URL}${path}`, {
      method,
      headers,
      body: body || undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return {
      ok: response.ok,
      status: response.status,
      json: () => response.json(),
      text: () => response.text(),
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(`[wp-fetch] Fetch timed out after ${timeoutMs}ms`);
    } else {
      console.error("[wp-fetch] Fetch error:", error);
    }
    return null;
  }
}

export async function wpGet(
  path: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  if (WORDPRESS_SERVER_IP) {
    return makeDirectRequest("GET", path, undefined, {}, timeoutMs);
  }
  return makeFetchRequest("GET", path, undefined, {}, timeoutMs);
}

export async function wpPost(
  path: string,
  body: unknown,
  extraHeaders: Record<string, string> = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  const jsonBody = JSON.stringify(body);
  if (WORDPRESS_SERVER_IP) {
    return makeDirectRequest("POST", path, jsonBody, extraHeaders, timeoutMs);
  }
  return makeFetchRequest("POST", path, jsonBody, extraHeaders, timeoutMs);
}

export function isDirectConnectionConfigured(): boolean {
  return Boolean(WORDPRESS_SERVER_IP);
}
