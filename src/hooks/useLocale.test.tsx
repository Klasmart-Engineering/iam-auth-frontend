import { default as useLocale } from './useLocale';
import config from '@/config';
import {
    DEFAULT_LOCALE,
    Locale,
} from '@/locale';
import { renderHook } from '@testing-library/react-hooks';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { cleanCookies } from 'universal-cookie/lib/utils';

describe(`useLocale`, () => {
    const UNSUPPORTED_LOCALE = `fake-locale`;

    const wrapper = ({ children, path = `/` }: {
        children?: React.ReactNode;
        path?: string;
    }) => {
        const history = createBrowserHistory();

        history.push(path);

        return <Router history={history}>{children}</Router>;
    };

    let navigatorLanguageMock: jest.SpyInstance<string>;
    let navigatorLanguagesMock: jest.SpyInstance<readonly string[]>;
    beforeEach(() => {
        navigatorLanguageMock = jest.spyOn(window.navigator, `language`, `get`).mockReturnValue(UNSUPPORTED_LOCALE);
        navigatorLanguagesMock = jest.spyOn(window.navigator, `languages`, `get`).mockReturnValue([ UNSUPPORTED_LOCALE ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe(`cookies`, () => {
        beforeAll(() => {
            // Account for accidental artefacts from previous test runs/other tests leaking
            cleanCookies();
        });

        afterEach(() => {
            cleanCookies();
        });

        test(`returns locale Cookie value if supported`, () => {
            const locale: Locale = `vi`;

            const cookies = new Cookies();
            cookies.set(`locale`, locale);

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(locale);
        });

        test(`if not supported, is ignored`, () => {
            const cookies = new Cookies();
            cookies.set(`locale`, UNSUPPORTED_LOCALE);

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(DEFAULT_LOCALE);
        });
    });

    describe(`getPreferredBrowserLocale`, () => {
        test(`returns the first supported element from navigator.languages`, () => {
            const locale: Locale = `th`;
            navigatorLanguagesMock.mockReturnValue([ UNSUPPORTED_LOCALE, `th` ]);

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(locale);
        });

        test(`if no supported locale, is ignored`, () => {
            navigatorLanguagesMock.mockReturnValue([ UNSUPPORTED_LOCALE ] );
            navigatorLanguageMock.mockReturnValue(UNSUPPORTED_LOCALE);

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(DEFAULT_LOCALE);
        });
    });

    describe(`config.defaultLocale`, () => {
        let defaultLocale: Locale | undefined;
        beforeAll(() => {
            defaultLocale = config.defaultLocale;
        });

        afterEach(() => {
            config.defaultLocale = defaultLocale;
        });

        test(`returns config.defaultLocale if specified`, () => {
            const locale: Locale = `es`;
            config.defaultLocale = locale;

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(locale);
        });

        test(`if undefined, is ignored`, () => {
            config.defaultLocale = undefined;

            const { result } = renderHook(() => useLocale(), {
                wrapper,
            });
            expect(result.current[0]).toBe(DEFAULT_LOCALE);

        });
    });

    test(`defaults to english`, () => {
        const { result } = renderHook(() => useLocale(), {
            wrapper,
        });
        expect(result.current[0]).toBe(`en`);
    });
});
