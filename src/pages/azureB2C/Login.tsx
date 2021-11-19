
import { AuthenticationFailed } from "@/components/azureB2C";
import Loading from "@/components/Loading";
import { usePlatform } from "@/hooks";
import LoggedIn from "@/pages/azureB2C/LoggedIn";
import {
    encodeState,
    loginRequest,
} from "@/utils/azureB2C";
import {
    InteractionType,
    RedirectRequest,
} from "@azure/msal-browser";
import {
    MsalAuthenticationResult,
    MsalAuthenticationTemplate,
} from "@azure/msal-react";
import React from "react";

export default function Login () {
    const platform = usePlatform();

    const authenticationRequest: RedirectRequest = {
        ...loginRequest,
        state: encodeState({
            platform,
        }),
    };

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
