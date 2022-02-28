import React, { lazy, Suspense } from "react"
import { CircularProgress } from "@mui/material";
export * from "./RegionSelect";

const LazyRegionSelect = lazy(() => import(/* webpackChunkName: "RegionSelect" */"./RegionSelect"));

export const RegionSelect = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <LazyRegionSelect />
        </Suspense>
    )
}
