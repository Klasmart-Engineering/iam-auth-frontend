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
import Europe from "../../assets/img/region/europe.svg";
import UnitedStates from "../../assets/img/region/usa.svg";
import Vietnam from "../../assets/img/region/vietnam.svg";
import Pakistan from "../../assets/img/region/pakistan.svg";
import { useContext, useMemo } from "react";
import { URLContext } from "../entry";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import QueryString from "qs";
import { FormattedMessage } from "react-intl";
import { useCookies } from "react-cookie";

const DOMAIN = process.env.SLD + "." + process.env.TLD

export const DOMAINS = [
    `auth.kidsloop.cn`,
    `auth.kidsloop.co.uk`,
    `auth.kidsloop.in`,
    `auth.kidsloop.id`,
    `auth.kidsloop.pk`,
    `auth.kidsloop.net`,
    `auth.kidsloop.vn`,
] as const;

export type Domain = typeof DOMAINS[number];

interface Region {
    img: string;
    domain: Domain;
    path: string,
    primaryText: string;
    secondaryText: string | React.ReactElement;
    locale: string,
}

const regions: Region[] = [
    {
        img: China,
        domain: "auth.kidsloop.cn",
        path: `/log-in`,
        primaryText: "中国大陆",
        secondaryText: ``,
        locale: "zh", 
    },
    {
        img: Europe,
        domain: "auth.kidsloop.co.uk",
        path: `/signin`,
        primaryText: "Europe",
        secondaryText: ``,
        locale: "en",
    },
    {
        img: India,
        domain: "auth.kidsloop.in",
        path: `/signin`,
        primaryText: "India",
        secondaryText: ``,
        locale: "en",
    },
    {
        img: Indonesia,
        domain: "auth.kidsloop.id",
        path: `/signin`,
        primaryText: "Republik Indonesia",
        secondaryText: ``,
        locale: "id",
    },
    {
        img: Pakistan,
        domain: "auth.kidsloop.net",
        path: `/signin`,
        primaryText: "اِسلامی جمہوریہ پاكِستان",
        secondaryText: ``,
        locale: "en",
    },
    {
        img: Korea,
        domain: "auth.kidsloop.net",
        path: `/signin`,
        primaryText: "대한민국",
        secondaryText: ``,
        locale: "ko",
    },
    {
        img: UnitedStates,
        domain: "auth.kidsloop.net",
        path: `/signin`,
        primaryText: "United States",
        secondaryText: ``,
        locale: "en",
    },
    {
        img: Vietnam,
        domain: "auth.kidsloop.vn",
        path: `/signin`,
        primaryText: "Việt Nam",
        secondaryText: ``,
        locale: "vi",
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
    const url = useContext(URLContext);
    const [cookies, setCookies] = useCookies(["locale"]);

    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

    const handleRegionSelect = (domain = window.location.host, path = "/signin", locale = "en") => {
        const protocol = window.location.protocol;
        const port = window.location.port;
        const urlHostName = port === "" ? url.hostName : `${url.hostName}:${port}`
        if (domain === urlHostName) {
            const lang = cookies?.locale ?? locale;
            setCookies(`locale`, lang, {
                path: `/`,
                domain: DOMAIN || `kidsloop.net`,
            });
            history.push(path);
        } else {
            const queries = {
                iso: locale,
                ua: url.uaParam,
                continue: url.continueParam,
            }
            const queryString = QueryString.stringify(queries, { skipNulls: true });
            console.log(queryString);
            window.location.href = `${protocol}://${domain}/?${queryString}#${path}`
        }
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h5">
                    <FormattedMessage id="region_selectCountryRegion" />
                </Typography>
            </Grid>
            <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={isXsDown ? 12 : 6}>
                    <List 
                        className={classes.list} 
                        style={{ maxHeight: isXsDown ? window.innerHeight - 320 : undefined, overflow: "auto" }}
                    > 
                        { regions.slice(0, isXsDown ? regions.length : Math.round(regions.length / 2)).map((region) => 
                            <ListItem 
                                button
                                key={region.primaryText}
                                disabled={region.secondaryText !== `` || (process.env.SLD === "alpha.kidsloop")} 
                                style={{ height: 72 }}
                                onClick={() => handleRegionSelect(region.domain, region.path, region.locale)}
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
                                    disabled={region.secondaryText !== `` || (process.env.SLD === "alpha.kidsloop")} 
                                    style={{ height: 72 }}
                                    onClick={() => handleRegionSelect(region.domain, region.path, region.locale)}
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
                        <ListItem button onClick={() => handleRegionSelect()}>
                            <ListItemText primary={<FormattedMessage id="region_cantFind" />} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
