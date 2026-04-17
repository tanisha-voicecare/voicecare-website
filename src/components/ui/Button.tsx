/**
 * Button Component
 * Reusable button with multiple variants for healthcare website
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';

// ============================================
// Types
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
  isExternal?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  href: string;
  isExternal?: boolean;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ============================================
// Styles
// ============================================

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-xl
  transition-all duration-200 ease-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-600 text-white
    hover:bg-primary-700 hover:shadow-glow-primary
    focus-visible:ring-primary-500
    active:bg-primary-800
  `,
  secondary: `
    bg-secondary-500 text-white
    hover:bg-secondary-600 hover:shadow-glow-secondary
    focus-visible:ring-secondary-500
    active:bg-secondary-700
  `,
  outline: `
    border-2 border-primary-600 text-primary-600
    hover:bg-primary-50
    focus-visible:ring-primary-500
    active:bg-primary-100
  `,
  ghost: `
    text-neutral-700
    hover:bg-neutral-100
    focus-visible:ring-neutral-400
    active:bg-neutral-200
  `,
  link: `
    text-primary-600 underline-offset-4
    hover:underline hover:text-primary-700
    focus-visible:ring-primary-500
    p-0
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-base gap-2',
  lg: 'h-13 px-8 text-lg gap-2.5',
  xl: 'h-14 px-10 text-lg gap-3',
};

// ============================================
// Component
// ============================================

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      ...rest
    } = props;

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${variant !== 'link' ? sizeStyles[size] : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim();

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const content = (
      <>
        {isLoading ? <LoadingSpinner /> : leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </>
    );

    // Render as Link
    if ('href' in rest && rest.href) {
      const { href, isExternal, ...linkRest } = rest;

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={combinedClassName}
            target="_blank"
            rel="noopener noreferrer"
            {...linkRest}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    // Render as Button
    const { ...buttonRest } = rest as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        disabled={isLoading || buttonRest.disabled}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
