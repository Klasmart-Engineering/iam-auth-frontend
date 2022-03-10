import { useForceAuthentication } from '@/hooks';
import {
    InteractionStatus,
    RedirectRequest,
} from '@azure/msal-browser';
import {
    IMsalContext,
    MsalAuthenticationResult,
    useIsAuthenticated,
    useMsal,
} from '@azure/msal-react';
import React from 'react';

interface Props {
    // MsalAuthenticationTemplate supports PopupRequest and SsoSilentRequest, but currently
    // we're only using RedirectRequests, so supporting these other Request types is unecessary
    authenticationRequest: RedirectRequest;
    loadingComponent?: React.ElementType<IMsalContext>;
    errorComponent?: React.ElementType<Pick<MsalAuthenticationResult, "result" | "error">>;
    children?: React.ReactNode;
}

type FaaCFunction = <T>(args: T) => React.ReactNode;

const getChildrenOrFunction = <T,>(children: React.ReactNode | FaaCFunction,
    args: T) => {
    if (typeof children === `function`) {
        return children(args);
    }
    return children;
};

// Modified version of `MsalAuthenticationTemplate`, which uses custom `useForceAuthentication` hook
// (always performs a login, regardless of if a user is currently authenticated) instead of `useMsalAuthentication` hook
const AuthorizationCodeAuthenticationTemplate = ({
    authenticationRequest,
    /* eslint-disable @typescript-eslint/naming-convention */
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    /* eslint-enable @typescript-eslint/naming-convention */
    children,
}: Props) => {
    const context = useMsal();
    const msalAuthResult = useForceAuthentication(authenticationRequest);
    const isAuthenticated = useIsAuthenticated();

    if (msalAuthResult.error && context.inProgress === InteractionStatus.None) {
        if (ErrorComponent) {
            return <ErrorComponent {...msalAuthResult} />;
        }

        throw msalAuthResult.error;
    }

    // Modified: move the "loading" check before the ``isAuthenticated` check, and add additional
    // constraint for whether the `login` request has complete yet
    // By default, this only checks `context.inProgress !== InteractionStatus.None`, which if already
    // authenticated means we show `children` rather than the `<LoadingComponent /> we want for this flow
    const hasLoggedIn = msalAuthResult.result || msalAuthResult.error;

    if (!!LoadingComponent && (context.inProgress !== InteractionStatus.None || !hasLoggedIn)) {
        return <LoadingComponent {...context} />;
    }

    if (isAuthenticated) {
        return (
            <>
                {getChildrenOrFunction(children, msalAuthResult)}
            </>
        );
    }

    return null;
};

export default AuthorizationCodeAuthenticationTemplate;
