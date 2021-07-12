import { getMyInformation } from "../api/getMyInformation";
import { transferSession } from "../api/restapi";
import StyledButton from "../components/button";
import CenterAlignChildren from "../components/centerAlignChildren";
import StyledTextField from "../components/textfield";
import config from "../config";
import { URLContext } from "../entry";
import * as restApi from "../restapi";
import {
    RestAPIError,
    RestAPIErrorType,
} from "../restapi_errors";
import { useLocaleState } from "../utils/localeState";
import {
    Domain,
    DOMAINS,
} from "./regionSelect";
import Checkbox from "@material-ui/core/Checkbox";
import { CheckboxProps } from "@material-ui/core/Checkbox/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ErrorIcon from "@material-ui/icons/Error";
import QueryString from "query-string";
import * as React from "react";
import {
    useContext,
    useEffect,
    useState,
} from "react";
import { useCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

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

export function SignIn () {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const url = useContext(URLContext);
    const [ cookies, setCookies ] = useCookies([ `privacy` ]);

    const { locale } = useLocaleState();

    const [ inFlight, setInFlight ] = useState(false);
    const [ checked, setChecked ] = useState((cookies.privacy === `true`) || false);

    const [ email, setEmail ] = useState(``);
    const [ password, setPassword ] = useState(``);

    const [ passwordError, setPasswordError ] = useState<JSX.Element | null>(null);
    const [ emailError, setEmailError ] = useState<JSX.Element | null>(null);
    const [ generalError, setGeneralError ] = useState<JSX.Element | null>(null);
    const [ checkmarkError, setCheckmarkError ] = useState<JSX.Element | null>(null);
    const [ skip, setSkip ] = useState(false);

    const { data } = getMyInformation({
        skip,
    });

    useEffect(() => {
        console.log(url.uaParam);

        if (data?.me) {
            setSkip(true);
        }

        if (data?.me && url.uaParam === null) {
            history.push(`/selectprofile`);
        }
    }, [ data ]);

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
        if (url.uaParam === `cordova`) {
            // TODO (axel): `iso` parameter there for backwards compatibility. Remove it once app is updated to support `locale` instead.
            const queryParams: { token: string; region?: string; iso?: string; locale?: string } = {
                token: token,
                iso: locale,
                locale: locale,
            };
            const domain = url.hostName as Domain;
            if (DOMAINS.includes(domain)) {
                queryParams.region = domain;
            }
            const queryString = QueryString.stringify(queryParams);
            window.open(`kidsloopstudent://?${queryString}`, `_system`);
            return true;
        } else if (url.uaParam === `cordovaios`) {
            history.push({
                pathname: `/continue`,
                search: `?ua=cordova`,
                state: {
                    token: token,
                    locale: locale,
                },
            });
            return true;
        } else {
            const transfer = await transferSession(token);
            if (transfer) {
                history.push(`/selectprofile`);
                return true;
            }
        }
        return false;
    }

    function handleError (e: RestAPIError | Error) {
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
                        <Link
                            href="#"
                            variant="subtitle2"
                            onClick={(e: React.MouseEvent) => {
                                window.location.href=`/account/#/signup`;
                                e.preventDefault();
                            }}
                        >
                            <FormattedMessage id="login_createAccount" />
                        </Link>
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
