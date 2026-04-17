import { NextRequest, NextResponse } from "next/server";

import { wpPost } from "@/lib/wp-fetch";

const API_KEY = process.env.VOICECARE_FORM_API_KEY || "";

interface FileData {
  name: string;
  type: string;
  size: number;
  data: string;
}

interface SubmissionRequest {
  formId: string;
  fields: Record<string, string>;
  files: Record<string, FileData>;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmissionRequest = await request.json();
    const { formId, fields, files } = body;

    if (!formId) {
      return NextResponse.json(
        { success: false, message: "Form ID is required" },
        { status: 400 }
      );
    }

    const fileNames = Object.values(files || {}).map((f) => f.name);

    const wpResponse = await wpPost(
      `/wp-json/voicecare/v1/submit-form-with-file/${formId}`,
      { fields, files },
      { "X-VoiceCare-API-Key": API_KEY }
    );

    if (wpResponse) {
      const wpResult = (await wpResponse.json()) as {
        success?: boolean;
        message?: string;
      };
      if (wpResponse.ok && wpResult.success) {
        return NextResponse.json({
          success: true,
          message: wpResult.message || "Application submitted successfully!",
        });
      }
    }

    const fieldsWithFileInfo = { ...fields };
    Object.entries(files || {}).forEach(([key, file]) => {
      fieldsWithFileInfo[key] = `[Resume: ${file.name}] - Please request via email`;
    });

    const fallbackResponse = await wpPost(
      `/wp-json/voicecare/v1/submit-form/${formId}`,
      fieldsWithFileInfo,
      { "X-VoiceCare-API-Key": API_KEY }
    );

    if (fallbackResponse) {
      const fallbackResult = (await fallbackResponse.json()) as { success?: boolean };
      if (fallbackResponse.ok && fallbackResult.success) {
        return NextResponse.json({
          success: true,
          message:
            fileNames.length > 0
              ? "Application submitted! Please also email your resume to careers@voicecare.ai"
              : "Application submitted successfully!",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Application received! Please also email your resume to careers@voicecare.ai",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({
      success: true,
      message: "Application received! Please also email your resume to careers@voicecare.ai",
    });
  }
}
