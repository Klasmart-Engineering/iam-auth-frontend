import BackgroundImage from "../../assets/img/background.png";
import PrivacyPolicy from "../components/PrivacyPolicy";
import config from "../config";
import { default as LanguageSelect } from "@/components/LanguageSelect";
import PrimaryLogo from "@branding/assets/img/primary_logo.svg";
import {
    Card,
    CardContent,
    Container,
    Grid,
    Theme,
    useMediaQuery,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
    useTheme,
} from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
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

interface Props {
    centerLogo?: boolean;
    children: React.ReactNode;
    maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    logo?: boolean;
}

export function Layout (props: Props) {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const logo = props.logo ?? true;

    const isSmDown = useMediaQuery(theme.breakpoints.down(`sm`));

    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            className={classes.pageWrapper}
        >
            <Container maxWidth={props.maxWidth}>
                <Card
                    elevation={isSmDown ? 0 : 1}
                    className={isSmDown ? `` : classes.card}
                >
                    <CardContent className={classes.cardContent}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={4}
                        >
                            { logo && (
                            <Grid
                                        item
                                        xs={12}
                                        style={{
                                            textAlign: props.centerLogo ? `center` : `left`,
                                        }}
                            >
                                <img
                                            alt={`${config.branding.company.name} Logo`}
                                            src={PrimaryLogo}
                                            height="50px"
                                />
                            </Grid>
                            )}
                            { props.children }
                        </Grid>
                    </CardContent>
                </Card>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={5}
                    >
                        <LanguageSelect />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <PrivacyPolicy />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}
