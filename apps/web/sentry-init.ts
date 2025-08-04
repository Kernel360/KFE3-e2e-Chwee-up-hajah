import * as Sentry from '@sentry/nextjs';

export const initializeSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  }
};
