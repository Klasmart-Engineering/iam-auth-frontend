import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazySelectUser = lazy(() => import(/* webpackChunkName: "SelectUser" */"./SelectUser"));

export const SelectUser = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazySelectUser />
        </Suspense>
    )
}
