'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders WordPress post content inside a Shadow DOM and loads the WordPress
 * block library CSS so every class and style from the editor (bold, italic,
 * font size, spacing, alignment, etc.) appears exactly as the admin set it.
 */
export function BlogPostBody({
  content,
  wpBlockCssUrl,
}: {
  content: string;
  wpBlockCssUrl: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !content) return;

    const shadow = host.attachShadow({ mode: 'open' });

    if (wpBlockCssUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = wpBlockCssUrl;
      shadow.appendChild(link);
    }

    const style = document.createElement('style');
    style.textContent = `
      .wp-block-content { font-family: inherit; color: inherit; max-width: 100%; word-wrap: break-word; }
      .wp-block-content strong, .wp-block-content b { font-weight: 700; }
      .wp-block-content em, .wp-block-content i { font-style: italic; }
    `;
    shadow.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'wp-block-content';
    wrap.innerHTML = content;
    shadow.appendChild(wrap);
  }, [content, wpBlockCssUrl]);

  return <div ref={hostRef} className="blog-post-body-host" />;
}
