import {
    HttpError,
    HttpStatus,
} from "@/api/http";

describe(`HttpStatus`, () => {
    it.each([
        [ `OK`, 200 ],
        [ `BAD_REQUEST`, 400 ],
        [ `UNAUTHORIZED`, 401 ],
        [ `FORBIDDEN`, 403 ],
    ] as [keyof typeof HttpStatus, number][])(`it should map HTTP Status name: %s to code: %s`, (status, code) => {
        expect(HttpStatus[status]).toBe(code);
    });
});

describe(`HttpError`, () => {
    it(`should set code on the Error object`, () => {
        const code = HttpStatus.BAD_GATEWAY;

        const error = new HttpError(code);

        expect(error.code).toBe(code);
    });

    it(`should handle a non-standard HTTP Status code`, () => {
        const code = 12;

        const error = new HttpError(code);

        expect(error.code).toBe(code);
    });
});
