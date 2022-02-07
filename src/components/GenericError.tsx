import BadanamuLook from "@/../assets/img/badanamu_look.png";
import {
    Background,
    Body,
    Title,
} from "@/components/banadamu";
import HomeButton from "@/components/HomeButton";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useIntl } from "react-intl";

const commonTextStyles = {
    color: `#669bd2`,
    fontWeight: 900,
};

const useStyles = makeStyles(() => {
    return {
        background: {
            "@media (max-height: 700px), (max-width: 650px)": {
                backgroundSize: `364px 307px;`,
            },
        },
        button: {
            margin: `24px auto`,
        },
    };
});

export default function GenericError () {
    const intl = useIntl();
    const styles = useStyles();

    return (
        <Background
            className={styles.background}
            image={BadanamuLook}>
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
            <HomeButton className={styles.button}/>
        </Background>
    );
}
