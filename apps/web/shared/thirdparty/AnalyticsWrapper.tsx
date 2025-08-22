'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';

import { GA_TRACKING_ID } from '@/shared/lib/ga4/gtag';

const Analytics = dynamic(() => import('@vercel/analytics/next').then((mod) => mod.Analytics), {
  ssr: false,
});

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  {
    ssr: false,
  }
);

const GoogleAnalytics = dynamic(
  () => import('@/shared/hooks/GoogleAnalyticsEffect').then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function AnalyticsWrapper() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
        });
            `}
      </Script>
    </>
  );
}
