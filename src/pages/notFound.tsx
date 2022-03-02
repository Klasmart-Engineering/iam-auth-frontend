import NotFound1 from "../../assets/img/not_found/1.png";
import NotFound2 from "../../assets/img/not_found/2.png";
import NotFound3 from "../../assets/img/not_found/3.png";
import NotFound4 from "../../assets/img/not_found/4.png";
import HomeButton from "@/components/HomeButton";
import Grid from "@material-ui/core/Grid";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { FormattedMessage } from "react-intl";

const NOT_FOUND_IMAGES = [
    NotFound1,
    NotFound2,
    NotFound3,
    NotFound4,
];

const useStyles = makeStyles((theme) => createStyles({
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

export function NotFound () {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography
                    variant="h4"
                    align="center"
                    data-testid="404-title"
                >
                    <FormattedMessage id={`notFound_notFoundPrompt`} />
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    data-testid="404-body"
                >
                    <FormattedMessage id={`notFound_notFoundDescription`} />
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}>
            </Grid>
            <Grid
                item
                xs={12}>
                <img
                    src={NOT_FOUND_IMAGES[((Math.floor(Math.random() * 10)) % NOT_FOUND_IMAGES.length)]}
                    width="80%" />
            </Grid>
            <Grid
                item
                xs={12}>
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.link}>
                <HomeButton/>
            </Grid>
        </React.Fragment>
    );
}
