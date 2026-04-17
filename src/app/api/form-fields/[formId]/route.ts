import { NextRequest, NextResponse } from "next/server";

import { wpGet } from "@/lib/wp-fetch";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;
  void request;

  try {
    const response = await wpGet(`/wp-json/voicecare/v1/form-fields/${formId}`);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "WordPress server unreachable" },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Form not found" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`[Form Fields Proxy] Error fetching form ${formId}:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch form fields" },
      { status: 500 }
    );
  }
}
