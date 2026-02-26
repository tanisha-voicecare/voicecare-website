'use client';

/**
 * Error boundary for blog category pages.
 * Shows a friendly message instead of a blank page when something goes wrong.
 */

import Link from 'next/link';

export default function BlogCategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-[#06003F] mb-2">
          Something went wrong
        </h2>
        <p className="text-[#06003F]/70 mb-6">
          We couldn’t load this category. You can try again or browse all posts.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 text-sm font-medium rounded-[6px] border border-[#06003F]/15 text-[#06003F] hover:bg-[#06003F]/5 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="px-4 py-2 text-sm font-medium rounded-[6px] bg-[#06003F] text-white hover:bg-[#06003F]/90 transition-colors"
          >
            View all blog posts
          </Link>
        </div>
      </div>
    </div>
  );
}
