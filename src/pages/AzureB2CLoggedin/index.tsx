import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";
import { MsalAuthenticationResult } from "@azure/msal-react";

const LazyAzureB2CLoggedin = lazy(() => import(/* webpackChunkName: "AzureB2CLoggedin" */"./AzureB2CLoggedin"));

export const AzureB2CLoggedin = (props: MsalAuthenticationResult) => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyAzureB2CLoggedin {...props} />
        </Suspense>
    )
}
