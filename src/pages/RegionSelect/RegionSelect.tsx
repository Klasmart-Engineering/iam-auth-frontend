import Indonesia from "@/assets/img/region/id.svg";
import India from "@/assets/img/region/in.svg";
import Korea from "@/assets/img/region/kr.svg";
import SriLanka from "@/assets/img/region/lk.svg";
import Pakistan from "@/assets/img/region/pk.svg";
import Thailand from "@/assets/img/region/th.svg";
import UnitedKingdom from "@/assets/img/region/uk.svg";
import UnitedStates from "@/assets/img/region/us.svg";
import Vietnam from "@/assets/img/region/vn.svg";

import {
    useConditionalLogoutFromB2C,
    useURLContext,
} from "@/hooks";
import {
    Typography,
    CircularProgress,
    Button,
    ButtonBase,
    Stack,
} from '@mui/material'
import {
    useTheme,
} from "@mui/styles";
import {
    Theme,
} from '@mui/material/styles'
import QueryString from "qs";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { Grid, colors } from "@mui/material";

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
    path: string;
    primaryText: string;
    secondaryText: string | React.ReactElement;
}

export const regions: Region[] = [
    {
        img: UnitedKingdom,
        domain: `auth.kidsloop.co.uk`,
        path: `/signin`,
        primaryText: `United Kingdom`,
        secondaryText: ``,
    },
    {
        img: India,
        domain: `auth.kidsloop.in`,
        path: `/signin`,
        primaryText: `India`,
        secondaryText: ``,
    },
    {
        img: SriLanka,
        domain: `auth.kidsloop.lk`,
        path: `/signin`,
        primaryText: `Sri Lanka`,
        secondaryText: ``,
    },
    {
        img: Pakistan,
        domain: `auth.kidsloop.pk`,
        path: `/signin`,
        primaryText: `اِسلامی جمہوریہ پاكِستان`,
        secondaryText: ``,
    },
    {
        img: UnitedStates,
        domain: `auth.kidsloop.live`,
        path: `/signin`,
        primaryText: `United States`,
        secondaryText: ``,
    },
    {
        img: Indonesia,
        domain: `auth.kidsloop.id`,
        path: `/signin`,
        primaryText: `Republik Indonesia`,
        secondaryText: ``,
    },
    {
        img: Korea,
        domain: `auth.kidsloop.live`,
        path: `/signin`,
        primaryText: `대한민국`,
        secondaryText: ``,
    },
    {
        img: Thailand,
        domain: `auth.kidsloop.co.th`,
        path: `/signin`,
        primaryText: `ประเทศไทย`,
        secondaryText: ``,
    },
    {
        img: Vietnam,
        domain: `auth.kidsloop.vn`,
        path: `/signin`,
        primaryText: `Việt Nam`,
        secondaryText: ``,
    },
];

export default () => {
    const theme = useTheme<Theme>();
    const history = useHistory();
    const url = useURLContext();
    const { loading } = useConditionalLogoutFromB2C();

    const handleRegionSelect = (domain = window.location.host, path = `/signin`) => {
        const protocol = window.location.protocol;
        const port = window.location.port;
        const urlHostName = port === `` ? url.hostName : `${url.hostName}:${port}`;
        

        if (domain === urlHostName) {
            console.log("aaa", path)
            history.push(path);
        } else {
            console.log("bbb")
            const queries = {
                ua: url.uaParam,
                continue: url.continueParam,
            };
            const queryString = QueryString.stringify(queries, {
                skipNulls: true,
            });
            // TODO: convert to /${path}?${queryString} once regions are migrated to Azure B2C
            // (and no longer use HashRouter)
            window.location.assign(`${protocol}//${domain}/?${queryString}#${path}`);
        }
    };

    if (loading) {
        return (
            <CircularProgress size={`5rem`}/>
        );
    }

    return (
        <>
            <Typography variant="h5">
                <FormattedMessage id="region_selectCountryRegion" />
            </Typography>
            <Grid sx={{
                alignItems: "flex-start"
            }} container>
                {regions.map((region: Region) => (
                    <Grid
                        key={region.primaryText}
                        sx={{
                            padding: theme.spacing(2),
                            ":hover": {
                                backgroundColor: colors.grey[100]
                            }
                        }}
                        item
                        xs={12}
                        sm={6}
                        color="secondary"
                        disabled={region.secondaryText !== ``}
                        justifyContent="flex-start"
                        component={ButtonBase}
                        onClick={() => handleRegionSelect(region.domain, region.path)}
                    >
                        <>    
                            <img
                                src={region.img}
                                alt={region.primaryText}
                                height={32}
                            />
                            <Stack sx={{
                                paddingLeft: theme.spacing(2)
                            }}
                            alignItems="flex-start">
                                <Typography variant="subtitle1">
                                    {region.primaryText}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: colors.grey[500]
                                    }}
                                    variant="body2"
                                >
                                    {region.secondaryText}
                                </Typography>
                            </Stack>
                        </>
                    </Grid>
                ))}
            </Grid>
            <Button size="large" fullWidth onClick={() => handleRegionSelect()}>
                <FormattedMessage id="region_cantFind" />
            </Button>
        </>
    );
}
