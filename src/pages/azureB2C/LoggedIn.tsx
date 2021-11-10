import { transferAzureB2CToken } from "@/api/authentication";
import { openLiveApp } from "@/app";
import Loading from "@/components/Loading";
import {
    useAccessToken,
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

    useEffect(() => {
        if (isLoading) return;

        setTransferTokenError(false);

        if (!token) {
            console.error(`Azure B2C response did not include an accessToken, missing scope in login request`);
            setTransferTokenError(true);
            return;
        }

        if (urlContext.uaParam === `cordova`) {
            openLiveApp({
                token,
                domain: urlContext.hostName,
                locale,
            });
            return;
        }

        if (urlContext.uaParam === `cordovaios`) {
            history.push({
                pathname: `/continue`,
                search: `?ua=cordova`,
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
        urlContext.hostName,
        urlContext.uaParam,
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
