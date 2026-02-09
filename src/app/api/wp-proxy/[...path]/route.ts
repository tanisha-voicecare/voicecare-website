/**
 * API Route: WordPress Admin Reverse Proxy
 * 
 * Proxies wp-admin, wp-login, wp-content, and wp-includes requests
 * directly to the WordPress server IP using TLS SNI.
 * This allows WordPress admin to work when voicecare.ai points to Vercel.
 * 
 * Handles: GET, POST, PUT, DELETE methods
 * Passes through: cookies, headers, query params, request bodies
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import { IncomingMessage } from 'http';

// Force Node.js runtime (not Edge) so we can use the https module
export const runtime = 'nodejs';

// Disable body size limit for file uploads in wp-admin
export const maxDuration = 30;

const WORDPRESS_SERVER_IP = process.env.WORDPRESS_SERVER_IP || '';
const WORDPRESS_HOST = process.env.WORDPRESS_HOSTNAME || 'voicecare.ai';

function proxyToWordPress(
  method: string,
  path: string,
  headers: Record<string, string>,
  body?: Buffer | null
): Promise<{ status: number; headers: Record<string, string | string[]>; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const reqHeaders: Record<string, string> = {
      ...headers,
      'Host': WORDPRESS_HOST,
      'User-Agent': headers['user-agent'] || 'Mozilla/5.0 (compatible; VoiceCareProxy/1.0)',
    };

    // Remove headers that shouldn't be forwarded
    delete reqHeaders['host'];
    delete reqHeaders['connection'];
    delete reqHeaders['transfer-encoding'];

    if (body && body.length > 0) {
      reqHeaders['content-length'] = String(body.length);
    }

    const options: https.RequestOptions = {
      hostname: WORDPRESS_SERVER_IP || WORDPRESS_HOST,
      port: 443,
      path: path,
      method: method,
      headers: reqHeaders,
      servername: WORDPRESS_HOST,
    };

    const req = https.request(options, (res: IncomingMessage) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        const responseHeaders: Record<string, string | string[]> = {};
        for (const [key, value] of Object.entries(res.headers)) {
          if (value !== undefined) {
            responseHeaders[key] = value as string | string[];
          }
        }
        resolve({
          status: res.statusCode || 500,
          headers: responseHeaders,
          body: Buffer.concat(chunks),
        });
      });
    });

    req.on('error', (err) => {
      console.error('[WP Proxy] Request error:', err.message);
      reject(err);
    });

    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('WordPress proxy request timed out'));
    });

    if (body && body.length > 0) {
      req.write(body);
    }
    req.end();
  });
}

async function handleRequest(request: NextRequest, params: { path: string[] }) {
  const wpPath = '/' + params.path.join('/');
  const queryString = request.nextUrl.search || '';
  const fullPath = wpPath + queryString;

  try {
    // Collect request headers
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Read request body for POST/PUT
    let body: Buffer | null = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const arrayBuffer = await request.arrayBuffer();
      body = Buffer.from(arrayBuffer);
    }

    // Proxy to WordPress
    const wpResponse = await proxyToWordPress(
      request.method,
      fullPath,
      headers,
      body
    );

    // Build response headers
    const responseHeaders = new Headers();
    for (const [key, value] of Object.entries(wpResponse.headers)) {
      const lowerKey = key.toLowerCase();
      // Skip hop-by-hop headers
      if (['connection', 'keep-alive', 'transfer-encoding'].includes(lowerKey)) continue;
      
      // Fix Location headers: WordPress might redirect to voicecare.ai paths
      // which is fine since our middleware will catch them again
      if (Array.isArray(value)) {
        value.forEach(v => responseHeaders.append(key, v));
      } else if (value) {
        responseHeaders.set(key, value);
      }
    }

    return new NextResponse(new Uint8Array(wpResponse.body), {
      status: wpResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('[WP Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to reach WordPress server' },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, await params);
}
