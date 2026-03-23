'use client';

/**
 * DynamicForm Component
 * Renders forms dynamically based on WordPress/MetForm structure
 * 
 * Features:
 * - Fetches form fields from WordPress automatically
 * - No hardcoding - admin changes in WordPress reflect here
 * - Maintains existing UI styling
 * - Supports all MetForm field types
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FormField, FormStructure, fetchFormFields, submitFormToWordPress } from '@/lib/forms';

// ============================================
// Types
// ============================================

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface DynamicFormProps {
  formId: number | string;
  /** Optional: Override form title */
  title?: string;
  /** Optional: Custom success message */
  successMessage?: string;
  /** Optional: Callback on successful submission */
  onSuccess?: () => void;
  /** Optional: Additional CSS classes for the form */
  className?: string;
  /** Optional: Layout style */
  layout?: 'default' | 'compact' | 'newsletter';
  /** Optional: Show labels */
  showLabels?: boolean;
  /** Optional: Pre-fill values */
  initialValues?: Record<string, string>;
  /** Optional: Override labels for fields (key: field name, value: display label) */
  labelOverrides?: Record<string, string>;
  /** Optional: Override placeholders for fields */
  placeholderOverrides?: Record<string, string>;
  /** Optional: Override required status for fields (key: field name, value: true/false) */
  requiredOverrides?: Record<string, boolean>;
  /** Optional: Text for the submit button */
  submitButtonText?: string;
  /** Optional: URL to redirect to after successful submission */
  redirectUrl?: string;
  /** Optional: HubSpot Meeting URL to embed on success */
  successEmbedUrl?: string;
}

// ============================================
// Styles (matching existing design tokens)
// ============================================

const inputBaseStyles = "w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#06003F]/10 rounded-[6px] focus:outline-none focus:border-[#FF4E3A] transition-colors text-base md:text-[inherit]";
const labelStyles = "block text-[13px] sm:text-[14px] font-medium";
const buttonStyles = "w-full bg-[#FF4E3A] text-white px-6 sm:px-8 py-3 md:py-2.5 rounded-[6px] font-medium hover:brightness-110 transition-all text-[15px] sm:text-base disabled:opacity-70 disabled:cursor-not-allowed";

// ============================================
// Field Renderer
// ============================================

interface FieldRendererProps {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  showLabel?: boolean;
  error?: string;
}

