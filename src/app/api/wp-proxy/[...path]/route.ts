import https from "https";
import { IncomingMessage } from "http";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const WORDPRESS_SERVER_IP = process.env.WORDPRESS_SERVER_IP || "";
const WORDPRESS_HOST = process.env.WORDPRESS_HOSTNAME || "voicecare.ai";

function proxyToWordPress(
  method: string,
  path: string,
  headers: Record<string, string>,
  body?: Buffer | null
): Promise<{ status: number; headers: Record<string, string | string[]>; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const reqHeaders: Record<string, string> = {
      ...headers,
      Host: WORDPRESS_HOST,
      "User-Agent": headers["user-agent"] || "Mozilla/5.0 (compatible; VoiceCareProxy/1.0)",
    };

    delete reqHeaders.host;
    delete reqHeaders.connection;
    delete reqHeaders["transfer-encoding"];
    if (body && body.length > 0) reqHeaders["content-length"] = String(body.length);

    const options: https.RequestOptions = {
      hostname: WORDPRESS_SERVER_IP || WORDPRESS_HOST,
      port: 443,
      path,
      method,
      headers: reqHeaders,
      servername: WORDPRESS_HOST,
    };

    const req = https.request(options, (res: IncomingMessage) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const responseHeaders: Record<string, string | string[]> = {};
        for (const [key, value] of Object.entries(res.headers)) {
          if (value !== undefined) responseHeaders[key] = value as string | string[];
        }
        resolve({
          status: res.statusCode || 500,
          headers: responseHeaders,
          body: Buffer.concat(chunks),
        });
      });
    });

    req.on("error", (err) => reject(err));
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error("WordPress proxy request timed out"));
    });

    if (body && body.length > 0) req.write(body);
    req.end();
  });
}

async function handleRequest(request: NextRequest, params: { path: string[] }) {
  const wpPath = `/${params.path.join("/")}`;
  let queryString = request.nextUrl.search || "";

  if (wpPath === "/wp-login.php" && request.method === "GET") {
    const action = request.nextUrl.searchParams.get("action");
    if (action === "ionos_oauth_register") {
      queryString = "?redirect_to=%2Fwp-admin%2Findex.php";
    }
  }

  const fullPath = wpPath + queryString;

  try {
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    let body: Buffer | null = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      const arrayBuffer = await request.arrayBuffer();
      body = Buffer.from(arrayBuffer);
    }

    const wpResponse = await proxyToWordPress(request.method, fullPath, headers, body);

    const responseHeaders = new Headers();
    for (const [key, value] of Object.entries(wpResponse.headers)) {
      const lowerKey = key.toLowerCase();
      if (["connection", "keep-alive", "transfer-encoding"].includes(lowerKey)) continue;

      if (lowerKey === "location") {
        let locationValue = (Array.isArray(value) ? value[0] : value) ?? "";
        if (wpPath === "/wp-login.php" && request.method === "POST") {
          locationValue = "https://voicecare.ai/wp-admin/index.php";
        }
        if (locationValue.includes("/backend") || locationValue.includes("confirm_admin_email")) {
          locationValue = "https://voicecare.ai/wp-admin/index.php";
        }
        responseHeaders.set(key, locationValue);
        continue;
      }

      if (Array.isArray(value)) value.forEach((v) => responseHeaders.append(key, v));
      else if (value) responseHeaders.set(key, value);
    }

    return new NextResponse(new Uint8Array(wpResponse.body), {
      status: wpResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[WP Proxy] Error:", error);
    return NextResponse.json({ error: "Failed to reach WordPress server" }, { status: 502 });
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
