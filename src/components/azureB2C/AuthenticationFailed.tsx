import GenericError from "@/components/GenericError";
import { MsalAuthenticationResult } from "@azure/msal-react";
import React,
{ useEffect } from "react";

export default function AuthenticationFailed ({ error }: Pick<MsalAuthenticationResult, "error">) {
    useEffect(() => {
        console.error(error);
    }, [ error ]);

    return (
        <GenericError
            errorTitle="authentication.error.generic.title"
            errorBody="authentication.error.generic.body"
        />
    );
}
