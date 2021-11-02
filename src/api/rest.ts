export const DEFAULT_HEADERS = {
    Accept: `application/json`,
    'Content-Type': `application/json`,
};

export const request = (input: RequestInfo, options: RequestInit = {}) =>  {
    const { headers, ...rest } = options;
    return fetch(input, {
        headers: headers ?? new Headers(DEFAULT_HEADERS),
        ...rest,
    });
};

export const get = (input: RequestInfo, options?: RequestInit) => request(input, {
    method: `GET`,
    ...options,
});

export const post = (input: RequestInfo, options?: RequestInit) => request(input, {
    method: `POST`,
    ...options,
});
