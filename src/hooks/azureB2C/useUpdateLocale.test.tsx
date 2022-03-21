import useUpdateLocale from './useUpdateLocale';
import { localeCodes } from '@/locale';
import { mapKidsloopLocaleToAzureB2CLocale } from '@/utils/azureB2C/locale';
import { MsalAuthenticationResult } from '@azure/msal-react';
import { renderHook } from '@testing-library/react-hooks';
import { Cookies } from 'react-cookie';
import { cleanCookies } from 'universal-cookie/lib/utils';

describe(`useUpdateLocale`, () => {
    let cookieSetSpy: jest.SpyInstance<void>;

    beforeEach(() => {
        jest.clearAllMocks();
        cleanCookies();
        cookieSetSpy = jest.spyOn(Cookies.prototype, `set`);
        console.warn = jest.fn();
    });

    afterAll(() => {
        cleanCookies();
    });

    test(`if AuthenticationResult is null, does nothing`, () => {
        renderHook(() => useUpdateLocale(null));

        expect(cookieSetSpy).not.toHaveBeenCalled();
    });

    test(`if AuthenticationResult.idTokenClaims includes an unsupported locale, doesn't update cookie and logs a warning`, () => {
        // Define object separately to ensure reference equality, and avoid react-testing-library
        // running the useEffect twice
        const idTokenClaims = {
            locale: `invalid-locale`,
        };

        renderHook(() => useUpdateLocale({
            idTokenClaims,
        } as MsalAuthenticationResult["result"]));

        expect(cookieSetSpy).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    test.each(localeCodes)(`if AuthenticationResult.idTokenClaims includes supported locale "%s", updates the "locale" cookie`, (locale) => {
        // Define object separately to ensure reference equality, and avoid react-testing-library
        // running the useEffect twice
        const idTokenClaims = {
            locale: mapKidsloopLocaleToAzureB2CLocale(locale),
        };

        renderHook(() => useUpdateLocale({
            idTokenClaims,
        } as MsalAuthenticationResult["result"]));

        expect(cookieSetSpy).toHaveBeenCalledTimes(1);
        const [ cookieName, cookieLocale ] = cookieSetSpy.mock.calls[0];
        expect(cookieName).toBe(`locale`);
        expect(cookieLocale).toBe(locale);
    });
});
