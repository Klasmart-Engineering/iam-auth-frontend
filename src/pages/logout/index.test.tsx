import Logout from "./index";
import { signOut } from "@/api/authentication";
import config from "@/config";
import {
    IPublicClientApplication,
    PublicClientApplication,
} from "@azure/msal-browser";
import {
    act,
    render as rtlRender,
    screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    testAccount,
    testConfig,
    testFederatedAccount,
} from "@tests/mocks/azureB2C";
import {
    withIntlProvider,
    withMsalProvider,
    withRouter,
} from "@tests/providers";
import { flushPromises } from "@tests/utils";
import { createMemoryHistory } from "history";
import React from "react";

jest.mock(`@/api/authentication`, () => ({
    signOut: jest.fn(),
}));

describe(`Logout`, () => {
    const createMockMsalClient = () => {
        const msalClient = new PublicClientApplication(testConfig);
        msalClient.logoutRedirect = jest.fn().mockImplementation(() => Promise.resolve());

        return msalClient as PublicClientApplication & {logoutRedirect: jest.MockedFunction<IPublicClientApplication["logoutRedirect"]>};
    };

    const render = (client?: PublicClientApplication) => {
        const history = createMemoryHistory({
            initialEntries: [ `/logout` ],
        });

        const msalClient = client ?? createMockMsalClient();

        const view = rtlRender(withMsalProvider(withRouter(withIntlProvider(<Logout/>), history), msalClient));
        return {
            ...view,
            history,
            msalClient,
        };
    };

    const mockSignOut = signOut as jest.MockedFunction<() => Promise<boolean>>;
    let isB2CEnabled: boolean;

    beforeAll(() => {
        isB2CEnabled = config.azureB2C.enabled;
        config.azureB2C.enabled = true;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        // Workaround for issue with 'muted' property not being treated as a default attribute
        // see: https://github.com/testing-library/react-testing-library/issues/470
        Object.defineProperty(HTMLMediaElement.prototype, `muted`, {
            set: jest.fn(),
        });
    });

    afterAll(() => {
        config.azureB2C.enabled = isB2CEnabled;
    });

    describe(`if auth-server /signout fails`, () => {
        it(`shows the error page`, async () => {
            mockSignOut.mockResolvedValue(false);

            render();

            await act(flushPromises);

            expect(screen.getByTestId(`error-body`)).toBeInTheDocument();
            expect(mockSignOut).toHaveBeenCalledTimes(1);
        });

        describe(`and the user retries`, () => {
            it(`makes another logout attempt`, async () => {
                mockSignOut.mockResolvedValue(false);

                render();

                // First attempt
                await act(flushPromises);
                expect(screen.getByTestId(`error-body`)).toBeInTheDocument();

                // Second attempt
                userEvent.click(screen.getByTestId(`retry-button`));

                expect(screen.getByRole(`progressbar`)).toBeInTheDocument();

                await act(flushPromises);

                expect(screen.getByTestId(`error-body`)).toBeInTheDocument();
                expect(mockSignOut).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe(`if auth-server /signout succeeds`, () => {
        describe(`and B2C is not enabled`, () => {
            afterEach(() => {
                config.azureB2C.enabled = true;
            });

            it(`redirects to /`, async () => {
                config.azureB2C.enabled = false;
                mockSignOut.mockResolvedValue(true);

                const { history } = render();

                await act(flushPromises);

                expect(history.location.pathname).toBe(`/`);
            });
        });

        describe(`and the user has no B2C session`, () => {
            let consoleSpy: jest.SpyInstance<void>;
            beforeEach(() => {
                consoleSpy = jest.spyOn(console, `log`).mockImplementation();
            });

            it(`redirects to /`, async () => {
                mockSignOut.mockResolvedValue(true);
                const client = createMockMsalClient();
                client.getAllAccounts = () => [];
                client.setActiveAccount(null);

                const { history } = render(client);

                await act(flushPromises);

                expect(history.location.pathname).toBe(`/`);
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe(`and the user has a B2C session`, () => {
            describe(`and there is no "idp" claim`, () => {
                let consoleSpy: jest.SpyInstance<void>;
                beforeEach(() => {
                    consoleSpy = jest.spyOn(console, `warn`).mockImplementation();
                });

                it(`logs out of B2C, with the post_redirect_logout_uri set to /`, async () => {
                    mockSignOut.mockResolvedValue(true);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { idTokenClaims, ...account } = testAccount;
                    const msalClient = createMockMsalClient();
                    msalClient.getAllAccounts = () => [ account ];
                    msalClient.setActiveAccount(account);

                    render(msalClient);

                    await act(flushPromises);

                    expect(msalClient.logoutRedirect).toHaveBeenCalledTimes(1);
                    expect(msalClient.logoutRedirect.mock.calls[0][0]?.postLogoutRedirectUri).toBe(config.server.origin);
                    expect(consoleSpy).toHaveBeenCalledTimes(1);
                });
            });

            describe(`and the user is logged in with the Kidsloop IDP`, () => {
                describe(`and there is no ?continue QueryParam`, () => {
                    it(`logs out of B2C, with the post_redirect_logout_uri set to /`, async () => {
                        mockSignOut.mockResolvedValue(true);
                        const msalClient = createMockMsalClient();
                        msalClient.getAllAccounts = () => [ testAccount ];
                        msalClient.setActiveAccount(testAccount);

                        render(msalClient);

                        await act(flushPromises);

                        expect(msalClient.logoutRedirect).toHaveBeenCalledTimes(1);
                        expect(msalClient.logoutRedirect.mock.calls[0][0]?.postLogoutRedirectUri).toBe(config.server.origin);
                    });
                });

                describe(`and there is a ?continue QueryParam`, () => {
                    const continueParam = encodeURIComponent(`https://hub.kidsloop.test/#/some/route`);

                    beforeEach(() => {
                        global.window = Object.create(window);
                        Object.defineProperty(window, `location`, {
                            value: {
                                href: `https://auth.kidsloop.test/logout?continue=${continueParam}`,
                            },
                            writable: true,
                        });
                    });

                    it(`logs out of B2C, with the post_redirect_logout_uri set to /?continue={continueParam}`, async () => {
                        mockSignOut.mockResolvedValue(true);
                        const msalClient = createMockMsalClient();
                        msalClient.getAllAccounts = () => [ testAccount ];
                        msalClient.setActiveAccount(testAccount);

                        render(msalClient);

                        await act(flushPromises);

                        expect(msalClient.logoutRedirect).toHaveBeenCalledTimes(1);
                        expect(msalClient.logoutRedirect.mock.calls[0][0]?.postLogoutRedirectUri).toBe(`${config.server.origin}?continue=${continueParam}`);
                    });
                });
            });

            describe(`and the user is logged in with a 3rd party IDP`, () => {
                it(`logs out of B2C, with the post_redirect_logout_uri set to /logout/success`, async () => {
                    mockSignOut.mockResolvedValue(true);
                    const msalClient = createMockMsalClient();
                    msalClient.getAllAccounts = () => [ testFederatedAccount ];
                    msalClient.setActiveAccount(testFederatedAccount);

                    render(msalClient);

                    await act(flushPromises);

                    expect(msalClient.logoutRedirect).toHaveBeenCalledTimes(1);
                    expect(msalClient.logoutRedirect.mock.calls[0][0]?.postLogoutRedirectUri).toBe(`${config.server.origin}/logout/success`);
                });
            });

            describe(`and the logout throws an error`, () => {
                let consoleSpy: jest.SpyInstance<void>;
                beforeEach(() => {
                    consoleSpy = jest.spyOn(console, `error`).mockImplementation();
                });

                it(`shows the retry page`, async () => {
                    mockSignOut.mockResolvedValue(true);
                    const msalClient = createMockMsalClient();
                    msalClient.getAllAccounts = () => [ testAccount ];
                    msalClient.setActiveAccount(testAccount);
                    msalClient.logoutRedirect.mockImplementationOnce(() => {throw new Error(`Something went wrong`);});

                    render(msalClient);

                    await act(flushPromises);

                    expect(msalClient.logoutRedirect).toHaveBeenCalledTimes(1);
                    expect(consoleSpy).toHaveBeenCalledTimes(1);
                    expect(screen.getByTestId(`error-body`)).toBeInTheDocument();
                });
            });
        });

    });
});
