import useConditionalLogoutFromB2C from './useConditionalLogoutFromB2C';
import * as refreshTokenModule from "@/api/authentication/refreshToken";
import { client } from "@/utils/azureB2C";
import { history } from "@/utils/createPreserveQueryHistory";
import { AccountInfo } from "@azure/msal-browser";
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Router } from "react-router-dom";

jest.mock(`react-router-dom`, () => ({
    ...jest.requireActual(`react-router-dom`),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

jest.mock(`@/config`, () => ({
    ...jest.requireActual(`@/config`),
    azureB2C: {
        enabled: true,
    },
    server: {
        // `window.location.origin` is undefined when running in Jest
        origin: `https://auth.kidsloop.test`,
    },
}));

describe(`useConditionalLogoutFromB2C`, () => {
    let refreshTokenSpy: jest.SpyInstance<Promise<boolean>>;
    let getAllAccountsSpy: jest.SpyInstance<Array<AccountInfo>>;
    let logoutRedirectSpy: jest.SpyInstance<Promise<void>>;

    beforeEach(() => {
        // Set default return values so we avoid any accidental API calls
        refreshTokenSpy = jest.spyOn(refreshTokenModule, `refreshToken`).mockResolvedValue(true);
        getAllAccountsSpy = jest.spyOn(client, `getAllAccounts`).mockReturnValue([]);
        logoutRedirectSpy = jest.spyOn(client, `logoutRedirect`).mockResolvedValue();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test(`if hook is used then expect to return an object with the loading property`, () => {
        const { result } = renderHook(useConditionalLogoutFromB2C);

        expect(result.current.loading).toBeDefined();
    });

    test(`if the user has an active session then call B2C logout`, async () => {
        refreshTokenSpy.mockResolvedValue(false);
        getAllAccountsSpy.mockReturnValue([
            {
                environment: ``,
                homeAccountId: ``,
                localAccountId: ``,
                tenantId: ``,
                username: ``,
                idTokenClaims: {},
                name: ``,
            },
        ]);
        logoutRedirectSpy.mockResolvedValue();

        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>,
        });

        expect(refreshTokenSpy).toHaveBeenCalled();

        await waitFor(() => expect(getAllAccountsSpy).toHaveBeenCalled());
        await waitFor(() => expect(logoutRedirectSpy).toHaveBeenCalled());
    });

    test(`if the user does not has an active session then do not call B2C logout`, () => {
        refreshTokenSpy.mockResolvedValue(true);
        getAllAccountsSpy.mockReturnValue([]);

        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>,
        });

        expect(logoutRedirectSpy).not.toHaveBeenCalled();
    });

    test(`if B2C logout throw an error then log it in the console`, async () => {
        const consoleSpy = jest.spyOn(console, `error`);

        consoleSpy.mockImplementation(jest.fn());
        refreshTokenSpy.mockResolvedValue(false);
        getAllAccountsSpy.mockReturnValue([
            {
                environment: ``,
                homeAccountId: ``,
                localAccountId: ``,
                tenantId: ``,
                username: ``,
                idTokenClaims: {},
                name: ``,
            },
        ]);
        logoutRedirectSpy.mockRejectedValue(`Something went wrong.`);

        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>,
        });

        expect(refreshTokenSpy).toHaveBeenCalled();

        await waitFor(() => expect(getAllAccountsSpy).toHaveBeenCalled());
        await waitFor(() => expect(logoutRedirectSpy).toHaveBeenCalled());

        expect(consoleSpy).toHaveBeenCalledWith(`Something went wrong.`);
    });
});
