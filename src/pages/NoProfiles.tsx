import {
    Body,
    Title,
} from "@/components/banadamu";
import { JessCadetBackground } from "@/components/banadamu/backgrounds";
import { LogoutLinkButton } from "@/components/buttons";
import React from "react";
import { useIntl } from "react-intl";

const NoProfiles = () => {
    const intl = useIntl();

    return (
        <JessCadetBackground>
            <Title
                data-testid="no_profiles-title"
                text={intl.formatMessage({
                    id: `selectProfile.noProfiles.title`,
                })}
            />
            <Body
                data-testid="no_profiles-body"
                text={intl.formatMessage({
                    id: `selectProfile.noProfiles.body`,
                })}
            />
            <LogoutLinkButton />
        </JessCadetBackground>
    );
};

export default NoProfiles;
