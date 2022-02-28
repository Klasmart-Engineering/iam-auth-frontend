import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazyVersion = lazy(() => import(/* webpackChunkName: "Version" */"./Version"));

export const Version = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyVersion />
        </Suspense>
    )
}
