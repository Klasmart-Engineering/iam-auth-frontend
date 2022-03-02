import { signOut } from '@/api/authentication';
import { Error } from '@/components/logout';
import InProgress from '@/components/logout/InProgress';
import config from '@/config';
import { IdTokenClaims } from '@/utils/azureB2C/claims';
import {
    AccountInfo,
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

const hasKidsloopIDP = (account: AccountInfo): boolean => {
    const idp = (account.idTokenClaims as IdTokenClaims | undefined)?.idp;

    if (!idp) {
        console.warn(`idp claim missing from token, defaulting to hasKidsloopIDP=true`);
        return true;
    }

    return idp.toLowerCase().startsWith(`kidsloop`);
};

const buildRedirectUri = (account: AccountInfo): string => {
    if (!hasKidsloopIDP(account)) {
        return `${config.server.origin}/logout/success`;
    }

    const continueParam = new URL(window.location.href).searchParams.get(`continue`);

    if (!continueParam) {
        return config.server.origin;
    }

    return `${config.server.origin}?continue=${encodeURIComponent(continueParam)}`;
};

const Logout = () => {
    const history = useHistory();
    const {
        instance,
        inProgress,
        accounts,
    } = useMsal();
    const account = useAccount(accounts[0] || {});
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

            if (account === null) {
                console.log(`No active B2C session`);
                history.push(`/`);
                return;
            }

            try {
                await instance.logoutRedirect({
                    postLogoutRedirectUri: buildRedirectUri(account),
                });
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
        account,
    ]);

    switch (state) {
    case State.IN_PROGRESS:
        return <InProgress/>;
    case State.ERROR:
        return <Error onRetryClick={useRetry}/>;
    }
};

export default Logout;
