'use client';

import Script from 'next/script';

/**
 * HubSpot tracking code (portal 44160003, NA2 data center).
 * Enables site traffic, intent signals, and related HubSpot analytics on this external site.
 *
 * Ref: https://knowledge.hubspot.com/reports/install-the-hubspot-tracking-code
 */
export function HubSpotTracking() {
  return (
    <Script
      id="hs-script-loader"
      src="https://js-na2.hs-scripts.com/44160003.js"
      strategy="afterInteractive"
    />
  );
}
