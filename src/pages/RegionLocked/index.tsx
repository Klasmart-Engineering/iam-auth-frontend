import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";

const LazyRegionLocked = lazy(() => import(/* webpackChunkName: "RegionLocked" */"./RegionLocked"));

export const RegionLocked = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyRegionLocked />
        </Suspense>
    )
}
