import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import * as React from "react";
import PolicyLink from "../components/policyLinks";
import { LanguageSelect } from "kidsloop-px";
import { Language } from "kidsloop-px/dist/types/components/LanguageSelect";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BackgroundImage from "../../assets/img/test.png";
import KidsloopIcon from "../../assets/img/kidsloop_icon.svg";

const LANGUAGES_LABEL: Language[] = [
    {
        code: "en",
        text: "English",
    },
    {
        code: "ko",
        text: "한국어",
    },
    {
        code: "zh-CN",
        text: "汉语 (简体)",
    },
    {
        code: "vi",
        text: "Tiếng Việt",
    },
    {
        code: "id",
        text: "bahasa Indonesia",
    }
];

const useStyles = makeStyles((theme) => createStyles({
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
        // height: "100vh",
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
            [theme.breakpoints.down("xs")]: {
                background: "white"
            },
        }
    },
}),
);

interface Props {
    centerLogo?: boolean;
    children: React.ReactNode;
    maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    logo?: boolean;
}

export function Layout(props: Props) {
    const classes = useStyles();
    const theme = useTheme();
    const domain = process.env.SLD + "." + process.env.TLD;
    const logo = props.logo ?? true;

    const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            className={classes.pageWrapper}
        >
            <Container maxWidth={props.maxWidth}>
                    <Card elevation={ isXsDown ? 0 : 1 } className={ isXsDown ? `` : classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                                { logo &&
                                    <Grid item xs={12} style={{ textAlign: props.centerLogo ? "center" : "left" }}>
                                        <img alt="KidsLoop Logo" src={KidsloopIcon} height="50px" />
                                    </Grid>
                                }
                                { props.children }
                            </Grid>
                        </CardContent>
                    </Card>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    {/* <Grid item xs={1}>
                        <Lightswitch iconOnly />
                    </Grid> */}
                    <Grid item xs={5}>
                        <LanguageSelect cookieDomain={domain} languages={LANGUAGES_LABEL} noIcon />
                    </Grid>
                    <Grid item xs={6}>
                        <PolicyLink />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}
