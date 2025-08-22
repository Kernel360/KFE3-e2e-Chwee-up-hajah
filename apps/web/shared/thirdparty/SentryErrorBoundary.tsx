'use client';

import { useEffect, useState } from 'react';

export default function LazySentryBoundary({ children }: { children: React.ReactNode }) {
  const [Boundary, setBoundary] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // 첫 페인트 이후 로드
    if (process.env.NODE_ENV === 'production') {
      import('@sentry/nextjs').then((mod) => setBoundary(() => mod.ErrorBoundary));
    }
  }, []);

  if (!Boundary) return <>{children}</>; // 초기 페인트는 그냥 통과
  return <Boundary fallback={<p>An error has occurred</p>}>{children}</Boundary>;
}
