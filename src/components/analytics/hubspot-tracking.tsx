"use client";

import Script from "next/script";

export function HubSpotTracking() {
  return (
    <Script
      id="hs-script-loader"
      src="https://js-na2.hs-scripts.com/44160003.js"
      strategy="afterInteractive"
    />
  );
}
