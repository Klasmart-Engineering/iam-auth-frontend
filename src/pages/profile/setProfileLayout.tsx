import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { Button, Fab, FullScreenDialog as Dialog } from "kidsloop-px";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MomentUtils from "@date-io/moment";
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import TextField from '@material-ui/core/TextField';

import SetBirthday from './setBirthday';
import SetName from './setName';
import SetOrganization from './setOrganization';
import SetProfileComplete from './profileFinished';

import KidsloopIcon from "../../../assets/img/kidsloop_icon.svg";
import BackgroundImage from "../../../assets/img/test.png";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const useStyles = makeStyles((theme: Theme) => ({
    backButton: {
        paddingTop: theme.spacing(1), 
        fontSize: 12,
    },
    card: {
        boxShadow: "8px 8px 20px #c4c4c4, -8px -8px 20px #eaf5f8",
        borderRadius: 12,
    },
    cardContent: {
        alignItems: "center",
        display: "flex",
        padding: "48px 40px !important",
        [theme.breakpoints.down("xs")]: {
            padding: "24px 20px !important",
        },
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        [theme.breakpoints.down("xs")]: {
            padding: "0 !important",
        },
        '&::before': {
            content: "''",
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: -999,
            width: "100%",
            height: "100%",
            background: `url(${BackgroundImage}) no-repeat center`,
            backgroundSize: "cover",
            filter: `blur(8px)`,
            WebkitFilter: `blur(8px)`,
            [theme.breakpoints.down("sm")]: {
                background: "white"
            },
        }
    },
}));

export default function SetProfile() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const params = useParams();
    console.log(params);


    let { path, url } = useRouteMatch();

    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                className={classes.pageWrapper}
            >
                <Container maxWidth="sm">
                    <Card elevation={ isXsDown ? 0 : 1 } className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                                <Grid item xs={12} style={{ textAlign: "center" }}>
                                    <img alt="KidsLoop Logo" src={KidsloopIcon} height="24px" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Switch>
                                        <Route exact path={path}>
                                            <SetName />
                                        </Route>
                                        <Route path={`${path}/complete`}>
                                            <SetProfileComplete />
                                        </Route>
                                        <Route path={`${path}/:orgId?/birthday`}>
                                            <SetBirthday />
                                        </Route>
                                        <Route path={`${path}/:orgId?/name`}>
                                            <SetName />
                                        </Route>
                                        {/* <Route path={`${path}/organization`}>
                                            <SetOrganization />
                                        </Route> */}
                                    </Switch>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
