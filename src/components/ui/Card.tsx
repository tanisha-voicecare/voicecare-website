/**
 * Card Component
 * Versatile card component for displaying content blocks
 */

import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================
// Types
// ============================================

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  href?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  className?: string;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// Styles
// ============================================

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-soft-lg',
  bordered: 'bg-white border border-neutral-200',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const aspectRatioStyles = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[2/1]',
};

// ============================================
// Card Components
// ============================================

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'none',
  hover = false,
  href,
}: CardProps) {
  const baseStyles = `
    rounded-2xl overflow-hidden
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${hover ? 'transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1' : ''}
  `;

  if (href) {
    return (
      <Link href={href} className={`block ${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return <article className={`${baseStyles} ${className}`}>{children}</article>;
}

export function CardImage({
  src,
  alt,
  aspectRatio = 'video',
  className = '',
}: CardImageProps) {
  return (
    <figure className={`relative overflow-hidden ${aspectRatioStyles[aspectRatio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </figure>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <header className={`p-6 pb-0 ${className}`}>{children}</header>;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <footer className={`p-6 pt-0 mt-auto ${className}`}>{children}</footer>
  );
}

// ============================================
// Preset Card Variants
// ============================================

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const content = (
    <>
      <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#06003F] mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block p-6 rounded-2xl bg-white border border-neutral-100 hover:border-primary-200 hover:shadow-soft-lg transition-all duration-300"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white border border-neutral-100">
      {content}
    </div>
  );
}

interface BlogCardProps {
  image?: string;
  category?: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  href: string;
  authorName?: string;
}

export function BlogCard({
  image,
  category,
  title,
  excerpt,
  date,
  readingTime,
  href,
  authorName,
}: BlogCardProps) {
  const dateStr = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
      {image && (
        <Link href={href} className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <span className="absolute top-4 left-4 px-3 py-1 text-sm font-medium bg-white/90 backdrop-blur-sm rounded-full text-[#06003F]">
              {category}
            </span>
          )}
        </Link>
      )}
      <div className="flex flex-col flex-1 p-6">
        <Link href={href}>
          <h3 className="text-xl font-semibold text-[#06003F] mb-3 line-clamp-2 group-hover:text-[#FF4E3A] transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-[#06003F]/60 mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">{excerpt}</p>
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm text-[#06003F]/60 pt-4 border-t border-[#06003F]/10">
          <span className="flex items-center gap-x-2">
            <time dateTime={date}>{dateStr}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min read</span>
          </span>
          {authorName && (
            <span className="font-medium text-[#06003F]/80 shrink-0">{authorName}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
