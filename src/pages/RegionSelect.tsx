import Indonesia from "@/../assets/img/region/id.svg";
import India from "@/../assets/img/region/in.svg";
import Korea from "@/../assets/img/region/kr.svg";
import SriLanka from "@/../assets/img/region/lk.svg";
import Pakistan from "@/../assets/img/region/pk.svg";
import Thailand from "@/../assets/img/region/th.svg";
import UnitedKingdom from "@/../assets/img/region/uk.svg";
import UnitedStates from "@/../assets/img/region/us.svg";
import Vietnam from "@/../assets/img/region/vn.svg";
import config from "@/config";
import {
    useConditionalLogoutFromB2C,
    useURLContext,
} from "@/hooks";
import {
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
    useTheme,
} from "@mui/styles";
import QueryString from "qs";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

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

export interface Region {
    img: string;
    domain: Domain;
    primaryText: string;
    secondaryText: string | React.ReactElement;
}

export const regions: Region[] = [
    {
        img: UnitedKingdom,
        domain: `auth.kidsloop.co.uk`,
        primaryText: `United Kingdom`,
        secondaryText: ``,
    },
    {
        img: India,
        domain: `auth.kidsloop.in`,
        primaryText: `India`,
        secondaryText: ``,
    },
    {
        img: SriLanka,
        domain: `auth.kidsloop.lk`,
        primaryText: `Sri Lanka`,
        secondaryText: ``,
    },
    {
        img: Pakistan,
        domain: `auth.kidsloop.pk`,
        primaryText: `اِسلامی جمہوریہ پاكِستان`,
        secondaryText: ``,
    },
    {
        img: UnitedStates,
        domain: `auth.kidsloop.live`,
        primaryText: `United States`,
        secondaryText: ``,
    },
    {
        img: Indonesia,
        domain: `auth.kidsloop.id`,
        primaryText: `Republik Indonesia`,
        secondaryText: ``,
    },
    {
        img: Korea,
        domain: `auth.kidsloop.live`,
        primaryText: `대한민국`,
        secondaryText: ``,
    },
    {
        img: Thailand,
        domain: `auth.kidsloop.co.th`,
        primaryText: `ประเทศไทย`,
        secondaryText: ``,
    },
    {
        img: Vietnam,
        domain: `auth.kidsloop.vn`,
        primaryText: `Việt Nam`,
        secondaryText: ``,
    },
];

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: `100%`,
        marginTop: 16,
        marginLeft: 16,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down(`sm`)]: {
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
    button: {
        marginLeft: 32,
        marginBottom: -16,
    },
}));

export function RegionSelect () {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const history = useHistory();
    const url = useURLContext();
    const { loading } = useConditionalLogoutFromB2C();

    const isSmDown = useMediaQuery(theme.breakpoints.down(`sm`));

    const handleRegionSelect = (domain = window.location.host) => {
        const protocol = window.location.protocol;
        const port = window.location.port;
        const urlHostName = port === `` ? url.hostName : `${url.hostName}:${port}`;

        if (domain === urlHostName) {
            history.push(`/signin`);
        } else {
            const queries = {
                ua: url.uaParam,
                continue: url.continueParam,
            };
            const queryString = QueryString.stringify(queries, {
                skipNulls: true,
            });
            // TODO: convert to /${path}?${queryString} once regions are migrated to Azure B2C
            // (and no longer use HashRouter)
            window.location.assign(`${protocol}//${domain}/?${queryString}#/signin`);
        }
    };

    if (loading) {
        return (
            <CircularProgress size={`5rem`}/>
        );
    }

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
                        maxHeight: isSmDown ? window.innerHeight - 320 : undefined,
                        overflow: `auto`,
                    }}
                >
                    {regions.map((region: Region) => (
                        <Grid
                            key={region.primaryText}
                            item
                            xs={isSmDown ? 12 : 6}
                        >
                            <ListItem
                                button
                                disabled={region.secondaryText !== ``}
                                style={{
                                    height: 72,
                                }}
                                onClick={() => handleRegionSelect(region.domain)}
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
            <Grid className={classes.button}>
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
