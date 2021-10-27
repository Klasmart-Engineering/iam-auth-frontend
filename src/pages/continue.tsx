import StyledButton from "../components/button";
import config from "../config";
import { redirectIfUnauthorized } from "../utils/accountUtils";
import { useLocaleState } from "../utils/localeState";
import { openLiveApp } from "@/app";
import { useURLContext } from "@/hooks";
import Grid from "@material-ui/core/Grid";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import * as React from "react";
import {
    useEffect,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";

const DEFAULT_REDIRECT_LINK =
    process.env.REDIRECT_LINK || `https://hub.kidsloop.live`;

const useStyles = makeStyles((theme) =>
    createStyles({
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
        googleSSO: {
            justifyContent: `center`,
            width: `100%`,
            fontFamily: `inherit !important`,
        },
        link: {
            textAlign: `center`,
        },
        pageWrapper: {
            display: `flex`,
            flexGrow: 1,
            height: `100vh`,
        },
    }));

export function Continue () {
    const classes = useStyles();
    const theme = useTheme();
    const location: any = useLocation();
    const urlContext = useURLContext();

    const url = new URL(window.location.href);
    const [ cordova ] = useState(urlContext.uaParam);
    const [ continueLink, setContinueLink ] = useState(url.searchParams.get(`continue`) || DEFAULT_REDIRECT_LINK);
    const [ seconds, setSeconds ] = useState(10);

    const { locale } = useLocaleState();

    if (!urlContext.testing && !cordova) {
        redirectIfUnauthorized();
    }

    const [ continueError, setContinueError ] = useState<JSX.Element | null>(null);

    const regex = new RegExp(`(https?:\\/\\/(.+?\\.))?${process.env.SLD}\\.${process.env.TLD}(\\/[A-Za-z0-9\\-\\._~:\\/\\?#\\[\\]@!$&'\\(\\)\\*\\+,;\\=]*)?`);
    if (!regex.test(continueLink)) {
        setContinueLink(DEFAULT_REDIRECT_LINK);
        setContinueError(<Alert
            severity="warning"
            style={{
                padding: theme.spacing(1, 2),
            }}
        >
            <FormattedMessage
                id={`error_invalidRedirectLink`}
                values={{
                    em: (...chunks: any[]) => <em>{chunks}</em>,
                    continueLink: continueLink,
                    defaultLink: DEFAULT_REDIRECT_LINK,
                    platformName: config.branding.company.name,
                }}
            />
        </Alert>);
    }

    useEffect(() => {
        if (!seconds || cordova) return;

        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        if (seconds === 6) {
            handleSuccess();
        }

        return () => clearInterval(interval);
    }, [ seconds ]);

    function handleSuccess () {
        console.log(`continueLink ` + continueLink);
        console.log(`document.referrer ` + document.referrer);

        if (window.self !== window.top) {
            window.parent.postMessage({
                message: `message`,
            }, `*`);
        } else if (cordova) {
            openLiveApp({
                token: location.state.token,
                domain: url.hostname,
                locale,
            });
        } else {
            if (document.referrer) {
                window.location.replace(document.referrer);
            }
            window.location.replace(continueLink);
        }

        return;
    }

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography
                    variant="h4"
                    align="center">
                    <FormattedMessage id={`continue_signInSuccess`} />
                </Typography>
            </Grid>
            {!cordova && (
                <>
                    <Grid
                        item
                        xs={12}>
                        <Typography
                            variant="body2"
                            align="center">
                            <FormattedMessage
                                id={`continue_continuePrompt`}
                                values={{
                                    em: (...chunks: any[]) => <em>{chunks}</em>,
                                    continueLink: continueLink,
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}>
                        <Typography
                            variant="body2"
                            align="center">
                            <FormattedMessage
                                id={`continue_countdownToContinue`}
                                values={{
                                    seconds: seconds,
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}>
                        {continueError === null ? null : (
                            <Typography
                                align="left"
                                variant="body2">
                                {continueError}
                            </Typography>
                        )}
                    </Grid>
                </>
            )}
            <Grid
                item
                xs={12}
                className={classes.link}>
                <StyledButton
                    extendedOnly
                    size="medium"
                    type="submit"
                    onClick={() => {
                        handleSuccess();
                    }}
                >
                    <FormattedMessage id="button_continue" />
                </StyledButton>
            </Grid>
        </React.Fragment>
    );
}
