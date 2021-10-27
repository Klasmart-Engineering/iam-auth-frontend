import { Layout } from "@/pages/layout";
import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loading () {
    return (
        <Layout maxWidth={`sm`}>
            <CircularProgress size={`5rem`}/>
        </Layout>
    );
}
