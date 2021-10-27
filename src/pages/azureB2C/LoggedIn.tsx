import StyledButton from "@/components/button";
import { Layout } from "@/pages/layout";
import {
    MsalAuthenticationResult,
    useMsal,
} from "@azure/msal-react";
import {
    Grid,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

export default function LoggedIn ({ result }: MsalAuthenticationResult) {
    const { instance, accounts } = useMsal();
    const history = useHistory();

    const account = accounts[0] || {};

    async function handleLogout () {
        await instance.logoutRedirect({
            account,
        });
        history.push(`/signin`);
    }

    return (
        <Layout maxWidth={`sm`}>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">Logged into Azure B2C</Typography>
            </Grid>
            <StyledButton
                fullWidth
                size="medium"
                onClick={handleLogout}
            >
                Log out
            </StyledButton>
        </Layout>
    );
}
