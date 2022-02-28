import React from "react";
import { shuffle } from "lodash-es";
import {
    Box,
    Typography,
    Stack,
    Button,
} from "@mui/material";

export default () => {
    return (
        <>
            <Stack>        
                <Typography variant="h4">
                    Portal to the Deep
                </Typography>
                <Typography variant="h6">
                    Who are you? Where are you going?
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
                onClick={() => window.open(`kidsloopstudent://`, `_system`)}
            >
                Deep dive!
            </Button>
        </>
    );
}
