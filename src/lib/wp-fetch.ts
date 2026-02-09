/**
 * WordPress Direct Fetch Utility
 * 
 * When voicecare.ai points to Vercel, we can't use it to reach WordPress.
 * This utility connects directly to the WordPress server IP with proper
 * TLS SNI (Server Name Indication) so the SSL certificate validates correctly.
 * 
 * How it works:
 * - Connects to WORDPRESS_SERVER_IP (e.g., 74.208.236.249) directly
 * - Sets TLS servername to WORDPRESS_HOSTNAME (e.g., voicecare.ai) 
 *   so the server presents the correct SSL certificate
 * - Sends Host header as WORDPRESS_HOSTNAME so WordPress serves the right site
 * 
 * Falls back to regular fetch with WORDPRESS_API_URL if no server IP is configured.
 */

import https from 'https';

const WORDPRESS_SERVER_IP = process.env.WORDPRESS_SERVER_IP || '';
const WORDPRESS_HOST = process.env.WORDPRESS_HOSTNAME || 'voicecare.ai';
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://voicecare.ai';

// Default timeout for WordPress requests (ms)
const DEFAULT_TIMEOUT_MS = 10000;

// ============================================
// Response type (matches fetch Response shape)
// ============================================

interface WPResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
}

// ============================================
// Core request function using https module
// ============================================

function makeDirectRequest(
  method: string,
  path: string,
  body?: string,
  extraHeaders: Record<string, string> = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {
      'Host': WORDPRESS_HOST,
      ...extraHeaders,
    };

    if (body) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = String(Buffer.byteLength(body));
    }

    const options: https.RequestOptions = {
      hostname: WORDPRESS_SERVER_IP,
      port: 443,
      path: path,
      method: method,
      headers: headers,
      servername: WORDPRESS_HOST, // TLS SNI - makes cert validation work
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk: string) => (data += chunk));
      res.on('end', () => {
        const statusCode = res.statusCode || 500;
        resolve({
          ok: statusCode >= 200 && statusCode < 300,
          status: statusCode,
          json: async () => JSON.parse(data),
          text: async () => data,
        });
      });
    });

    req.on('error', (err) => {
      console.error('[wp-fetch] Request error:', err.message);
      resolve(null);
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      console.warn(`[wp-fetch] Request timed out after ${timeoutMs}ms`);
      resolve(null);
    });

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

// ============================================
// Fallback: regular fetch (when no IP configured)
// ============================================

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
      'Host': WORDPRESS_HOST,
      ...extraHeaders,
    };

    if (body) {
      headers['Content-Type'] = 'application/json';
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
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`[wp-fetch] Fetch timed out after ${timeoutMs}ms`);
    } else {
      console.error('[wp-fetch] Fetch error:', error);
    }
    return null;
  }
}

// ============================================
// Public API
// ============================================

/**
 * Make a GET request to a WordPress API endpoint.
 * @param path - The path (e.g., "/wp-json/voicecare/v1/form-fields/1671")
 * @param timeoutMs - Request timeout in milliseconds
 */
export async function wpGet(
  path: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  if (WORDPRESS_SERVER_IP) {
    return makeDirectRequest('GET', path, undefined, {}, timeoutMs);
  }
  return makeFetchRequest('GET', path, undefined, {}, timeoutMs);
}

/**
 * Make a POST request to a WordPress API endpoint.
 * @param path - The path (e.g., "/wp-json/voicecare/v1/submit-form/1671")
 * @param body - The JSON body to send
 * @param extraHeaders - Additional headers (e.g., API key)
 * @param timeoutMs - Request timeout in milliseconds
 */
export async function wpPost(
  path: string,
  body: unknown,
  extraHeaders: Record<string, string> = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WPResponse | null> {
  const jsonBody = JSON.stringify(body);
  if (WORDPRESS_SERVER_IP) {
    return makeDirectRequest('POST', path, jsonBody, extraHeaders, timeoutMs);
  }
  return makeFetchRequest('POST', path, jsonBody, extraHeaders, timeoutMs);
}

/**
 * Check if direct WordPress connection is configured
 */
export function isDirectConnectionConfigured(): boolean {
  return Boolean(WORDPRESS_SERVER_IP);
}
