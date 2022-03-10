import StyledButton from "@/components/button";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    button: {
        margin: `24px auto`,
    },
});

const LogoutLinkButton = () => {
    const styles = useStyles();
    const intl = useIntl();

    return <StyledButton
        <Link>
        extendedOnly
        component={Link}
        to="/logout"
        data-testid="signout-button"
        size="medium"
        type="submit"
        className={styles.button}>{intl.formatMessage({
            id: `generic.signOut`,
        })}
    </StyledButton>;
};

export default LogoutLinkButton;
