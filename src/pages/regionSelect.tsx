import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { useHistory } from "react-router";
import useTheme from "@material-ui/core/styles/useTheme";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import China from "../../assets/img/region/china.svg";
import India from "../../assets/img/region/india.svg";
import Indonesia from "../../assets/img/region/indonesia.svg";
import Korea from "../../assets/img/region/korea.svg";
import UnitedKingdom from "../../assets/img/region/uk.svg";
import UnitedStates from "../../assets/img/region/usa.svg";
import Vietnam from "../../assets/img/region/vietnam.svg";
import { useContext, useMemo } from "react";
import { URLContext } from "../entry";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface Region {
    img: string;
    link: string;
    primaryText: string;
    secondaryText: string;
}

const regions: Region[] = [
    {
        img: China,
        link: `https://auth.kidsloop.cn/#/log-in`,
        primaryText: "中国大陆",
        secondaryText: ``,
    },
    {
        img: India,
        link: `https://auth.kidsloop.net/#/signin`,
        primaryText: "Bhārat Gaṇarājya",
        secondaryText: ``
    },
    {
        img: Indonesia,
        link: `https://auth.kidsloop.co.id/#/signin`,
        primaryText: "Republik Indonesia",
        secondaryText: `Coming Soon`
    },
    {
        img: Korea,
        link: `https://auth.kidsloop.net/#/signin`,
        primaryText: "대한민국",
        secondaryText: ``
    },
    {
        img: UnitedKingdom,
        link: `https://auth.kidsloop.net/#/signin`,
        primaryText: "United Kingdom",
        secondaryText: ``
    },
    {
        img: UnitedStates,
        link: `https://auth.kidsloop.net/#/signin`,
        primaryText: "United States",
        secondaryText: ``
    },
    {
        img: Vietnam,
        link: `https://auth.kidsloop.vn/#/signin`,
        primaryText: "Việt Nam",
        secondaryText: `Coming Soon`
    },
]

const useStyles = makeStyles((theme) => createStyles({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down("xs")]: {
            maxHeight: "200px",
            overflow: "auto",
            boxShadow: "inset 2px 2px 10px #eaf5f8, inset -2px -2px 10px #c4c4c4",
            borderRadius: 12,
        },
    },
    card: {
        alignItems: "center",
        display: "flex",
        padding: "48px 40px !important",
    },
    errorIcon: {
        fontSize: "1em",
        marginRight: theme.spacing(1),
    },
    formContainer: {
        width: "100%",
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
    },
}));

export function RegionSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {/* <FormattedMessage id="selectProfile_title" /> */}
                    Select your region
                </Typography>
            </Grid>
            <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={isXsDown ? 12 : 6}>
                    <List className={classes.list} style={{ maxHeight: isXsDown ? window.innerHeight - 320 : undefined, overflow: "auto" }}> 
                        { regions.slice(0, isXsDown ? regions.length : Math.round(regions.length / 2)).map((region) => 
                            <ListItem 
                                button
                                key={region.primaryText}
                                disabled={region.secondaryText !== ``} 
                                style={{ height: 72 }}
                                onClick={() => window.location.href = region.link}
                            >
                                <img src={region.img} height={32} />
                                <ListItemText 
                                    primary={region.primaryText} 
                                    secondary={region.secondaryText} 
                                    style={{ paddingLeft: theme.spacing(2) }} 
                                />
                            </ListItem>
                        )}
                    </List>
                </Grid>
                { !isXsDown &&
                    <Grid item xs={6}>
                        <List className={classes.list}>
                            { regions.slice(Math.round(regions.length / 2), regions.length).map((region) => 
                                <ListItem 
                                    button
                                    key={region.primaryText}
                                    disabled={region.secondaryText !== ``} 
                                    style={{ height: 72 }}
                                    onClick={() => window.location.href = region.link}
                                >
                                    <img src={region.img} height={32} />
                                    <ListItemText 
                                        primary={region.primaryText} 
                                        secondary={region.secondaryText} 
                                        style={{ paddingLeft: theme.spacing(2) }} 
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                }
                <Grid item xs={12}>
                    <List>
                        <ListItem button onClick={() => history.push("/signin")}>
                            <ListItemText primary="Can't find your region? Click here." />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
