export const flushPromises = (): Promise<void> => new Promise((resolve) => setImmediate(resolve));
