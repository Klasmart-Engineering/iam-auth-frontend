import React from "react"
import config from "@/config";
import { openLiveApp } from "@/utils/openLiveApp";
import {
    useInterval,
    useLocale,
    usePlatform,
} from "@/hooks";
import {
    Alert,
    Typography,
    Button,
    Theme,
    useTheme
} from "@mui/material";
import {
    useEffect,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";

export default () => {
    const theme = useTheme<Theme>();
    const location: any = useLocation();
    const platform = usePlatform();

    const url = new URL(window.location.href);
    const [ continueLink, setContinueLink ] = useState(url.searchParams.get(`continue`) || config.endpoints.hub);
    const [ seconds, setSeconds ] = useState<number>(10);

    const [ locale ] = useLocale();
    const [ continueError, setContinueError ] = useState<JSX.Element | null>(null);

    const regex = new RegExp(`(https?:\\/\\/(.+?\\.))?${process.env.SLD}\\.${process.env.TLD}(\\/[A-Za-z0-9\\-\\._~:\\/\\?#\\[\\]@!$&'\\(\\)\\*\\+,;\\=]*)?`);

    if (!regex.test(continueLink)) {
        setContinueLink(config.endpoints.hub);
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
                    defaultLink: config.endpoints.hub,
                    platformName: config.branding.company.name,
                }}
            />
        </Alert>);
    }

    const handleSuccess = () => {
        if (window.self !== window.top) {
            window.parent.postMessage({
                message: `message`,
            }, `*`);
        } else if (platform !== `Browser`) {
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
    }

    useInterval(() => setSeconds(s => s - 1), platform === `Browser` ? 1000: null);

    useEffect(() => {
        if (seconds === 6) {
            handleSuccess();
        }
    }, [ seconds ]);

    return (
        <>
            <Typography variant="h4">
                <FormattedMessage id={`continue_signInSuccess`} />
            </Typography>
            {platform === `Browser` && (
                <>
                    <Typography variant="body2">
                        <FormattedMessage
                            id={`continue_continuePrompt`}
                            values={{
                                em: (...chunks: any[]) => <em>{chunks}</em>,
                                continueLink: continueLink,
                            }}
                        />
                    </Typography>
                    <Typography variant="body2">
                        <FormattedMessage
                            id={`continue_countdownToContinue`}
                            values={{
                                seconds: seconds,
                            }}
                        />
                    </Typography>
                    {continueError === null ? null : (
                        <Typography>
                            {continueError}
                        </Typography>
                    )}
                </>
            )}
            <Button
                variant="contained"
                onClick={() => handleSuccess()}
            >
                <FormattedMessage id="button_continue" />
            </Button>
        </>
    );
}
