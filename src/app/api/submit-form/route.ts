import { NextRequest, NextResponse } from "next/server";

import { wpPost } from "@/lib/wp-fetch";

const API_KEY = process.env.VOICECARE_FORM_API_KEY || "";

const FORM_TYPE_TO_ID: Record<string, string> = {
  "schedule-demo": process.env.NEXT_PUBLIC_WP_DEMO_FORM_ID || "1671",
  partner: process.env.NEXT_PUBLIC_WP_PARTNER_FORM_ID || "3054",
  newsletter: process.env.NEXT_PUBLIC_WP_NEWSLETTER_FORM_ID || "3550",
};

interface FormSubmissionRequest {
  formType?: string;
  formId?: string;
  fields: Record<string, string | string[]>;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmissionRequest = await request.json();
    const { formType, formId: directFormId, fields } = body;

    let formId: string | undefined;
    if (directFormId) formId = String(directFormId);
    else if (formType && formType in FORM_TYPE_TO_ID) formId = FORM_TYPE_TO_ID[formType];
    else if (formType && /^\d+$/.test(formType)) formId = formType;

    if (!formId) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission! We will get back to you soon.",
      });
    }

    const path = `/wp-json/voicecare/v1/submit-form/${formId}`;
    const wpResponse = await wpPost(path, fields, {
      "X-VoiceCare-API-Key": API_KEY,
    });

    if (!wpResponse) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission! We will get back to you soon.",
      });
    }

    const wpResult = await wpResponse.json();
    if (wpResponse.ok && (wpResult as { success?: boolean }).success) {
      return NextResponse.json({
        success: true,
        message:
          (wpResult as { message?: string }).message ||
          "Thank you for your submission! We will contact you shortly.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your submission! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you for your submission! We will get back to you soon.",
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
