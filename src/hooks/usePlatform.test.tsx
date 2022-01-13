import {
    URLContext,
    URLContextProvider,
    usePlatform,
} from '@/hooks';
import { renderHook } from '@testing-library/react-hooks';
import React from "react";

describe(`usePlatform`, () => {
    const wrapper = ({
        children,
        value,
    }: {
        children?: React.ReactNode;
        value: URLContext;
    }) => <URLContextProvider value={value}>{children}</URLContextProvider>;

    const baseContextValue: Omit<URLContext, "uaParam"> = {
        hostName: `kidsloop.com`,
        continueParam: null,
        testing: false,
    };

    test(`returns "Browser" if ua QueryParam isn't present`, () => {
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
            initialProps: {
                value: {
                    uaParam: null,
                    ...baseContextValue,
                },
            },
        });

        expect(result.current).toBe(`Browser`);
    });

    test(`returns "Android" if ua QueryParam is cordova`, () => {
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
            initialProps: {
                value: {
                    uaParam: `cordova`,
                    ...baseContextValue,
                },
            },
        });

        expect(result.current).toBe(`Android`);
    });

    test(`returns "iOS" if ua QueryParam is cordovaios`, () => {
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
            initialProps: {
                value: {
                    uaParam: `cordovaios`,
                    ...baseContextValue,
                },
            },
        });

        expect(result.current).toBe(`iOS`);
    });

    test(`returns "Browser" if ua QueryParam is not recognised`, () => {
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
            initialProps: {
                value: {
                    uaParam: `some-unknown-ua`,
                    ...baseContextValue,
                },
            },
        });

        expect(result.current).toBe(`Browser`);
    });
});
