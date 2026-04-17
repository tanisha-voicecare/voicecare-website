'use client';

/**
 * JobApplicationForm Component
 * Dynamic job application form that fetches fields from WordPress MetForm
 * 
 * Features:
 * - Automatically fetches form structure based on job title or form ID
 * - Supports file uploads (resume/CV)
 * - Maintains existing UI styling
 * - Zero developer dependency for form field changes
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, X, Loader2 } from 'lucide-react';
import { FormField, FormStructure, fetchFormFields, submitFormWithFiles, fetchAllForms } from '@/lib/forms';

// ============================================
// Types
// ============================================

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface JobApplicationFormProps {
  /** Form ID from WordPress MetForm */
  formId?: number | string;
  /** Job title to match with WordPress form */
  jobTitle?: string;
  /** Optional callback on successful submission */
  onSuccess?: () => void;
}

// ============================================
// Form Field Renderer (Job Application Style)
// ============================================

interface FieldRendererProps {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
  onFileChange?: (name: string, file: File | null) => void;
  file?: File | null;
}

function JobFieldRenderer({ field, value, onChange, onFileChange, file }: FieldRendererProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field.name, e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange?.(field.name, e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    onFileChange?.(field.name, null);
  };

  const inputStyles = "w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border border-[#06003F]/20 rounded-[6px] text-[13px] sm:text-[14px] text-[#06003F] focus:outline-none focus:border-[#FF4E3A] transition-colors";
  const labelStyles = "block text-[13px] sm:text-[14px] font-semibold text-[#06003F] mb-2";

  // File upload
  if (field.type === 'file') {
    return (
      <div>
        <label htmlFor={field.name} className={labelStyles}>
          {field.label} {field.required && '*'}
        </label>
        {!file ? (
          <label
            htmlFor={field.name}
            className="w-full border-2 border-dashed border-[#06003F]/20 rounded-[6px] p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF4E3A]/50 transition-colors"
          >
            <Upload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#06003F]/40 mb-2" />
            <span className="text-[13px] sm:text-[14px] text-[#06003F]/60 text-center">
              {field.placeholder || 'Click to upload'}
            </span>
            <span className="text-[11px] sm:text-[12px] text-[#06003F]/40 mt-1 text-center">
              {field.accept || 'PDF, DOC, DOCX'} (Max {field.maxSize || '10MB'})
            </span>
            <input
              type="file"
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleFileUpload}
              accept={field.accept || '.pdf,.doc,.docx'}
              className="hidden"
            />
          </label>
        ) : (
          <div className="border border-[#06003F]/20 rounded-[6px] p-3 sm:p-4 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF4E3A]/10 rounded-[6px] flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4E3A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] sm:text-[14px] font-medium text-[#06003F] truncate">
                  {file.name}
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#06003F]/60">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-[#06003F]/40 hover:text-[#FF4E3A] transition-colors shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Radio buttons
  if (field.type === 'radio') {
    return (
      <div>
        <label className={`${labelStyles} leading-relaxed`}>
          {field.label} {field.required && '*'}
        </label>
        <div className="space-y-2 sm:space-y-3">
          {field.options?.map((option) => (
            <label key={option.value} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <input
                type="radio"
                name={field.name}
                value={option.value}
                required={field.required}
                checked={value === option.value}
                onChange={handleChange}
                className="w-4 h-4 text-[#FF4E3A] border-[#06003F]/20 focus:ring-[#FF4E3A]"
              />
              <span className="text-[13px] sm:text-[14px] text-[#06003F]">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  // Checkbox (single or multiple)
  if (field.type === 'checkbox') {
    if (field.options && field.options.length > 0) {
      return (
        <div>
          <label className={labelStyles}>
            {field.label} {field.required && '*'}
          </label>
          <div className="space-y-2 sm:space-y-3">
            {field.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value ? value.split(',').filter(Boolean) : [];
                    if (e.target.checked) {
                      onChange(field.name, [...currentValues, option.value].join(','));
                    } else {
                      onChange(field.name, currentValues.filter(v => v !== option.value).join(','));
                    }
                  }}
                  className="w-4 h-4 text-[#FF4E3A] border-[#06003F]/20 focus:ring-[#FF4E3A] rounded"
                />
                <span className="text-[13px] sm:text-[14px] text-[#06003F]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    // Single checkbox
    return (
      <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={field.name}
          checked={value === 'yes' || value === 'true' || value === '1'}
          onChange={(e) => onChange(field.name, e.target.checked ? 'yes' : '')}
          required={field.required}
          className="w-4 h-4 mt-0.5 text-[#FF4E3A] border-[#06003F]/20 focus:ring-[#FF4E3A] rounded"
        />
        <span className="text-[13px] sm:text-[14px] text-[#06003F]">
          {field.label} {field.required && '*'}
        </span>
      </label>
    );
  }

  // Select dropdown
  if (field.type === 'select' || field.type === 'multiselect') {
    return (
      <div>
        <label htmlFor={field.name} className={labelStyles}>
          {field.label} {field.required && '*'}
        </label>
        <select
          id={field.name}
          name={field.name}
          required={field.required}
          value={value}
          onChange={handleChange}
          className={`${inputStyles} appearance-none`}
        >
          <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Textarea
  if (field.type === 'textarea') {
    return (
      <div>
        <label htmlFor={field.name} className={labelStyles}>
          {field.label} {field.required && '*'}
        </label>
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          value={value}
          onChange={handleChange}
          rows={field.rows || 4}
          placeholder={field.placeholder}
          className={`${inputStyles} resize-none`}
        />
      </div>
    );
  }

  // Default: text, email, tel, number, etc.
  return (
    <div>
      <label htmlFor={field.name} className={labelStyles}>
        {field.label} {field.required && '*'}
      </label>
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        required={field.required}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={inputStyles}
      />
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export function JobApplicationForm({ formId, jobTitle, onSuccess }: JobApplicationFormProps) {
  const [formStructure, setFormStructure] = useState<FormStructure | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedFormId, setResolvedFormId] = useState<number | null>(null);

  // Fetch form structure
  useEffect(() => {
    async function loadForm() {
      setIsLoading(true);
      setError(null);

      let targetFormId = formId ? Number(formId) : null;

      // If no form ID but have job title, try to find matching form
      if (!targetFormId && jobTitle) {
        try {
          const allForms = await fetchAllForms();
          
          // Normalize text for comparison - creates a slug-like string
          // Handles: "Senior Back-end Engineer" vs "Senior Backend Engineer"
          const normalize = (text: string) => 
            text.toLowerCase()
              .replace(/[-\s]+/g, '')  // Remove ALL hyphens and spaces
              .trim();
          
          const normalizedJobTitle = normalize(jobTitle);
          
          // Try to match by normalized title
          const matchedForm = allForms.find((form) => {
            const normalizedFormTitle = normalize(form.title);
            return normalizedFormTitle === normalizedJobTitle ||
                   normalizedFormTitle.includes(normalizedJobTitle) || 
                   normalizedJobTitle.includes(normalizedFormTitle);
          });
          
          if (matchedForm) {
            targetFormId = matchedForm.id;
            console.log(`Matched job "${jobTitle}" to form "${matchedForm.title}" (ID: ${matchedForm.id})`);
          } else {
            console.log(`No form match found for job "${jobTitle}". Available forms:`, allForms.map(f => f.title));
          }
        } catch (err) {
          console.error('Error fetching forms list:', err);
        }
      }

      if (!targetFormId) {
        setError('No form found for this job position.');
        setIsLoading(false);
        return;
      }

      setResolvedFormId(targetFormId);

      const structure = await fetchFormFields(targetFormId);
      if (structure && structure.fields.length > 0) {
        setFormStructure(structure);
        // Initialize form data
        const initialData: Record<string, string> = {};
        structure.fields.forEach((field) => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      } else {
        setError('Could not load form fields.');
      }

      setIsLoading(false);
    }

    loadForm();
  }, [formId, jobTitle]);

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
    // Also store filename in formData for submission
    setFormData((prev) => ({ ...prev, [name]: file ? file.name : '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resolvedFormId) {
      setSubmitStatus('error');
      setStatusMessage('Form not properly configured.');
      return;
    }

    setSubmitStatus('loading');
    setStatusMessage('');

    // Check if we have any files to upload
    const hasFiles = Object.values(files).some(file => file !== null);
    
    let result;
    if (hasFiles) {
      // Use file upload endpoint
      result = await submitFormWithFiles(resolvedFormId, formData, files);
    } else {
      // Use regular JSON endpoint
      const { submitFormToWordPress } = await import('@/lib/forms');
      result = await submitFormToWordPress(resolvedFormId, formData);
    }

    if (result.success) {
      setSubmitStatus('success');
      setStatusMessage(result.message || 'Your application has been submitted successfully!');
      onSuccess?.();
    } else {
      setSubmitStatus('error');
      setStatusMessage(result.message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF4E3A]" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8">
        <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-4">
          Apply for this position
        </h3>
        <p className="text-[14px] text-red-600">{error}</p>
        <p className="text-[13px] text-[#06003F]/60 mt-2">
          Please contact us directly at careers@voicecare.ai
        </p>
      </div>
    );
  }

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="w-full bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#06003F] mb-2">
            Application Submitted!
          </h3>
          <p className="text-[14px] text-[#06003F]/70">
            {statusMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#06003F]/10 rounded-[12px] p-5 sm:p-6 md:p-7 lg:p-8">
      <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-4 sm:mb-5 md:mb-6">
        Apply for this position
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {formStructure?.fields.map((field) => (
          <JobFieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name] || ''}
            onChange={handleFieldChange}
            onFileChange={handleFileChange}
            file={files[field.name]}
          />
        ))}

        {/* Error Message */}
        {submitStatus === 'error' && statusMessage && (
          <div className="p-3 rounded-[6px] text-[13px] bg-red-50 text-red-800 border border-red-200">
            {statusMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="w-full bg-[#FF4E3A] text-white px-6 sm:px-8 py-3 lg:py-3.5 rounded-[6px] text-sm font-semibold hover:bg-[#FF4E3A]/90 transition-all shadow-lg shadow-[#FF4E3A]/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
