"use client";

import * as React from "react";

type ConsentType = boolean | null;

interface TrackingConsentContextType {
  trackingConsent: ConsentType;
  setTrackingConsent: (consent: ConsentType) => void;
}

const TrackingConsentContext = React.createContext<TrackingConsentContextType | undefined>(undefined);

export function TrackingConsentProvider({ children }: { children: React.ReactNode }) {
  const [trackingConsent, setTrackingConsentState] = React.useState<ConsentType>(null);

  React.useEffect(() => {
    // Read previous settings on mount (runs on client side only)
    const consentSet = localStorage.getItem("nutrisaji_consent_set");
    if (consentSet === "true") {
      const analytics = localStorage.getItem("nutrisaji_analytics") === "true";
      setTrackingConsentState(analytics);
    }
  }, []);

  const setTrackingConsent = (consent: ConsentType) => {
    setTrackingConsentState(consent);
    if (consent !== null) {
      localStorage.setItem("nutrisaji_consent_set", "true");
      localStorage.setItem("nutrisaji_analytics", consent.toString());
      localStorage.setItem("nutrisaji_functional", consent.toString()); // Functional mirrors tracking choice
    } else {
      localStorage.removeItem("nutrisaji_consent_set");
      localStorage.removeItem("nutrisaji_analytics");
      localStorage.removeItem("nutrisaji_functional");
    }
  };

  return (
    <TrackingConsentContext.Provider value={{ trackingConsent, setTrackingConsent }}>
      {children}
    </TrackingConsentContext.Provider>
  );
}

export function useTrackingConsent() {
  const context = React.useContext(TrackingConsentContext);
  if (context === undefined) {
    throw new Error("useTrackingConsent must be used within a TrackingConsentProvider");
  }
  return context;
}
