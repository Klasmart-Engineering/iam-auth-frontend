import { signOut } from '@/api/authentication';
import { Error } from '@/components/logout';
import InProgress from '@/components/logout/InProgress';
import config from '@/config';
import {
    DEFAULT_IDP,
    encodeState,
    IdTokenClaims,
    isKidsloopIdp,
} from '@/utils/azureB2C';
import {
    AccountInfo,
    EndSessionRequest,
    InteractionStatus,
} from '@azure/msal-browser';
import {
    useAccount,
    useMsal,
} from '@azure/msal-react';
import React,
{
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useHistory } from 'react-router';

enum State {
    IN_PROGRESS,
    ERROR,
}

const buildLogoutRequest = (account: AccountInfo): EndSessionRequest => {
    const idp = (account.idTokenClaims as IdTokenClaims | undefined)?.idp;

    if (!idp) {
        console.warn(`idp claim missing from token, defaulting to ${DEFAULT_IDP}`);
    }

    const identityProvider = idp || DEFAULT_IDP;

    return {
        postLogoutRedirectUri: buildRedirectUri(identityProvider),
        state: buildState(identityProvider),
    };
};

const buildRedirectUri = (identityProvider: string): string => {
    if (!isKidsloopIdp(identityProvider)) {
        return `${config.server.origin}/logout/success`;
    }

    const continueParam = new URL(window.location.href).searchParams.get(`continue`);

    if (!continueParam) {
        return config.server.origin;
    }

    return `${config.server.origin}?continue=${encodeURIComponent(continueParam)}`;
};

const buildState = (identityProvider: string): string | undefined => {
    if (isKidsloopIdp(identityProvider)) {
        return undefined;
    }

    return encodeState({
        identityProvider,
    });
};

const Logout = () => {
    const history = useHistory();
    const {
        instance,
        inProgress,
        accounts,
    } = useMsal();
    const activeAccount = useAccount();
    const [ state, setState ] = useState<State>(State.IN_PROGRESS);
    const [ attempt, setAttempt ] = useState(1);

    const useRetry = useCallback(() => setAttempt(a => a + 1), []);

    useEffect(() => {
        setState(State.IN_PROGRESS);
        if (inProgress !== InteractionStatus.None) return;

        const logout = async () => {
            if (!await signOut()) {
                setState(State.ERROR);
                return;
            }

            if (!config.azureB2C.enabled) {
                history.push(`/`);
                return;
            }

            if (!accounts.length) {
                console.log(`No active B2C session`);
                history.push(`/`);
                return;
            }

            if (activeAccount === null) {
                console.log(`B2C session found, but no active account set. Defaulting to using first account for post_redirect_logout_uri`);
            }

            try {
                await instance.logoutRedirect(buildLogoutRequest(activeAccount ?? accounts[0]));
            } catch (e) {
                console.error(e);
                setState(State.ERROR);
            }

        };

        logout();
    }, [
        attempt,
        history,
        instance,
        inProgress,
        activeAccount,
        accounts,
    ]);

    switch (state) {
        case State.IN_PROGRESS:
            return <InProgress />;
        case State.ERROR:
            return <Error onRetryClick={useRetry} />;
    }
};

export default Logout;
