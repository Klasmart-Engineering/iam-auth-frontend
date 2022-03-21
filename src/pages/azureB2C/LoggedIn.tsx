import { transferAzureB2CToken } from "@/api/authentication";
import { openLiveApp } from "@/app";
import Loading from "@/components/Loading";
import {
    Platform,
    useAccessToken,
    useLocale,
    useOAuthState,
    usePlatform,
    useURLContext,
} from "@/hooks";
import useUpdateLocale from "@/hooks/azureB2C/useUpdateLocale";
import { MsalAuthenticationResult } from "@azure/msal-react";
import React,
{ useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function LoggedIn ({ result }: MsalAuthenticationResult) {
    const history = useHistory();
    const [ locale ] = useLocale();
    const urlContext = useURLContext();
    const {
        token,
        isLoading,
        error: accessTokenError,
    } = useAccessToken(result);

    const isUpdatingLocale = useUpdateLocale(result);

    // We render this component when:
    //      1. You have just created an account/logged into B2C, and been sent back to the app via the OAuth2 `redirect_uri`
    //      2. You are currently authenticated with B2C, and we need to silently retrieve your `accessToken`
    //
    // We rely on the `ua` QueryParam to determine the platform (Android, iOS, Browser), which is state which
    // will be lost in case #1 when the OAuth2 redirect happens.
    // To account for this, we need to store `platform` in the `state` parameter of the OAuth2 request,
    // and retrieve this state after the redirect
    //
    // In case #2, since we don't perform a redirect, the `ua` QueryParam is preserved, so we can
    // fallback on the output of `usePlatform`
    const oauthState = useOAuthState(result);
    const currentPlatform = usePlatform();
    const platform: Platform = oauthState?.platform ?? currentPlatform;

    useEffect(() => {
        // Need to wait for the following before we can open the mobile app or /transfer:
        // - an `accessToken` to be fetched (if required)
        // - `locale` to be updated
        //     - For mobile app, ensure the latest `locale` is provided
        //     - For browser, when `useUpdateLocale` completes, the react-intl Provider rerenders,
        //       which causes a rerender of this component, which would abort any in-progress
        //       "/transfer" call
        if (isLoading || isUpdatingLocale) return;

        if (!token || accessTokenError) {
            console.error(`Unexpected error retrieving accessToken from B2C`);
            console.error(accessTokenError);
            history.push(`/error`);
            return;
        }

        if (platform === `Android`) {
            openLiveApp({
                token,
                domain: urlContext.hostName,
                locale,
            });
            return;
        }

        if (platform === `iOS`) {
            history.push({
                pathname: `/continue`,
                search: `?ua=cordovaios`,
                state: {
                    token,
                },
            });
            return;
        }

        const abortController = new AbortController();

        async function transfer (accessToken: string) {
            const success = await transferAzureB2CToken(accessToken, abortController);
            if (success) {
                history.push(`/selectprofile`);
            } else {
                console.error(`Transfer of Azure B2C accessToken to Kidsloop issued JWT failed`);
                history.push(`/error`);
            }
        }

        transfer(token);

        return () => {
            abortController.abort();
        };
    }, [
        accessTokenError,
        token,
        isLoading,
        isUpdatingLocale,
        history,
        locale,
        platform,
        urlContext.hostName,
    ]);

    return <Loading />;
}
