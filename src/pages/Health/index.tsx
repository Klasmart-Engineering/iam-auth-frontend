import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const LazyHealth = lazy(() => import(/* webpackChunkName: "Health" */"./Health"));

export const Health = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyHealth />
        </Suspense>
    )
}
