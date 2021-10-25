import Indonesia from "@/../assets/img/region/id.svg";
import India from "@/../assets/img/region/in.svg";
import Korea from "@/../assets/img/region/kr.svg";
import SriLanka from "@/../assets/img/region/lk.svg";
import Pakistan from "@/../assets/img/region/pk.svg";
import Thailand from "@/../assets/img/region/th.svg";
import UnitedKingdom from "@/../assets/img/region/uk.svg";
import UnitedStates from "@/../assets/img/region/us.svg";
import Vietnam from "@/../assets/img/region/vn.svg";
import { URLContext } from "@/entry";
import {
    ButtonBase,
    createStyles,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import QueryString from "qs";
import * as React from "react";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

const DOMAIN = process.env.SLD + `.` + process.env.TLD;

export const DOMAINS = [
    `auth.kidsloop.cn`,
    `auth.kidsloop.co.th`,
    `auth.kidsloop.co.uk`,
    `auth.kidsloop.in`,
    `auth.kidsloop.id`,
    `auth.kidsloop.live`,
    `auth.kidsloop.lk`,
    `auth.kidsloop.pk`,
    `auth.kidsloop.vn`,
] as const;

export type Domain = typeof DOMAINS[number];

interface Region {
    img: string;
    domain: Domain;
    path: string;
    primaryText: string;
    secondaryText: string | React.ReactElement;
    locale: string;
}

const regions: Region[] = [
    {
        img: UnitedKingdom,
        domain: `auth.kidsloop.co.uk`,
        path: `/signin`,
        primaryText: `United Kingdom`,
        secondaryText: ``,
        locale: `en`,
    },
    {
        img: India,
        domain: `auth.kidsloop.in`,
        path: `/signin`,
        primaryText: `India`,
        secondaryText: ``,
        locale: `en`,
    },
    {
        img: SriLanka,
        domain: `auth.kidsloop.lk`,
        path: `/signin`,
        primaryText: `Sri Lanka`,
        secondaryText: ``,
        locale: `en`,
    },
    {
        img: Thailand,
        domain: `auth.kidsloop.co.th`,
        path: `/signin`,
        primaryText: `ประเทศไทย`,
        secondaryText: ``,
        locale: `th`,
    },
    {
        img: Indonesia,
        domain: `auth.kidsloop.id`,
        path: `/signin`,
        primaryText: `Republik Indonesia`,
        secondaryText: ``,
        locale: `id`,
    },
    {
        img: Pakistan,
        domain: `auth.kidsloop.pk`,
        path: `/signin`,
        primaryText: `اِسلامی جمہوریہ پاكِستان`,
        secondaryText: ``,
        locale: `en`,
    },
    {
        img: Korea,
        domain: `auth.kidsloop.live`,
        path: `/signin`,
        primaryText: `대한민국`,
        secondaryText: ``,
        locale: `ko`,
    },
    {
        img: UnitedStates,
        domain: `auth.kidsloop.live`,
        path: `/signin`,
        primaryText: `United States`,
        secondaryText: ``,
        locale: `en`,
    },
    {
        img: Vietnam,
        domain: `auth.kidsloop.vn`,
        path: `/signin`,
        primaryText: `Việt Nam`,
        secondaryText: ``,
        locale: `vi`,
    },
];
regions.sort((a, b) => a.locale.localeCompare(b.locale));

const useStyles = makeStyles((theme) => createStyles({
    list: {
        width: `100%`,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down(`xs`)]: {
            maxHeight: `200px`,
            overflow: `auto`,
            boxShadow: `inset 2px 2px 10px #eaf5f8, inset -2px -2px 10px #c4c4c4`,
            borderRadius: 12,
        },
    },
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
    pageWrapper: {
        display: `flex`,
        flexGrow: 1,
        height: `100vh`,
    },
}));

export function RegionSelect () {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const url = useContext(URLContext);
    const [ cookies, setCookies ] = useCookies([ `locale` ]);

    const isXsDown = useMediaQuery(theme.breakpoints.down(`xs`));

    const handleRegionSelect = (domain = window.location.host, path = `/signin`, locale = `en`) => {
        const protocol = window.location.protocol;
        const port = window.location.port;
        const urlHostName = port === `` ? url.hostName : `${url.hostName}:${port}`;
        const lang = cookies?.locale ?? locale;

        setCookies(`locale`, lang, {
            path: `/`,
            domain: DOMAIN || `kidsloop.live`,
        });

        if (domain === urlHostName) {
            history.push(path, {
                locale,
            });
        } else {
            const queries = {
                locale: locale,
                ua: url.uaParam,
                continue: url.continueParam,
            };
            const queryString = QueryString.stringify(queries, {
                skipNulls: true,
            });
            window.location.href = `${protocol}//${domain}/?${queryString}#${path}`;
        }
    };

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography variant="h5">
                    <FormattedMessage id="region_selectCountryRegion" />
                </Typography>
            </Grid>
            <List>
                <Grid
                    container
                    wrap="wrap"
                    className={classes.list}
                    style={{
                        maxHeight: isXsDown ? window.innerHeight - 320 : undefined,
                        overflow: `auto`,
                    }}
                >
                    {regions.map((region) => (
                        <Grid
                            key={region.primaryText}
                            item
                            xs={isXsDown ? 12 : 6}
                        >
                            <ListItem
                                button
                                disabled={region.secondaryText !== `` || (process.env.SLD === `alpha.kidsloop`)}
                                style={{
                                    height: 72,
                                }}
                                onClick={() => handleRegionSelect(region.domain, region.path, region.locale)}
                            >
                                <img
                                    src={region.img}
                                    height={32}
                                />
                                <ListItemText
                                    primary={region.primaryText}
                                    secondary={region.secondaryText}
                                    style={{
                                        paddingLeft: theme.spacing(2),
                                    }}
                                />
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </List>
            <Grid
                xs={12}>
                <List>
                    <ListItem
                        button
                        onClick={() => handleRegionSelect()}>
                        <ListItemText primary={<FormattedMessage id="region_cantFind" />} />
                    </ListItem>
                </List>
            </Grid>
        </React.Fragment>
    );
}
