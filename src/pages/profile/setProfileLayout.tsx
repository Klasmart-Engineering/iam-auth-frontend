import SetBirthday from './setBirthday';
import SetName from './setName';
import BackgroundImage from "@/../assets/img/background.png";
import config from "@/config";
import PrimaryLogo from "@branding/assets/img/primary_logo.svg";
import dayjsUtils from "@date-io/dayjs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import {
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch,
} from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    backButton: {
        paddingTop: theme.spacing(1),
        fontSize: 12,
    },
    card: {
        boxShadow: `8px 8px 20px #c4c4c4, -8px -8px 20px #eaf5f8`,
        borderRadius: 12,
    },
    cardContent: {
        alignItems: `center`,
        display: `flex`,
        padding: `48px 40px !important`,
        [theme.breakpoints.down(`xs`)]: {
            padding: `24px 20px !important`,
        },
    },
    pageWrapper: {
        display: `flex`,
        flexGrow: 1,
        // height: "100vh",
        [theme.breakpoints.down(`xs`)]: {
            padding: `0 !important`,
        },
        '&::before': {
            content: `''`,
            position: `absolute`,
            left: 0,
            right: 0,
            zIndex: -999,
            width: `100%`,
            height: `100%`,
            background: `url(${BackgroundImage}) no-repeat center`,
            backgroundSize: `cover`,
            filter: `blur(8px)`,
            WebkitFilter: `blur(8px)`,
            [theme.breakpoints.down(`xs`)]: {
                background: `white`,
            },
        },
    },
}));

export default function SetProfile () {
    const classes = useStyles();
    const theme = useTheme();

    const { path } = useRouteMatch();
    const isXsDown = useMediaQuery(theme.breakpoints.down(`xs`));

    return (
        <MuiPickersUtilsProvider utils={dayjsUtils}>
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                className={classes.pageWrapper}
            >
                <Container maxWidth="sm">
                    <Card
                        elevation={ isXsDown ? 0 : 1 }
                        className={ isXsDown ? `` : classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={4}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        textAlign: `center`,
                                    }}>
                                    <img
                                        alt={`${config.branding.company.name} Logo`}
                                        src={PrimaryLogo}
                                        height="24px" />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}>
                                    <Switch>
                                        <Route
                                            exact
                                            path={path}>
                                            <SetName />
                                        </Route>
                                        <Route path={`${path}/:orgId?/birthday`}>
                                            <SetBirthday />
                                        </Route>
                                        <Route path={`${path}/:orgId?/name`}>
                                            <SetName />
                                        </Route>
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
