import { useOAuthState } from '@/hooks';
import {
    encodeState,
    OAuthState,
} from '@/utils/azureB2C';
import { AuthenticationResult } from '@azure/msal-common';
import { renderHook } from '@testing-library/react-hooks';

describe(`useOAuthState`, () => {

    test(`AuthenticationResult=null returns undefined`, () => {
        const { result } = renderHook(() => useOAuthState(null));

        expect(result.current).toBeUndefined();
    });

    test(`AuthenticationResult with State returns decoded state object`, () => {
        const state: OAuthState = {
            platform: `Android`,
            continue: `https://www.google.com`,
        };
        const testAuthenticationResult = {
            state: encodeState(state),
        } as AuthenticationResult;

        const { result } = renderHook(() => useOAuthState(testAuthenticationResult));

        expect(result.current).toEqual(state);
    });
});
