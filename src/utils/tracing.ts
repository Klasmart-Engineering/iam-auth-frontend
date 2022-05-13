import { HttpError } from "@/api/http";
import { AuthError } from "@azure/msal-browser";
import type NewRelicBrowser from "new-relic-browser";

declare global {
  interface Window {
    // newrelic is only enabled in production
    newrelic: typeof NewRelicBrowser | undefined;
  }
}

const defaultErrorContext = {
    commitSha: process.env.GIT_COMMIT || `unknown`,
};

const normalizeError = (error: unknown): Error => error instanceof Error ? error : new Error(JSON.stringify(error));

/**
 * Custom properties extending the base Error class are ignored by newrelic, and must be explicitly provided as `customAttributes`
 */
const extractErrorContext = (error: Error): Record<string, string | number> | undefined => {
    if (error instanceof HttpError) {
        return {
            statusCode: error.code,
        };
    }

    if (error instanceof AuthError) {
        return {
            code: error.errorCode,
            correlationId: error.correlationId,
        };
    }
};

export const tracing = {
    error: (err: Error | unknown, context?: {[key: string]: string | number}) => {
        if (!window.newrelic) {
            return;
        }

        let error = normalizeError(err);
        // Deliberately throw if we don't already have a stack trace
        // https://docs.newrelic.com/docs/browser/new-relic-browser/browser-agent-spa-api/noticeerror-browser-agent-api/#browser-limits
        if (!error.stack) {
            try {
                throw error;
            } catch (errorWithStack) {
                error = errorWithStack as Error;
            }
        }

        const customAttributes = {
            ...defaultErrorContext,
            ...extractErrorContext(error),
            ...context,
        };

        window.newrelic.noticeError(error, customAttributes);
    },
};
