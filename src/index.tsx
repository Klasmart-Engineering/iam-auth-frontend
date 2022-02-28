import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import { Stack, CircularProgress } from "@mui/material";

const LazyApp = lazy(async () => {
    return import("@/boot/App").then(({ App }) => ({
        default: App
    }));
});

render(
    <Suspense fallback={
        <Stack
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Stack>
    }>
        <LazyApp />
    </Suspense>    
, document.getElementById(`app`));
