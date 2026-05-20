"use client";

import * as React from "react";
import { useTrackingConsent } from "@/context/tracking-consent";

export function Analytics() {
  const { trackingConsent } = useTrackingConsent();

  React.useEffect(() => {
    if (trackingConsent === true) {
      console.log("[Consent Vault] Consent approved! Injecting analytics and pixel tracking scripts.");

      // 1. Inject Mock Google Analytics Tag
      const gaScript = document.createElement("script");
      gaScript.id = "analytics-ga";
      gaScript.async = true;
      gaScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MOCK123456');
        console.log('[Consent Vault] Google Analytics Script Loaded (Active).');
      `;
      document.head.appendChild(gaScript);

      // 2. Inject Mock Meta Pixel Tag
      const fbScript = document.createElement("script");
      fbScript.id = "analytics-fb-pixel";
      fbScript.textContent = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1234567890');
        fbq('track', 'PageView');
        console.log('[Consent Vault] Meta Pixel Script Loaded (Active).');
      `;
      document.head.appendChild(fbScript);

      // Cleanup on unmount or when trackingConsent changes
      return () => {
        console.log("[Consent Vault] Consent revoked or unmounted. Removing tracking scripts.");
        const ga = document.getElementById("analytics-ga");
        if (ga) ga.remove();
        const fb = document.getElementById("analytics-fb-pixel");
        if (fb) fb.remove();
      };
    } else {
      console.log("[Consent Vault] Analytics scripts blocked. trackingConsent is:", trackingConsent);
    }
  }, [trackingConsent]);

  return null;
}
export default Analytics;
