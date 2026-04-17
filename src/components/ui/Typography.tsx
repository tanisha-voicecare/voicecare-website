/**
 * Typography Components
 * Consistent text styling across the healthcare website
 */

import { type ReactNode, type ElementType } from 'react';

// ============================================
// Heading Component
// ============================================

interface HeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  color?: 'default' | 'muted' | 'primary' | 'white';
  id?: string;
}

const headingSizes = {
  xs: 'text-lg md:text-xl font-semibold',
  sm: 'text-xl md:text-2xl font-semibold',
  md: 'text-2xl md:text-3xl font-bold',
  lg: 'text-3xl md:text-4xl font-bold tracking-tight',
  xl: 'text-4xl md:text-5xl font-bold tracking-tight',
  '2xl': 'text-5xl md:text-6xl font-bold tracking-tight',
};

const headingColors = {
  default: 'text-neutral-900',
  muted: 'text-neutral-600',
  primary: 'text-primary-600',
  white: 'text-white',
};

export function Heading({
  children,
  as: Component = 'h2',
  size = 'lg',
  className = '',
  color = 'default',
  id,
}: HeadingProps) {
  return (
    <Component
      id={id}
      className={`
        font-display
        ${headingSizes[size]}
        ${headingColors[color]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// ============================================
// Text Component
// ============================================

interface TextProps {
  children: ReactNode;
  as?: ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'white';
  className?: string;
  leading?: 'tight' | 'normal' | 'relaxed';
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const textColors = {
  default: 'text-neutral-800',
  muted: 'text-neutral-600',
  primary: 'text-primary-600',
  white: 'text-white',
};

const textLeadings = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
};

export function Text({
  children,
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  color = 'default',
  leading = 'normal',
  className = '',
}: TextProps) {
  return (
    <Component
      className={`
        ${textSizes[size]}
        ${textWeights[weight]}
        ${textColors[color]}
        ${textLeadings[leading]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

// ============================================
// Section Header Component
// ============================================

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleColor?: 'default' | 'primary' | 'white';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleColor = 'default',
}: SectionHeaderProps) {
  return (
    <header
      className={`
        mb-12 md:mb-16
        ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}
        ${className}
      `}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3">
          {eyebrow}
        </span>
      )}
      <Heading
        as="h2"
        size="xl"
        color={titleColor}
        className="mb-4"
      >
        {title}
      </Heading>
      {description && (
        <Text
          size="lg"
          color={titleColor === 'white' ? 'white' : 'muted'}
          leading="relaxed"
          className={titleColor === 'white' ? 'opacity-90' : ''}
        >
          {description}
        </Text>
      )}
    </header>
  );
}

// ============================================
// Prose Component (for CMS content)
// ============================================

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className = '' }: ProseProps) {
  return (
    <div
      className={`
        prose prose-neutral prose-lg max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:leading-relaxed prose-p:text-neutral-700
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-neutral-900
        prose-img:rounded-xl prose-img:shadow-soft-md
        prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
        prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-neutral-900 prose-pre:rounded-xl
        prose-ul:my-6 prose-ol:my-6
        prose-li:my-2
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Heading;
