import { transferAzureB2CToken } from "@/api/authentication";
import { openLiveApp } from "@/app";
import Loading from "@/components/Loading";
import { useURLContext } from "@/hooks";
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
    const [ error, setError ] = useState<boolean>(false);

    const token = result?.accessToken;

    useEffect(() => {
        setError(false);
        const abortController = new AbortController();
        void async function transfer () {
            if (!token) {
                console.error(`Azure B2C response did not include an accessToken, missing scope in login request`);
                setError(true);
                return;
            }
            if (urlContext.uaParam === `cordova`) {
                openLiveApp({
                    token,
                    domain: urlContext.hostName,
                    locale,
                });
            } else if (urlContext.uaParam === `cordovaios`) {
                history.push({
                    pathname: `/continue`,
                    search: `?ua=cordova`,
                    state: {
                        token,
                        locale,
                    },
                });
            } else {
                const transfer = await transferAzureB2CToken(token, abortController);
                if (transfer) {
                    history.push(`/selectprofile`);
                } else {
                    console.error(`Transfer of Azure B2C accessToken to Kidsloop issued JWT failed`);
                    setError(true);
                }
            }}();
        return () => {
            abortController.abort();
        };
    }, [ token ]);

    if (error) {
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
