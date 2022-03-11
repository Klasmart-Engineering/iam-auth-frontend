import SetBirthday from './setBirthday';
import SetName from './setName';
import BackgroundImage from "@/../assets/img/background.png";
import config from "@/config";
import PrimaryLogo from "@branding/assets/img/primary_logo.svg";
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    Card,
    CardContent,
    Container,
    Grid,
    Theme,
    useMediaQuery,
} from "@mui/material";
import {
    makeStyles,
    useTheme,
} from '@mui/styles';
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
        [theme.breakpoints.down(`sm`)]: {
            padding: `24px 20px !important`,
        },
    },
    pageWrapper: {
        display: `flex`,
        flexGrow: 1,
        // height: "100vh",
        [theme.breakpoints.down(`sm`)]: {
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
            [theme.breakpoints.down(`sm`)]: {
                background: `white`,
            },
        },
    },
}));

export default function SetProfile () {
    const classes = useStyles();
    const theme = useTheme<Theme>();

    const { path } = useRouteMatch();
    const isSmDown = useMediaQuery(theme.breakpoints.down(`sm`));

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                className={classes.pageWrapper}
            >
                <Container maxWidth="sm">
                    <Card
                        elevation={ isSmDown ? 0 : 1 }
                        className={ isSmDown ? `` : classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid
                                container
                                justifyContent="center"
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
        </LocalizationProvider>
    );
}
