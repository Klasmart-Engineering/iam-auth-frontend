
import { AuthenticationFailed } from "@/components/azureB2C";
import Loading from "@/components/Loading";
import { usePlatform } from "@/hooks";
import useContinueParam from "@/hooks/useContinueParam";
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
    const continueParam = useContinueParam();

    const authenticationRequest: RedirectRequest = {
        ...loginRequest,
        state: encodeState({
            platform,
            continue: continueParam,
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
