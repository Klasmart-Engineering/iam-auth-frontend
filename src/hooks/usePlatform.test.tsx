import {
    useAuthfeStore,
    usePlatform,
} from '@/hooks';
import { renderHook } from '@testing-library/react-hooks';
import React from "react";

describe(`usePlatform`, () => {
    const wrapper = ({ children }: {
        children?: React.ReactNode;
    }) => <>{children}</>;

    useAuthfeStore.setState({
        hostName: `kidsloop.com`,
        continueParam: null,
        uaParam:null,
        testing: false,
    });

    test(`returns "Browser" if ua QueryParam isn't present`, () => {
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
        });

        expect(result.current).toBe(`Browser`);
    });

    test(`returns "Android" if ua QueryParam is cordova`, () => {
        useAuthfeStore.setState({
            uaParam: `cordova`,
        });
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
        });

        expect(result.current).toBe(`Android`);
    });

    test(`returns "iOS" if ua QueryParam is cordovaios`, () => {
        useAuthfeStore.setState({
            uaParam: `cordovaios`,
        });
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
        });

        expect(result.current).toBe(`iOS`);
    });

    test(`returns "Browser" if ua QueryParam is not recognised`, () => {
        useAuthfeStore.setState({
            uaParam: `some-unknown-ua`,
        });
        const { result } = renderHook(() => usePlatform(), {
            wrapper,
        });

        expect(result.current).toBe(`Browser`);
    });
});
