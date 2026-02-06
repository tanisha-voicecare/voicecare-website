/**
 * Form utilities for dynamic WordPress/MetForm integration
 * Fetches form structure and handles submissions without hardcoding
 * All WP API calls are proxied through Next.js API routes to avoid CORS
 */

// ============================================
// Types
// ============================================

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'file' | 'date' | 'time' | 'hidden' | 'url' | 'password' | 'range' | 'rating' | 'gdpr' | 'optin';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: string;
  options?: FormFieldOption[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  accept?: string;
  maxSize?: string;
}

export interface FormStructure {
  form_id: number;
  form_title: string;
  fields: FormField[];
}

export interface FormListItem {
  id: number;
  title: string;
  slug: string;
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch all available forms from WordPress
 */
export async function fetchAllForms(): Promise<FormListItem[]> {
  try {
    const response = await fetch(`/api/forms`);
    
    if (!response.ok) {
      console.error('Failed to fetch forms:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.forms : [];
  } catch (error) {
    console.error('Error fetching forms:', error);
    return [];
  }
}

/**
 * Fetch form fields for a specific form ID
 */
export async function fetchFormFields(formId: number | string): Promise<FormStructure | null> {
  try {
    const response = await fetch(`/api/form-fields/${formId}`);
    
    if (!response.ok) {
      console.error('Failed to fetch form fields:', response.status);
      return null;
    }
    
    const data = await response.json();
    return data.success ? data : null;
  } catch (error) {
    console.error('Error fetching form fields:', error);
    return null;
  }
}

/**
 * Submit form data to WordPress (without files)
 */
export async function submitFormToWordPress(
  formId: number | string,
  fields: Record<string, string | string[]>
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formId: String(formId),
        fields,
      }),
    });
    
    const result = await response.json();
    return {
      success: result.success,
      message: result.message || (result.success ? 'Submitted successfully!' : 'Submission failed'),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}

/**
 * Convert file to base64
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Submit form data with file uploads to WordPress
 * Uses base64 encoding for reliable file transfer
 */
export async function submitFormWithFiles(
  formId: number | string,
  fields: Record<string, string>,
  files: Record<string, File | null>
): Promise<{ success: boolean; message: string }> {
  try {
    // Prepare file data as base64
    const fileData: Record<string, { name: string; type: string; size: number; data: string }> = {};
    
    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const base64 = await fileToBase64(file);
        const cleanKey = key.replace('[]', '');
        fileData[cleanKey] = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
        };
      }
    }
    
    // Send as JSON with base64 encoded files
    const response = await fetch('/api/submit-form-with-files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formId: String(formId),
        fields,
        files: fileData,
      }),
    });
    
    const result = await response.json();
    return {
      success: result.success,
      message: result.message || (result.success ? 'Submitted successfully!' : 'Submission failed'),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}

// ============================================
// Form ID Mapping (for backward compatibility)
// ============================================

// These mappings allow existing code to work while we transition to fully dynamic
export const KNOWN_FORM_IDS = {
  'schedule-demo': 1671,
  'partner': 3054,
  'newsletter': 3550,
} as const;

export type KnownFormType = keyof typeof KNOWN_FORM_IDS;

/**
 * Get form ID from form type (for backward compatibility)
 */
export function getFormId(formTypeOrId: string | number): number {
  if (typeof formTypeOrId === 'number') {
    return formTypeOrId;
  }
  
  if (formTypeOrId in KNOWN_FORM_IDS) {
    return KNOWN_FORM_IDS[formTypeOrId as KnownFormType];
  }
  
  // Try parsing as number
  const parsed = parseInt(formTypeOrId, 10);
  return isNaN(parsed) ? 0 : parsed;
}
