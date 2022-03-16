import { useIsFederatedAccount } from "@/hooks/azureB2C";
import {
    AccountInfo,
    PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
    testAccount,
    testConfig,
    testFederatedAccount,
} from "@tests/mocks/azureB2C";
import React from "react";

describe(`useIsFederatedAccount`, () => {
    const createClient = ({ activeAccount }: { activeAccount: AccountInfo | null}) => {
        const msalClient = new PublicClientApplication(testConfig);
        const handleRedirectSpy = jest.spyOn(msalClient, `handleRedirectPromise`);
        jest.spyOn(msalClient, `getActiveAccount`).mockReturnValue(activeAccount);

        return {
            msalClient,
            waitForInitialization: () => waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1)),
        };
    };

    it(`when there is no active B2C session returns undefined`, async () => {
        const { msalClient, waitForInitialization } = createClient({
            activeAccount: null,
        });

        const { result } = renderHook(() => useIsFederatedAccount(), {
            wrapper: ({ children }) => <MsalProvider instance={msalClient}>{children}</MsalProvider>,
        });

        await waitForInitialization();

        expect(result.current).toBeUndefined();
    });

    it(`when the active B2C session has a KidsLoop IDP returns false`, async () => {
        const { msalClient, waitForInitialization } = createClient({
            activeAccount: testAccount,
        });

        const { result } = renderHook(() => useIsFederatedAccount(), {
            wrapper: ({ children }) => <MsalProvider instance={msalClient}>{children}</MsalProvider>,
        });

        await waitForInitialization();

        expect(result.current).toBe(false);
    });

    it(`when the active B2C session has a federated IDP returns true`, async () => {
        const { msalClient, waitForInitialization } = createClient({
            activeAccount: testFederatedAccount,
        });

        const { result } = renderHook(() => useIsFederatedAccount(), {
            wrapper: ({ children }) => <MsalProvider instance={msalClient}>{children}</MsalProvider>,
        });

        await waitForInitialization();

        expect(result.current).toBe(true);
    });
});
