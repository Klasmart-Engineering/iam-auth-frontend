import useAccessToken from './useAccessToken';
import { loginRequest } from '@/utils/azureB2C';
import {
    AuthenticationResult,
    InteractionStatus,
    PublicClientApplication,
} from '@azure/msal-browser';
import {
    IMsalContext,
    MsalAuthenticationResult,
    useMsal,
} from '@azure/msal-react';
import { renderHook } from '@testing-library/react-hooks';
import {
    testAccount,
    testConfig,
} from '@tests/mocks/azureB2C';

jest.mock(`@azure/msal-react`, () => ({
    useMsal: jest.fn(),
}));

describe(`useAccessToken`, () => {
    const initialState = {
        isLoading: true,
        token: undefined,
        error: undefined,
    };

    const testAccessToken = `some-JWT`;

    let acquireTokenSilentSpy: jest.SpyInstance<Promise<AuthenticationResult>>;
    let mockUseMsal: jest.MockedFunction<typeof useMsal>;

    beforeAll(() => {
        acquireTokenSilentSpy = jest.spyOn(PublicClientApplication.prototype, `acquireTokenSilent`).mockResolvedValue({
            accessToken: testAccessToken,
        } as AuthenticationResult);
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
        } as MsalAuthenticationResult["result"]));

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

        const { result } = renderHook(() => useAccessToken());

        expect(result.current).toEqual(initialState);
        expect(acquireTokenSilentSpy).not.toHaveBeenCalled();
    });

    test.each([ null, undefined ])(`returns a new token from acquireTokenSilent if no existing token`, async (authenticationResult) => {
        const { result, waitForNextUpdate } = renderHook(() => useAccessToken(authenticationResult));

        expect(result.current).toEqual(initialState);
        expect(acquireTokenSilentSpy).toHaveBeenCalledTimes(1);
        expect(acquireTokenSilentSpy).toHaveBeenCalledWith({
            account: testAccount,
            ...loginRequest,
        });

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

        const { result, waitForNextUpdate } = renderHook(() => useAccessToken());

        expect(acquireTokenSilentSpy).toHaveBeenCalledTimes(1);
        expect(acquireTokenSilentSpy).toHaveBeenCalledWith({
            account: testAccount,
            ...loginRequest,
        });

        expect(result.current).toEqual(initialState);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            token: undefined,
            error,
        });

    });

});
