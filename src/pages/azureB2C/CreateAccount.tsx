
import Loading from "@/components/Loading";
import AuthenticationFailed from "@/pages/azureB2C/AuthenticationFailed";
import { loginRequest } from "@/pages/azureB2C/client";
import LoggedIn from "@/pages/azureB2C/LoggedIn";
import { InteractionType } from "@azure/msal-browser";
import {
    MsalAuthenticationResult,
    MsalAuthenticationTemplate,
} from "@azure/msal-react";
import React from "react";

export default function CreateAccount () {
    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            errorComponent={AuthenticationFailed}
            loadingComponent={Loading}
            authenticationRequest={loginRequest}
            // eslint-disable-next-line react/no-children-prop
            children={(response: MsalAuthenticationResult) => {return <LoggedIn {...response}/>;}}
        />
    );
}
