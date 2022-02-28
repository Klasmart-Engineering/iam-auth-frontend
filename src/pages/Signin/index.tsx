import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazySignin = lazy(() => import(/* webpackChunkName: "Signin" */"./Signin"));

export const Signin = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazySignin />
        </Suspense>
    )
}
