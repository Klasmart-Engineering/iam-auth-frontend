import StyledButton from "../components/button";
import StyledTextField from "../components/textfield";
import { RestAPIError } from "../restapi_errors";
import { getIdentityType } from "../utils/accountType";
import CircularProgress from "@material-ui/core/CircularProgress";
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

export function Verify () {
    const classes = useStyles();

    const [ inFlight, setInFlight ] = useState(false);

    const url = new URL(window.location.href);
    const identityParam = url.searchParams.get(`id`);
    let deviceFromIdentity = ``;
    if (!identityParam) {
        // Display textfield to enter identity
    } else {
        deviceFromIdentity = getIdentityType(identityParam) ? `phone` : `email`;
    }

    const [ verificationCode, setVerificationCode ] = useState(``);
    const [ verificationError, setVerificationError ] = useState<JSX.Element | null>(null);
    const [ generalError ] = useState<JSX.Element | null>(null);

    const history = useHistory();

    async function verify () {
        setVerificationError(null);
        if (inFlight) { return; }

        try {
            setInFlight(true);
            if (verificationCode === ``) { throw new Error(`EMPTY_VERIFICATION_CODE`); }
            // const token = await restApi.verify(verificationCode);
            // await transferLogin(token);
        } catch (e) {
            handleError(e);
        } finally {
            setInFlight(false);
        }
        return;
    }

    function handleError (e: RestAPIError | Error) {
        if (!(e instanceof RestAPIError)) {
            if (e.toString().search(`EMPTY_VERIFICATION_CODE`) !== -1) {
                setVerificationError(<span style={{
                    display: `flex`,
                    alignItems: `center`,
                }}>
                    <ErrorIcon className={classes.errorIcon} />
                    <FormattedMessage
                        id="error_emptyVerificationCode"
                        values={{
                            device: deviceFromIdentity,
                        }}
                    />
                </span>);
            } else {
                console.error(e);
            }
            return;
        }
        // const id = e.getErrorMessageID();
        // const errorMessage = <FormattedMessage id={id} />;
        // switch (e.getErrorMessageType()) {
        //     case RestAPIErrorType.INVALID_LOGIN:
        //         setVerif(errorMessage);
        //         break;
        //     case RestAPIErrorType.INVALID_PASSWORD:
        //         setPasswordError(errorMessage);
        //         break;
        //     case RestAPIErrorType.EMAIL_NOT_VERIFIED:
        //         history.push("/verify-email");
        //         break;
        //     case RestAPIErrorType.EMAIL_NOT_VERIFIED:
        //         history.push("/verify-phone");
        //         break;
        //     case RestAPIErrorType.ACCOUNT_BANNED:
        //     default:
        //         setGeneralError(errorMessage);
        //         break;
        // }
    }

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                <Typography variant="h4">
                    <FormattedMessage id={`verify_verifyPrompt`} />
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}>
                <StyledTextField
                    fullWidth
                    error={verificationError !== null}
                    helperText={verificationError}
                    id="verification-code-input"
                    label={<FormattedMessage id="form_verificationLabel" />}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
            </Grid>
            <Grid
                item
                xs={6}>
                <Link
                    href="#"
                    variant="subtitle2"
                    onClick={(e: React.MouseEvent) => { history.push(`/signup`); e.preventDefault(); }}
                >
                    <FormattedMessage id="verify_backButton" />
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
                    onClick={() => verify()}
                >
                    {
                        inFlight ?
                            <CircularProgress size={25} /> :
                            <FormattedMessage id="verify_verifyButton" />
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
