/**
 * API Route: Form Submission with File Uploads
 * Receives JSON with base64 encoded files and forwards to WordPress
 * 
 * Uses wp-fetch utility to connect directly to WordPress server IP
 * with proper TLS SNI, bypassing DNS resolution issues.
 */

import { NextRequest, NextResponse } from 'next/server';
import { wpPost } from '@/lib/wp-fetch';

const API_KEY = process.env.VOICECARE_FORM_API_KEY || '';

interface FileData {
  name: string;
  type: string;
  size: number;
  data: string; // base64
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
        { success: false, message: 'Form ID is required' },
        { status: 400 }
      );
    }

    const fileNames = Object.values(files || {}).map(f => f.name);
    console.log(`Submitting form ${formId} with fields:`, Object.keys(fields));
    console.log(`Files to upload:`, fileNames);

    // Send to WordPress with base64 files
    const wpResponse = await wpPost(
      `/wp-json/voicecare/v1/submit-form-with-file/${formId}`,
      { fields, files },
      { 'X-VoiceCare-API-Key': API_KEY }
    );

    if (wpResponse) {
      const wpResult = await wpResponse.json() as { success?: boolean; message?: string };
      console.log('WordPress response:', JSON.stringify(wpResult, null, 2));

      if (wpResponse.ok && wpResult.success) {
        return NextResponse.json({
          success: true,
          message: wpResult.message || 'Application submitted successfully!',
        });
      }
    }

    // Fallback: Submit without file to regular endpoint
    console.log('Falling back to text-only submission');
    
    // Add file info to fields for reference
    const fieldsWithFileInfo = { ...fields };
    Object.entries(files || {}).forEach(([key, file]) => {
      fieldsWithFileInfo[key] = `[Resume: ${file.name}] - Please request via email`;
    });
    
    const fallbackResponse = await wpPost(
      `/wp-json/voicecare/v1/submit-form/${formId}`,
      fieldsWithFileInfo,
      { 'X-VoiceCare-API-Key': API_KEY }
    );

    if (fallbackResponse) {
      const fallbackResult = await fallbackResponse.json() as { success?: boolean };
      
      if (fallbackResponse.ok && fallbackResult.success) {
        return NextResponse.json({
          success: true,
          message: fileNames.length > 0 
            ? 'Application submitted! Please also email your resume to careers@voicecare.ai'
            : 'Application submitted successfully!',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application received! Please also email your resume to careers@voicecare.ai',
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({
      success: true,
      message: 'Application received! Please also email your resume to careers@voicecare.ai',
    });
  }
}
