import type NewRelicBrowser from "new-relic-browser";

export const mockNewRelic = () => {
    window.newrelic = {
        noticeError: jest.fn(),
    } as unknown as typeof NewRelicBrowser;
};
