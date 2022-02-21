import config from "../config";
import { useCookies } from "@/hooks/useCookies";
import React from "react";
import { Redirect } from "react-router";

function RegionLocked () {
    const [ cookies, setCookies ] = useCookies([ `locale` ]);
    const language = cookies?.locale ?? config.branding.defaultLocale;

    // Usually locale is set as part of RegionSelect, so if the region is locked
    // we need to set cookies before they are sent to Sign In
    setCookies(`locale`, language, {
        path: `/`,
        domain: config.server.domain,
    });
    return <Redirect to={{
        pathname: `/signin`,
    }} />;
}

export default RegionLocked;
