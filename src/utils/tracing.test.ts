import {
    HttpError,
    HttpStatus,
} from "@/api/http";
import { tracing } from "@/utils/tracing";
import { AuthError } from "@azure/msal-browser";
import { mockNewRelic } from "@tests/mocks/newrelic";

describe(`tracing`, () => {
    beforeEach(() => {
        mockNewRelic();
    });

    describe(`error`, () => {
        it(`extracts additional context from a HttpError`, () => {
            const error = new HttpError(HttpStatus.BAD_GATEWAY);

            tracing.error(error);

            expect(window.newrelic?.noticeError).toHaveBeenCalledWith(error, expect.objectContaining({
                statusCode: HttpStatus.BAD_GATEWAY,
            }));
        });
        it(`extracts additional context from an @azure/msal-browser AuthError`, () => {
            const error = new AuthError(`login_failed`);
            error.setCorrelationId(`abcd`);

            tracing.error(error);

            expect(window.newrelic?.noticeError).toHaveBeenCalledWith(error, expect.objectContaining({
                code: `login_failed`,
                correlationId: `abcd`,
            }));
        });

        it(`includes default context`, () => {
            tracing.error(new Error(`Something went wrong`));

            expect(window.newrelic?.noticeError).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
                // Fallback value, mocking process.env.GIT_COMMIT would overcomplicate testing
                commitSha: `unknown`,
            }));
        });
    });
});
