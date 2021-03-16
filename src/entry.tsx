import "@babel/polyfill";
import "regenerator-runtime/runtime";

import "node-source-han-sans-sc/SourceHanSansSC-Regular-all.css";
import "typeface-nanum-square-round";
// import "./assets/css/index.min.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { Context, createContext, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";
import { RawIntlProvider } from "react-intl";
import { HashRouter, Route, Switch } from "react-router-dom";
import { themeProvider } from "./themeProvider";
import { SignIn } from "./pages/signin";
import { getLanguage } from "./locale/locale";
import { Continue } from "./pages/continue";
import { Layout } from "./pages/layout";
import { NotFound } from "./pages/notFound";
import { redirectIfUnauthorized } from "./utils/accountUtils";
import { DeepLink } from "./pages/deeplink";
import Cookies, { useCookies } from "react-cookie";
import { useEffect } from "react";
import { ApolloProviderHOC } from "../apolloProvider";
import { SelectUser } from "./pages/selectUser";
import SetProfile from "./pages/profile/setProfileLayout";
import { RegionSelect } from "./pages/regionSelect";

interface URLContext {
    hostName: string;
    locale: string | null;
    uaParam: string | null;
    continueParam: string | null;
    testing: boolean;
}

export const URLContext = React.createContext<Partial<URLContext>>({});

interface RouteDetails {
    path: string;
    Component: () => JSX.Element;
    size: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    centerLogo: boolean;
}

const routes: RouteDetails[] = [
    { path: "/region", Component: RegionSelect, size: "sm", centerLogo: false },
    { path: "/deeplink", Component: DeepLink, size: "xs", centerLogo: true },
    { path: "/selectprofile", Component: SelectUser, size: "xs", centerLogo: true },
    { path: "/signinselect", Component: SelectUser, size: "xs", centerLogo: true },
    { path: "/signin", Component: SignIn, size: "xs", centerLogo: false },
    { path: "/login", Component: SignIn, size: "xs", centerLogo: false },
    { path: "/continue", Component: Continue, size: "xs", centerLogo: true },
]

function ClientSide() {
    const memos = useMemo(() => {
        const url = new URL(window.location.href);
        console.log("url", url);
        const locale = url.searchParams.get("iso");
        console.log("iso", locale);
        const uaParam = url.searchParams.get("ua");
        console.log("ua", uaParam);
        const continueParam = url.searchParams.get("continue");
        console.log("ua", continueParam);
        const testing = (url.hostname === "localhost" || url.hostname === "0.0.0.0");
        console.log("testing", testing);
        return { hostName: url.hostname, locale, uaParam, continueParam, testing };
    }, []);

    const [cookies, setCookies] = useCookies(["locale"]);
    const languageCode = memos.locale ?? cookies.locale ?? "en";
    if (memos.locale !== cookies.locale) {
        const cookieDomain = process.env.SLD + "." + process.env.TLD;
        setCookies(`locale`, languageCode ?? memos.locale, {
            path: `/`,
            domain: cookieDomain || `kidsloop.net`,
        });
    }
    const locale = getLanguage(languageCode);

    return (
        <URLContext.Provider value={memos}>
            <ApolloProviderHOC>
                <RawIntlProvider value={locale}>
                    <ThemeProvider theme={themeProvider()}>
                        <CssBaseline />
                            <Switch>
                                { routes.map(({ path, Component, size, centerLogo }) => (
                                    <Route key={path} path={path}>
                                        {({ match }) => (
                                            <Layout maxWidth={size} centerLogo={centerLogo}>
                                                <Component />
                                            </Layout>
                                        )}
                                    </Route>
                                ))}
                                <Route path="/createprofile">
                                    <SetProfile />
                                </Route>
                                <Route exact path="/">
                                    <Layout maxWidth={"sm"}>
                                        <RegionSelect />
                                    </Layout>
                                </Route>
                                <Route>
                                    <Layout maxWidth={"xs"} centerLogo={true}>
                                        <NotFound />
                                    </Layout>
                                </Route>
                            </Switch>
                    </ThemeProvider>
                </RawIntlProvider>
            </ApolloProviderHOC>
        </URLContext.Provider>
    );
}

async function main() {
    const div = document.getElementById("app");
    ReactDOM.render(
        <HashRouter>
            <ClientSide />
        </HashRouter>,
        div);
}

main();
