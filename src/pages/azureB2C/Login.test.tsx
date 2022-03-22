import Login from "./Login";
import { transferAzureB2CToken } from "@/api/authentication";
import {
    URLContext,
    URLContextProvider,
} from "@/hooks";
import { fallbackLocale } from "@/locale";
import { ThemeProvider } from "@/providers";
import { decodeState } from "@/utils/azureB2C";
import {
    AccountInfo,
    AuthenticationResult,
    IPublicClientApplication,
    PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import {
    act,
    render,
    screen,
} from "@testing-library/react";
import {
    testAccount,
    testConfig,
    testTokenResponse,
} from "@tests/mocks/azureB2C";
import { defaultURLContext } from "@tests/providers";
import { flushPromises } from "@tests/utils";
import {
    createMemoryHistory,
    MemoryHistory,
} from "history";
import React from "react";
import { RawIntlProvider } from "react-intl";
import { Router } from "react-router-dom";

jest.mock(`@/api/authentication`, () => {
    return {
        transferAzureB2CToken: jest.fn(),
    };
});

describe(`Login`, () => {
    const mockTransferAzureB2CToken = transferAzureB2CToken as jest.MockedFunction<typeof transferAzureB2CToken>;

    const App = ({
        client, history, urlContext = defaultURLContext,
    }: {client: IPublicClientApplication; history: MemoryHistory; urlContext?: URLContext}): JSX.Element => {
        return (
            <MsalProvider instance={client}>
                <URLContextProvider value={urlContext}>
                    <RawIntlProvider value={fallbackLocale}>
                        <ThemeProvider locale="en">
                            <Router history={history}>
                                <Login />
                            </Router>
                        </ThemeProvider>
                    </RawIntlProvider>
                </URLContextProvider>
            </MsalProvider>
        );
    };

    const createClient = ({ acquireTokenSilentResult, activeAccount }: {acquireTokenSilentResult?: AuthenticationResult; activeAccount?: AccountInfo} = {}) => {
        const client = new PublicClientApplication(testConfig);
        client.loginRedirect = jest.fn().mockImplementation(() => Promise.resolve());
        client.acquireTokenSilent = jest.fn().mockImplementation(() => Promise.resolve(acquireTokenSilentResult));

        if (activeAccount) {
            client.getAllAccounts = () => [ testAccount ];
            client.setActiveAccount(testAccount);
        }

        return client as PublicClientApplication & {
            loginRedirect: jest.MockedFunction<PublicClientApplication["loginRedirect"]>;
            acquireTokenSilent: jest.MockedFunction<PublicClientApplication["acquireTokenSilent"]>;
        };
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe(`?idp QueryParam`, () => {
        describe(`if set`, () => {
            const idp = `Google`;

            describe(`and no account is logged in`, () => {
                it(`attempts a login`, async () => {
                    const history = createMemoryHistory({
                        initialEntries: [ `/signin?idp=${idp}` ],
                    });
                    const client = createClient();

                    render(<App
                        client={client}
                        history={history}
                           />);

                    expect(screen.getByRole(`progressbar`));

                    await act(flushPromises);

                    expect(client.acquireTokenSilent).not.toHaveBeenCalled();

                    expect(client.loginRedirect).toHaveBeenCalledTimes(1);
                    const request = client.loginRedirect.mock.calls[0][0];
                    expect(request?.domainHint).toEqual(idp);
                    expect(request?.extraQueryParameters?.idps).toEqual(idp);
                });
            });

            describe(`and an account is logged in`, () => {
                it(`attempts a login, ignoring the authenticated account`, async () => {
                    const history = createMemoryHistory({
                        initialEntries: [ `/signin?idp=${idp}` ],
                    });
                    const client = createClient({
                        activeAccount: testAccount,
                    });

                    render(<App
                            client={client}
                            history={history}
                           />);

                    expect(screen.getByRole(`progressbar`));

                    await act(flushPromises);

                    expect(client.acquireTokenSilent).not.toHaveBeenCalled();
                    expect(client.loginRedirect).toHaveBeenCalledTimes(1);
                    const request = client.loginRedirect.mock.calls[0][0];
                    expect(request?.domainHint).toEqual(idp);
                    expect(request?.extraQueryParameters?.idps).toEqual(idp);
                    expect(decodeState(request?.state ?? ``)).toEqual({
                        platform: `Browser`,
                    });
                });
            });

        });

        describe(`if not set`, () => {
            describe(`and no account is logged in`, () => {
                it(`attempts a login`, async () => {
                    const history = createMemoryHistory({
                        initialEntries: [ `/signin` ],
                    });
                    const client = createClient();

                    render(<App
                            client={client}
                            history={history}
                           />);

                    expect(screen.getByRole(`progressbar`));

                    await act(flushPromises);

                    expect(client.acquireTokenSilent).not.toHaveBeenCalled();
                    expect(client.loginRedirect).toHaveBeenCalledTimes(1);
                });
            });

            describe(`and an account is logged in`, () => {
                it.only(`acquires a token silently`, async () => {
                    const history = createMemoryHistory({
                        initialEntries: [ `/signin` ],
                    });
                    const client = createClient({
                        activeAccount: testAccount,
                        acquireTokenSilentResult: testTokenResponse,
                    });
                    mockTransferAzureB2CToken.mockResolvedValue(true);

                    render(<App
                            client={client}
                            history={history}
                           />);

                    expect(screen.getByRole(`progressbar`));

                    await act(flushPromises);

                    expect(client.loginRedirect).not.toHaveBeenCalled();
                    expect(client.acquireTokenSilent).toHaveBeenCalledTimes(1);
                    const request = client.acquireTokenSilent.mock.calls[0][0];
                    expect(request.redirectUri).toEqual(`${window.location.origin}/blank.html`);

                    expect(mockTransferAzureB2CToken).toHaveBeenCalledTimes(1);
                    expect(mockTransferAzureB2CToken.mock.calls[0][0]).toEqual(testTokenResponse.accessToken);
                    expect(history.location.pathname).toBe(`/selectprofile`);
                });
            });
        });
    });

    describe(`ua (platform)`, () => {
        describe(`if set`, () => {
            it(`is serialized in the B2C request state`, async () => {
                const history = createMemoryHistory({
                    initialEntries: [ `/signin?ua=cordovaios` ],
                });
                const client = createClient({
                    acquireTokenSilentResult: testTokenResponse,
                });

                render(<App
                            client={client}
                            history={history}
                            urlContext={{
                                ...defaultURLContext,
                                uaParam: `cordovaios`,
                            }}
                       />);

                expect(screen.getByRole(`progressbar`));

                await act(flushPromises);

                const request = client.loginRedirect.mock.calls[0][0];
                expect(decodeState(request?.state ?? ``)).toEqual({
                    platform: `iOS`,
                });
            });
        });

        describe(`if not set`, () => {
            it(`uses the default of Browser in the B2C request state`, async () => {
                const history = createMemoryHistory({
                    initialEntries: [ `/signin` ],
                });
                const client = createClient({
                    acquireTokenSilentResult: testTokenResponse,
                });

                render(<App
                            client={client}
                            history={history}
                            urlContext={{
                                ...defaultURLContext,
                                uaParam: null,
                            }}
                       />);

                expect(screen.getByRole(`progressbar`));

                await act(flushPromises);

                const request = client.loginRedirect.mock.calls[0][0];
                expect(decodeState(request?.state ?? ``)).toEqual({
                    platform: `Browser`,
                });
            });
        });
    });
});
