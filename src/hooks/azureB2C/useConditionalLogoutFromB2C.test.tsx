import useConditionalLogoutFromB2C from './useConditionalLogoutFromB2C';
import { renderHook } from '@testing-library/react-hooks';
import * as refreshTokenModule from "@/api/authentication/refreshToken";
import { client } from "@/utils/azureB2C";
import React from 'react';
import { Router } from "react-router-dom";
import { history } from "@/utils/createPreserveQueryHistory";
import { waitFor } from '@testing-library/react';
import { AccountInfo } from "@azure/msal-browser";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/config', () => ({
    ...jest.requireActual('@/config'),
    azureB2C: {
        enabled: true,
    },
}));

describe(`useConditionalLogoutFromB2C`, () => {
    let refreshTokenSpy: jest.SpyInstance<Promise<boolean>>;
    let getAllAccountsSpy: jest.SpyInstance<Array<AccountInfo>>;
    let logoutRedirectSpy: jest.SpyInstance<Promise<void>>;

    beforeEach(() => {
        refreshTokenSpy = jest.spyOn(refreshTokenModule, 'refreshToken');
        getAllAccountsSpy = jest.spyOn(client, 'getAllAccounts');
        logoutRedirectSpy = jest.spyOn(client, 'logoutRedirect');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('if hook is used then expect to return an object with the loading property', () => {
        const { result } = renderHook(useConditionalLogoutFromB2C);

        expect(result.current.loading).toBeDefined();
    })

    test('if the user has an active session then call B2C logout', async () => {
        refreshTokenSpy.mockResolvedValue(false);
        getAllAccountsSpy.mockReturnValue([{
            environment: '',
            homeAccountId: '',
            localAccountId: '',
            tenantId: '',
            username: '',
            idTokenClaims: {},
            name: ''
        }]);
        logoutRedirectSpy.mockResolvedValue();

        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>
        });
        
        expect(refreshTokenSpy).toHaveBeenCalled();

        await waitFor(() => expect(getAllAccountsSpy).toHaveBeenCalled());
        await waitFor(() => expect(logoutRedirectSpy).toHaveBeenCalled())
    });

    test('if the user does not has an active session then do no call B2C logout', async () => {
        refreshTokenSpy.mockResolvedValue(true);
        getAllAccountsSpy.mockReturnValue([]);

        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>
        });

        expect(logoutRedirectSpy).not.toHaveBeenCalled();
    });

    test('if B2C logout throw an error then log it in the console', async () => {
        const consoleSpy = jest.spyOn(console, 'error');

        consoleSpy.mockImplementation(jest.fn())
        refreshTokenSpy.mockResolvedValue(false);
        getAllAccountsSpy.mockReturnValue([{
            environment: '',
            homeAccountId: '',
            localAccountId: '',
            tenantId: '',
            username: '',
            idTokenClaims: {},
            name: ''
        }]);
        logoutRedirectSpy.mockRejectedValue('Something went wrong.')
        
        renderHook(useConditionalLogoutFromB2C, {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>
        });

        expect(refreshTokenSpy).toHaveBeenCalled();

        await waitFor(() => expect(getAllAccountsSpy).toHaveBeenCalled());
        await waitFor(() => expect(logoutRedirectSpy).toHaveBeenCalled())

        expect(consoleSpy).toBeCalledWith('Something went wrong.')
    });
});
