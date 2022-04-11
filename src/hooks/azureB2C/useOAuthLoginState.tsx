import {
    decodeLoginState,
    OAuthLoginState,
} from "@/utils/azureB2C";
import { MsalAuthenticationResult } from "@azure/msal-react";
import { useMemo } from "react";

// See https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/926f1c2ba0598575e23dfd8cdd8b79fa3a3d19ff/lib/msal-core/docs/FAQ.md#how-do-i-pass-custom-state-parameter-value-in-msaljs-authentication-request-for-example-when-you-want-to-pass-the-page-the-user-is-on-or-custom-info-to-your-redirect_uri
// for context on why this is necessary
export default function useOAuthLoginState (authenticationResult: MsalAuthenticationResult["result"]): OAuthLoginState | undefined {
    return useMemo(() => {
        const encodedState = authenticationResult?.state;

        return encodedState ? decodeLoginState(encodedState) : undefined;
    }, [ authenticationResult?.state ]);
}
