import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const LazyDeeplink = lazy(() => import(/* webpackChunkName: "Deeplink" */"./Deeplink"));

export const Deeplink = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyDeeplink />
        </Suspense>
    )
}
