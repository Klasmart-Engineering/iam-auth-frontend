import NotFound1 from "../../assets/img/not_found/1.png";
import NotFound2 from "../../assets/img/not_found/2.png";
import NotFound3 from "../../assets/img/not_found/3.png";
import NotFound4 from "../../assets/img/not_found/4.png";
import StyledButton from "../components/button";
import {
    Grid,
    Theme,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import * as React from "react";

const NOT_FOUND_IMAGES = [
    NotFound1,
    NotFound2,
    NotFound3,
    NotFound4,
];

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        alignItems: `center`,
        display: `flex`,
        padding: `48px 40px !important`,
    },
    errorIcon: {
        fontSize: `1em`,
        marginRight: theme.spacing(1),
    },
    formContainer: {
        width: `100%`,
    },
    googleSSO: {
        justifyContent: `center`,
        width: `100%`,
        fontFamily: `inherit !important`,
    },
    link: {
        textAlign: `center`,
    },
    pageWrapper: {
        display: `flex`,
        flexGrow: 1,
        height: `100vh`,
    },
}));

export function DeepLink () {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}
            >
                <Typography
                    variant="h4"
                    align="center"
                >
                    Portal to the Deep
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                >
                    Who are you? Where are you going?
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
            />
            <Grid
                item
                xs={12}
            >
                <img
                    src={NOT_FOUND_IMAGES[((Math.floor(Math.random() * 10)) % NOT_FOUND_IMAGES.length)]}
                    width="80%"
                    alt=""
                />
            </Grid>
            <Grid
                item
                xs={12}
            />
            <Grid
                item
                xs={12}
                className={classes.link}
            >
                <StyledButton
                    extendedOnly
                    size="medium"
                    type="submit"
                    onClick={() => { window.open(`kidsloopstudent://`, `_system`); }}
                >
                    Deep dive!
                </StyledButton>
            </Grid>
        </React.Fragment>
    );
}
