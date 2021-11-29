import { transferAMSToken } from "@/api/authentication";

describe(`transferAMSToken`, () => {
    const jwt = `abcde`;

    const successfulResponse = {
        ok: true,
        status: 200,
    } as Response;

    const networkErrorResponse = {
        ok: false,
        status: 500,
    } as Response;

    let fetchSpy: jest.SpyInstance<Promise<Response>>;

    beforeEach(() => {
        fetchSpy = jest.spyOn(window, `fetch`);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test(`passes the JWT as request.body.token to /transfer`, async () => {
        fetchSpy.mockResolvedValue(successfulResponse);

        await transferAMSToken(jwt);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const args = fetchSpy.mock.calls[0];

        expect(args[0]).toEqual(`/transfer`);
        expect(args[1]?.body).toEqual(JSON.stringify({
            token: jwt,
        }));
    });

    test(`if the response was successful returns true`, async () => {
        fetchSpy.mockResolvedValueOnce(successfulResponse);

        expect(await transferAMSToken(jwt)).toBe(true);
    });

    test(`if the response was unsuccesful returns false`, async () => {
        fetchSpy.mockResolvedValueOnce(networkErrorResponse);

        expect(await transferAMSToken(jwt)).toBe(false);
    });
});
