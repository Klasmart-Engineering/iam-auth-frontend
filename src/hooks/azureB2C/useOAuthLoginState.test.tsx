import { useOAuthLoginState } from '@/hooks';
import {
    encodeState,
    OAuthLoginState,
} from '@/utils/azureB2C';
import { AuthenticationResult } from '@azure/msal-common';
import { renderHook } from '@testing-library/react-hooks';

describe(`useOAuthLoginState`, () => {

    test(`AuthenticationResult=null returns undefined`, () => {
        const { result } = renderHook(() => useOAuthLoginState(null));

        expect(result.current).toBeUndefined();
    });

    test(`AuthenticationResult with State returns decoded state object`, () => {
        const state: OAuthLoginState = {
            platform: `Android`,
        };
        const testAuthenticationResult = {
            state: encodeState(state),
        } as AuthenticationResult;

        const { result } = renderHook(() => useOAuthLoginState(testAuthenticationResult));

        expect(result.current).toEqual(state);
    });
});
