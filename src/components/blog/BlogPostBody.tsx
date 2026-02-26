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

    // Clear existing shadow root to avoid duplicate styles on re-render
    if (host.shadowRoot) {
      host.shadowRoot.innerHTML = '';
    }

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    if (wpBlockCssUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = wpBlockCssUrl;
      shadow.appendChild(link);
    }

    const style = document.createElement('style');
    style.textContent = `
      .wp-block-content { font-family: inherit; color: inherit; max-width: 100%; word-wrap: break-word; }
      .wp-block-content p { margin: 0 0 1em; line-height: 1.6; }
      .wp-block-content p:last-child { margin-bottom: 0; }
      .wp-block-content strong, .wp-block-content b { font-weight: 700; }
      .wp-block-content em, .wp-block-content i { font-style: italic; }
      .wp-block-content h1, .wp-block-content h2, .wp-block-content h3, .wp-block-content h4, .wp-block-content h5, .wp-block-content h6 { margin: 1.5em 0 0.5em; font-weight: 700; line-height: 1.3; }
      .wp-block-content h1:first-child, .wp-block-content h2:first-child, .wp-block-content h3:first-child, .wp-block-content h4:first-child, .wp-block-content h5:first-child, .wp-block-content h6:first-child { margin-top: 0; }
      .wp-block-content h1 { font-size: 2em; }
      .wp-block-content h2 { font-size: 1.5em; }
      .wp-block-content h3 { font-size: 1.25em; }
      .wp-block-content h4, .wp-block-content h5, .wp-block-content h6 { font-size: 1em; }
      .wp-block-content blockquote, .wp-block-content .wp-block-quote { margin: 1em 0; padding: 0.5em 0 0.5em 1em; border-left: 4px solid currentColor; font-style: italic; opacity: 0.9; }
      .wp-block-content blockquote p, .wp-block-content .wp-block-quote p { margin: 0.5em 0; }
      .wp-block-content ul, .wp-block-content ol { margin: 1em 0; padding-left: 1.5em; }
      .wp-block-content ul { list-style-type: disc; }
      .wp-block-content ol { list-style-type: decimal; }
      .wp-block-content li { margin: 0.25em 0; line-height: 1.6; }
      .wp-block-content img { max-width: 100%; height: auto; vertical-align: middle; display: block; }
      .wp-block-content figure { margin: 1em 0; }
      .wp-block-content figure img { margin: 0 auto; }
    `;
    shadow.appendChild(style);

    const wrap = document.createElement('div');
    wrap.className = 'wp-block-content';
    wrap.innerHTML = content;
    shadow.appendChild(wrap);
  }, [content, wpBlockCssUrl]);

  return <div ref={hostRef} className="blog-post-body-host" />;
}
