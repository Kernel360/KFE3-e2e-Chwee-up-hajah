'use client';

import React from 'react';

import { Toaster } from 'react-hot-toast';

import { PushSubscriptionEffect } from '@/shared/hooks/PushSubscriptionEffect';
import AnalyticsWrapper from '@/shared/thirdparty/AnalyticsWrapper';
import SentryErrorBoundaryWrapper from '@/shared/thirdparty/SentryErrorBoundary';

export default function ThirdPartyWrappers({ children }: { children: React.ReactNode }) {
  return (
    <SentryErrorBoundaryWrapper>
      <PushSubscriptionEffect />
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2300,
          style: {
            background: '#484848',
            color: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            fontSize: 12,
          },
        }}
      />
      <AnalyticsWrapper />
    </SentryErrorBoundaryWrapper>
  );
}
