'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';

import { GA_TRACKING_ID } from '@/shared/lib/ga4/gtag';

// 필수가 아닌 Analytics들은 더 지연시키기
const Analytics = dynamic(() => import('@vercel/analytics/next').then((mod) => mod.Analytics), {
  ssr: false,
  loading: () => null, // 로딩 중에는 아무것도 표시하지 않음
});

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  {
    ssr: false,
    loading: () => null,
  }
);

const GoogleAnalytics = dynamic(
  () => import('@/shared/hooks/GoogleAnalyticsEffect').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function AnalyticsWrapper() {
  return (
    <>
      {/* 중요하지 않은 analytics는 나중에 로드 */}
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />

      {/* GA 스크립트는 가장 늦게 로드 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="lazyOnload" // afterInteractive -> lazyOnload로 변경
      />
      <Script id="google-analytics" strategy="lazyOnload">
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
