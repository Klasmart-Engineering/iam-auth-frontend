import React from "react";
import { shuffle } from "lodash-es";
import {
    Box,
    Stack,
    Typography,
    Button
} from "@mui/material"
import { FormattedMessage } from "react-intl";
import { useHistory } from 'react-router';

export default () => {
    const history = useHistory();

    return (
        <>
            <Stack>
                <Typography
                    variant="h4">
                    <FormattedMessage id={`notFound_notFoundPrompt`} />
                </Typography>
                <Typography
                    variant="h6">
                    <FormattedMessage id={`notFound_notFoundDescription`} />
                </Typography>
            </Stack>
            <Box
                component="img"
                src={shuffle([
                    require("@/assets/img/not_found/1.png").default,
                    require("@/assets/img/not_found/2.png").default,
                    require("@/assets/img/not_found/3.png").default,
                    require("@/assets/img/not_found/4.png").default,
                ])[0]}
                sx={{
                    width: "100%",
                }}
            />
            <Button
                data-testid="home-button"
                variant="contained"
                onClick={() => history.push("/")}
            >
                <FormattedMessage id="button_home" /> 
            </Button>
        </>
    );
}
