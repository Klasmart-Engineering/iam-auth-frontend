import React from "react";
import { signOut } from "@/api/authentication";
import config from "@/config";
import { buildB2CRedirectUri } from "@/utils/azureB2C/logout";
import { useMsal } from "@azure/msal-react";
import { useIntl } from "react-intl";
import { useHistory } from 'react-router-dom';
import {
    Stack,
    Typography,
    Button,
    colors,
} from "@mui/material"

export default () => {
    const intl = useIntl();
    const history = useHistory();
    const { instance } = useMsal();

    return (
        <Stack sx={{
            height: "100vh",
            position: "relative",
            backgroundColor: colors.grey[100],
            textAlign: "center",
            pt: 20,
            ":before": {
                content: "''",
                position: "absolute",
                pointerEvents: "none",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${require("@/assets/img/cadet.png").default})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
            }
        }} alignItems="center" spacing={4}> 
            <Typography
                data-testid="no_profiles-title"
                variant="h2"
                sx={{
                    color: "#669bd2",
                    fontSize: [96, 144],
                    fontWeight: 900,
                }}
            >
                {intl.formatMessage({
                    id: `selectProfile.noProfiles.title`,
                })}
            </Typography>
            <Typography
                data-testid="no_profiles-body"
                sx={{
                    color: "#669bd2",
                    maxWidth: 512,
                    fontSize: 20,
                    fontWeight: 900,
                }}
            >
                {intl.formatMessage({
                    id: `selectProfile.noProfiles.body`,
                })}
            </Typography>
            <Button
                data-testid="signout-button"
                variant="contained"
                onClick={async () => {
                    // Clear Kidsloop session
                    await signOut();
                    
                    if (config.azureB2C.enabled) {
                        // Clear B2C session
                        instance.logoutRedirect({
                            postLogoutRedirectUri: buildB2CRedirectUri(`/signin`).toString(),
                        });
                    } else {
                        history.push(`/signin`);
                    }
                }}
            >
                {intl.formatMessage({
                    id: `generic.signOut`,
                })}
            </Button>
        </Stack>
    );
};
