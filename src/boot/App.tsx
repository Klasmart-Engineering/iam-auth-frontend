import { Suspense } from "react";
import ReactDOM from "react-dom";

import config from "@/config";

import { Continue } from "@/pages/Continue";
import { Deeplink } from "@/pages/Deeplink";
import { Health } from "@/pages/Health";
import { Master as LayoutMaster } from "@/layouts/Master";
import { NotFound } from "@/pages/NotFound";
import SetProfile from "@/pages/profile/setProfileLayout";
import { RegionSelect } from "@/pages/RegionSelect";
import { RegionLocked } from "@/pages/RegionLocked";
import { SelectUser } from "@/pages/SelectUser";
import { Signin } from "@/pages/Signin";
import { Version } from "@/pages/Version";
import { AzureB2CLogin } from "@/pages/AzureB2CLogin";
import { NoProfiles } from "@/pages/NoProfiles";

import { GenericError } from "@/components/GenericError";
import { AzureB2CProvider } from "@/components/azureB2C";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
    CircularProgress
} from "@mui/material";

import { history } from "@/utils/createPreserveQueryHistory";
import {
    URLContextProvider,
    useLocale,
} from "@/hooks";
import { isSupportedLocale } from "@/locale";
import {
    ApolloProvider,
    IntlProvider,
    ThemeProvider,
} from "@/providers";
import { CssBaseline } from "@mui/material";
import React,
{
    useEffect,
    useMemo,
} from "react";
import { useCookies } from "react-cookie";
import {
    Route,
    Router,
    Switch,
} from "react-router-dom";

interface RouteDetails {
    path: string | string[];
    Component: () => JSX.Element;
    RouteComponent: typeof Route | typeof ProtectedRoute;
    size: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    centered?: boolean;
}

const routes: RouteDetails[] = [
    {
        path: `/Deeplink`,
        Component: Deeplink,
        RouteComponent: Route,
        size: `xs`,
        centered: true,
    },
    {
        path: [ `/selectprofile`, `/signinselect` ],
        Component: SelectUser,
        RouteComponent: ProtectedRoute,
        size: `xs`,
        centered: true,
    },
    {
        path: `/continue`,
        Component: Continue,
        // Must be unprotected while we have both B2C and KidsLoop sessions,
        // as at this point we only have a B2C session (so the `isAuthenticated` check fails)
        RouteComponent: Route,
        size: `xs`,
        centered: true,
    },
];

if (!config.azureB2C.enabled) {
    routes.push({
        path: [ `/signin`, `/login` ],
        Component: Signin,
        RouteComponent: Route,
        size: `xs`,
    });
}

if (config.branding.auth.showRegionSelect) {
    routes.push({
        path: `/region`,
        Component: RegionSelect,
        RouteComponent: Route,
        size: `sm`,
    });
}

export const App = () => {
    const memos = useMemo(() => {
        const url = new URL(window.location.href);
        const uaParam = url.searchParams.get(`ua`);
        const continueParam = url.searchParams.get(`continue`);
        const testing =
            url.hostname === `localhost` ||
            url.hostname === `0.0.0.0` ||
            url.hostname === `fe.kidsloop.net`;
        return {
            hostName: url.hostname,
            uaParam,
            continueParam,
            testing,
        };
    }, []);

    /**
     * Hierarchy of locale determination
     *
     * 1. ?locale= QueryParam (used for first load from mobile app)
     * 2. `locale` cookie
     *
     * The following should only be used on first load by a user, after which the `locale` cookie
     * will be set
     * 3. User's language browser preference
     * 4. Default locale for the deployment
     * 5. English
     */
    const [ locale, setLocale ] = useLocale();
    const [ cookies ] = useCookies([ `locale` ]);

    useEffect(() => {
        const localeParam = new URL(window.location.href).searchParams.get(`locale`);
        if (localeParam && isSupportedLocale(localeParam)) {
            setLocale(localeParam);
        } else if (cookies.locale === undefined) {
            // Set Cookies on a new user first loading the app
            setLocale(locale);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router history={history}>
            <URLContextProvider value={memos}>
                <ApolloProvider>
                    <AzureB2CProvider>
                        <IntlProvider locale={locale}>
                            <ThemeProvider locale={locale}>
                                <CssBaseline />
                                <Switch>
                                    <Route
                                        exact
                                        path="/version">
                                        <Version />
                                    </Route>
                                    <Route
                                        exact
                                        path="/health">
                                        <Health />
                                    </Route>
                                    <Route
                                        exact
                                        path="/error">
                                        <GenericError />
                                    </Route>
                                    <Route
                                        exact
                                        path="/no-profiles">
                                        <NoProfiles />
                                    </Route>
                                    {routes.map(({
                                        path,
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        Component,
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        RouteComponent,
                                        size,
                                        centered,
                                    }) => (
                                        <RouteComponent
                                            key={Array.isArray(path) ? path[0] : path}
                                            path={path}>
                                            {() => (
                                                <LayoutMaster
                                                    maxWidth={size}
                                                    centered={centered}
                                                >
                                                    <Component />
                                                </LayoutMaster>
                                            )}
                                        </RouteComponent>
                                    ))}
                                    {/* NB: must be two separate conditional <Route> expressions, otherwise the Router doesn't recognise them */}
                                    {config.azureB2C.enabled && <Route
                                        path={[ `/login`, `/signin` ]}
                                        component={AzureB2CLogin}/>}
                                    {config.azureB2C.enabled && <Route path="/authentication-callback">
                                        <CircularProgress size={80} />
                                    </Route>}
                                    <ProtectedRoute path="/createprofile">
                                        <SetProfile />
                                    </ProtectedRoute>
                                    <Route
                                        exact
                                        path="/">
                                        {config.branding.auth.showRegionSelect ? (
                                            <LayoutMaster maxWidth={`sm`}>
                                                <RegionSelect />
                                            </LayoutMaster>
                                        ) : (
                                            <RegionLocked />
                                        )}
                                    </Route>
                                    <Route>
                                        <LayoutMaster
                                            maxWidth={`xs`}
                                            centered>
                                            <NotFound />
                                        </LayoutMaster>
                                    </Route>
                                </Switch>
                            </ThemeProvider>
                        </IntlProvider>
                    </AzureB2CProvider>
                </ApolloProvider>
            </URLContextProvider>
        </Router>
    );
}