import "@babel/polyfill";
import "regenerator-runtime/runtime";
import "node-source-han-sans-sc/SourceHanSansSC-Regular-all.css";
import "typeface-nanum-square-round";
import { ApolloProviderHOC } from "./apolloProvider";
import config from "./config";
import { getLanguage } from "./locale/locale";
import { Continue } from "./pages/continue";
import { DeepLink } from "./pages/deeplink";
import { Layout } from "./pages/layout";
import { NotFound } from "./pages/notFound";
import SetProfile from "./pages/profile/setProfileLayout";
import RegionLocked from "./pages/RegionLocked";
import { RegionSelect } from "./pages/regionSelect";
import { SelectUser } from "./pages/selectUser";
import { SignIn } from "./pages/signin";
import { themeProvider } from "./themeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React,
{ useMemo } from "react";
import { useCookies } from "react-cookie";
import * as ReactDOM from "react-dom";
import { RawIntlProvider } from "react-intl";
import {
    HashRouter,
    Route,
    Switch,
} from "react-router-dom";

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
    {
        path: `/deeplink`,
        Component: DeepLink,
        size: `xs`,
        centerLogo: true,
    },
    {
        path: `/selectprofile`,
        Component: SelectUser,
        size: `xs`,
        centerLogo: true,
    },
    {
        path: `/signinselect`,
        Component: SelectUser,
        size: `xs`,
        centerLogo: true,
    },
    {
        path: `/signin`,
        Component: SignIn,
        size: `xs`,
        centerLogo: false,
    },
    {
        path: `/login`,
        Component: SignIn,
        size: `xs`,
        centerLogo: false,
    },
    {
        path: `/continue`,
        Component: Continue,
        size: `xs`,
        centerLogo: true,
    },
];

if (config.branding.auth.showRegionSelect) {
    routes.push({
        path: `/region`,
        Component: RegionSelect,
        size: `sm`,
        centerLogo: false,
    });
}

function ClientSide () {
    const memos = useMemo(() => {
        const url = new URL(window.location.href);
        const locale = url.searchParams.get(`locale`);
        const uaParam = url.searchParams.get(`ua`);
        const continueParam = url.searchParams.get(`continue`);
        const testing =
            url.hostname === `localhost` ||
            url.hostname === `0.0.0.0` ||
            url.hostname === `fe.kidsloop.net`;
        return {
            hostName: url.hostname,
            locale,
            uaParam,
            continueParam,
            testing,
        };
    }, []);

    const [ cookies, setCookies ] = useCookies([ `locale` ]);
    const languageCode = cookies.locale ?? memos.locale ?? `en`;
    if (memos.locale && !cookies.locale) {
        const cookieDomain = process.env.SLD + `.` + process.env.TLD;
        setCookies(`locale`, languageCode, {
            path: `/`,
            domain: cookieDomain || `kidsloop.live`,
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
                            {routes.map(({
                                // eslint-disable-next-line @typescript-eslint/naming-convention
                                path, Component, size, centerLogo,
                            }) => (
                                <Route
                                    key={path}
                                    path={path}>
                                    {() => (
                                        <Layout
                                            maxWidth={size}
                                            centerLogo={centerLogo}
                                        >
                                            <Component />
                                        </Layout>
                                    )}
                                </Route>
                            ))}
                            <Route path="/createprofile">
                                <SetProfile />
                            </Route>
                            <Route
                                exact
                                path="/">
                                {config.branding.auth.showRegionSelect ? (
                                    <Layout maxWidth={`sm`}>
                                        <RegionSelect />
                                    </Layout>
                                ) : (
                                    <RegionLocked />
                                )}
                            </Route>
                            <Route>
                                <Layout
                                    maxWidth={`xs`}
                                    centerLogo={true}>
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

async function main () {
    const div = document.getElementById(`app`);
    ReactDOM.render(<HashRouter>
        <ClientSide />
    </HashRouter>, div);
}

main();
