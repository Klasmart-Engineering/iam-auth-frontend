import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const LazyNoProfiles = lazy(() => import(/* webpackChunkName: "NoProfiles" */"./NoProfiles"));

export const NoProfiles = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyNoProfiles />
        </Suspense>
    )
}
