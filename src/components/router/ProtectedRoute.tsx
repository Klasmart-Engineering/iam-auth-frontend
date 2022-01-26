import Loading from '@/components/Loading';
import { useIsAuthenticated } from '@/hooks';
import React from 'react';
import {
    Redirect,
    Route,
    RouteProps,
} from 'react-router-dom';

// NB: We may need to add a `loadingComponent` prop in the future, if we have any <ProtectedRoute/>s
// which don't use the base <Layout/> component
type Props = Omit<RouteProps, "render" | "component">;

const ProtectedRoute = (props: Props) => {
    const {
        children,
        ...routeProps
    } = props;
    const { isAuthenticated, isLoading } = useIsAuthenticated();

    return <Route {...routeProps}>
        {isLoading ? <Loading/> : isAuthenticated === false ? <Redirect to="/"/> : children}
    </Route>;
};

export default ProtectedRoute;
