// GA4 tag for the "Westberg Europe" web data stream (property 549989109).
// Rendered inside each public root layout; `next/script` hoists the loader into
// <head> with `afterInteractive`, so it never blocks first paint.
// GA4 enhanced measurement listens to History API changes, which covers App
// Router client-side navigations — no manual page_view calls needed here.
import Script from "next/script";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LJM7VPTCFM";

export default function GoogleAnalytics() {
  // Keep localhost / preview traffic out of the property.
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
