import Cadet from "@/../assets/img/cadet.png";
import { signOut } from "@/api/authentication";
import {
    Background,
    Body,
    Title,
} from "@/components/banadamu";
import StyledButton from '@/components/button';
import config from "@/config";
import { buildB2CRedirectUri } from "@/utils/azureB2C/logout";
import { useMsal } from "@azure/msal-react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from 'react-router-dom';

const useSignOutButtonStyles = makeStyles({
    button: {
        margin: `24px auto`,
    },
});

export const SignOutButton = () => {
    const styles = useSignOutButtonStyles();
    const history = useHistory();
    const { instance } = useMsal();
    const intl = useIntl();

    const handleClick = async () => {
        // Clear Kidsloop session
        await signOut();
        if (config.azureB2C.enabled) {
            // Clear B2C session
            instance.logoutRedirect({
                postLogoutRedirectUri: buildB2CRedirectUri(`/signin`).toString(),
            });
        } else {
            history.push(`/signin`);
        }
    };

    return <StyledButton
        extendedOnly
        data-testid="signout-button"
        size="medium"
        type="submit"
        className={styles.button}
        onClick={handleClick}
    >{intl.formatMessage({
            id: `generic.signOut`,
        })}
    </StyledButton>;
};

const useStyles = makeStyles({
    background: {
        "@media (max-height: 800px)": {
            backgroundImage: `none`,
        },
    },
});

const NoProfiles = () => {
    const styles = useStyles();
    const intl = useIntl();

    return (
        <Background
            className={styles.background}
            image={Cadet}>
            <Title
                data-testid="no_profiles-title"
                text={intl.formatMessage({
                    id: `selectProfile.noProfiles.title`,
                })}/>
            <Body
                data-testid="no_profiles-body"
                text={intl.formatMessage({
                    id: `selectProfile.noProfiles.body`,
                })} />
            <SignOutButton />
        </Background>
    );
};

export default NoProfiles;
