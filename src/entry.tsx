import config from "./config";
import { initializeFirebase } from "./firebase/config";
import { Continue } from "./pages/continue";
import { DeepLink } from "./pages/deeplink";
import { Error } from "./pages/error";
import HealthPage from "./pages/health";
import { Layout } from "./pages/layout";
import Logout from "./pages/logout";
import { NotFound } from "./pages/notFound";
import SetProfile from "./pages/profile/setProfileLayout";
import RegionLocked from "./pages/RegionLocked";
import { RegionSelect } from "./pages/RegionSelect";
import { SelectUser } from "./pages/selectUser";
import VersionPage from "./pages/version";
import { history } from "./utils/createPreserveQueryHistory";
import { AzureB2CProvider } from "@/components/azureB2C";
import Loading from "@/components/Loading";
import { ProtectedRoute } from "@/components/router";
import {
    URLContextProvider,
    useLocale,
} from "@/hooks";
import { isSupportedLocale } from "@/locale";
import { Login } from "@/pages/azureB2C";
import LogoutSuccess from "@/pages/logout/Success";
import NoProfiles from "@/pages/NoProfiles";
import {
    ApolloProvider,
    IntlProvider,
    ThemeProvider,
} from "@/providers";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import React,
{
    useEffect,
    useMemo,
} from "react";
import { useCookies } from "react-cookie";
import * as ReactDOM from "react-dom";
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
    centerLogo: boolean;
}

const routes: RouteDetails[] = [
    {
        path: `/deeplink`,
        Component: DeepLink,
        RouteComponent: Route,
        size: `sm`,
        centerLogo: true,
    },
    {
        path: [ `/selectprofile`, `/signinselect` ],
        Component: SelectUser,
        RouteComponent: ProtectedRoute,
        size: `sm`,
        centerLogo: true,
    },
    {
        path: `/continue`,
        Component: Continue,
        // Must be unprotected while we have both B2C and KidsLoop sessions,
        // as at this point we only have a B2C session (so the `isAuthenticated` check fails)
        RouteComponent: Route,
        size: `sm`,
        centerLogo: true,
    },
];

if (config.branding.auth.showRegionSelect) {
    routes.push({
        path: `/region`,
        Component: RegionSelect,
        RouteComponent: Route,
        size: `sm`,
        centerLogo: false,
    });
}

function ClientSide () {
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
        <URLContextProvider value={memos}>
            <ApolloProvider>
                <AzureB2CProvider>
                    <IntlProvider locale={locale}>
                        <StyledEngineProvider injectFirst>
                            <ThemeProvider locale={locale}>
                                <CssBaseline />
                                <Switch>
                                    <Route
                                        exact
                                        path="/version"
                                    >
                                        <VersionPage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/health"
                                    >
                                        <HealthPage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/error"
                                    >
                                        <Error />
                                    </Route>
                                    <Route
                                        exact
                                        path="/no-profiles"
                                    >
                                        <NoProfiles />
                                    </Route>
                                    <Route
                                        exact
                                        path="/logout"
                                    >
                                        <Logout />
                                    </Route>
                                    <Route
                                        exact
                                        path="/logout/success"
                                    >
                                        <LogoutSuccess />
                                    </Route>
                                    {routes.map(({
                                        path,
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        Component,
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        RouteComponent,
                                        size,
                                        centerLogo,
                                    }) => (
                                        <RouteComponent
                                            key={Array.isArray(path) ? path[0] : path}
                                            path={path}
                                        >
                                            {() => (
                                                <Layout
                                                    maxWidth={size}
                                                    centerLogo={centerLogo}
                                                >
                                                    <Component />
                                                </Layout>
                                            )}
                                        </RouteComponent>
                                    ))}
                                    <Route
                                        path={[ `/login`, `/signin` ]}
                                        component={Login}
                                    />
                                    <Route
                                        path="/authentication-callback"
                                        component={Loading}
                                    />
                                    <ProtectedRoute path="/createprofile">
                                        <SetProfile />
                                    </ProtectedRoute>
                                    <Route
                                        exact
                                        path="/"
                                    >
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
                                            centerLogo
                                            maxWidth={`sm`}
                                        >
                                            <NotFound />
                                        </Layout>
                                    </Route>
                                </Switch>
                            </ThemeProvider>
                        </StyledEngineProvider>
                    </IntlProvider>
                </AzureB2CProvider>
            </ApolloProvider>
        </URLContextProvider>
    );
}

function main () {
    initializeFirebase();
    const div = document.getElementById(`app`);
    ReactDOM.render(<Router history={history}>
        <ClientSide />
    </Router>, div);
}

main();
