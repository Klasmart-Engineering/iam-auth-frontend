import { get } from "@/api/rest";
import {
    useEffect,
    useReducer,
} from "react";

type State = {
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
}

enum Actions {
    FETCHING,
    FETCHED,
    ERROR
}

type Action = {type: Actions.FETCHING} | {type: Actions.FETCHED; isAuthenticated: boolean} | {type: Actions.ERROR}

function reducer (state: State, action: Action): State {
    switch (action.type) {
        case Actions.FETCHING:
            return {
                isLoading: true,
                isAuthenticated: undefined,
            };
        case Actions.FETCHED:
            return {
                isLoading: false,
                isAuthenticated: action.isAuthenticated,
            };
        case Actions.ERROR:
            return {
                isLoading: false,
                isAuthenticated: false,
            };
    }
}

export const initialState = {
    isLoading: true,
    isAuthenticated: undefined,
};

export default function useIsAuthenticated (): State {
    const [ { isAuthenticated, isLoading }, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthenticationStatus () {
            dispatch({
                type: Actions.FETCHING,
            });
            try {
                const response = await get(`/refresh`, {
                    credentials: `include`,
                    signal: controller.signal,
                });
                dispatch({
                    type: Actions.FETCHED,
                    isAuthenticated: response.ok,
                });

            } catch (e) {
                dispatch({
                    type: Actions.ERROR,
                });
            }
        }

        fetchAuthenticationStatus();

        return () => controller?.abort();
    }, []);

    return {
        isLoading,
        isAuthenticated,
    };

}
