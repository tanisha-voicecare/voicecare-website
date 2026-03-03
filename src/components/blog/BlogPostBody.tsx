'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders WordPress post content inside a Shadow DOM and loads the WordPress
 * block library CSS so every class and style from the editor (bold, italic,
 * font size, spacing, alignment, etc.) appears exactly as the admin set it.
 * Also injects WP global styles (Gutenberg font-size presets, typography
 * variables) so editor choices like Pullquote S/M/L/XL reflect in the UI.
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

    // Inject WordPress global styles (Gutenberg presets, font-size S/M/L/XL, etc.)
    // so WP editor typography changes reflect inside the Shadow DOM only.
    fetch('/api/wp-global-styles')
      .then((res) => (res.ok ? res.text() : ''))
      .then((css) => {
        if (!css || !host.shadowRoot) return;
        const style = document.createElement('style');
        style.setAttribute('id', 'wp-global-styles-inline-css');
        style.textContent = css;
        host.shadowRoot.insertBefore(style, host.shadowRoot.firstChild);
      })
      .catch(() => {});

    if (wpBlockCssUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = wpBlockCssUrl;
      shadow.appendChild(link);
    }

    const style = document.createElement('style');
    style.textContent = `
      /* Gutenberg font-size presets (S/M/L/XL) – slightly larger for readability */
      :host {
        --wp--preset--font-size--x-small: 0.875rem;
        --wp--preset--font-size--small: 0.9375rem;
        --wp--preset--font-size--medium: 1.125rem;
        --wp--preset--font-size--large: 1.4375rem;
        --wp--preset--font-size--x-large: 1.75rem;
        --wp--preset--font-size--xx-large: 2.25rem;
      }
      .has-x-small-font-size { font-size: var(--wp--preset--font-size--x-small); }
      .has-small-font-size { font-size: var(--wp--preset--font-size--small); }
      .has-medium-font-size { font-size: var(--wp--preset--font-size--medium); }
      .has-large-font-size { font-size: var(--wp--preset--font-size--large); }
      .has-x-large-font-size { font-size: var(--wp--preset--font-size--x-large); }
      .has-xx-large-font-size { font-size: var(--wp--preset--font-size--xx-large); }

      /* Base typography for blog content – slightly larger default for body text */
      .wp-block-content { font-family: inherit; color: inherit; font-size: 1.0625rem; line-height: 1.6; max-width: 100%; word-wrap: break-word; }
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
