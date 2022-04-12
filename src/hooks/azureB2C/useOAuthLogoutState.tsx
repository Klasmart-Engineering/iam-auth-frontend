import { useSearchParams } from "@/hooks/router";
import {
    decodeLogoutState,
    OAuthLogoutState,
} from "@/utils/azureB2C";
import { useMemo } from "react";

export default function useOAuthLogoutState (): OAuthLogoutState | undefined {
    const [ params ] = useSearchParams();

    return useMemo(() => {
        const encodedState = params.get(`state`);

        if (!encodedState) {
            return undefined;
        }

        try {
            return decodeLogoutState(encodedState);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }, [ params ]);
}
