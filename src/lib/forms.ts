export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "textarea"
    | "select"
    | "multiselect"
    | "radio"
    | "checkbox"
    | "file"
    | "date"
    | "time"
    | "hidden"
    | "url"
    | "password"
    | "range"
    | "rating"
    | "gdpr"
    | "optin";
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: string;
  options?: FormFieldOption[];
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

export async function fetchAllForms(): Promise<FormListItem[]> {
  try {
    const response = await fetch("/api/forms", { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    return data.success ? data.forms : [];
  } catch (error) {
    console.error("Error fetching forms:", error);
    return [];
  }
}

export async function fetchFormFields(formId: number | string): Promise<FormStructure | null> {
  try {
    const response = await fetch(`/api/form-fields/${formId}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.success ? data : null;
  } catch (error) {
    console.error("Error fetching form fields:", error);
    return null;
  }
}

export async function submitFormToWordPress(
  formId: number | string,
  fields: Record<string, string | string[]>
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: String(formId),
        fields,
      }),
    });

    const result = await response.json();
    return {
      success: result.success,
      message:
        result.message || (result.success ? "Submitted successfully!" : "Submission failed"),
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export const KNOWN_FORM_IDS = {
  "schedule-demo": 1671,
  partner: 3054,
  newsletter: 3550,
} as const;
