import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import PolicyLink from "../components/policyLinks";
import { LanguageSelect } from "kidsloop-px";
import { Language } from "kidsloop-px/dist/types/components/LanguageSelect";

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
        alignItems: "center",
        display: "flex",
        padding: "48px 40px !important",
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
    },
}),
);

interface Props {
    centerLogo: boolean;
    children: React.ReactNode;
}

export function Layout(props: Props) {
    const classes = useStyles();
    const domain = process.env.SLD + "." + process.env.TLD;

    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            className={classes.pageWrapper}
        >
            <Container maxWidth="xs">
                <Card>
                    <CardContent className={classes.card}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                            <Grid item xs={12} style={{ textAlign: props.centerLogo ? "center" : "left" }}>
                                <img alt="KidsLoop Logo" src={KidsloopIcon} height="50px" />
                            </Grid>
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
