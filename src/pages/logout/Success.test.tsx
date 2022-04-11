import Success from "./Success";
import { fallbackLocale } from "@/locale";
import {
    encodeState,
    OAuthLogoutState,
} from "@/utils/azureB2C";
import {
    render,
    screen,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { RawIntlProvider } from "react-intl";
import { Router } from "react-router";

describe(`/logout/success`, () => {
    describe(`when OAuthState includes an "identityProvider" property`, () => {
        it(`shows a message to return to the identity provider`, () => {
            const state: OAuthLogoutState = {
                identityProvider: `MCB`,
            };
            const history = createMemoryHistory({
                initialEntries: [ `/logout/success?state=${encodeState(state)}` ],
            });

            render(<Router history={history}>
                <RawIntlProvider value={fallbackLocale}>
                    <Success />
                </RawIntlProvider>
            </Router>);

            expect(screen.getByText(/Please close this window and return to MCB./)).toBeInTheDocument();
        });

    });

    describe(`when no OAuthState is provided`, () => {
        it(`shows a message to close the window`, () => {
            render(<Router history={createMemoryHistory()}>
                <RawIntlProvider value={fallbackLocale}>
                    <Success />
                </RawIntlProvider>
            </Router>);

            expect(screen.getByText(/Please close this window./)).toBeInTheDocument();
        });
    });
});
