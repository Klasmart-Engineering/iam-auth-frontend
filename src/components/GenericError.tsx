import React from "react";
import { useIntl } from "react-intl";
import {
    Stack,
    Typography,
    Button,
    colors,
} from "@mui/material"
import { useHistory } from 'react-router';

export const GenericError = () => {
    const intl = useIntl();
    const history = useHistory();

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
                backgroundImage: `url(${require("@/assets/img/badanamu_look.png").default})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
            }
        }} alignItems="center" spacing={4}> 
            <Typography
                data-testid="error-title"
                variant="h2"
                sx={{
                    color: "#669bd2",
                    fontSize: [96, 144],
                    fontWeight: 900,
                }}
            >
                {intl.formatMessage({
                    id: `authentication.error.generic.title`,
                })}
            </Typography>
            <Typography
                data-testid="error-body"
                sx={{
                    color: "#669bd2",
                    maxWidth: 512,
                    fontSize: 20,
                    fontWeight: 900,
                }}
            >
                {intl.formatMessage({
                    id: `authentication.error.generic.body`,
                })}
            </Typography>
            <Button
                data-testid="home-button"
                variant="contained"
                onClick={() => { history.push(`/`);}}
            >
                {intl.formatMessage({
                    id: `button_home`,
                })}
            </Button>
        </Stack>
    );
};