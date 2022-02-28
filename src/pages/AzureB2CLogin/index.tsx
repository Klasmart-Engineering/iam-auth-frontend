import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazyAzureB2CLogin = lazy(() => import(/* webpackChunkName: "AzureB2CLogin" */"./AzureB2CLogin"));

export const AzureB2CLogin = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyAzureB2CLogin />
        </Suspense>
    )
}
