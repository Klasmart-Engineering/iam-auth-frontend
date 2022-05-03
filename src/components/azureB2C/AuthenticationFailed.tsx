import GenericError from "@/components/GenericError";
import { tracing } from "@/utils/tracing";
import { MsalAuthenticationResult } from "@azure/msal-react";
import React,
{ useEffect } from "react";

export default function AuthenticationFailed ({ error }: Pick<MsalAuthenticationResult, "error">) {
    useEffect(() => {
        console.error(error);
        tracing.error(error);
    }, [ error ]);

    return (
        <GenericError />
    );
}
