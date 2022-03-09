
import {
    AuthenticationFailed,
    AuthorizationCodeAuthenticationTemplate,
} from "@/components/azureB2C";
import Loading from "@/components/Loading";
import {
    useRedirectRequest,
    useSearchParams,
} from "@/hooks";
import LoggedIn from "@/pages/azureB2C/LoggedIn";
import { InteractionType } from "@azure/msal-browser";
import {
    MsalAuthenticationResult,
    MsalAuthenticationTemplate,
} from "@azure/msal-react";
import React from "react";

export default function Login () {
    const [ params ] = useSearchParams();
    const authenticationRequest = useRedirectRequest();

    const authorizationCode = params.get(`code`);

    if (authorizationCode) {
        // ATH-241
        // The `MsalAuthenticationTemplate` first checks if a user is logged in.
        // If yes, fetches a new `access_token` and renders `children`
        // If no, performs a login, then fetches the `access_token` as above

        // This flow is undesirable for federated sign ins, because if the user was already logged in
        // (potentially with another account), the `code` QueryParam for the OAuth2 Authorization
        // code flow is ignored, and skips straight to fetching an `access_token` (for the previously
        // logged in account!)
        // Flow explanation: https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow
        // B2C-specific flow documentation: https://docs.microsoft.com/en-us/azure/active-directory-b2c/authorization-code-flow

        // To avoid this, we use a modified version of the `MsalAuthenticationTemplate` which
        // ignores any currently authenticated user, and always attempts a fresh login

        // The default `redirectStartPage` is window.location.href
        // This results in an infinite login loop, because the `?code` QueryParam is always present
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.delete(`code`);

        return <AuthorizationCodeAuthenticationTemplate
            authenticationRequest={{
                ...authenticationRequest,
                redirectStartPage: currentURL.toString(),
            }}
            errorComponent={AuthenticationFailed}
            loadingComponent={Loading}
            // eslint-disable-next-line react/no-children-prop
            children={(response: MsalAuthenticationResult) => {return <LoggedIn {...response}/>;}}/>;
    }

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            errorComponent={AuthenticationFailed}
            loadingComponent={Loading}
            authenticationRequest={authenticationRequest}
            // eslint-disable-next-line react/no-children-prop
            children={(response: MsalAuthenticationResult) => {return <LoggedIn {...response}/>;}}
        />
    );
}
