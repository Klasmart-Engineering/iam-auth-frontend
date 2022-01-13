import useUpdateLocale from './useUpdateLocale';
import { MsalAuthenticationResult } from '@azure/msal-react';
import { renderHook } from '@testing-library/react-hooks';
import { Cookies } from 'react-cookie';
import { cleanCookies } from 'universal-cookie/lib/utils';

describe(`useUpdateLocale`, () => {
    let cookieSetSpy: jest.SpyInstance<void>;

    beforeEach(() => {
        cleanCookies();
        cookieSetSpy = jest.spyOn(Cookies.prototype, `set`);
    });

    afterAll(() => {
        cleanCookies();
    });

    test(`if AuthenticationResult is null, does nothing`, () => {
        renderHook(() => useUpdateLocale(null));

        expect(cookieSetSpy).not.toHaveBeenCalled();
    });

    test(`if AuthenticationResult.idTokenClaims includes a supported locale, does nothing`, () => {
        renderHook(() => useUpdateLocale({
            idTokenClaims: {
                locale: `invalid-locale`,
            },
        } as MsalAuthenticationResult["result"]));

        expect(cookieSetSpy).not.toHaveBeenCalled();
    });

    test(`if AuthenticationResult.idTokenClaims includes a supported locale, updates the "locale" cookie`, () => {
        const locale = `th`;

        renderHook(() => useUpdateLocale({
            idTokenClaims: {
                locale,
            },
        } as MsalAuthenticationResult["result"]));

        expect(cookieSetSpy).toHaveBeenCalledTimes(1);
        const [ cookieName, cookieLocale ] = cookieSetSpy.mock.calls[0];
        expect(cookieName).toBe(`locale`);
        expect(cookieLocale).toBe(locale);
    });
});
