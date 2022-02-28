import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazyNotFound = lazy(() => import(/* webpackChunkName: "NotFound" */"./NotFound"));

export const NotFound = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyNotFound />
        </Suspense>
    )
}
