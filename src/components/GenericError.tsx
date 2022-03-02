import {
    Body,
    Title,
} from "@/components/banadamu";
import { BadanamuLookBackground } from "@/components/banadamu/backgrounds";
import HomeButton from "@/components/HomeButton";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useIntl } from "react-intl";

interface Props {
    hideHomeButton?: boolean;
}

const useStyles = makeStyles(() => {
    return {
        button: {
            margin: `24px auto`,
        },
    };
});

export default function GenericError (props: Props) {
    const { hideHomeButton } = props;

    const intl = useIntl();
    const styles = useStyles();

    return (
        <BadanamuLookBackground>
            <Title
                data-testid="error-title"
                text={intl.formatMessage({
                    id: `authentication.error.generic.title`,
                })}/>
            <Body
                data-testid="error-body"
                text={intl.formatMessage({
                    id: `authentication.error.generic.body`,
                })} />
            {!hideHomeButton && <HomeButton className={styles.button}/>}
        </BadanamuLookBackground>
    );
}
