import StyledButton from "@/components/button";
import { Layout } from "@/pages/layout";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationResult } from "@azure/msal-react";
import {
    Grid,
    Typography,
} from "@material-ui/core";
import React,
{
    useCallback,
    useEffect,
} from "react";

export default function AuthenticationFailed ({ error, login }: MsalAuthenticationResult) {
    useEffect(() => {
        console.error(error);
    }, [ error ]);

    const retryLogin = useCallback(() => login(InteractionType.Redirect), [ login ]);

    return (
        <Layout maxWidth={`md`}>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">Sorry, something went wrong logging you in</Typography>
            </Grid>
            <StyledButton onClick={retryLogin}>
                Retry login
            </StyledButton>
        </Layout>
    );
}
