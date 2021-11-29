// Must import refreshTokenModule entirely, as we can't mock a function called from inside another function
// i.e. refreshToken called internally by switchUser
import * as refreshTokenModule from "./refreshToken";
import { switchUser } from "./switchUser";
import { RetryError } from "@/api/rest";

describe(`switchUser`, () => {
    const successfulResponse = {
        ok: true,
        status: 200,
    } as Response;

    const expiredTokenResponse = {
        ok: false,
        status: 401,
    } as Response;

    const networkErrorResponse = {
        ok: false,
        status: 500,
    } as Response;

    let fetchSpy: jest.SpyInstance<Promise<Response>>;
    let mockRefreshToken: jest.SpyInstance<Promise<boolean>>;

    beforeEach(() => {
        fetchSpy = jest.spyOn(window, `fetch`);
        mockRefreshToken = jest.spyOn(refreshTokenModule, `refreshToken`).mockResolvedValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test(`on status=401, refreshes the JWT then retries the request`, async () => {
        fetchSpy.mockResolvedValueOnce(expiredTokenResponse).mockResolvedValueOnce(successfulResponse);

        expect(await switchUser(`some-user-id`)).toBe(true);

        expect(window.fetch).toHaveBeenCalledTimes(2);
        expect(mockRefreshToken).toHaveBeenCalledTimes(1);
    });

    test(`on status=500, retries the request`, async () => {
        fetchSpy.mockResolvedValueOnce(networkErrorResponse).mockResolvedValueOnce(successfulResponse);

        expect(await switchUser(`some-user-id`)).toBe(true);

        expect(window.fetch).toHaveBeenCalledTimes(2);
        expect(mockRefreshToken).not.toHaveBeenCalled();
    });

    test(`on status=200, doesn't retry the request`, async () => {
        fetchSpy.mockResolvedValueOnce(successfulResponse);

        expect(await switchUser(`some-user-id`)).toBe(true);

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(mockRefreshToken).not.toHaveBeenCalled();
    });

    test(`throws a RetryError if more than one retry fails`, async () => {
        global.console.error = jest.fn();
        fetchSpy.mockResolvedValue(networkErrorResponse);

        expect(await switchUser(`some-user-id`)).toBe(false);

        expect(window.fetch).toHaveBeenCalledTimes(2);
        expect(global.console.error).toHaveBeenLastCalledWith(new RetryError(1) );
    });
});
