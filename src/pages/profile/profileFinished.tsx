import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { Button, Fab, FullScreenDialog as Dialog } from "kidsloop-px";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory, useParams } from 'react-router';

import { getMyInformation } from '../../api/getMyInformation';

import Progress from "../../../assets/img/create_profile/progress.svg";
import config from '../../config';

const useStyles = makeStyles((theme: Theme) => ({
    backButton: {
        paddingTop: theme.spacing(1),
        fontSize: 12,
    },
    card: {
        alignItems: "center",
        padding: "48px 40px !important",
        [theme.breakpoints.down("xs")]: {
            padding: "0 !important",
        },
    },
    imgHeader: {
        width: "60%",
        padding: theme.spacing(4, 0),
        [theme.breakpoints.down("xs")]: {
            width: "40%",
        },
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        [theme.breakpoints.down("xs")]: {
            padding: "0 !important",
        },
    },
    root: {
        flexGrow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    safeArea: {
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        backgroundColor: theme.palette.background.paper
    },
    textSpacing: {
        padding: theme.spacing(0, 2),
        [theme.breakpoints.down("xs")]: {
            padding: 0,
        },
    },
    title: {
        color: "#000",
    },
}));

export default function SetProfileComplete() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    const params = useParams();
    console.log("params: ", params);

    const [index, setIndex] = useState(0);
    const [givenName, setGivenName] = useState("");

    const { loading, data } = getMyInformation();

    useEffect(() => {
        if (index === 2) {
            // const response = handleCreate();
            // console.log("response: ", response);
        }
    }, [index])

    return (
        <>
            <Grid item style={{ textAlign: "center" }}>
                <img src={Progress} className={classes.imgHeader} />
            </Grid>
            <Grid item>
                <Typography variant="h4" align="center">
                    Welcome to {config.branding.company.name}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" align="center" className={classes.textSpacing}>
                    Bringing {givenName} in the loop!
                </Typography>
            </Grid>
            <div style={{ height: theme.spacing(4) }}/>
            <Grid item>
                <CircularProgress />
            </Grid>
        </>
    );
}
