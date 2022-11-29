// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

const SENTRY_ENV = process.env.NEXT_PUBLIC_ENV || 'developement'

Sentry.init({
  environment: SENTRY_ENV,
  dsn:
    SENTRY_DSN ||
    'https://42252d4edf104b3c9190a8614ebe1b8d@o4504153752141824.ingest.sentry.io/4504244192935936',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
