'use client';

import Script from 'next/script';

/**
 * RB2B (RevenueBridge) Integration
 * B2B visitor identification and tracking tool
 *
 * Exact script provided by RB2B for our account (Q6J2RHYGEL6D).
 * Uses Next.js <Script> (same pattern as GoogleAnalytics.tsx) for
 * proper SSR handling, deduplication, and client-side navigation support.
 *
 * Ref: https://support.rb2b.com/en/articles/8795573-rb2b-install-guide-for-wordpress
 */
export function RB2B() {
  return (
    <Script id="reb2b-init" strategy="afterInteractive">
      {`
        !function(key) {
          if (window.reb2b) return;
          window.reb2b = {loaded: true};
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz";
          document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
        }("Q6J2RHYGEL6D");
      `}
    </Script>
  );
}
