import { AuthenticationFailed } from "@/components/azureB2C";
import ForceAuthenticationTemplate from "@/components/azureB2C/ForceAuthenticationTemplate";
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

const renderChildren = (response: MsalAuthenticationResult) => {return <LoggedIn {...response} />;};

export default function Login () {
    const [ params ] = useSearchParams();
    const idp = params.get(`idp`) || undefined;

    const authenticationRequest = useRedirectRequest({
        idp,
    });

    if (!idp) {
        return (
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                errorComponent={AuthenticationFailed}
                loadingComponent={Loading}
                authenticationRequest={authenticationRequest}
                // eslint-disable-next-line react/no-children-prop
                children={renderChildren}
            />
        );
    }

    return (
        <ForceAuthenticationTemplate
            errorComponent={AuthenticationFailed}
            loadingComponent={Loading}
            authenticationRequest={authenticationRequest}
            // eslint-disable-next-line react/no-children-prop
            children={renderChildren}
        />
    );
}
