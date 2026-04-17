import { NextResponse } from "next/server";

import { wpGet } from "@/lib/wp-fetch";

export async function GET() {
  try {
    const response = await wpGet("/wp-json/voicecare/v1/forms");

    if (!response) {
      return NextResponse.json(
        { success: false, message: "WordPress server unreachable" },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch forms" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Forms Proxy] Error fetching forms:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}
