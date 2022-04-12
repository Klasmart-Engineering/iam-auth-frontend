import { useOAuthLogoutState } from '@/hooks';
import {
    encodeState,
    OAuthLogoutState,
} from '@/utils/azureB2C';
import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import React from "react";
import { Router } from 'react-router';

describe(`useOAuthLogoutState`, () => {
    const wrapper = ({ path, children }: {path: string; children?: React.ReactNode}) => {
        const history = createMemoryHistory({
            initialEntries: [ path ],
        });
        return <Router history={history}>{children}</Router>;
    };
    describe(`no ?state Query Param`, () => {
        it(`returns undefined`, () => {
            const { result } = renderHook(() => useOAuthLogoutState(), {
                wrapper,
                initialProps: {
                    path: `/logout/success`,
                },
            });

            expect(result.current).toBeUndefined();
        });
    });

    describe(`?state Query Param`, () => {
        describe(`is valid`, () => {
            it(`returns decoded OAuthLogoutState object`, () => {
                const state: OAuthLogoutState = {
                    identityProvider: `MCB`,
                };

                const { result } = renderHook(() => useOAuthLogoutState(), {
                    wrapper,
                    initialProps: {
                        path: `/logout/success?state=${encodeState(state)}`,
                    },
                });

                expect(result.current).toEqual(state);
            });
        });

        describe(`is invalid`, () => {
            it(`returns undefined`, () => {
                const { result } = renderHook(() => useOAuthLogoutState(), {
                    wrapper,
                    initialProps: {
                        path: `/logout/success?state=abcde`,
                    },
                });

                expect(result.current).toBeUndefined();
            });
        });
    });
});
