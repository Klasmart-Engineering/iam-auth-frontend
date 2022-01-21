import Background from "@/../assets/img/badanamu_look.png";
import StyledButton from "@/components/button";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import { useHistory } from "react-router";

const commonTextStyles = {
    color: `#669bd2`,
    fontWeight: 900,
};

const useStyles = makeStyles(() => {
    return {
        title: {
            ...commonTextStyles,
            fontSize: `9rem`,
            marginTop: `9rem`,
            marginBottom: `3.5rem`,
            "@media (max-height: 850px), (max-width: 650px)": {
                fontSize: `6rem`,
                marginTop: `5rem`,
                marginBottom: `3rem`,
            },
        },
        body: {
            ...commonTextStyles,
            lineHeight: `2rem`,
            fontSize: `1.25rem`,
            whiteSpace: `pre-wrap`,
        },
        background: {
            backgroundColor: `rgba(231, 235, 242, 0.3)`,
            backgroundImage: `url(${Background})`,
            backgroundPosition: `center bottom`,
            backgroundRepeat: `no-repeat`,
            height: `100%`,
            width: `100%`,
            "@media (max-height: 850px), (max-width: 650px)": {
                backgroundSize: `364px 307px;`,
            },
        },
        button: {
            margin: `24px auto`,
        },
        container: {
            padding: `0 2rem`,
            display: `flex`,
            flexDirection: `column`,
        },
    };
});

export default function Error ({ showButton = false }: {
    showButton?: boolean;
}) {
    const intl = useIntl();
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.background}>
            <div className={classes.container}>
                <Typography
                    className={classes.title}
                    variant="h2"
                    align="center"
                    data-testid="error-title">{intl.formatMessage({
                        id: `authentication.error.generic.title`,
                    })}</Typography>
                <Typography
                    className={classes.body}
                    align="center"
                    data-testid="error-body">
                    {intl.formatMessage({
                        id: `authentication.error.generic.body`,
                    })}
                </Typography>
                {showButton && (
                    <StyledButton
                        extendedOnly
                        size="medium"
                        type="submit"
                        className={classes.button}
                        onClick={() => { history.push(`/`);}}
                    >
                        <FormattedMessage id="button_home" />
                    </StyledButton>
                )}
            </div>
        </div>
    );
}
