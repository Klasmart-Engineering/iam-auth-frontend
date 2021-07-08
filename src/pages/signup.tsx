import StyledButton from "../components/button";
import StyledTextField from "../components/textfield";
import {
    RestAPIError,
    RestAPIErrorType,
} from "../restapi_errors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import * as React from "react";
import { useState } from "react";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from "react-google-login";
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
    googleSSO: {
        justifyContent: `center`,
        width: `100%`,
        fontFamily: `inherit !important`,
    },
    link: {
        textAlign: `right`,
    },
    pageWrapper: {
        display: `flex`,
        flexGrow: 1,
        height: `100vh`,
    },
}));

export function SignUp () {
    const classes = useStyles();

    const [ inFlight, setInFlight ] = useState(false);

    const [ email, setEmail ] = useState(``);
    const [ emailError, setEmailError ] = useState<JSX.Element | null>(null);
    const [ generalError, setGeneralError ] = useState<JSX.Element | null>(null);

    const history = useHistory();

    async function login () {
        setEmailError(null);
        if (inFlight) { return; }

        try {
            setInFlight(true);
            if (email === ``) { throw new Error(`EMPTY_EMAIL`); }
            // const token = await restApi.signup(email);
            // await transferLogin(token);
        } catch (e) {
            handleError(e);
        } finally {
            setInFlight(false);
        }
        return;
    }

    async function googleLoginSuccess (response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (!(`tokenId` in response)) { return; }
        await transferLogin(response.tokenId);
    }

    function googleLoginFailure (error: any) {
        console.error(error);
        setInFlight(false);
    }

    async function transferLogin (token: string) {
        const headers = new Headers();
        headers.append(`Accept`, `application/json`);
        headers.append(`Content-Type`, `application/json`);
        const response = await fetch(`/transfer`, {
            body: JSON.stringify({
                token,
            }),
            headers,
            method: `POST`,
        });
        console.log(response);
        await response.text();
        if (response.ok) {
            history.push(`/continue`);
            return true;
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

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">
                    <FormattedMessage id={`signup_signUpPrompt`} />
                </Typography>
            </Grid>
            { navigator.userAgent.includes(`Cordova`) || navigator.userAgent.includes(`cordova`) ? null :
                <>
                    <Grid
                        item
                        xs={12}>
                        <GoogleLogin
                            clientId="544374117288-uc6pcgmrvend0thu01p530590ob672j5.apps.googleusercontent.com"
                            accessType="online"
                            className={classes.googleSSO}
                            onRequest={() => setInFlight(true)}
                            onSuccess={googleLoginSuccess}
                            onFailure={googleLoginFailure}
                        />
                    </Grid>
                    <Grid
                        container
                        alignItems="center">
                        <Grid
                            item
                            xs={5}>
                            <Divider />
                        </Grid>

                        <Grid
                            item
                            xs={2}>
                            <Typography
                                variant="body2"
                                align="center">
                                OR
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={5}>
                            <Divider />
                        </Grid>
                    </Grid>
                </>
            }
            <Grid
                item
                xs={12}>
                <StyledTextField
                    fullWidth
                    autoComplete="email"
                    error={emailError !== null}
                    helperText={emailError}
                    id="email-input"
                    label={<FormattedMessage id="emailOrPhone.label" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid
                item
                xs={6}>
                <Link
                    href="#"
                    variant="subtitle2"
                    onClick={(e: React.MouseEvent) => { history.push(`/signin`); e.preventDefault(); }}
                >
                    <FormattedMessage id="signup_signIn" />
                </Link>
            </Grid>
            <Grid
                item
                xs={6}
                className={classes.link}>
                <StyledButton
                    disabled={inFlight}
                    size="medium"
                    type="submit"
                    onClick={() => login()}
                >
                    {
                        inFlight ?
                            <CircularProgress size={25} /> :
                            <FormattedMessage id="signup_signUpNextButton" />
                    }
                </StyledButton>
            </Grid>
            <Grid
                item
                xs={12}>
                { generalError === null ? null :
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
