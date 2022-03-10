import {
    AuthenticationResult,
    AuthError,
    EventMessage,
    EventType,
    InteractionStatus,
    RedirectRequest,
} from '@azure/msal-browser';
import {
    MsalAuthenticationResult,
    useMsal,
} from '@azure/msal-react';
import
{
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

// Modified version of useMsalAuthentication hook from `@azure/msal-react`, which will not check for
// a logged in account, and instead force a login
const useForceAuthentication = (authenticationRequest: RedirectRequest): Pick<MsalAuthenticationResult, "result" | "error"> => {
    const {
        instance,
        inProgress,
        logger,
    } = useMsal();
    const [ [ result, error ], setResponse ] = useState<[AuthenticationResult|null, AuthError|null]>([ null, null ]);
    // Flag used to control when the hook calls login/acquireToken
    const shouldAcquireToken = useRef(true);

    useEffect(() => {
        if (error) {
            // Errors should be handled by consuming component
            shouldAcquireToken.current = false;
            return;
        }

        if (result) {
            // Token has already been acquired, consuming component/application is responsible for renewing
            shouldAcquireToken.current = false;
            return;
        }
    }, [ error, result ]);

    // Modified: only supports loginRedirect, doesn't return login callback for repeated logins
    const login = useCallback((): Promise<AuthenticationResult | null> => {
        logger.verbose(`useForceAuthentication - Calling loginRedirect`);
        // This promise is not expected to resolve due to full frame redirect
        return instance.loginRedirect(authenticationRequest).then(null);
    }, [
        instance,
        logger,
        authenticationRequest,
    ]);

    useEffect(() => {
        const callbackId = instance.addEventCallback((message: EventMessage) => {
            switch(message.eventType) {
            case EventType.LOGIN_SUCCESS:
            case EventType.SSO_SILENT_SUCCESS:
                if (message.payload) {
                    setResponse([ message.payload as AuthenticationResult, null ]);
                }
                break;
            case EventType.LOGIN_FAILURE:
            case EventType.SSO_SILENT_FAILURE:
                if (message.error) {
                    setResponse([ null, message.error as AuthError ]);
                }
                break;
            }
        });
        logger.verbose(`useForceAuthentication - Registered event callback with id: ${callbackId}`);

        return () => {
            if (callbackId) {
                logger.verbose(`useForceAuthentication - Removing event callback ${callbackId}`);
                instance.removeEventCallback(callbackId);
            }
        };
    }, [ instance, logger ]);

    // Modified: remove !isAuthenticated guard from `login`, remove `acquireToken` (as we're deliberately logging in)
    useEffect(() => {
        if (!(shouldAcquireToken.current && inProgress === InteractionStatus.None)) {
            return;
        }

        shouldAcquireToken.current = false;
        logger.info(`useForceAuthentication - Attempting to login`);
        login().catch(() => {
            // Errors are saved in state above
            return;
        });
    }, [
        inProgress,
        login,
        logger,
    ]);

    return {
        result,
        error,
    };
};

export default useForceAuthentication;
