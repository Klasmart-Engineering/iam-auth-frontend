import { transferAzureB2CToken } from "@/api/authentication";
import { openLiveApp } from "@/app";
import Loading from "@/components/Loading";
import {
    Platform,
    useAccessToken,
    useOAuthState,
    usePlatform,
    useURLContext,
} from "@/hooks";
import { Layout } from "@/pages/layout";
import { useLocaleState } from "@/utils/localeState";
import { MsalAuthenticationResult } from "@azure/msal-react";
import {
    Grid,
    Typography,
} from "@material-ui/core";
import React,
{
    useEffect,
    useState,
} from "react";
import { useHistory } from "react-router-dom";

export default function LoggedIn ({ result }: MsalAuthenticationResult) {
    const history = useHistory();
    const { locale } = useLocaleState();
    const urlContext = useURLContext();
    const [ transferTokenError, setTransferTokenError ] = useState<boolean>(false);
    const {
        token,
        isLoading,
        error: accessTokenError,
    } = useAccessToken(result);

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
        if (isLoading) return;

        setTransferTokenError(false);

        if (!token) {
            console.error(`Azure B2C response did not include an accessToken, missing scope in login request`);
            setTransferTokenError(true);
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
                    locale,
                },
            });
            return;
        }

        const abortController = new AbortController();

        async function transfer (accessToken: string) {
            setTransferTokenError(false);
            const success = await transferAzureB2CToken(accessToken, abortController);
            if (success) {
                history.push(`/selectprofile`);
            } else {
                console.error(`Transfer of Azure B2C accessToken to Kidsloop issued JWT failed`);
                setTransferTokenError(true);
            }
        }

        transfer(token);

        return () => {
            abortController.abort();
        };
    }, [
        token,
        isLoading,
        history,
        locale,
        platform,
        urlContext.hostName,
    ]);

    if (transferTokenError || accessTokenError) {
        return <Layout maxWidth={`md`}>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">{`Sorry, looks like something went wrong during your login`}</Typography>
            </Grid>
        </Layout>;
    }

    return (
        <Loading/>
    );
}