function FieldRenderer({ field, value, onChange, onBlur, showLabel = true, error }: FieldRendererProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field.name, e.target.value);
  };

  const handleBlur = () => {
    onBlur(field.name);
  };

  const getBorderColor = () => {
    if (error) return "border-red-500 focus:border-red-500";
    return "border-[#06003F]/10 focus:border-[#FF4E3A]";
  };

  const inputClasses = `w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border rounded-[6px] focus:outline-none transition-colors text-base md:text-[inherit] ${getBorderColor()}`;

  const renderLabel = () => {
    if (!showLabel) return null;
    return (
      <label htmlFor={field.name} className={labelStyles}>
        {field.label} {field.required && <span className="text-[#FF4E3A]">*</span>}
      </label>
    );
  };

  // Select field
  if (field.type === 'select' || field.type === 'multiselect') {
    return (
      <div className="space-y-1.5 sm:space-y-2">
        {renderLabel()}
        <div className="relative">
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
          >
            <option value="" disabled className="text-gray-400">
              {field.placeholder || `Select ${field.label.toLowerCase()}`}
            </option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-[#06003F]/40"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Textarea field
  if (field.type === 'textarea') {
    return (
      <div className="space-y-1.5 sm:space-y-2">
        {renderLabel()}
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={field.rows || 5}
          placeholder={field.placeholder}
          className={`${inputClasses} resize-none`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  // Radio buttons
  if (field.type === 'radio') {
    return (
      <div className="space-y-1.5 sm:space-y-2">
        {renderLabel()}
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                required={field.required}
                className="w-4 h-4 text-[#FF4E3A] focus:ring-[#FF4E3A]"
              />
              <span className="text-[14px]">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  // Checkbox (single or group)
  if (field.type === 'checkbox') {
    if (field.options && field.options.length > 0) {
      // Multiple checkboxes
      return (
        <div className="space-y-1.5 sm:space-y-2">
          {renderLabel()}
          <div className="space-y-2">
            {field.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value ? value.split(',') : [];
                    if (e.target.checked) {
                      onChange(field.name, [...currentValues, option.value].join(','));
                    } else {
                      onChange(field.name, currentValues.filter(v => v !== option.value).join(','));
                    }
                  }}
                  className="w-4 h-4 text-[#FF4E3A] focus:ring-[#FF4E3A] rounded"
                />
                <span className="text-[14px]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    // Single checkbox (consent, GDPR, etc.)
    return (
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={field.name}
          checked={value === 'yes' || value === 'true' || value === '1'}
          onChange={(e) => onChange(field.name, e.target.checked ? 'yes' : '')}
          required={field.required}
          className="w-4 h-4 mt-0.5 text-[#FF4E3A] focus:ring-[#FF4E3A] rounded"
        />
        <span className="text-[14px]">
          {field.label} {field.required && <span className="text-[#FF4E3A]">*</span>}
        </span>
      </label>
    );
  }

  // GDPR consent
  if (field.type === 'gdpr' || field.type === 'optin') {
    return (
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={field.name}
          checked={value === 'yes' || value === 'true' || value === '1'}
          onChange={(e) => onChange(field.name, e.target.checked ? 'yes' : '')}
          required={field.required}
          className="w-4 h-4 mt-0.5 text-[#FF4E3A] focus:ring-[#FF4E3A] rounded"
        />
        <span className="text-[14px] text-[#06003F]/70">
          {field.label} {field.required && <span className="text-[#FF4E3A]">*</span>}
        </span>
      </label>
    );
  }

  // File upload
  if (field.type === 'file') {
    return (
      <div className="space-y-1.5 sm:space-y-2">
        {renderLabel()}
        <input
          type="file"
          id={field.name}
          name={field.name}
          required={field.required}
          accept={field.accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // For now, just store the filename - file uploads need separate handling
              onChange(field.name, file.name);
              onBlur(field.name);
            }
          }}
          className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF4E3A]/10 file:text-[#FF4E3A] hover:file:bg-[#FF4E3A]/20`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  // Hidden field
  if (field.type === 'hidden') {
    return (
      <input
        type="hidden"
        name={field.name}
        value={value}
      />
    );
  }

  // Default: text, email, tel, number, url, password, date, time
  const inputType = field.type === 'tel' ? 'tel' : field.type;
  
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {renderLabel()}
      <input
        type={inputType}
        id={field.name}
        name={field.name}
        required={field.required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step}
        className={inputClasses}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ============================================
// Success Message Component
// ============================================

interface SuccessMessageProps {
  message: string;
  onReset: () => void;
  embedUrl?: string;
  formData?: Record<string, string>;
}

function SuccessMessage({ message, onReset, embedUrl, formData }: SuccessMessageProps) {
  // Construct pre-filled HubSpot URL if embedUrl is present
  const getPrefilledUrl = () => {
    if (!embedUrl) return '';
    
    // Base URL with embed=true parameter (ensuring no double ?)
    let finalUrl = embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'embed=true';
    
    if (formData) {
      // HubSpot accepts various parameter formats depending on account settings
      const name = formData['name'] || formData['firstname'] || formData['First Name'] || '';
      const email = formData['mf-email'] || formData['email'] || formData['Email Address'] || '';
      const company = formData['company___'] || formData['company'] || formData['Company Name'] || '';
      
      const emailEncoded = encodeURIComponent(email);
      if (email) {
        finalUrl += `&email=${emailEncoded}`;
      }
      
      if (company) {
        finalUrl += `&company=${encodeURIComponent(company)}`;
      }
      
      if (name) {
        const nameParts = name.trim().split(/\s+/);
        if (nameParts.length > 0) {
          const first = encodeURIComponent(nameParts[0]);
          finalUrl += `&firstname=${first}&first_name=${first}&firstName=${first}`;
          
          if (nameParts.length > 1) {
            const last = encodeURIComponent(nameParts.slice(1).join(' '));
            finalUrl += `&lastname=${last}&last_name=${last}&lastName=${last}`;
          }
        }
      }
    }
    
    return finalUrl;
  };

  const prefilledUrl = getPrefilledUrl();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`mx-auto text-center ${embedUrl ? 'max-w-3xl' : 'max-w-md py-12'}`}
    >
      <div className={embedUrl ? 'w-full' : 'bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-[#06003F]/10'}>
        {/* Only show "Thank you" and checkmark if NOT embedding */}
        {!embedUrl && (
          <div className="mb-6">
            {/* Checkmark Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-[#06003F] mb-3">
              Thank you!
            </h3>
            <p className="text-[#06003F]/70 mb-6">
              {message}
            </p>
          </div>
        )}

        {/* HubSpot Embed */}
        {embedUrl && (
          <div className="w-full bg-white min-h-[900px] overflow-visible">
            <iframe
              src={prefilledUrl}
              width="100%"
              height="1000"
              frameBorder="0"
              title="Schedule a Demo"
              className="w-full"
              style={{ minHeight: '1000px' }}
            ></iframe>
          </div>
        )}
        
        {/* Submit Another Button - Only show if NOT embedding */}
        {!embedUrl && (
          <button
            onClick={onReset}
            className="text-[#FF4E3A] font-medium hover:underline transition-all"
          >
            Submit another response
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// Main DynamicForm Component
// ============================================

export function DynamicForm({
  formId,
  title,
  successMessage = 'Our team will reach out to you within the next 24 hours.',
  onSuccess,
  className = '',
  layout = 'default',
  showLabels = true,
  initialValues = {},
  labelOverrides = {},
  placeholderOverrides = {},
  requiredOverrides = {},
  submitButtonText = 'Submit',
  redirectUrl,
  successEmbedUrl,
}: DynamicFormProps) {
  const [formStructure, setFormStructure] = useState<FormStructure | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>(initialValues);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper: Remove serial numbers from option labels (e.g., "1. Option" → "Option")
  const cleanOptionLabel = (label: string): string => {
    return label.replace(/^\d+\.\s*/, '');
  };

  // Helper: Remove asterisks and extra spaces from placeholder
  const cleanPlaceholder = (placeholder: string | undefined): string | undefined => {
    if (!placeholder) return placeholder;
    return placeholder.replace(/\s*\*\s*$/, '').trim();
  };

  // Apply label, placeholder, and required overrides to a field
  // Checks: exact name match, label match, partial name match (for MetForm dynamic names)
  const applyOverrides = (field: FormField): FormField => {
    // Try exact name match first
    let overriddenLabel = labelOverrides[field.name];
    let overriddenPlaceholder = placeholderOverrides[field.name];
    let overriddenRequired: boolean | undefined = requiredOverrides[field.name];
    
    // If no exact match, try matching by current label
    if (!overriddenLabel && field.label && labelOverrides[field.label]) {
      overriddenLabel = labelOverrides[field.label];
    }
    if (!overriddenPlaceholder && field.label && placeholderOverrides[field.label]) {
      overriddenPlaceholder = placeholderOverrides[field.label];
    }
    if (overriddenRequired === undefined && field.label && requiredOverrides[field.label] !== undefined) {
      overriddenRequired = requiredOverrides[field.label];
    }
    
    // If still no match, try partial name match (for MetForm names like "mf-text-abc123")
    if (!overriddenLabel) {
      for (const [key, value] of Object.entries(labelOverrides)) {
        if (field.name.startsWith(key) || field.name.includes(key)) {
          overriddenLabel = value;
          break;
        }
      }
    }
    if (!overriddenPlaceholder) {
      for (const [key, value] of Object.entries(placeholderOverrides)) {
        if (field.name.startsWith(key) || field.name.includes(key)) {
          overriddenPlaceholder = value;
          break;
        }
      }
    }
    if (overriddenRequired === undefined) {
      for (const [key, value] of Object.entries(requiredOverrides)) {
        if (field.name.startsWith(key) || field.name.includes(key)) {
          overriddenRequired = value;
          break;
        }
      }
    }
    
    // Clean up the placeholder (remove asterisks - they should be in label only)
    const finalPlaceholder = cleanPlaceholder(overriddenPlaceholder || field.placeholder);
    
    // Clean up select options (remove serial numbers like "1. ", "2. ", etc.)
    let cleanedOptions = field.options;
    if (field.options && field.options.length > 0) {
      cleanedOptions = field.options.map(opt => ({
        ...opt,
        label: cleanOptionLabel(opt.label),
      }));
    }
    
    return {
      ...field,
      label: overriddenLabel || field.label,
      placeholder: finalPlaceholder,
      options: cleanedOptions,
      required: overriddenRequired !== undefined ? overriddenRequired : field.required,
    };
  };

  // Fetch form structure on mount (only when formId changes)
  useEffect(() => {
    let isMounted = true;
    
    async function loadFormStructure() {
      setIsLoading(true);
      setError(null);
      
      const structure = await fetchFormFields(formId);
      
      if (!isMounted) return;
      
      if (structure) {
        setFormStructure(structure);
        // Initialize form data with empty values
        const initialData: Record<string, string> = {};
        structure.fields.forEach((field) => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      } else {
        setError('Failed to load form. Please refresh the page.');
      }
      
      setIsLoading(false);
    }
    
    loadFormStructure();
    
    return () => {
      isMounted = false;
    };
  }, [formId]); // Only depend on formId, not initialValues

  const validateField = (name: string, value: string, field: FormField): string => {
    if (field.required && !value) {
      return 'This field is required';
    }

    if (value) {
      if (field.type === 'email' || name.includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
      }

      if (field.type === 'tel' || name.toLowerCase().includes('telephone') || name.toLowerCase().includes('phone')) {
        // Only allow digits, spaces, hyphens, and parentheses
        const validCharsRegex = /^[\d\s\+\-\(\)]*$/;
        if (!validCharsRegex.test(value)) {
          return 'Only numbers and +, -, (), spaces are allowed';
        }
        
        const digits = value.replace(/\D/g, '');
        if (digits.length < 7) {
          return 'Phone number is too short (min 7 digits)';
        }
        if (digits.length > 15) {
          return 'Phone number is too long (max 15 digits)';
        }
      }
    }

    return '';
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (name: string) => {
    if (formStructure) {
      const field = formStructure.fields.find(f => f.name === name);
      if (field) {
        const fieldError = validateField(name, formData[name] || '', applyOverrides(field));
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    if (formStructure) {
      formStructure.fields.forEach(field => {
        const fieldError = validateField(field.name, formData[field.name] || '', applyOverrides(field));
        if (fieldError) {
          newErrors[field.name] = fieldError;
          hasErrors = true;
        }
      });
    }
    
    setErrors(newErrors);
    
    if (hasErrors) {
      return;
    }

    setSubmitStatus('loading');
    setStatusMessage('');

    const result = await submitFormToWordPress(formId, formData);

    if (result.success) {
      setSubmitStatus('success');
      setStatusMessage(successMessage);
      
      // Call onSuccess callback if provided
      onSuccess?.();

      // Redirect if redirectUrl is provided
      if (redirectUrl) {
        // We use window.open for meeting links to keep the website open, 
        // or window.location.href to redirect. 
        // Given the requirement "as soon as a user clicks", 
        // we'll open it in a new tab so they don't lose the success state on the site.
        window.open(redirectUrl, '_blank');
      }
    } else {
      setSubmitStatus('error');
      setStatusMessage(result.message);
    }
  };

  const handleReset = () => {
    setSubmitStatus('idle');
    setStatusMessage('');
    // Reset form data to empty values
    if (formStructure) {
      const resetData: Record<string, string> = {};
      formStructure.fields.forEach((field) => {
        resetData[field.name] = '';
      });
      setFormData(resetData);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4E3A]"></div>
      </div>
    );
  }

  // Error state
  if (error || !formStructure) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-red-600">{error || 'Form not available'}</p>
      </div>
    );
  }

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className={className}>
        <SuccessMessage 
          message={statusMessage} 
          onReset={handleReset} 
          embedUrl={successEmbedUrl}
          formData={formData}
        />
      </div>
    );
  }

  // Determine grid layout based on field count
  const useGrid = layout === 'default' && formStructure.fields.length >= 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`max-w-4xl mx-auto ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-semibold text-[#06003F] mb-6 text-center">
          {title}
        </h2>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {useGrid ? (
          // Grid layout for forms with many fields
          <>
            {/* Render fields in pairs */}
            {formStructure.fields.reduce<JSX.Element[]>((rows, field, index, arr) => {
              const overriddenField = applyOverrides(field);
              // Skip textarea and file fields from grid - they go full width
              if (field.type === 'textarea' || field.type === 'file' || field.type === 'checkbox' || field.type === 'gdpr' || field.type === 'optin') {
                rows.push(
                  <div key={field.name}>
                    <FieldRenderer
                      field={overriddenField}
                      value={formData[field.name] || ''}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      showLabel={showLabels}
                      error={errors[field.name]}
                    />
                  </div>
                );
              } else if (index % 2 === 0) {
                // Start of a new row
                const nextField = arr[index + 1];
                const nextIsWide = nextField && (nextField.type === 'textarea' || nextField.type === 'file' || nextField.type === 'checkbox');
                
                if (nextField && !nextIsWide) {
                  const overriddenNextField = applyOverrides(nextField);
                  // Pair with next field
                  rows.push(
                    <div key={`row-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <FieldRenderer
                        field={overriddenField}
                        value={formData[field.name] || ''}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
                        showLabel={showLabels}
                        error={errors[field.name]}
                      />
                      <FieldRenderer
                        field={overriddenNextField}
                        value={formData[nextField.name] || ''}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
                        showLabel={showLabels}
                        error={errors[nextField.name]}
                      />
                    </div>
                  );
                } else {
                  // Single field row
                  rows.push(
                    <div key={field.name} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <FieldRenderer
                        field={overriddenField}
                        value={formData[field.name] || ''}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
                        showLabel={showLabels}
                        error={errors[field.name]}
                      />
                    </div>
                  );
                }
              }
              return rows;
            }, [])}
          </>
        ) : (
          // Simple stacked layout
          formStructure.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={applyOverrides(field)}
              value={formData[field.name] || ''}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              showLabel={showLabels}
              error={errors[field.name]}
            />
          ))
        )}

        {/* Error Message */}
        {submitStatus === 'error' && statusMessage && (
          <div className="p-4 rounded-[6px] text-sm bg-red-50 text-red-800 border border-red-200">
            {statusMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 sm:pt-3 md:pt-4">
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className={buttonStyles}
          >
            {submitStatus === 'loading' ? 'Submitting...' : submitButtonText}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default DynamicForm;
