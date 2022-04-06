import useAccessToken from './useAccessToken';
import {
    URLContext,
    URLContextProvider,
} from '@/hooks';
import { loginRequest } from '@/utils/azureB2C';
import {
    AuthenticationResult,
    InteractionRequiredAuthError,
    InteractionStatus,
    PublicClientApplication,
    SilentRequest,
} from '@azure/msal-browser';
import {
    IMsalContext,
    MsalAuthenticationResult,
    useMsal,
} from '@azure/msal-react';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
    testAccount,
    testConfig,
} from '@tests/mocks/azureB2C';
import { defaultURLContext } from '@tests/providers';
import React from "react";

jest.mock(`@azure/msal-react`, () => ({
    useMsal: jest.fn(),
    useAccount: jest.fn(),
}));

describe(`useAccessToken`, () => {
    const wrapper = ({ children, value = defaultURLContext }: {children: React.ReactNode; value: URLContext}) => <URLContextProvider value={value}>{children}</URLContextProvider>;

    const initialState = {
        isLoading: true,
        token: undefined,
        error: undefined,
    };

    const testAccessToken = `some-JWT`;

    const expectedTokenRequest: SilentRequest = {
        // jest defaults window.location.origin to "http://localhost/"
        redirectUri: `http://localhost/blank.html`,
        ...loginRequest,
    };

    let acquireTokenSilentSpy: jest.SpyInstance<Promise<AuthenticationResult>>;
    let acquireTokenRedirectSpy: jest.SpyInstance<Promise<void>>;
    let mockUseMsal: jest.MockedFunction<typeof useMsal>;

    beforeAll(() => {
        acquireTokenSilentSpy = jest.spyOn(PublicClientApplication.prototype, `acquireTokenSilent`).mockResolvedValue({
            accessToken: testAccessToken,
        } as AuthenticationResult);
        acquireTokenRedirectSpy = jest.spyOn(PublicClientApplication.prototype, `acquireTokenRedirect`).mockResolvedValue();
        mockUseMsal = useMsal as jest.MockedFunction<typeof useMsal>;
        mockUseMsal.mockReturnValue({
            instance: new PublicClientApplication(testConfig),
            accounts: [ testAccount ],
            inProgress: InteractionStatus.None,
        } as unknown as IMsalContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test(`returns an existing token if passed as prop`, () => {
        const existingToken = `abcd`;

        const { result } = renderHook(() => useAccessToken({
            accessToken: existingToken,
        } as MsalAuthenticationResult["result"]), {
            wrapper,
        });

        expect(result.current).toEqual({
            isLoading: false,
            token: existingToken,
            error: undefined,
        });

        expect(acquireTokenSilentSpy).not.toHaveBeenCalled();
    });

    test(`returns loading state if authentication in progress`, () => {
        mockUseMsal.mockReturnValueOnce({
            instance: new PublicClientApplication(testConfig),
            accounts: [ ],
            inProgress: InteractionStatus.Login,
        } as unknown as IMsalContext);

        const { result } = renderHook(() => useAccessToken(), {
            wrapper,
        });

        expect(result.current).toEqual(initialState);
        expect(acquireTokenSilentSpy).not.toHaveBeenCalled();
    });

    test.each([ null, undefined ])(`returns a new token from acquireTokenSilent if no existing token`, async (authenticationResult) => {
        const { result, waitForNextUpdate } = renderHook(() => useAccessToken(authenticationResult), {
            wrapper,
        });

        expect(result.current).toEqual(initialState);
        expect(acquireTokenSilentSpy).toHaveBeenCalledTimes(1);
        expect(acquireTokenSilentSpy).toHaveBeenCalledWith(expectedTokenRequest);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            error: undefined,
            token: testAccessToken,
        });

    });

    test(`returns an error if acquireTokenSilent fails`, async () => {
        const error = new Error(`Something went wrong`);
        // eslint-disable-next-line require-await
        acquireTokenSilentSpy.mockImplementationOnce(async () => {
            throw error;
        });

        const { result, waitForNextUpdate } = renderHook(() => useAccessToken(), {
            wrapper,
        });

        expect(acquireTokenSilentSpy).toHaveBeenCalledTimes(1);
        expect(acquireTokenSilentSpy).toHaveBeenCalledWith(expectedTokenRequest);

        expect(result.current).toEqual(initialState);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            token: undefined,
            error,
        });

    });

    test(`calls acquireTokenRedirect if acquireTokenSilent throws an InteractionRequiredAuthError`, async () => {
        // eslint-disable-next-line require-await
        acquireTokenSilentSpy.mockImplementationOnce(async () => {
            throw new InteractionRequiredAuthError();
        });

        const { result } = renderHook(() => useAccessToken(), {
            wrapper,
        });

        expect(acquireTokenSilentSpy).toHaveBeenCalledTimes(1);
        expect(acquireTokenSilentSpy).toHaveBeenCalledWith(expectedTokenRequest);

        expect(result.current).toEqual(initialState);

        await waitFor(() => expect(acquireTokenRedirectSpy).toHaveBeenCalledTimes(1));
    });

});
