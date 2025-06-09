// app/components/CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (getCookieConsentValue() === "true") {
      setConsent(true);
    }
  }, []);

  return (
    <>
      {consent && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-RSH6Q7W7ES"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RSH6Q7W7ES');
            `}
          </Script>
        </>
      )}

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="cookieConsent"
        style={{
          background: "rgba(30, 27, 75, 0.95)",
          color: "#ddd",
          fontFamily: "inherit",
          fontSize: "0.875rem",
          padding: "1rem",
        }}
        buttonStyle={{
          background: "linear-gradient(to right, #9333ea, #f59e0b)",
          color: "#fff",
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
          padding: "0.5rem 1.25rem",
          border: "none",
        }}
        expires={365}
        enableDeclineButton
        declineButtonText="Decline"
        declineButtonStyle={{
          background: "transparent",
          border: "1px solid #888",
          color: "#aaa",
          marginLeft: "1rem",
          borderRadius: "0.5rem",
          padding: "0.5rem 1.25rem",
        }}
        onAccept={() => {
          setConsent(true);
        }}
      >
        This site uses cookies to enhance the user experience and analyze traffic.{" "}
        <span className="text-purple-400 underline cursor-pointer">
          Learn more
        </span>
      </CookieConsent>
    </>
  );
}
