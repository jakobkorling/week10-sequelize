import * as Sentry from "@sentry/node";

export const reportError = (error: unknown, feature: string) => {
  Sentry.setTag("feature", feature);
  Sentry.captureException(error);
};