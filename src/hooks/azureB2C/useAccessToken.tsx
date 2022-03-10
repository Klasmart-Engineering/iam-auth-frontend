import config from "@/config";
import { useRedirectRequest } from "@/hooks";
import { loginRequest } from "@/utils/azureB2C/client";
import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import {
    MsalAuthenticationResult,
    useMsal,
} from "@azure/msal-react";
import {
    useEffect,
    useReducer,
} from "react";

type State = {
    token: string | undefined;
    error: Error | undefined;
    isLoading: boolean;
}

enum Actions {
    FETCHING,
    FETCHED,
    ERROR,
}

type Action = {type: Actions.FETCHING} | {type: Actions.FETCHED; token: string | undefined} | {type: Actions.ERROR; error: Error}

function buildInitialState (existingToken: string | undefined): State {
    return {
        isLoading: !existingToken,
        error: undefined,
        token: undefined,
    };
}

function reducer (state: State, action: Action): State {
    switch (action.type) {
    case Actions.FETCHING:
        return {
            token: undefined,
            isLoading: true,
            error: undefined,
        };
    case Actions.FETCHED:
        return {
            token: action.token,
            isLoading: false,
            error: undefined,
        };
    case Actions.ERROR:
        return {
            token: undefined,
            isLoading: false,
            error: action.error,
        };
    }
}

/**
 * On first login, the result of `useMsalAuthentication` is a JSON payload containing an `accessToken`.
 * However, on subsequent calls while logged in, this hook returns `null`.
 * In this scenario, we must use `MsalClientInstance.acquireTokenSilent` to retrieve the same payload
 * as the initial login (including the accessToken).
 *
 * If B2C returns an `InteractionRequiredAuthError` error, we need a full redirect to get the `accessToken`
 * See https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react
 *
 * NB: `useMsalAuthentication` is called internally by the `MsalAuthenticationTemplate` component
 *
 * @param authenticationResult Output of `useMsalAuthentication` hook
 *
 * @returns `{isLoading, token, error}` State
 */
export default function useAccessToken (authenticationResult?: MsalAuthenticationResult["result"]): State {
    const existingToken = authenticationResult?.accessToken;

    const {
        instance,
        accounts,
        inProgress,
    } = useMsal();
    const [
        {
            token,
            error,
            isLoading,
        },
        dispatch,
    ] = useReducer(reducer, existingToken, buildInitialState);
    const redirectRequest = useRedirectRequest();

    useEffect(() => {
        // No fetch necessary if we already have a token
        if (existingToken) return;

        // Authentication is still in progress or we don't have any accounts
        if (!(inProgress === InteractionStatus.None && accounts.length > 0)) return;

        const fetchAccessToken = async () => {
            dispatch({
                type: Actions.FETCHING,
            });
            // We don't specify a specific account so we can fall back on the default of `activeAccount` (IAM-241)
            // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/aeb1dfbd83a1b60323025e772656fcc91cf388df/lib/msal-browser/docs/accounts.md#active-account-apis
            try {
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    // ATH-238
                    // Set redirectUri to empty page as recommended by MS documentation
                    // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/98bb2b791e54bc9c5c168cc2c7a49dc9e819409b/lib/msal-browser/docs/errors.md?plain=1#L159
                    redirectUri: `${config.server.origin}/blank.html`,
                });
                dispatch({
                    type: Actions.FETCHED,
                    token: response.accessToken || undefined,
                });
            } catch (e) {
                if (e instanceof InteractionRequiredAuthError) {
                    await instance.acquireTokenRedirect({
                        ...redirectRequest,
                    });
                } else {
                    dispatch({
                        type: Actions.ERROR,
                        error: e instanceof Error ? e : Error(JSON.stringify(e)),
                    });
                }
            }
        };

        fetchAccessToken();
    }, [
        inProgress,
        accounts,
        instance,
        authenticationResult,
        dispatch,
        existingToken,
        redirectRequest,
    ]);

    return {
        token: existingToken || token,
        error,
        isLoading,
    };
}
