/**
 * Container Component
 * Consistent width constraints and padding for page content
 */

import { type ReactNode } from 'react';

// ============================================
// Types
// ============================================

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

// ============================================
// Styles
// ============================================

const sizeStyles = {
  sm: 'max-w-3xl',      // 768px
  md: 'max-w-5xl',      // 1024px
  lg: 'max-w-6xl',      // 1152px
  xl: 'max-w-7xl',      // 1280px
  full: 'max-w-full',
};

// ============================================
// Component
// ============================================

export function Container({
  children,
  className = '',
  size = 'xl',
  padding = true,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`
        mx-auto w-full
        ${sizeStyles[size]}
        ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// ============================================
// Section Wrapper
// ============================================

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'primary' | 'gradient';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundStyles = {
  white: 'bg-white',
  light: 'bg-neutral-50',
  dark: 'bg-neutral-900 text-white',
  primary: 'bg-primary-600 text-white',
  gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
};

const spacingStyles = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
  xl: 'py-24 md:py-32',
};

export function Section({
  children,
  className = '',
  id,
  background = 'white',
  spacing = 'lg',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        ${backgroundStyles[background]}
        ${spacingStyles[spacing]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}

// ============================================
// Grid Component
// ============================================

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const gridColStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const gridGapStyles = {
  sm: 'gap-4 md:gap-6',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-10',
};

export function Grid({
  children,
  className = '',
  cols = 3,
  gap = 'md',
}: GridProps) {
  return (
    <div
      className={`
        grid
        ${gridColStyles[cols]}
        ${gridGapStyles[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
