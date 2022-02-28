import StyledButton from "@/components/button";
import CenterAlignChildren from "@/components/centerAlignChildren";
import StyledTextField from "@/components/textfield";
import config from "@/config";
import * as restApi from "@/api/rest";
import {
    RestAPIError,
    RestAPIErrorType,
} from "@/api/errors";
import { transferAMSToken } from "@/api/authentication";
import { openLiveApp } from "@/utils/openLiveApp";
import {
    useIsAuthenticated,
    useLocale,
    usePlatform,
    useURLContext,
} from "@/hooks";
import Checkbox from "@mui/material/Checkbox";
import { CheckboxProps } from "@mui/material/Checkbox/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import useTheme from "@mui/styles/useTheme";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ErrorIcon from "@mui/icons-material/Error";
import * as React from "react";
import {
    useEffect,
    useState,
} from "react";
import { useCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";
import {
    Link as RouterLink,
    useHistory,
} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({
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

const StyledCheckbox = withStyles({
    root: {
        color: `#0E78D5`,
        '&$checked': {
            color: `#0E78D5`,
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox
    color="default"
    {...props} />);

export default () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const url = useURLContext();
    const platform = usePlatform();
    const [ cookies, setCookies ] = useCookies([ `privacy` ]);

    const [ locale ] = useLocale();

    const [ inFlight, setInFlight ] = useState(false);
    const [ checked, setChecked ] = useState((cookies.privacy === `true`) || false);

    const [ email, setEmail ] = useState(``);
    const [ password, setPassword ] = useState(``);

    const [ passwordError, setPasswordError ] = useState<JSX.Element | null>(null);
    const [ emailError, setEmailError ] = useState<JSX.Element | null>(null);
    const [ generalError, setGeneralError ] = useState<JSX.Element | null>(null);
    const [ checkmarkError, setCheckmarkError ] = useState<JSX.Element | null>(null);

    const { isAuthenticated } = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated && platform === `Browser`) {
            history.push(`/selectprofile`);
        }
    }, [
        isAuthenticated,
        platform,
        history,
    ]);

    async function login () {
        setEmailError(null);
        setPasswordError(null);
        setCheckmarkError(null);
        setGeneralError(null);
        if (inFlight) { return; }

        try {
            setInFlight(true);
            if (email === ``) { throw new Error(`EMPTY_EMAIL`); }
            if (password === ``) { throw new Error(`EMPTY_PASSWORD`); }
            if (!checked) {
                setCheckmarkError(<CenterAlignChildren>
                    <ErrorIcon className={classes.errorIcon} />
                    <FormattedMessage id={`Please accept the Privacy Policy to sign in.`} />
                </CenterAlignChildren>);
                return;
            }

            const token = await restApi.login(email, password);
            await transferLogin(token.accessToken);
        } catch (e) {
            handleError(e);
        } finally {
            setInFlight(false);
        }
        return;
    }

    async function transferLogin (token: string) {
        if (platform === `Android`) {
            openLiveApp({
                token,
                domain: url.hostName,
                locale,
            });
            return true;
        } else if (platform === `iOS`) {
            history.push({
                pathname: `/continue`,
                search: `?ua=cordova`,
                state: {
                    token,
                },
            });
            return true;
        } else {
            const transfer = await transferAMSToken(token);
            if (transfer) {
                history.push(`/selectprofile`);
                return true;
            }
        }
        return false;
    }

    function handleError (e: unknown) {
        if (!(e instanceof Error)) {
            console.error(e);
            return;
        }

        if (!(e instanceof RestAPIError)) {
            if (e.toString().search(`EMPTY_EMAIL`) !== -1) {
                setEmailError(<span style={{
                    display: `flex`,
                    alignItems: `center`,
                }}>
                    <ErrorIcon className={classes.errorIcon} />
                    <FormattedMessage id="emailOrPhone.empty" />
                </span>);
            } else if (e.toString().search(`EMPTY_PASSWORD`) !== -1) {
                setPasswordError(<CenterAlignChildren>
                    <ErrorIcon className={classes.errorIcon} />
                    <FormattedMessage id="error_emptyPassword" />
                </CenterAlignChildren>);
            } else {
                console.error(e);
            }
            return;
        }

        const id = e.getErrorMessageID();
        const errorMessage = <FormattedMessage id={id} />;
        switch (e.getErrorMessageType()) {
        case RestAPIErrorType.INVALID_LOGIN:
        case RestAPIErrorType.INPUT_INVALID_FORMAT:
            setEmailError(errorMessage);
            break;
        case RestAPIErrorType.INVALID_PASSWORD:
            setPasswordError(errorMessage);
            break;
        case RestAPIErrorType.EMAIL_NOT_VERIFIED:
            history.push(`/verify-email`);
            break;
        case RestAPIErrorType.PHONE_NUMBER_NOT_VERIFIED:
            history.push(`/verify-phone`);
            break;
        case RestAPIErrorType.ACCOUNT_BANNED:
        default:
            setGeneralError(errorMessage);
            break;
        }
    }

    const handleCheckbox = () => {
        const isChecked = checked;
        const domain = process.env.SLD + `.` + process.env.TLD;

        setCookies(`privacy`, !isChecked, {
            path: `/`,
            domain: domain || `kidsloop.live`,
        });
        setChecked(!isChecked);
    };

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">
                    <FormattedMessage
                        id={`login_loginPrompt`}
                        values={{
                            b: (...chunks: any[]) => <strong>{chunks}</strong>,
                        }}
                    />
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}>
                <StyledTextField
                    autoFocus
                    fullWidth
                    autoComplete="email"
                    error={emailError !== null}
                    helperText={emailError}
                    id="email-input"
                    label={<FormattedMessage id="emailOrPhone.label" />}
                    value={email}
                    onBlur={(e) => setEmail(e.target.value.trim())}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledTextField
                    fullWidth
                    autoComplete="current-password"
                    error={passwordError !== null}
                    helperText={passwordError}
                    id="password-input"
                    label={<FormattedMessage id="form_passwordLabel" />}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === `Enter`) {
                            login();
                            e.preventDefault();
                        }
                    }}
                />
                <Grid
                    container
                    justify="space-between"
                    style={{
                        paddingTop: theme.spacing(1),
                    }}>
                    <Grid item>
                        <Link
                            href="#"
                            variant="subtitle2"
                            onClick={(e: React.MouseEvent) => {
                                window.location.href=`/account/#/password-forgot`;
                                e.preventDefault();
                            }}
                        >
                            <FormattedMessage id="login_forgotPassword" />
                        </Link>
                    </Grid>
                    <Grid item>
                        {config.azureB2C.enabled ? (
                            <Link
                                component={RouterLink}
                                to="/create-account"
                                variant="subtitle2"
                            >
                                <FormattedMessage id="login_createAccount" />
                            </Link>
                        ) : (
                            <Link
                                href="#"
                                variant="subtitle2"
                                onClick={(e: React.MouseEvent) => {
                                    window.location.href = `/account/#/signup`;
                                    e.preventDefault();
                                }}
                            >
                                <FormattedMessage id="login_createAccount" />
                            </Link>
                        )}
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    style={{
                        padding: theme.spacing(1, 0),
                    }}>
                    <Grid
                        item
                        xs={12}
                        style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}>
                        <FormControlLabel
                            control={
                                <StyledCheckbox
                                    checked={checked}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    inputProps={{
                                        'aria-label': `policy-checkbox`,
                                    }}
                                    onChange={() => handleCheckbox()}
                                />
                            }
                            label={
                                <Typography variant="caption">
                                    <FormattedMessage
                                        id="login_acceptPrivacyPolicy"
                                        values={{
                                            companyName:
                                                config.branding.company.name,
                                        }}
                                    />
                                </Typography>
                            }
                        />
                        <Grid
                            item
                            xs={12}>
                            {checkmarkError === null ? null :
                                <Typography
                                    align="left"
                                    color="error"
                                    variant="caption">
                                    {checkmarkError}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <StyledButton
                    fullWidth
                    disabled={inFlight}
                    size="medium"
                    style={{
                        marginTop: theme.spacing(1),
                    }}
                    type="submit"
                    onClick={() => login()}
                >
                    {
                        inFlight ?
                            <CircularProgress size={25} /> :
                            <FormattedMessage id="login_loginButton" />
                    }
                </StyledButton>
            </Grid>
            <Grid
                item
                xs={12}>
                {generalError === null ? null :
                    <Typography
                        align="left"
                        color="error"
                        variant="body2">
                        {generalError}
                    </Typography>
                }
            </Grid>
        </React.Fragment>
    );
}
