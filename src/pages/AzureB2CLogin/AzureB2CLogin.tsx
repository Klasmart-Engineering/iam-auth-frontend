import React from "react";
import { AuthenticationFailed } from "@/components/azureB2C";
import { useRedirectRequest } from "@/hooks";
import { AzureB2CLoggedin } from "@/pages/AzureB2CLoggedin";
import { InteractionType } from "@azure/msal-browser";
import {
    MsalAuthenticationResult,
    MsalAuthenticationTemplate,
} from "@azure/msal-react";
import {
    CircularProgress
} from "@mui/material";

const Loading = () =>  <CircularProgress size={80} />

export default () => {
    const authenticationRequest = useRedirectRequest();

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            errorComponent={AuthenticationFailed}
            loadingComponent={Loading}
            authenticationRequest={authenticationRequest}
            // eslint-disable-next-line react/no-children-prop
            children={(response: MsalAuthenticationResult) => {
                return <AzureB2CLoggedin {...response}/>;
            }}
        />
    );
}
