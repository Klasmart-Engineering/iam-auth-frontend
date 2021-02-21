import "@babel/polyfill";
import "regenerator-runtime/runtime";

import "node-source-han-sans-sc/SourceHanSansSC-Regular-all.css";
import "typeface-nanum-square-round";
// import "./assets/css/index.min.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useMemo, useState } from "react";
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

const routes = [
    { path: "/selectprofile", Component: SelectUser },
    { path: "/signinselect", Component: SelectUser },
    { path: "/signin", Component: SignIn },
    { path: "/login", Component: SignIn },
    { path: "/continue", Component: Continue },
    { path: "/", Component: SignIn },
]

function ClientSide() {
    const memos = useMemo(() => {
        const url = new URL(window.location.href);
        const locale = url.searchParams.get("iso");
        return { hostName: url.hostname, locale };
    }, []);

    const testing = memos.hostName === "localhost" || memos.hostName === "0.0.0.0";
    if (!testing) {
        redirectIfUnauthorized();
    }

    const [cookies] = useCookies(["locale"]);
    const languageCode = memos.locale ?? cookies.locale ?? "en";
    const locale = getLanguage(languageCode);

    return (
        <ApolloProviderHOC>
            <RawIntlProvider value={locale}>
                <ThemeProvider theme={themeProvider()}>
                    <CssBaseline />
                        <Switch>
                            { routes.map(({ path, Component }) => (
                                <Route key={path} exact path={path}>
                                    {({ match }) => (
                                        <Layout centerLogo={path === "/continue" || path === "/signinselect" || path === "/selectprofile" }>
                                            <Component />
                                        </Layout>
                                    )}
                                </Route>
                            ))}
                            <Route path="/createprofile">
                                <SetProfile />
                            </Route>
                            <Route exact path="/deeplink">
                                <Layout centerLogo={true}>
                                    <DeepLink />
                                </Layout>
                            </Route>
                            <Route>
                                <Layout centerLogo={true}>
                                    <NotFound />
                                </Layout>
                            </Route>
                        </Switch>
                </ThemeProvider>
            </RawIntlProvider>
        </ApolloProviderHOC>
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
