import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import * as restApi from "../restapi";
import { RestAPIError, RestAPIErrorType } from "../restapi_errors";
import CenterAlignChildren from "../components/centerAlignChildren";
import StyledButton from "../components/button";
import StyledTextField from "../components/textfield";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import Divider from '@material-ui/core/Divider';
import useTheme from "@material-ui/core/styles/useTheme";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import withStyles from "@material-ui/core/styles/withStyles";
import { CheckboxProps } from "@material-ui/core/Checkbox/Checkbox";
import Collapse from '@material-ui/core/Collapse';
import BadanamuLogo from "../../assets/img/badanamu_logo.png";
import Cookies, { useCookies } from "react-cookie";


const useStyles = makeStyles((theme) => createStyles({
    card: {
        alignItems: "center",
        display: "flex",
        padding: "48px 40px !important",
    },
    errorIcon: {
        fontSize: "1em",
        marginRight: theme.spacing(1),
    },
    formContainer: {
        width: "100%",
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
    },
}),
);

const StyledCheckbox = withStyles({
    root: {
        color: "#0E78D5",
        '&$checked': {
            color: "#0E78D5",
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export function SignIn() {
    const classes = useStyles();
    const theme = useTheme();
    const [cookies, setCookies] = useCookies(["privacy"]);

    const [inFlight, setInFlight] = useState(false);
    const [checked, setChecked] = useState((cookies.privacy === "true") || false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordError, setPasswordError] = useState<JSX.Element | null>(null);
    const [emailError, setEmailError] = useState<JSX.Element | null>(null);
    const [generalError, setGeneralError] = useState<JSX.Element | null>(null);
    const [checkmarkError, setCheckmarkError] = useState<JSX.Element | null>(null);

    const history = useHistory();

    const url = new URL(window.location.href);
    console.log("url", url);
    const uaParam = url.searchParams.get("ua");
    console.log(uaParam);

    async function login() {
        setEmailError(null);
        setPasswordError(null);
        setCheckmarkError(null);
        if (inFlight) { return; }

        try {
            setInFlight(true);
            if (email === "") { throw new Error("EMPTY_EMAIL"); }
            if (password === "") { throw new Error("EMPTY_PASSWORD"); }
            if (!checked) {
                setCheckmarkError(
                    <CenterAlignChildren>
                        <ErrorIcon className={classes.errorIcon} />
                        <FormattedMessage id={"Please accept the Privacy Policy to sign in."} />
                    </CenterAlignChildren>
                );
                return;
            }

            await restApi.migrateKl1dot5(email, password);
            const token = await restApi.login(email, password);
            await transferLogin(token.accessToken);
        } catch (e) {
            handleError(e);
        } finally {
            setInFlight(false);
        }
        return;
    }

    async function transferLogin(token: string) {
        if (uaParam === "cordova") {
            window.open(`kidsloopstudent://?token=${token}`, "_system");
            return true;
        } else if (uaParam === "cordovaios") {
            history.push({ pathname: "/continue", search: "?ua=cordova", state: { token: token }});
            return true;
        } else {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            const response = await fetch("/transfer", {
                body: JSON.stringify({ token }),
                headers,
                method: "POST",
            });
            console.log(response);
            await response.text()
            if (response.ok) {
                history.push('/continue');
                return true;
            }
        }
        return false;
    }

    function handleError(e: RestAPIError | Error) {
        if (!(e instanceof RestAPIError)) {
            if (e.toString().search("EMPTY_EMAIL") !== -1) {
                setEmailError(
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <ErrorIcon className={classes.errorIcon} />
                        <FormattedMessage id="error_emptyEmail" />
                    </span>,
                );
            } else if (e.toString().search("EMPTY_PASSWORD") !== -1) {
                setPasswordError(
                    <CenterAlignChildren>
                        <ErrorIcon className={classes.errorIcon} />
                        <FormattedMessage id="error_emptyPassword" />
                    </CenterAlignChildren>,
                );
            } else {
                console.error(e);
            }
            return;
        }
        const id = e.getErrorMessageID();
        const errorMessage = <FormattedMessage id={id} />;
        switch (e.getErrorMessageType()) {
            case RestAPIErrorType.INVALID_LOGIN:
                setEmailError(errorMessage);
                break;
            case RestAPIErrorType.INVALID_PASSWORD:
                setPasswordError(errorMessage);
                break;
            case RestAPIErrorType.EMAIL_NOT_VERIFIED:
                history.push("/verify-email");
                break;
            case RestAPIErrorType.EMAIL_NOT_VERIFIED:
                history.push("/verify-phone");
                break;
            case RestAPIErrorType.ACCOUNT_BANNED:
            default:
                setGeneralError(errorMessage);
                break;
        }
    }

    const handleCheckbox = () => {
        const isChecked = checked;
        const domain = process.env.SLD + "." + process.env.TLD;

        setCookies("privacy", !isChecked, { path: "/", domain: domain || "kidsloop.net" });
        setChecked(!isChecked);
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h4">
                    <FormattedMessage
                        id={"login_loginPrompt"}
                        values={{ b: (...chunks: any[]) => <strong>{chunks}</strong> }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <StyledTextField
                    autoComplete="email"
                    autoFocus
                    error={emailError !== null}
                    fullWidth
                    helperText={emailError}
                    id="email-input"
                    label={<FormattedMessage id="form_emailLabel" />}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <StyledTextField
                    autoComplete="current-password"
                    error={passwordError !== null}
                    fullWidth
                    helperText={passwordError}
                    id="password-input"
                    label={<FormattedMessage id="form_passwordLabel" />}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                />
                <Grid container justify="space-between" style={{ paddingTop: theme.spacing(1) }}>
                    <Grid item>
                        <Link
                            href="#"
                            variant="subtitle2"
                            onClick={(e: React.MouseEvent) => {
                                window.location.href="/account/#/password-forgot";
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
                                window.location.href="/account/#/signup";
                                e.preventDefault();
                            }}
                        >
                            <FormattedMessage id="login_createAccount" />
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" style={{ padding: theme.spacing(1, 0) }}>
                    <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <FormControlLabel
                            control={
                                <StyledCheckbox
                                    checked={checked}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    inputProps={{ 'aria-label': 'policy-checkbox' }}
                                    onChange={() => handleCheckbox()}
                                />
                            }
                            label={<Typography variant="caption"><FormattedMessage id="login_acceptPrivacyPolicy" /></Typography>}
                        />
                        <Grid item xs={12}>
                            {checkmarkError === null ? null :
                                <Typography align="left" color="error" variant="caption">
                                    {checkmarkError}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <StyledButton
                    disabled={inFlight}
                    fullWidth
                    onClick={() => login()}
                    size="medium"
                    style={{ marginTop: theme.spacing(1) }}
                    type="submit"
                >
                    {
                        inFlight ?
                            <CircularProgress size={25} /> :
                            <FormattedMessage id="login_loginButton" />
                    }
                </StyledButton>
            </Grid>
            <Grid item xs={12}>
                {generalError === null ? null :
                    <Typography align="left" color="error" variant="body2">
                        {generalError}
                    </Typography>
                }
            </Grid>
        </React.Fragment>
    );
}
