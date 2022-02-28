export const DEFAULT_HEADERS = {
    Accept: `application/json`,
    'Content-Type': `application/json`,
};

export type RetryConditionCallback = (result: {response: Response; error?: undefined} | {response?: undefined; error: Error}) => Promise<boolean>

/**
 * Specify either:
 * - no retry options
 * - `retries` only (by default only retried on network errors)
 * - `retries` and `retryCondition`
 */
type RetryOptions = {retries?: undefined; retryCondition?: undefined} | {retries: number; retryCondition?: undefined} | {retries: number; retryCondition: RetryConditionCallback}

type RequestOptions = RequestInit & RetryOptions

export class RetryError extends Error {
    constructor (attempts: number) {
        super(`Retry attempts=${attempts} exceeded`);
        this.name = `RetryError`;
    }
}

/**
 * By default only handle network errors
 */
const defaultRetryCondition: RetryConditionCallback = ({ response, error }) => Promise.resolve(error !== undefined || (response !== undefined && response.status >= 400));

const attemptRequest = async (input: RequestInfo, options: RequestOptions) => {
    try {
        const response = await fetch(input, options);
        return {
            response,
            error: undefined,
        };
    } catch (e) {
        return {
            response: undefined,
            error: e as Error,
        };
    }
};

export const request = async (input: RequestInfo, options: RequestOptions = {}): Promise<Response> =>  {
    const {
        headers,
        retries,
        retryCondition,
        ...rest
    } = options;

    const fetchOptions = {
        headers: headers ?? new Headers(DEFAULT_HEADERS),
        ...rest,
    };

    if (retries === undefined || retries < 1) {
        return fetch(input, fetchOptions);
    }

    // Limit retry attempts to 5
    const maxAttempts = Math.min(retries, 5);
    const shouldRetry = retryCondition ?? defaultRetryCondition;

    for (let attempt = 0; attempt <= maxAttempts; attempt++) {
        const fetchResult = await attemptRequest(input, fetchOptions);
        if (await shouldRetry(fetchResult)) {
            continue;
        }

        if (fetchResult.error) throw fetchResult.error;

        return fetchResult.response;
    }

    throw new RetryError(maxAttempts);
};

export const get = (input: RequestInfo, options?: RequestOptions) => request(input, {
    method: `GET`,
    ...options,
});

export const post = (input: RequestInfo, options?: RequestOptions) => request(input, {
    method: `POST`,
    ...options,
});
