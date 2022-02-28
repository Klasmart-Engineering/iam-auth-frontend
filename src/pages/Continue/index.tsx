import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazyContinue = lazy(() => import(/* webpackChunkName: "Continue" */"./Continue"));

export const Continue = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyContinue />
        </Suspense>
    )
}
